<template>
    <div class="page-bx bgc-w edit-bx">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
        <!-- 面包屑 -->
        <JFX-Breadcrumb :showGoback="true" :breadcrumb="breadcrumb" />
        <!-- 面包屑 end -->
        <!-- title -->
        <JFX-title title="基本信息" className="mr-t-10" />
        <el-row  :gutter="10" class="fs-12 clr-II detail-row">
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
            预申报单号：{{detail.code || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
            入库仓库：{{detail.depotName || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
            PO号：{{detail.poNo || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
            事业部：{{detail.buName || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
           供应商：{{detail.supplierName || '- -'}}
          </el-col>
        </el-row>
        <JFX-title title="入库信息" className="mr-t-10" />
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="本次入库PO号：" required >
              <el-input v-model="detail.poNo" clearable style="width: 100%" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="本次入库时间：" prop="inboundDate" >
              <el-date-picker
                v-model="ruleForm.inboundDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="mr-t-20 mr-b-15">
          <el-button type="primary" @click="allIn">整托入库</el-button>
        </div>
        <!-- 表格 -->
        <JFX-table
          :tableData.sync="tableData"
          @selection-change="selectionChange"
          :showPagination="false"
          :showSummary="true"
          :summaryMethod="null"
        >
          <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column>
          <el-table-column label="商品货号" align="center" min-width="140" fixed="left">
            <template slot-scope="scope">{{scope.row.goodsNo}}</template>
          </el-table-column>
          <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="条形码" align="center" min-width="100">
            <template slot-scope="scope">{{scope.row.barcode}}</template>
          </el-table-column>
          <el-table-column prop="num" label="申报数量" align="center" min-width="80"></el-table-column>
          <!-- <el-table-column prop="unInwarehouseNum" label="待入库数量" align="center" min-width="90"></el-table-column> -->
          <el-table-column prop="normalNum" align="center" min-width="100">
            <template slot="header">
              <span class="need">好品数量</span>
             </template>
            <template slot-scope="scope">
              <el-input-number v-model.trim="scope.row.normalNum" :min="0" clearable :controls="false" style="width: 100%"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="wornNum" label="损货数量" align="center" min-width="100">
            <template slot="header">
              <span class="need">坏品数量</span>
             </template>
            <template slot-scope="scope">
              <el-input-number v-model.trim="scope.row.wornNum" :min="0" clearable :controls="false" style="width: 100%"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="expireNum" align="center" min-width="100">
            <template slot="header">
              <span class="need">过期数量</span>
             </template>
            <template slot-scope="scope">
              <el-input-number v-model.trim="scope.row.expireNum" :min="0" clearable :controls="false" style="width: 100%"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column  label="批次号" align="center" min-width="130">
             <template slot-scope="scope">
              <el-input v-model.trim="scope.row.batchNo" clearable style="width: 100%"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="生产日期" align="center" min-width="150">
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
          <el-table-column label="失效日期" align="center" min-width="150">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.overdueDate"
                type="date"
                style="width: 100%"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
          </el-table-column>
        </JFX-table>
        <!-- 表格 end-->
        <div class="last-bx fs-14 clr-II" v-if="tableData.list.length > 0">
          <span class="tongji-item">{{tableData.list.length}}个SKU</span>
        </div>
      </el-form>
      <div class="mr-t-30 flex-c-c">
        <el-button type="primary" @click="save" :loading="saveLoading">保 存</el-button>
        <el-button @click="closeTag">取 消</el-button>
      </div>
    </div>
</template>
<script>
import { declareDelivery, getDeclareDetail } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      breadcrumb: [{
        path: '', meta: { title: '采购预申报单' }
      },
      {
        path: '', meta: { title: '上架入库' }
      }],
      ruleForm: {
        inboundDate: ''
      },
      rules: {
        inboundDate: { required: true, message: '请选择入库时间', trigger: 'change' }
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
    comfirm() {},
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      try {
        const res = await getDeclareDetail({ id: query.id })
        res.data.itemList.forEach(item => {
          const { num } = item
          item.oldNum = num
          item.expireNum = 0
          item.wornNum = 0
          item.normalNum = 0
        })
        this.detail = res.data
        this.tableData.list = this.detail.itemList || []
      } catch (err) {}
    },
    async save() {
      if (!this.ruleForm.inboundDate) {
        this.$errorMsg('入库时间不能为空')
        return false
      }
      let flag = true
      let msgGoodsNo = ''
      const itemList = []
      for (let i = 0; i < this.tableData.list.length; i++) {
        const { normalNum, expireNum, oldNum, wornNum, goodsId, goodsNo, batchNo, productionDate, overdueDate } = this.tableData.list[i]
        const num = parseInt(normalNum) + parseInt(expireNum) + parseInt(wornNum)
        if (parseInt(oldNum) < parseInt(num)) {
          this.$errorMsg('商品货号：' + goodsNo + '入库数量不能超过申报数量')
          flag = false
          break
        }
        if (parseInt(oldNum) > parseInt(num)) {
          msgGoodsNo += goodsNo + ','
        }
        itemList.push({
          goodsId: goodsId + '',
          goodsNo: goodsNo + '',
          batchNo: batchNo || '',
          productionDate: productionDate || '',
          overdueDate: overdueDate || '',
          normalNum: normalNum || 0,
          expireNum: expireNum || 0,
          wornNum: wornNum || 0
        })
      }
      if (!flag) return false
      const opt = {
        declareOrderId: this.detail.id,
        inboundDate: this.ruleForm.inboundDate,
        itemList: itemList
      }
      if (msgGoodsNo.length > 0) {
        this.$confirm(msgGoodsNo + '货号入库总量不等于申报量，请确认是否提交', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          this.saveLoading = true
          try {
            await declareDelivery(opt)
            this.$successMsg('保存成功')
            this.closeTag()
          } catch (error) {
            if (error && error.data) {
              this.$errorMsg(error.data)
            }
            console.log(error)
          }
          this.saveLoading = false
        })
      } else {
        this.saveLoading = true
        try {
          await declareDelivery(opt)
          this.$successMsg('保存成功')
          this.closeTag()
        } catch (error) {
          if (error && error.data) {
            this.$errorMsg(error.data)
          }
          console.log(error)
        }
        this.saveLoading = false
      }
    },
    // 整托入库
    allIn() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      this.tableData.list.forEach(item => {
        const { id, num } = item
        const target = this.tableChoseList.find(gtem => +gtem.id === +id) || null
        if (target) {
          item.normalNum = num
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
