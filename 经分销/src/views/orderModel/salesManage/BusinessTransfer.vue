<template>
  <!-- 事业部移库单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="移库仓库：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.depotId"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectBeanByMerchantRel('warehouseList')"
              >
                <el-option
                  v-for="item in selectOpt.warehouseList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="移入事业部：" prop="inBuId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.inBuId"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getBUSelectBean('inBusinessList')"
              >
                <el-option
                  v-for="item in selectOpt.inBusinessList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="移出事业部：" prop="outBuId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.outBuId"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getBUSelectBean('outBusinessList')"
              >
                <el-option
                  v-for="item in selectOpt.outBusinessList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="移库单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="来源业务单号：" prop="businessNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.businessNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="移库状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.status"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('buMoveInventory_statusList')"
              >
                <el-option
                  v-for="item in selectOpt.buMoveInventory_statusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="创建时间：">
              <el-date-picker
                clearable
                v-model="date1"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="移库日期：">
              <el-date-picker
                clearable
                v-model="date2"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="importFile" v-permission="'buMoveInventory_import'">导入</el-button>
        <el-button type="primary" @click="exportList" v-permission="'buMoveInventory_export'">导出</el-button>
        <el-button type="primary" @click="examineOrder" v-permission="'buMoveInventory_audit'">审核</el-button>
        <el-button type="primary" @click="deleteTableItem" v-permission="'buMoveInventory_del'">删除</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               @selection-change="selectionChange"
               @change="getList"
               class="mr-t-20" >
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="code"
                       align="center"
                       label="移库单号"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="businessNo"
                       align="center"
                       label="来源业务单号"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="depotName"
                       align="center"
                       label="仓库"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="inBuName"
                       align="center"
                       label="移入事业部"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="outBuName"
                       align="center"
                       label="移出事业部"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="createDate"
                       align="center"
                       label="创建时间"
                       width="150"
      ></el-table-column>
      <el-table-column prop="moveDate"
                       align="center"
                       label="移库日期"
                       width="100">
        <template slot-scope="{row}">
          {{row.moveDate.slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column prop="orderSourceLabel"
                       align="center"
                       label="单据来源"
                       width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="createName"
                       align="center"
                       label="创建人"
                       width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="statusLabel"
                       align="center"
                       label="移库状态"
                       width="70"
      ></el-table-column>
      <el-table-column align="left"
                       label="操作"
                       width="60"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="text"
                     v-permission="'buMoveInventory_detail'"
                     @click="linkTo(`/sales/businesstransferdetail?id=${row.id}`)">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  getBuMoveInventoryList,
  exportBuMoveInventoryUrl,
  importBuMoveInventoryUrl,
  auditBuMoveInventory,
  delBuMoveInventory,
  getBuMoveInventoryCount
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 创建时间
      date1: [],
      // 移库日期
      date2: [],
      // 查询数据
      searchProps: {
        depotId: '',
        inBuId: '',
        outBuId: '',
        code: '',
        businessNo: '',
        status: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      // 创建时间
      this.searchProps.createStartDate = this.date1 && this.date1.length ? this.date1[0] : ''
      this.searchProps.createEndDate = this.date1 && this.date1.length ? this.date1[1] : ''
      // 移库日期
      this.searchProps.moveStartDate = this.date2 && this.date2.length ? this.date2[0] : ''
      this.searchProps.moveEndDate = this.date2 && this.date2.length ? this.date2[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
				this.tableData.loading = true
				const { data } = await getBuMoveInventoryList({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (err) {}
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
            this.$exportFile(exportBuMoveInventoryUrl, { ids })
          })
        } else {
          const { data } = await getBuMoveInventoryCount({ ...this.searchProps })
          if (data > 10000) {
            return this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
          }
          this.$exportFile(exportBuMoveInventoryUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 审核
    examineOrder() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定审核当前项？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await auditBuMoveInventory({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 删除表格项
    deleteTableItem() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定删除数据？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await delBuMoveInventory({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 136 + '&url=' + importBuMoveInventoryUrl)
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.date1 = []
        this.date2 = []
        this.getList(1)
      })
    }
  }
}
</script>
