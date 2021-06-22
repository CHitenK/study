<template>
<!-- 预申报单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="调拨单号："  prop="orderCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.orderCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="入仓仓库：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.depotId" placeholder="请选择" filterable clearable :data-list="getSelectBeanByMerchantRel('cangkuList')" >
                <el-option v-for="item in selectOpt.cangkuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" filterable clearable :data-list="getBUSelectBean('buList')" >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="理货单号："  prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.code" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="理货单状态：" prop="state" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.state" placeholder="请选择" clearable :data-list="getSelectList('tallyingOrder_stateList')" >
                <el-option v-for="item in selectOpt.tallyingOrder_stateList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="合同号："  prop="contractNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.contractNo" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="理货日期：">
              <el-date-picker
                clearable
                v-model="date"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'" @click="comfrim('010')" v-permission="'transferTallying_confirm'" >确认</el-button>
        <el-button type="primary" :size="'small'" @click="comfrim('004')" v-permission="'transferTallying_reject'">驳回</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <div class="mr-t-20"></div>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @selection-change="selectionChange"
      @change="getList"
    >
      <el-table-column type="selection" align="center" width="55" :selectable="selectable"></el-table-column>
      <el-table-column prop="code" label="理货单号" align="center" min-width="180"></el-table-column>
      <el-table-column prop="orderCode" label="调拨单号" align="center" min-width="180"></el-table-column>
      <el-table-column prop="depotName" label="仓库" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="contractNo" label="合同号" align="center" min-width="180" ></el-table-column>
      <el-table-column prop="tallyingDate" label="理货时间" align="center" min-width="150"></el-table-column>
      <el-table-column prop="stateLabel" label="状态" align="center" min-width="90"></el-table-column>
      <el-table-column label="操作" align="left" fixed="right" width="60">
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/transfer/tallyDetail?id=' + scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { listTallyingOrderTransfer, tallyConfirmTransfer } from '@a/transferManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        orderCode: '',
        depotId: '',
        buId: '',
        code: '',
        state: '',
        contractNo: '',
        tallyingStartDate: '',
        tallyingEndDate: ''
      },
      date: ''
    }
	},
	mounted() {
		this.getList(1)
	},
  activated() {
    this.getList()
  },
  methods: {
		async getList(pageNum) {
      try {
        this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.ruleForm.tallyingStartDate = this.date && this.date.length > 0 ? this.date[0] : ''
        this.ruleForm.tallyingEndDate = this.date && this.date.length > 0 ? this.date[1] : ''
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await listTallyingOrderTransfer(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
    resetForm() {
      this.date = ''
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    // 确认/驳回
    async comfrim(state) {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      const ids = this.tableChoseList.map(item => item.id).toString()
      await tallyConfirmTransfer({ state, ids })
      this.$successMsg('操作成功')
      this.getList()
    },
    selectable(data) {
      return data.state === '009'
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
