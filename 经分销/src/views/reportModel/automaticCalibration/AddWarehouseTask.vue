<template>
  <!-- 预售订单新增/编辑页面 -->
  <div class="page-bx bgc-w sales-add-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <div class="flex-c-c">
      <el-form class="mr-t-20" :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-form-item label="数据源：" prop="dataSource">
        <el-radio v-model="ruleForm.dataSource" label="1">GSS报表</el-radio>
        <el-radio v-model="ruleForm.dataSource" label="2">菜鸟后台</el-radio>
      </el-form-item>
      <el-form-item label="核对仓库：" prop="outDepotId" v-if="ruleForm.dataSource === '1'">
        <el-radio v-model="ruleForm.outDepotId" label="1">卓志南沙保税仓</el-radio>
        <el-radio v-model="ruleForm.outDepotId" label="2">卓志香港海外仓</el-radio>
      </el-form-item>
      <el-form-item label="核对仓库：" prop="outDepotId" v-else>
        <el-radio v-model="ruleForm.outDepotId" label="1">菜鸟沃天下南沙pop保税仓</el-radio>
      </el-form-item>
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
      <el-form-item label="核对仓库：" prop="outDepotId">
        <el-row type="flex">
          <JFX-upload>
            <el-button type="primary">选择文件</el-button>
          </JFX-upload>
          <el-button type="text" style="padding:0 0 0 10px;">卓志保税仓导入模板</el-button>
          <el-button type="text">菜鸟仓导入模板</el-button>
        </el-row>
      </el-form-item>
    </el-form>
    </div>
    <el-row class="flex-c-c mr-t-20">
      <el-button type="primary">开始核对</el-button>
      <el-button>取销</el-button>
    </el-row>
    <JFX-title title="说明" className="mr-t-10" />
    <div class="clr-II">
      <p> 1、请按导入模板格式及字段导入数据 </p>
      <p> 2、若核对的仓库是卓志保税仓，导入的数据来自GSS库存流水报表；若核对的仓库是菜鸟仓，导入的数据来自菜鸟后台库存流水</p>
      <p> 3、若核对的是卓志保税仓： </p>
      <ul class="list-desc">
        <li>1)、系统只核对业务类型为：3 4 5 6 13 14 15 16 31 32 62 63 66 67 80 81 84 85 100 104的数据。</li>
        <li>2)、当业务类型为3/4时，业务单号填入ERP采购单或调拨指令单或代销退货订单</li>
        <li>3)、当业务类型为5/6时，业务单号填入ERP外部电商订单编号或调拨指令单或购销订单或采购退货单</li>
        <li>4)、当业务类型为13/14/15/16时，业务单号填入ERP盘点单</li>
        <li>5)、当业务类型为31/3/2/62/63/66/67/80/81/84/85，业务单号填入ERP库存类型调整单</li>
        <li>6)、当业务类型为100/104，业务单号填入ERP库存调整单</li>
      </ul>
      <p> 4、若核对的是菜鸟仓：</p>
      <ul class="list-desc">
        <li>1）、系统只核对单据类型为：交易出库  退货入库  采购入库  盘点出库  盘点入库  普通出库  的数据</li>
        <li>2）、请先将EXCEL的货品编码替换成ERP货号</li>
      </ul>
    </div>
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
.list-desc {
  >li {
    margin-left: 20px;
  }
}
</style>
