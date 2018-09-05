var Pagination = require('../lib');

var pagination = new Pagination({
    total: 61,
    pageSize: 10,
    pageRange: 3
});

var range = pagination.getCurrentRange();

console.log(range);

pagination.current = 4;

var range = pagination.getCurrentRange();

console.log(range);

console.log(pagination.isLastPage(78))