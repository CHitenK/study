<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="商品基础信息" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        所属公司：{{detail.merchantName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        商品编码: {{detail.goodsCode}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        外仓统一码：{{detail.outDepotFlagLabel}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        商品货号：{{detail.goodsNo}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        商品条形码：{{detail.barcode}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        商品名称：{{detail.name}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        数据来源：{{detail.sourceLabel}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        <!--取值待定-->
        备案平台关区：{{detail.customsAreaIdStr}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        HS编码：{{detail.hsCode}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        企业商品编码：{{detail.factoryNo}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        <!--取值待定-->
       商品品牌：{{detail.brandName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        一级品类：{{detail.productTypeName0}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        商品英文名称：{{detail.englishGoodsName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        标准条码：{{detail.commbarcode}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        二级品类：{{detail.productTypeName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        <!--取值待定-->
        标准品牌：{{detail.brandName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建人：{{detail.createName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建时间：{{detail.createDate}}
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        毛重：{{detail.grossWeight}}kg
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        净重: {{detail.netWeight}}kg
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        规格型号：{{detail.spec}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        保质天数：{{detail.shelfLifeDays}}天
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        申报单价：{{detail.filingPrice}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        <!--取值待定-->
        计量单位：{{detail.unitName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        <!--取值待定-->
        原产国：{{detail.countryName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        原产地区：{{detail.countyArea}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        申报要素：{{detail.declareFactor}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        商品成分：{{detail.component}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        生产企业名称：{{detail.manufacturer}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        生产企业地址：{{detail.manufacturerAddr}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        是否备案：{{detail.isRecordLabel}}
      </el-col>
    </el-row>
    <JFX-title title="箱规设置" className="mr-t-10" />
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        箱转换： 1箱转换为{{detail.boxToUnit}}件
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        托转换： 1托转换为{{detail.torrToUnit}}件
      </el-col>
    </el-row>
    <JFX-title title="商品描述" className="mr-t-10" />
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        长：{{detail.length}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        宽：{{detail.width}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        高：{{detail.height}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        体积：{{detail.volume}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        包装方式：{{detail.packType}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        商品描述：{{detail.describe}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        最后修改人：{{detail.modifier}}
      </el-col>
       <el-col class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        最后修改时间：{{detail.modifyDate}}
      </el-col>
    </el-row>
    <JFX-title title="商品信息" className="mr-t-10" />
    <JFX-table
      :tableData="{list: [{ }]}"
      :showPagination="false"
    >
      <el-table-column label="图片1" align="center">
        <template>
          <el-image v-if="srcList[0]"  :preview-src-list="srcList" :src="srcList[0]" style="width: 120px; height: auto;margin-left: 10px;"></el-image>
          <el-image v-else  :preview-src-list="srcList" style="width: 120px; height: 120px;margin-left: 10px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="图片2" align="center">
        <template>
          <el-image v-if="srcList[1]"  :preview-src-list="srcList" :src="srcList[1]" style="width: 120px; height: auto;margin-left: 10px;"></el-image>
          <el-image v-else  :preview-src-list="srcList" style="width: 120px; height: 120px;margin-left: 10px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="图片3" align="center">
        <template>
          <el-image v-if="srcList[2]"  :preview-src-list="srcList" :src="srcList[2]" style="width: 120px; height: auto;margin-left: 10px;"></el-image>
          <el-image v-else  :preview-src-list="srcList" style="width: 120px; height: 120px;margin-left: 10px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="图片4" align="center">
        <template>
          <el-image v-if="srcList[3]"  :preview-src-list="srcList" :src="srcList[3]" style="width: 120px; height: auto;margin-left: 10px;"></el-image>
          <el-image v-else  :preview-src-list="srcList" style="width: 120px; height: 120px;margin-left: 10px;"></el-image>
        </template>
      </el-table-column>
       <el-table-column label="图片5" align="center">
        <template>
          <el-image v-if="srcList[4]"  :preview-src-list="srcList" :src="srcList[4]" style="width: 120px; height: auto;margin-left: 10px;"></el-image>
          <el-image v-else  :preview-src-list="srcList" style="width: 120px; height: 120px;margin-left: 10px;"></el-image>
        </template>
      </el-table-column>
    </JFX-table>
  </div>
</template>
<script>
import { toDetailsPage } from '@a/goodsManage/index'
export default {
  data() {
    return {
      srcList: [],
      detail: {}
    }
  },
  mounted() {
    this.init()
    this.$nextTick(() => {
      setTimeout(() => {
        const domes = document.getElementsByClassName('el-image__error')
        if (domes && domes.length > 0) {
          for (let i = 0; i < domes.length; i++) {
            domes[i].innerHTML = '暂无图片'
          }
        }
      }, 3000)
    })
  },
  methods: {
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      try {
        const res = await toDetailsPage({ id: query.id })
        this.detail = Object.assign({}, res.data.detail, res.data)
        this.srcList = [
          this.detail.imageUrl1,
          this.detail.imageUrl2,
          this.detail.imageUrl3,
          this.detail.imageUrl4,
          this.detail.imageUrl5
        ]
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.image-preview{
  display: inline-block;
}
</style>
