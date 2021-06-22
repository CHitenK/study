<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      :showCloseBtn="false"
      confirmBtnText="关闭"
      @comfirm="comfirm"
      :width="'700px'"
      :title="'额度分配详情'"
      :btnAlign="'center'"
      top="6vh"
    >
      <el-row class="company-page">
        <el-col :span="24"  class="mr-t-10">
          <div class="mr-b-15 fs-14 clr-II">部门名称：{{targetData.departmentName}}</div>
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            :tableHeight="'420px'"
            :showPagination="false"
          >
            <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
            <el-table-column prop="superiorParentBrand" label="母品牌" align="center" width="200"></el-table-column>
            <el-table-column prop="quato" label="已分配额度" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.quato">{{targetData.currency}} {{numberFormat(scope.row.quato)}}</span>
                <span v-else>0</span>
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
import commomMix from '@m/index'
import { getItemList } from '@a/limitPositionManage/index'
import { numberFormat } from '@u/tool'
export default {
  mixins: [commomMix],
  props: {
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    targetData: {
      type: Object,
      default: function() {
        return {}
      }
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
    numberFormat,
    async getList() {
      const res = await getItemList({ departmentQuatoId: this.targetData.id })
      this.tableData.list = res.data || []
    },
    comfirm() {
      this.visible.show = false
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
