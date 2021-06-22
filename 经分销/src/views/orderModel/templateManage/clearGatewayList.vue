<template>
<!-- 预申报单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="模版名称："  prop="fileTempName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.fileTempName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="进出仓配置：" prop="depotConfig" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.depotConfig" placeholder="请选择" clearable :data-list="getSelectList('customsFileConfig_DepotConfigList')" >
                <el-option v-for="item in selectOpt.customsFileConfig_DepotConfigList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="适用仓库：" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="depotIdArr" placeholder="请选择" filterable clearable multiple collapse-tags :data-list="getDepotSelectBean('depotList')" >
                <el-option v-for="item in selectOpt.depotList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="是否同关区：" prop="isSameArea" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.isSameArea" placeholder="请选择" clearable :data-list="getSelectList('isSameAreaList')" >
                <el-option v-for="item in selectOpt.isSameAreaList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.status" placeholder="请选择" clearable :data-list="getSelectList('temp_statusList')" >
                <el-option v-for="item in selectOpt.temp_statusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <el-button type="primary" :size="'small'" v-permission="'customsFileConfig_add'" @click="openLay({})" >新建配置</el-button>
        <el-button type="primary" :size="'small'" v-permission="'customsFileConfig_delete'" @click="dele">删除</el-button>
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
      <el-table-column type="selection" align="center" width="55" :selectable="selectable"></el-table-column>
      <el-table-column prop="fileTempCode" label="模版编码" align="center" min-width="130"></el-table-column>
      <el-table-column prop="fileTempName" label="模版名称" align="center" min-width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="depotConfigLabel" label="进出仓配置" align="center" width="90"></el-table-column>
      <el-table-column prop="isSameAreaLabel" label="是否同关区" align="center" width="90" ></el-table-column>
      <el-table-column prop="depotNames" label="适用仓库" align="center" min-width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center" min-width="130" ></el-table-column>
      <el-table-column prop="statusLabel" label="状态" align="center" width="80" ></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="80">
        <template slot-scope="scope">
          <el-button type="text" v-permission="'customsFileConfig_edit'" @click="openLay(scope.row)">适用配置</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 适用配置 -->
    <apply-config-list v-if="visible.show" :visible="visible" :filterData="filterData" @update="getList"></apply-config-list>
    <!-- 适用配置 end -->
  </div>
</template>
<script>
import { listCustomsFileConfig, delCustomsFileConfig } from '@a/templateManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    applyConfigList: () => import('./components/applyConfigList')
  },
  data() {
    return {
      ruleForm: {
        fileTempName: '',
        depotConfig: '',
        status: '',
        isSameArea: ''
      },
      depotIdArr: [],
      visible: { show: false },
      filterData: {}
    }
	},
	mounted() {
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
        if (this.depotIdArr.length > 0) opt.depotIds = this.depotIdArr.map(item => item).toString()
				const res = await listCustomsFileConfig(opt)
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
			this.$confirm('确定删除选中对象?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
				const ids = this.tableChoseList.map(item => item.id).toString()
        await delCustomsFileConfig({ ids })
        this.$successMsg('删除成功')
        this.getList()
			})
    },
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    selectable(data) {
      return +data.status === 0
    },
    openLay(filterData) {
      this.filterData = filterData
      this.visible.show = true
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
