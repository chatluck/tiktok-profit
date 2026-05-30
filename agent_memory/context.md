# 项目上下文
## 项目目标

这是一个 TikTok 跨境电商利润核算与结算分析工具项目，面向泰国、菲律宾店铺。核心目标是用产品成本、定价、汇率和平台费用核算单品到账利润，并结合 TikTok 结算账单与订单列表识别低利润、退款、样品单和 SKU 成本未匹配问题。

## 架构与关键约定

- 项目以静态 HTML 为主，没有 package.json 或前端框架构建链。
- 共享配置集中在 `project-config.json`，包含主数据路径、构建输出路径、汇率、汇率范围、低利润阈值和赠品 SKU。
- 产品数据集中在 `products-data.json`，当前约 2819 个产品，市场分布为泰国 1562、菲律宾 1257。
- 前端利润核算新版模板是 `tiktok-profit-new.html`，通过 `build-final.js` 注入产品数据和业务配置，生成 `tiktok-profit-final.html`，并同步写出 `index.html`。
- 结算分析模板是 `settlement-analyzer.html`，通过 `build-analyzer.js` 注入产品数据和业务配置后生成 `settlement-report.html`。
- `validate-build.js` 用于构建后校验：检查占位符是否清理、产品数量是否注入、`index.html` 是否与 `tiktok-profit-final.html` 同步。
- `server.js` 是本地预览服务，端口 3001，会把 `products-data.json` 注入旧版 `tiktok-profit-calculator.html`。
- 数据更新流程大致为：`extract_cost.py` 从配置的成本 Excel 提取成本 -> `merge-final.js` 用配置的定价数据覆盖成本数据中的价格 -> `build-final.js`/`build-analyzer.js` 生成静态发布文件 -> `validate-build.js` 校验。
- `deploy.bat` 串联提取、合并、构建、校验、提交并推送到 GitHub Pages；当前使用 `py -3.11` 调用 Python。

## 重要路径

- `project-config.json`：主配置文件，后续改路径、汇率、阈值优先改这里。
- `index.html`：当前发布入口，由 `build-final.js` 直接同步生成。
- `tiktok-profit-new.html`：新版利润核算页面模板。
- `tiktok-profit-final.html`：注入产品数据后的新版利润核算页面。
- `settlement-analyzer.html`：结算分析页面模板，支持 XLSX 或预转换 JSON。
- `settlement-report.html`：注入产品数据后的结算分析页面。
- `products-data.json`：合并后的产品成本与定价数据。
- `products-data-0421.json`：成本数据中间产物。
- `products-data-0518.json`：定价数据来源中间产物。
- `convert_settlement.py`：将 TikTok 结算账单和订单列表转换为页面可拖入的 JSON。
- `agent_memory/`：项目上下文、当前进度、问题风险记录。

## 当前有效假设

- 发布目标是 GitHub Pages：`https://chatluck.github.io/tiktok-profit/`。
- 主要使用入口应优先看 `index.html`/`tiktok-profit-new.html`，旧版 `tiktok-profit-calculator.html` 可能仍用于本地服务或历史参考。
- 结算低利润阈值、TH/PHP 汇率、赠品 SKU 已由主流程页面和构建脚本统一读取 `project-config.json`。

## 待确认事项

- 是否仍需要维护旧版 `tiktok-profit-calculator.html` 与 `server.js` 注入路径。
- `settlement_all_orders_profit.py` 等一次性分析脚本是否仍属于正式流程；它们仍有硬编码路径和独立业务常量。
