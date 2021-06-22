<template>
  <div class="mr-t_10">
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)" >
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="标准条码：" prop="commbarcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.commbarcode" clearable  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="标准品牌：" prop="commBrandParentId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.commBrandParentId" placeholder="请选择" filterable clearable :data-list="getBrandParent('brandList')" >
                <el-option v-for="item in selectOpt.brandList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="条形码：" prop="barcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.barcode" clearable  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品名称：" prop="goodsName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.goodsName" clearable  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.goodsNo" clearable  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="维护状态：" prop="maintainStatus" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.maintainStatus" placeholder="请选择" filterable clearable :data-list="getSelectList('commbarcode_maintainStatusList')" >
                <el-option v-for="item in selectOpt.commbarcode_maintainStatusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <el-button type="primary" :size="'small'" @click="dialogVisible.show=true, selfDown=true" v-permission="'commbarcode_import'">导入</el-button>
        <el-button type="primary" :size="'small'" @click="exportExcel" v-permission="'commbarcode_export'">导出</el-button>
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
      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
      <el-table-column prop="commbarcode" label="标准条码" align="center" min-width="200"></el-table-column>
      <el-table-column prop="commBrandParentName" label="标准品牌" align="center" min-width="200"></el-table-column>
      <el-table-column prop="commTypeName" label="二级分类" align="center" width="100"></el-table-column>
      <el-table-column prop="commGoodsName" label="商品名称" align="center" min-width="200"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="maintainStatusLabel" label="维护状态" align="center" width="90"></el-table-column>
      <el-table-column prop="brandSuperiorName" label="母品牌" align="center" min-width="200"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center" width="140"></el-table-column>
      <el-table-column label="操作" width="100" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="openLay(scope.row)" v-permission="'commbarcode_edit'">编辑</el-button>
          <el-button type="text" @click="linkTo('/brand/standardBarcodeDetail?id=' + scope.row.id)" v-permission="'commbarcode_detail'">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 编辑信息 -->
    <JFX-Dialog
      v-if="visible.show"
      :visible.sync="visible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'600px'"
      :title="'编辑信息'"
      :btnAlign="'center'"
      top="20vh"
      >
      <div class="change-lve" v-loading="changeloading">
        <div class="flex-c-c">
          <span class="label-item need">标准品牌：</span>
          <el-select v-model="commitForm.commBrandParentId" placeholder="请选择" filterable clearable :data-list="getBrandParent('brandList1')" style="width: 400px;">
            <el-option v-for="item in selectOpt.brandList1"  :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </div>
        <div class="flex-c-c mr-t-20">
          <span class="label-item need">商品名称：</span>
          <el-select v-model="commitForm.commGoodsName" placeholder="请选择" filterable clearable style="width: 400px;">
            <el-option v-for="(item, i) in modalGoodsNameList"  :key="i" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="flex-c-c mr-t-20">
          <span class="label-item need">二级分类：</span>
          <el-select v-model="commitForm.commTypeId" placeholder="请选择" filterable clearable style="width: 400px;">
            <el-option v-for="(item, i) in modalCommTypeNameList" :key="i" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="mr-t-20"></div>
      </div>
    </JFX-Dialog>
    <!-- 导入 -->
      <div>
        <JFX-Dialog
        :visible.sync="dialogVisible"
        :showClose="true"
        @comfirm="dialogVisible.show = false"
        :width="'860px'"
        :title="'导入'"
        :top="'3vh'"
        closeBtnText="取 消"
        confirmBtnText="确 认"
        >
        <div class="import-bx">
          <importfile v-if="selfDown" @downup="downup" :url="importGoodsUrl"  :selfDown="selfDown" :templateId="'2333'"></importfile>
        </div>
        </JFX-Dialog>
      </div>
      <!-- 导入 end -->
  </div>
</template>
<script>
import { getTwoLevel } from '@a/goodsManage/index'
import { listCommbarcodes, exportCommbarcodeUrl, getExportCount, downloadImportTempUrl, importCommbarcodeUrl, toDetailPage, modifyCommbarcode } from '@a/brandManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    importfile: () => import('@/components/importfile/index')
  },
  data() {
    return {
      ruleForm: {
        commbarcode: '',
        commBrandParentId: '',
        barcode: '',
        goodsNo: '',
        maintainStatus: ''
      },
      visible: { show: false },
      parentId: '',
      changeloading: false,
      targetData: {},
      commitForm: {
        id: '',
        commGoodsName: '',
        commTypeName: '',
        commBrandParentId: '',
        commTypeId: '',
        commBrandParentName: ''
      },
      selfDown: false,
      importGoodsUrl: importCommbarcodeUrl,
      dialogVisible: { show: false },
      modalCommTypeNameList: [],
      modalGoodsNameList: []
    }
	},
	mounted() {
    this.getTwoLevel() // 获取二级分类
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
				const res = await listCommbarcodes(opt)
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
    async openLay(row) {
      const res = await toDetailPage({ id: row.id })
      const { detail = {}, itemList = [] } = res.data
      for (let key in this.commitForm) {
        this.commitForm[key] = detail[key] ? detail[key].toString() : ''
      }
      if (this.ruleForm.commGoodsName) this.modalGoodsNameList = { key: 745910, value: this.ruleForm.commGoodsName }
      this.modalGoodsNameList = []
      itemList.forEach(item => {
        if (item.goodsId && item.goodsName !== this.ruleForm.commGoodsName) this.modalGoodsNameList.push({ key: item.goodsId, value: item.goodsName })
      })
      this.visible.show = true
    },
    async comfirm() {
      if (!this.commitForm.commBrandParentId) {
        this.$errorMsg('请选择标准品牌')
        return false
      }
      if (!this.commitForm.commGoodsName) {
        this.$errorMsg('请选择商品名称')
        return false
      }
      if (!this.commitForm.commTypeId) {
        this.$errorMsg('请选择二级分类')
        return false
      }
      const target = this.modalCommTypeNameList.find(item => +this.commitForm.commTypeId === +item.value) || {}
      this.commitForm.commTypeName = target.label || ''
      const target1 = this.selectOpt.brandList1.find(item => +this.commitForm.commBrandParentId === +item.key) || {}
      this.commitForm.commBrandParentName = target1.value || ''
      if (this.changeloading) return false // 拦截多次提交
      this.changeloading = true
      try {
        await modifyCommbarcode(this.commitForm)
        this.$successMsg('操作成功')
        this.visible.show = false
        this.getList()
      } catch (error) {
        console.log(error)
      }
      this.changeloading = false
    },
    // 导出
    async exportExcel() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      let opt = { ids: '' }
      if (this.tableChoseList.length > 0) {
        const ids = this.tableChoseList.map(item => item.id).toString()
        opt = { ids }
      }
      const res = await getExportCount(opt)
      const total = res.data.total // 总数
      if (total > 5000) {
        this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
        return false
      }
      this.$exportFile(exportCommbarcodeUrl, opt)
    },
    // 下载模板
    async downup() {
      this.$exportFile(downloadImportTempUrl, {})
    },
    // 获取二级分类
    async getTwoLevel() {
      const res = await getTwoLevel()
      this.modalCommTypeNameList = res.data || []
    }
  }
}
</script>
<style lang="scss" scoped>
.change-lve{
  width: 100%;
  padding: 10px  0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}
.mr-t_10{
  margin-top: -10px;
}
.label-item{
  display: inline-block;
  width: 120px;
  text-align: right;
}
</style>
