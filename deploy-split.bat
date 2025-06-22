@echo off
echo 🚀 Preparing for Split Deployment (Vercel + Render)...
echo.

REM Check if Git is initialized
if not exist ".git" (
    echo 📦 Initializing Git repository...
    git init
    git branch -M main
)

REM Commit current changes
echo 📝 Committing changes...
git add .
git commit -m "Prepare for split deployment - Frontend: Vercel, Backend: Render" || echo No changes to commit

echo.
echo 🎯 DEPLOYMENT STEPS:
echo.
echo 1️⃣  BACKEND (Render):
echo    • Go to https://render.com
echo    • Create Web Service from your GitHub repo
echo    • Root Directory: backend
echo    • Build Command: npm install
echo    • Start Command: npm start
echo.
echo 2️⃣  FRONTEND (Vercel):
echo    • Update frontend/src/config.js with your Render backend URL
echo    • Go to https://vercel.com
echo    • Import your GitHub repo
echo    • Root Directory: frontend
echo    • Framework: React
echo.
echo 3️⃣  UPDATE CORS:
echo    • Add your Vercel URL to backend/server.js allowedOrigins
echo    • Push changes to trigger backend redeploy
echo.
echo 📖 For detailed instructions, see SPLIT-DEPLOYMENT.md
echo.
echo 🚀 Ready to deploy! Push to GitHub first:
echo    git push origin main
echo.
pause 