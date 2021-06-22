<template>
  <!-- 协议单价新增页面 -->
  <div class="page-bx bgc-w sales-add-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" />
    <el-form :model="baseForm" ref="baseForm" :rules="rules">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="移入事业部：" prop="inBuId">
            <el-select
              v-model="baseForm.inBuId"
              placeholder="请选择"
              clearable
              filterable
              :data-list="getBUSelectBean('inBusinessList')"
            >
              <el-option
                v-for="item in selectOpt.inBusinessList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="移出事业部：" prop="outBuId">
            <el-select
              v-model="baseForm.outBuId"
              placeholder="请选择"
              clearable
              filterable
              :data-list="getBUSelectBean('outBusinessList')"
            >
              <el-option
                v-for="item in selectOpt.outBusinessList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="协议币种：" prop="currency">
            <el-select
              v-model="baseForm.currency"
              placeholder="请选择"
              clearable
              filterable
              :data-list="getSelectList('currencyCodeList')"
            >
              <el-option
                v-for="item in selectOpt.currencyCodeList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 基本信息 end -->
    <!-- 商品信息 -->
    <JFX-title title="商品信息" style="display: inline-block">
      <div style="float: right">
        <el-button type="primary" @click="showModal">选择商品</el-button>
        <el-button type="primary" @click="removeTableItem">删除</el-button>
      </div>
    </JFX-title>
    <JFX-table :tableData.sync="tableData"
               @selection-change="selectionChange"
               :showPagination="false">
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="goodsCode"
                       align="center"
                       label="商品货号"
                       width="140"
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
                       label="条形码"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="brandName"
                       align="center"
                       label="品牌"
                       width="150"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center"
                       width="150"
                       label="协议单价">
        <template slot-scope="{row}">
          <el-input-number v-model.trim="row.price" :precision="2" :controls="false" :min="0" label="必填" style="width: 100%;" />
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 商品信息 end -->
    <!-- 底部按钮 -->
    <div class="mr-t-30 flex-c-c">
      <el-button @click="handleSubmit" type="primary" :loading="saveBtnLoading">保 存</el-button>
      <el-button @click="closeTag">取 消</el-button>
    </div>
    <!-- 底部按钮 end -->
    <!-- 选择商品 -->
    <AgreementChooseGoods v-if="visible.show"
                  :isVisible.sync="visible"
                  :filterData="filterData"
                  @comfirm="chooseGoods"></AgreementChooseGoods>
    <!-- 选择商品 -->
  </div>
</template>

<script>
import AgreementChooseGoods from './components/AgreementChooseGoods'
import commomMix from '@m/index'
import { addAgreementCurrency } from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  components: {
    AgreementChooseGoods
  },
  data() {
    return {
      // 基本信息
      baseForm: {
        inBuId: '',
        outBuId: '',
        currency: ''
      },
      // 表单校验
      rules: {
        inBuId: { required: true, message: '请选择移入事业部', trigger: 'change' },
        outBuId: { required: true, message: '请选择移出事业部', trigger: 'change' },
        currency: { required: true, message: '请选择协议币种', trigger: 'change' }
      },
      // 选择商品参数
      filterData: {},
      // 保存按钮提交状态
      saveBtnLoading: false,
      // 公司id
      merchantId: '',
      // 公司名
      merchantName: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const userInfo = this.getUserInfo()
      this.merchantName = userInfo.merchantName || ''
      this.merchantId = userInfo.merchantId || ''
    },
    // 提交表单
    handleSubmit() {
      this.$refs['baseForm'].validate(valid => {
        if (valid) {
          // 至少选择一个商品
          if (!this.tableData.list.length) {
            return this.$errorMsg('至少选择一个商品!')
          }

          // 移入/移出事业部不能选择一样
          if (this.baseForm.inBuId === this.baseForm.outBuId) {
            return this.$errorMsg('移入/移出事业部不能选择一样')
          }

          // 商品的协议单价必须是大于0的数
          let flag = true
          this.tableData.list.forEach(item => {
            if (!item.price && item.price < 0) {
              flag = false
              return this.$errorMsg('协议单价必须是大于0的数')
            }
          })
          if (!flag) return false

          // 获取退入和退出事业部的名字
          const inBuName = this.selectOpt.inBusinessList.find(item => item.key === this.baseForm.inBuId).value
          const outBuName = this.selectOpt.outBusinessList.find(item => item.key === this.baseForm.outBuId).value
          const itemList = this.tableData.list.map(item => {
            return {
              goodsCode: item.goodsCode || '',
              goodsNo: item.goodsNo || '',
              goodsName: item.goodsName || '',
              barcode: item.barcode || '',
              brandName: item.brandName || '',
              price: item.price ? item.price + '' : '0',
              goodsId: item.goodsId + ''
            }
          })
          const params = {
            ...this.baseForm,
            inBuName,
            outBuName,
            merchantId: this.merchantId,
            merchantName: this.merchantName,
            itemList
          }
          const json = JSON.stringify(params)
          // 保存
          this.$showToast('确定保存该配置?', async() => {
            try {
              this.saveBtnLoading = true
              const res = await addAgreementCurrency({ json })
              this.$successMsg('操作成功')
              this.closeTag()
              console.log(res)
              this.saveBtnLoading = false
            } catch (error) {
              this.saveBtnLoading = false
            }
          })
        }
      })
    },
    showModal() {
      // 如果已经选中的商品则不出现在选择商品列表中
      const goodsIds = this.tableData.list.map(item => item.goodsId).toString()
      // 选择商品参数
      this.filterData = {
        popupType: 5,
        unNeedIds: goodsIds || '',
        merchantId: this.merchantId
      }
      this.visible.show = true
    },
    // 确定选择商品
    chooseGoods(goods) {
      if (goods.length) {
        const tempList = goods.map(item => {
          return {
            goodsId: item.id,
            goodsCode: item.goodsCode,
            goodsNo: item.goodsNo,
            goodsName: item.name,
            barcode: item.barcode,
            price: item.filingPrice + '',
            brandName: item.brandName
          }
        })
        this.tableData.list.push(...tempList)
      }
      this.visible.show = false
    },
    // 删除表格项
    removeTableItem() {
      const idList = this.tableChoseList.map(item => item.goodsId)
      const filterList = this.tableData.list.filter(item => !idList.includes(item.goodsId))
      this.tableData.list = filterList
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.sales-add-bx .el-form-item__label {
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
/deep/.sales-add-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
