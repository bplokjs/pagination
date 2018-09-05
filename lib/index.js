"use strict";

module.exports = Pagination;

function Pagination(options) {
  this.total = options.total;
  this.current = options.current || 1;
  this.pageSize = options.pageSize || 20;
  this.pageRange = options.pageRange || 5;

  if (!this.total) {
    throw new Error('parameter error options[total].');
  }
}

Pagination.prototype = {
  constructor: Pagination,
  previous: function previous() {
    var prev = this.getPrevious();
    return prev ? (this.current = prev, true) : false;
  },
  next: function next() {
    var next = this.getNext();
    return next ? (this.current = next, true) : false;
  },
  getPrevious: function getPrevious() {
    var current = this.current;
    return current <= 1 ? null : current - 1;
  },
  getNext: function getNext() {
    var total = this.getPageTotal();
    var current = this.current;
    return current >= total ? null : current + 1;
  },
  isFirstPage: function isFirstPage(current) {
    return current <= 1;
  },
  isLastPage: function isLastPage(current) {
    var total = this.getPageTotal();
    return current >= total;
  },
  getPageTotal: function getPageTotal() {
    var total = this.total,
        pageSize = this.pageSize;
    return Math.max(Math.ceil(total / pageSize), 1);
  },
  getCurrentRange: function getCurrentRange() {
    var mapFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (v) {
      return v;
    };
    var pageRange = this.pageRange,
        current = this.current;
    var pageTotal = this.getPageTotal();
    var p = ~~(pageRange / 2); //Math.floor

    var list = [];
    var end = Math.min(current + p, pageTotal - 1);
    var start = Math.max(end - pageRange + 1, 2);
    list.push(mapFn({
      page: 1,
      isCurrent: current === 1
    })); //showPrevMore

    if (start > 2) {
      list.push(mapFn({
        page: null,
        isPreviousMore: true
      }));
    }

    var cpn = end - start + 1;

    if (cpn < pageRange) {
      end = Math.min(pageTotal - 1, end + pageRange - cpn);
    }

    for (var page = start; page <= end; page++) {
      list.push(mapFn({
        page: page,
        isCurrent: current === page
      }));
    } //showNextMore


    if (end < pageTotal - 1) {
      list.push(mapFn({
        page: null,
        isNextMore: true
      }));
    }

    if (pageTotal > 1) {
      list.push(mapFn({
        page: pageTotal,
        isCurrent: current === pageTotal
      }));
    }

    return list;
  }
};