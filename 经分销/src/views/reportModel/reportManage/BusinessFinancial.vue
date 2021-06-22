<template>
  <!-- 事业部财务进销存页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="年月：" prop="reportMonth" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.reportMonth"
                type="month"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="仓库：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.depotId"
                placeholder="请选择"
                clearable
                :data-list="getSelectList('financeInventorySummary_statusList')"
              >
                <el-option
                  v-for="item in selectOpt.financeInventorySummary_statusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.depotId"
                placeholder="请选择"
                clearable
                :data-list="getSelectList('financeInventorySummary_statusList')"
              >
                <el-option
                  v-for="item in selectOpt.financeInventorySummary_statusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="二级分类：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.depotId"
                placeholder="请选择"
                clearable
                :data-list="getSelectList('financeInventorySummary_statusList')"
              >
                <el-option
                  v-for="item in selectOpt.financeInventorySummary_statusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="条码：" prop="goodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.goodsNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="标准品牌：" prop="depreciationReserveProportion" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.depreciationReserveProportion"
                placeholder="请选择"
                clearable
                :data-list="getSelectList('financeInventorySummary_statusList')"
              >
                <el-option
                  v-for="item in selectOpt.financeInventorySummary_statusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="successMsg('success')">生成excel</el-button>
        <el-button type="primary" @click="successMsg('success')">SD进销存导出</el-button>
        <el-button type="primary" @click="successMsg('success')">总账导出</el-button>
        <el-button type="primary" @click="successMsg('success')">暂存PDF导出</el-button>
        <el-button type="primary" @click="successMsg('success')">刷新报表</el-button>
        <el-checkbox v-model="isSynchronization">同步数据</el-checkbox>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="index" align="center" width="55" />
      <el-table-column prop="buName" align="center" min-width="120" label="事业部" />
      <el-table-column prop="brandName" align="center" min-width="80" label="标准品牌" />
      <el-table-column prop="typeName" align="center" min-width="120" label="二级分类" />
      <el-table-column prop="goodsNo" align="center" min-width="120" label="货号" />
      <el-table-column prop="commbarcode" align="center" min-width="120" label="标准条码" />
      <el-table-column prop="barcode" align="center" min-width="120" label="条形码" />
      <el-table-column prop="goodsName" align="center" min-width="150" label="商品名称" show-overflow-tooltip />
      <el-table-column prop="initNum" align="center" min-width="80" label="期初数量" />
      <el-table-column prop="initAmount" align="center" min-width="80" label="期初金额" />
      <el-table-column prop="price" align="center" min-width="80" label="期初单价" />
      <el-table-column prop="warehouseNum" align="center" min-width="120" label="本期采购入库数量" />
      <el-table-column prop="inDamagedNum" align="center" min-width="120" label="来货残损数量" />
      <el-table-column prop="moveInNum" align="center" min-width="120" label="本期移库入" />
      <el-table-column prop="purchaseEndNum" align="center" min-width="120" label="本期采购结转数量" />
      <el-table-column prop="purchaseEndAmount" align="center" min-width="120" label="本期采购结转金额" />
      <el-table-column prop="tzPrice" align="center" min-width="80" label="本期单价" />
      <el-table-column prop="saleShelfNum" align="center" min-width="130" label="本期销售已上架数量" />
      <el-table-column prop="outDamagedNum" align="center" min-width="120" label="出库残损数量" />
      <el-table-column prop="moveOutNum" align="center" min-width="120" label="本期移库出" />
      <el-table-column prop="saleEndNum" align="center" min-width="120" label="本期销售结转数量" />
      <el-table-column prop="saleEndAmount" align="center" min-width="120" label="本期销售结转金额" />
      <el-table-column prop="destroyNum" align="center" min-width="120" label="本月销毁数量" />
      <el-table-column prop="profitNum" align="center" min-width="80" label="盘盈数量" />
      <el-table-column prop="lossNum" align="center" min-width="80" label="盘亏数量" />
      <el-table-column prop="lossOverflowNum" align="center" min-width="120" label="本期损益结转数量" />
      <el-table-column prop="lossOverflowAmount" align="center" min-width="120" label="本期损益结转金额" />
      <el-table-column prop="endNum" align="center" min-width="120" label="期末结存数量" />
      <el-table-column prop="endAmount" align="center" min-width="120" label="期末结存金额" />
      <el-table-column prop="addPurchaseNotshelfNum" align="center" min-width="120" label="累计采购在途数量" />
      <el-table-column prop="addSaleNoshelfNum" align="center" min-width="120" label="累计销售在途数量" />
      <el-table-column prop="addTransferNoshelfNum" align="center" min-width="120" label="累计调拨在途数量" />
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 是否同步数据
      isSynchronization: false,
      // 查询数据
      searchProps: {
        reportMonth: '',
        depotId: '',
        goodsNo: '',
        depreciationReserveProportion: '',
        effectiveInterval: ''
      },
      // 表格数据
      tableData: {
        list: [
          {
            addPurchaseNotshelfAmount: 0,
            addPurchaseNotshelfNum: 0,
            addSaleNoshelfNum: 0,
            addTransferNoshelfNum: 0,
            barcode: '4062300355507',
            begin: 0,
            buId: 11,
            buName: '快消品事业部E',
            commbarcode: '04062300355507',
            createDate: '2021-02-02 10:38:14',
            decreasePurchaseNotshelfNum: 0,
            destroyNum: 0,
            end: 10,
            endAmount: 86.87,
            endNum: 1,
            goodsName: 'HiPP喜宝益生菌婴幼儿奶粉3段（10-12个月宝宝）600g',
            goodsNo: 'QTOPHP011',
            inDamagedNum: 0,
            initAmount: 86.87,
            initNum: 1,
            lossNum: 0,
            lossOverflowAmount: 0,
            lossOverflowNum: 0,
            moveInNum: 0,
            moveOutNum: 0,
            outDamagedNum: 0,
            pageNo: 1,
            pageSize: 10,
            price: 86.87,
            profitNum: 0,
            purchaseEndAmount: 0,
            purchaseEndNum: 0,
            purchaseNotshelfNum: 0,
            saleEndAmount: 0,
            saleEndNum: 0,
            saleShelfNum: 0,
            total: 0,
            typeName: '婴幼儿奶粉',
            tzPrice: 86.87,
            warehouseNum: 0
          }
        ],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 11
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 拉取表格数据
		getList(pageNum) {
      const params = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.searchProps
      }
      console.log(params)
    },
    /**
     * 根据年月获取当前月的第一天和最后一天
     * @param timeStr 传入的时间 yyyy-MM 格式
     */
    getMonthFirstLastDay(timeStr) {
      let year = timeStr.split('-')[0]
      let month = timeStr.split('-')[1]
      let firstDay = new Date(year, month - 1, 1)
      let lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)
      return [
        this.$formatDate(firstDay, 'yyyy-MM-dd'),
        this.$formatDate(lastDay, 'yyyy-MM-dd')
      ]
    }
  }
}
</script>
