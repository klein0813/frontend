# compatibility

> iphone6s 不支持　`space-evenly`

* 解决思路: `space-evenly`，将每个剩余空间平均分割，`间隔空间数量 = n + 1`；`space-between`，是将最左边和最右边的元素分别占据最左边和最右边的空间,然后剩余空间平均分割，`间隔空间数量 = n - 1`；

  ```css
    justify-content: space-between;
    &:before,
    &:after {
      content: '';
      display: block;
    }
  ```

  参考: <https://www.jianshu.com/p/bbd114834c59>
