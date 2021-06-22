<template>
   <!-- 选择商品组件  -->
  <JFX-Dialog
    title="选择商品"
    closeBtnText="取 消"
    :width="'900px'"
    :top="'80px'"
    :showClose="true"
		:visible="chooseGoodsVisible"
    @comfirm="comfirm"
	>
    <el-form :model="searchProps" :rules="rules" ref="form" class="edit-bx">
      <el-row :gutter="10" class="page-view">
        <el-col :span="12">
          <el-form-item label="公司名称：" prop="merchantName">
            <el-input v-model="searchProps.merchantName" placeholder="请输入活动名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品名称：" prop="name">
            <el-input v-model="searchProps.name" placeholder="请输入活动名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品品牌：" prop="brandId">
            <el-select
                v-model="searchProps.brandId"
                placeholder="请选择"
                clearable
                :data-list="getSelectList('adjustmentType_sourceList')"
              >
                <el-option
                  v-for="item in selectOpt.adjustmentType_sourceList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品货号：" prop="goodsNo">
            <el-input v-model="searchProps.goodsNo" placeholder="请输入活动名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品条形码：" prop="barcode">
            <el-input v-model="searchProps.barcode" placeholder="请输入活动名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工厂源码：" prop="factoryNo">
            <el-input v-model="searchProps.factoryNo" placeholder="请输入活动名称" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="flex-c-c mr-b-20">
        <el-button @click="getList(1)" type="primary">查询</el-button>
        <el-button @click="reset('form')">重置</el-button>
      </div>
    </el-form>
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="name" align="center" label="公司名称" />
      <el-table-column prop="brandName" align="center" label="商品名称" />
      <el-table-column prop="barcode" align="center" label="商品货号" />
      <el-table-column prop="brandName" align="center" label="品牌名称" />
      <el-table-column prop="effectiveDate" align="center" label="商品条形码" />
      <el-table-column prop="effectiveDate" align="center" label="工厂编码" />
      <el-table-column prop="effectiveDate" align="center" label="计量单位" />
      <el-table-column prop="effectiveDate" align="center" label="外仓统一码" />
    </JFX-table>
    <!-- 表格 end-->
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
export default {
    mixins: [commomMix],
  props: {
    chooseGoodsVisible: { show: false }
  },
  data() {
    return {
      searchProps: {
        merchantName: '',
        name: '',
        brandId: '',
        goodsNo: '',
        barcode: '',
        factoryNo: ''
      },
      rules: {},
      tableData: {
        list: [{}],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
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
    },
    // 提交表单
    comfirm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const data = this.tableChoseList
          this.$emit('comfirm', data)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-view{
  width: 100%;
  margin-bottom: 10px;
}
/deep/.edit-bx .el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 130px;
}
/deep/.edit-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
