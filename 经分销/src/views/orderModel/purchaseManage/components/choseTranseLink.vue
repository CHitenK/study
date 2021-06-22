<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'66vw'"
      :title="'选择交易链路'"
      :btnAlign="'center'"
      top="6vh"
      >
      <el-row class="company-page">
        <el-col :span="24"  class="mr-t-20">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            :showPagination="false"
            @selection-change="selectionChange"
            :tableHeight="'420px'"
          >
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="linkName" label="链路名称" align="center" min-width="120" show-overflow-tooltip></el-table-column>
            <el-table-column label="起点公司" align="center" min-width="120">
              <template slot-scope="scope">
                <div>
                  <div>{{scope.row.startPointMerchantName}}</div>
                  <div>{{scope.row.startPointBuName}}</div>
                  <div>{{scope.row.startPointPremiumRate ? scope.row.startPointPremiumRate + '%' : '0'}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="客户1" align="center"  min-width="120">
              <template slot-scope="scope">
                <div>
                  <div>{{scope.row.oneCustomerName}}</div>
                  <div>{{scope.row.oneBuName}}</div>
                  <div>{{scope.row.onePremiumRate ? scope.row.onePremiumRate + '%' : ''}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="客户2" align="center"  min-width="120">
              <template slot-scope="scope">
                <div>
                  <div>{{scope.row.twoCustomerName}}</div>
                  <div>{{scope.row.twoBuName}}</div>
                  <div>{{scope.row.twoPremiumRate ? scope.row.twoPremiumRate + '%' : ''}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="客户3" align="center"  min-width="120">
              <template slot-scope="scope">
                <div>
                  <div>{{scope.row.threeCustomerName}}</div>
                  <div>{{scope.row.threeBuName}}</div>
                  <div>{{scope.row.threePremiumRate ? scope.row.threePremiumRate + '%' : ''}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="客户4" align="center"  min-width="120">
              <template slot-scope="scope">
                <div>
                  <div>{{scope.row.fourCustomerName}}</div>
                  <div>{{scope.row.fourBuName}}</div>
                  <div>{{scope.row.fourPremiumRate ? scope.row.fourPremiumRate + '%' : ''}}</div>
                </div>
              </template>
            </el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import { getTradeLinkList } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    filterData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      compayId: '',
      companylist: [],
      innerVisible: false,
      parment: '',
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10001,
        total: 10000
      }
    }
  },
  mounted() {
    // 设置table 高度
    this.getList()
  },
  methods: {
    comfirm() {
      if (this.tableChoseList.length !== 1) {
        this.$errorMsg('请选择一条记录！')
        return false
      }
      this.$emit('comfirm', this.tableChoseList[0])
      this.visible.show = false
    },
    async getList() {
      try {
				this.tableData.loading = true
				// 同步方法
				const res = await getTradeLinkList(this.filterData)
        this.tableData.list = res.data || []
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.company-page{
  width: 10  ;
  margin-bottom: 10px;
  min-height: 200px;
}
.fen-pei-bx{
  margin-top: -30px;
  border-top: solid 1px #eaeaea;
  border-bottom: solid 1px #eaeaea;
  height: 80px;
}
.dialog-footer{
  height: 30px;
  margin-top: -30px;
}
</style>
