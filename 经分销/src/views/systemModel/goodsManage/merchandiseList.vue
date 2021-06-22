<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品编码：" prop="goodsCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.goodsCode" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品名称：" prop="name" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.name" clearable  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.goodsNo" clearable  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品条形码：" prop="barcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.barcode" clearable  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="工厂源码：" prop="factoryNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.factoryNo" clearable  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="数据来源：" prop="source" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.source" placeholder="请选择" clearable :data-list="getSelectList('merchandiseInfo_sourceList')" >
                <el-option v-for="item in selectOpt.merchandiseInfo_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
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
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="是否备案：" prop="isRecord" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.isRecord" placeholder="请选择" clearable :data-list="getSelectList('merchandiseInfo_isRecordList')">
                <el-option v-for="item in selectOpt.merchandiseInfo_isRecordList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="外仓统一码：" prop="outDepotFlag" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.outDepotFlag" placeholder="请选择" clearable :data-list="getSelectList('merchandiseInfo_outDepotFlagList')" >
                <el-option v-for="item in selectOpt.merchandiseInfo_outDepotFlagList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <el-button type="primary" :size="'small'" v-permission="'merchandise_toAddPage'" @click="linkTo('/goods/merchandise/add', '商品新增')" >新增</el-button>
        <el-button type="primary" :size="'small'" v-permission="'merchandise_delMerchandise'" @click="dele">删除</el-button>
        <el-button type="primary" :size="'small'" v-permission="'merchandise_toImportPage'" @click="importFileType(1)">批量导入</el-button>
        <el-button type="primary" :size="'small'" v-permission="'merchandise_toImportPage'" @click="importFileType(2)">导入图片</el-button>
        <el-button type="primary" :size="'small'" v-permission="'merchandise_toExportPage'" @click="exportExcel" >导出</el-button>
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
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column prop="goodsCode" label="商品编码" align="center" min-width="140"></el-table-column>
      <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="140"></el-table-column>
      <el-table-column prop="name" label="商品名称" align="center" min-width="240"></el-table-column>
      <el-table-column prop="unitName" label="计量单位" align="center" min-width="80"></el-table-column>
      <el-table-column prop="filingPrice" label="单价" align="center" min-width="60"></el-table-column>
      <el-table-column prop="merchantName" label="所属公司" align="center" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="barcode" label="商品条码" align="center" min-width="120"></el-table-column>
      <el-table-column prop="sourceLabel" label="数据来源" align="center" min-width="80"></el-table-column>
      <el-table-column prop="isRecordLabel" label="是否备案" align="center" min-width="80"></el-table-column>
      <el-table-column prop="statusLabel" label="状态" align="center" min-width="60"></el-table-column>
      <el-table-column prop="outDepotFlagLabel" label="外仓统一码" align="center" min-width="80"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.status === '1'" v-permission="'merchandise_auditMerchandies'" @click="auditMerchandies(scope.row.id, '0')">禁用</el-button>
          <el-button type="text" v-if="scope.row.status === '0'" v-permission="'merchandise_auditMerchandies'" @click="auditMerchandies(scope.row.id, '1')">启用</el-button>
          <el-button type="text" v-permission="'merchandise_toEditPage'" @click="linkTo('/goods/merchandise/edit?id=' + scope.row.id)">编辑</el-button>
          <el-button type="text" v-permission="'merchandise_toDetailsPage'" @click="linkTo('/goods/merchandiseDetail?id=' + scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 编辑公告 -->
    <edit v-if="visible.show" :visible="visible"></edit>
  </div>
</template>
<script>
import { listMerchandise, exportMerchandiseUrl, delMerchandise, importMerchandiseUrl, auditMerchandies, importMerchandiseImageUrl } from '@a/goodsManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        goodsCode: '',
        name: '',
        goodsNo: '',
        barcode: '',
        source: '',
        brandId: '',
        productTypeId: '',
        factoryNo: '',
        isRecord: '',
        outDepotFlag: ''
      }
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
				// 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await listMerchandise(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
		dele() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
			this.$confirm('确定删除选中对象？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
				const ids = this.tableChoseList.map(item => item.id).toString()
				await delMerchandise({ ids })
        this.$successMsg('删除成功')
        this.getList()
			})
		},
    // 导出
    exportExcel() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      let opt = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.ruleForm
      }
      this.$exportFile(exportMerchandiseUrl, opt)
    },
    // 导入
    importFileType(type) {
      if (+type === 1) { // 批量导入
        this.linkTo('/common/importfile?templateId=' + 113 + '&url=' + importMerchandiseUrl)
      } else if (+type === 2) { // 导入图片
        this.linkTo('/common/importfile?templateId=' + 160 + '&url=' + importMerchandiseImageUrl + '&accept=.zip')
      }
    },
    // 禁用或 启用
    auditMerchandies(id, status) {
      this.$confirm('你确认要禁用/启用吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
				await auditMerchandies({ id, status })
        this.$successMsg('操作成功')
        this.getList()
			})
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

</style>
