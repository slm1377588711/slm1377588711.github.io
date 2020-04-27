---
title: Json对象与Json字符串互转
date: 2017-12-06 18:52:09
categories:
	- web前端
tags:
	- jQuery
---

# Json对象与Json字符串互转
1.jQuery支持的转换方式

```
$.parseJson(jsonstr)
```
<!-- more -->

2.浏览器支持的转换方式(Firefox，chrome，opera，safari，ie9，ie8)

```
JSON.parse(jsonstr);
JSON.stringify(jsonobj);
```
3.javascript支持的转换方式

```
eval('('+jsonstr+')');//不推荐，不安全
```
