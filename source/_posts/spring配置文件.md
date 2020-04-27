---
title: spring配置文件
date: 2016-05-17 19:33:24
categories:
	- java
tags:
	- spring
---
# spring配置文件
###### 头

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:p="http://www.springframework.org/schema/p"
	xsi:schemaLocation="
	http://www.springframework.org/schema/beans 
	http://www.springframework.org/schema/beans/spring-beans.xsd">
```

<!-- more -->

> bean标签把类加入spring容器

```
<!-- 创建UserDao对象
			1、构造方法实例化bean对象
			2、bean对象作用域(默认为单例)：singleton(单例),修改作用域在标签内设置scope="prototype" prototype(多例)
			
			bean（默认）对象生命周期：
			1、配置文件加载时，实例化bean对象
			2、调用init-method属性指定的方法完成初始化
			3、当spring容器关闭时会先调用destory-method属性指定的方法完成资源回收，销毁对象
	 -->
<!-- 创建UserDao对象 相当于 UserDaoImplByMysql userDao = new UserDaoImplByMysql() -->
<bean id="userDao" class="com.spring01.dao.UserDaoImplByMysql" init-method="init" destroy-method="destroy"  scope="prototype"></bean>
```

###### 如何关闭spring容器

```
ClassPathXmlApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
		ac.close();
```

###### 多种注入方式

```
    <!-- 为UserService注入UserDao实现类：DI（依赖注入） -->
    <bean id="userService" class="com.spring01.service.UserServiceImpl">
                <!--setter注入常用 -->
		<property name="userDao" ref="userDao"></property>
		<!-- 构造方法注入方式:index指构造方法的第一个参数 -->
		<constructor-arg index="0" ref="useDao"></constructor-arg>
    </bean>	
<!--p标签注入 p:属性名=ref-->
<bean id="userService" class="com.spring01.service.UserServiceImpl" p:userDao="useDao">
```


---
---------------------------------------++++++++++----------------------------------------------

##### 创建普通java对象
###### 1、基本类型的数据

```
<!-- setter方法注入  EL表达式可计算可返回方法
<property name="salary" value="#{user1.getSalary()}"></property>
-->
	<bean id="user1" class="com.bdyc.model.User">
		<property name="userId" value="1"></property>
		<property name="username" value="zhagnsan"></property>
		<property name="password" value="1233545"></property>
		<property name="age" value="23"></property>
		<property name="salary" value="#{5000*12}"></property>
	</bean>
```


```
<!-- 构造方法注入（了解） -->
	<bean id="user2" class="com.bdyc.model.User">
		<constructor-arg index="0" type="java.lang.Integer" value="2"></constructor-arg>
		<constructor-arg index="1" type="java.lang.String" value="wangwu"></constructor-arg>
		<constructor-arg index="2" type="java.lang.String" value="123123"></constructor-arg>	
	</bean>
```


```
<!-- p：注入（了解）setter  -->
	<bean id="user3" class="com.bdyc.model.User"
		p:userId="3" p:username="lsi" p:password="232434">
	</bean>
```

###### 2、复合类型的数据

```
        <!-- 数组 -->
		<property name="favs">
			<array>
				<value>lol</value>
				<value>lol1</value>
			</array>
		</property>
```

	
```
<!-- List -->
		<property name="lists">
			<list>
				<value>fasdf</value>
				<value>fasdf</value>
			</list>
		</property>
```

	
```
<!-- Set -->
		<property name="sets">
			<set>
				<value>fasdf</value>
				<value>fasdf</value>
			</set>
		</property>
```

	
```
<!-- Map -->
		<property name="maps">
			<map>
				<!-- <entry>
					<key>
						<value>m1</value>
					</key>
					<value>v1</value>
				</entry> -->
				<entry key="m1" value="v1"></entry>
				<entry key="m2" value="v1"></entry>
			</map>
		</property>
```

	
```
<!-- properties -->
		<property name="prop">
			<props>
				<prop key="p1">fasdfa</prop>
				<prop key="p2">fasdfa</prop>
			</props>
		</property>
```



```
</beans>
```

