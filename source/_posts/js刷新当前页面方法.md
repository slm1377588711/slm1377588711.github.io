---
title: js刷新当前页面方法
date: 2017-12-06 18:47:53
categories:
	- web前端
tags:
	- javascript
---


# js刷新当前页面方法

- reload方法：强迫浏览器刷新当前页面，参数为可选参数，默认为false,从客户端缓存里面取当前页。true,则是以Get方式从服务端去最新的页面，相当于F5

```
location.reload();
```

<!-- more -->
- replace,该方法通过指定URL替换当前缓存在历史里的项目，因此，当时用replace方法之后，不同通过“前进”和“后退”来访问已经被替换的URL.如果页面method="post"时，会出现“网页过期”的提示，原因是session


```
location.replace(URL);
location.replace(URL); //每次都要从服务端重新被创建
locaton,replace(document.referrer) //参数是前一个页面的URL，实现返回并且刷新
```
> 刷新页面的几种方法

```
1，history.go(0) 
2，location.reload() 
3，location=location 
4，location.assign(location) 
5，document.execCommand('Refresh') 
6，window.navigate(location) 
7，location.replace(location) 
8，document.URL=location.href
```

自动刷新页面的方法

1. 加入<head>便签中如下代码：20秒刷新一次


```
<meta http-equiv="refresh" content="20">
```

1. 页面自动跳转:20秒后跳转到我的博客


```
<meta http-equiv="refresh" content="20;url=http://dreammei.me">
```
1. 页面自动刷新：使用setTimeout()


```
function doRefresh(){
    window.location.reload();
}
setTimeout('doRefresh()',1000);
```