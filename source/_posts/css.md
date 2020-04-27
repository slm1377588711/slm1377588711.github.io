---
title: css
date: 2014-11-03 16:50:22
categories:
	- 前端
tags:
	- HTML+CSS总结
---
# html+css总结
#### HTML
#####  字符
- UTF-8：字符全，每个汉字占3个字节，所以文本尺寸大
- gb2312(gbk):字符少，每个汉字2个字节，所以文件尺寸小
#####  关键词、页面描述
<!-- more -->
```
<meta name="keyword" content="考试,java考试,javaweb考试" />
```
- 页面关键词

```
<meta name="description" content="页面描述" /> 页面描述
```

- 标题图标

```
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico/>"
```

#####  a标签

```
<a href="网址" title="悬停文本" target="_blank">超链接文本</a>
```

- 页面内的锚点
 1.
```
<a name="top"></a>
```

  2.
```
<a id="top"></a>
```

- 返回顶部
```
<a href="#top"></a>
```

##### 无序列表（组标签：要么不写，要么就要写一组）

> 	所有的li标签不能单独存在，必须包裹在ul里面，反过来说，ul下只能有li标签
> 	li是一个容器级标签，li可以放置很多内容

##### 有序列表ol(用的不多 组标签)
##### 定义列表(组标签)
- 	是块级元素，可直接设置其每个子元素的宽高
- 	dl 表示definition list
- 	dt 表示definition title 定义标题
- 	dd 表示definition description 定义描述词
- 	dt 、 dd 只能在dl里面；dl里面只能有dt、dd
	例：
		
```
<dl>
			<dt>北京</dt>
			<dd>国家首都，政治文化中心</dd>
		</dl>
```

- 	定义列表一个dt可以有多个dd
	
##### div和span
- 	span里面是放置小元素的，div里面放置大东西（div主要的是布局）
- 	span里面只能放置文字、图片、表单元素。不能放p/h/ul/il/div
##### 选择
######  单选按钮radio
一组的情况下，name属性值要一样 checked默认选中
######  复选框 checkbox
一组的情况下，name属性值要一样 checked默认选中
######  下拉列表 
###### select option选项 
selected默认选中

```
<select>
		<option value="001">北京</option>
		<option value="002">河北</option>
</select>
```

##### label标签

```
<label for="useridname">用户名：</label><input type="text" name="username" id="useridname"/>
```

> 	label标签的for属性值等于文本框的id属性值，把文本提示和文本框绑定在了一起

字符实体（最长用的）

```
&lt;  <
	&gt;  >
	&copy; 版权符号
	&nbsp; 空格
```


#### CSS
- 	html 超文本标记语言 从语义的角度描述页面结构
- 	CSS 层叠样式表		从审美的角度负责页面样式
- 	JS	javascript		从交互的角度描述页面行为
- css(cascading style sheet) 层叠样式表
> 
> 就是一个标签，可以同时被多种选择器选择，标签选择器、
> id选择器、类选择器。这些选择器都可以选择上同一个标签，
> 从而影响样式，这就是css的cascading“层叠式”的第一层含义。

		三中使用方式
- 			1.行内样式
- 			2.内嵌样式
- 			3.外部引入
			
	
- 	字体加粗
		
```
font-weight:bold 快捷键  fwb
```
  
- 	不加粗
	
```
font-weight:normal 快捷键    fwn
```

- 	斜体：
	
```
font-style:italic 快捷键 fsi
```

- 	不斜体 
	
```
font-style:normal   快捷键  fsn
```

- 	下划线
	
```
text-description:underline  快捷键 tdu
```

##### 选择器
- 		大小写严格区分
- 		类选择器 任何的标签都可以携带class属性，可以多个标签使用同一个class
- 		同一个标签可能使用了多个class 使用空格分开
			例：
			
```
<p class="pp test"></p>
```

###### 		高级选择器
- 			后代选择器(空格表示后代，不止是儿子)
				.div p{}
- 			交集选择器(选择的元素同时满足两个条件：必须是h3标签，然后class必须是.special)
				沒有空格
				.h3.special{}
- 			并集选择器 (用逗号隔开就是并集选择器)
				h3,li{}
- 			儿子选择器 IE7开始兼容（只能选择儿子,儿子的兄弟，与后代不同）
				div>p{}
				<div><p></p></div>
- 			序选择器  IE 8开始兼容
				选择第一个li
					ul li:first-child{}
				选择最后一个li
					ul li:last-child{}
- 			下一个兄弟选择器 IE7开始兼容(选择上的是h3元素后面紧挨着的第一个兄弟。)
			 表示选择下一个兄弟
						
```
h3+p{}
				<h3></h3>
				<p></p>
```

			nth-child(n) 索引从1开始 even偶数  odd奇数
			
##### Css的继承性和层叠性
- 		继承性：color、text-开头的、line-开头的、font-开头的都能够被后代继承
				**a不继承text、font这些东西。因为a自己有一个伪类的权重。**
			关于文字样式的，都能够继承；所有关于盒子的、定位的、布局的属性都不能继承
- 		层叠性：就是css处理冲突的能力，所有的权重计算，没有任何兼容问题
			当选择器选择中了某个元素的时候，要统计权重(数量)
			id    class     标签
			如果权重一样，那么以后出现的为准
			如果不能直接选中某个元素，通过继承性影响的话，那么权重为0
				如果 ，大家都是0，那么谁离目标元素最近，听谁的
			！important标记
				p{
					color:red !important;
				}
				!important提升的是一个属性，而不是一个选择器
				!important无法提升继承的权重 是0还是0
				！important标记 不影响就近原则
				！important标记做网站的时候，不允许使用
##### 浮动  （性质：脱标、贴边、字围、收缩）
	收缩：一个浮动的元素，如果没有设置width，那么将自动收缩为文字的宽度
	一旦一个元素浮动了，那么将能够并排了，并且能够设置宽高。无论他原来是个div还是span。不区分行内元素和块级元素
	浮动元素，有”字围“效果，div浮动，p不浮动，div 挡住了p,但是，p中的文字不会被挡住
	浮动永远不是一个东西单独浮动，浮动都是一起浮动，要浮动，大家都浮动
##### 清除浮动总结
- 		1.加高法：给浮动的元素设置高，但是，我们不会给所有的盒子设置高。一般都是自动撑开
- 		2.clear:both法：给盒子增加这个属性，表示自己的内部元素不受其他盒子的影响，但是，margin失效
- 		3.外墙法：在两部分浮动元素之间，建一堵墙，让后面的盒子，不再去追前面的尾
			内墙法：在前面的浮动元素内建一堵墙，优点：能够让后部分浮动元素不去追前部分的浮动，并且能把第一个浮动元素撑出高度
- 		4.overflow：hidden一个父亲，不能被自己浮动的儿子撑出高度，但是，如果这个父亲加上了overflow:hidden；那么这个父亲就能够被浮动的儿子撑出高度了，overflow:hidden;能够让margin生效。	
##### margin
	标准文档流中，竖直方向的margin不叠加，以较大的为准
	盒子居中 margin:0 auto;
		使用margin:0 auto;的盒子，必须有明确的width
		只有标准流的盒子，才能使用margin:0 auto;居中
			当一个盒子浮动、绝对定位、固定定位都不能使用
	善于使用父亲的padding，而不是儿子的margin
		如果父亲没有border，那么儿子的margin实际上踹的是“流”，踹的是这“行”。所以，父亲整体也掉下来了
		margin这个属性，本质上描述的是兄弟和兄弟之间的距离； 最好不要用这个marign表达父子之间的距离。
##### font属性
- 	font:14px/24px"宋体";
- 	font:14px/100%"宋体";
- 	页面中，中文我们只使用： 微软雅黑、宋体、黑体。 如果页面中，需要其他的字体，那么需要切图。
- 						英语：Arial 、 Times New Roman
##### background-position背景定位
- 		background-position:向右移动量 向下移动量;
- 		css精灵
- 		 background-attachment：fixed背景固定		
##### 定位
- 	相对定位position:relative
- 		相对自己原来的位置进行微调
- 		作用：微调元素位置
- 				做绝对定位的参考
- 	绝对定位position:absolute
- 		不区分行内元素和块级元素
- 		绝对定位的参考点，用top描述，那么就是在页面的左上角，而不是浏览器的左上角
- 							如果用bottom描述，那么就是浏览器首屏窗口尺寸
- 		一个绝对定位的元素，如果父辈元素中也出现了定位了的元素，那么将以父辈这个元素，为参考点
- 		要听最近的已经定位的祖先元素，任何定位元素都可以作为参考点。
- 		绝对定位的儿子无视参考盒子的padding
##### 		盒子居中
		
```
width:600px;
			height:60px;
			position:absolute;
			left:50%;
			top :0;
			margin-left:-300px;
```
 宽度的一半
	固定定位position:fixed（IE6不兼容）
			相对浏览器窗口定位
##### Z-index
- 	数值大的压盖住数值小的
- 	只有定位了的元素，才能有z-index值，浮动的元素不可用
##### CSS权重
![alt tu25][css1]

[css1]: /img/css1.png
	