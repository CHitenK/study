<template>
  <!-- 协议单价列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.goodsNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品名称：" prop="goodsName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.goodsName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="移入事业部：" prop="inBuId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.inBuId"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getBUSelectBean('inBusinessList')"
              >
                <el-option
                  v-for="item in selectOpt.inBusinessList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="移出事业部：" prop="outBuId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.outBuId"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getBUSelectBean('outBusinessList')"
              >
                <el-option
                  v-for="item in selectOpt.outBusinessList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="linkTo('/sales/agreementsdd')" v-permission="'agreementCurrencyConfig_add'">新增</el-button>
        <el-button type="primary" @click="importFile" v-permission="'agreementCurrencyConfig_import'">导入</el-button>
        <el-button type="primary" @click="exportList" v-permission="'agreementCurrencyConfig_export'">导出</el-button>
        <el-button type="primary" @click="deleteTableItem" v-permission="'agreementCurrencyConfig_del'">删除</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               @selection-change="selectionChange"
               @change="getList"
               class="mr-t-20" >
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="merchantName"
                       align="center"
                       label="公司"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="inBuName"
                       align="center"
                       label="移入事业部"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="outBuName"
                       align="center"
                       label="移出事业部"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsNo"
                       align="center"
                       label="商品货号"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsName"
                       align="center"
                       label="商品名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="price"
                       align="center"
                       label="协议单价"
                       width="80"
      ></el-table-column>
      <el-table-column prop="currencyLabel"
                       align="center"
                       label="协议币种"
                       width="80"
      ></el-table-column>
      <el-table-column prop="createName"
                       align="center"
                       label="创建人"
                       width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="createDate"
                       align="center"
                       label="创建时间"
                       width="150"
      ></el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  getAgreementCurrencyList,
  exportAgreementCurrencyUrl,
  importAgreementCurrencyUrl,
  getAgreementCurrencyCount,
  delAgreementCurrency
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        goodsNo: '',
        goodsName: '',
        inBuId: '',
        outBuId: ''
      }
    }
  },
  activated() {
    this.getList()
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await getAgreementCurrencyList({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (err) {}
      this.tableData.loading = false
    },
    // 删除表格项
    deleteTableItem() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定删除数据？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await delAgreementCurrency({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 导出
    async exportList() {
      if (this.tableData.total < 1) {
        return this.$errorMsg('暂无数据可导出')
      }
      try {
        if (this.tableChoseList.length) {
          this.$showToast('确定导出勾选数据？', async() => {
            const ids = this.tableChoseList.map(item => item.id).toString()
            this.$exportFile(exportAgreementCurrencyUrl, { ids })
          })
        } else {
          const { data } = await getAgreementCurrencyCount({ ...this.searchProps })
          if (data > 10000) {
            return this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
          }
          this.$exportFile(exportAgreementCurrencyUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 139 + '&url=' + importAgreementCurrencyUrl)
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
