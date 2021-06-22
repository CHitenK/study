<template>
  <!-- NC收支费项页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)" :showOpenBtn="false">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="NC收支费项：" prop="name" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.name" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="科目编码：" prop="subCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.subCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="科目名称：" prop="subName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.subName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary"
                   v-permission="'receivePaymentSubject_add'"
                   @click="showModal('add', { title: '新增NC收支费项' })">新增</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               showIndex
               @selection-change="selectionChange"
               @change="getList">
      <template slot="action" slot-scope="{row}">
        <el-button type="text"
                   v-if="row.status === '1'"
                   v-permission="'receivePaymentSubject_toEditStatus'"
                   @click="enableNcPay(row.id, '0')">停用</el-button>
        <el-button type="text"
                   v-else
                   v-permission="'receivePaymentSubject_toEditStatus'"
                   @click="enableNcPay(row.id, '1')">启用</el-button>
        <el-button type="text"
                   v-permission="'receivePaymentSubject_toEditPage'"
                   @click="showModal('edit', { title: '编辑NC收支费项', id: row.id })">编辑</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 新增/编辑NC收支费项组件 -->
    <NcIncome :visible="ncIncome.visible"
              :title="ncIncome.title"
              :id="ncIncome.id"
              :beforeClose="closeModal"
              @comfirm="isComfrim => closeModal(isComfrim)"
              v-if="ncIncome.visible.show"
    ></NcIncome>
    <!-- 新增/编辑NC收支费项组件 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  listReceivePaymentSubject,
  enableNcPay
} from '@a/billManage'
export default {
  mixins: [commomMix],
  components: {
    NcIncome: () => import('./components/NcIncome')
  },
  data() {
    return {
      // 查询数据
      searchProps: {
        name: '',
        subCode: '',
        subName: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '收支费项编码', prop: 'code', minWidth: '120', align: 'center', hide: true },
        { label: 'NC收支费项', prop: 'name', minWidth: '120', align: 'center', hide: true },
        { label: '科目编码', prop: 'subCode', minWidth: '120', align: 'center', hide: true },
        { label: '科目名称', prop: 'subName', minWidth: '120', align: 'center', hide: true },
        { label: '创建时间', prop: 'createDate', width: '150', align: 'center', hide: true },
        { label: '创建人', prop: 'createrName', width: '100', align: 'center', hide: true },
        { label: '状态', prop: 'statusLabel', width: '90', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '120', align: 'left' }
      ],
      // 新增/编辑NC收支费项组件状态
      ncIncome: {
        id: '',
        title: '',
        visible: { show: false }
      }
    }
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
				const { data } = await listReceivePaymentSubject({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (err) {
        console.log(err)
      } finally {
        this.tableData.loading = false
      }
    },
    // 启用/停用
    enableNcPay(id, type) {
      this.$showToast({
        '0': '是否确认停用?',
        '1': '是否确认启用?'
      }[type], async() => {
        try {
          await enableNcPay({ id, type })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 显示弹窗
    showModal(type, data) {
      const { id, title } = data
      if (type === 'edit') {
        this.ncIncome.id = id
      }
      this.ncIncome.title = title
      this.ncIncome.visible.show = true
    },
    // 隐藏弹窗
    closeModal(isComfrim) {
      this.ncIncome.id = ''
      this.ncIncome.title = ''
      this.ncIncome.visible.show = false
      if (isComfrim) {
        setTimeout(() => {
          this.getList()
        }, 50)
      }
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
