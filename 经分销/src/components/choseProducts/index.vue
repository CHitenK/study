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
      <JFX-search-panel @reset="resetForm" @search="getList(1)">
        <el-form :model="ruleForm" ref="ruleForm">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
              <el-form-item  label="条形码：" prop="barcode" class="search-panel-item fs-14 clr-II" >
                <el-input v-model.trim="ruleForm.barcode" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
              <el-form-item  label="商品货号："  prop="goodsNo" class="search-panel-item fs-14 clr-II" >
                <el-input v-model.trim="ruleForm.goodsNo" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
              <el-form-item label="商品品牌：" prop="brandId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model.trim="ruleForm.brandId" placeholder="请选择" filterable clearable :data-list="getBrandSelectBean('brandSelectList')" >
                  <el-option v-for="item in selectOpt.brandSelectList" :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
              <el-form-item  label="商品名称：" prop="merchantName" class="search-panel-item fs-14 clr-II" >
                <el-input v-model.trim="ruleForm.merchantName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
              <el-form-item  label="工厂编码："  prop="factoryNo" class="search-panel-item fs-14 clr-II" >
                <el-input v-model.trim="ruleForm.factoryNo" clearable></el-input>
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
              prop="name"
              label="商品名称"
              align="center"
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
              width="110"
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
/**
 * @description 选择商品 常用组件
 * 使用示例
 * <chose-products :visible.sync="visible" v-if="visible.show" @comfirm="visible.show=false"></chose-products>
 * 参数说明
 * visible
 *  -- show 是否显示
 * filterData 接口Api请求参数
 * confirm 函数 点击确定执行 返回选中列表数据
 * close 函数 点击取消执行
 */
import { getListByIds, getOrderPopupList } from '@a/base/index'
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
    customComfirm: null
  },
  data() {
    return {
      ruleForm: {
        name: '',
        barcode: '',
        brandId: '',
        goodsNo: '',
        factoryNo: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async comfirm() {
      // 执行确认后自定义的确认函数
      if (this.customComfirm) {
        this.customComfirm(this.tableChoseList)
        return false
      }
      if (!this.tableChoseList.length) {
        return this.$emit('comfirm')
      }
      try {
        const ids = this.tableChoseList.map(item => item.id).toString()
        const { data } = await getListByIds({ ids })
        this.$emit('comfirm', data)
      } catch (error) {
        this.$errorMsg(error)
      }
    },
    async getList(pageNum) {
      try {
				this.tableData.loading = true
				const { data } = await getOrderPopupList({
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
