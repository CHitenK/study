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
              <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II">
                <el-select v-model="searchProps.customerId"
                           style="width: 220px;"
                           placeholder="请选择"
                           filterable
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
            </el-col>
            <el-col :span="12">
              <el-form-item  label="PO号："  prop="poNoStr" class="search-panel-item fs-14 clr-II" >
                <el-input v-model="searchProps.poNoStr" type="textarea" :autosize="{ minRows: 1, maxRows: 5 }" clearable placeholder="多PO用&字符或换行隔开" style="width: 220px;"  />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单据类型：" prop="orderType" class="search-panel-item fs-14 clr-II" >
                <el-select v-model.trim="searchProps.orderType"
                           style="width: 220px;"
                           placeholder="请选择"
                           filterable
                           clearable>
                  <el-option label="销售单" value="1" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="业务单据号：" prop="relCodeStr" class="search-panel-item fs-14 clr-II" >
                <el-input v-model="searchProps.relCodeStr" type="textarea" :autosize="{ minRows: 1, maxRows: 5 }" clearable placeholder="多单号用&字符或换行隔开" style="width: 220px;"  />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </JFX-search-panel>
      <el-row class="company-page mr-t-20">
        <el-col :span="24" class="mr-t-10">
          <el-col class="fs-14 clr-II mr-b-10">
            <p style="padding-left: 20px;">已选 <span style="color: red;">{{tableChoseList.length}}</span> 行记录 ，PO <span style="color: red;">{{poNoCount}}</span> 个，金额 <span style="color: red;">{{amountCount}}</span></p>
          </el-col>
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
    }
  },
  data() {
    return {
      searchProps: {
        customerId: '',
        poNoStr: '',
        orderType: '1',
        relCodeStr: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '业务单据号', prop: 'relCode', minWidth: '120', align: 'center', hide: true },
        { label: '客户', prop: 'customerName', minWidth: '120', align: 'center', hide: true },
        { label: 'PO号', prop: 'poNo', minWidth: '120', align: 'center', hide: true },
        { label: '事业部', prop: 'buName', minWidth: '120', align: 'center', hide: true },
        { label: '销售金额', slotTo: 'amount', minWidth: '120', align: 'center', hide: true }
      ],
      confirmBtnLoading: false
    }
  },
  computed: {
    // 计算总的poNo数量
    poNoCount() {
      if (!this.tableChoseList.length) return 0
      const poNos = this.tableChoseList.map(item => item.poNo)
      const uniquePoNos = [...new Set(poNos)]
      return uniquePoNos.length
    },
    // 总的金额
    amountCount() {
      if (!this.tableChoseList.length) return 0
      const currencys = this.tableChoseList.map(item => item.currency)
      if ([...new Set(currencys)].length >= 2) return 'N/A'
      const amout = this.tableChoseList.reduce((pre, cur) => {
        pre += +cur.amount
        return pre
      }, 0)
      return `${this.tableChoseList[0].currency} ${amout.toFixed(2)}`
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
				const { data } = await listAddBill({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
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
        if (data) {
          sessionStorage.setItem('selectDocumentData', JSON.stringify(data))
        }
        this.linkTo('/receivemoney/AdvanceReceiptAdd')
        this.$emit('comfirm')
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.confirmBtnLoading = false
      }
    },
    // 隐藏弹窗
    closeModal(type) {
      switch (type) {
        // 选择单据
        case 'selectDocument':
          this.selectDocument.visible.show = false
          break
      }
      this.init()
    },
    selectionChange(rows) {
      const currencys = rows.map(item => item.currency)
      const customerNames = rows.map(item => item.customerName)
      const buNames = rows.map(item => item.buName)
      if ([...new Set(currencys)].length >= 2 || [...new Set(customerNames)].length >= 2 || [...new Set(buNames)].length >= 2) {
        this.$errorMsg('只能选择相同币种 + 相同事业部 + 相同客户的单据')
        this.$refs['rootTable'].$refs['el-table'].clearSelection()
        this.tableChoseList = []
        return false
      }
      this.tableChoseList = rows
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
