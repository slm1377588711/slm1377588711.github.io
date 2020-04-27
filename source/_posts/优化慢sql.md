---
title: 优化慢sql
date: 2018-10-25 17:14:44
categories:
	- elasticsearch
tags:
	- sql
---

优化1、
查询条件含有字段类型是dateTiem的，换另外一种sql写法，直接通过比较日期而不是通过时间戳进行比较。将sql中的时间戳转化为日期执行
select count(*) from sync_block_data where sync_dt >= "2018-10-10 00:03:30" AND sync_dt <= "2018-10-17 00:03:30"

<!-- more -->

优化2、
统计最近7天该表的数据量，可以去掉游标的小于等于（通过少比较一次，将查询速度提升一倍）
select count(*) from sync_block_data where sync_dt >= "2018-10-10 00:03:30" 
优化3、
新建一个bigint类型字段sync_dt_long，存储sync_dt的毫秒值，并在sync_dt_long字段上建立索引
select count(*) from copy_sync_block_data where sync_dt>="2018-10-10 00:03:30" (34毫秒)
select count(*) from copy_sync_block_data where sync_dt_long >= 1539148502916（22毫秒）
优化4、
group by实质是先排序后分组，也就是分组之前必排序。通过分组的时候禁止排序优化sql 执行sql
select FROM_UNIXTIME(copyright_apply_time/1000,'%Y-%m-%d') point,count(1) nums
from resource_info where copyright_apply_time >= 1539336488355 and copyright_apply_time <= 1539941288355 group by point
优化后：
select FROM_UNIXTIME(copyright_apply_time/1000,'%Y-%m-%d') point,count(1) nums
from resource_info where copyright_apply_time >= 1539336488355 and copyright_apply_time <= 1539941288355 group by point order by null

explain 
通过explain,可以查看sql语句的执行情况（比如查询的表，使用的索引以及mysql在表中找到所需行的方式等）用explain查询mysql查询计划的输出参数有

列名                     说明

id                         执行编号，标识select所属的行，如果在语句中没子查询或关联查询，只有唯一的select，每行都将显示1.否则内层的select语句一般会顺序编
                           号，对应于其在原始语句中的位置

select_type         显示本行是简单或复杂select.如果查询有任何复杂的子查询，则最外层标记为primary(derived、union、union result)

table		  访问引用那个表

type                    数据访问/读取操作类型（ALL、index、range、ref、eq_ref、const/system、null）类型不用能导致性能差六倍

possible_keys    揭示哪一些索引可能有利于高校的查找

key                    显示mysql决定采用哪个索引来优化查询

key_len              显示mysql在索引里使用的字节数

ref                     显示了之前的表在key列记录的索引中查找值所用的列或常量


type显示的是访问类型，是较为重要的一个指标，结果值从好到坏依次是：system > const > eq_ref > ref > fulltext > ref_or_null > index_merge > unique_subquery > index_subquery > range > index > ALL，一般来说，得保证查询至少达到range级别，最好能达到ref

类型 说明
All 最坏的情况,全表扫描
index 和全表扫描一样。只是扫描表的时候按照索引次序进行而不是行。主要优点就是避免了排序, 但是开销仍然非常大。如在Extra列看到Using index，说明正在使用覆盖索引，只扫描索引的数据，它比按索引次序全表扫描的开销要小很多
range 范围扫描，一个有限制的索引扫描。key 列显示使用了哪个索引。当使用=、 <>、>、>=、<、<=、IS NULL、<=>、BETWEEN 或者 IN 操作符,用常量比较关键字列时,可以使用 range
ref 一种索引访问，它返回所有匹配某个单个值的行。此类索引访问只有当使用非唯一性索引或唯一性索引非唯一性前缀时才会发生。这个类型跟eq_ref不同的是，它用在关联操作只使用了索引的最左前缀，或者索引不是UNIQUE和PRIMARY KEY。ref可以用于使用=或<=>操作符的带索引的列。
eq_ref 最多只返回一条符合条件的记录。使用唯一性索引或主键查找时会发生 （高效）
const 当确定最多只会有一行匹配的时候，MySQL优化器会在查询前读取它而且只读取一次，因此非常快。当主键放入where子句时，mysql把这个查询转为一个常量（高效）
system 这是const连接类型的一种特例，表仅有一行满足条件。
Null 意味说mysql能在优化阶段分解查询语句，在执行阶段甚至用不到访问表或索引（高效）
