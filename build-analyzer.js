var fs = require('fs');
var path = require('path');

var template = fs.readFileSync(path.join(__dirname, 'settlement-analyzer.html'), 'utf8');
var productsJson = fs.readFileSync(path.join(__dirname, 'products-data.json'), 'utf8');

// Parse and minify products data
var products = JSON.parse(productsJson);
var compact = JSON.stringify(products);

var output = template.replace('__PRODUCTS_DATA_PLACEHOLDER__', compact);
fs.writeFileSync(path.join(__dirname, 'settlement-report.html'), output, 'utf8');

console.log('OK: settlement-report.html created (' + (output.length / 1024).toFixed(0) + 'KB)');
