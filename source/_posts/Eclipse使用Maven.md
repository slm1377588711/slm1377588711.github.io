---
title: Eclipse使用Maven
date: 2016-07-21 15:56:05
categories:
	- 工具
tags:
	- Maven
---
# Eclipse使用Maven
## Eclipse配置Maven，如下图所示

<!-- more -->
![alt tu6][maven6]

[maven6]: /img/maven6.png "Eclipse使用"
![alt tu7][maven7]

[maven7]: /img/maven7.png "Eclipse使用"
## 新建java工程
新建Eclipse，Maven项目
1、右击新建maven工程
![alt tu8][maven8]

[maven8]: /img/maven8.png "Eclipse使用"
2、点击下一步
![alt tu9][maven9]

[maven9]: /img/maven9.png "Eclipse使用"
3、点击完成
![alt tu10][maven10]

[maven10]: /img/maven10.png "Eclipse使用"
## 新建javaweb工程

---
新建第一步与java工程一样，但是要把packaging选择war接下来的步骤与新建java项目一样。

- 新建的web项目没有web.xml，依次执行如下步骤解决此问题
- 
选中项目，单击工程
![alt tu11][maven11]

[maven11]: /img/maven11.png "Eclipse使用"

![alt tu12][maven12]

[maven12]: /img/maven12.png "Eclipse使用"

![alt tu13][maven13]

[maven13]: /img/maven13.png "Eclipse使用"
![alt tu14][maven14]

[maven14]: /img/maven14.png "Eclipse使用"


- 新建jsp页面，就会报错，因为缺少servletApI包，引入依赖包
 
- 写EL表达式的时候，也会报错，缺少Jap-API ，引入依赖包
 
因为tomcat中已经有这两个包，所以，不能带着他俩部署，要修改scope，以下是引入依赖配置

```
<!-- 依赖管理 -->
  <dependencies>
  	<!--servlet-api -->
	<dependency>
	    <groupId>javax.servlet</groupId>
	    <artifactId>servlet-api</artifactId>
	    <version>2.5</version>
	    <!-- 部署失效 -->
	    <scope>provided</scope>
	</dependency>
	<!-- jsp-api -->
	<dependency>
	    <groupId>javax.servlet</groupId>
	    <artifactId>jsp-api</artifactId>
	    <version>2.0</version>
	    <!-- 部署失效 -->
	    <scope>provided</scope>
	</dependency>
  </dependencies>
```
## Eclipse中跑项目
##### 在一个Eclipse中跑多个项目，需要配置一个插件

```
<plugin>
			<groupId>org.apache.tomcat.maven</groupId>
			<artifactId>tomcat7-maven-plugin</artifactId>
			<version>2.2</version> 
			<configuration>
				<!-- 部署名称 -->
				<path>/web</path>
				<port>8080</port>
			</configuration>
		</plugin>
```

然后右击项目-->maven-->
![alt tu15][maven15]

[maven15]: /img/maven15.png "Eclipse使用"
Goals：clean tomcat7:run


## 在一个项目中引用另一个java项目
- 在一个java项目中引用另外一个java项目，就需要安装被引用的项目，安装步骤如下：
安装：把打包的jar项目安装到本地仓库

> 1、安装被引用项目的jar
右击被引用项目-->Run As-->Maven intall,控制台出现打包安装存放路径

> 在安装之前，会执行清理、编译、测试、报告、打包
> 2、在项目pom.xml中配置依赖


## 修改Maven默认的资源加载路径

```
<!-- 配置maven资源加载路径 -->
  		<resources>
			<resource>
				<directory>src/main/java</directory>
				<includes>
					<include>**/*.xml</include>
				</includes>
			</resource>
			<resource>
				<directory>src/main/resources</directory>
				<includes>
					<include>**/*.xml</include>
					<include>**/*.properties</include>
				</includes>
			</resource>
	     </resources>
```
