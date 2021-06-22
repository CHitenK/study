<template>
  <!-- 税率配置页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="公司：" prop="merchantId">
              <el-select v-model="searchProps.merchantId"
                        clearable
                        filterable
                        placeholder="请选择"
                        :data-list="getSelectMerchantBean('merchantList')">
                <el-option
                  v-for="item in selectOpt.merchantList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" ref="buId">
              <el-select v-model="searchProps.buId"
                        placeholder="请选择"
                        clearable
                        filterable
                        :data-list="getAllSelectBean('bu_list')">
                <el-option
                  v-for="item in selectOpt.bu_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerId">
              <el-select v-model="searchProps.customerId"
                        placeholder="请选择"
                        clearable
                        filterable
                        :data-list="getCustomerSelectBean('customerList')">
                <el-option
                  v-for="item in selectOpt.customerList"
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
        <el-button type="primary" @click="linkTo(`/rebate/SaleSDConfigAdd?type=add`)" v-permission="'saleSDConfig_add'">新增</el-button>
        <el-button type="primary" @click="copy" v-permission="'saleSDConfig_copy'">复制</el-button>
        <el-button type="primary" @click="deleteTableItem" v-permission="'saleSDConfig_dele'">删除</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               showSelection
               @selection-change="selectionChange"
               @change="getList">
      <template slot="action" slot-scope="{row}">
        <el-button type="text"
                   @click="linkTo(`/rebate/SaleSDConfigAdd?id=${row.id}&type=audit`)" v-if="row.status === '0'" v-permission="'saleSDConfig_audit'">审核</el-button>
        <el-button type="text"
                   @click="linkTo(`/rebate/SaleSDConfigDetail?id=${row.id}`)" v-permission="'saleSDConfig_detail'">查看</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { listDTOByPage, delSdSaleConfig } from '@a/rebateManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        merchantId: '',
        buId: '',
        customerId: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '公司', prop: 'merchantName', minWidth: '140', align: 'center', hide: true },
        { label: '事业部', prop: 'buName', minWidth: '130', align: 'center', hide: true },
        { label: '客户', prop: 'customerName', minWidth: '120', align: 'center', hide: true },
        { label: '平台备注', prop: 'remark', minWidth: '130', align: 'center', hide: true },
        { label: '生效时间', prop: 'effectiveDate', width: '140', align: 'center', hide: true },
        { label: '失效时间', prop: 'expirationDate', width: '140', align: 'center', hide: true },
        { label: '创建人', prop: 'createName', width: '120', align: 'center', hide: true },
        { label: '状态', prop: 'statusLabel', width: '80', align: 'center' },
        { label: '操作', slotTo: 'action', width: '120', align: 'left' }
      ]
    }
  },
  mounted() {
    this.getList(1)
  },
  activated() {
    this.getList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listDTOByPage({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
        this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (err) {
      }
      this.tableData.loading = false
    },
    // 删除表格项
    deleteTableItem() {
      if (!this.tableChoseList.length) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      this.$showToast('确定删除数据？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await delSdSaleConfig({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message || '删除出错了')
        }
      })
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.getList(1)
      })
    },
    copy() {
      if (this.tableChoseList.length !== 1) {
        this.$errorMsg('请选择一条记录！')
        return false
      }
      const id = this.tableChoseList[0].id
      this.linkTo(`/rebate/SaleSDConfigAdd?type=copy&id=${id}`)
    }
  }
}
</script>
