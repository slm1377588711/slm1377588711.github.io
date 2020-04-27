---
title: 利用poi实现html生成word并保存
date: 2018-06-22 18:19:45
categories:
	- java
tags:
	- html转doc保存
---

下载poi的jar包 此处用的3.9
```
@RequestMapping("downloadAppnote")
    public void downloadAppnote(@RequestParam String id, @RequestParam String filename, @RequestParam String companyId) {
        try {
            HashMap<String, String> params = new HashMap<>();
            params.put("id", id);
            params.put("filename", filename);
            params.put("companyId", companyId);
            if (params.containsKey("companyId") && params.get("companyId").toString().length() > 0) {
                companyId = params.get("companyId");
            }
            Map rmap = appnoteService.getAppnote(params, companyId);
            Long total = Long.valueOf(String.valueOf(rmap.get("total")));
            if (total == 0) {
                LogUtil.error("downloadAppnote not find appnote ! id:" + id + " . companyId:" + companyId);
                return;
            }
            List data = (List) rmap.get("data");
            Map mdata = (Map) data.get(0);
            String fileContent = "";
            for (Object str : mdata.keySet()) {
                if (str instanceof String) {
                    if ("fileContent".equals(str)) {
                        fileContent = mdata.get("fileContent").toString();
                    }
                    if ("title".equals(str)) {
                        filename = mdata.get("title").toString();
                    }
                }
            }
            <!--开始  以上代码是为了获取html内容-->
            String html = "<html> <head><meta charset='UTF-8'/></head> <body>" + fileContent + "</body></html>";
            byte b[] = html.getBytes("UTF-8");
            ByteArrayInputStream bais = new ByteArrayInputStream(b);
            POIFSFileSystem poifs = new POIFSFileSystem();
            DirectoryEntry directory = poifs.getRoot();
            directory.createDocument("WordDocument", bais);
            getResponse().reset();
            if (getRequest().getHeader("User-Agent").toUpperCase().contains("MSIE") || getRequest().getHeader("User-Agent").toUpperCase().contains("Trident")) {
                filename = java.net.URLEncoder.encode(filename + ".doc", "UTF-8");
            } else {
                filename = new String((filename + ".doc").getBytes("UTF-8"), "ISO-8859-1");
            }
            getResponse().setHeader("Content-Disposition", "attachment;filename=" + filename);
            getResponse().setContentType("application/msword");
            OutputStream ostream = getResponse().getOutputStream();
            poifs.writeFilesystem(ostream);
            bais.close();
            ostream.close();
        } catch (Exception e) {
            LogUtil.error(e);
        }
    }
```

