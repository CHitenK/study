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
            <el-form-item  label="公司："  prop="merchantName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.merchantName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="业务类别：" prop="model" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.model" placeholder="请选择" clearable :data-list="getSelectList('adjustmentInventory_modelList')" >
                <el-option v-for="item in selectOpt.adjustmentInventory_modelList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.status" placeholder="请选择" clearable :data-list="getSelectList('adjustmentType_statusList')" >
                <el-option v-for="item in selectOpt.adjustmentType_statusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据来源：" prop="source" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.source" placeholder="请选择" clearable :data-list="getSelectList('adjustmentInventory_sourceList')" >
                <el-option v-for="item in selectOpt.adjustmentInventory_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="归属时间：">
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
        <el-button type="primary" :size="'small'" @click="confirmIds" :loading="comfirmLoading" v-permission="'adjustmentInventory_confirm'">确认</el-button>
        <el-button type="primary" :size="'small'" @click="dele" v-permission="'adjustmentInventory_deleteAdjustment'">删除</el-button>
        <el-button type="primary" :size="'small'" @click="importFile" v-permission="'adjustmentInventory_import'">导入</el-button>
        <el-button type="primary" :size="'small'" @click="exportExcel" v-permission="'adjustmentInventory_export'">导出</el-button>
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
        min-width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="业务类型"
        align="center"
        prop="modelLabel"
        width="90"
      >
      </el-table-column>
        <el-table-column
        prop="sourceCode"
        label="来源单据号"
        min-width="100"
        show-overflow-tooltip
        align="center"
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
        prop="months"
        label="归属月份"
        align="center"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="sourceTime"
        label="归属时间"
        align="center"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="sourceLabel"
        label="单据来源"
        align="center"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="statusLabel"
        label="单据状态"
        align="center"
        width="80"
      >
      </el-table-column>
      <el-table-column
      align="left"
      fixed="right"
      :width="btnsWidth"
      label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/storage/stockdetail?id=' + scope.row.id)" v-permission="'adjustmentInventory_detail'">详情</el-button>
          <el-button type="text" v-if="scope.row.status === '020' && scope.row.source === '01'" @click="openDalog(scope.row)" v-permission="'adjustmentInventory_classifyAdjustmentInventory'">分配事业部</el-button>
          <span v-if="!tableData.loading" v-count-width="{widthArr: [60, scope.row.status === '020' && scope.row.source === '01' ? 65 : 0 ], callback: countWidth }"></span>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 分配事业部 -->
    <allocation-department :visible.sync="visible" v-if="visible.show" @comfirm="comfirm" :filterData="filterData" :type="'stockList'"></allocation-department>
    <!-- 分配事业部 -->
  </div>
</template>
<script>
import { getAvailableNum } from '@a/base/index'
import { listAdjustment, adjustdDleteAdjustment, exportAdjustmentInventoryUrl, saveBuDetails, importAdjustmentUrl, getAdjustmentSum, auditAdjustment } from '@a/storageManage/storage'
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
        source: '',
        depotId: '',
        merchantName: '',
        status: '',
        model: '',
        sourceStartTime: '',
        sourceEndTime: ''
      },
      date: '',
      filterData: {},
      visible: { show: false },
      comfirmLoading: false,
      loading: true,
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
        this.ruleForm.sourceStartTime = this.date && this.date.length > 0 ? this.date[0] : ''
        this.ruleForm.sourceEndTime = this.date && this.date.length > 0 ? this.date[1] : ''
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				// 同步方法
				const res = await listAdjustment(opt)
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
		dele() {
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
        adjustdDleteAdjustment({ ids: idsAray.join(',') }).then(() => {
          this.$successMsg('删除成功', () => {
            this.getList(this.tableData.pageNum)
          })
        })
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
      this.$exportFile(exportAdjustmentInventoryUrl, opt)
    },
    selectable(data) {
      return data.status === '020'
    },
    comfirm(list = []) {
      if (list && list.length < 1) return false
      const id = this.filterData.id
      const callback = () => {
        const json = { id: this.filterData.id, itemList: [] }
        list.map(item => {
          if (item.buId) json.itemList.push({ id: item.id, buId: item.buId })
        })
        saveBuDetails({ json: JSON.stringify(json) }).then(res => {
          this.$successMsg('操作成功')
          this.getList(this.tableData.pageNum)
          this.visible.show = false
        })
      }
      if (!this.flage) return false
      this.flage = false
      this.checkKucn(id, callback)
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 112 + '&url=' + importAdjustmentUrl)
    },
    // 校验库存过程
    async checkKucn(ids = '', callback) {
      let check = true
      try {
        const res = await getAdjustmentSum({ ids: ids })
        const list = res.data || []
        for (let i = 0; i < list.length; i++) {
          const item = list[i]
          const depotId = item.depot_id
          const goodsId = item.goods_id
          const goodsNo = item.goods_no
          const depotCode = item.depot_code
          const type = item.is_damage // 是否坏品 0-好品 1-坏品
          const isExpire = item.isExpire // 是否过期0-是 1-否
          const batchNo = item.old_batch_no // 是否过期0-是 1-否
          const adjustTotal = item.adjust_total // 调整量
          const tallyingUnit = item.depot_type === 'c' ? item.tallying_unit : null
          const k = await getAvailableNum({ depotId, goodsId, depotCode, unit: tallyingUnit, type, isExpire, batchNo })
          const availableNum = k.data || -1
          if (availableNum === -1) {
            check = false
            this.$errorMsg('货号' + goodsNo + '未查到库存余量')
            break
          } else if (adjustTotal > availableNum) {
            check = false
            const batchNoMsg = batchNo ? '批次:' + batchNo : ''
            this.$errorMsg('库存不足货号：' + goodsNo + batchNoMsg + ',余量：' + availableNum)
            break
          }
        }
        if (check && callback) {
          callback()
        }
      } catch (err) {
        console.log(err)
      }
      this.flage = true
      this.comfirmLoading = false
    },
    // 确认
    confirmIds() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      this.comfirmLoading = true
      const ids = this.tableChoseList.map(item => item.id).toString()
      const callback = () => {
        auditAdjustment({ ids: ids }).then(() => {
          this.$successMsg('确认入库成功！')
          this.getList()
        }).finally(() => {
          this.comfirmLoading = false
        })
      }
      this.checkKucn(ids, callback)
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
