---
title: ajax的使用
date: 2016-09-15 18:18:18
categories:
	- web前端
tags:
	- ajax
---
# ajax的使用:
###### load()方法
是局部方法需要一个包含元素的jQuery对象作为前缀
三个参数
- url(请求html文件的URL地址,类型为String),
- data(可选,发送的key/value数据,类型为Object),
- callback(可选,成功或失败的回调函数,类型为函数Function)

<!-- more -->

> (第一个参数)载入一段html内容
> $("#box").load("test.html");
> 对html文件过滤,在URL后跟了选择器
> $("#box").load("test.html.my");
> (第二个参数,如果写上说明是post请求,如果不写为get)
> $("#box").load("userServlet?name=zhangsan")
> $("#box").load("userServlet",{name:'zhangsan'});
> (第三个参数)
> $("#box").load("userServlet",	
> 	      {name:'zhangsan'},
> function(response,status,xhr){
> alert('返回的值是:'+response+',状态是:'+status+'http状态的说明'+xhr.statusText);
> });
###### get()方法 
四个参数 比load多了一个type
就是服务器返回的内容格式:
xml/html/script/json/jsonp/text
> 一般情况下type 参数是智能判断，并不
> 需要我们主动设置，如果主动设置，则会强行按照指定类型格式返回。果主动设置，则会强行按照指定类型格式返回。
###### $.get()和$.post()区别
- GET 请求是通过URL 提交的，而POST 请求则是HTTP 消息实体提交的；
- GET 提交有大小限制（2KB），而POST 方式不受限制；
- GET 方式会被缓存下来，可能有安全性问题，而POST 没有这个问题；
- GET 方式通过doGet()获取，POST 方式通过doPost()获取。

###### $.getScript()和$.getJSON()
$.ajax()只有一个参数,用于各个功能的键值对

---



```
$.ajax({
url:"",
type:"",
timeout,
data:{},发送到服务器的对象
datatype:"",返回的数据类型
beforeSend:function,发送请求前可修改XMLHttpRequest对象的函数
complete,请求完成后调用的回调函数
success,请求成功后返回的回调函数
error,请求失败时返回的回调函数
global,boolean 默认为true,表示是否触发全局Ajax
cache,设置浏览器缓存响应,默认为true,如果dataType类型为script或者jsonp则为false
content,指定某个元素为这个请求相关的所有回调函数的上下文
contentType,指定请求内容的类型.默认为application/x-www-form-urlencoded
async,是否异步处理,默认为true,false为同步处理
processData,默认为true,数据被处理为URL编码格式.如果为false,则阻止将传入的数据处理为URL编码的格式
dataFilter,用来筛选响应数据的回调函数
ifModified,默认为false,不进行头检测,如果为true,进行头检测,当相应内容与上次请求改变是,请求认为是成功的
jsonp,指定一个查询参数名来覆盖默认的jsonp回调参数名callback
username,在Http认证请求中使用的用户名
password,在HTTP认证中请求中使用的密码
scriptCharset,当远程和本地内容使用不同的字符集是,用来设置script和jsonp请求所使用的字符集
xhr,用来提供XHR实例自定义实现的回调函数
traditional,默认为false,不使用传统风格的参数序列化,如果为true则使用
});
```


---

> 表单序列化.serialize()
> .serializeArray()把数据整合成键值对的JSON对象
> 
