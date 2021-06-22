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
        调整类型单号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        单据状态：{{detail.statusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        调整仓库：{{detail.depotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        币种：{{detail.currencyLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        业务类别：{{detail.modelLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        来源单据号：{{detail.sourceCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        单据来源：{{detail.sourceLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        调整时间：{{detail.adjustmentTime || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建人：{{detail.createUsername || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        归属月份：{{detail.months || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        <span>
          归属日期：
        </span>
        <el-date-picker
          v-model="detail.sourceTime"
          type="date"
          value-format="yyyy-MM-dd"
          :readonly="detail.status !== '020'"
          :title="detail.status !== '020' ? '不可编辑' : ''"
          placeholder="选择日期">
        </el-date-picker>
      </el-col>
      <el-col  class="mr-b-15 des-bx" :span="24" >
        <span>
          备注：
        </span>
        <span class="textarea-bx">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="detail.remark">
          </el-input>
        </span>
      </el-col>
      <el-col  class="mr-b-15 des-bx" :span="24" >
        <el-button type="primary" @click="save" :loading="saveLoading">保 存</el-button>
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="商品信息" className="mr-t-20" />
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
        prop="poNo"
        label="PO单号"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="商品货号"
        align="center"
        prop="goodsNo"
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
        prop="settlementPrice"
        label="结算单价"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="typeLabel"
        label="调整类型"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="oldBatchNo"
        label="原始批次号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="isDamageLabel"
        label="是否坏品"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="adjustTotal"
        label="总调整数量"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="tallyingUnitLabel"
        label="海外仓理货单位"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="productionDate"
        label="生产日期"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.productionDate ? scope.row.productionDate.substring(0, 10) : ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="overdueDate"
        label="失效日期"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.overdueDate ? scope.row.overdueDate.substring(0, 10) : ''}}
        </template>
      </el-table-column>
    </JFX-table>
    <!-- title end -->
  </div>
</template>
<script>
import { adjustmentDetail, modfiyRemarkAndSourceTimeById } from '@a/storageManage/storage'
export default {
  data() {
    return {
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      detail: {},
      saveLoading: false
    }
  },
  mounted() {
    const { query } = this.$route
    const { id } = query
    this.init(id)
  },
  methods: {
    init(id) {
      adjustmentDetail({ id }).then(res => {
        this.detail = res.data || {}
        this.tableData.list = this.detail.itemList || []
      })
    },
    save() {
      if (!this.detail.sourceTime) {
        this.$errorMsg('归属时间不能为空')
        return false
      }
      this.saveLoading = true
      const opt = {
        id: this.detail.id,
        sourceTime: this.detail.sourceTime.substring(0, 10),
        remark: this.detail.remark
      }
      modfiyRemarkAndSourceTimeById(opt).then(() => {
        this.$successMsg('保存成功')
      }).finally(() => {
        this.saveLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.des-bx{
  display: flex;
  flex-direction: row;
  .textarea-bx{
    display: inline-block;
    width: 700px;
  }
}
</style>
