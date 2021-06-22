<template>
  <div>
    <JFX-Dialog
      :visible.sync="isVisible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'80vw'"
      :title="'选择商品'"
      :btnAlign="'center'"
      top="6vh"
    >
      <JFX-search-panel @reset="resetForm" @search="getList(1)">
        <el-form :model="ruleForm" ref="ruleForm">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
              <el-form-item  label="商品货号："  prop="goodsNo" class="search-panel-item fs-14 clr-II" >
                <el-input v-model.trim="ruleForm.goodsNo" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
              <el-form-item  label="条形码：" prop="barcode" class="search-panel-item fs-14 clr-II" >
                <el-input v-model.trim="ruleForm.barcode" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
              <el-form-item  label="销售订单号：" prop="orderCode" class="search-panel-item fs-14 clr-II" >
                <el-input v-model.trim="ruleForm.orderCode" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
              <el-form-item  label="商品名称：" prop="goodsName" class="search-panel-item fs-14 clr-II" >
                <el-input v-model.trim="ruleForm.goodsName" clearable></el-input>
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
            <el-table-column
              type="selection"
              align="center"
              width="55">
            </el-table-column>
            <el-table-column
              prop="merchantName"
              label="公司"
              align="center"
              width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="saleOrderCode"
              label="销售订单号"
              align="center"
              width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="商品名称"
              align="center"
              min-width="120"
              show-overflow-tooltip
            >
            </el-table-column>
              <el-table-column
              prop="goodsNo"
              label="商品货号"
              align="center"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="brandName"
              label="品牌名称"
              align="center"
              width="220"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="barcode"
              label="商品条形码"
              align="center"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="factoryNo"
              label="工厂编码"
              align="center"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="unitName"
              label="计量单位"
              align="center"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="customsAreaNames"
              label="平台备案关区"
              align="center"
              width="140"
            >
            </el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import { getSalePopupList } from '@a/salesManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    isVisible: {
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
    customComfirm: null
  },
  data() {
    return {
      ruleForm: {
        goodsNo: '',
        barcode: '',
        orderCode: '',
        goodsName: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async comfirm() {
      this.$emit('comfirm', this.tableChoseList)
    },
    async getList(pageNum) {
      try {
				this.tableData.loading = true
				const { data } = await getSalePopupList({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm,
          ...this.filterData
        })
				this.tableData = {
					list: data.list,
					loading: false,
					pageNum: pageNum || data.pageNo,
					total: data.total,
					pageSize: data.pageSize
				}
			} catch (err) {
        this.tableData.loading = false
			}
    },
    // 重置搜索栏
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
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
