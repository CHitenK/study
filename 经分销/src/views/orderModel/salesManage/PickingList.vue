<template>
  <!-- 领料单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="领料单号：" prop="code" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="出仓仓库 ：" prop="outDepotId" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.outDepotId"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getSelectBeanByMerchantRel('warehouse_list')">
                <el-option
                  v-for="item in selectOpt.warehouse_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.customerId"
                         placeholder="请选择"
                         filterable
                         clearable
                         :data-list="getCustomerSelectBean('customer_list')">
                <el-option
                  v-for="item in selectOpt.customer_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="订单状态：" prop="state" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.state"
                         placeholder="请选择"
                         filterable
                         clearable
                         :data-list="getSelectList('materialOrder_stateList')">
                <el-option
                  v-for="item in selectOpt.materialOrder_stateList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.buId"
                         placeholder="请选择"
                         filterable
                         clearable
                        :data-list="getBUSelectBean('business_list')">
                <el-option
                  v-for="item in selectOpt.business_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="PO号：" prop="poNo" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.poNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary"
                   v-permission="'sale_material_add'"
                   @click="linkTo('/sales/PickingListAdd')">新增</el-button>
        <el-button type="primary"
                   v-permission="'sale_material_delete'"
                   @click="deleteTableItem">删除</el-button>
        <el-button type="primary"
                   v-permission="'sale_material_export'"
                   @click="exportList">导出</el-button>
        <el-button type="primary"
                   v-permission="'sale_material_copy'"
                   @click="copyItem">复制</el-button>
        <el-button type="primary"
                   v-permission="'sale_material_import'"
                   @click="importFile">导入</el-button>
        <el-button type="primary"
                   v-permission="'sale_material_exportinfo'"
                   :loading="qingGuanLoading"
                   @click="exportCustomsDeclare">导出清关资料</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table ref="table"
               :tableData.sync="tableData"
               @selection-change="selectionChange"
               @change="getList">
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="code"
                       align="center"
                       min-width="120"
                       label="领料单号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="outDepotName"
                       align="center"
                       min-width="120"
                       label="出仓仓库"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       min-width="120"
                       label="事业部"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="poNo"
                       align="center"
                       min-width="120"
                       label="PO单号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="customerName"
                       align="center"
                       min-width="120"
                       label="客户"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="totalNum"
                       align="center"
                       width="80"
                       label="数量"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="createDate"
                       align="center"
                       width="150"
                       label="订单日期"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="stateLabel"
                       align="center"
                       width="80"
                       label="订单状态"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="left"
                       :width="btnsWidth"
                       label="操作"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="text"
                     v-if="row.state === '001'"
                     v-permission="'sale_material_edit'"
                     @click="linkTo(`/sales/PickingListEdit?id=${row.id}`)">编辑</el-button>
          <el-button type="text"
                     v-permission="'sale_material_detail'"
                     @click="linkTo(`/sales/PickingDetail?id=${row.id}`)">详情</el-button>
          <span v-if="!tableData.loading" v-count-width="{ widthArr: [60, row.state === '001' ? 30 : 0], callback: countWidth }"></span>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end -->
    <!-- 清关资料导出 -->
    <ExportConfirm v-if="visible.show"
                   :visible="visible"
                   :targetData="targetData"
                   @comfirm="comfirm"
    ></ExportConfirm>
    <!-- 清关资料导出 end-->
    <!-- 下载 -->
    <div class="hide-form" v-if="downVal">
      <form id="down-up" :action="actionUrl" method="post" target="_blank">
        <input type="hidden" name="json" v-model="downVal" />
      </form>
    </div>
    <!-- 下载 end -->
  </div>
</template>

<script>
import { getExportTemplate } from '@a/base'
import { getBaseUrl } from '@u/tool'
import {
  listMaterialOrder,
  getMaterialCount,
  delMaterialOrder,
  exportMaterialOrderUrl,
  exportCustomsInfo,
  importMaterialOrderUrl
} from '@a/salesManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    ExportConfirm: () => import('@c/exportConfirm') // 清关资料导出
  },
  data() {
    return {
      // 查询数据
      searchProps: {
        code: '',
        outDepotId: '',
        customerId: '',
        state: '',
        buId: '',
        poNo: ''
      },
      // 导出清关资料按钮loading状态
      qingGuanLoading: false,
      actionUrl: '',
      downVal: ''
    }
  },
  activated() {
    this.getList()
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      // 发货时间
      this.searchProps.deliverStartDate = this.date && this.date.length ? this.date[0] : ''
      this.searchProps.deliverEndDate = this.date && this.date.length ? this.date[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listMaterialOrder({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (error) {
        this.$errorMsg(error.message)
      }
      this.tableData.loading = false
    },
    // 导出
    async exportList() {
      if (this.tableData.total < 1) {
        return this.$errorMsg('暂无数据可导出')
      }
      try {
        if (this.tableChoseList.length) {
          this.$showToast('确定导出勾选数据？', async() => {
            const ids = this.tableChoseList.map(item => item.id).toString()
            this.$exportFile(exportMaterialOrderUrl, { ids })
          })
        } else {
          const { data } = await getMaterialCount({ ...this.searchProps })
          if (data > 10000) {
            return this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
          }
          this.$exportFile(exportMaterialOrderUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 删除表格项
    deleteTableItem() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定删除数据？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await delMaterialOrder({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 导出清关资料
    async exportCustomsDeclare() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条数据！')
        return false
      }
      if (this.tableChoseList.length > 1) {
        this.$errorMsg('目前只支持单条数据导出！')
        return false
      }
      const {
        outDepotId = '',
        outCustomsId = '',
        inCustomsId = '',
        inDepotId = '',
        isSameArea = ''
      } = this.tableChoseList[0]
      const json = {
        outDepotId: outDepotId || '',
        inDepotId: inDepotId || '',
        outCustomsId: outCustomsId || '',
        inCustomsId: inCustomsId || '',
        isSameArea: isSameArea || ''
      }
      const exportParams = {}
      try {
        this.qingGuanLoading = true
        const res = await getExportTemplate({ json: JSON.stringify(json) })
        if (res.data.code === '00') { // 直接导出
          if (res.data.inList && res.data.inList.length > 0) {
            exportParams.inFileTempIds = res.data.inList[0].fileTempId + ''
          }
          if (res.data.outList && res.data.outList.length > 0) {
            exportParams.outFileTempIds = res.data.outList[0].fileTempId + ''
          }
          this.handleFormExportFile(exportParams)
        } else if (res.data.code === '01') { // 没有找到关联模板
          this.$alertWarning('该仓库暂无配置清关资料模板，请先完成模板配置！')
        } else { // 弹出选择模板
          this.targetData = res.data
          this.visible.show = true
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
      this.qingGuanLoading = false
    },
    // 选择模板后导出清关资料
    comfirm(data) {
      this.visible.show = false
      const inFileTempIds = data.inFileTemp.map(item => item.fileTempId).toString()
      const outFileTempIds = data.outFileTemp.map(item => item.fileTempId).toString()
      this.handleFormExportFile({ inFileTempIds, outFileTempIds })
    },
    // 下载清关资料
    async handleFormExportFile({ inFileTempIds, outFileTempIds }) {
      const id = this.tableChoseList[0].id + ''
      try {
        const json = JSON.stringify({ inFileTempIds, outFileTempIds, id })
        this.actionUrl = getBaseUrl(exportCustomsInfo) + exportCustomsInfo + `?token=${sessionStorage.getItem('token')}`
        this.downVal = json
        // 下载
        this.$nextTick(() => {
          const form = document.getElementById('down-up')
          form.submit()
          this.downVal = ''
        })
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 复制
    copyItem() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      if (this.tableChoseList.length > 1) {
        return this.$errorMsg('请选择一项复制出！')
      }
      const { id } = this.tableChoseList[0]
      this.linkTo(`/sales/PickingListAdd?copyId=${id}`)
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 161 + '&url=' + importMaterialOrderUrl)
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
