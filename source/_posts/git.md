---
title: git
date: 2017-10-12 18:42:00
categories:
	- 
tags:
	- 工具
---
# git

###### 重新设置文本编辑器（一般可能是Vi或者是Vim）

```
$ git config --global core.editor emacs
```



<!-- more -->
###### 差异分析工具（改成vimdiff）

```
$ git config --global merge.tool vimdiff
```

###### 查看配置信息

```
$ git config --list
```

###### 查看某个环境变量的设定


```
$ git config user.name
```

###### 初始化一个git仓库


```
$ git init //使用当前目录作为仓库
$ git init “目录名”  //“目录名”为仓库
```

> 初始化后，目录下会出现一个名为.git的目录，所有Git需要的数据和资源都存放在这个目录中

###### 对于当前目录下没有对应的版本，需要对文件进行跟踪,之后再提交

```
$ git add “”
```

###### 拷贝项目

```
$ git clone <repo>
```

###### 拷贝到指定目录

```
$ git clone <repo> <directory>
```
###### 查看项目的当前状态


```
$ git status -s
```
###### 添加当前项目的所有文件


```
$ git add .
```

###### 显示已写入缓存与已修改但未写入缓存的区别

```
$ git diff //尚未缓存的改动
$ git diff -cached  //查看已缓存的改动
$ git diff HEAD //查看一缓存与未缓存的所有改动
```
###### 把缓存区内容添加到仓库中

```
$ git commit
```

##### 取消之前git add添加

```
$ git reset HEAD
```
###### 创建分支

```
$ git branch
```
###### 切换分支

```
$ git checkout (branchname)
```
###### 合并分支命令

```
$ git merge
```
###### 列出分支

```
$ git branch
```
###### 删除分支

```
$ git branch -d(branchname)
```
###### 查看历史提交历史

```
$ git log
$ git log --oneline //查看简洁的版本
$ git log --oneline --graph //查看历史中什么时候出现了分支，合并
$ git log --reverse //逆向显示所有日志

```
###### 打标签

```
$ git tag -a v1.0
```
###### 查看标签

```
$ git tag //查看所有标签
$ git log --decorate --graph
```
###### 查看当前的远程库

```
$ git remote
```
###### 提取远程仓库

```
$ git fetch //从远程库下载新分支与数据
$ git merge //从远端仓库提取数据并尝试合并到当前分支
```
###### 推送到远程仓库
$ git push