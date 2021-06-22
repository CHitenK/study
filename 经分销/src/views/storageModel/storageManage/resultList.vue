<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('ruleForm', () => getList(1))" @search="getList(1)">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="盘点单号："  prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.code" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="仓库：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.depotId" placeholder="请选择" filterable clearable :data-list="getSelectBeanByMerchantRel('depotList')" >
                <el-option v-for="item in selectOpt.depotList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="公司：" prop="merchantName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.merchantName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="业务场景：" prop="model" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.model" placeholder="请选择" clearable :data-list="getSelectList('takesStockResult_modelList')" >
                <el-option v-for="item in selectOpt.takesStockResult_modelList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="服务类型：" prop="serverType" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.serverType" placeholder="请选择" clearable :data-list="getSelectList('takesStockResult_serverTypeList')" >
                <el-option v-for="item in selectOpt.takesStockResult_serverTypeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.status" placeholder="请选择" clearable :data-list="getSelectList('takesStockResult_statusList')" >
                <el-option v-for="item in selectOpt.takesStockResult_statusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'" @click="confirmDepot('20')" :loading="comfirmLoading" v-permission="'takesstockresult_confirmTakesStock'">确认</el-button>
        <el-button type="primary" :size="'small'" @click="confirmDepot('10')" :loading="comfirmLoading1" v-permission="'takesstockresult_confirmTakesStock'">驳回</el-button>
        <el-button type="primary" :size="'small'" @click="importFile" v-permission="'takesstockresult_importTakesStock'">导入</el-button>
        <el-button type="primary" :size="'small'" @click="exportExcel" v-permission="'takesstockresult_export'">导出</el-button>
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
        prop="code"
        label="盘点单号"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="takesStockCode"
        label="盘点指令单号"
        align="center"
        man-width="200"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="商家"
        prop="merchantName"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
        <el-table-column
        prop="depotName"
        label="仓库"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="serverTypeLabel"
        label="服务类型"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="modelLabel"
        label="业务场景"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="sourceTime"
        label="单据日期"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          {{scope.row.sourceTime ? scope.row.sourceTime.substring(0, 10) : ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="statusLabel"
        label="单据状态"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
      align="left"
      fixed="right"
      :width="btnsWidth"
      label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/storage/resultdetail?id=' + scope.row.id)" v-permission="'takesstockresult_detail'">详情</el-button>
          <el-button type="text" v-if="+scope.row.sourceType !== 4 && ['022', '024', '025' ].includes(scope.row.status + '')" @click="openDalog(scope.row)" v-permission="'takesstockresult_inDepotConfirm'">分配事业部</el-button>
          <span v-if="!tableData.loading" v-count-width="{widthArr: [60, +scope.row.sourceType !== 4 && ['022', '024', '025' ].includes(scope.row.status + '') ? 65 : 0 ], callback: countWidth }"></span>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 分配事业部 -->
    <allocation-department :visible.sync="visible" v-if="visible.show" @comfirm="comfirm" :filterData="filterData" :type="'resultList'"></allocation-department>
    <!-- 分配事业部 -->
  </div>
</template>
<script>
import { listTakesStockResult, confirmTakesStock, exportTakesStockResultUrl, confirmInDepot, resultImportUrl } from '@a/storageManage/storage'
import commomMix from '@m/index'
import allocationDepartment from '@c/allocationDepartment/index'
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
        depotId: '',
        merchantName: '',
        serverType: '',
        status: ''
      },
      filterData: {},
      visible: { show: false },
      comfirmLoading: false,
      comfirmLoading1: false,
      flage: true
    }
	},
	mounted() {
		this.getList(1)
	},
  methods: {
		async getList(pageNum) {
      try {
				this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				// 同步方法
				const res = await listTakesStockResult(opt)
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
    // 确认/驳回
    confirmDepot(confirmType) {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      this.comfirmLoading = confirmType === '20'
      this.comfirmLoading1 = confirmType === '10'
      let idsArray = []
      this.tableChoseList.map(item => idsArray.push(item.id))
      const ids = idsArray.join(',')
      confirmTakesStock({
        confirmType, ids
      }).then(() => {
        this.$successMsg('操作成功')
        this.getList(1)
      }).finally(() => {
        this.comfirmLoading = false
        this.comfirmLoading1 = false
      })
    },
    // 打开分配事业部
    openDalog(row) {
      this.filterData = { id: row.id }
      this.visible.show = true
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
      this.$exportFile(exportTakesStockResultUrl, opt)
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 128 + '&url=' + resultImportUrl)
    },
    comfirm(list) {
      if (list && list.length > 0) {
        if (!this.flage) return false
        this.flage = false
        const json = { id: this.filterData.id, details: [] }
        list.map(item => {
          if (item.buId) json.details.push({ id: item.id, buId: item.buId })
        })
        confirmInDepot({ json: JSON.stringify(json) }).then(res => {
          this.$successMsg('操作成功')
          this.getList(this.tableData.pageNum)
          this.visible.show = false
        }).finally(() => {
          this.flage = true
        })
      } else {
        this.visible.show = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
