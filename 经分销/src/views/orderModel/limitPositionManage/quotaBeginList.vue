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
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable :data-list="getSelectBeanByUserId('buList')" >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="配置模块：" prop="quotaType" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.quotaType" placeholder="请选择" clearable :data-list="getSelectList('quotaconfig_quotaTypeList')">
                <el-option v-for="item in selectOpt.quotaconfig_quotaTypeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <el-button type="primary" :size="'small'" @click="openAdd({})" v-permission="'quotaBegin_add'">新增</el-button>
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
      <el-table-column type="index" label="序号" align="center" width="55" :selectable="selectable"></el-table-column>
      <el-table-column prop="quotaTypeLabel" label="配置模块" align="center" width="90"></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" width="120"></el-table-column>
      <el-table-column prop="configObjectName" label="配置对象" align="center" min-width="140"></el-table-column>
      <el-table-column prop="typeLabel" label="期初使用额度" align="center" width="140">
        <template slot-scope="scope">
          {{scope.row.currency}} {{numberFormat(scope.row.periodQuota)}}
        </template>
      </el-table-column>
      <el-table-column prop="typeLabel" label="起初日期" align="center" width="110">
        <template slot-scope="scope">
          {{scope.row.periodDate ? scope.row.periodDate.substring(0, 10) : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="createName" label="创建人" align="center" width="110"> </el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center" width="140"></el-table-column>
      <el-table-column prop="auditName" label="审核人" align="center" width="100"></el-table-column>
      <el-table-column prop="auditDate" label="审核时间" align="center" width="140"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="80">
        <!-- 状态 0-待审核 1-已审核 -->
        <template slot-scope="scope">
          {{['待审核', '已审核'][scope.row.status]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="60">
        <template slot-scope="scope">
          <el-button type="text" @click="openEdit(scope.row)" v-if="+scope.row.status !== 1" v-permission="'quotaBegin_edit'">编辑</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 编辑 -->
    <edit :visible.sync="visible" v-if="visible.show" :targetData="targetData" @close="getList"></edit>
    <!-- 编辑 end-->
  </div>
</template>
<script>
import { quotaGetListByPage, delProjectQuotaConfig } from '@a/limitPositionManage/index'
import commomMix from '@m/index'
import { numberFormat } from '@u/tool'
export default {
  mixins: [commomMix],
  components: {
    edit: () => import('./components/quotaBeginEdit')
  },
  data() {
    return {
      ruleForm: {
        buId: '',
        quotaType: ''
      },
      visible: { show: false },
      targetData: {}
    }
  },
	mounted() {
    // 获取事业部
		this.getList()
	},
  methods: {
    numberFormat,
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
				const res = await quotaGetListByPage(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
		dele() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
			this.$confirm('确定删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
				const ids = this.tableChoseList.map(item => item.id).toString()
        await delProjectQuotaConfig({ ids })
        this.$successMsg('删除成功')
        this.getList()
			})
    },
    // 打开新增
    openAdd() {
      this.targetData = {}
      this.visible.show = true
    },
    // 打开编辑
    openEdit(row) {
      this.targetData = row
      this.visible.show = true
    },
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    filterPurchaseCode(row) {
      let html = row.purchaseCode ? row.purchaseCode : ''
      if (row.poNo) {
        html += ('<br />' + 'PO:' + row.poNo)
      }
      return html
    },
    filterAmount(row) {
      let currency = ''
      let amount = ''
      if (row.amount) {
        amount = row.amount
        currency = row.currency ? row.currency : ''
      }
      let html = currency + ' '
      html += amount
      return html
    },
    filterSdAmount(row) {
      let tgtCurrency = ''
      let sdAmount = ''
      if (row.sdAmount) {
        sdAmount = row.sdAmount
        tgtCurrency = row.tgtCurrency ? row.tgtCurrency : ''
      }
      let html = tgtCurrency + ' '
      html += sdAmount
      return html
    },
    selectable(data) {
      return +data.status === 0
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
