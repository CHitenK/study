<template>
  <!-- 选择单据组件 -->
  <JFX-Dialog
    title="选择单据"
    closeBtnText="取 消"
    :width="'1000px'"
    :top="'80px'"
    :showClose="true"
		:visible="isVisible"
    @comfirm="comfirm"
	>
    <el-form :model="searchProps" ref="searchForm" class="search-bx">
      <el-row :gutter="10" class="page-view">
        <el-col :span="9">
          <el-form-item label="销售单号：" prop="codes">
            <el-input v-model="searchProps.codes" placeholder="多个订单用英文逗号隔开" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="客户：" prop="customerId">
            <el-select v-model="searchProps.customerId"
                       placeholder="请选择"
                       clearable
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
        <el-col :span="6">
          <el-form-item style="float: right;overflow: hidden;">
            <el-button type="text" @click="isShow = !isShow">
              {{!isShow ? '展开' : '收起'}}
              <i :class="!isShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" style="margin-left: 4px" />
            </el-button>
            <el-button @click="getList(1)" type="primary">查询</el-button>
            <el-button @click="resetSearchForm">重置</el-button>
          </el-form-item>
        </el-col>
        <template v-if="isShow">
          <el-col :span="9">
            <el-form-item label="出仓仓库：" prop="outDepotId">
              <el-select v-model="searchProps.outDepotId"
                         placeholder="请选择"
                         clearable
                         :data-list="getSelectBeanByMerchantRel('merchantRelList')">
                <el-option
                  v-for="item in selectOpt.merchantRelList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="PO单号：" prop="poNo">
              <el-input v-model="searchProps.poNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               @selection-change="selectionChange"
               @change="getList">
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="code"
                       align="center"
                       label="销售单号"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="customerName"
                       align="center"
                       label="客户"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="outDepotName"
                       align="center"
                       label="出仓仓库"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="poNo"
                       align="center"
                       label="PO单号"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="businessModelLabel"
                       align="center"
                       label="销售类型"
                       width="100"
      ></el-table-column>
      <el-table-column prop="createName"
                       align="center"
                       label="制单人"
                       width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="createDate"
                       align="center"
                       label="制单时间"
                       width="150"
      ></el-table-column>
    </JFX-table>
    <!-- 表格 end-->
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
import {
  saleGetListSaleOrderByPage,
  isSameParameter
} from '@a/salesReturnManage/index'
export default {
  mixins: [commomMix],
  props: {
    isVisible: { show: false }
  },
  data() {
    return {
      // 按钮控制显示隐藏
      isShow: false,
      // 查询数据
      searchProps: {
        codes: '',
        customerId: '',
        outDepotId: '',
        poNo: ''
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
        this.tableData.loading = true
				const { data } = await saleGetListSaleOrderByPage({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData = {
					list: data.list,
					loading: false,
					pageNum: pageNum || data.pageNo,
					total: data.total,
					pageSize: data.pageSize
				}
			} catch (err) {
        this.tableData.loading = false
			}
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.getList(1)
      })
    },
    // 提交表单
    async comfirm() {
      if (!this.tableChoseList.length) {
        return this.$alertError('请至少选择一单！')
      }
      try {
        const ids = this.tableChoseList.map(item => item.id).toString()
        await isSameParameter({ ids })
        this.$emit('comfirm', ids)
      } catch (error) {
        this.$errorMsg(error.message)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page-view{
  width: 100%;
  margin-bottom: 10px;
}
/deep/.search-bx .el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 120px;
}
/deep/.search-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
