<template>
    <div class="page-bx bgc-w edit-bx">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
        <!-- 面包屑 -->
        <JFX-Breadcrumb :showGoback="true" :breadcrumb="breadcrumb" />
        <!-- 面包屑 end -->
        <!-- title -->
        <JFX-title title="基本信息" className="mr-t-10" />
        <el-row  :gutter="10" class="fs-12 clr-II detail-row">
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
            调拨订单编号：{{detail.code || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
            调出仓库：{{detail.outDepotName || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
            调入仓库：{{detail.inDepotName || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
            事业部：{{detail.buName || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
            创建人：{{detail.createUsername || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
           提交时间：{{detail.submitTime || '- -'}}
          </el-col>
        </el-row>
        <JFX-title title="出库信息" className="mr-t-10" />
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="出库时间：" prop="transferOutDate" >
              <el-date-picker
                v-model="ruleForm.transferOutDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="附件上传：" >
             <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
              <el-button id="sale-upload-btn" type="primary">上传理货报告</el-button>
             </JFX-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="mr-t-20">
          <el-col :span="24" >
            <el-button type="primary" :size="'small'" @click="allDaTuo" >整批打托</el-button>
          </el-col>
        </el-row>
        <div class="mr-t-20"></div>
        <!-- 表格 -->
        <JFX-table
          :tableData.sync="tableData"
          @selection-change="selectionChange"
          :showPagination="false"
        >
          <el-table-column type="selection" width="50" label="序号" align="center" fixed="left"></el-table-column>
          <el-table-column prop="outGoodsNo" label="商品货号" align="center" min-width="140" fixed="left"></el-table-column>
          <el-table-column prop="outGoodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="outBarcode" label="条形码" align="center" min-width="130" show-overflow-tooltip></el-table-column>
          <el-table-column prop="outUnit" label="海外仓理货单位" align="center" min-width="110">
            <template slot-scope="scope">
               {{scope.row.outUnit | outUnitFilter}}
            </template>
          </el-table-column>
          <el-table-column prop="outTransferNum" label="计划调出量" align="center" min-width="90"></el-table-column>
          <el-table-column prop="num" align="center" min-width="100">
            <template slot="header">
              <span class="need">出库好品量</span>
             </template>
            <template slot-scope="scope">
              <el-input-number v-model.trim="scope.row.transferNum" :min="0"  :precision="0" :controls="false" style="width: 100%"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="wornNum" align="center" min-width="100">
            <template slot="header">
              <span class="need">出库坏品量</span>
             </template>
            <template slot-scope="scope">
              <el-input-number v-model.trim="scope.row.wornNum" :min="0"  :precision="0" :controls="false" style="width: 100%"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="批次号" align="center" min-width="130">
            <template slot-scope="scope">
              <el-input v-model.trim="scope.row.batchNo" clearable style="width: 100%"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="生产日期" align="center" min-width="145">
            <template slot-scope="scope">
              <el-date-picker
                style="width: 100%"
                v-model="scope.row.productionDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="失效日期" align="center" min-width="145">
            <template slot-scope="scope">
              <el-date-picker
                style="width: 100%"
                v-model="scope.row.overdueDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
          </el-table-column>
        </JFX-table>
        <!-- 表格 end-->
        <div class="mr-t-30"></div>
        <JFX-title title="附件列表" className="mr-t-20" />
        <enclosure-list :code="detail.code" v-if="detail.code" ref="enclosure"></enclosure-list>
        <!-- 表格 end-->
      </el-form>
      <div class="mr-t-30 flex-c-c">
        <el-button type="primary" @click="save" :loading="saveLoading">保 存</el-button>
        <el-button @click="closeTag">取 消</el-button>
      </div>
    </div>
</template>
<script>
import commomMix from '@m/index'
import { getTransferOrderDetail, isExistTransferOutOrInOrder, validOutDepotDate, saveTransferOutDepot } from '@a/transferManage/index'
import { getBaseUrl } from '@u/tool'
import { attachmentUploadFiles } from '@a/base/index'
export default {
  mixins: [commomMix],
  components: {
    enclosureList: () => import('@c/enclosureList/index')
  },
  data() {
    return {
      breadcrumb: [{
        path: '', meta: { title: '调拨管理' }
      },
      {
        path: '', meta: { title: '打托出库' }
      }],
      ruleForm: {
        transferOutDate: ''
      },
      rules: {
        transferOutDate: [
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
      tableData1: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      visible: { show: false },
      detail: {},
      action: '',
      saveLoading: false
    }
  },
  filters: {
   outUnitFilter(val) {
     switch (val) {
       case '00': return '托盘'
       case '01': return '箱'
       case '02': return '件'
       default: return ''
     }
   }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    comfirm() {},
    // 上传成功
    successUpload(res) {
      if (res.code + '' === '10000') {
        this.$refs['enclosure'].getEnclosureList(1)
      } else {
        this.$errorMsg(res.message)
      }
    },
    async getDetail() {
      const { query } = this.$route
      if (!query.id) return false
      const res = await getTransferOrderDetail({ id: query.id })
      this.detail = res.data || {}
      this.tableData.list = []
      if (this.detail.orderItemDTOS) {
        this.detail.orderItemDTOS.map(item => {
          const { transferNum, outGoodsNo, outGoodsId, outGoodsName, outBarcode, outUnit, wornNum = '', batchNo = '', productionDate = '', overdueDate = '', tallyingUnit = '' } = item
          this.tableData.list.push({
            outGoodsNo,
            outGoodsName,
            outBarcode,
            outUnit,
            wornNum,
            batchNo,
            productionDate,
            overdueDate,
            tallyingUnit,
            outGoodsId,
            outTransferNum: transferNum,
            goodsNo: outGoodsNo,
            barcode: outBarcode,
            transferNum: ''
          })
        })
      }
      this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.detail.code
    },
    // 整批打托
    allDaTuo() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条数据！')
        return false
      }
      this.tableChoseList.map(item => {
        item.transferNum = item.outTransferNum
      })
    },
    // 保存
    async save() {
      if (!this.ruleForm.transferOutDate) {
        this.$errorMsg('出库时间不能为空')
        return false
      }
      this.saveLoading = true
      let flag = true
      // 出库时间限制
      try {
        const res = await validOutDepotDate({ id: this.detail.id, transferOutDate: this.ruleForm.transferOutDate })
        if (res.data.code !== '00') {
          this.$errorMsg(res.data.message)
          throw new Error(false)
        }
      } catch (error) {
        flag = false
        this.saveLoading = false
      }
      if (!flag) return false
      // 查询调拨订单是否出库或入库
      try {
        const res = await isExistTransferOutOrInOrder({ id: this.detail.id, orderType: '0' })
        if (res.data.code !== '00') {
          this.$errorMsg(res.data.message)
          throw new Error(false)
        }
      } catch (error) {
        flag = false
        this.saveLoading = false
      }
      if (!flag) return false
      const goodsList = []
      const goodNos = []
      // 表格数据校验
      for (let i = 0; i < this.tableData.list.length; i++) {
        const {wornNum, transferNum, outGoodsId, outGoodsNo, outGoodsName, tallyingUnit, barcode, outTransferNum} = this.tableData.list[i]
        const tips = `表格第${i + 1}行, `
        if (transferNum !== 0 && !transferNum) {
          flag = false
          this.$errorMsg(tips + '出库好品量不能为空')
          return false
        }
        if (wornNum !== 0 && !wornNum) {
          flag = false
          this.$errorMsg(tips + '出库坏品量不能为空')
          return false
        }
        if (parseInt(transferNum) + parseInt(wornNum) !== parseInt(outTransferNum)) {
          goodNos.push(outGoodsNo)
        }
        if (!(transferNum === 0 && wornNum === 0)) {
          goodsList.push({ wornNum, transferNum, outGoodsId, outGoodsNo, outGoodsName, tallyingUnit, barcode })
        }
      }
      if (goodsList.length < 1) {
        flag = false
        this.$errorMsg('上架商品至少存在一个出库量')
      }
      if (!flag) {
        this.saveLoading = false
        return false
      }
      const opt = {
        transferOrderId: this.detail.id,
        transferOutDate: this.ruleForm.transferOutDate,
        goodsList
      }
      if (goodNos.length > 0) {
        this.$confirm(`货号:${goodNos.join(',')},上架总量不等于计划调出量，请确认是否提交?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await saveTransferOutDepot({json: JSON.stringify(opt)})
          this.$successMsg('保存成功')
          this.saveLoading = false
          this.closeTag()
        }).catch(() => {
          this.saveLoading = false
        })
      } else {
        try {
          await saveTransferOutDepot({json: JSON.stringify(opt)})
          this.$successMsg('保存成功')
          this.closeTag()
        } catch (error) {
          console.log(error)
        }
        this.saveLoading = false
      }
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
.upload-bx{
  width: 100%;
  height: 3px;
  overflow: hidden;
  opacity: 0;
}
</style>
