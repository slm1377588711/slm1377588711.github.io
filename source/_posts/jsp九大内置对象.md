---
title: jsp九大内置对象
date: 2014-11-25 17:16:03
categories:
	- java
tags:
	- jsp
---
# jsp九大内置对象
######  1、request 一次请求有效（地址栏不变）
 > 	类型：javax.servlet.http.HttpServletRequest
 > 	作用域： request  一次请求（浏览器地址栏只要不变）
 > 	常用方法：
1. 	request.getParameter(name):接受页面一个参数值
2. 	request.getParameterValues(name):接受页面一组参数值（checkbox select）
3. 	reqeust.getRequestDispatcher(path).forward(request,response):将页面"转发"到目标地址
4. request.setAttribute(name,value):向request作用域中添加额外属性
5. request.getAttribute(name):从request作用域中获取指定属性值
6. request.setCharacterEncoding("utf-8"):设置请求编码，解决POST请求中文乱码问题

<!-- more -->

###### 2、response
###### 3、session	一次会话有效（浏览器关闭）
 > 常用方法：
1. session.getId():获取sessionId
2. session.isNew();判断session是否是新建的
3. session.setAttribute(key,value):向session作用域对象中添加属性值
4.	session.getAttribute(key):从session作用域中获取值
5. session.removeAttribute(key):从session作用域中删除某个属性值
6. session.setMaxInactiveInteaval();设置session的最大失效时间，默认30分钟 20分钟=60*1000*20
7. session.invalidate();销毁session（手动终止会话方式）；

###### 4、application 一次服务关闭(只要服务器不关闭，它就一直存在)
 > 常用方法：
1. application.setAttribute(key,value);
2. application.getAttribute(key);

###### 5、page	当前页面有效
###### 6、pageConrext 当前页面有效
 > 常用方法：
1. pageContext.getRequest();
2. pageContext.getResponse();
 	...
3. pageContext.setAttribute(key,value);
4. pageContext.getAttribute(key);

###### 7、config 当前页面有效
 > 常用方法：
1.	config.getInitParameter(name);
2. 	config.getInitParameterValues();

###### 8、exception 当前页面有效
 > 常用方法：
1. 	exceptin.getMessage();//获取异常信息
2. 	exception.printStackTrace();//打印异常堆栈信息

###### 9、out