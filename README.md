# 五子棋

## 技术栈

react,typescript,canvas

## 启动项目

```
npm install
npm start
```

## 实现功能

- canvas,dom 切换
- 下棋输赢
- 悔棋
- 撤回悔棋

## 需求难点

- 对 canvas 绘制功能不太熟悉
- 判断输赢的算法可能比较复杂(力扣相关题目是困难级)

## 遇到问题

- 点击时产生的 clientX/clientY, 在二维数组的索引是[clientY,clientX],而在 canvas 里面的绘制与二维数组记录相反, 需要略微梳理下逻辑。
- canvas 实现悔棋功能, 有一种解决方案是使用 getImageData 和 putImageData, 思路是将整个 canvas 存入栈中, 这样存的越多, 性能问题越明显; 最后根据实际场景, 只需要关注棋子的绘制, 采用了循环下棋记录多次 drawImage 的改进方式。[关于性能：为什么 putImageData 这么慢？](https://www.codenong.com/3952856/)
- dom 和 canvas 复用父组件的 state, 但是 canvas 有额外的绘制需要, 先是使用 useImperativeHandle 实现父组件调用子组件的绘制 function，但是很快出现了问题:读取传入的 pieces 一直是初始值, 查阅资料是闭包的相关问题, 最后采用传参替代 state 参数的方式解决。
- 扩展运算符浅拷贝 state 后的临时值, 更改时会引起 state 值意料之外的变化, 最后采用深拷贝的方式复制 state 值, 经查阅资料也可以使用数组的slice复制。

## 总结

- 熟悉了 canvas 的应用。
- 加深了 react 父子组件通信的理解。
- 实际判断输赢的方法与 leetcode 相去甚远，最终时间复杂度仅为 O(1)。
