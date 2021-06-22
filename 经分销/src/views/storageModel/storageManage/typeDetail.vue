<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        调整类型单号：{{detail.code}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        单据状态：{{detail.statusLabel}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        调整仓库：{{detail.depotName }}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        确认人：{{detail.confirmUsername}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        业务类别：{{detail.modelLabel}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        单据日期：{{detail.codeTime}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        单据类型调整名称：{{detail.adjustmentTypeName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        推送时间：{{detail.pushTime}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        来源单号：{{detail.sourceCode}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        调整时间：{{detail.adjustmentTime}}
      </el-col>
      <el-col  class="mr-b-10" :span="24" >
        调整原因：{{detail.adjustmentRemark}}
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="商品信息" className="mr-t-15" />
    <JFX-table
      :tableData.sync="tableData"
      :showPagination="false"
    >
      <el-table-column
        type="index"
        width="50"
        label="序号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="buName"
        label="事业部"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="goodsNo"
        label="商品货号"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="商品名称"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="barcode"
        label="商品条形码"
        align="center"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="oldBatchNo"
        label="原批次号"
        align="center"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="productionDate"
        label="生产日期"
        v-if="detail.model && [1, 2, 4, 5].includes(+detail.model)"
        align="center"
        width="140"
      >
      </el-table-column>
      <el-table-column
        prop="overdueDate"
        label="失效日期"
        v-if="detail.model && [1, 2, 4, 5].includes(+detail.model)"
        align="center"
        width="140"
      >
      </el-table-column>
      <!-- model == 1 好坏品转换 特有 -->
      <el-table-column
        prop="oldGoodType"
        label="调整前商品类型"
        v-if="detail.model && [1].includes(+detail.model)"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="newGoodType"
        label="调整后商品类型"
        v-if="detail.model && [1].includes(+detail.model)"
        align="center"
        width="120"
      >
      </el-table-column>
      <!-- model == 1  好坏品转换 特有 end -->
      <!-- model == 2 货号变更 特有 -->
      <el-table-column
        prop="oldGoodsNo"
        label="调整前货号"
        v-if="detail.model && [2].includes(+detail.model)"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="goodsNo"
        label="调整后货号"
        v-if="detail.model && [2].includes(+detail.model)"
        align="center"
        width="160"
      >
      </el-table-column>
      <!-- model == 2 货号变更 特有 end -->
      <!-- model == 3 效期调整 特有 -->
      <el-table-column
        prop="oldProductionDate"
        label="调整前生产日期"
        v-if="detail.model && [3].includes(+detail.model)"
        align="center"
        width="140"
      >
      </el-table-column>
      <el-table-column
        prop="productionDate"
        label="调整后生产日期"
        v-if="detail.model && [3].includes(+detail.model)"
        align="center"
        width="140"
      >
      </el-table-column>
      <el-table-column
        prop="oldOverdueDate"
        label="调整前失效日期"
        v-if="detail.model && [3].includes(+detail.model)"
        align="center"
        width="140"
      >
      </el-table-column>
      <el-table-column
        prop="overdueDate"
        label="调整后失效日期"
        v-if="detail.model && [3].includes(+detail.model)"
        align="center"
        width="140"
      >
      </el-table-column>
      <!-- model == 3 效期调整 特有 end -->
      <!-- model == 5 自然过期 特有 -->
      <el-table-column
        prop="overdueDate"
        label="调整前类型"
        v-if="detail.model && [5].includes(+detail.model)"
        align="center"
        width="120"
      >
      <template>
        未过期
      </template>
      </el-table-column>
      <el-table-column
        prop="overdueDate"
        label="调整后类型"
        v-if="detail.model && [5].includes(+detail.model)"
        align="center"
        width="120"
      >
      <template>
        已过期
      </template>
      </el-table-column>
      <!-- model == 5 自然过期 特有 end -->
      <el-table-column
        prop="adjustTotal"
        label="总调整数量"
        align="center"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="tallyingUnitLabel"
        label="理货单位"
        align="center"
        width="90"
      >
      </el-table-column>
      <!-- 大货理货 特有的item model = 4 -->
      <el-table-column
        prop="isDamageLabel"
        label="好坏品"
        align="center"
        v-if="detail.model && [4].includes(+detail.model)"
        width="120"
      >
      </el-table-column>
       <el-table-column
        prop="typeLabel"
        label="调整类型"
        align="center"
        v-if="detail.model && [4].includes(+detail.model)"
        width="120"
      >
      </el-table-column>
       <el-table-column
        prop="typeSourceLabel"
        label="调整归属"
        align="center"
        v-if="detail.model && [4].includes(+detail.model)"
        width="120"
      >
      </el-table-column>
      <!-- 大货理货 特有的item end -->
    </JFX-table>
    <!-- title end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { getAdjustmentTypeDetail } from '@a/storageManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      detail: {},
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      }
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { query } = this.$route
      if (!query.id) return false
      const res = await getAdjustmentTypeDetail({ id: query.id })
      this.detail = res.data || {}
      this.tableData.list = this.detail.itemList || []
    }
  }
}
</script>
