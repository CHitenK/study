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
            <el-form-item  label="盘点指令单号："  prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.code" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="仓库：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model.trim="ruleForm.depotId" placeholder="请选择" clearable :data-list="getSelectBeanByMerchantRel('warehouseList')">
                <el-option v-for="item in selectOpt.warehouseList" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="公司名称：" prop="merchantName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.merchantName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="服务类型：" prop="serverType" class="search-panel-item fs-14 clr-II" >
              <el-select v-model.trim="ruleForm.serverType" placeholder="请选择" clearable :data-list="getSelectList('takesStock_serverTypeList')" >
                <el-option v-for="item in selectOpt.takesStock_serverTypeList" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model.trim="ruleForm.status" placeholder="请选择" clearable >
                <el-option v-for="item in statusLabel" :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <el-button type="primary" :size="'small'" @click="linkTo('/storage/order/edit/01', '新增盘点指令')" v-permission="'takesstock_add'">新增</el-button>
        <el-button type="primary" :size="'small'" @click="removeTableItem" v-permission="'takesstock_delTakesStockBatch'">删除</el-button>
        <el-button type="primary" :size="'small'" @click="handleSubmit" v-permission="'takesstock_sendtakesStock'">提交</el-button>
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
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        prop="code"
        label="指令单号"
        align="center"
        width="160"
      >
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
        prop="serverTypeLabel"
        label="服务类型"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="depotName"
        label="仓库"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="创建日期"
        align="center"
        width="160"
      >
        <template slot-scope="{row}">
          {{row.createTime.slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="createUsername"
        label="创建人"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="statusLabel"
        label="单据状态"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="left"
        fixed="right"
        :width="btnsWidth"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/storage/orderdetail?id=' + scope.row.id )" v-permission="'takesstock_detail'">详情</el-button>
          <el-button type="text" v-if="scope.row.status == '013'" @click="linkTo('/storage/order/edit/' + scope.row.id )" v-permission="'takesstock_edit'">编辑</el-button>
          <span v-if="!tableData.loading" v-count-width="{widthArr: [60, scope.row.status == '013' ? 40 : 0 ], callback: countWidth }"></span>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { getTakesStockList, sendtakesStock, delTakesStockBatch } from '@a/storageManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        name: '',
        depotId: '',
        merchantName: '',
        serverType: '',
        status: ''
      },
      statusLabel: [
        { key: '013', value: '待提交' },
        { key: '014', value: '已提交' }
      ]
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
				this.tableData.loading = true
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await getTakesStockList(opt)
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
    // 删除表格项
		removeTableItem() {
			if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定删除选中对象？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await delTakesStockBatch({ ids })
          this.$successMsg('删除成功')
          this.getList(1)
        } catch (err) {
          this.$errorMsg(err)
        }
      })
    },
    // 提交表格项
    handleSubmit() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定提交选中对象？', async() => {
        if (this.tableChoseList.find(item => item.statusLabel === '已提交')) {
          return this.$errorMsg('不能重复提交')
        }
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await sendtakesStock({ ids })
          this.$successMsg('提交成功')
          this.getList(1)
        } catch (err) {
          this.$errorMsg(err)
        }
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
