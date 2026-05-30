# 当前任务进度

## 当前目标

完成首轮高收益优化：配置化主流程路径和业务参数，构建时同步发布入口，并加入构建校验。

## 已完成

- 新增 `project-config.json`，集中管理数据路径、构建输出、汇率、汇率范围、低利润阈值和赠品 SKU。
- `build-final.js` 改为读取配置，注入产品数据和业务配置，并同时生成 `tiktok-profit-final.html` 与 `index.html`。
- `build-analyzer.js` 改为读取配置，注入产品数据和业务配置，生成 `settlement-report.html`。
- `merge-final.js` 改为读取配置中的成本/定价/输出数据路径。
- `extract_cost.py` 改为读取配置中的成本 Excel 路径和成本 JSON 输出路径。
- `tiktok-profit-new.html`、`settlement-analyzer.html` 改为使用构建注入的业务配置。
- 新增 `validate-build.js`，校验生成文件没有占位符残留、产品数量一致、`index.html` 与 `tiktok-profit-final.html` 同步。
- `deploy.bat` 改为在脚本所在目录运行，执行构建校验，并使用已验证可用的 `py -3.11`。

## 正在进行

- 收尾并向用户汇报本次优化结果。

## 下一步

- 若继续优化，优先清理旧版页面/一次性脚本边界，或将 SheetJS CDN 改为本地依赖。

## 停止条件

- 主构建链路通过最小验证，并明确说明已验证与未验证内容。
