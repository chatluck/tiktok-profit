@echo off
chcp 65001 >nul
setlocal

cd /d "%~dp0"

echo ===== TikTok利润核算工具 - 一键部署 =====

echo [1/5] 提取最新成本数据...
py -3.11 extract_cost.py
if errorlevel 1 exit /b 1

echo [2/5] 合并成本与定价...
node merge-final.js
if errorlevel 1 exit /b 1

echo [3/5] 构建并校验页面...
node build-final.js
if errorlevel 1 exit /b 1
node build-analyzer.js
if errorlevel 1 exit /b 1
node validate-build.js
if errorlevel 1 exit /b 1

echo [4/5] 提交并推送到 GitHub...
git add index.html settlement-report.html products-data.json products-data-0421.json project-config.json build-final.js build-analyzer.js validate-build.js
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set today=%%a-%%b-%%c
git commit -m "update pricing %today%"
if errorlevel 1 exit /b 1
git push
if errorlevel 1 exit /b 1

echo [5/5] 完成
echo ==============================
echo https://chatluck.github.io/tiktok-profit/
echo ==============================
pause
