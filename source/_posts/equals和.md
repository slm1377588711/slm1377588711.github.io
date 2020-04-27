---
title: equals和==
date: 2015-02-20 19:45:20
categories:
	- java
tags:
	- equals和==
---
# equals和==
###### ==比较的是内存地址，equals比较的是内容
比较目标是引用类型：
- 默认两种方式都比较内存地址，如需内容相等返回true，需要重写equals方法
- 比较目标是非引用类型,内存地址是一样的，
非引用类型内存地址是一样的

<!-- more -->

```
String str = "str";
String str1 = "str";
System.out.println(str==str1);// true 
System.out.println(str.equals(str1));// true
```

- String引用类型内存地址不一样(重写了equals方法)

```
String str = new String("str");
String str1 = new String("str");
System.out.println(str==str1);// false
System.out.println(str.equals(str1));// true
```

- Student引用类型内存地址不一样(默认都比较内存地址)

```
Student stu = new Student("张三");
Student stu1 = new Student("张三");
System.out.println(stu==stu1);// false
System.out.println(stu.equals(stu1));// false
```
 