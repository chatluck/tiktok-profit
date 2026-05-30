const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'project-config.json'), 'utf8'));
const paths = config.paths;
const products = JSON.parse(fs.readFileSync(path.join(ROOT, paths.products), 'utf8').replace(/^\uFEFF/, ''));
const expectedCount = Array.isArray(products.products) ? products.products.length : 0;

function read(name) {
    return fs.readFileSync(path.join(ROOT, name), 'utf8');
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

const profitHtml = read(paths.profitOutput);
const indexHtml = read(paths.siteIndex);
const settlementHtml = read(paths.settlementOutput);

assert(expectedCount > 0, 'products data is empty');
assert(!profitHtml.includes('__PRODUCTS_DATA_PLACEHOLDER__'), paths.profitOutput + ' still has product placeholder');
assert(!profitHtml.includes('__BUSINESS_CONFIG_PLACEHOLDER__'), paths.profitOutput + ' still has config placeholder');
assert(!settlementHtml.includes('__PRODUCTS_DATA_PLACEHOLDER__'), paths.settlementOutput + ' still has product placeholder');
assert(!settlementHtml.includes('__BUSINESS_CONFIG_PLACEHOLDER__'), paths.settlementOutput + ' still has config placeholder');
assert(profitHtml.includes('var allProducts = ['), paths.profitOutput + ' does not contain injected product array');
assert(settlementHtml.includes('"count":' + expectedCount), paths.settlementOutput + ' does not contain expected product count');
assert(indexHtml === profitHtml, paths.siteIndex + ' is not in sync with ' + paths.profitOutput);

console.log('Build validation OK:', expectedCount, 'products');
