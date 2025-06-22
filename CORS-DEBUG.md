# 🔧 CORS Error Debugging Guide

## 🚨 Quick Fix (Temporary)

Replace the CORS section in `backend/server.js` with this temporarily:

```javascript
// TEMPORARY: Allow all origins for testing
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
```

## 🔍 Debugging Steps

### 1. Check Browser Console
Open browser dev tools and look for the exact CORS error. It should show:
- The origin that was blocked
- The specific CORS policy that failed

### 2. Check Backend Logs
In your Render dashboard:
1. Go to your backend service
2. Click "Logs"
3. Look for the CORS debug messages:
   ```
   CORS Origin: https://your-frontend-url.vercel.app
   CORS: Origin allowed/blocked: ...
   ```

### 3. Verify URLs Match Exactly
Make sure these match EXACTLY (no trailing slashes, correct protocol):

**Frontend URL:** `https://data-compression-decompression-port.vercel.app`
**Backend allowedOrigins:** Should include the exact frontend URL

### 4. Test Backend Directly
Visit your backend URL directly: `https://your-backend.onrender.com`
You should see the API info JSON.

### 5. Test API Endpoint
Try: `https://your-backend.onrender.com/api/health`
Should return: `{"status":"OK","timestamp":"..."}`

## 🛠️ Common Issues & Fixes

### Issue 1: URL Mismatch
```javascript
// ❌ Wrong - trailing slash
'https://your-app.vercel.app/'

// ✅ Correct - no trailing slash  
'https://your-app.vercel.app'
```

### Issue 2: Wrong Frontend URL
Check your actual Vercel deployment URL:
1. Go to Vercel dashboard
2. Click your project
3. Copy the exact URL from the deployment

### Issue 3: Render Not Updated
After changing CORS settings:
1. Commit and push to GitHub
2. Wait for Render to auto-deploy
3. Check logs to confirm new code is running

## 🎯 Step-by-Step Fix

1. **Update backend CORS** with exact frontend URL
2. **Remove trailing slash** from backend URL in frontend config
3. **Commit and push** changes
4. **Wait for both deployments** to update
5. **Check logs** in both Render and Vercel
6. **Test in browser** with dev tools open

## 🚨 If Still Not Working

Use the temporary "allow all origins" fix above, then gradually restrict it once working.

## 📝 Current Status Check

- [ ] Backend deployed and showing API info at root URL
- [ ] Frontend deployed and loading
- [ ] CORS logs showing in Render dashboard
- [ ] Exact URLs match in CORS configuration
- [ ] No trailing slashes in URLs
- [ ] Both services redeployed after changes 