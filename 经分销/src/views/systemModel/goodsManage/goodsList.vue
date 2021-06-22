<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)" :showOpenBtn="false">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="货品名称：" prop="name" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品条形码：" prop="barcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.barcode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品品牌：" prop="brandId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.brandId" placeholder="请选择" clearable filterable :data-list="getBrandSelectBean('brandList')" >
                <el-option v-for="item in selectOpt.brandList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="二级类目：" prop="productTypeId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.productTypeId" placeholder="请选择" clearable :data-list="getMerchandiseCatList('lev2List', { type: 1 })" >
                <el-option v-for="item in selectOpt.lev2List"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'" @click="openLay" v-permission="'product_modifyBatchProduct'">批量修改品类</el-button>
      </el-col>
    </el-row>
    <div class="mr-t-20"></div>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @selection-change="selectionChange"
      @change="getList"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="productName" label="货品名称" align="center" min-width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="unitName" label="计量单位" align="center" width="80"></el-table-column>
      <el-table-column prop="goodsClassifyName" label="二级类目" align="center" width="120"></el-table-column>
      <el-table-column prop="barcode" label="条形码" align="center" width="190"></el-table-column>
      <el-table-column prop="brandName" label="品牌" align="center" width="150"></el-table-column>
      <el-table-column prop="countyName" label="原产国" align="center" width="150"></el-table-column>
      <el-table-column label="操作" width="100" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/goods/goodsEdit?id=' + scope.row.id)" v-permission="'product_toEditPage'">编辑</el-button>
          <el-button type="text" @click="linkTo('/goods/goodsDetail?id=' + scope.row.id)" v-permission="'product_toDetailsPage'">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 批量修改品类 -->
    <JFX-Dialog
      v-if="visible.show"
      :visible.sync="visible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'30vw'"
      :title="'修改品类'"
      :btnAlign="'center'"
      top="30vh"
      >
      <div class="change-lve" v-loading="changeloading">
        <span class="need"> 二级类目：</span>
        <el-select v-model="productTypeId" placeholder="请选择" clearable filterable :data-list="getMerchandiseCatList('lev2List', { type: 1 })" >
          <el-option v-for="item in selectOpt.lev2List"  :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </div>
    </JFX-Dialog>
  </div>
</template>
<script>
import { listProduct, modifyBatchProduct } from '@a/goodsManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        name: '',
        barcode: '',
        brandId: '',
        productTypeId: ''
      },
      visible: { show: false },
      productTypeId: '',
      changeloading: false
    }
	},
	mounted() {
    this.getList(1)
	},
  activated() {
    this.getList()
  },
  methods: {
		async getList(pageNum) {
      try {
				this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize,
          ...this.ruleForm
        }
				// 同步方法
				const res = await listProduct(opt)
				this.tableData.list = res.data.list
				this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
    // 重置搜索栏
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    // 打开弹窗
    openLay() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      this.visible.show = true
    },
    async comfirm() {
      if (!this.productTypeId) {
        this.$errorMsg('请选择二级类目')
        return false
      }
      const ids = this.tableChoseList.map(item => item.id).toString()
      this.changeloading = true
      try {
        await modifyBatchProduct({ ids, productTypeId: this.productTypeId })
        this.$successMsg('操作成功')
        this.visible.show = false
        this.getList()
      } catch (error) {
        console.log(error)
      }
      this.changeloading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.change-lve{
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
}
</style>
