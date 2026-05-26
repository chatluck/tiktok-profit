const fs = require('fs');
const jsonStr = fs.readFileSync('products-data.json', 'utf-8').replace(/^\uFEFF/, '');
let html = fs.readFileSync('tiktok-profit-new.html', 'utf-8');
const data = JSON.parse(jsonStr);
html = html.replace('__PRODUCTS_DATA_PLACEHOLDER__', JSON.stringify(data.products));
fs.writeFileSync('tiktok-profit-final.html', html, 'utf-8');
console.log('Done:', (fs.statSync('tiktok-profit-final.html').size / 1024).toFixed(0), 'KB');
