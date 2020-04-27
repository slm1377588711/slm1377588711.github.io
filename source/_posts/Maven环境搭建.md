---
title: Maven环境搭建
date: 2016-7-16 15:17:30
categories:
	- 工具
tags:
	- Maven
---
# Maven
## 搭建maven环境
1、下载apache-maven-3.3.9包，
2、解压到指定目录。本机解压目录D:\devetop-ruanjian\
3、配置环境变量

<!-- more -->

右击我的电脑-->属性-->高级系统设置-->环境变量-->新建环境变量，如图所示：
![alt tu1][maven1]

[maven1]: /img/maven1.png "配置环境变量"
4、编辑环境变量到path中：
![alt tu2][maven2]

[maven2]: /img/maven2.png "配置环境变量"
5、测试是否配置成功
打开cmd窗口，输入 mvn -v回车，出现如下字样，说明配置成功
![alt tu3][maven3]

[maven3]: /img/maven3.png "配置环境变量"
##  配置文件的修改内容：
-  修改默认maven本地仓库保存地址

  进入maven文件地址，打开conf中的settings.xml文件 （以本机为例:）

---

D:\devetop-ruanjian\apache-maven-3.3.9\conf,
修改如下图所示：图4
E:\maven
![alt tu4][maven4]

[maven4]: /img/maven4.png "修改配置文件"
- 修改maven下载文件地址，改为阿里巴巴，如下设置，


```
<mirror>
        <id>nexus-aliyun</id>
        <mirrorOf>*</mirrorOf>
        <name>Nexus aliyun</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public</url>
    </mirror>
```

![alt tu5][maven5]

[maven5]: /img/maven5.png "修改配置文件"
