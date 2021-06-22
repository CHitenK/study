<template>
    <div class="page-bx bgc-w edit-bx">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
        <!-- 面包屑 -->
        <JFX-Breadcrumb :showGoback="true" :breadcrumb="breadcrumb" />
        <!-- 面包屑 end -->
        <!-- title -->
        <JFX-title title="基本信息" className="mr-t-10" />
        <el-row  :gutter="10" class="fs-12 clr-II detail-row">
          <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
            采购退货订单号：{{detail.code || '- -'}}
          </el-col>
          <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
            出库仓库：{{detail.outDepotName || '- -'}}
          </el-col>
          <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
            入库仓库：{{detail.inDepotName || '- -'}}
          </el-col>
          <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
            PO号：{{detail.poNo || '- -'}}
          </el-col>
          <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
            事业部：{{detail.buName || '- -'}}
          </el-col>
          <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
           供应商：{{detail.supplierName || '- -'}}
          </el-col>
        </el-row>
        <JFX-title title="出库信息" className="mr-t-15" />
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="出库时间：" prop="returnOutDate" >
              <el-date-picker
                v-model="ruleForm.returnOutDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="mr-t-20"></div>
        <!-- 表格 -->
        <JFX-table
          :tableData.sync="tableData"
          @selection-change="selectionChange"
          :showPagination="false"
        >
          <el-table-column type="index" width="50" label="序号" align="center" fixed="left"></el-table-column>
          <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="180" fixed="left"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="barcode" label="条形码" align="center" min-width="180"></el-table-column>
          <el-table-column prop="returnNum" label="退货商品数量" align="center" min-width="120"></el-table-column>
          <el-table-column
            prop="num"
            align="center"
            min-width="150"
          >
            <template slot="header">
              <span class="need">退货出库数量</span>
             </template>
            <template slot-scope="scope">
              <el-input-number v-model.trim="scope.row.num" :min="1" :max="scope.row.returnNum" :controls="false" clearable style="width: 100%"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            label="批次号"
            align="center"
            min-width="180"
          >
            <template slot-scope="scope">
              <el-input v-model.trim="scope.row.batchNo" clearable style="width: 100%"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="生产日期"
            align="center"
            min-width="150"
          >
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.productionDate"
                type="date"
                style="width: 100%"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="失效日期"
            align="center"
            min-width="150"
          >
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.overdueDate"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 100%"
                placeholder="选择日期">
              </el-date-picker>
            </template>
          </el-table-column>
        </JFX-table>
      </el-form>
      <div class="mr-t-30 flex-c-c">
        <el-button type="primary" @click="save" :loading="saveLoading" id="save_chuku">保 存</el-button>
        <el-button id="cancle_chuku" @click="closeTag">取 消</el-button>
      </div>
    </div>
</template>
<script>
import commomMix from '@m/index'
import { getReturnOrderDetail, purchaseReturnDelivery } from '@a/purchaseManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      breadcrumb: [{
        path: '', meta: { title: '采购退货列表' }
      },
      {
        path: '', meta: { title: '打托出库' }
      }],
      ruleForm: {
        returnOutDate: ''
      },
      rules: {
        returnOutDate: [
          { required: true, message: '请选择出库时间', trigger: 'change' }
        ]
      },
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      detail: {},
      saveLoading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      try {
       const res = await getReturnOrderDetail({ id: query.id })
       this.detail = res.data
       if (this.detail.itemList) {
        this.tableData.list = this.detail.itemList.map(item => {
          const { returnNum = 1, batchNo = '' } = item
          return {
            ...item,
            num: returnNum,
            batchNo,
            productionDate: '',
            overdueDate: ''
          }
        })
       }
      } catch (err) {
        console.log(err)
      }
    },
    save() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          const kk = this.tableData.list.find(item => !item.num || item <= 0)
          if (kk) {
            this.$errorMsg(`商品货号:${kk.goodsNo}退货出库数量必须大于0`)
            return false
          }
          const opt = {
            returnOutDate: this.ruleForm.returnOutDate,
            purchaseReturnId: this.detail.id
          }
          const itemList = this.tableData.list.map(item => {
            const { goodsNo, goodsId, num, batchNo, productionDate, overdueDate } = item
            return { goodsNo, goodsId, num, batchNo, productionDate, overdueDate }
          })
          opt.itemList = JSON.stringify(itemList)
          this.saveLoading = true
          try {
            await purchaseReturnDelivery(opt)
            this.$successMsg('保存成功', () => {
              this.closeTag()
            })
          } catch (err) {
            console.log(err)
          }
          this.saveLoading = false
        }
      })
    }
  }
}
</script>
<style>
  .edit-bx .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 130px;
}
.edit-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
<style lang="scss" scoped>
.image-preview{
  display: inline-block;
}
.title-bx{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.last-bx{
  position: relative;
}
.tongji-item{
  display: inline-block;
  position: absolute;
  top: -50px;
  left: 70px;
  z-index: 120;
}
</style>
