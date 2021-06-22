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
            <el-form-item  label="调拨入单号："  prop="code" class="search-panel-item fs-14 clr-II" >
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
            <el-form-item  label="调拨单号："  prop="transferOrderCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.transferOrderCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="合同号："  prop="contractNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.contractNo" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.status" placeholder="请选择" clearable :data-list="getSelectList('transferInDepot_statusList')" >
                <el-option v-for="item in selectOpt.transferInDepot_statusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="调入时间：">
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
    <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'" @click="exportData" :loading="loading" v-permission="'transferIn_exportInDepot'">导出</el-button>
        <el-button type="primary" :size="'small'" @click="importFile" v-permission="'transferIn_importInDepot'">导入</el-button>
        <el-button type="primary" :size="'small'" @click="toExamine" :loading="examineLoading" v-permission="'transferIn_to_examine'" >审核</el-button>
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
      <el-table-column type="selection" label="序号" align="center" width="55" ></el-table-column>
      <el-table-column prop="code" label="调拨入单号" align="center" min-width="150"></el-table-column>
      <el-table-column prop="contractNo" label="合同号" align="center" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="inDepotName" label="调入仓库" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="outDepotName" label="调出仓库" align="center" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="outDepotName" label="调拨入库数量" align="center" min-width="110"></el-table-column> -->
      <el-table-column prop="buName" label="事业部" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="transferOrderCode" label="调拨单号" align="center" min-width="150"></el-table-column>
      <el-table-column prop="statusLabel" label="单据状态" align="center" min-width="80"></el-table-column>
      <el-table-column prop="transferDate" label="调入时间" align="center" min-width="140"></el-table-column>
      <el-table-column label="操作" align="left" fixed="right" width="110">
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/transfer/warehouseDetail?id=' + scope.row.id )" v-permission="'transferIn_detail'">详情</el-button>
          <el-button type="text" @click="linkTo('/common/enclosureManage?code=' + scope.row.code )" v-permission="'transferIn_toAttachment'">附件管理</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { listTransferIn, exportInDepotCount, exportInDepotUrl, auditTransferInDepot, importTransferInOrderUrl } from '@a/transferManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        code: '',
        inDepotId: '',
        outDepotId: '',
        transferOrderCode: '',
        contractNo: '',
        status: '',
        buId: '',
        transferStartDate: '',
        transferEndDate: ''
      },
      date: '',
      loading: false,
      examineLoading: false
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
        this.ruleForm.transferStartDate = this.date && this.date.length > 0 ? this.date[0] : ''
        this.ruleForm.transferEndDate = this.date && this.date.length > 0 ? this.date[1] : ''
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await listTransferIn(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
    // 导出
		exportData() {
			this.$confirm('确定导出?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
				try {
          this.loading = true
          var opt = {
            begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
            pageSize: this.tableData.pageSize || 10,
            ...this.ruleForm
          }
          if (this.tableChoseList.length > 0) {
            const ids = this.tableChoseList.map(item => item.id).toString()
            opt = { ids }
          }
          const res = await exportInDepotCount({ opt })
          if (res.data.code === '00') { // 导出
            this.$exportFile(exportInDepotUrl, opt)
          } else {
            this.$errorMsg(res.data.message)
          }
        } catch (err) {
          console.log(err)
        }
        this.loading = false
			})
    },
    resetForm() {
      this.date = ''
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    selectable(data) {
      return data.status === '011'
    },
    // 审核
    async toExamine() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      let flag = true
      for (let i = 0; i < this.tableChoseList.length; i++) {
        const { code, status } = this.tableChoseList[i]
        if (status !== '011') {
          this.$errorMsg('调拨单号: ' + code + '不是“待入仓”状态!')
          flag = false
          break
        }
      }
      if (!flag) return false
      this.$confirm('确定审核选中对象？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        this.examineLoading = true
        try {
          const ids = this.tableChoseList.map(item => item.id).toString()
          await auditTransferInDepot({ ids })
          this.$successMsg('审核成功')
          this.getList()
        } catch (err) {
          console.log(err)
        }
        this.examineLoading = false
			})
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 155 + '&url=' + importTransferInOrderUrl)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
