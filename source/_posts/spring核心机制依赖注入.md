---
title: spring核心机制依赖注入
date: 2016-06-19 15:07:52
categories:
	- java
tags:
	- spring
---
# spring核心机制：依赖注入
> Spring的核心机制就是IOC（控制反转）容器。IOC的另外一个称呼是依赖注入（DI）。通过依赖注入，JavaEE应用中的各种组件不需要以硬编码的方法心形耦合，当一个java实例需要其他java实例时，系统自动提供需要的实例，无需程序显式获取。因此，依赖注入实现了组件之间的解耦。

<!-- more -->

## 理解控制反转
> 采用依赖注入方式时，被调用者的实例不再需要调用者来创建，称为控制反转；
> 被调用者的实例通常是由Spring容器来完成的，然后注入调用者，调用者便获得了被调用者的实例，称为依赖注入。
> 依赖注入的基本思想是：明确第定义组件接口，独立开发各个组件，然后根据组件的依赖关系组装运行。

## 基于注解的Bean装配
##### @Autowired

---
用于对Bean的属性变量、属性的set方法及构造方法进行标注，配合对应的注解处理器完成Bean的自动配置工作。它默认按照Bean类型进行装配。@Autowired注解加上@Qualifier注解，可直接指定一个Bean实例名称来进行装配。
##### @Resource

---

相当于@Autowired，配置对应的注解处理器完成Bean的自动配置，区别在于，@Autowired默认按照Bean类型进行装配，@Resource默认按照Bean实例名称进行装配。@Resource包括name和type两个重要的属性。Spring将name解析为Bean的实例名称，type解析为Bean实例的类型。如果指定name属性，则按照实例名称来装配，如果指定type则按照Bean实例类型来装配，如果都不指定，则先按照Bean实例名称来装配，如果匹配不成功，则按照Bean类型里装配，如果都无法装配成功，则抛出NoSuchBeanDefinitionException异常
##### @Qualifier

---
与@Autowired注解配合，将默认按Bean类型装配修改为按Bean实例名称进行装配，Bean的实例名称由@Qualifier注解的参数指定