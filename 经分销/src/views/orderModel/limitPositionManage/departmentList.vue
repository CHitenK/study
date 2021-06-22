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
            <el-form-item label="部门名称：" prop="departmentId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.departmentId" placeholder="请选择" clearable filterable >
                <el-option v-for="item in departmentList"  :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="审核状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.status" placeholder="请选择" clearable  >
                <el-option label="待审核" value="0"></el-option>
                <el-option label="已审核" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="生效期区：">
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
        <el-button type="primary" :size="'small'" @click="openAdd" v-permission="'department_add'">新增</el-button>
        <el-button type="primary" :size="'small'" @click="dele" v-permission="'department_dele'">删除</el-button>
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
      <el-table-column type="selection" align="center" width="55" :selectable="selectable"></el-table-column>
      <el-table-column prop="departmentName" label="部门名称" align="center" min-width="130"></el-table-column>
      <el-table-column label="部门额度" align="center" min-width="160">
        <template slot-scope="scope">
          <span v-if="scope.row.departmentQuota">{{scope.row.currency}} {{numberFormat(scope.row.departmentQuota)}}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="已分配额度" align="center" min-width="140">
        <template slot-scope="scope">
          <span v-if="scope.row.usedQuota">{{scope.row.currency}} {{numberFormat(scope.row.usedQuota)}}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column prop="buName" label="待分配额度" align="center" min-width="140">
        <template slot-scope="scope">
          <span v-if="scope.row.surplusQuota">{{scope.row.currency}} {{numberFormat(scope.row.surplusQuota)}}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column prop="typeLabel" label="生效日期" align="center" min-width="110">
        <template slot-scope="scope">
          {{scope.row.effectiveDate ? scope.row.effectiveDate.substring(0, 10) : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="typeLabel" label="失效日期" align="center" min-width="110">
        <template slot-scope="scope">
          {{scope.row.expirationDate ? scope.row.expirationDate.substring(0, 10) : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="createName" label="创建人" align="center" min-width="120"> </el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center" min-width="140"></el-table-column>
      <el-table-column prop="auditName" label="审核人" align="center" min-width="100"></el-table-column>
      <el-table-column prop="auditDate" label="审核时间" align="center" min-width="140"></el-table-column>
      <el-table-column prop="statusLabel" label="审核状态" align="center" min-width="80"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="130">
        <template slot-scope="scope">
          <el-button type="text" @click="openEdit(scope.row)" v-if="+scope.row.status !== 1" v-permission="'departmented_edit'">编辑</el-button>
          <el-button type="text" @click="openDetail(scope.row)" v-if="+scope.row.status === 1"  v-permission="'departmented_detail'">分配详情</el-button>
          <el-button type="text" @click="openAdjust(scope.row)" v-if="+scope.row.status === 1"  v-permission="'departmented_change'">额度调整</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 编辑 -->
    <edit :visible.sync="visible" v-if="visible.show" :targetData="targetData" @close="getList"></edit>
    <!-- 编辑 end-->
    <!-- 分配详情 -->
    <distribution-detail :visible.sync="detailVisible" v-if="detailVisible.show" :targetData="targetData" ></distribution-detail>
    <!-- 分配详情end -->
    <!-- 额度调整 -->
    <adjust-quota :visible.sync="adjustVisible" v-if="adjustVisible.show" :targetData="targetData" type="department" @close="getList"></adjust-quota>
    <!-- 额度调整 end-->
  </div>
</template>
<script>
import { departmentGetListByPage, delDepartmentQuotaConfig } from '@a/limitPositionManage/index'
import { listDepartmentInfo } from '@a/companyFile'
import commomMix from '@m/index'
import { numberFormat } from '@u/tool'
export default {
  mixins: [commomMix],
  components: {
    distributionDetail: () => import('./components/distributionDetail'),
    adjustQuota: () => import('./components/adjustQuota'),
    edit: () => import('./components/departmentEdit')
  },
  data() {
    return {
      ruleForm: {
        departmentId: '',
        status: '',
        effectiveDateStr: '',
        expirationDateStr: ''
      },
      visible: { show: false },
      detailVisible: { show: false },
      adjustVisible: { show: false },
      targetData: {},
      date: '',
      departmentList: []
    }
  },
	mounted() {
    // 获取事业部
		this.getList(1)
    this.getDepartmentList()
	},
  methods: {
    numberFormat,
    async getDepartmentList() {
      const res = await listDepartmentInfo({ begin: 0, pageSize: 10000 })
      this.departmentList = res.data.list || []
    },
		async getList(pageNum) {
      try {
        this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.ruleForm.effectiveDateStr = this.date ? this.date[0] + ' 00:00:00' : ''
        this.ruleForm.expirationDateStr = this.date ? this.date[1] + ' 23:59:59' : ''
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await departmentGetListByPage(opt)
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
        await delDepartmentQuotaConfig({ ids })
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
      this.date = ''
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
    },
    openDetail(row) {
      this.targetData = row
      this.detailVisible.show = true
    },
    openAdjust(row) {
      this.targetData = row
      this.adjustVisible.show = true
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
