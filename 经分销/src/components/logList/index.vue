<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      @comfirm="visible.show=false"
      :showConfirmBtn="false"
      :width="'800px'"
      :title="'操作日志'"
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
            <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
            <el-table-column prop="operateDate" label="操作时间" align="center" width="140"></el-table-column>
            <el-table-column prop="operater" label="操作人" align="center" width="120"></el-table-column>
            <el-table-column prop="operateResult" label="操作项" align="center" width="140">
              <template slot-scope="scope">
                {{scope.row.operateAction || scope.row.operateResult || scope.row.operateRemark }}
              </template>
            </el-table-column>
            <el-table-column prop="operateRemark" label="备注" align="center" show-overflow-tooltip></el-table-column>
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
            // 模块 1-采购 2-预付 3-应付 4-采购预申报 5-销售 6-销售预申报 7-部门额度配置 8-客户额度 9-项目额度
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
