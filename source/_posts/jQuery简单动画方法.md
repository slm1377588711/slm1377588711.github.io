---
title: jQuery简单动画方法
date: 2017-12-06 18:54:34
categories:
	- web前端
tags:
	- jQuery
---
# 动画

> 淡出淡入（原理是改变css中的opacity不透明性）

<!-- more -->

```
fadeOut（） //从可见到隐藏

fadeIn（） //从隐藏到可见

fadeToggle()

fadeTo() //将元素改为特定的透明度
```
> 滑动(原理为改变元素的height)


```
slideUp() //高度从大到小

slideDown() //高度从小到大

slideToggle()
```
> animate方法


```
$("元素").animate({
改变的css属性:属性值,
属性:属性值，
属性:属性值，    
},完成花费的时间);
```
