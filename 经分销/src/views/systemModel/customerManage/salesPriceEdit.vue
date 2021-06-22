<template>
<!-- 销售价格管理新增/编辑 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 基础资料 -->
    <JFX-title title="基础资料" />
    <el-form :model="searchProps" ref="ruleForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="客户：" prop="customerId" :rules="rules.customerId">
            <el-select
              v-model="searchProps.customerId"
              placeholder="请选择"
              clearable
              :data-list="getSelectList('adjustmentType_sourceList')"
            >
              <el-option
                v-for="item in selectOpt.adjustmentType_sourceList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="客户编号：" prop="customerCode">
            <el-input v-model="searchProps.customerCode" clearable disabled />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="主数据客户ID：" prop="mainId">
            <el-input v-model="searchProps.mainId" clearable disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 基础资料 end -->
    <!-- 设置商品报价 -->
    <JFX-title title="设置商品报价" style="display: inline-block">
      <div style="float: right">
        <el-button type="primary" @click="chooseGoodsVisible.show=true">选择商品</el-button>
        <el-button type="primary" @click="removeItem">删除</el-button>
      </div>
    </JFX-title>
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="goodsNo" align="center" label="商品货号" />
      <el-table-column prop="goodsName" align="center" label="商品名称" />
      <el-table-column prop="barcode" align="center" label="条码" />
      <el-table-column prop="brandName" align="center" label="品牌" />
      <el-table-column align="center">
        <template slot="header">
          <span class="need">币种</span>
        </template>
        <template slot-scope="{row}">
          <el-select
            v-model="row.currency"
            placeholder="请选择"
            clearable
            :data-list="getSelectList('adjustmentType_sourceList')"
          >
            <el-option
              v-for="item in selectOpt.adjustmentType_sourceList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <span class="need">销售价</span>
        </template>
        <template slot-scope="{row}">
          <el-input v-model="row.salePrice" placeholder="请输入" clearable />
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <span class="need">生效日期</span>
        </template>
        <template slot-scope="{row}">
          <el-input v-model="row.effectiveDate" placeholder="请输入" clearable />
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <span class="need">失效日期</span>
        </template>
        <template slot-scope="{row}">
          <el-input v-model="row.expiryDate" placeholder="请输入" clearable />
        </template>
      </el-table-column>
      <el-table-column prop="isGroup" align="center" label="是否组合" />
    </JFX-table>
    <!-- 设置商品报价 end -->
    <!-- 操作 -->
    <div class="mr-t-30 flex-c-c">
      <el-button @click="handleSubmit" type="primary">保 存</el-button>
      <el-button @click="$router.go(-1)">取 消</el-button>
    </div>
    <!-- 操作 end -->
    <!-- 选择商品组件 -->
    <ChooseGoods v-if="chooseGoodsVisible.show" :chooseGoodsVisible="chooseGoodsVisible" @comfirm="addGoods" />
    <!-- 选择商品组件 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import ChooseGoods from './components/ChooseGoods'
export default {
  mixins: [commomMix],
  components: {
    ChooseGoods
  },
  data() {
    return {
      // 面包屑数据
      breadcrumb: this.$route.params.id !== '01' ? [
        {path: '/customer/supplierList', meta: { title: '供应商列表' }},
        {path: 'customer/supplierEdit', meta: { title: '供应商编辑' }}
      ] : [
        {path: '/customer/supplierList', meta: { title: '供应商列表' }},
        {path: 'customer/supplierEdit', meta: { title: '供应商新增' }}
      ],
      // 查询数据
      searchProps: {
        customerId: '',
        customerCode: '',
        mainId: ''
      },
      // 校验规则
      rules: {
        customerId: [{required: true, message: '请选择', trigger: 'blur'}],
        currency: [{required: true, message: '请选择', trigger: 'blur'}],
        salePrice: [{required: true, message: '请输入', trigger: 'blur'}],
        effectiveDate: [{required: true, message: '请输入', trigger: 'blur'}],
        expiryDate: [{required: true, message: '请输入', trigger: 'blur'}]
      },
      // 表格数据
      tableData: {
        list: [{}],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 选择商品组件显示状态
      chooseGoodsVisible: { show: false }
    }
	},
	mounted() {
    this.getList()
	},
  methods: {
		// 拉取表格数据
		getList(pageNum) {
      const params = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.searchProps
      }
      console.log(params)
    },
		// 删除数据项
    removeItem() {
      if (!this.tableChoseList.length) {
        this.$alertWarning('至少选择一条记录！')
      } else {
        this.$showToast('确定删除选中对象？', () => {
          console.log(1)
        })
      }
    },
    // 选择添加商品
    addGoods(data) {
      this.chooseGoodsVisible.show = false
      this.$successMsg('success')
      if (data.length) {
        this.tableData.list.push(...data)
      }
    },
    // 提交表单
    handleSubmit() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.$successMsg('successMsg')
        }
      })
    }
  }
}
</script>
