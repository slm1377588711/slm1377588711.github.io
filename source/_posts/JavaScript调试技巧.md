---
title: JavaScript调试技巧
date: 2017-12-06 19:05:01
categories:
	- web前端
tags:
	- javascript
---

1.debugger
> 除了console.log, debugger是我们最喜欢、快速且肮脏的调试工具。执行代码后，Chrome会在执行时自动停止。你甚至可以把它封装成条件，只在需要时才运行。

<!-- more -->

```
if(thisThing){
    debugger;
}
```
2.用表格显示对象
有时，有一组复杂的对象要查看。可以通过console.log查看并滚动浏览，亦或者使用console.table展开，跟容易看到正在处理的内容


```
var animals = [
   { animal: 'Horse', name: 'Henry', age: 43 },
   { animal: 'Dog', name: 'Fred', age: 13 },
   { animal: 'Cat', name: 'Frodo', age: 18 }
];

console.table(animals);
```
3.使用不同屏幕尺寸
4.在控制台中使用Elments面板中标记一个DoM元素

5.用console.time()和console.timeEnd()测试循环
> 要得知某些代码的执行时间，特别是调试缓慢循环时，非常有用。 甚至可以通过给方法传入不同参数，来设置多个定时器。来看看它是怎么运行的


```
console.time('Timer1');

var items = [];

for(var i = 0; i < 100000; i++){
  items.push({index: i});
}

console.timeEnd('Timer1');
```
6.获取函数的堆栈跟踪信息
 console.trace 可以方便地调试JavaScript.

7.将代码格式化后再调试javascript
经过压缩的js代码，很难看的清除，点击源代码查器左下角的{}按钮 

8.快速查找要调用的函数
在控制台中使用debug(funcName)，当到达传入的函数时，代码将停止。

9.屏蔽不相关代码
右击引入的不相关文件代码，选择Blackbox Script

10.在复杂的调试过程中寻找重点

在调试JavaScript时，可以使用CSS并自定义控制台信息：


```
console.todo = function(msg) {
 console.log(‘ % c % s % s % s‘, ‘color: yellow; background - color: black;’, ‘–‘, msg, ‘–‘);
}

console.important = function(msg) {
 console.log(‘ % c % s % s % s’, ‘color: brown; font - weight: bold; text - decoration: underline;’, ‘–‘, msg, ‘–‘);
}

console.todo(“This is something that’ s need to be fixed”);
console.important(‘This is an important message’);
```
