<template>
<!-- 创建应收页面 -->
  <div class="page-bx bgc-w edit-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 表单 -->
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
          <el-form-item label="账单月份：" prop="customerId" :rules="rules.customerId">
            <el-date-picker
              clearable
              v-model="searchProps.customerId"
              type="month"
              value-format="yyyy-MM"
              placeholder="生效年月"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="事业部：" prop="customerId" :rules="rules.customerId">
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
          <el-form-item label="结算币种：" prop="customerId" :rules="rules.customerId">
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
      </el-row>
    </el-form>
    <!-- 表单 end -->
    <!-- 操作 -->
    <el-row>
      <el-button type="primary" @click="addTableItem">添加补扣款</el-button>
      <el-button type="primary">删除</el-button>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column align="center">
        <template slot="header">
          <span class="need">费用项目</span>
        </template>
        <template slot-scope="{row}">
          <el-input v-model="row.salePrice" placeholder="请输入" clearable />
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <span class="need">类型</span>
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
      <el-table-column align="center" label="PO号">
        <template slot-scope="{row}">
          <el-input v-model="row.effectiveDate" placeholder="请输入" clearable />
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品货号">
        <template>
          <el-button type="primary">选择商品</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品名称">
        <template slot-scope="{row}">
          <el-input v-model="row.effectiveDate" placeholder="请输入" clearable />
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <span class="need">母品牌</span>
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
      <el-table-column align="center" label="数量">
        <template slot-scope="{row}">
          <el-input v-model="row.effectiveDate" placeholder="请输入" clearable />
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <span class="need">费用金额</span>
        </template>
        <template slot-scope="{row}">
          <el-input v-model="row.salePrice" placeholder="请输入" clearable />
        </template>
      </el-table-column>
      <el-table-column align="center" label="发票描述">
        <template slot-scope="{row}">
          <el-input v-model="row.effectiveDate" placeholder="请输入" clearable />
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="{row}">
          <el-input v-model="row.effectiveDate" placeholder="请输入" clearable />
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end -->
    <!-- 操作 -->
    <div class="mr-t-30 flex-c-c">
      <el-button @click="handleSubmit" type="primary">保 存</el-button>
      <el-button @click="$router.go(-1)">取 消</el-button>
    </div>
    <!-- 操作 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
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
    addTableItem() {
      this.tableData.list.push({})
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
</style>
