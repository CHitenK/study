<template>
  <!--新增内部订单组件 -->
  <JFX-Dialog
    title="选择内部采购单"
    closeBtnText="取 消"
    :width="'1150px'"
    :top="'80px'"
    :btnAlign="'center'"
    :confirmBtnText="'生成销售订单'"
		:visible="internalOrderVisible"
    @comfirm="comfirm"
	>
    <el-form :model="ruleForm" ref="ruleForm" class="internal-bx">
      <el-row :gutter="10" class="mr-b-10">
        <el-col :span="6">
          <el-form-item label="客户：" prop="customerId">
            <el-select
              v-model="ruleForm.customerId"
              placeholder="请选择"
              clearable
              filterable
              :data-list="getSelectMerchantBean('merchant_list')"
            >
              <el-option
                v-for="item in selectOpt.merchant_list"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="采购订单号：" prop="purchaseOrderCodeStr">
            <el-input v-model="ruleForm.purchaseOrderCodeStr" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="PO号：" prop="poNoStr">
            <el-input v-model="ruleForm.poNoStr" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4" class="flex-c-c" style="padding-top: 3px">
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="resetSearchForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <JFX-table :tableData.sync="tableData"
               :showPagination="false"
               @selection-change="selectionChange">
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="code"
                       align="center"
                       label="采购订单编号"
                       width="140"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="merchantName"
                       align="center"
                       label="客户"
                       min-width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="poNo"
                       align="center"
                       label="PO号"
                       min-width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       label="事业部"
                       min-width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="depotName"
                       align="center"
                       label="采购入库仓"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="createDate"
                       align="center"
                       label="采购订单创建时间"
                       width="150"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="createName"
                       align="center"
                       label="单据创建人"
                       min-width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center" width="150">
        <template slot="header">
          <span class="need">销售出库仓</span>
        </template>
        <template slot-scope="{row}">
          <el-select
            v-model="row.outDepotId"
            placeholder="请选择"
            clearable
            filterable
            :data-list="getSelectBeanByMerchantRel('warehouseList', { type: 'a,c,d' })"
          >
            <el-option
              v-for="item in selectOpt.warehouseList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
      </el-table-column>
    </JFX-table>
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
import {
  showOwnPurchaseOrder,
  checkGoodsInfo
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  props: {
    internalOrderVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      ruleForm: {
        customerId: '',
        purchaseOrderCodeStr: '',
        poNoStr: ''
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const { data } = this
      this.tableData.list = data
    },
    async handleSearch() {
      const params = {
        ...this.ruleForm
      }
      const json = JSON.stringify(params)
      const { data } = await showOwnPurchaseOrder({ json })
      this.tableData.list = data || []
    },
    // 提交表单
    async comfirm() {
      if (!this.tableChoseList.length) {
        return this.$errorMsg('请选择采购单！')
      }
      if (this.tableChoseList.length > 1) {
        return this.$errorMsg('只能选择一条采购单！')
      }
      const { id, outDepotId } = this.tableChoseList[0]
      if (!outDepotId) {
        return this.$errorMsg('请选择销售出库仓')
      }
      try {
        const { data } = await checkGoodsInfo({ purchaseId: id, outDepotId })
        this.$showToast(data, () => {
          this.$emit('comfirm')
          this.linkTo(`/sales/salesorderadd?purchaseId=${id}&outDepotId=${outDepotId}`)
        }, () => {
          this.$emit('comfirm')
        })
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('ruleForm', () => {
        this.init()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.internal-bx .el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100px;
}
/deep/.el-form-item {
  display: flex;
}
/deep/.internal-bx .el-form-item__content {
   flex: 1;
}
</style>
