# 问题与风险
## 已知问题

- 终端读取部分中文文件时出现乱码，疑似 PowerShell/文件编码显示问题；文件本身多处仍可由浏览器按 UTF-8 使用。
- `tiktok-profit-calculator.html` 旧版中 `calculateProfit()` 存在重复声明 `commissionRate`、`serviceFeeRate`、`infraFee` 的迹象，若维护旧版需要优先检查。
- 当前 `python` 命令命中 WindowsApps 占位启动器，会静默失败；已在 `deploy.bat` 中改用 `py -3.11`。

## 风险记录

- 主流程路径和业务参数已集中到 `project-config.json`，但部分一次性 Python 排查/报表脚本仍写死桌面 TikTok 导出目录和独立汇率/阈值。
- `settlement-analyzer.html` 从 CDN 加载 SheetJS，离线环境或网络受限时 XLSX 解析不可用。
- 生成产物如 `index.html`、`tiktok-profit-final.html`、`settlement-report.html` 体积较大且包含内联数据，修改模板后必须重新构建才能同步发布文件。

## 待验证

- `deploy.bat` 未实际执行到 git commit/push；本次只验证了构建前后的关键命令。
- 浏览器交互未做端到端点击验证。

## 已解决

- 主流程构建后新增 `validate-build.js`，已验证 `index.html` 与 `tiktok-profit-final.html` 同步、生成页面没有占位符残留、产品数量为 2819。
