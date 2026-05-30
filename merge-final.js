const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'project-config.json'), 'utf-8'));
const paths = config.paths;

const data0421 = JSON.parse(fs.readFileSync(path.join(ROOT, paths.costProducts), 'utf-8').replace(/^\uFEFF/, ''));
const data0518 = JSON.parse(fs.readFileSync(path.join(ROOT, paths.pricingProducts), 'utf-8').replace(/^\uFEFF/, ''));

console.log('Cost products:', data0421.products.length);
console.log('Pricing products:', data0518.products.length);

var priceMap = {};
data0518.products.forEach(function(p) {
    if (p.sku && p.dailyPrice != null) {
        priceMap[p.sku] = { price: p.dailyPrice, margin: p.dailyMargin };
    }
});
console.log('Pricing map:', Object.keys(priceMap).length);

var matched = 0;
data0421.products.forEach(function(p) {
    var mapped = priceMap[p.sku];
    if (mapped && mapped.price != null) {
        p.dailyPrice = mapped.price;
        p.dailyMargin = mapped.margin;
        matched++;
    }
});

console.log('Matched prices:', matched);

var out = JSON.stringify({ count: data0421.products.length, products: data0421.products });
fs.writeFileSync(path.join(ROOT, paths.products), out, 'utf-8');
console.log('Output:', paths.products, data0421.products.length, 'products', (Buffer.byteLength(out) / 1024).toFixed(0), 'KB');
