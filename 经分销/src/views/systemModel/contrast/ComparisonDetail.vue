<template>
  <!-- 商品对照详情-->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        店铺名称：{{ detail.shopName || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        店铺编码：{{ detail.shopCode || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        公司： {{ detail.merchantName || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        商品ID：{{ detail.skuId || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        商品名称：{{ detail.groupGoodsName || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        状态：{{ detail.statusLabel || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        备注：{{ detail.remark || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建时间： {{ detail.createDate || '- -' }}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        修改时间：{{ detail.modifyDate || '- -' }}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <el-tabs v-model="activeName" type="card" class="mr-t-15">
      <el-tab-pane label="商品信息" name="1">
        <JFX-table :tableData.sync="tableData"
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
          <el-table-column prop="brand"
                           align="center"
                           min-width="120"
                           label="商品品牌"
                           show-overflow-tooltip>
            <template slot-scope="{row}">
              {{row.brand === '"null"' ?  '' : row.brand}}
            </template>
          </el-table-column>
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
import { getGroupMerchandiseContrastDetail } from '@a/contrast'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 当前点击的tab name
      activeName: '1',
      // 详情的数据
      detail: {},
      // 变更记录列表
      historyList: {
        list: []
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
		async init() {
      const id = this.$route.query.id
      if (!id) return false
      const { data = {} } = await getGroupMerchandiseContrastDetail({ id })
      this.detail = data
      this.tableData.list = this.detail.detailList || []
      this.historyList.list = this.detail.historyList || []
    }
  }
}
</script>
