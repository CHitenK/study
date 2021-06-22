<template>
  <!-- 应收总汇组件 -->
  <div class="page-bx bgc-w">
    <el-row type="flex" justify="center" class="clr-II fs-24 mr-b-20">2021年01月香港栩桥贸易有限公司应收账单</el-row>
    <el-row type="flex" justify="space-between" class="mr-b-20" style="color: #0000ff;">
      <el-col>事业部：元森泰事业部E</el-col>
      <el-col style="text-align: right;">账单创建日期： 2021-01-21 11:52:38</el-col>
    </el-row>
    <el-row :gutter="10" class="fs-14 clr-II mr-b-20">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mr-b-15">
        客户： 香港栩桥贸易有限公司
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mr-b-15">
        应收账单号： YSZD00010001201
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mr-b-15">
        关联业务单：
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mr-b-15">
        开票状态： 待开票
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mra-b-15">
        发票号码：
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mr-b-15">
        账单状态： 待核销 <a href="#">收款跟踪</a>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mr-b-15">
        PO号：
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mr-b-15">
        渠道：
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mr-b-15">
        销售模式：经销模式
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mr-b-15">
        结算类型：应收
      </el-col>
    </el-row>
    <!-- 表格 -->
    <table class="table-container">
      <tbody>
        <tr>
          <td colspan="5">应收款项</td>
        </tr>
        <tr>
          <td colspan="2">项目</td>
          <td>数量</td>
          <td>金额</td>
          <td>币种</td>
        </tr>
        <tr>
          <td>商品销售收入</td>
          <td>经销业务TO B收入</td>
          <td></td>
          <td></td>
          <td>CNY</td>
        </tr>
        <tr>
          <td>电商平台服务费</td>
          <td>广告宣传费</td>
          <td>0</td>
          <td>0.45</td>
          <td>CNY</td>
        </tr>
        <tr>
          <td>收消费者运费</td>
          <td>订单运费</td>
          <td></td>
          <td></td>
          <td>CNY</td>
        </tr>
        <tr>
          <td colspan="2">合计总额：负叁佰伍拾肆元叁角肆分</td>
          <td></td>
          <td></td>
          <td>CNY</td>
        </tr>
      </tbody>
    </table>
    <!-- 表格 end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      pureTableData: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-bottom: 40px;
  border: 1px solid #cbcbcb;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  color: #666;
  td {
    border-left: 1px solid #cbcbcb;
    border-bottom: 1px solid #cbcbcb;
    padding: 8px 0;
  }
}
</style>
