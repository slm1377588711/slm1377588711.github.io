---
title: jQuery事件
date: 2017-12-06 18:53:03
categories:
	- web前端
tags:
	- jQuery
---

# jQuery事件

##### 浏览器

> error 报错时

> resize 重置窗口大小时

> scroll 元素滚动

<!-- more -->

##### 文档加载：

> ready DOM准备就绪时

> unload 离开页面时


> empty() 删除元素内容

##### 绑定事件

> trigger 触发指定事件类型

> one 执行一次事件函数

> bind 为一个元素绑定一个事件处理程序

> die 从元素中删除先前用live绑定的所有事件

> delegate 方法为指定的元素添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数，可用于当前或未来的元素 

> unbind 删除所有事件
 

##### 表单事件

> blur 输入域失去焦点

> change 输入域发生改变

> focus 输入域得到焦点

> focusin 获得焦点，与focus的区别是，它可以在父元素上检测子元素获得焦点的情况

> focusout 失去焦点，与blur的区别是，它可以在父元素上检测子元素获得焦点的情况

> select 当目标被选中时触发

> submit 提交

##### 键盘事件

> keydown 按下键盘触发

> keypress 键盘按下一直不松开触发

> keyup 松开键盘触发



##### 鼠标事件：
> click 单击
    
> dblclick 双击

> hover 当鼠标进入和离开时执行，绑定两个函数

> mousedown 按下鼠标按钮
> mouseenter 鼠标指针进入（穿过）元素时

> mouseleave 鼠标离开

> mousemove 鼠标指针在指定元素中移动

> mouseout 鼠标指针移开

> mouseover 位于元素上方

> mouseup 松开鼠标按钮