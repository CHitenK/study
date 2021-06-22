<template>
  <!-- 爬虫商品对照详情-->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        平台名称： {{ detail.platformName || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        平台用户名： {{ detail.platformUsername || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        公司： {{ detail.merchantName || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        事业部： {{ detail.buName || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        爬虫商品货号： {{ detail.crawlerGoodsNo || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        爬虫商品名称： {{ detail.crawlerGoodsName || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        状态：{{ detail.statusLabel || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建人：{{ detail.createUsername || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建时间： {{ detail.createDate || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        修改人：{{ detail.updateUsername || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        修改时间：{{ detail.modifyDate || '- -' }}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <el-tabs v-model="activeName" type="card" class="mr-t-15">
      <el-tab-pane label="基本信息" name="1">
        <JFX-table :tableData.sync="tableData"
                   :showPagination="false">
          <el-table-column type="index"
                            align="center"
                            width="55"
                            label="序号"
          ></el-table-column>
          <el-table-column prop="goodsNo"
                            align="center"
                            min-width="120"
                            label="商品货号"
                            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsName"
                            align="center"
                            min-width="100"
                            label="商品名称"
                            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="barcode"
                            align="center"
                            min-width="120"
                            label="条形码"
                            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="num"
                            align="center"
                            width="80"
                            label="数量"
                            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="price"
                            align="center"
                            width="130"
                            label="销售标准单价"
                            show-overflow-tooltip
          ></el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="变更记录" name="2">
        <JFX-table :tableData.sync="historyList"
                   :showPagination="false">
          <el-table-column prop="goodsNo"
                           align="center"
                           min-width="120"
                           label="商品货号"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsName"
                           align="center"
                           min-width="100"
                           label="商品名称"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="barcode"
                           align="center"
                           min-width="120"
                           label="条形码"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="num"
                           align="center"
                           width="90"
                           label="数量"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="price"
                           align="center"
                           width="110"
                           label="销售标准单价"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="editor"
                           align="center"
                           width="100"
                           label="修改人"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="createDate"
                           align="center"
                           width="150"
                           label="修改时间"
                           show-overflow-tooltip
          ></el-table-column>
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  getContrastdetail
} from '@a/contrast'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 详情的数据
      detail: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
		async init() {
      const id = this.$route.query.id
      if (!id) return false
      const { data: { merchandiseContrastDTO = {}, itemDTO = [] } } = await getContrastdetail({ id })
      this.detail = merchandiseContrastDTO
      this.tableData.list = itemDTO
    }
  }
}
</script>
