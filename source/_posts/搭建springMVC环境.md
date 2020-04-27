---
title: 搭建springMVC环境
date: 2016-08-19 16:28:21
categories:
	- java
tags:
	- springMVC
---
# springMVC环境搭建
## 基于MAVEN搭建

- 1、新建Maven项目，选择war包（参见 Maven/新建web项目）
- 2、利用maven导包，在配置文件中添加如下依赖：
  	
<!-- more -->

```
<!-- spring-context -->
	<dependency>
	    <groupId>org.springframework</groupId>
	    <artifactId>spring-context</artifactId>
	    <version>4.2.2.RELEASE</version>
	</dependency>
	<!-- spring-webmvc -->
	<dependency>
	    <groupId>org.springframework</groupId>
	    <artifactId>spring-webmvc</artifactId>
	    <version>4.2.2.RELEASE</version>
	</dependency>
```

还需添加servlet的依赖，和jstl的依赖：

```
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
  	
  	<!-- /jstl -->
	<dependency>
	    <groupId>javax.servlet</groupId>
	    <artifactId>jstl</artifactId>
	    <version>1.2</version>
	</dependency>
```

- 3、前端控制器配置
在web.xml中：

```
<!--springmvc 前端控制器：servlet
		默认情况下：只会去 /WEB-INF/[servlet-name]-servlet.xml 这个配置文件，但是我们编写的配置文件不符合上述要求
		我们需要手动指定配置文件的加载路径：
	 -->
	<servlet>
		<servlet-name>springmvc</servlet-name>
		<servlet-class>
			org.springframework.web.servlet.DispatcherServlet
		</servlet-class>
		<!-- 指定配置文件家在路徑 -->
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>classpath:springmvc.xml</param-value>
		</init-param>
		<!-- 表示servlet随服务启动 -->
		<load-on-startup>1</load-on-startup>
	</servlet>
	<servlet-mapping>
		<servlet-name>springmvc</servlet-name>
		<url-pattern>*.do</url-pattern>
	</servlet-mapping>
```

- 4、springMVC配置文件
在类加载路径下新建springmvc.xml.内容：

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:mvc="http://www.springframework.org/schema/mvc"
	xmlns:p="http://www.springframework.org/schema/p"
	xsi:schemaLocation="
	http://www.springframework.org/schema/beans 
	http://www.springframework.org/schema/beans/spring-beans.xsd
	http://www.springframework.org/schema/context
	http://www.springframework.org/schema/context/spring-context.xsd
	http://www.springframework.org/schema/mvc
	http://www.springframework.org/schema/mvc/spring-mvc-4.2.xsd">
	
	<!-- 开启注解扫描:只需扫描Controller表现层就行 -->
	<context:component-scan base-package="com.bdyc.controller"/>
	
	<!-- 开启springmvc注解支持 -->
	<mvc:annotation-driven/>
	
	<!-- 配置视图解析器:ViewResolver -->
	<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		<!-- 前缀配置  -->
		<property name="prefix" value="/WEB-INF/jsp/"/>
		<!-- 后缀配置  -->
		<property name="suffix" value=".jsp"/>
	</bean>
	
</beans>
```

- 5、处理器开发：例

![alt tu24][maven24]

[maven24]: /img/maven24.png 
> 图解：
> （1）、注解@Controller表示此类为控制器
> （2）、RequestMapping是一个用来处理请求地址映射的注解
> （3）、请求方式为get
> （4）、Model model相当于request
> （5）、把list值存放在request 作用域中
> （6）、return，默认为转发。

> 设置重定向	//将地址重定向到全查Controller重新查询展示
> 		//如果方法返回值中：redirect开头 那么系统将不会再进行视图解析器拼接
> 		return "redirect:/user/list.do";
> 

- 6、启动tomcat，地址栏输入
启动远程的tomcat的前提是，在pom.xml的配置文件中配置tomcat插件

```
<configuration>
				<!-- 部署名称 -->
				<path>/springMVC</path>
				<port>8080</port>
			</configuration>
```

地址栏输入：http://localhost:8080/springMVC/user/list.do