<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <JFX-title title="货品基本信息" className="mr-t-20" />
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        一级类目：{{detail.productTypeName0}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        二级类目：{{detail.productTypeName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        原产国: {{detail.countyName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        条形码: {{detail.barcode}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        品牌：{{detail.brandName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        保质天数：{{detail.shelfLifeDays}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        毛重：{{detail.grossWeight}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        净重：{{detail.netWeight}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        长：{{detail.length}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        宽：{{detail.width}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        高：{{detail.height}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        体积：{{detail.volume}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        生产厂家：{{detail.manufacturer}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        生产地址：{{detail.manufacturerAddr}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        计量单位：{{detail.unitName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        规格型号：{{detail.spec}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="24" :md="16" :lg="12" :xl="12" >
        备注：{{detail.remark}}
      </el-col>
      <el-col class="mr-b-10 mr-t-15" :xs="24" :sm="12" :md="24" :lg="24" :xl="24" >
        <span style="vertical-align: top;">商品图片：</span>
        <div class="image-preview">
          <el-image
            v-for="(item, i) in srcList"
            :key="i"
            style="width: 120px; height: auto;margin-left: 10px;"
            :src="item"
            :preview-src-list="srcList">
          </el-image>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { productDetailsPage } from '@a/goodsManage/index'
export default {
  data() {
    return {
      srcList: ['', '', '', '', '', ''],
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
        const res = await productDetailsPage({ id: query.id })
        this.detail = res.data || {}
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
