<template>
<!-- 预申报单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList" :showOpenBtn="false">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="采购订单编号："  prop="orderCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.orderCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable :data-list="getBUSelectBean('buList')" >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <div class="mr-t-20"></div>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @selection-change="selectionChange"
      @change="getList"
    >
      <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
      <el-table-column prop="orderCode" label="采购订单编号" align="center" min-width="180"></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="poNo" label="PO号" align="center" min-width="220"></el-table-column>
      <el-table-column prop="purchaseNum" label="采购数量" align="center" min-width="90" show-overflow-tooltip></el-table-column>
      <el-table-column prop="warehouseNum" label="入仓数量" align="center" min-width="90" ></el-table-column>
      <el-table-column prop="differenceNum" label="差异数量" align="center" min-width="90"></el-table-column>
      <el-table-column prop="onPassageNum" label="在途数量" align="center" min-width="90"></el-table-column>
      <el-table-column prop="arriveDate" label="预计到港时间" align="center" min-width="110" show-overflow-tooltip></el-table-column>
      <el-table-column prop="warehouseDate" label="最后入仓时间" align="center" min-width="110" show-overflow-tooltip></el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { listFollowing } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        orderCode: '',
        buId: ''
      }
    }
	},
	mounted() {
		this.getList()
	},
  methods: {
		async getList(pageNum) {
      try {
        this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await listFollowing(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {}
      this.tableData.loading = false
		},
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
