<template>
  <!-- 库位调整单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-15" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        仓库：{{detail.depotName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        归属日期：{{detail.ownDate || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        单据类型：{{detail.typeLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建人：{{detail.createName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        审核人：{{detail.auditName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        审核时间：{{detail.auditDate || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        调整备注：{{detail.remark || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 调整商品信息 -->
    <JFX-title title="调整商品信息" className="mr-t-15" />
    <JFX-table :tableData.sync="tableData"
                :showPagination="false">
      <el-table-column prop="externalCode"
                        align="center"
                        label="关联外部订单号"
                        width="130"
                        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="orderCode"
                        align="center"
                        label="系统订单号"
                        width="130"
                        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="increaseGoodsNo"
                        align="center"
                        label="调增商品货号"
                        width="160"
                        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="increaseGoodsName"
                        align="center"
                        label="商品名称"
                        min-width="120"
                        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="reduceGoodsNo"
                        align="center"
                        label="调减商品货号"
                        width="160"
                        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="adjustNum"
                        align="center"
                        label="调整数量"
                        width="80"
      ></el-table-column>
      <el-table-column prop="inventoryTypeLabel"
                        align="center"
                        label="库存类型"
                        width="80"
      ></el-table-column>
      <el-table-column prop="platformName"
                        align="center"
                        label="平台名称"
                        width="80"
      ></el-table-column>
      <el-table-column prop="shopName"
                        align="center"
                        label="店铺名称"
                        width="80"
      ></el-table-column>
      <el-table-column prop="tallyingUnitLabel"
                        align="center"
                        label="理货单位"
                        width="80"
      ></el-table-column>
    </JFX-table>
    <!-- 调整商品信息 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import { getInventoryLocationDetail } from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 详情数据
      detail: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { id } = this.$route.query
      if (!id) return false
      const { data } = await getInventoryLocationDetail({ id })
      this.detail = data || {}
      this.tableData.list = this.detail.itemList || []
    }
  }
}
</script>
