---
title: 复用次数多的代码，根据cardUrl查询名字
date: 2018-06-22 18:37:26
categories:
	- java
tags:
	- 备忘代码
---

			retMap = ESUtil.selectEE(Constants.INDEX_HOTEL, Constants.HOTEL_CONTACTSINFO, queryMap, null, companyId, null);
            if (!retMap.isEmpty()) {
                List retList = (List) retMap.get("data");
                if (retList.size() > 0) {
                    for (int i = 0; i < retList.size(); i++) {
                        Map objMap = (Map) retList.get(i);
                        //负责人的名字
                        String responsiblePerson = (String) objMap.get("responsiblePerson");
                        String responsiblePersonName = "";
                        if (StringUtils.isNotEmpty(responsiblePerson)) {
                            List<String> paramList = new ArrayList<>();
                            paramList.add(responsiblePerson);
                            Map<String, String> retNameMap = getRealnameByCardUrl(paramList, companyId);
                            responsiblePersonName = retNameMap.get(responsiblePerson);
                        }
                        objMap.put("responsiblePersonName", responsiblePersonName);
                    }
                }
            }