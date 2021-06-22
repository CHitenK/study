<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="调整单号："  prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.code" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="入仓仓库：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.depotId" placeholder="请选择" filterable clearable :data-list="getSelectBeanByMerchantRel('depotList')" >
                <el-option v-for="item in selectOpt.depotList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.status" placeholder="请选择" :data-list="getSelectList('adjustmentType_statusList')" clearable>
                <el-option v-for="item in selectOpt.adjustmentType_statusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="业务类别：" prop="model" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.model" placeholder="请选择" clearable filterable :data-list="getSelectList('adjustmentType_modelList')" >
                <el-option v-for="item in selectOpt.adjustmentType_modelList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据来源：" prop="source" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.source" placeholder="请选择" clearable :data-list="getSelectList('adjustmentType_sourceList')" >
                <el-option v-for="item in selectOpt.adjustmentType_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="调整时间：">
              <el-date-picker
                clearable
                v-model="date"
                type="datetimerange"
                range-separator="至"
                value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-button type="primary" :size="'small'" @click="importFile" v-permission="'adjustmentType_import'" >导入</el-button>
        <el-button type="primary" :size="'small'" @click="exportExcel" v-permission="'adjustmentType_export'">导出</el-button>
        <el-button type="primary" :size="'small'" @click="moreDele" v-permission="'adjustmentType_deleteAdjustment'">删除</el-button>
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
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        prop="merchantName"
        label="公司"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="code"
        label="类型调整单号"
        align="center"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="modelLabel"
        label="业务类型"
        align="center"
        width="180"
      >
      </el-table-column>
        <el-table-column
        prop="sourceCode"
        label="来源单据号"
        align="center"
        min-width="200"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="depotName"
        label="仓库名称"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="adjustmentTime"
        label="调整时间"
        align="center"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="sourceLabel"
        label="单据来源"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="statusLabel"
        label="单据状态"
        align="center"
        width="90"
      >
      </el-table-column>
      <el-table-column
      align="left"
      fixed="right"
      :width="btnsWidth"
      label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/storage/typedetail?id=' + scope.row.id )" v-permission="'adjustmentType_detail'" >详情</el-button>
          <el-button type="text" v-if="scope.row.source=='01' && scope.row.status == '020'" @click="openDalog(scope.row)" v-permission="'inventoryType_confirm'">分配事业部</el-button>
          <el-button type="text" v-if="scope.row.source=='02' && scope.row.status == '020'" @click="confirmAdjustment(scope.row)" v-permission="'adjustmentType_confirm'">确认调整</el-button>
          <span v-if="!tableData.loading" v-count-width="{widthArr: [60, scope.row.source=='01' && scope.row.status == '020' ? 65 : 0, scope.row.source=='02' && scope.row.status == '020' ? 65 : 0 ], callback: countWidth }"></span>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 分配事业部 -->
    <allocation-department :visible.sync="visible" v-if="visible.show" @comfirm="comfirm" :filterData="filterData" :type="'typeList'"></allocation-department>
    <!-- 分配事业部 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import allocationDepartment from '@c/allocationDepartment/index'
import { getlistAdjustment, exportAdjustmentTypeUrl, importAdjustmentUrl } from '@a/storageManage/index'
import { deleteAdjustment, confirmAdjustment, typeConfirmInDepot } from '@a/storageManage/storage'
export default {
  mixins: [commomMix],
  components: {
    allocationDepartment
  },
  data() {
    return {
      ruleForm: {
        code: '',
        model: '',
        source: '',
        status: '',
        adjustmentEndTime: '',
        adjustmentStartTime: '',
        depotId: ''
      },
      date: '',
      visible: { show: false },
      filterData: {},
      flage: true
    }
  },
	mounted() {
    this.getList(1)
	},
  methods: {
		async getList(pageNum) {
      this.ruleForm.adjustmentStartTime = this.date && this.date.length > 0 ? this.date[0] : ''
      this.ruleForm.adjustmentEndTime = this.date && this.date.length > 0 ? this.date[1] : ''
      this.tableData.pageNum = pageNum || this.tableData.pageNum
      try {
				this.tableData.loading = true
				// 同步方法
				const res = await getlistAdjustment({ begin: (this.tableData.pageNum - 1) * this.tableData.pageSize, pageSize: this.tableData.pageSize || 10, ...this.ruleForm })
				this.tableData = {
					list: res.data.list,
					loading: false,
					pageNum: this.tableData.pageNum,
					total: res.data.total,
					pageSize: res.data.pageSize
				}
			} catch (err) {
        this.tableData.loading = false
			}
    },
    // 删除
		dele(row) {
    },
    // 导出
    exportExcel() {
      let opt = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.ruleForm
      }
      if (this.tableChoseList.length > 0) {
        const ids = this.tableChoseList.map(item => item.id).toString()
        opt = { ids }
      }
      this.$exportFile(exportAdjustmentTypeUrl, opt)
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 135 + '&url=' + importAdjustmentUrl)
    },
    moreDele() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      const idsAray = []
      this.tableChoseList.map(item => idsAray.push(item.id))
      this.$confirm('确定删除选中对象？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
        deleteAdjustment({ ids: idsAray.join(',') }).then(() => {
          this.$successMsg('删除成功', () => {
            this.getList(this.tableData.pageNum)
          })
        })
			})
    },
    // 确认调整
    confirmAdjustment(row) {
      confirmAdjustment({ id: row.id }).then(() => {
        this.$successMsg('调整成功', () => {
          this.getList(this.tableData.pageNum)
        })
      })
    },
    // 打开分配事业部
    openDalog(row) {
      this.filterData = { id: row.id }
      this.visible.show = true
    },
    comfirm(list) {
      if (list && list.length > 0) {
        if (!this.flage) return false
        this.flage = false
        const json = { id: this.filterData.id, itemList: [] }
        list.map(item => {
          if (item.buId) json.itemList.push({ id: item.id, buId: item.buId })
        })
        typeConfirmInDepot({ json: JSON.stringify(json) }).then(res => {
          this.$successMsg('操作成功')
          this.getList(this.tableData.pageNum)
          this.visible.show = false
        }).finnally(() => {
          this.flage = true
        })
      } else {
        this.visible.show = false
      }
    },
    resetForm() {
      this.date = ''
      this.reset('ruleForm', () => this.getList(1))
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
