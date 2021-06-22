<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'80vw'"
      :title="'选择单据'"
      :btnAlign="'center'"
      top="6vh"
      >
      <JFX-search-panel @reset="resetForm" @search="getList(1)">
        <el-form :model="ruleForm" ref="ruleForm">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
              <el-form-item  label="采购单号："  prop="codes" class="search-panel-item fs-14 clr-II" >
                <el-input v-model.trim="ruleForm.codes" clearable placeholder="多个订单用英文逗号隔开"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
              <el-form-item label="供应商：" prop="region" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.supplierId" placeholder="请选择" filterable clearable :data-list="getSupplierList('suppList')" >
                  <el-option v-for="item in selectOpt.suppList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
              <el-form-item label="出仓仓库：" prop="outDepotId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.outDepotId" placeholder="请选择" filterable clearable :data-list="getSelectBeanByMerchantRel('outDepotList')" >
                  <el-option v-for="item in selectOpt.outDepotList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
              <el-form-item  label="PO单号：" prop="poNo" class="search-panel-item fs-14 clr-II" >
                <el-input v-model.trim="ruleForm.poNo" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </JFX-search-panel>
      <el-row class="company-page">
        <el-col :span="24"  class="mr-t-20">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            @selection-change="selectionChange"
            @change="getList"
            :tableHeight="'460px'"
          >
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="code" label="采购单号" align="center" width="180"></el-table-column>
            <el-table-column prop="supplierName" label="供应商" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="buName" label="事业部" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="depotName" label="入库仓库" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="poNo" label="PO号" align="center" width="160" ></el-table-column>
            <el-table-column prop="createName" label="制单人" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createDate" label="制单时间" align="center" width="150"></el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import { getListPurchaseOrderByPage, isSameParameter } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    filterData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      compayId: '',
      companylist: [],
      innerVisible: false,
      parment: '',
      ruleForm: {
        codes: '',
        outDepotId: '',
        poNo: '',
        supplierId: ''
      },
      flage: true
    }
  },
  mounted() {
    // 设置table 高度
    this.getList(1)
  },
  methods: {
    async comfirm() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('请至少选择一条数据！')
        return false
      }
      if (!this.flage) return false
      this.flage = false
      const ids = this.tableChoseList.map(item => item.id).toString()
      const code = this.tableChoseList.map(item => item.code).toString()
      try {
        await isSameParameter({ ids })
        this.$emit('comfirm', { ids, code })
      } catch (err) {
        console.log(err)
      }
      this.flage = true
    },
    async getList(pageNum) {
      try {
				this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
				// 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.filterData,
          ...this.ruleForm
        }
				const res = await getListPurchaseOrderByPage(opt)
				this.tableData.list = res.data.list
				this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
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
.company-page{
  width: 100%;
  margin-bottom: 10px;
  min-height: 200px;
}
.fen-pei-bx{
  margin-top: -30px;
  border-top: solid 1px #eaeaea;
  border-bottom: solid 1px #eaeaea;
  height: 80px;
}
.dialog-footer{
  height: 30px;
  margin-top: -30px;
}
</style>
