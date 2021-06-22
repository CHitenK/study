<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      @comfirm="visible.show=false"
      :showConfirmBtn="false"
      :width="'1200px'"
      :title="'赊销收款详情'"
      :btnAlign="'center'"
      top="6vh"
      >
      <el-row class="company-page">
        <el-col :span="24"  class="mr-t-20">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            :showPagination="false"
            :tableHeight="'460px'"
          >
            <el-table-column prop="operateDate" label="商品货号" align="center" width="120"></el-table-column>
            <el-table-column prop="operateDate" label="商品名称" align="center" min-width="120"></el-table-column>
            <el-table-column prop="operateDate" label="赎回数量" align="center" width="120"></el-table-column>
            <el-table-column prop="operateDate" label="分摊保证金" align="center" width="120"></el-table-column>
            <el-table-column prop="operateDate" label="分摊本金" align="center" width="120"></el-table-column>
            <el-table-column prop="operater" label="资金占用费" align="center" width="120"></el-table-column>
            <el-table-column prop="operater" label="代理费" align="center" width="120"></el-table-column>
            <el-table-column prop="operater" label="滞纳金" align="center" width="120"></el-table-column>
            <el-table-column prop="operater" label="应收金额" align="center" width="120"></el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import {
  getOperateLogList,
  getOperateLogSysList
} from '@a/base/index'
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
    },
    // 展示对应模块的日志
    type: {
      type: String,
      default: 'order'
    }
  },
  data() {
    return {
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
				this.tableData.loading = true
        let res = {}
        switch (this.type) {
          case 'order':
            res = await getOperateLogList(this.filterData)
            break
          case 'system':
            res = await getOperateLogSysList(this.filterData)
            break
        }
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
  width: 100%;
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
