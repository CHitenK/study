<template>
  <!-- 结算单导入页面 -->
  <div class="page-bx bgc-w edit-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb class="mr-b-20" />
    <!-- 面包屑 end -->
    <!-- 表单 -->
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="结算对象：" prop="customerId">
            <el-select
              v-model="ruleForm.customerId"
              placeholder="请选择"
              clearable
              filterable
              :data-list="getSelectList('financeInventorySummary_statusList')"
            >
              <el-option
                v-for="item in selectOpt.financeInventorySummary_statusList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="结算币种：" prop="currency">
            <el-select
              v-model="ruleForm.currency"
              placeholder="请选择"
              clearable
              filterable
              :data-list="getSelectList('financeInventorySummary_statusList')"
            >
              <el-option
                v-for="item in selectOpt.financeInventorySummary_statusList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item  label="账单月份：" prop="month">
            <el-date-picker
              clearable
              v-model="ruleForm.month"
              placeholder="请选择"
              type="month"
              value-format="yyyy-MM"
              style="width: 203px">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="仓库名称：" prop="depotId">
            <el-select
              v-model="ruleForm.depotId"
              placeholder="请选择"
              clearable
              filterable
              :data-list="getSelectList('financeInventorySummary_statusList')"
            >
              <el-option
                v-for="item in selectOpt.financeInventorySummary_statusList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="平台名称：" prop="platformCode">
            <el-select
              v-model="ruleForm.platformCode"
              placeholder="请选择"
              clearable
              filterable
              :data-list="getSelectList('financeInventorySummary_statusList')"
            >
              <el-option
                v-for="item in selectOpt.financeInventorySummary_statusList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
          <el-form-item label="计费周期：" prop="date">
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
        <el-col :span="24">
          <el-form-item label="上传文件：" prop="file">
            <JFX-upload>
              <el-button type="primary" size="mini" >选择文件</el-button>
            </JFX-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表单 end -->
    <!-- 操作 -->
    <div class="flex-c-c">
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="$router.go(-1)">取消</el-button>
    </div>
    <!-- 操作 end -->
    <!-- 说明 -->
    <JFX-title title="说明" className="mr-t-10" />
    <div class="desc">
      <p> 1、导入结算对象为：广东卓志跨境电商供应链服务有限公司 时，仅支持对电商订单各费用类型进行分隔事业部，可支持对<span>标准服务费（包干费）、包材费、超件附加费、取消订单服务费、快递理赔费、税金</span>等六项费用进行按事业部分账；</p>
      <p> 2、导入模板可直接使用原数据平台导出模板；但需确保各sheet规范命名及表中必填字段信息，如下简要说明：</p>
      <ul>
        <li>1)、<span>“sheet 仓内费用”</span>表必填字段有<span>“订单号、标准服务费、超件附加费、包材费”</span>四个必填字段；增加<span>“超重附加费”</span>非必填字段；</li>
        <li>2)、<span>“sheet 快递费”</span>表必填字段有<span>“订单号、运费”</span>两个必填字段；</li>
        <li>3)、<span>“sheet 取消订单服务费”</span>表必填字段有<span>“订单号、费用”</span>两个必填字段；</li>
        <li>4)、<span>“sheet 综合税金”</span>表必填字段有<span>“业务单号、商品货号、仓库、收费金额、是否红冲”</span>五个必填字段；</li>
        <li>5)、<span>“sheet 一线进口清关费”</span>表必填字段有<span>“业务单号、一线进口清关费、入库验收费、合计”</span>四个必填字段；</li>
        <li>6)、<span>“sheet 堆存费”</span>表必填字段有<span>“仓库、商品编码、库存数量、计费日期、费用”</span>五个必填字段；</li>
        <li>7)、<span>“sheet 转关费”</span>表必填字段有<span>“业务单号、合计”</span>两个必填字段；</li>
        <li>8)、<span>“sheet 调拨费”</span>表必填字段有<span>“业务单号、合计”</span>两个必填字段；</li>
        <li>9)、<span>“sheet 退运费”</span>表必填字段有<span>“业务单号、合计”</span>两个必填字段；</li>
      </ul>
    </div>
    <!-- 说明 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 表单数据
      ruleForm: {
        customerId: '',
        currency: '',
        month: '',
        depotId: '',
        platformCode: '',
        file: '',
        date: []
      },
      // 表单校验数据
      rules: {
        customerId: [{ required: true, message: '请选择', tigger: 'blur' }],
        currency: [{ required: true, message: '请选择', tigger: 'blur' }],
        month: [{ required: true, message: '请选择', tigger: 'blur' }],
        file: [{ required: true, message: '请选择', tigger: 'blur' }],
        date: [{ required: true, message: '请选择', tigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.$successMsg('success')
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
.desc {
  color: #666;
  >p {
    margin-bottom: 10px;
    >span {
      color: blue;
    }
  }
  ul {
    margin-left: 20px;
    li{
      margin-bottom: 10px;
      >span {
        color: red;
      }
    }
  }
}
</style>
