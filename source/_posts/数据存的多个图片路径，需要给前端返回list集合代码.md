---
title: 数据存的多个图片路径，需要给前端返回list集合代码
date: 2018-06-22 18:35:41
categories:
	- java
tags:
	- 备忘代码
---


##### 库中存的图片路径是以逗号分割的

```
        // 上传的图片（retMap为查询出来的整个文档）
            String picture = (String) retMap.get("pictureUrl");
            List pictureList = new ArrayList();
            if (picture != null && StringUtils.isNotEmpty(picture)) {
                String[] pictureArr = picture.split(",");
                pictureList = Arrays.asList(pictureArr);
                if (pictureList == null) {
                    pictureList = new ArrayList();
                }
            }
            retMap.put("pictureList", pictureList);
```
