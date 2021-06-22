<template>
  <!-- PO商品核销表组件 -->
  <div class="page-bx bgc-w" style="padding-top: 0;">
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)" :showOpenBtn="false" style="margin-top: 0;">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="PO号：" prop="poTemp" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.poTemp" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="标准条码：" prop="commbarcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.commbarcode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="天数：" prop="days" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.days"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in daySelectList"
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
        <el-button type="primary" @click="$successMsg('success')">汇总表导出</el-button>
        <el-button type="primary" @click="$successMsg('success')">明细表导出</el-button>
        <el-button type="primary" @click="$successMsg('success')">刷新列表</el-button>
        <el-checkbox v-model="isSynchronization">同步数据</el-checkbox>
        <span class="tips">数据统计截止时间：2020-12-07</span>
        <span class="tips">生成时间：2021-02-03 13:39:11</span>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="merchantName" align="center" min-width="100" label="公司" />
      <el-table-column prop="depotName" align="center" min-width="120" label="仓库" />
      <el-table-column prop="buName" align="center" min-width="120" label="事业部" />
      <el-table-column prop="po" align="center" min-width="120" label="PO号" />
      <el-table-column prop="poDate" align="center" min-width="80" label="po时间" />
      <el-table-column prop="commbarcode" align="center" min-width="120" label="标准条码" />
      <el-table-column prop="superiorParentBrand" align="center" min-width="80" label="母品牌" />
      <el-table-column align="center" min-width="80" label="销售单价">
        <template slot-scope="{row}">
          {{`${row.currency}  ${row.salePrice}`}}
        </template>
      </el-table-column>
      <el-table-column prop="shelfTotalAccount" align="center" min-width="80" label="库存量" />
      <el-table-column align="center" min-width="80" label="库存金额">
        <template slot-scope="{row}">
          {{`${row.currency}  ${row.inventoryAmount}`}}
        </template>
      </el-table-column>
      <el-table-column prop="shelfTotalAccount" align="center" min-width="80" label="上架总量" />
      <el-table-column prop="shelfDamagedAccount" align="center" min-width="100" label="上架残损量" />
      <el-table-column prop="firstShelfDate" align="center" min-width="150" label="首次上架时间" />
      <el-table-column prop="billTotalAccount" align="center" min-width="80" label="账单总量" />
      <el-table-column prop="billRecentDate" align="center" min-width="150" label="最近账单时间" />
      <el-table-column prop="outDepotTotalAccont" align="center" min-width="100" label="销售出库总量" />
      <el-table-column prop="nationalInspectionSampleAccount" align="center" min-width="80" label="国检抽样" />
      <el-table-column prop="saleReturnAccount" align="center" min-width="100" label="销售退数量" />
      <el-table-column prop="transferInAccount" align="center" min-width="80" label="调拨入库" />
      <el-table-column prop="transferOutAccount" align="center" min-width="80" label="调拨出库" />
      <el-table-column prop="vipHcAccount" align="center" min-width="80" label="唯品红冲" />
      <el-table-column prop="vipHcAccount" align="center" min-width="80" label="盘盈数量" />
      <el-table-column prop="inventorySurplusAccount" align="center" min-width="100" label="销售退数量" />
      <el-table-column prop="inventoryDeficientAccount" align="center" min-width="80" label="盘亏数量" />
      <el-table-column prop="scrapAccount" align="center" min-width="80" label="报废数量" />
      <el-table-column prop="days" align="center" min-width="80" label="天数" />
      <el-table-column align="center" width="100" label="操作" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text" @click="linkTo(`/report/poverifidetail/${row.id}`)">详情</el-button>
        </template>
      </el-table-column>
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
        poTemp: '',
        commbarcode: '',
        days: ''
      },
      daySelectList: [
        { key: '0', value: '30天以内' },
        { key: '30', value: '30~60天' },
        { key: '60', value: '60~90天' },
        { key: '90', value: '90天及以上' },
        { key: '120', value: '120天及以上' },
        { key: '180', value: '180天及以上' }
      ],
      // 表格数据
      tableData: {
        list: [
          {
            begin: 0,
            billTotalAccount: 0,
            brandParent: '亿滋',
            buId: 10,
            buName: '元森泰事业部E',
            commbarcode: '00648260456368',
            createDate: '2021-02-03 12:48:47',
            currency: 'CNY',
            depotId: 65,
            depotName: '融信备查库',
            end: 10,
            firstShelfDate: '2021-01-10 00:00:00',
            goodsName: 'Ameri-Vita亚美唯他柑橘果萃片',
            id: 110145,
            inventoryAmount: 3160,
            inventoryDeficientAccount: 0,
            inventorySurplusAccount: 0,
            merchantId: 1000031,
            merchantName: '健太',
            modifyDate: '2021-02-03 14:11:07',
            nationalInspectionSampleAccount: 0,
            outDepotTotalAccont: 0,
            pageNo: 1,
            pageSize: 10,
            po: '2102022039',
            salePrice: 158,
            saleReturnAccount: 0,
            scrapAccount: 0,
            shelfDamagedAccount: 0,
            shelfTotalAccount: 20,
            status: '0',
            superiorParentBrand: '亿滋',
            total: 0,
            transferInAccount: 0,
            transferOutAccount: 0,
            undepotAccount: 0,
            unsettledAccount: 20,
            unverificateAccount: 20,
            vipHcAccount: 0
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
    }
  }
}
</script>

<style lang="scss" scoped>
.tips {
  color: red;
  padding-left: 10px;
}
</style>
