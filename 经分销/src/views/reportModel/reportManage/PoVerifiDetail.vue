<template>
  <!-- 唯品PO账单核销报表详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 账单出库单详情 -->
    <JFX-title title="基本信息" />
    <el-row :gutter="10" class="fs-14 clr-II mr-b-20">
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        公司： 健太
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户：
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        PO单号： 4400245711
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        PO时间：
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        标准条码： 00648260456474
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        事业部： 万代事业部E
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        标准品牌： 德爱
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        母品牌： P&G
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        商品名称： Ameri-Vita亚美唯他柑橘果萃片
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        销售币种： USD
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 商品上架明细 -->
    <JFX-title title="商品上架明细" />
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column prop="barcode" align="center" label="商品货号" />
      <el-table-column prop="barcode" align="center" label="销售订单号" />
      <el-table-column prop="barcode" align="center" label="销售数量" />
      <el-table-column prop="barcode" align="center" label="销售单价" />
      <el-table-column prop="barcode" align="center" label="上架数量" />
      <el-table-column prop="barcode" align="center" label="残损数量" />
      <el-table-column prop="barcode" align="center" label="少货数量" />
      <el-table-column prop="barcode" align="center" label="上架时间" />
    </JFX-table>
    <!-- 商品上架明细 end -->
    <!-- 销售出库明细 -->
    <JFX-title title="销售出库明细" />
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column prop="barcode" align="center" label="销售出库单号" />
      <el-table-column prop="barcode" align="center" label="唯品账单号" />
      <el-table-column prop="barcode" align="center" label="账单类型" />
      <el-table-column prop="barcode" align="center" label="销售订单号" />
      <el-table-column prop="barcode" align="center" label="商品货号" />
      <el-table-column prop="barcode" align="center" label="出库数量" />
      <el-table-column prop="barcode" align="center" label="出库时间" />
    </JFX-table>
    <!-- 销售出库明细 end -->
    <!-- 销售退明细 -->
    <JFX-title title="销售退明细" />
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column prop="barcode" align="center" label="销售退订单号" />
      <el-table-column prop="barcode" align="center" label="销售退出库单号" />
      <el-table-column prop="barcode" align="center" label="退货类型" />
      <el-table-column prop="barcode" align="center" label="商品货号" />
      <el-table-column prop="barcode" align="center" label="退货数量" />
      <el-table-column prop="barcode" align="center" label="退货时间" />
    </JFX-table>
    <!-- 销售退明细 end -->
    <!-- 国检抽样明细 -->
    <JFX-title title="国检抽样明细" />
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column prop="barcode" align="center" label="库存调整单号" />
      <el-table-column prop="barcode" align="center" label="商品货号" />
      <el-table-column prop="barcode" align="center" label="调整类型" />
      <el-table-column prop="barcode" align="center" label="调整数量" />
      <el-table-column prop="barcode" align="center" label="归属月份" />
      <el-table-column prop="barcode" align="center" label="调整时间" />
    </JFX-table>
    <!-- 国检抽样明细 end -->
    <!-- 唯品红冲明细 -->
    <JFX-title title="唯品红冲明细" />
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column prop="barcode" align="center" label="库存调整单号" />
      <el-table-column prop="barcode" align="center" label="唯品账单号" />
      <el-table-column prop="barcode" align="center" label="商品货号" />
      <el-table-column prop="barcode" align="center" label="调整类型" />
      <el-table-column prop="barcode" align="center" label="调整数量" />
      <el-table-column prop="barcode" align="center" label="归属月份" />
      <el-table-column prop="barcode" align="center" label="调整时间" />
    </JFX-table>
    <!-- 唯品红冲明细 end -->
    <!-- 唯品报废明细 -->
    <JFX-title title="唯品报废明细" />
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column prop="barcode" align="center" label="库存调整单号" />
      <el-table-column prop="barcode" align="center" label="唯品账单号" />
      <el-table-column prop="barcode" align="center" label="商品货号" />
      <el-table-column prop="barcode" align="center" label="调整类型" />
      <el-table-column prop="barcode" align="center" label="调整数量" />
      <el-table-column prop="barcode" align="center" label="归属月份" />
      <el-table-column prop="barcode" align="center" label="调整时间" />
    </JFX-table>
    <!-- 唯品报废明细 end -->
    <!-- 唯品盘点明细 -->
    <JFX-title title="唯品盘点明细" />
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column prop="barcode" align="center" label="盘点单号" />
      <el-table-column prop="barcode" align="center" label="唯品账单号" />
      <el-table-column prop="barcode" align="center" label="商品货号" />
      <el-table-column prop="barcode" align="center" label="调整类型" />
      <el-table-column prop="barcode" align="center" label="调整数量" />
      <el-table-column prop="barcode" align="center" label="接收时间" />
    </JFX-table>
    <!-- 唯品盘点明细 end -->
    <!-- 唯品调拨明细 -->
    <JFX-title title="唯品调拨明细" />
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column prop="barcode" align="center" label="调拨单据号" />
      <el-table-column prop="barcode" align="center" label="调拨出/入库单号" />
      <el-table-column prop="barcode" align="center" label="调拨类型" />
      <el-table-column prop="barcode" align="center" label="商品货号" />
      <el-table-column prop="barcode" align="center" label="调拨数量" />
      <el-table-column prop="barcode" align="center" label="调拨时间" />
    </JFX-table>
    <!-- 唯品调拨明细 end -->
    <!-- 账单明细 -->
    <JFX-title title="账单明细" />
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column prop="barcode" align="center" label="唯品账单号" />
      <el-table-column prop="barcode" align="center" label="账单类型" />
      <el-table-column prop="barcode" align="center" label="条形码" />
      <el-table-column prop="barcode" align="center" label="账单数量" />
      <el-table-column prop="barcode" align="center" label="销售价格" />
      <el-table-column prop="barcode" align="center" label="账单金额" />
      <el-table-column prop="barcode" align="center" label="账单时间" />
    </JFX-table>
    <!-- 账单明细 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
       breadcrumb: [{
        path: '', meta: { title: '报表管理' }
      },
      {
        path: '/report/pobillreport', meta: { title: '唯品PO账单核销报表' }
      },
      {
        path: `/report/poverifidetail/${this.$route.params.id}`, meta: { title: '唯品PO账单核销报表详情' }
      }],
      // 表格数据
      tableData: {
        list: [{}],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
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
