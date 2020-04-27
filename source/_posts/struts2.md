---
title: struts2
date: 2015-11-10 16:42:31
categories:
	- java
tags:
	- struts2
---
# 学习struts2
## MVC：代码分层思想

- 	M：Model  		javaBean
- 	V：View   		JSP
- 	C：Controller   Servlet
<!-- more -->
> Struts2：底层使用MVC思想实现的    多例

> 对我们来说学习Struts2主要使用用来代替之前的Servlet

> Servlet作用：  单例

- 	1、接受页面参数（类型转换）
- 	2、调用业务逻辑（service）
- 	3、负责页面跳转
	
> 	弊端：

- 		1、接受页面参数过于繁杂，手动类型转换
			request.getParameter(name):
			request.getParameter(name):
			... 
			以上方法的返回值都是String，导致如果接受的数据中包含非字符串，就需要手动完成类型转换操作。
- 		2、负责页面跳转
			转发：request.getRequestDispatcher(path).forward(request,response)
			重定向：response.sendRedirect(path)
	
> 	如何编写一个Servlet应用程序：

- 		1、新建一个类继承HttpServlet类，重新doGet或doPost方法
- 		2、在web.xml中配置Servlet映射
- 		3、在doGet或doPost中编写业务逻辑
		
> Strust2就是用来代替Servlet：充当MVC架构中的Controller

> 	如何搭建一个基于Struts2环境的应用程序：

- 		1、导入Strust2相关的jar包
			asm-3.3.jar
			asm-commons-3.3.jar
			asm-tree-3.3.jar
			commons-fileupload-1.3.1.jar
			commons-io-2.2.jar
			commons-lang3-3.2.jar
			freemarker-2.3.22.jar
			javassist-3.11.0.GA.jar
			log4j-api-2.2.jar
			log4j-core-2.2.jar
			ognl-3.0.6.jar
			struts2-core-2.3.24.1.jar
			xwork-core-2.3.24.1.jar
- 		2、在WebContent目录下编写一个注册的jsp页面：reg.jsp
```
			<input type="radio" name="user.sex"  value="0" checked> 女
```
- 		3、编写Struts的Action类：UserAction  （Servlet）
		
```
public class UserAction {
				private User user;
				public User getUser() {
					return user;
				}
				public void setUser(User user) {
					this.user = user;
				}
				public String reg(){
					//接受页面参数,类型转换
					System.out.println(user);
					//调用业务逻辑
					System.out.println("注册成功");
					//负责页面跳转
					return "regSuccess";
				}
			}
```

		   
		   单独在类中提供一个用来处理注册页面的成员方法：reg
		   		
- 		4、在类加载路径（src）中编写一个
```
struts.xml
			<package name="user" namespace="/" extends="struts-default">
				<!-- 通过reg名称访问UserAction类中的名称为reg的方法 -->
				<!-- Http://localhost:8080/reg.action -->
				<action name="reg" class="com.bdyc.action.UserAction" method="reg">
					<result name="regSuccess" type="redirect">/regSuccess.jsp</result>
				</action>
			</package>
```

		
> 		5、在web.xml中配置一个Struts2的核心过滤器：Filter
		  
```
<!-- Strust2核心过滤器 -->
		  <filter>
		  	<filter-name>struts2</filter-name>
		  	<filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-class>
		  </filter>
		  <filter-mapping>
		  	<filter-name>struts2</filter-name>
		  	<url-pattern>*.action</url-pattern>
		  </filter-mapping>
```

	
==========================================================================================
##### 一、action名称的搜索顺序
		
	 action="/user/common/a/b/reg.action":     	OK
	 action="/user/common/a/b/c/reg.action":   	OK
	 action="/a/b/c/user/common/a/b/reg.action":NO
	 1、先去struts.xml文件中查询有没有namespace：/user/common/a/b
	 2、如果没有就自动剥去一层，查询有没有：/user/common/a
	 3、依次类推。。
	 4、直到找打：/user/common 的名字空间，就会去该名字空间中查询有没有对应的action名称为：reg 
	 5、ok
	 
##### 二、action配置中的默认值
	静态资源：html js css img 
	动态资源：jsp servlet

	为了保证项目中的非静态资源安全性（不允许用户直接访问），开发者一般会将这些动态资源和静态资源分类存放：
	
	动态资源：/WEB-INF 文件夹中（只允许服务器内部访问）
	静态资源：一般存入到项目根路径 WebRoot/WebContent文件夹下


```
/**
	 * 进入注册成功页面
	 * @return
	 */
	public String regSuccess(){
		return "regSuccess";
	}
	
	/**
	 * 进入注册页面
	 * @return
	 */
	public String regUI(){
		return "regUI";
	}
	
	<!-- Http://localhost:8080/user/common/regUI.action -->
	<action name="regUI" class="com.bdyc.action.UserAction" method="regUI">
		<!-- type="dispatcher":转发到页面 -->
		<result name="regUI">/WEB-INF/jsp/reg.jsp</result>
	</action>
	
	<!-- Http://localhost:8080/user/common/regSuccess.action -->
	<action name="regSuccess" class="com.bdyc.action.UserAction" method="regSuccess">
		<result name="regSuccess">/WEB-INF/jsp/regSuccess.jsp</result>
	</action>
```

	通过以上代码分析，为了进入页面必须在action类中提供对应的成员方法，在struts.xml文件中配置对应的Action
	
	+++action配置中的默认值:注意用来让客户端访问动态资源使用+++

```
<package name="nav" namespace="/nav" extends="struts-default">
		<!-- 
			1、少了action成员方法：execute
			2、class：com.opensymphony.xwork2.ActionSupport
			3、method：execute
			4、type：dispatcher
			5、name：success
			
			http://localhost:8080/nav/regUI.action
			<action name="regUI" class="com.opensymphony.xwork2.ActionSupport" method="execute">
				<result type="dispatcher" name="success">/WEB-INF/jsp/reg.jsp</result>
			</action>
		 -->
	
		<action name="regUI">
			<result>/WEB-INF/jsp/reg.jsp</result>
		</action>
		<action name="regSuccess">
			<result>/WEB-INF/jsp/regSuccess.jsp</result>
		</action>
	</package>
```
	
	
##### 三、action中result的各种转发类型
	
	type: dispatcher redirect redirectAction chain  stream
		dispatcher：转发到页面（默认）
		redirect：重定向到页面
		redirectAction：重定向到action
		chain:转发到action
		stream：指定响应数据类型为流（下载）

##### 四、struts2的常量配置：
	
```
<!-- 配置struts2常量 -->
	<!-- 后缀名：struts.action.extension=action,, -->
	<constant name="struts.action.extension" value="action,,do"></constant>
	<!-- 
      	指定默认编码集,作用于HttpServletRequest的setCharacterEncoding方法
     	 和freemarker 、velocity的输出
     	struts.i18n.encoding=UTF-8  post请求乱码：request.setCharacterEncoding("utf-8");
    -->
    <constant name="struts.i18n.encoding" value="UTF-8"/>
	<!-- 
 		设置浏览器是否缓存静态内容,默认值为true(生产环境下使用),开发阶段最好关闭
	-->
    <constant name="struts.serve.static.browserCache" value="false"/>
	<!-- 
 		 当struts的配置文件修改后,系统是否自动重新加载该文件,默认值为false
  		(生产环境 下使用),开发阶段最好打开
 	 -->
    <constant name="struts.configuration.xml.reload" value="true"/>
```


##### 五、struts处理流程
	浏览器请求先进入DispatcherFilter（核心过滤器），先判断该请求是否要交给Strut2处理，
	如果是符合要求的请求，再进入真正的action对应方法之前会先执行一堆拦截器（接受参数，类型转换，封装到对象中）
	再进入对应的aciton方法，处理完 业务逻辑之后，该方法会有一个返回值，系统根据该方法的返回值结合strust.xml中
	对用action的result中的name来确定该页面要跳转到哪个目标，该action方法执行完毕之后就会执行拦截器后
	将所有的拦截器执行完毕之后才会给页面做响应。
	
	
	
##### 六、Struts2优化
	
	action配置优化：
	1、为每一个方法单独配置一个action
	前提条件：struts.xml中开启动态方法调用支持
	
	2、使用动态方法调用方式配置action:  http://localhost:8080/user/userAction!方法名.action
	3、使用通配符方式方式配置action:   http://localhost:8080/nav/user_reg.action * {1}
	
##### 七、配置文件加载顺序：
	default.properties
	struts-default.xml
	struts.xml	
	
	
	
##### 八、接受页面参数几种方式：
	1、在jsp页面中将name属性名设置为： user.username  ,在UserAction中设置一个成员变量：
	  好处：可以直接将页面中的多个参数直接存入到user对象中：一般在提交数据为多个时使用
	  弊端：对页面来说要修改name属性值，可能会导致前台页面效果失效	
	
```
<input type="text" name="user.username"/>
		<input type="text" name="user.password"/>
		<input type="text" name="user.birthday"/>
		public class UserAction{
			private User user;
			public void setUser(User user){
				this.user = user;
			}
			public User getUser(){
				return this.user;
			}
		}
```

	
	2、如果参数很少情况下，后台action需要接受页面参数时。
	    好处： 在action类中提供对应名称的成员变量，并提供setter和getter方法，也可以完成参数接受。
	              不用修改页面
	  弊端：只能一个一个接受
		
```
<a href="/user/userAction_del.action?userId=1&deptId=12">删除</a>
		public class UserAction{
			private Integer userId;
			private Integer deptId;
			public void setUserId(Integer userId){
				this.userId = userId;
			}
			public Integer getUserId(){
				return this.userId;
			}
		}
```

	3、使用ModelDriven接口，帮我们完成页面参数的接受：
		既不用改也可以实现多参数接受
		 
```
UserAction implements ModelDriven<UserVO>{
		 	private UserVO user;
		 	
		 	@Override
			public UserVO getModel() {
				if(user == null){
					user = new UserVO();
				}
				return user;
			}
		 }
```

	