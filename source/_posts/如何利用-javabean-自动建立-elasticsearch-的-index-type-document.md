---
title: 如何利用 javabean 自动建立 elasticsearch 的 index type document
categories:
	- elasticsearch
tags:
	- 
---



*** 本 wiki 全部使用 supermarket 模块，举例说明 ***
如何建立javaBean？
在哪建？
zingbiz/zing-domain/src/main/java/com/zingbiz/domain/entity 这个包下建立自己模块的实体
建立Index.java
建立自己的 supermarket文件夹，建立Index.Java,Index.java的作用仅仅是为了对es的index 进行说明。eg：

<!-- more -->

@IndexDiscription(name="supermarket",version="10_1_createSupermarket_zwd_20180815")
public class Index {

}

@IndexDiscription

@IndexDiscription.name    ：    “你想要生成的index名”
@IndexDiscription.version ： “10_1_createSupermarket_zwd_20180815” 它对应了老项目的 :
ESUtil.flywayIndex("supermarket", "_v10", "V10_1_createSupermarket_zwd_20180815"); 写法。

自动生成别名，不用加V，当然，一般都是从1_x开始写的版本。

建立你自己的业务type 表
通常来说，每个javaBean 都对应一个 elasticSearch 的一个 type，我们想使用类似JPA的方式来自动生成es表结构。
举例：建立 SupermarketDetail 非常简单的例子
@Data
@ApiModel("超市表)")
@TypeVersion("10_1_createSupermarketDetail_zwd_20180815")
public class SupermarketDetail {

    @ApiModelProperty(value = "数据唯一标识（主键）")
    private String rowId;

    @ESDocument(name="genTime",type = DocumentType.DATE)
    @ApiModelProperty(value = "操作时间", hidden = true)
    private String genTime;

    @ESDocument(name="address",analyzed = true,analyzer = "whitespace")
    @ApiModelProperty(value = "参与者(超市员工)")
    private String participantId;

}
@TypeVersion
因为javaBean 相当于 type ，必须指定你们的 type 版本，以供 flyway 进行升级 ，如果你不加@TypeVersion，那么该包下的index所有的 type都会保护性的不自动生成。
@ESDocument
用来描述esdocument字段：
name：描述生成的 document 名称，eg ： private String rowId; 不填默认名称为rowId。
analyzed：是否建立索引 默认不建立 false ： "index":"not_analyzed" 需要的话手动开启 analyzed = true
type ： 枚举，选择你字段的es对应类型。默认string，值得一提的是 type.DATE 默认是 "YYYY-MM-dd HH:mm:ss" 格式的，所想用自己的格式，需要指定format
copy_to： 是否启用copy_to,直接指定你要copy的字段，copy_to -> ? eg: "copy_to":"allField" 默认忽略
format：只有type.DATE才用这个注解标注一下格式
analyzer:分词方式，默认不分词
如何忽略一个字段，不让他建立es document ？
在你的javabean字段加上@IgnoreDocument
    @IgnoreDocument// 后续能会自动处理一些 List 、 Map 、 Set 之类的集合
    private List<BatchInfoDetail> batchInfoDetails = new ArrayList<>();
重申一下如何升级？
升级还是flyway的逻辑:
增加type 需要升级@TypeVersion("")
修改、删除type 需要升级@IndexDiscription 和 @TypeVersion
如何迁移？
以 如下代码为例：
 ESUtil.flywayIndex(Constants.INDEX_FIXED_ASSETS, "_v12", "V12_1_createFixedAssetsIndex_wuhaibin_20180528");

        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_SETUP_CONFIGURATION, "esFixedAssets.V12_1_createSetupConfiguration_wuhaibin_20180530", null);
这样写 Index.java

@IndexDiscription(name=Constants.INDEX_FIXED_ASSETS,version="12_1_createFixedAssetsIndex_wuhaibin_20180528")
public class Index {

}


这样写 changeModeConfiguration.java
@Data
@ApiModel("表)")
//保障和index是同一个目录下哦
@TypeVersion("12_1_createSetupConfiguration_wuhaibin_20180530")
public class ChangeModeConfiguration {

    @ApiModelProperty(value = "数据唯一标识（主键）")
    private String rowId;


    @ESDocument(name="genTime",type = DocumentType.DATE)
    @ApiModelProperty(value = "操作时间", hidden = true)
    private String genTime;

    ...



}

总结来说：省略了alias 和 版本字符串的首字母 V
！！！如果你不按照这个约束写，可能导致版升级，数据清空。
如何扫描包?
老项目一般都是利用mapping这样写
@Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        if (contextRefreshedEvent.getApplicationContext().getParent() == null) {
            //需要执行的代码
            try {
                if (Constants.IS_FLYWAY) {
                    initES();
                }
            } catch (Exception e) {
                LogUtil.error(e);
            }
        }
    }

    public void initES() throws Exception {

        ESUtil.flywayIndex(Constants.INDEX_FIXED_ASSETS, "_v12", "V12_1_createFixedAssetsIndex_wuhaibin_20180528");
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_SETUP_CONFIGURATION, "esFixedAssets.V12_1_createSetupConfiguration_wuhaibin_20180530", null);
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_CHANGE_MODE_CONFIGURATION, "esFixedAssets.V12_1_createChangeModeConfiguration_wuhaibin_20180529", null);
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_WORKING_CONDITION_CONFIGURATION, "esFixedAssets.V12_1_createWorkingConditionConfiguration_wuhaibin_20180529", null);
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_STORE_PLACE_CONFIGURATION, "esFixedAssets.V12_1_createStorePlaceConfiguration_wuhaibin_20180529", null);
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_ASSETS_CLASS_CONFIGURATION, "esFixedAssets.V12_1_createAssetsClassConfiguration_wuhaibin_20180529", null);
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_ASSETMANAGEMENT, "esFixedAssets.V12_1_assetManagement_mlh_20180619", null);
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_SCHEMESETTING, "esFixedAssets.V12_1_schemeSetting_mlh_20180607", null);
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_CLEANRECORD, "esFixedAssets.V12_1_cleanRecord_mlh_20180607", null);
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_DEPARTMENTALLOCATION, "esFixedAssets.V12_1_departmentAllocation_mlh_20180607", null);
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_ACCESSORYEQUIPMENT, "esFixedAssets.V12_1_accessoryEquipment_20180710", null);
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_DEPRECIATIONBACKUP, "esFixedAssets.V12_1_depreciationBackup_mlh_20180710", null);
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_CARDWITHVOUCHERID, "esFixedAssets.V12_1_cardWithVoucherId_mlh_20180710", null);
        // 报表相关
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_REPORT_ASSETMANAGEMENT_CHANGEMARK, "esFixedAssetsReport.V12_2_createReportAssetManagementChangeMark_wuhaibin_20180813", null);
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_REPORT_PERIOD_RECORD, "esFixedAssetsReport.V12_1_createReportPeriodRecord_wuhaibin_20180710", null);
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_REPORT_ASSETMANAGEMENT, "esFixedAssetsReport.V12_1_createReportAssetManagement_wuhaibin_20180710", null);
        ESUtil.flywayDSL(Constants.INDEX_FIXED_ASSETS, Constants.ES_TYPE_REPORT_ASSET_PERIOD_STATISTICS, "esFixedAssetsReport.V12_3_createReportAssetsPeriodStatistics_wuhaibin_20180710", null);
    }


现在你可以这样（前提是你写了javaBean）
@Service
public class SupermarketInitService  implements ApplicationListener<ContextRefreshedEvent> {


    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        if (contextRefreshedEvent.getApplicationContext().getParent() == null) {
            //需要执行的代码
            try {
                initES();
            } catch (Exception e) {
                LogUtil.error(e);
            }
        }
    }

    public void initES() throws Exception {
        Generator.instance().generator("com.zingbiz.domain.entity.supermarket");
    }
}

重点是 Generator.instance().generator("com.zingbiz.domain.entity.supermarket"); 传入你的实体包在哪即可。
feature
建议新模块先试用，提一些使用不便的问题，或bug。
会逐渐优化或添加一些的代码 : @IgnoreDocument 的部分自动处理、自动扫描 domain包
@all