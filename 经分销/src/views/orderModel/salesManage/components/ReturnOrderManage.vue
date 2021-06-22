<template>
  <!-- 退货订单管理 -->
  <div>
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)" style="margin-top: 0px">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="来源交易单号：" prop="externalCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.externalCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="入库单号：" prop="inDepotCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.inDepotCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="退入仓名称：" prop="returnInDepotId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.returnInDepotId"
                         placeholder="请选择"
                         clearable
                         :data-list="getSelectBeanByMerchantRel('warehouseList')">
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
            <el-form-item label="平台名称：" prop="storePlatformCode" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.storePlatformCode"
                         placeholder="请选择"
                         clearable
                         :data-list="getSelectList('storePlatformList')">
                <el-option
                  v-for="item in selectOpt.storePlatformList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="订单编号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.status"
                         placeholder="请选择"
                         clearable
                         :data-list="getSelectList('order_returnStatusList')">
                <el-option
                  v-for="item in selectOpt.order_returnStatusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台售后单号：" prop="returnCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.returnCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="订单来源：" prop="orderReturnSource" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.orderReturnSource"
                         placeholder="请选择"
                         clearable
                         :data-list="getSelectList('order_returnSourceList')">
                <el-option
                  v-for="item in selectOpt.order_returnSourceList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="售后类型：" prop="afterSaleType" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.afterSaleType"
                         placeholder="请选择"
                         clearable
                         :data-list="getSelectList('order_returnAfterSaleTypeList')">
                <el-option
                  v-for="item in selectOpt.order_returnAfterSaleTypeList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date1" label="退款完结时间：">
              <el-date-picker
                clearable
                v-model="date1"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="data2" label="入库时间：">
              <el-date-picker
                clearable
                v-model="date2"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="exportList" v-permission="'order_return_exportOrder'">导出</el-button>
        <el-button type="primary" @click="importFile" v-permission="'order_return_import'">导入</el-button>
        <el-button type="primary" @click="changeState('1')" v-permission="'order_return_checkConditionsOrder'">审核</el-button>
        <el-button type="primary" @click="changeState('2')" v-permission="'order_return_delOrder'">删除</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table ref="table"
               :isHideCellBorder="true"
               :tableData.sync="tableData"
               :stripe="false"
               :row-style="rootRowStyle"
               @selection-change="selectionChange"
               @change="getList">
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="code"
                       align="center"
                       label="订单号"
                       min-width="120"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          订单编号：{{row.code}}<br/>
          来源交易单号：{{row.externalCode}}
        </template>
      </el-table-column>
      <el-table-column prop="storePlatformCodeLabel"
                       align="center"
                       label="平台名称"
                       min-width="120"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          {{row.storePlatformCodeLabel}}<br/>
          {{row.shopTypeCodeLabel}}
        </template>
      </el-table-column>
      <el-table-column prop="shopName"
                       align="center"
                       label="店铺名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="totalRefundAmount"
                       align="center"
                       label="退款金额"
                       width="100"
      ></el-table-column>
      <el-table-column prop="refundEndDate"
                       align="center"
                       label="退款完结时间"
                       width="150"
      ></el-table-column>
      <el-table-column prop="returnInDepotName"
                       align="center"
                       label="入库仓库"
                       min-width="120"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          {{row.returnInDepotName}}<br/>
          {{row.returnInDate}}
        </template>
      </el-table-column>
      <el-table-column prop="afterSaleTypeLabel"
                       align="center"
                       label="售后类型"
                       width="100"
      ></el-table-column>
      <el-table-column prop="statusLabel"
                       align="center"
                       label="单据状态"
                       width="100"
      ></el-table-column>
      <el-table-column align="left"
                       width="100"
                       label="操作"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="text"
                     @click="linkTo(`/sales/returnorderdetail?id=${row.id}`)">详情</el-button>
          <el-button type="text"
                     @click="handleExpand(row)">
            {{ row.show ? '收起' : '展开' }}
            <i :class="row.show ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
          </el-button>
        </template>
      </el-table-column>
      <el-table-column type="expand" label="展开" width="1">
        <template slot-scope="{row}">
          <div class="inner-container">
            <el-table :data="row.children"
                      :header-cell-style="{ background: '#e4e8ed' }"
                      :border="false"
                      stripe
                      :summary-method="summaryMethod"
                      showSummary
                      v-loading="row.loading"
                      class="inner-table"
                      ref="subTable">
              <el-table-column prop="inGoodsNo"
                              align="center"
                              min-width ="120"
                              label="商品货号"
                              show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="inGoodsName"
                              align="center"
                              label="商品名称"
                              min-width="140"
                              show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="returnNum"
                              align="center"
                              min-width="80"
                              label="正常品数量"
              ></el-table-column>
              <el-table-column prop="badGoodsNum"
                              align="center"
                              min-width="80"
                              label="残次品数量"
              ></el-table-column>
              <el-table-column align="center"
                              min-width="80"
                              label="退货总数量">
                <template slot-scope="{row}">
                  {{row.returnNum + row.badGoodsNum}}
                </template>
              </el-table-column>
              <el-table-column prop="refundAmount"
                               align="center"
                               min-width="80"
                               label="退款金额"
              ></el-table-column>
              <!-- <el-table-column prop="price"
                              align="center"
                              min-width="80"
                              label="销售单价"
              ></el-table-column>
              <el-table-column prop="decTotal"
                              align="center"
                              min-width="120"
                              label="销售金额"
              ></el-table-column> -->
            </el-table>
          </div>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end -->
  </div>
</template>

<script>
import {
  getReturnOrderManageList,
  getReturnOrderManageById,
  exportReturnOrderManageUrl,
  importReturnOrderManageUrl,
  examineReturnOrderManage,
  delReturnOrderManage,
  getReturnOrderManageCount,
  checkConditionsOrder
} from '@a/salesManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 退款完结时间
      date1: [],
      // 入库时间
      date2: [],
      // 查询数据
      searchProps: {
        externalCode: '',
        // inDepotCode: '',
        afterSaleType: '',
        returnInDepotId: '',
        storePlatformCode: '',
        code: '',
        status: '',
        returnCode: '',
        orderReturnSource: ''
      }
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
      // 退款完结时间
      this.searchProps.returnInCreateStartDate = this.date1 && this.date1.length ? this.date1[0] : ''
      this.searchProps.returnInCreateEndDate = this.date1 && this.date1.length ? this.date1[1] : ''
      // 入库时间
      this.searchProps.returnInStartDate = this.date2 && this.date2.length ? this.date2[0] : ''
      this.searchProps.returnInEndDate = this.date2 && this.date2.length ? this.date2[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await getReturnOrderManageList({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
        // 增加children loading属性用来展示嵌套表格
        this.tableData.list = this.tableData.list.map(item => ({ ...item, show: false, loading: false, children: [] }))
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.tableData.loading = false
      }
    },
    // 审核、删除
    changeState(type) {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      const typeEnmus = {
        '1': '确定审核当前项？',
        '2': '确定删除数据？'
      }
      this.$showToast(typeEnmus[type], async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          switch (type) {
            // 审核
            case '1':
              await checkConditionsOrder({ ids }) // 检查手工导入订单是否满足条件
              await examineReturnOrderManage({ ids })
              break
            // 删除
            case '2':
              await delReturnOrderManage({ ids })
              break
          }
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 点击展开表格行
    async handleExpand(row) {
      // 表格的ref节点
      const $table = this.$refs.table.$refs['el-table']
      // 先关闭之前展开的表格行 实现手风琴效果
      this.tableData.list.forEach(item => {
        if (row.id !== item.id) {
          item.show = false
          $table.toggleRowExpansion(item, false)
        }
      })
      // 当前点击的行
      row.show = !row.show
      $table.toggleRowExpansion(row, row.show)
      if (row.id) {
        try {
          row.loading = true
          const { data } = await getReturnOrderManageById({ id: row.id })
          row.children = data.itemList
          // row.children.push({
          //   returnNum: '',
          //   badGoodsNum: '',
          //   refundAmount: `实际退款总金额:${data.amount}`
          // })
        } catch (error) {
          this.$errorMsg(error.message)
        } finally {
          row.loading = false
        }
      }
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
            this.$exportFile(exportReturnOrderManageUrl, { ids })
          })
        } else {
          const { data } = await getReturnOrderManageCount({ ...this.searchProps })
          if (data > 100000) {
            return this.$errorMsg('数据超过10W行，请缩小导出时间范围')
          }
          this.$exportFile(exportReturnOrderManageUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 126 + '&url=' + importReturnOrderManageUrl)
    },
    rootRowStyle({ row }) {
      if (row.show) {
        return { background: '#f0f7ff' }
      }
    },
    // 合计方法
    summaryMethod({ data }) {
      const sums = []
      let refundAmounts = 0
      data.forEach(item => {
        refundAmounts += item.refundAmount ? +item.refundAmount : 0
      })
      sums[5] = `订单退款总金额${(+refundAmounts).toFixed(2)}`
      return sums
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

<style lang="scss" scoped>
// 隐藏箭头
/deep/.el-table__expand-column .cell {
  display: none;
}

/deep/.jfx-table .el-table__expanded-cell{
  padding: 0 !important;
}

// 展开内容的div
/deep/.inner-container {
  padding: 20px 100px 30px 55px !important;
  background: #f0f7ff !important;

  // 嵌套表格
  /deep/.inner-table {
    border: 1px solid rgb(222, 231, 245);
  }

  .inner-table td,
  .inner-table th,
  .is-leaf {
    border-left: none;
    border-right: none;
    border-top: none;
  }
}
</style>
