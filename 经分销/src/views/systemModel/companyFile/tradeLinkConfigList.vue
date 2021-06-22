<template>
<!-- 预申报单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'" @click="openEdit({})" v-permission="'tradeLinkConfig_add'">新增</el-button>
        <el-button type="primary" :size="'small'" @click="copy" v-permission="'tradeLinkConfig_add'">复制</el-button>
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
      <el-table-column prop="linkName" label="链路名称" align="center" min-width="100"></el-table-column>
      <el-table-column prop="startSupplierName" label="起点供应商" align="center"  min-width="120"></el-table-column>
      <el-table-column label="起点公司" align="center" >
        <template slot-scope="scope">
          <span>{{scope.row.startPointMerchantName}}</span>
          <br />{{scope.row.startPointBuName}}<span></span>
          <br /><span>{{scope.row.startPointPremiumRate ? scope.row.startPointPremiumRate + '%' : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="buName" label="客户1" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.oneCustomerName}}</span>
          <br />{{scope.row.oneBuName}}<span></span>
          <br /><span>{{scope.row.onePremiumRate ? scope.row.onePremiumRate + '%' : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="transferOrderCode" label="客户2" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.twoCustomerName}}</span>
          <br />{{scope.row.twoBuName}}<span></span>
          <br /><span>{{scope.row.twoPremiumRate ? scope.row.twoPremiumRate + '%' : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="statusLabel" label="客户3" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.threeCustomerName}}</span>
          <br />{{scope.row.threeBuName}}<span></span>
          <br /><span>{{scope.row.threePremiumRate ? scope.row.threePremiumRate + '%' : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="statusLabel" label="客户4" align="center" >
        <template slot-scope="scope">
          <span>{{scope.row.fourCustomerName}}</span>
          <br />{{scope.row.fourBuName}}<span></span>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center" width="140"></el-table-column>
      <el-table-column label="操作" align="left" fixed="right" width="86">
        <template slot-scope="scope">
          <el-button type="text" @click="openEdit(scope.row)" v-permission="'tradeLinkConfig_edit'">编辑</el-button>
          <el-button type="text" @click="dele(scope.row)" v-permission="'tradeLinkConfig_del'">删除</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <edit v-if="visible.show" :visible="visible" @close="getList" :targetData="targetData"></edit>
  </div>
</template>
<script>
import { listTradeLinkConfig, deleConfig } from '@a/companyFile/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    edit: () => import('./components/tradeLinkConfigEdit')
  },
  data() {
    return {
      visible: { show: false },
      targetData: {}
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
          pageSize: this.tableData.pageSize || 10
        }
				const res = await listTradeLinkConfig(opt)
        this.tableData.list = res.data.list || []
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
    // 删除
		dele(row) {
			this.$confirm('确认要删除该条交易链路吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
				await deleConfig({ id: row.id })
        this.$successMsg('删除成功')
        this.getList()
			})
    },
    openEdit(row) {
      this.targetData = row
      this.visible.show = true
    },
    // 复制
    copy() {
      if (this.tableChoseList.length !== 1) {
        this.$errorMsg('请选择一条记录！')
        return false
      }
      const row = { ...this.tableChoseList[0], id: '' }
      this.openEdit(row)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
