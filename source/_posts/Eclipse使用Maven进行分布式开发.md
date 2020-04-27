---
title: Eclipse使用Maven进行分布式开发
date: 2016-08-10 16:05:09
categories:
	- 工具
tags:
	- Maven
---
# Eclipse使用Maven进行分布式开发


1、首先你做好有一个万能库项目，比如，本机的com.common项目。它是一个聚合项目，其中他包括的你所有积累的库，每次新建项目时，只需要让你的聚合项目继承自common,就可以使用它的jar包。（注：如果没有万能库项目，就在第二步新建的项目中的pom.xml文件中配置需要导入的所有包，同时，第二步的继承也不需要了）

<!-- more -->

2、新建你的maven工程，Packaging选择pom，Group Id 选择你的万能包，此处为com.common,Artifact Id选择你的万能包名称： common，版本号，点击Finish
![alt tu15][maven15]

[maven15]: /img/maven15.png "Eclipse使用"

生成入下图所示的结构：只有src和pom.xml,忽略途中的空白，这是因为作图时留下的
![alt tu16][maven16]

[maven16]: /img/maven16.png "Eclipse使用"

其中pom.xml文件自动生成如下

3、新建父项目的子模块
右击父项目-->Maven-->New Maven Model project
![alt tu17][maven17]

[maven17]: /img/maven17.png "Eclipse使用"

单击Next，可以看到如下图所示：继承自第二步创建的父项目，点击Finish,完成创建
![alt tu18][maven18]

[maven18]: /img/maven18.png "Eclipse使用"

如有多个模块，可创建多个子模块
