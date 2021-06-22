<template>
    <div class="page-bx bgc-w edit-bx">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
        <!-- 面包屑 -->
        <JFX-Breadcrumb :showGoback="true" :breadcrumb="breadcrumb" />
        <!-- 面包屑 end -->
        <!-- title -->
        <JFX-title title="基本信息" className="mr-t-10" />
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="公司：" prop="merchantId" >
              <el-select v-model="ruleForm.merchantId" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectList('adjustmentType_sourceList')" >
                <el-option v-for="item in selectOpt.adjustmentType_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="事业部：" prop="buId" >
              <el-select v-model="ruleForm.buId" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectList('adjustmentType_sourceList')" >
                <el-option v-for="item in selectOpt.adjustmentType_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="供应商：" prop="supplierId" >
              <el-select v-model="ruleForm.supplierId" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectList('emailConfig_reminderTypeList')" >
                <el-option v-for="item in selectOpt.supplierId"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="生效时间：" prop="effectiveTime" >
              <el-date-picker
                clearable
                v-model="ruleForm.effectiveTime"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 100%"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="失效时间：" prop="invalidTime" >
              <el-date-picker
                clearable
                v-model="ruleForm.invalidTime"
                type="date"
                style="width: 100%"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <JFX-title title="单比例配置" style="display: inline-block">
          <div style="float: right">
            <el-button type="primary" @click="add">新增</el-button>
          </div>
        </JFX-title>
        <JFX-table :tableData.sync="tableData" :showPagination="false">
          <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
          <el-table-column prop="creator" label="SD类型" align="center" width="260" >
            <template slot-scope="{row, $index}">
              <el-select v-model="row.sdConfigId" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectList('adjustmentType_sourceList')" @change="choseSDtype($el, $index)">
                <el-option v-for="item in selectOpt.adjustmentType_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="sdSimpleName" label="简称" align="center" ></el-table-column>
          <el-table-column label="比例" align="center" width="300">
            <template slot-scope="{row}">
              <el-input-number v-model="row.proportion" placeholder="请输入" style="width: 220px;"> </el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="dele(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </JFX-table>
        <JFX-title title="多比例配置" style="display: inline-block">
          <div style="float: right">
            <el-button type="primary" @click="dialogVisible.show=true">导入</el-button>
            <el-button type="primary" @click="chooseGoodsVisible.show=true">删除</el-button>
            <el-button type="primary" @click="visible.show=true">选择商品</el-button>
          </div>
        </JFX-title>
        <div class="mr-t-5 fs-14 clr-II">
          合计SKU：1
        </div>
        <div class="mr-t-5"></div>
        <JFX-table :tableData.sync="tableData1" :showPagination="false">
          <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
          <el-table-column prop="creator" label="SD类型" align="center" width="220" >
            <template slot-scope="{row}">
              <el-select v-model="row.sdConfigId" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectList('adjustmentType_sourceList')" >
                <el-option v-for="item in selectOpt.adjustmentType_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="sdConfigSimpleName" label="简称" align="center" width="200"></el-table-column>
          <el-table-column prop="brandParent" label="标准品牌" align="center" width="200"></el-table-column>
          <el-table-column prop="commbarcode" label="标准条码" align="center" width="200"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="statusLabel" label="比例" align="center" width="200">
            <template slot-scope="{row}">
              <el-input-number v-model="row.proportion" placeholder="请输入" style="width: 160px;"> </el-input-number>
            </template>
          </el-table-column>
        </JFX-table>
      </el-form>
      <div class="mr-t-30 flex-c-c">
        <el-button type="primary">保 存</el-button>
        <el-button>取 消</el-button>
      </div>
      <!-- 选择商品 -->
      <sdchose-product v-if="visible.show" :visible.sync="visible" @comfirm="comfirm" :filterData="filterData"></sdchose-product>
      <!-- 选择商品 end -->
      <!-- 导入 -->
      <JFX-Dialog
      :visible.sync="dialogVisible"
      :showClose="true"
      @comfirm="save"
      :width="'860px'"
      :title="'商品导入'"
      :top="'3vh'"
      closeBtnText="取 消"
      confirmBtnText="确 认"
      >
      <div class="import-bx">
        <importfile></importfile>
      </div>
      </JFX-Dialog>
      <!-- 导入 end -->
    </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    sdchoseProduct: () => import('./components/sdchoseProduct'),
    importfile: () => import('@/components/importfile/index')
  },
  data() {
    return {
      breadcrumb: [{
        path: '', meta: { title: 'SD配置' }
      },
      {
        path: '/SDconfig/purchaseSDList', meta: { title: '采购SD配置' }
      }],
      ruleForm: {
        merchantId: '',
        buId: '',
        supplierId: '',
        effectiveTime: '',
        invalidTime: ''
      },
      rules: {
        merchantId: [
          { required: true, message: '请选择公司', trigger: 'change' }
        ],
        buId: [
          { required: true, message: '请选择事业部', trigger: 'change' }
        ],
        supplierId: [
          { required: true, message: '请选择供应商', trigger: 'change' }
        ],
        effectiveTime: [
          { required: true, message: '生效时间不能为空', trigger: 'change' }
        ],
        invalidTime: [
          { required: true, message: '失效时间不能为空', trigger: 'blur' }
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
        list: [{}],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      visible: { show: false },
      dialogVisible: { show: false },
      filterData: {}
    }
  },
  mounted() {
    const { params, query } = this.$route
    this.type = params.type
    console.log(query)
    this.breadcrumb.push({path: '', meta: { title: this.type === 'add' ? '新增采购SD配置' : '编辑采购SD配置' }})
  },
  methods: {
    // 新增
    add() {
      const data = {
        sdConfigId: '',
        proportion: '',
        sdSimpleName: ''
      }
      this.tableData.list.push(data)
    },
    dele(index) {
      this.tableData.list.splice(index, 1)
    },
    choseSDtype(e, index) {
      console.log(index)
    },
    comfirm() {
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
.tongji-item{
  display: inline-block;
  width: 220px;
}
.import-bx{
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
