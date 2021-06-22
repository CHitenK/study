<template>
  <!-- 预售订单新增/编辑页面 -->
  <div class="page-bx bgc-w sales-add-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <el-form class="mr-t-20" :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="出仓仓库：" prop="outDepotId" :rules="rules.outDepotId">
            <el-select
              v-model="ruleForm.outDepotId"
              placeholder="请选择"
              clearable
              filterable
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
        <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="核对日期：" prop="date" :rules="rules.date">
              <el-date-picker
                clearable
                v-model="ruleForm.date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="平台名称：" prop="storePlatformCode" :rules="rules.storePlatformCode">
            <el-select
              v-model="ruleForm.storePlatformCode"
              placeholder="请选择"
              clearable
              filterable
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
          <el-form-item label="店铺：" prop="shopCode" :rules="rules.shopCode">
            <el-select
              v-model="ruleForm.shopCode"
              placeholder="请选择"
              clearable
              filterable
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
        <el-col :span="24">
          <el-form-item label="文件：" prop="upload" :rules="rules.upload">
            <JFX-upload>
              <el-button type="primary">选择文件</el-button>
            </JFX-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="flex-c-c">
      <el-button type="primary">开始核对</el-button>
      <el-button>取销</el-button>
    </el-row>
    <JFX-title title="填写Excle模板小贴士：" className="mr-t-10" />
    <el-row style="color: #797979;">
      <el-col :span="24" style="color: #0000ff;">一、天猫-出仓仓库为天运二期仓</el-col>
      <el-col :span="24">【数据准备顺序】</el-col>
      <el-col :span="24">1、订单管理列表页（查询发货时间和已出库状态的查询条件，导出当月的发货单据流水）</el-col>
      <el-col :span="24">2、【库存中心】-【出入库流水台账】导出当月发货出库的流水数据</el-col>
      <el-col :span="24">
        3、以出入库流水中的（外部流水号）对应订单管理的出库数据核对是否一致；并拿到每个订单号的实际发货时间填充回到订单管理订单流水中的发货时间。
      </el-col>
      <el-col :span="24">
        4、以合并的源数据导入到系统POP流水校验进行校验（注：导入的数据表格必须要有
        <span style="color: #ff0000;">“发货时间”、“交易订单号”、“商品数量”、“货品id”</span>
        四个必填字段，导入数据模板仅保留必填字段即可，方可加快系统处理效率）。
      </el-col>
    </el-row>
    <el-row style="color: #797979;">
      <el-col :span="24" style="color: #0000ff;">二、天猫-出仓仓库为非天运二期仓</el-col>
      <el-col :span="24">【数据准备顺序】</el-col>
      <el-col :span="24">1、订单管理列表页（查询发货时间和已出库状态的查询条件，导出当月的发货单据流水）；</el-col>
      <el-col :span="24">2、库存中心】-【出入库流水台账】导出当月发货出库的流水数据；</el-col>
      <el-col :span="24">
        3、以出入库流水中的（外部流水号）对应订单管理的出库数据核对是否一致；并拿到每个订单号的实际发货时间填充回到订单管理订单流水中的发货时间。
      </el-col>
      <el-col :span="24">
        4、以合并的源数据导入到系统POP流水校验进行校验（注：导入的数据表格必须要有
        <span style="color: #ff0000;">“发货时间”、“交易订单号”、“商品数量”、“货品编码”</span>
        四个必填字段，导入数据模板仅保留必填字段即可，方可加快系统处理效率）。
      </el-col>
    </el-row>
    <el-row style="color: #797979;">
      <el-col :span="24" style="color: #0000ff;">三、京东</el-col>
      <el-col :span="24">【数据准备顺序】</el-col>
      <el-col :span="24">1、【订单管理】-【订单查询与跟踪】导出当月已出库、已完结的流水数据；</el-col>
      <el-col :span="24">
        2、找蓝精灵提供查询商品对照关系的对接接口（【订单中心-订单货号拦截】），当前无对接接口可通过蓝精灵后台导出，或是找蓝精灵开发数据库里拉一份对照关系数据；并人工替换掉商品信息;
      </el-col>
      <el-col :span="24">
        3、将导出的流水数据导入到系统中进行校验（注：导入的数据表格必须要有
        <span style="color: #ff0000;">“订单号 ”、“商品ID ”、“订购数量”</span>
        三个必填字段，导入数据模板仅保留必填字段即可，方可加快系统处理效率）。
      </el-col>
    </el-row>
    <el-row style="color: #797979;">
      <el-col :span="24" style="color: #0000ff;">四、出仓仓库为综合1仓的电商订单（拼多多、有赞、第e仓、小小包、澳新、斑马）</el-col>
      <el-col :span="24">【数据准备顺序】</el-col>
      <el-col :span="24">1、原有的流水链接（经分销库存流水明细中的‘业务单据号’）与经分销发货订单中的‘发货单号’关联匹配，以获取完整的数据（包含字段公司名称、仓库名称、商品OPG、商品货号、商品名称、交易类型、交易数量、单位、平台订单号、业务单据号、原始批次号、生产日期、失效日期、交易创建时间、发货时间）；</el-col>
      <el-col :span="24">2、根据“公司”为维度区分数据，并导入系统做订单校验（注：导入数据表格必须要有
        <span style="color: #ff0000;">“发货时间”、“平台订单号”、“商品货号”、“交易数量”、“原始批次号”</span>
        五个必填字段，导入数据模板仅保留必填字段即可，方可加快系统处理效率）。 【附链接】 <span style="color: #007bff;">仓库收发明细   Ofc电商订单对应关系</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 基本信息
      ruleForm: {
        outDepotId: '',
        date: [],
        storePlatformCode: '',
        shopCode: '',
        upload: ''
      },
      // 表单校验规则
      rules: {
        outDepotId: [{required: true, message: '请输入', trigger: 'blur'}],
        date: [{required: true, message: '请输入', trigger: 'blur'}],
        storePlatformCode: [{required: true, message: '请输入', trigger: 'blur'}],
        shopCode: [{required: true, message: '请输入', trigger: 'blur'}],
        upload: [{required: true, message: '请输入', trigger: 'blur'}]
      }
    }
  },
  computed: {
    // 商品总数量
    gooodsTotal() {
      return this.tableData.list.length
    },
    // 商品总金额
    gooodsAmount() {
      return this.tableData.list.reduce((pre, cur) => {
        return pre + +cur.amount || 0
      }, 0)
    },
    // 商品总毛重
    gooodsGrossWeight() {
      return this.tableData.list.reduce((pre, cur) => {
        return pre + +cur.grossWeight || 0
      }, 0)
    },
    // 商品总净重
    gooodsNetWeight() {
      return this.tableData.list.reduce((pre, cur) => {
        return pre + +cur.netWeight || 0
      }, 0)
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
    // 提交表单
    handleSubmit() {
      const tempArr = []
      this.$refs['ruleForm'].validate(valid => {
        tempArr.push(valid)
      })
      this.$refs['goodsForm'].validate(valid => {
        tempArr.push(valid)
      })
      const status = tempArr.every(item => item === true)
      if (status) {
        this.$successMsg('success')
      }
    },
    // 选择商品
    chooseGoods(data) {
      this.chooseGoodsVisible.show = false
      if (data) {
        this.tableData.list.push(data)
      }
    },
    // 删除表格项
    removeTableItem() {
      const tempArr = this.tableData.list.filter(item => !this.tableChoseList.includes(item))
      this.tableData.list = tempArr
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
