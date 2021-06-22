<template>
  <!-- 商品对照新增/编辑 -->
  <div class="page-bx bgc-w edit-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" />
    <el-form :model="formData" ref="formData" :rules="rules">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="店铺：" prop="shopId">
              <el-select
                v-model="formData.shopId"
                placeholder="可根据编码/名称查询"
                clearable
                filterable
                @change="shopListChange"
                remote
                :remote-method="remoteMethod"
                :disabled="$route.query.id"
              >
                <el-option
                  v-for="item in shopList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                >
                  {{item.label}}
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="公司：" prop="merchantId" ref="merchantId">
            <el-select v-model="formData.merchantId"
                       placeholder="请选择"
                       filterable
                       disabled
                       :data-list="getSelectMerchantBean('merchantList')">
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
          <el-form-item label="商品ID：" prop="skuId">
            <el-input v-model.trim="formData.skuId" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="商品名称：" prop="groupGoodsName">
            <el-input v-model.trim="formData.groupGoodsName" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="备注：" prop="remark">
            <el-input v-model.trim="formData.remark" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="状态：" prop="status">
            <el-select v-model="formData.status"
                       placeholder="请选择"
                       filterable
                       clearable
                       :data-list="getSelectList('groupMerchandiseContrast_statusList')">
              <el-option
                v-for="item in selectOpt.groupMerchandiseContrast_statusList"
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
      <el-tab-pane label="组合品信息" name="1">
        <el-button type="primary" @click="showModal" class="mr-b-15">选择商品</el-button>
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
                          prop="brandName"
                          min-width="120"
                          label="商品品牌"
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
              <el-input-number v-model.trim="row.price" :precision="4" v-max-spot="4" :controls="false" :min="0"  style="width: 100%" />
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
import { debounce } from '@u/tool'
import {
  getGroupMerchandiseContrastEdit,
  saveGroupMerchandiseContrast,
  modifyGroupMerchandiseContrast,
  getShop,
  validateShop
} from '@a/contrast'
export default {
  mixins: [commomMix],
  components: {
    ChooseGoods
  },
  data() {
    return {
      activeName: '1',
      // 基本信息
      formData: {
        shopName: '',
        skuId: '',
        merchantId: '',
        groupGoodsName: '',
        remark: '',
        status: '',
        shopId: ''
      },
      // 表单校验规则
      rules: {
        shopId: { required: true, message: '请选择店铺', trigger: 'change' },
        merchantId: { required: true, message: '请选择公司', trigger: 'change' },
        skuId: { required: true, message: '请输入商品ID', trigger: 'blur' },
        groupGoodsName: { required: true, message: '请输入商品名称', trigger: 'blur' },
        status: { required: true, message: '请选择状态', trigger: 'change' }
      },
      // 选择商品组件的参数
      filterData: {},
      // 按钮loading状态
      saveBtnLoading: false,
      // 店铺下拉列表
      shopList: [],
      // 店铺信息
      shopInfo: [],
      // 变更记录
      historyList: {
        list: []
      },
      // 面包屑数据
      breadcrumb: this.$route.query.id ? [
        {path: '', meta: { title: '爬虫配置' }},
        {path: '/contrast/ComparisonList', meta: { title: '商品对照表' }},
        {path: `/contrast/ComparisonEdit/${this.$route.query.id}`, meta: { title: '商品对照表编辑' }}
      ] : [
        {path: '', meta: { title: '爬虫配置' }},
        {path: '/contrast/ComparisonList', meta: { title: '商品对照表' }},
        {path: `/contrast/ComparisonAdd`, meta: { title: '商品对照表新增' }}
      ]
    }
  },
  activated() {
    this.init()
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.getShopList()
      const { id } = this.$route.query
      if (!id) return false
      try {
        const { data = {} } = await getGroupMerchandiseContrastEdit({ id })
        // 获取表单信息
        for (const key in this.formData) {
          this.formData[key] = data[key] ? data[key] + '' : ''
        }
        // 组合品信息列表
        if (data.detailList && data.detailList.length) {
          const goodslist = data.detailList.map(item => ({
            goodsId: item.goodsId ? item.goodsId + '' : item.id ? item.id + '' : '',
            goodsName: item.goodsName || '',
            goodsNo: item.goodsNo || '',
            barcode: item.barcode || '',
            brandName: item.brand ? item.brand + '' : '',
            num: item.num,
            price: item.price
          }))
          this.tableData.list = goodslist
        }
        // 变更记录列表
        if (data.historyList && data.historyList.length) {
          this.historyList.list = data.historyList
        }
      } catch (error) {
        this.$errorMsg(error.message)
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
          const goodsItem = this.tableData.list.map(item => ({
            goodsId: item.goodsId ? item.goodsId + '' : '',
            goodsName: item.goodsName || '',
            goodsNo: item.goodsNo || '',
            barcode: item.barcode || '',
            brandName: item.brandName || '',
            num: item.num + '',
            price: item.price + ''
          }))
          // 校验接口参数
          const validateParams = {
            skuId: this.formData.skuId,
            shopId: this.formData.shopId,
            merchantId: this.formData.merchantId
          }
          // 新增、编辑参数
          const params = {
            ...this.formData,
            goodsItem: JSON.stringify(goodsItem)
          }
          try {
            const id = this.$route.query.id
            this.saveBtnLoading = true
            if (id) {
              params.id = id
              await modifyGroupMerchandiseContrast(params)
            } else {
              await validateShop(validateParams) // 校验
              await saveGroupMerchandiseContrast(params)
            }
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
        if (!item.num) {
          this.$errorMsg(`商品表格第${i + 1}行，商品数量不能为空或0`)
          flag = false
          break
        }
        if (!item.price) {
          this.$errorMsg(`商品表格第${i + 1}行，商品单价不能为空或0`)
          flag = false
          break
        }
        if (item.price && (item.price.toFixed(4) + '').length > 11) {
          this.$errorMsg(`商品表格第${i + 1}行，单价长度只能输入11位（包含小数点）`)
          flag = false
          break
        }
      }
      return flag
    },
    // 店铺列表改变
    shopListChange(val) {
      if (!val) {
        this.$refs['merchantId'].resetField()
        return false
      }
      const target = this.shopInfo.find(item => item.shopId === +val)
      if (target) {
        this.formData.merchantId = target.merchantId + ''
        this.formData.shopName = target.shopName
      }
    },
    // 显示选择商品弹窗
    showModal() {
      if (!this.formData.merchantId) {
        return this.$errorMsg('请先选择公司！')
      }
      this.filterData = {
        merchantId: this.formData.merchantId,
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
          brandName: item.brandName || '',
          num: 0,
          price: 0
        }))
        this.tableData.list.push(...goodslist)
      }
      this.visible.show = false
    },
    // 获取店铺列表
    async getShopList() {
      const { data } = await getShop()
      if (data && data.length) {
        const list = data.map(item => ({
          key: item.shopId + '',
          value: item.shopName,
          label: `${item.dataSourceName}  ${item.shopCode}  ${item.shopName}`
        }))
        this.$nextTick(() => {
          this.shopInfo = data
          this.shopList = list
        })
      } else {
        this.shopList = []
      }
    },
    // 删除表格行
    delTableItem(index) {
      this.tableData.list.splice(index, 1)
    },
    remoteMethod: debounce(function(query) {
      if (query !== '') {
        this.loading = true
        const filterData = this.shopInfo.filter(item => item.shopCode.toLowerCase().includes(query.toLowerCase()) || item.shopName.includes(query))
        const list = filterData.map(item => ({
          key: item.shopId,
          value: item.shopName,
          label: `${item.dataSourceName}  ${item.shopCode}  ${item.shopName}`
        }))
        this.shopList = list
        this.loading = false
      } else {
        const list = this.shopInfo.map(item => ({
          key: item.shopId,
          value: item.shopName,
          label: `${item.dataSourceName}  ${item.shopCode}  ${item.shopName}`
        }))
        this.shopList = list
      }
    }, 300)
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
