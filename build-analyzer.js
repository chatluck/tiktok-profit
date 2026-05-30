var fs = require('fs');
var path = require('path');

var config = JSON.parse(fs.readFileSync(path.join(__dirname, 'project-config.json'), 'utf8'));
var paths = config.paths;

var template = fs.readFileSync(path.join(__dirname, paths.settlementTemplate), 'utf8');
var productsJson = fs.readFileSync(path.join(__dirname, paths.products), 'utf8');

var products = JSON.parse(productsJson);
var compact = JSON.stringify(products);

var output = template
    .replace('__PRODUCTS_DATA_PLACEHOLDER__', compact)
    .replace('__BUSINESS_CONFIG_PLACEHOLDER__', JSON.stringify(config.business));
fs.writeFileSync(path.join(__dirname, paths.settlementOutput), output, 'utf8');

console.log('OK: ' + paths.settlementOutput + ' created (' + (output.length / 1024).toFixed(0) + 'KB)');
