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
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.buId"
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
            <el-form-item label="年月：" prop="ownMonth" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.ownMonth"
                type="month"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品名称：" prop="productName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.productName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="条码：" prop="barcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.barcode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="标准品牌：" prop="brandId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.brandId"
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
            <el-form-item label="货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.goodsNo" placeholder="请输入" clearable />
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
        <el-button type="primary" @click="successMsg('success')">刷新报表</el-button>
        <el-checkbox v-model="isSynchronization">同步数据</el-checkbox>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="index" align="center" width="55" label="序号" />
      <el-table-column prop="depotName" align="center" min-width="120" label="仓库" />
      <el-table-column prop="buName" align="center" min-width="120" label="事业部" />
      <el-table-column prop="goodsNo" align="center" min-width="120" label="货号" />
      <el-table-column prop="goodsName" align="center" min-width="200" label="商品名称" show-overflow-tooltip />
      <el-table-column prop="brandName" align="center" min-width="120" label="品牌" />
      <el-table-column prop="barcode" align="center" min-width="120" label="条码" />
      <el-table-column prop="factoryNo" align="center" min-width="80" label="8位码" />
      <el-table-column prop="unitLabel" align="center" min-width="80" label="理货单位" />
      <el-table-column prop="supplyMinPrice" align="center" min-width="80" label="单价HKD" />
      <el-table-column prop="monthBeginNum" align="center" min-width="100" label="本月期初库存" />
      <el-table-column prop="monthBeginNormalNum" align="center" min-width="130" label="本月正常品期初库存" />
      <el-table-column prop="monthBeginDamagedNum" align="center" min-width="130" label="本月残次品期初库存" />
      <el-table-column prop="monthInstorageNum" align="center" min-width="80" label="本月入库" />
      <el-table-column prop="monthOutstorageNum" align="center" min-width="80" label="本月出库" />
      <el-table-column prop="monthInBadNum" align="center" min-width="80" label="来货残次" />
      <el-table-column prop="monthOutBadNum" align="center" min-width="130" label="出库残次" />
      <el-table-column prop="profitlossGoodNum" align="center" min-width="80" label="好品损益" />
      <el-table-column prop="profitlossDamagedNum" align="center" min-width="80" label="坏品损益" />
      <el-table-column prop="monthProfitlossNum" align="center" min-width="80" label="损益" />
      <el-table-column prop="monthEndNum" align="center" min-width="100" label="本月期末库存" />
      <el-table-column prop="monthEndNormalNum" align="center" min-width="150" label="本月正常品期末库存" />
      <el-table-column prop="monthEndDamagedNum" align="center" min-width="150" label="本月残次品期末库存" />
      <el-table-column prop="monthSaleUnconfirmedNum" align="center" min-width="100" label="销售未确认" />
      <el-table-column prop="monthPurchaseNotshelfNum" align="center" min-width="100" label="采购未上架" />
      <el-table-column prop="monthTransferNotshelfNum" align="center" min-width="100" label="本期调拨在途" />
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
        buId: '',
        ownMonth: '',
        productName: '',
        barcode: '',
        brandId: '',
        depotId: '',
        goodsNo: ''
      },
      // 表格数据
      tableData: {
        list: [
          {
            availableNum: 0,
            barcode: '4057599002268',
            begin: 0,
            brandId: 297,
            brandName: 'Bayer/拜耳',
            buCode: 'E060000',
            buId: 10,
            buName: '元森泰事业部E',
            commbarcode: '04057599002268',
            createDate: '2021-02-02 10:37:51',
            depotCode: 'WMS_360_04',
            depotId: 11,
            depotName: '卓志南沙保税仓',
            end: 10,
            factoryNo: '',
            goodsId: 1018996,
            goodsName: '澳洲Elevit爱乐维男女备孕礼盒女士复合维生,素100粒+男士复合维生素90粒',
            goodsNo: 'JTALW019',
            id: 505424,
            inDamagedNum: 0,
            merchantId: 1000031,
            merchantName: '健太',
            modifyDate: '2021-02-02 10:37:51',
            monthBeginDamagedNum: 0,
            monthBeginNormalNum: 0,
            monthBeginNum: 0,
            monthEndAmount: 0,
            monthEndDamagedNum: 0,
            monthEndNormalNum: 90,
            monthEndNum: 90,
            monthInBadNum: 0,
            monthInstorageNum: 90,
            monthNormalExpireNum: 0,
            monthOutBadNum: 0,
            monthOutstorageNum: 0,
            monthProfitlossNum: 0,
            monthPurchaseNotshelfNum: 0,
            monthSaleUnconfirmedNum: 0,
            monthTransferNotshelfNum: 0,
            outDamagedNum: 0,
            ownMonth: '2021-01',
            pageNo: 1,
            pageSize: 10,
            productName: '澳洲Elevit爱乐维男女备孕礼盒女士复合维,生素100粒+男士复合维生素90粒',
            profitlossDamagedNum: 0,
            profitlossGoodNum: 0,
            superiorParentBrand: '拜耳',
            supplyMinPrice: 0,
            topidealCode: '1000000204',
            total: 0,
            unitLabel: ''
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
