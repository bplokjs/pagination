# pagination
生成pagination数据对象

## 构造函数

`Pagination({
    total: 100,
    current: 1,
    pageSize: 10,
    pageRange: 5
})`

## 属性

- `total` 总数
- `current` 当前页 默认为1
- `pageSize` 页码大小 默认为10
- `pageRange` 分页按钮显示的最大数 默认为5

## 方法

- `getCurrentRange( fn )` 获取当前分页的列表。

    该方法接收一个函数作为结果項进行处理

- `getPageTotal()` 获取页面总数
- `isFirstPage(pn)`  判断是否第一页
- `isLastPage(pn)` 作用同上
- `getNext()` 获取下一页的页码，如果不存在则返回null
- `getPrevious()` 作用同上
- `previous()` 翻页，上一页，如果失败则返回false
- `next()` 翻页，下一页，如果失败则返回false

## 示例

```
const pagination = new Pagination({
    total: 161,
    pageSize: 10,
    pageRange: 5
});

console.log( pagination.getCurrentRange() );

pagination.current = 8;

console.log( pagination.getCurrentRange() );

pagination.next();

console.log( pagination.getCurrentRange() );

```