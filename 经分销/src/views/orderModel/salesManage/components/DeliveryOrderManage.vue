<template>
  <!-- 发货订单管理 -->
  <div>
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)" style="margin-top: 0px">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="外部交易单号：" prop="externalCode" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.externalCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台名称 ：" prop="storePlatformName" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.storePlatformName"
                         placeholder="请选择"
                         clearable
                         filterable
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
            <el-form-item label="仓库：" prop="depotId" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.depotId"
                         placeholder="请选择"
                         filterable
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
            <el-form-item label="订单编号：" prop="code" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="status" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.status"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getSelectList('order_statusList')">
                <el-option
                  v-for="item in selectOpt.order_statusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="订单来源：" prop="orderSource" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.orderSource"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getSelectList('dataSourceList')">
                <el-option
                  v-for="item in selectOpt.dataSourceList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台订单号：" prop="exOrderId" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.exOrderId" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="店铺：" prop="shopCode" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.shopCode"
                         placeholder="请选择"
                         clearable
                         filterable>
                <el-option
                  v-for="item in shopInfoList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="查询范围：" prop="orderTimeRange" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.orderTimeRange"
                         placeholder="请选择"
                         clearable
                         filterable>
                <el-option
                  v-for="item in orderTimeRangeList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date1" label="交易时间：">
              <el-date-picker
                clearable
                v-model="date1"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date2" label="出库时间：">
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
        <el-button type="primary"
                   v-permission="'order_exportOrder'"
                   @click="exportList">导出</el-button>
        <el-button type="primary"
                   v-permission="'order_import'"
                   @click="importFile">导入</el-button>
        <el-button type="primary"
                   v-permission="'order_checkConditionsOrder'"
                   @click="changeState('1')">审核</el-button>
        <el-button type="primary"
                   v-permission="'order_delOrder'"
                   @click="changeState('2')">删除</el-button>
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
                       min-width="120"
                       label="订单号"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          订单编号: {{row.code}}<br />
          外部订单编号: {{row.externalCode}}
        </template>
      </el-table-column>
      <el-table-column prop="storePlatformNameLabel"
                       align="center"
                       min-width="100"
                       label="平台名称"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          {{row.storePlatformNameLabel}}<br />
          {{row.shopTypeCodeLabel}}
        </template>
      </el-table-column>
      <el-table-column prop="shopName"
                       align="center"
                       min-width="120"
                       label="店铺名称"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="payment"
                       align="center"
                       width="80"
                       label="实付金额"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="tradingDate"
                       align="center"
                       width="150"
                       label="订单时间"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="depotName"
                       align="center"
                       min-width="120"
                       label="发货仓"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          {{row.depotName}}<br />
          单据状态: {{row.statusLabel}}
        </template>
      </el-table-column>
      <el-table-column prop="deliverDate"
                       align="center"
                       width="150"
                       label="发货时间"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="left"
                       width="100"
                       label="操作"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="text"
                     v-permission="'order_detail'"
                     @click="linkTo(`/sales/ecommerceorderdetail?id=${row.id}`)">详情</el-button>
          <el-button type="text"
                     @click="handleExpand(row)">
            {{ row.show ? '收起' : '展开' }}
            <i :class="row.show ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
          </el-button>
        </template>
      </el-table-column>
      <el-table-column type="expand"
                       width="1">
        <template slot-scope="{row}">
          <div class="inner-container">
            <el-table :data="row.children"
                      :border="false"
                      :header-cell-style="{ background: '#e4e8ed' }"
                      stripe
                      class="inner-table"
                      ref="subTable"
                      v-loading="row.loading">
              <el-table-column prop="goodsNo"
                              align="center"
                              min-width="120"
                              label="商品货号"
                              show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="goodsName"
                              align="center"
                              min-width="120"
                              label="商品名称"
                              show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="num"
                              align="center"
                              min-width="80"
                              label="销售数量"
                              show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="originalPrice"
                              align="center"
                              min-width="80"
                              label="销售单价"
                              show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="originalDecTotal"
                              align="center"
                              min-width="100"
                              label="销售总金额"
                              show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="goodsDiscount"
                              align="center"
                              min-width="100"
                              label="商品优惠金额"
                              show-overflow-tooltip
              ></el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end -->
  </div>
</template>

<script>
import { getAvailableNum } from '@a/base'
import {
  getDeliveryOrderManageList,
  getlistItemDetailsById,
  getDeliveryOrderManageCount,
  exportDeliveryOrderManageUrl,
  getShopInfoList,
  importDeliveryOrderManageUrl,
  examineDeliveryOrderManage,
  delDeliveryOrderManage,
  ordercheckConditions
} from '@a/salesManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 交易时间
      date1: [],
      // 出库时间
      date2: [],
      // 查询数据
      searchProps: {
        externalCode: '',
        storePlatformName: '',
        depotId: '',
        code: '',
        status: '',
        orderSource: '',
        exOrderId: '',
        shopCode: '',
        orderTimeRange: ''
      },
      // 查询范围下拉列表
      orderTimeRangeList: [
        { key: '1', value: '近12个月数据' },
        { key: '2', value: '12个月以前数据' }
      ],
      // 店铺信息列表
      shopInfoList: []
    }
  },
  activated() {
    this.getList()
    this.getShopInfoList()
  },
  mounted() {
    this.getList()
    this.getShopInfoList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      // 交易时间
      this.searchProps.tradingStartDate = this.date1 && this.date1.length ? this.date1[0] : ''
      this.searchProps.tradingEndDate = this.date1 && this.date1.length ? this.date1[1] : ''
      // 出库时间
      this.searchProps.deliverStartDate = this.date2 && this.date2.length ? this.date2[0] : ''
      this.searchProps.deliverEndDate = this.date2 && this.date2.length ? this.date2[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await getDeliveryOrderManageList({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
        // 增加children loading属性用来展示嵌套表格
        this.tableData.list = this.tableData.list.map(item => ({ ...item, loading: false, children: [] }))
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.tableData.loading = false
      }
    },
    // 删除、审核
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
              const flag = await this.checkCondition(ids)
              if (!flag) return false
              await examineDeliveryOrderManage({ ids })
              break
            // 删除
            case '2':
              await delDeliveryOrderManage({ ids })
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
          const { data } = await getlistItemDetailsById({ id: row.id })
          row.children = data.itemList
          row.children.push({
            num: `运费:${data.wayFrtFee || 0}`,
            originalPrice: `税费:${data.taxes || 0}`,
            originalDecTotal: `优惠金额:${data.discount || 0}`,
            goodsDiscount: `实付金额:${data.payment || 0}`
          })
        } finally {
          row.loading = false
        }
      }
    },
    // 获取店铺列表
    async getShopInfoList() {
      try {
        const { data = [] } = await getShopInfoList()
        const list = data.map(item => ({ key: item.shopCode, value: item.shopName }))
        await this.$nextTick()
        this.shopInfoList = list
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 校验返回商品如果是美赞臣商品转成原货号
    async checkCondition(ids) {
      let flag = true
      const { data } = await ordercheckConditions({ ids }) // 检查手工导入订单是否满足条件
      if (data && data.length) {
        for (let i = 0; i < data.length; i++) {
          const item = data[i]
          const info = item.code.split('-')
          const goodsId = info[0] // 商品id
          const depotId = info[1] // 仓库id
          const depotCode = info[2] // 仓库编码
          const goodsNo = info[3] // 商品货号
          const num = item.num // 商品数量
          const res = await getAvailableNum({ goodsId, depotId, depotCode }) // 查询库存可用量
          const availableNum = res.data || -1
          if (availableNum === -1) {
            flag = false
            this.$errorMsg(`商品货号：${goodsNo},未查到库存可用量`)
            break
          } else if (num > availableNum) {
            flag = false
            this.$errorMsg(`库存不足，商品货号：${goodsNo},可用量：${availableNum}`)
            break
          }
        }
      }
      return flag
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
            this.$exportFile(exportDeliveryOrderManageUrl, { ids })
          })
        } else {
          const { data } = await getDeliveryOrderManageCount({ ...this.searchProps })
          if (data > 150000) {
            return this.$errorMsg('数据超过15W行，请缩小导出时间范围')
          }
          this.$exportFile(exportDeliveryOrderManageUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 125 + '&url=' + importDeliveryOrderManageUrl)
    },
    rootRowStyle({ row }) {
      if (row.show) {
        return { background: '#f0f7ff' }
      }
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
