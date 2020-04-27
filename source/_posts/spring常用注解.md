---
title: spring常用注解
date: 2016-06-19 12:01:14
categories:
	- java
tags:
	- spring
---

## 注解
##### 需要导入两个包
> spring-aop-4.2.2.RELEASE.jar
> spring-test-4.2.2.RELEASE.jar

<!-- more -->

##### xml文件配置

```
xmlns:context="http://www.springframework.org/schema/context"
http://www.springframework.org/schema/context
http://www.springframework.org/schema/context/spring-context.xsd


<!-- 开启注解扫描 -->
<context:component-scan base-package="com.spring01"></context:component-scan>
```

## 使用注解定义bean
##### @Component

```
//指定UserDaoImplByMysql为spring控制
//如果不指定名字，默认为类名首字母小写
//相当于<bean id="userDao" class=""></bean>
@Component("userDao")
public class UserDaoImplByMysql implements UserDao {
```


> //属性注入  参数默认required=true（表示该属性是否必须注入，如果，没有，则抛出异常）
> //注入不同类型的属性使用不同的注解简单型：@Value  @Qualifier
> @Autowired
> @Qualifier("userDao")
> 
> 
> //加载文件的注解
> @RunWith(SpringJUnit4ClassRunner.class)
> @ContextConfiguration("classpath:applicationContext.xml")
> 