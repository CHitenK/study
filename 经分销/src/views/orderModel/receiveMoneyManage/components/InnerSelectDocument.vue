<template>
  <div>
    <JFX-Dialog
      :visible.sync="selectDocumentVisible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'1000px'"
      :title="'选择业务单据'"
      :btnAlign="'center'"
      :confirmBtnLoading="confirmBtnLoading"
      top="15vh"
    >
      <JFX-search-panel @reset="resetForm" @search="getList(1)" style="margin-top:0;">
        <el-form :model="searchProps" ref="searchForm">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="销售单号：" prop="relCodeStr" class="search-panel-item fs-14 clr-II" >
                <el-input v-model="searchProps.relCodeStr" type="textarea" :autosize="{ minRows: 1, maxRows: 5 }" clearable placeholder="多单号用&字符或换行隔开" style="width: 220px;" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="PO号："  prop="poNoStr" class="search-panel-item fs-14 clr-II" >
                <el-input v-model="searchProps.poNoStr" type="textarea" :autosize="{ minRows: 1, maxRows: 5 }" clearable placeholder="多PO用&字符或换行隔开" style="width: 220px;"  />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II">
                <el-select v-model="searchProps.customerId"
                           style="width: 220px;"
                           placeholder="请选择"
                           filterable
                           disabled
                           clearable
                           :data-list="getCustomerSelectBean('customer_list')">
                  <el-option
                    v-for="item in selectOpt.customer_list"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
      </JFX-search-panel>
      <el-row class="company-page mr-t-20">
        <el-col :span="24" class="mr-t-10">
          <!-- 表格 -->
          <JFX-table :tableData.sync="tableData"
                     :tableColumn="tableColumn"
                     showSelection
                     ref="rootTable"
                     @selection-change="selectionChange"
                     @change="getList">
            <template slot="amount" slot-scope="{row}">
              {{`${row.currency} ${row.amount}`}}
            </template>
          </JFX-table>
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>

<script>
import {
  listAddBill,
  checkData
} from '@a/receiveMoneyManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    selectDocumentVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    orderType: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {}
    },
    checkRelCodeStr: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchProps: {
        // customerId: '',
        poNoStr: '',
        relCodeStr: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '销售订单号', prop: 'relCode', minWidth: '120', align: 'center', hide: true },
        { label: '事业部', prop: 'buName', minWidth: '120', align: 'center', hide: true },
        { label: 'PO号', prop: 'poNo', minWidth: '120', align: 'center', hide: true },
        { label: '客户', prop: 'customerName', minWidth: '120', align: 'center', hide: true },
        { label: '销售金额', slotTo: 'amount', minWidth: '120', align: 'center', hide: true }
      ],
      confirmBtnLoading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      const { data: { currency, buId, customerId }, orderType } = this
      // this.searchProps.customerId = customerId
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listAddBill({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps,
          orderType,
          // checkRelCodeStr,
          currency,
          buId,
          customerId
        })
				this.tableData.list = data ? data.list : []
        this.tableData.total = data ? data.total : 0
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.tableData.loading = false
      }
    },
    // 提交
    async comfirm() {
      if (!this.tableChoseList.length) {
        return this.$emit('comfirm')
      }
      try {
        this.confirmBtnLoading = true
        const { data } = await checkData({ list: this.tableChoseList })
        this.$emit('comfirm', data)
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.confirmBtnLoading = false
      }
    },
    // 重置搜索栏
    resetForm() {
      this.reset('searchForm', () => {
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
