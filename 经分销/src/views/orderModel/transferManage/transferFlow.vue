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
            <el-form-item  label="调拨单号："  prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.code" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="调入仓库：" prop="inDepotId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.inDepotId" placeholder="请选择" clearable filterable :data-list="getSelectBeanByMerchantRel('cangkuList')" >
                <el-option v-for="item in selectOpt.cangkuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="调出仓库：" prop="outDepotId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.outDepotId" placeholder="请选择" clearable filterable :data-list="getSelectBeanByMerchantRel('cangkuList1')" >
                <el-option v-for="item in selectOpt.cangkuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable :data-list="getBUSelectBean('buList')" >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="调出商品货号："  prop="outGoodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.outGoodsNo" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="调拨订单时间：">
              <el-date-picker
                clearable
                v-model="date"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <div class="mr-t-20"></div>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @selection-change="selectionChange"
      @change="getList"
    >
      <el-table-column type="index" label="序号" align="center" width="55" fixed="left"></el-table-column>
      <el-table-column prop="code" label="调拨订单号" align="center" min-width="140" fixed="left"></el-table-column>
      <el-table-column prop="outDepotName" label="调出仓库" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="inDepotName" label="调入仓库" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="inGoodsNo" label="调入商品货号" align="center" min-width="120"></el-table-column>
      <el-table-column prop="inGoodsName" label="调入商品名称" align="center" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="outGoodsNo" label="调出商品货号" align="center" min-width="120"></el-table-column>
      <el-table-column prop="outGoodsName" label="调出商品名称" align="center" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="transferNum" label="调出数量" align="center" min-width="80"></el-table-column>
      <el-table-column prop="tallyingUnitLabel" label="调出单位" align="center" min-width="80"></el-table-column>
      <el-table-column prop="orderInTransferNum" label="调入数量" align="center" min-width="80"></el-table-column>
      <el-table-column prop="inTallyingUnitLabel" label="调入单位" align="center" min-width="80"></el-table-column>
      <el-table-column prop="outDepotCode" label="调拨出库单号" align="center" min-width="120"></el-table-column>
      <el-table-column prop="outGoodsNoItem" label="出库商品货号" align="center" min-width="120"></el-table-column>
      <el-table-column prop="outGoodsNameItem" label="出库商品名称" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="outTransferBatchNo" label="调拨出库批次" align="center" min-width="100"></el-table-column>
      <el-table-column prop="outTransferNum" label="调出正常数量" align="center" min-width="100"></el-table-column>
      <el-table-column prop="outWornNum" label="调出坏品数量" align="center" min-width="100"></el-table-column>
      <el-table-column prop="outExpireNum" label="调出过期数量" align="center" min-width="100"></el-table-column>
      <el-table-column prop="outTransferNumAll" label="调拨出库数量" align="center" min-width="100"></el-table-column>
      <el-table-column prop="inDepotCode" label="调拨入库单号" align="center" min-width="100"></el-table-column>
      <el-table-column prop="inGoodsNoItem" label="入库商品货号" align="center" min-width="100"></el-table-column>
      <el-table-column prop="inGoodsNameItem" label="入库商品名称" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="inTransferBatchNo" label="调拨入库批次" align="center" min-width="100"></el-table-column>
      <el-table-column prop="inTransferNum" label="调入正常数量" align="center" min-width="100"></el-table-column>
      <el-table-column prop="wornNum" label="调入坏品数量" align="center" min-width="100"></el-table-column>
      <el-table-column prop="expireNum" label="调入过期数量" align="center" min-width="100"></el-table-column>
      <el-table-column prop="inTransferNumAll" label="调入数量" align="center" min-width="80"></el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { transferOutInList } from '@a/transferManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        code: '',
        inDepotId: '',
        outDepotId: '',
        buId: '',
        outGoodsNo: '',
        createDateStart: '',
        createDateEnd: ''
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
        this.ruleForm.createDateStart = this.date && this.date.length > 0 ? this.date[0] : ''
        this.ruleForm.createDateEnd = this.date && this.date.length > 0 ? this.date[1] : ''
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await transferOutInList(opt)
				this.tableData.list = res.data.list || []
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
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
