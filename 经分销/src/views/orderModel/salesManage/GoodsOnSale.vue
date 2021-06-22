<template>
  <!-- 上架商品页面 -->
  <div class="page-bx bgc-w sales-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" />
    <el-row :gutter="10" class="fs-14 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        销售订单编号：{{detail.code || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        出仓仓库：{{detail.outDepotName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户：{{detail.customerName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        销售出库单号：{{detail.saleOutDepotCode || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        销售类型：{{detail.businessModelLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        入库仓库：{{detail.inDepotName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        po单号：{{detail.poNo || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        预申报单号：{{detail.saleDeclareOrderCode || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 商品上架信息 -->
    <JFX-title title="商品上架信息" />
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="本次上架PO号：" prop="poNo">
            <el-select
              v-model="ruleForm.poNo"
              placeholder="请选择"
              clearable
              filterable
              @change="poNoChange"
              style="width: 350px"
            >
              <el-option
                v-for="item in poList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item>
            <span style="color: red">提示：仅单PO上架 </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="本次上架时间：" prop="shelfDate" ref="shelfDate">
            <el-date-picker
              v-model="ruleForm.shelfDate"
              value-format="yyyy-MM-dd"
              type="date"
              style="width: 350px"
              placeholder="选择日期时间"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item>
            <el-button type="primary" @click="allUp">整单上架</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="上传理货报告 ：">
          <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
            <el-button id="sale-upload-btn" type="primary">上传理货报告</el-button>
          </JFX-upload>
        </el-form-item>
      </el-row>
    </el-form>
    <JFX-table :tableData.sync="tableData"
               :showPagination="false"
               :summary-method="getSummaries"
               showSummary
               @selection-change="selectionChange">
    <el-table-column type="selection"
                      align="center"
                      width="55"
    ></el-table-column>
    <el-table-column prop="goodsNo"
                      align="center"
                      label="商品货号"
                      width="120"
                      show-overflow-tooltip
    ></el-table-column>
    <el-table-column prop="goodsName"
                      align="center"
                      label="商品名称"
                      min-width="120"
                      show-overflow-tooltip
    ></el-table-column>
    <el-table-column prop="barcode"
                      align="center"
                      label="条码"
                      width="120"
                      show-overflow-tooltip
    ></el-table-column>
    <el-table-column align="center"
                     width="120"
                     label="海外仓理货单位"
                     show-overflow-tooltip>
      <template slot-scope="{row}">
        {{row.rowtallyingUnit === '00' ? '托盘': row.rowtallyingUnit === '01' ? '箱': row.rowtallyingUnit === '02' ? '件': '' }}
      </template>
    </el-table-column>
    <el-table-column prop="num"
                      align="center"
                      label="出库数量"
                      width="100"
                      show-overflow-tooltip
    ></el-table-column>
    <el-table-column prop="totalShelfNum"
                      align="center"
                      label="已上架量"
                      width="100"
                      show-overflow-tooltip
    ></el-table-column>
    <el-table-column prop="totalDamagedNum"
                      align="center"
                      label="已计残损量"
                      width="100"
                      show-overflow-tooltip
    ></el-table-column>
    <el-table-column prop="totalLackNum"
                      align="center"
                      label="已计少货量"
                      width="100"
                      show-overflow-tooltip
    ></el-table-column>
    <el-table-column prop="stayShelfNum"
                      align="center"
                      label="待上架数量"
                      width="100"
                      show-overflow-tooltip
    ></el-table-column>
      <el-table-column align="center"
                       prop="shelfNum"
                       width="120">
        <template slot="header">
          <span class="need">本次上架数量</span>
        </template>
        <template slot-scope="{row}">
          <el-input-number v-model.trim="row.shelfNum" :precision="0" :controls="false" :min="0" label="必填" style="width: 100%;" :disabled="row.stayShelfNum === 0" />
        </template>
      </el-table-column>
      <el-table-column align="center"
                        width="120"
                        label="本次残损数量"
                        prop="damagedNum">
        <template slot-scope="{row}">
          <el-input-number v-model.trim="row.damagedNum" :precision="0" :controls="false" :min="0" label="必填" style="width: 100%;" :disabled="row.stayShelfNum === 0" />
        </template>
      </el-table-column>
      <el-table-column align="center"
                        width="120"
                        label="本次少货数量"
                        prop="lackNum">
        <template slot-scope="{row}">
          <el-input-number v-model.trim="row.lackNum" :precision="0" :controls="false" :min="0" label="必填" style="width: 100%;" :disabled="row.stayShelfNum === 0" />
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="备注"
                       min-width="180">
        <template slot-scope="{row}">
          <el-input v-model.trim="row.remark" clearable />
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 商品上架信息 end -->
    <!-- 附件列表 -->
    <JFX-title title="附件列表" />
    <EnclosureList :code="detail.code" v-if="detail.code" ref="enclosure"></EnclosureList>
    <!-- 附件列表 end -->
    <!-- 底部按钮 -->
    <div class="mr-t-30 flex-c-c">
      <el-button @click="handleSubmit" type="primary">保 存</el-button>
      <el-button @click="closeTag">取 消</el-button>
    </div>
    <!-- 底部按钮 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import { getBaseUrl } from '@u/tool'
import {
  attachmentUploadFiles
} from '@a/base/index'
import {
  toSaleShelfPage,
  saveSaleShelf,
  getListByPoNo
} from '@a/salesManage'
export default {
  mixins: [commomMix],
  components: {
    EnclosureList: () => import('@c/enclosureList/index')
  },
  data() {
    return {
      // 详情数据
      detail: {},
      // po号下拉列表
      poList: [],
      // 表单数据
      ruleForm: {
        poNo: '',
        shelfDate: ''
      },
      // 表单校验规则
      rules: {
        poNo: { required: true, message: '请选择本次上架PO号', trigger: 'change' },
        shelfDate: { required: true, message: '请选择本次上架时间', trigger: 'change' }
      },
      // 选择商品组件显示
      chooseGoodsVisible: { show: false },
      // 上传附件的url
      action: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id, saleOutCode } = this.$route.query
      if (!id) return false
      const { data: { saleOrderDTO, poList, shelfList } } = await toSaleShelfPage({ id, saleOutCode })
      if (poList && poList.length) {
        this.poList = poList.map(item => ({
          key: item,
          value: item
        }))
      }
      this.detail = saleOrderDTO || {}
      this.tableData.list = shelfList || []
      // 上传附件的url
      this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.detail.code || ''
    },
    // 整单上架
    allUp() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条数据！')
        return false
      }
      this.tableChoseList.forEach(item => {
        item.shelfNum = item.stayShelfNum
        item.damagedNum = 0
        item.lackNum = 0
      })
    },
    // po号改变
    async poNoChange(poNo) {
      const { data } = await getListByPoNo({ code: this.detail.code, poNo })
      if (data && data.length) {
        this.tableData.list = this.tableData.list.map(item => {
          this.ruleForm.shelfDate = data[0].deliverDate ? data[0].deliverDate.slice(0, 10) : this.$refs['shelfDate'].resetField()
          const target = data.find(subItem => subItem.platformBarcode.indexOf(item.barcode) >= 0)
          return {
            ...item,
            shelfNum: item.num === item.totalShelfNum ? 0 : target ? target.receiptOkNum : 0,
            damagedNum: target ? target.receiptBadNum : 0,
            lackNum: 0
          }
        })
      } else {
        this.tableData.list = this.tableData.list.map(item => ({
          ...item,
          shelfNum: 0,
          damagedNum: 0,
          lackNum: 0
        }))
      }
    },
    // 上传理货报告
    successUpload(res) {
      if (res.code + '' === '10000') {
        this.$refs['enclosure'].getEnclosureList(1)
      } else {
        this.$errorMsg(res.message)
      }
    },
    // 提交表单
    handleSubmit() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          // if (this.tableChoseList.length < 1) {
          //   this.$errorMsg('至少选择一条数据！')
          //   return false
          // }
          const target = this.tableData.list.some(item => !item.shelfNum || !item.damagedNum || !item.lackNum)
          if (!target) {
            this.$errorMsg(`至少有一行商品本次上架数量|本次残损数量|本次少货数量必须有一个大于0`)
            return false
          }
          const itemList = this.tableData.list.map(item => ({
            orderType: item.orderType || '',
            goodsId: item.goodsId ? item.goodsId.toString() : '',
            goodsNo: item.goodsNo || '',
            goodsName: item.goodsName || '',
            barcode: item.barcode || '',
            tallyingUnit: item.tallyingUnit || '',
            num: item.num ? item.num.toString() : '0',
            shelfNum: item.shelfNum ? item.shelfNum.toString() : '0',
            damagedNum: item.damagedNum ? item.damagedNum.toString() : '0',
            lackNum: item.lackNum ? item.lackNum.toString() : '0',
            remark: item.remark || '',
            commbarcode: item.commbarcode || ''
          }))
          // 请求参数
          const params = {
            ...this.ruleForm,
            code: this.detail.code,
            saleOutCode: this.$route.query.saleOutCode,
            saleOutId: this.$route.query.saleOutId,
            itemList
          }
          const json = JSON.stringify(params)
          try {
            const { data: { state } } = await saveSaleShelf({ json })
            // 部分上架
            if (state === '031') {
              this.$successMsg('上架成功')
              this.init()
            } else {
              this.$successMsg('操作成功')
              this.closeTag()
            }
          } catch (error) {
            console.log(error)
          }
        } else {
          this.$errorMsg('请正确填写表单必填项')
        }
      })
    },
    // 计算总和
    getSummaries({ columns, data }) {
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '汇总'
          return false
        }
        if (index === 2 || index === 3) {
          sums[index] = ''
          return false
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })
      return sums
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.sales-bx .el-form-item__label {
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
</style>
