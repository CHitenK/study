<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'80vw'"
      :title="'选择商品'"
      :btnAlign="'center'"
      top="6vh"
    >
      <JFX-search-panel @reset="reset" @search="getList(1)" :showOpenBtn="false">
        <el-form :model="ruleForm" ref="ruleForm">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
              <el-form-item  label="标准条形："  prop="commbarcode" class="search-panel-item fs-14 clr-II" >
                <el-input v-model="ruleForm.commbarcode" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
              <el-form-item label="标准品牌：" prop="commBrandParentId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.commBrandParentId" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectList('adjustmentType_sourceList')" >
                  <el-option v-for="item in selectOpt.adjustmentType_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </JFX-search-panel>
      <el-row class="company-page">
        <el-col :span="24"  class="mr-t-20">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            @selection-change="selectionChange"
            @change="getList"
            :tableHeight="'480px'"
          >
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="commBrandParentName" label="标准品牌" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="commbarcode" label="标准条码" align="center" width="200"></el-table-column>
            <el-table-column prop="commGoodsName" label="标准品名" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="commTypeName" label="二级分类" align="center" width="200"></el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import { getList } from '@v/dome/api/index'
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
      ruleForm: {
        name: ''
      }
    }
  },
  mounted() {
    // 设置table 高度
    // this.getList()
  },
  methods: {
    comfirm() {
     this.$emit('comfirm')
    },
    async getList(pageNum) {
      try {
				this.tableData.loading = true
				// 同步方法
				const res = await getList({ begin: (this.tableData.pageNum - 1) * this.tableData.pageSize, pageSize: this.tableData.pageSize || 10, ...this.filterData })
				this.tableData = {
					list: res.data.list,
					loading: false,
					pageNum: pageNum || res.data.pageNo,
					total: res.data.total,
					pageSize: res.data.pageSize
				}
			} catch (err) {
        this.tableData.loading = false
			}
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
