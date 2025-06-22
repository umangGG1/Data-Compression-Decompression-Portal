# 🚀 Split Deployment Guide: Vercel + Render

Deploy your frontend on **Vercel** and backend on **Render** for maximum reliability.

## 📋 **Deployment Order (Important!)**

**Deploy Backend FIRST, then Frontend** (you need the backend URL for frontend)

---

## 🎯 **Step 1: Deploy Backend on Render**

### **1.1 Prepare Backend**
```bash
# Commit current changes
git add .
git commit -m "Prepare for split deployment"
git push origin main
```

### **1.2 Deploy on Render**
1. **Go to [Render.com](https://render.com)**
2. **Sign up/Login with GitHub**
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**
5. **Configure the service:**
   - **Name:** `compression-portal-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

6. **Add Environment Variable:**
   - **Key:** `NODE_ENV`
   - **Value:** `production`

7. **Click "Create Web Service"**

### **1.3 Get Backend URL**
After deployment, you'll get a URL like:
```
https://compression-portal-backend.onrender.com
```
**Copy this URL - you'll need it for the frontend!**

---

## 🎨 **Step 2: Deploy Frontend on Vercel**

### **2.1 Update Frontend Configuration**

Update the backend URL in `frontend/src/config.js`:

```javascript
const config = {
  API_URL: process.env.NODE_ENV === 'production' 
    ? 'https://YOUR-BACKEND-URL.onrender.com'  // ← Replace with your actual URL
    : 'http://localhost:5000'
};
```

### **2.2 Deploy on Vercel**

**Option A: Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Go to frontend directory
cd frontend

# Deploy
vercel --prod

# Follow the prompts:
# - Link to existing project? No
# - Project name: compression-portal-frontend
# - Directory: ./
```

**Option B: Vercel Dashboard**
1. **Go to [Vercel.com](https://vercel.com)**
2. **Import your GitHub repository**
3. **Configure:**
   - **Framework:** React
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. **Add Environment Variable:**
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://your-backend-url.onrender.com`

---

## 🔧 **Step 3: Update CORS (Important!)**

After getting your Vercel URL (e.g., `https://compression-portal-frontend.vercel.app`):

1. **Update `backend/server.js`:**
   ```javascript
   const allowedOrigins = [
       'http://localhost:3000',
       'https://your-actual-vercel-url.vercel.app'  // ← Add your real URL here
   ];
   ```

2. **Redeploy backend:**
   ```bash
   git add .
   git commit -m "Update CORS for Vercel frontend"
   git push origin main
   ```
   
   Render will auto-redeploy the backend.

---

## ✅ **Step 4: Test Your Deployment**

1. **Visit your Vercel URL**
2. **Upload a file**
3. **Try compression**
4. **Download the result**

---

## 🎯 **Quick Commands Summary**

```bash
# 1. Commit changes
git add . && git commit -m "Split deployment ready" && git push

# 2. Deploy backend on Render (manual via dashboard)

# 3. Deploy frontend on Vercel
cd frontend
vercel --prod

# 4. Update CORS with your real URLs and redeploy backend
```

---

## 🌟 **Benefits of Split Deployment**

- ✅ **More Reliable:** Each service handles what it does best
- ✅ **Better Performance:** CDN for frontend, dedicated server for backend
- ✅ **Easier Debugging:** Separate logs and monitoring
- ✅ **Scalable:** Can scale frontend and backend independently
- ✅ **Free Tiers:** Both Vercel and Render have generous free tiers

---

## 🔧 **Troubleshooting**

### **CORS Errors:**
- Make sure backend CORS includes your Vercel URL
- Check browser console for exact error

### **API Not Found:**
- Verify the API_URL in frontend config
- Check if backend is running on Render
- Visit your backend URL directly - should show API info

### **Backend Deployment Errors:**
- If you see "ENOENT: no such file or directory" errors about frontend/build
- This means the backend is trying to serve frontend files
- Make sure you're deploying only the backend folder on Render

### **Build Failures:**
- Check build logs in respective dashboards
- Ensure all dependencies are in package.json

---

## 🎉 **You're Done!**

Your app is now deployed with:
- 🎨 **Frontend:** Fast, CDN-powered on Vercel
- ⚙️ **Backend:** Reliable API server on Render
- 🔒 **HTTPS:** Automatic SSL on both platforms
- 📱 **Mobile-friendly:** Responsive design works everywhere

**Share your live URLs and enjoy your deployed compression portal!** 🚀 