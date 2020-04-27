---
title: 利用aspose实现html生成word(需要破解，不然下载下来的文档有红色字体水印)
date: 2018-06-22 18:22:19
categories:
	- java
tags:
	- html转doc保存
---


下载aspose jar包
```
   /*
    * 下载doc文件
    * */
    @RequestMapping("downloadAppnote1")
    public void downloadAppnote1(@RequestParam String id, @RequestParam String filename, @RequestParam String companyId) {
        String ret = "";
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
                //return JsonUtils.genUpdateDataReturnJsonStr(false, "下载文件不存在");
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
            String html = "<!DOCTYPE html> <html> <head><meta charset='UTF-8'/></head> <body>" + fileContent + "</body></html>";

            Calendar cal = Calendar.getInstance();
            String relativeFolderPath = "/appnoteToDownload/company/" + companyId + File.separator
                + cal.get(Calendar.YEAR) + File.separator
                + (cal.get(Calendar.MONTH) + 1) + File.separator
                + cal.get(Calendar.DATE);
            ;
            String absoluteFolderPath = Constants.TX_NGINX_HTML_PATH + relativeFolderPath;
            File folder = new File(absoluteFolderPath);
            if (!folder.exists()) {
                folder.mkdirs();
            }
            String absoluteFilePath = "";
            String file = DAOTools.getDockerTableId();
            absoluteFilePath = absoluteFolderPath + File.separator + file + ".doc";
            Document doc = new Document();
            DocumentBuilder builder = new DocumentBuilder(doc);
            builder.insertHtml(html);
            doc.save(absoluteFilePath, SaveOptions.createSaveOptions(SaveFormat.DOC));//生成doc文件
            String relativeFilePath = relativeFolderPath + File.separator + file + ".doc";

            getResponse().setContentType("text/html;charset=UTF-8");
            getResponse().setHeader("Content-Type", "application/force-download");
            getResponse().setHeader("X-Accel-Redirect", relativeFilePath);
            InputStream in = new FileInputStream(absoluteFilePath);
            if (getRequest().getHeader("User-Agent").toUpperCase().contains("MSIE") || getRequest().getHeader("User-Agent").toUpperCase().contains("Trident")) {
                filename = java.net.URLEncoder.encode(filename + ".doc", "UTF-8");
            } else {
                filename = new String((filename + ".doc").getBytes("UTF-8"), "ISO-8859-1");
            }
            getResponse().setHeader("Content-Disposition", "attachment; filename=" + filename);
            getResponse().setContentLength(in.available());
            OutputStream out = getResponse().getOutputStream();
            byte[] b = new byte[1024];
            int len = 0;
            while ((len = in.read(b)) != -1) {
                out.write(b, 0, len);
            }
            out.flush();
            out.close();
            in.close();
            // ret = JsonUtils.genUpdateDataReturnJsonStr(html);
        } catch (Exception e) {
            LogUtil.error(e);
        }
        // return ret;
    }
```
