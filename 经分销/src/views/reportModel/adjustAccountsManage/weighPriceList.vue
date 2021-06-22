<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="标准条码：" prop="barcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.barcode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable :data-list="getBUSelectBean('buList')" >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="生效月份：" prop="effectiveMonth" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                clearable
                v-model="ruleForm.effectiveMonth"
                type="month"
                value-format="yyyy-MM"
                placeholder="生效月份"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="商品名称：" prop="goodsName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.goodsName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="标准品牌：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable :data-list="getBUSelectBean('buList')" >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="更新时间：">
              <el-date-picker
                clearable
                v-model="date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'" @click="$successMsg('成功导出')">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <div class="mr-t-20"></div>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @selection-change="selectionChange"
      @change="getList"
    >
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="commbarcode" label="标准条码" align="center" width="180"></el-table-column>
      <el-table-column prop="brandName" label="标准品牌" align="center" width="180"></el-table-column>
      <el-table-column prop="currencyLabel" label="结算币种" align="center" width="140"></el-table-column>
      <el-table-column prop="price" label="加权单价" align="center" width="120"></el-table-column>
      <el-table-column prop="effectiveMonth" label="生效年月" align="center" width="160"></el-table-column>
      <el-table-column prop="createDate" label="更新时间" align="center" width="160"></el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { getList } from '@a/base/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        barcode: '',
        brandId: '',
        effectiveMonth: '',
        buId: '',
        goodsName: '',
        createDateStart: '',
        createDateEnd: ''
      },
      date: '',
      statusLabel: [
        { key: '013', value: '待提交' },
        { key: '014', value: '已提交' }
      ]
    }
	},
	mounted() {
		this.getList()
	},
  methods: {
		async getList(pageNum) {
      try {
        this.tableData.loading = true
        if (this.date && this.date.length > 0) {
          this.ruleForm.createDateStart = this.date[0]
          this.ruleForm.createDateEnd = this.date[1]
        }
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await getList(opt)
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
		},
		dele(row) {
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$successMsg('删除成功', () => {})
			}).catch(() => {
				this.$errorMsg('删除失败', () => {})
			})
    },
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
