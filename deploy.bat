@echo off
echo 🚀 Starting deployment preparation...

REM Check if Git is initialized
if not exist ".git" (
    echo 📦 Initializing Git repository...
    git init
    git branch -M main
)

REM Install all dependencies
echo 📦 Installing dependencies...
call npm run install-deps

REM Build the frontend
echo 🔨 Building frontend...
call npm run build

REM Add all files to Git
echo 📝 Adding files to Git...
git add .

REM Commit changes
echo 💾 Committing changes...
git commit -m "Ready for deployment - %date% %time%" || echo No changes to commit

echo.
echo 🎉 Deployment preparation complete!
echo.
echo 📋 Next steps:
echo 1. Push to GitHub: git push origin main
echo 2. Choose a deployment platform:
echo    • Railway: https://railway.app (Recommended)
echo    • Render: https://render.com
echo    • Heroku: https://heroku.com
echo.
echo 🔗 For detailed instructions, see DEPLOYMENT.md
echo.
pause 