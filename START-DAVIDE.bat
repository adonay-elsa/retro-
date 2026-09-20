@echo off
cd /d "%~dp0"
echo Starting Davide development server...
start "Davide Vite Server" cmd /k "npm run dev -- --port 5190"
timeout /t 3 /nobreak >nul
start "Davide Website" http://localhost:5190/
