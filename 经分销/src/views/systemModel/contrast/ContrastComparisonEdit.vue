<template>
  <!-- 爬虫商品对照新增/编辑 -->
  <div class="page-bx bgc-w edit-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" />
    <el-form :model="formData" ref="formData" :rules="rules">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="平台名称：" prop="platformName">
            <el-input v-model.trim="formData.platformName" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="平台用户名：" prop="platformUsername">
            <el-input v-model.trim="formData.platformUsername" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="公司：" prop="merchantId">
            <el-select
                v-model="formData.merchantId"
                placeholder="请选择"
                clearable
                filterable
                @change="merchantChange"
                :data-list="getSelectMerchantBean('merchantList')"
              >
                <el-option
                  v-for="item in selectOpt.merchantList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="事业部：" prop="buId" ref="buId">
            <el-select
              v-model="formData.buId"
              placeholder="请选择"
              filterable
              clearable
            >
              <el-option
                v-for="item in buList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="爬虫商品货号：" prop="crawlerGoodsNo">
            <el-input v-model.trim="formData.crawlerGoodsNo" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="爬虫商品名称：" prop="crawlerGoodsName">
            <el-input v-model.trim="formData.crawlerGoodsName" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="状态：" prop="status">
            <el-select v-model="formData.status"
                       placeholder="请选择"
                       clearable
                       filterable
                       :data-list="getSelectList('merchandiseContrast_statusList')">
              <el-option
                v-for="item in selectOpt.merchandiseContrast_statusList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="平台类型：" prop="type">
            <el-select v-model="formData.type"
                       placeholder="请选择"
                       clearable
                       filterable
                       :data-list="getSelectList('merchandiseContrast_typeList')">
              <el-option
                v-for="item in selectOpt.merchandiseContrast_typeList"
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
    <el-tabs v-model="activeName" class="mr-t-15">
      <el-tab-pane label="商品信息" name="1">
        <el-button type="primary" @click="showModal">选择商品</el-button>
        <JFX-table :tableData.sync="tableData"
                   :showPagination="false">
          <el-table-column align="center"
                          prop="goodsNo"
                          min-width="120"
                          label="商品货号"
                          show-overflow-tooltip
          ></el-table-column>
          <el-table-column align="center"
                          prop="goodsName"
                          min-width="120"
                          label="商品名称"
                          show-overflow-tooltip
          ></el-table-column>
          <el-table-column align="center"
                          prop="barcode"
                          min-width="120"
                          label="条形码"
                          show-overflow-tooltip
          ></el-table-column>
          <el-table-column align="center"
                          width="200">
            <template slot="header">
              <span class="need">数量</span>
            </template>
            <template slot-scope="{row}">
              <el-input-number v-model.trim="row.num" :precision="0" :controls="false" :min="0" label="必填" style="width: 100%" />
            </template>
          </el-table-column>
          <el-table-column align="center"
                          width="200">
            <template slot="header">
              <span class="need">销售标准单价</span>
            </template>
            <template slot-scope="{row}">
              <el-input-number v-model.trim="row.price" :precision="4" v-max-spot="4" :controls="false" :min="0" label="必填" style="width: 100%" />
            </template>
          </el-table-column>
          <el-table-column align="center"
                          width="100"
                          label="操作">
            <template slot-scope="{$index}">
              <el-button type="text" @click="delTableItem($index)">删除</el-button>
            </template>
          </el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="变更记录" name="2" v-if="$route.query.id">
        <JFX-table :tableData.sync="historyList"
                  :showPagination="false">
          <el-table-column align="center"
                          prop="goodsNo"
                          min-width="120"
                          label="商品货号"
                          show-overflow-tooltip
          ></el-table-column>
          <el-table-column align="center"
                          prop="goodsName"
                          min-width="120"
                          label="商品名称"
                          show-overflow-tooltip
          ></el-table-column>
          <el-table-column align="center"
                          prop="barcode"
                          min-width="120"
                          label="条形码"
                          show-overflow-tooltip
          ></el-table-column>
          <el-table-column align="center"
                          prop="num"
                          width="80"
                          label="数量"
                          show-overflow-tooltip
          ></el-table-column>
          <el-table-column align="center"
                          prop="price"
                          width="120"
                          label="销售标准单价"
                          show-overflow-tooltip
          ></el-table-column>
          <el-table-column align="center"
                          prop="editor"
                          width="120"
                          label="修改人"
                          show-overflow-tooltip
          ></el-table-column>
          <el-table-column align="center"
                          prop="createDate"
                          width="150"
                          label="修改时间"
                          show-overflow-tooltip
          ></el-table-column>
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 商品信息 end -->
    <!-- 底部按钮 -->
    <div class="mr-t-30 flex-c-c">
      <el-button @click="submitForm" type="primary" :loading="saveBtnLoading">保 存</el-button>
      <el-button @click="closeTag">取 消</el-button>
    </div>
    <!-- 底部按钮 end -->
    <!-- 选择商品 -->
    <ChooseGoods v-if="visible.show"
                 :isVisible.sync="visible"
                 :filterData="filterData"
                 @comfirm="chooseGoods"
    ></ChooseGoods>
    <!-- 选择商品 -->
  </div>
</template>

<script>
import ChooseGoods from './components/ChooseGoods'
import commomMix from '@m/index'
import {
  toContrastEditPage,
  saveContrast
} from '@a/contrast'
import {
  getBUSelectBean
} from '@a/base'
export default {
  mixins: [commomMix],
  components: {
    ChooseGoods
  },
  data() {
    return {
      // 基本信息
      formData: {
        platformName: '',
        platformUsername: '',
        merchantId: '',
        merchantName: '',
        buId: '',
        buName: '',
        crawlerGoodsNo: '',
        crawlerGoodsName: '',
        status: '',
        type: ''
      },
      // 表单校验规则
      rules: {
        platformName: { required: true, message: '请输入平台名称', trigger: 'blur' },
        platformUsername: { required: true, message: '请输入平台用户名', trigger: 'blur' },
        merchantId: { required: true, message: '请选择公司', trigger: 'change' },
        buId: { required: true, message: '请选择事业部', trigger: 'change' },
        crawlerGoodsNo: { required: true, message: '请输入爬虫商品货号', trigger: 'blur' },
        crawlerGoodsName: { required: true, message: '请输入爬虫商品名称', trigger: 'blur' },
        status: { required: true, message: '请选择状态', trigger: 'change' },
        type: { required: true, message: '请选择平台类型', trigger: 'change' }
      },
      activeName: '1',
      // 选择商品组件的参数
      filterData: {},
      saveBtnLoading: false,
      // 面包屑数据
      breadcrumb: this.$route.query.id ? [
        {path: '', meta: { title: '爬虫配置' }},
        {path: '/contrast/ContrastComparisonList', meta: { title: '爬虫商品对照表' }},
        {path: `/contrast/ContrastComparisonEdit/${this.$route.query.id}`, meta: { title: '爬虫商品对照编辑' }}
      ] : [
        {path: '', meta: { title: '爬虫配置' }},
        {path: '/contrast/ContrastComparisonList', meta: { title: '爬虫商品对照表' }},
        {path: `/contrast/ContrastComparisonAdd`, meta: { title: '爬虫商品对照新增' }}
      ],
      buList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id } = this.$route.query
      if (id) {
        try {
          const { data: { merchandiseContrastDTO, itemModel } } = await toContrastEditPage({ id })
          for (const key in this.formData) {
            this.formData[key] = merchandiseContrastDTO[key] ? merchandiseContrastDTO[key] + '' : ''
          }
          const { merchantId } = this.formData
          if (merchantId) {
            const { data } = await getBUSelectBean({ merchantId })
            const list = data && data.length && data.map(item => ({
              key: item.value,
              value: item.label
            }))
            this.buList = list || []
          } else {
            this.buList = []
          }
          if (itemModel && itemModel.length) {
            const goodslist = itemModel.map(item => ({
              goodsId: item.id ? item.id + '' : '',
              goodsName: item.goodsName || '',
              goodsNo: item.goodsNo || '',
              barcode: item.barcode || '',
              num: item.num,
              price: item.price
            }))
            this.tableData.list = goodslist
          }
        } catch (error) {
          this.$errorMsg(error.message)
        }
      }
    },
    // 提交表单
    submitForm() {
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          // 校验商品
          const flag = this.checkGoods()
          if (!flag) return false

          // 商品列表
          const itemList = this.tableData.list.map(item => ({
            goodsId: item.goodsId ? item.goodsId + '' : '',
            goodsName: item.goodsName || '',
            goodsNo: item.goodsNo || '',
            barcode: item.barcode || '',
            num: item.num + '',
            price: item.price + ''
          }))

          // 获取公司名和事业部名称
          const merchant = this.selectOpt.merchantList.find(item => item.key === this.formData.merchantId)
          const bu = this.buList.find(item => item.key === this.formData.buId)
          this.formData.merchantName = merchant ? merchant.value : ''
          this.formData.buName = bu ? bu.value : ''
          // 请求参数
          const params = {
            ...this.formData,
            id: this.$route.query.id ? this.$route.query.id + '' : '',
            itemList
          }
          const json = JSON.stringify(params)
          try {
            this.saveBtnLoading = true
            await saveContrast({ json })
            this.$successMsg('操作成功')
            this.closeTag()
          } catch (error) {
            this.$errorMsg(error.message)
          }
          this.saveBtnLoading = false
        }
      })
    },
    // 校验商品
    checkGoods() {
      let flag = true
      if (!this.tableData.list.length) {
        this.$errorMsg('至少选择一个商品')
        flag = false
        return flag
      }
      for (let i = 0; i < this.tableData.list.length; i++) {
        const item = this.tableData.list[i]
        if (item.num === undefined || item.num === null) {
          this.$errorMsg(`商品表格第${i + 1}行，数量不能为空`)
          flag = false
          break
        }
        if (item.price === undefined || item.price === null) {
          this.$errorMsg(`商品表格第${i + 1}行，销售标准单价不能为空`)
          flag = false
          break
        }
      }
      return flag
    },
    // 显示选择商品弹窗
    showModal() {
      if (!this.formData.merchantId) {
        return this.$errorMsg('请先选择公司！')
      }
      this.filterData = {
        merchantId: this.formData.merchantId,
        productRestriction: 2,
        popupType: 6
      }
      if (this.tableData.list.length) {
        const unNeedIds = this.tableData.list.map(item => item.goodsId).toString()
        this.filterData['unNeedIds'] = unNeedIds
      }
      this.visible.show = true
    },
    // 确认选择商品
    chooseGoods(data) {
      if (data && data.length) {
        const goodslist = data.map(item => ({
          goodsId: item.id ? item.id + '' : '',
          goodsName: item.name || '',
          goodsNo: item.goodsNo || '',
          barcode: item.barcode || '',
          num: 0,
          price: 0
        }))
        this.tableData.list.push(...goodslist)
      }
      this.visible.show = false
    },
    // 公司改变
    async merchantChange(merchantId) {
      this.$refs['buId'].resetField()
      if (merchantId) {
        const { data } = await getBUSelectBean({ merchantId })
        const list = data && data.length && data.map(item => ({
          key: item.value,
          value: item.label
        }))
        this.buList = list || []
      } else {
        this.buList = []
      }
    },
    // 删除表格行
    delTableItem(index) {
      this.$showToast('确定删除吗？', () => {
        this.tableData.list.splice(index, 1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.edit-bx .el-form-item__label {
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
/deep/.edit-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.title-bx{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
