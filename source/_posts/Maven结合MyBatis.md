---
title: Maven结合MyBatis
date: 2016-08-15 16:15:33
categories:
	- java
tags:
	- MyBatis
---
# Maven结合MyBatis
## Maven结合MyBatis

---
1、在pom.xml文件中添加MyBaties所需要的包依赖
如下所示：
<!-- more -->
![alt tu21][maven21]

[maven21]: /img/maven21.png "Eclipse使用"

---
2、在main/resource下新建MyBatis的配置文件，命名为mybatis-config.xml
内容如下所示，图中的mappers为引入的映射文件：
![alt tu22][maven22]

[maven22]: /img/maven22.png "Eclipse使用"

---
3、在main/resource下，创建db.properties存入链接数据库字段

---
4、在main/java下创建包com.mybatis.util中，创建mybatis的工具类MyBatisUtil用于加载MyBatis的核心配置文件，获取SQLSessionFactory,配置文件中包含了链接数据库的链接字段

---
5、此时，MyBatis的环境搭建成功

---
6、开始用MyBatis框架

---
7、在main/java下新建包com.mybatis.po,中新建实体User，User中若干字段，并创建了有参和无参构造函数。

---
8、 在main/resource下创建包com.mybatis.mapper，用于放实体与数据库的映射文件（在MyBatis核心配置文件中有引入）UserMapper.xml。默认会到这个main/resource下找映射文件

---
9、在main/test下新建包，com.mybatis.test,新建测试类：TestMyBatis.java
内容如下：
![alt tu23][maven23]

[maven23]: /img/maven23.png "Eclipse使用"
