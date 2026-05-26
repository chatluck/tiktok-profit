@echo off
chcp 65001 >nul
echo ===== TikTok利润核算工具 - 一键部署 =====
cd /d "E:\项目\利润"

echo [1/5] 提取最新成本数据（0421成本表）...
python extract_cost.py

echo [2/5] 合并成本与定价...
node merge-final.js

echo [3/5] 构建页面...
node build-final.js
node build-analyzer.js
copy /Y tiktok-profit-final.html index.html >nul

echo [4/5] 推送到GitHub...
git add index.html settlement-report.html products-data.json products-data-0421.json build-analyzer.js
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set today=%%a-%%b-%%c
git commit -m "update pricing %today%"
git push

echo [5/5] 完成！
echo ==============================
echo https://chatluck.github.io/tiktok-profit/
echo ==============================
pause
