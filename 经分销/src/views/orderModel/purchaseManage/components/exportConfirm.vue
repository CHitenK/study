<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'460'"
      :title="'清关资料导出确认'"
      :btnAlign="'center'"
      top="8vh"
      >
      <el-row>
        <el-col :span="24"  class=" fs-14 clr-II">
          查询该入库仓库关联采购清关单证模板有多个，请选择导出模板：
        </el-col>
        <el-col :span="24"  class="mr-t-10">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            :tableHeight="'420px'"
            :showPagination="false"
          >
            <el-table-column label="选择" align="center" width="80">
              <template slot-scope="scope">
                <el-radio v-model="choseId" :label="scope.row.fileTempId">{{scope.row.kk || ''}}</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="fileTempName" label="清关模板名称" align="center" show-overflow-tooltip></el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
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
    list: []
  },
  data() {
    return {
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      choseId: ''
    }
  },
  mounted() {
    this.tableData.list = this.list
  },
  methods: {
    comfirm() {
      if (!this.choseId) {
        this.$errorMsg('请选择导出模板')
        return false
      }
      this.$emit('comfirm', this.choseId)
    }
  }
}
</script>
