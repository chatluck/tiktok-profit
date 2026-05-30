const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'project-config.json'), 'utf-8'));
const paths = config.paths;

const jsonStr = fs.readFileSync(path.join(ROOT, paths.products), 'utf-8').replace(/^\uFEFF/, '');
let html = fs.readFileSync(path.join(ROOT, paths.profitTemplate), 'utf-8');
const data = JSON.parse(jsonStr);

html = html
    .replace('__PRODUCTS_DATA_PLACEHOLDER__', JSON.stringify(data.products))
    .replace('__BUSINESS_CONFIG_PLACEHOLDER__', JSON.stringify(config.business));

fs.writeFileSync(path.join(ROOT, paths.profitOutput), html, 'utf-8');
fs.writeFileSync(path.join(ROOT, paths.siteIndex), html, 'utf-8');

console.log('Profit page:', paths.profitOutput, (fs.statSync(path.join(ROOT, paths.profitOutput)).size / 1024).toFixed(0), 'KB');
console.log('Site index:', paths.siteIndex, (fs.statSync(path.join(ROOT, paths.siteIndex)).size / 1024).toFixed(0), 'KB');
