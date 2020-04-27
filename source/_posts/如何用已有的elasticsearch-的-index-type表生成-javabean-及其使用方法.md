---
title: 如何用已有的elasticsearch 的 index type表生成 javabean 及其使用方法
categories:
	- elasticsearch
tags:
	- 
---


阅读本文章前请先阅读 《如何利用 javabean 自动建立 elasticsearch 的 index type document 》 

在D:\Projects\zinglabs-gitlab\zingbiz\zing-domain\src\main\java\com\zingbiz\domain\entityGenerator\EntityGenerator.java文件里有个main方法，将你已有的index文件的名字赋值index变量，并运行此方法。 如图：


<!-- more -->

![alt tu3][102501]

[102501]: /img/102501.png 

我要将index companys_v2 里的type生成对应的javabean,运行此方法后就会在zingbiz/zing-domain/src/main/java/com/zingbiz/domain/entity这个包下生成companys 包文件，里面有type对应的各个javabean文件.如图：

![alt tu3][102502]

[102502]: /img/102502.png 

刚生成的javabean文件是这样的:
![alt tu3][102503]

[102503]: /img/102503.png 

为了满足我们的需求我们要给它加上些注解。如图：
![alt tu3][102504]

[102504]: /img/102504.png 


@ApiModelProperty,@ESDocument,@TypeVersion,@ApiModel 这些注解在上文《如何利用 javabean 自动建立 elasticsearch 的 index type document 》都有介绍，这里就不再赘述。这里说下以下几个：
@Data 该注解使用在类上，该注解会提供getter、setter、equals、canEqual、hashCode、toString方法。
@Accessors(chain = true) 该注解使用在类上，就可以对javabean进行链式调用。例如：Student student = new Student()
.setAge(24)
.setName("zs");
@PrimaryId 该注解主要是对唯一标识id的注解（一定要有）
在生成的javabean包下建立Index.java。如图：
![alt tu3][102505]

[102505]: /img/102505.png 

@IndexDiscription 该注解主要是对应index的名字与版本号
JavaBean的使用
建自己模块的包文件及依赖，例如：其他应用模块要有的包和文件（与原来建模块基本相似）： 
![alt tu3][102506]

[102506]: /img/102506.png 
![alt tu3][102507]

[102507]: /img/102507.png 

这里重点介绍一下repository包及包里的文件 
![alt tu3][102508]

[102508]: /img/102508.png 

我们要用JavaBean，就要在service目录下建一个repository包，此包内要定义一个接口继承ZingRepository<>类。此接口内可以什么都不写，因为在ZingRepository接口内已经实现基本使用的增删改查方法： 
![alt tu3][102509]

[102509]: /img/102509.png 

同时兼顾了以前对ES的一些操作： 
![alt tu3][102510]

[102510]: /img/102510.png 

如果发现还满足不了自己的需求，就在自己定义的接口内写： 

![alt tu3][102511]

[102511]: /img/102511.png 

上面方法里传入的pageWrapper是封装的routing，pageNumber，pageSize 

![alt tu3][102512]

[102512]: /img/102512.png 

注：如果没有复杂的业务逻辑可以不建service包，看自己的使用场景。 
![alt tu3][102513]

[102513]: /img/102513.png 

一切准备就绪，就可以写我们的业务代码了. 先看几个例子： 

![alt tu3][102514]

[102514]: /img/102514.png 

![alt tu3][102515]

[102515]: /img/102515.png 
![alt tu3][102516]

[102516]: /img/102516.png 
![alt tu3][1025017]

[102517]: /img/102517.png 

这些方法用的就是像Spring Data JPA 规范方法的名字，根据符合规范的名字来确定方法需要实现什么样的逻辑。比如，当你看到 UserDao.findUserById() 这样一个方法声明，大致应该能判断出这是根据给定条件的id查询出满足条件的 UserDao对象。在查询时，通常需要同时根据多个属性进行查询，且查询的条件也格式各样（大于某个值、在某个范围等等），为此提供了一些表达条件查询的关键字:
And--- 等价于 SQL 中的 and 关键字，比如 findByUsernameAndPassword(String user, Striang pwd)；
BETWEEN--- 等价于 SQL 中的 between 关键字，比如 findBySalaryBetween()；
LESS_THAN--- 等价于 SQL 中的 "<"，比如 findBySalaryLessThan()；
GREATER_THAN--- 等价于 SQL 中的">"，比如 findBySalaryGreaterThan()； 关键词的具体情况请在QuerydslZingRepository文件中查阅： 
![alt tu3][102518]

[102518]: /img/102518.png 
图中红线标出来的的是以提供的关键词，其他关键词看需求再进行补充；
总结：
在 zingbiz/zing-domain/src/main/java/com/zingbiz/domain/entity 这个包下建立自己模块的实体
在 zingbiz/zing-domain/src/main/java/com/zingbiz/domain/entity 这个包下建立自己模块的Index.java
用JavaBean创建自己的index type，即调用自己initService
建自己模块的包文件及依赖;
建一个repository包，此包内要定义一个接口继承ZingRepository<>类
写自己的业务代码；
注：查询字段小于三个的时候，尽量不要用findByAll,可以用And连接你要查询的字段；