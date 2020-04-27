---
title: 项目中已有封装es查询，进行范围查询
date: 2018-06-22 18:26:44
categories:
	- java
tags:
	- 备忘代码
---


查询参数：开始时间和结束时间。查询字段是创建时间

```
if(map.containsKey("startTime") || map.containsKey("endTime")){
                String str = map.get("startTime").toString();
                String str2 = map.get("endTime").toString();
                if(str!=null && !"".equals(str) && str2!=null && !"".equals(str2)){
                    ParamES[] genTimeRangParam=new ParamES[2] ;

                    ParamES paramESParamB = new ParamES("create_time", str, ParamES.ES_QUERY_MUST, ParamES.ES_TYPE_GTE);
                    genTimeRangParam[0]=paramESParamB;

                    ParamES paramESParamE = new ParamES("create_time", str2, ParamES.ES_QUERY_MUST, ParamES.ES_TYPE_LTE);
                    genTimeRangParam[1]=paramESParamE;

                    ParamES paramESGenTime=new ParamES("create_time",genTimeRangParam,ParamES.ES_QUERY_MUST,null);
                    queryMap.put("create_time", paramESGenTime);
                }

            }
```
