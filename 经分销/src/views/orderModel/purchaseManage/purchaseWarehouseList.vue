<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)" >
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="采购订单编码：" prop="purchaseCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.purchaseCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="入库单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.code" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="入库仓库：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.depotId" placeholder="请选择" filterable clearable :data-list="getSelectBeanByMerchantRel('outDepotList')" >
                <el-option v-for="item in selectOpt.outDepotList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
            <el-form-item label="单据状态：" prop="state" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.state" placeholder="请选择" clearable :data-list="getSelectList('purchaseWarehouse_stateList')" >
                <el-option v-for="item in selectOpt.purchaseWarehouse_stateList" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="勾稽状态：" prop="correlationStatus" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.correlationStatus" placeholder="请选择" clearable :data-list="getSelectList('purchaseWarehouse_correlationStatusList')" >
                <el-option v-for="item in selectOpt.purchaseWarehouse_correlationStatusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="入库时间：">
              <el-date-picker
                clearable
                v-model="date"
                type="datetimerange"
                range-separator="至"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始时间"
                end-placeholder="结束时间">
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
        <el-dropdown @command="choseImportType" v-permission="'warehouse_import'">
          <el-button type="primary" id="pw_more_import">
            批量导入<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1" id="pw_in_import" >入库单导入</el-dropdown-item>
            <el-dropdown-item command="2" id="pw_guan_import">关联采购单导入</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" :size="'small'" v-permission="'warehouse_confirmDepot'" id="pw_in_cang" @click="comfirmInCang" >确认入仓</el-button>
        <el-button type="primary" :size="'small'" v-permission="'warehouse_exportRelation'" id="pw_detail_ex" @click="exportDetail">明细导出</el-button>
        <el-button type="primary" :size="'small'" v-permission="'warehouse_checkWarehouseDepotType'" id="pw_inguanlian_ex" @click="exportGuan">入库勾稽关联导出</el-button>
        <el-button type="primary" :size="'small'" v-permission="'warehouse_delBatchByIds'" id="pw_more_dele" @click="dele">删除</el-button>
      </el-col>
    </el-row>
    <div class="mr-t-20"></div>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @selection-change="selectionChange"
      @change="getList"
    >
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column prop="code" label="入库单号" align="center" min-width="160"></el-table-column>
      <el-table-column prop="depotName" label="仓库" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="purchaseCode" label="采购订单编码" align="center" min-width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="tallyingOrderCode" label="理货单号" align="center" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="inboundDate" label="进仓单生效日期" align="center" min-width="110" >
         <template slot-scope="scope">
             {{ scope.row.inboundDate ? scope.row.inboundDate.substring(0, 10) : '' }}
         </template>
      </el-table-column>
      <el-table-column prop="contractNo" label="合同号" align="center" min-width="120" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="extraCode" label="外部单号" align="center" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="stateLabel" label="状态" align="center" min-width="80" ></el-table-column>
      <el-table-column prop="correlationStatusLabel" label="勾稽状态" align="center" min-width="80" ></el-table-column>
      <el-table-column label="操作" align="left" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/purchase/purchaseWarehouseDetail?id=' + scope.row.id)" v-permission="'warehouse_detail'">详情</el-button>
          <el-button type="text" @click="linkTo('/common/enclosureManage?code=' + scope.row.code)" v-permission="'warehouse_toAttachment'">附件管理</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { listPurchaseWarehouse, delBatchByIds, exportRelationUrl, purchaseExportRelationUrl, confirmDepot, importWarehouseUrl, importRelationUrl, checkWarehouseDepotType } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        purchaseCode: '',
        code: '',
        depotId: '',
        buId: '',
        state: '',
        warehouseStartDate: '',
        warehouseEndDate: '',
        correlationStatus: ''
      },
      date: ''
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
        this.ruleForm.warehouseStartDate = this.date && this.date.length > 0 ? this.date[0] : ''
        this.ruleForm.warehouseEndDate = this.date && this.date.length > 0 ? this.date[1] : ''
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await listPurchaseWarehouse(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
		dele() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('请至少选择一条记录！')
        return false
      }
			this.$confirm('确定删除选中对象？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        await delBatchByIds({ ids })
        this.$successMsg('删除成功')
        this.getList()
			})
    },
    choseImportType(e) {
      if (+e === 1) { // 入库单导入
        this.linkTo('/common/importfile?templateId=' + 109 + '&url=' + importWarehouseUrl)
      } else if (+e === 2) { // 关联采购单导入
        this.linkTo('/common/importfile?templateId=' + '' + '&url=' + importRelationUrl)
      }
    },
    resetForm() {
      this.date = ''
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    exportDetail() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      if (this.tableChoseList.length > 0) {
        this.$confirm('确定导出选中对象？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const ids = this.tableChoseList.map(item => item.id).toString()
          this.$exportFile(exportRelationUrl, { ids })
        })
      } else {
        const opt = {
          ids: '',
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
        this.$exportFile(exportRelationUrl, opt)
      }
    },
    exportGuan() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('请至少选择一条数据！')
        return false
      }
      this.$confirm('确定导出选中对象？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        await checkWarehouseDepotType({ ids })
        this.$exportFile(purchaseExportRelationUrl, { ids })
			})
    },
    comfirmInCang() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('请至少选择一条数据！')
        return false
      }
      this.$confirm('确定入仓选中对象？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        await confirmDepot({ ids })
        this.$successMsg('操作成功！')
        this.getList()
			})
    }
  }
}
</script>
<style lang="scss" scoped>
.change-lve{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
