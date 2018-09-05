
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

    previous() {
        const prev = this.getPrevious();

        return prev ? (this.current = prev, true) : false;
    },

    next() {
        const next = this.getNext();

        return next ? (this.current = next, true) : false;
    },

    getPrevious() {
        const current = this.current;

        return current <= 1 ? null : current - 1;
    },

    getNext() {
        const total = this.getPageTotal();
        const current = this.current;

        return current >= total ? null : current + 1;
    },

    isFirstPage(current) {
        return current <= 1;
    },

    isLastPage(current) {
        const total = this.getPageTotal();
        return current >= total;
    },

    getPageTotal() {
        const { total, pageSize } = this;
        return Math.max(Math.ceil(total / pageSize), 1);
    },

    getCurrentRange(mapFn = v => v) {
        const { pageRange, current } = this;
        const pageTotal = this.getPageTotal();
        const p = ~~(pageRange / 2);//Math.floor

        const list = [];
        let end = Math.min(current + p, pageTotal - 1);
        const start = Math.max(end - pageRange + 1, 2);

        list.push(mapFn({
            page: 1,
            isCurrent: current === 1
        }));
        //showPrevMore
        if (start > 2) {
            list.push(mapFn({
                page: null,
                isPreviousMore: true,
            }));
        }

        const cpn = end - start + 1;

        if (cpn < pageRange) {
            end = Math.min(pageTotal - 1, end + pageRange - cpn);
        }

        for (let page = start; page <= end; page++) {
            list.push(mapFn({
                page: page,
                isCurrent: current === page
            }));
        }
        //showNextMore
        if (end < pageTotal - 1) {
            list.push(mapFn({
                page: null,
                isNextMore: true,
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

}