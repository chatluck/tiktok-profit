const fs = require('fs');

// 0421表：完整产品+成本数据
const data0421 = JSON.parse(fs.readFileSync('products-data-0421.json', 'utf-8').replace(/^\uFEFF/, ''));
// 20260518表：正确定价
const data0518 = JSON.parse(fs.readFileSync('products-data-0518.json', 'utf-8').replace(/^\uFEFF/, ''));

console.log('0421表（有成本）:', data0421.products.length);
console.log('0518表（有定价）:', data0518.products.length);

// 建立0518表的SKU→定价映射
var priceMap = {};
data0518.products.forEach(function(p) {
    if (p.sku && p.dailyPrice != null) {
        priceMap[p.sku] = { price: p.dailyPrice, margin: p.dailyMargin };
    }
});
console.log('定价映射:', Object.keys(priceMap).length, '条');

// 合并：0421表为基础，用0518表定价覆盖
var matched = 0;
data0421.products.forEach(function(p) {
    var mapped = priceMap[p.sku];
    if (mapped && mapped.price != null) {
        p.dailyPrice = mapped.price;
        p.dailyMargin = mapped.margin;
        matched++;
    }
});

console.log('匹配到定价:', matched, '个');

// 输出
var out = JSON.stringify({ count: data0421.products.length, products: data0421.products });
fs.writeFileSync('products-data.json', out, 'utf-8');
console.log('输出:', data0421.products.length, '个产品,', (Buffer.byteLength(out)/1024).toFixed(0), 'KB');
