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
            <el-form-item  label="调拨订单号："  prop="code" class="search-panel-item fs-14 clr-II" >
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
              <el-select v-model="ruleForm.outDepotId" placeholder="请选择" clearable filterable :data-list="getSelectBeanByMerchantRel('cangkuList')" >
                <el-option v-for="item in selectOpt.cangkuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="合同号：" prop="contractNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.contractNo" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.status" placeholder="请选择" clearable :data-list="getSelectList('transferOrder_statusList')" >
                <el-option v-for="item in selectOpt.transferOrder_statusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="LBX单号：" prop="lbxNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.lbxNo" clearable></el-input>
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
            <el-form-item label="创建时间：">
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
        <el-button type="primary" :size="'small'" @click="linkTo('/transfer/orderEdit/add')"  v-permission="'transfer_add'" >新增</el-button>
        <el-button type="primary" :size="'small'" @click="dele"  v-permission="'transfer_delTransferOrder'">删除</el-button>
        <el-button type="primary" :size="'small'" @click="importFile" v-permission="'transfer_import'">导入</el-button>
        <el-button type="primary" :size="'small'" @click="exportExcel"  v-permission="'transfer_export'">导出</el-button>
        <el-button type="primary" :size="'small'" @click="copy"  v-permission="'transfer_copy'">复制</el-button>
        <el-button type="primary" :size="'small'" @click="exportQing"  v-permission="'transfer_exportCustoms'" :loading="qinguanLoading">导出清关资料</el-button>
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
      <el-table-column prop="code" label="调拨单号" align="center" width="150"></el-table-column>
      <el-table-column prop="contractNo" label="合同号" align="center" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="outDepotName" label="调出仓库" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="inDepotName" label="调入仓库" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="statusLabel" label="单据状态" align="center" width="90"></el-table-column>
      <el-table-column prop="lbxNo" label="LBX单号" align="center" width="120"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center" width="140"></el-table-column>
      <el-table-column label="操作" align="left" fixed="right" :width="btnsWidth" >
        <!-- :width="btnsWidth" -->
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/transfer/orderDetail?id=' + scope.row.id )" v-permission="'transfer_detail'">详情</el-button>
          <el-button type="text" @click="linkTo('/transfer/orderEdit/edit?id=' + scope.row.id )" v-if="scope.row.status == '013'"  v-permission="'transfer_edit'">编辑</el-button>
          <el-button type="text" @click="linkTo('/transfer/outWarehouse?id=' + scope.row.id )" v-if="scope.row.outDepotBatchValidation !== '1' && scope.row.outDepotIsInDependOut !== '1' && ['014', '024'].includes(scope.row.status)" v-permission="'transfer_out'">打托出库</el-button>
          <el-button type="text" @click="linkTo('/transfer/inWarehouse?id=' + scope.row.id )" v-if="scope.row.inDepotBatchValidation !== '1' && scope.row.inDepotIsOutDependIn !== '1' && scope.row.status === '023'"  v-permission="'transfer_in'">入库上架</el-button>
          <el-button type="text" @click="linkTo('/common/enclosureManage?code=' + scope.row.code)" v-if="['014', '024', '023'].includes(scope.row.status)" v-permission="'transfer_attachment'">附件</el-button>
          <el-button type="text" @click="linkTo('/common/enclosureManage?code=' + scope.row.code)" v-if="scope.row.status == '007'" v-permission="'transfer_attachment'">附件管理</el-button>
          <span v-if="!tableData.loading" v-count-width="{
            widthArr: [60, scope.row.status == '013' ? 30 : 0,
            scope.row.outDepotBatchValidation !== '1' && scope.row.outDepotIsInDependOut !== '1' && ['014', '024'].includes(scope.row.status) ? 60 : 0,
            scope.row.inDepotBatchValidation !== '1' && scope.row.inDepotIsOutDependIn !== '1' && scope.row.status === '023' ? 60 : 0,
            ['014', '024', '023'].includes(scope.row.status) ? 40 : 0,
            scope.row.status == '007' ? 60 : 0
            ],  callback: countWidth }"></span>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 清关资料导出确认 -->
    <export-confirm v-if="visible.show" :visible="visible" :targetData="targetData" @comfirm="comfirm"></export-confirm>
    <!-- 清关资料导出确认 end-->
    <!-- 执行导出 -->
      <div class="hide-form" v-if="downVal">
        <form id="down-up" :action="actionUrl" method="post" target="_blank" enctype="application/json">
          <input type="hidden" name="json" v-model="downVal" />
        </form>
      </div>
    <!-- 执行导出 -->
  </div>
</template>
<script>
import { listTransferOrder, delTransferOrder, importTransferUrl, exportTransferOrderUrl, exportCustomsDeclareUrl, getExportTemplate } from '@a/transferManage/index'
import commomMix from '@m/index'
import { getBaseUrl } from '@u/tool'
export default {
  mixins: [commomMix],
  components: {
    exportConfirm: () => import('@c/exportConfirm/index')
  },
  data() {
    return {
      ruleForm: {
        code: '',
        outDepotId: '',
        inDepotId: '',
        contractNo: '',
        status: '',
        buId: '',
        lbxNo: '',
        createDateStart: '',
        createDateEnd: ''
      },
      date: '',
      visible: { show: false },
      targetData: {},
      qinguanLoading: false,
      downVal: ''
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
        this.ruleForm.createDateStart = this.date && this.date.length > 0 ? this.date[0] + ' 00:00:00' : ''
        this.ruleForm.createDateEnd = this.date && this.date.length > 0 ? this.date[1] + ' 23:59:59' : ''
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await listTransferOrder(opt)
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
			this.$confirm('确定删除选中对象?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
				await delTransferOrder({ ids })
        this.$successMsg('删除成功')
        this.getList()
			})
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 111 + '&url=' + importTransferUrl)
    },
    resetForm() {
      this.date = ''
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    // 导出
    exportExcel() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      let opt = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.ruleForm
      }
      if (this.tableChoseList.length > 0) {
        const ids = this.tableChoseList.map(item => item.id).toString()
        opt = { ids }
      }
      this.$exportFile(exportTransferOrderUrl, opt)
    },
    // 导出清关资料
    async exportQing() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      if (this.tableChoseList.length !== 1) {
        this.$errorMsg('目前只支持单条数据导出')
        return false
      }
       this.qinguanLoading = true
      // isSameArea - 是否同关区,  outDepotId - 出仓id,         inDepotId - 入仓id,        outCustomsId - 出仓关区, inCustomsId - 入仓同关区
      const { outDepotId = '', isSameArea, inDepotId, outCustomsId, inCustomsId } = this.tableChoseList[0]
      const opt = {
        outDepotId: outDepotId || '',
        inDepotId: inDepotId || '',
        isSameArea: isSameArea || '',
        outCustomsId: outCustomsId || '',
        inCustomsId: inCustomsId || ''
      }
      try {
        const res = await getExportTemplate({json: JSON.stringify(opt)})
        if (res.data.code === '00') { // 直接导出
          let inFileTempIds = ''
          let outFileTempIds = ''
          if (res.data.inList && res.data.inList.length > 0) {
            inFileTempIds = res.data.inList[0].fileTempId + ''
          }
          if (res.data.outList && res.data.outList.length > 0) {
            outFileTempIds = res.data.outList[0].fileTempId + ''
          }
          this.handleFormExportFile({ inFileTempIds, outFileTempIds })
        } else if (res.data.code === '01') { // 没有找到关联模板
          this.$alertWarning('该仓库暂无配置清关资料模板，请先完成模板配置！')
        } else { // 弹出选择模板
          this.targetData = res.data
          this.visible.show = true
        }
      } catch (err) {
        console.log(err)
      }
      this.qinguanLoading = false
    },
    // 选择模板后导出清关资料
    comfirm(data) {
      this.visible.show = false
      const inFileTempIds = data.inFileTemp.map(item => item.fileTempId).toString()
      const outFileTempIds = data.outFileTemp.map(item => item.fileTempId).toString()
      this.handleFormExportFile({ inFileTempIds, outFileTempIds })
    },
    // 复制
    copy() {
      if (this.tableChoseList.length !== 1) {
        this.$errorMsg('请选择一条记录！')
        return false
      }
      const id = this.tableChoseList[0].id
      this.linkTo('/transfer/orderEdit/add?id=' + id)
    },
    // 下载清关资料
    handleFormExportFile(opt) {
      const json = {
        ...opt,
        id: this.tableChoseList[0].id + ''
      }
      this.actionUrl = getBaseUrl(exportCustomsDeclareUrl) + exportCustomsDeclareUrl + `?token=${sessionStorage.getItem('token')}`
      this.downVal = JSON.stringify(json)
      this.$nextTick(() => {
        const form = document.getElementById('down-up')
        form.submit()
        this.downVal = ''
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.hide-form{
  width: 100%;
  height: 1px;
  overflow: hidden;
  opacity: 0;
}
</style>
