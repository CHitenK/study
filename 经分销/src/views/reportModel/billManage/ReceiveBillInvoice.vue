<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <div class="flex-c-c clr-II fs-20 mr-t-20" style="font-weight: 600;">香港宝信有限公司(HONG KONG HONOUR FAITH LIMITED)</div>
    <div class="flex-c-c clr-II fs-12 mr-t-20">ROOM 1 36/F SUNSHINE PLAZA 353 LOCKHART ROAD WANCHAI HK</div>
    <div class="flex-c-c clr-II fs-16 mr-t-20"><u>INVOICE 发票</u></div>
    <div class="table-container mr-t-20 clr-II fs-12">
      <el-row>
        <el-col :span="12" style="background: #dddddd;" >BILL TO</el-col>
        <el-col :span="6">DATE 时间：</el-col>
        <el-col :span="6">
          <el-date-picker
            clearable
            v-model="detail.date"
            type="month"
            value-format="yyyy-MM"
            placeholder="生效年月"
            style="width: 100%"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex-c-c">JD.COM INTERNATIONAL LIMITED</el-col>
        <el-col :span="12" style="padding: 0">
          <el-row>
            <el-col :span="12">INVOICE NO. 发票号：</el-col>
            <el-col :span="12"></el-col>
          </el-row>
          <el-row>
            <el-col :span="12" >Purchase Order 采购订单：</el-col>
            <el-col :span="12">
              <el-input v-model="detail.name" placeholder="请输入" style="width: 100%" />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row style="padding: 10px 10px;background: #dddddd;">BANK INFO</el-row>
      <el-row>
        <el-col :span="8">Beneficiary Name</el-col>
        <el-col :span="16">香港宝信有限公司(HONG KONG HONOUR FAITH LIMITED)</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">Beneficiary Address</el-col>
        <el-col :span="16">ROOM 1 38/F SUNSHINE PLAZA 353 LOCKHART ROAD WANCHAI HK</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">Bank name</el-col>
        <el-col :span="16">HSBC HongKong</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">Bank Address</el-col>
        <el-col :span="16">NO.1 Queen's Road Central HONG KONG</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">Account No.</el-col>
        <el-col :span="16">124333030838</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">SWIFT</el-col>
        <el-col :span="16">HSBCHKHHHKH</el-col>
      </el-row>
      <el-row class="bg-title">
        <el-col :span="8">
          <div>COMMODITY</div>
          <div>商品名称</div>
        </el-col>
        <el-col :span="4">
          <div>ARTICLE NUMBER</div>
          <div>货号</div>
        </el-col>
        <el-col :span="4">
          <div>QUANTITY</div>
          <div>数量（PCS）</div>
        </el-col>
        <el-col :span="4">
          <div>UNITY PRICE</div>
          <div>单价（USD）</div>
        </el-col>
        <el-col :span="4">
          <div>AMOUNT</div>
          <div>总价（USD）</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">Metamucil 膳食纤维粉(香橙幼滑口味)</el-col>
        <el-col :span="4">4987176002341</el-col>
        <el-col :span="4">328</el-col>
        <el-col :span="4">19.36</el-col>
        <el-col :span="4">6,350.08</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">Metamucil美达施膳食纤维粉(香橙幼滑口味) 30次装</el-col>
        <el-col :span="4">4987176009265</el-col>
        <el-col :span="4">500</el-col>
        <el-col :span="4">13.85</el-col>
        <el-col :span="4">6,924.00</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">Sub Total</el-col>
        <el-col :span="4">828</el-col>
        <el-col :span="4"></el-col>
        <el-col :span="4">13,274.08</el-col>
      </el-row>
    </div>
    <div class="clr-II fs-12">
      <el-row class="mr-t-20" type="flex" align="center">
        <el-col :span="6">
          1）Origin city 装货港：
        </el-col>
        <el-col :span="8">
          <el-input v-model="detail.name" placeholder="请输入" clearable></el-input>
        </el-col>
      </el-row>
      <el-row class="mr-t-20" type="flex" align="center">
        <el-col :span="6">
          2）Destination city 卸货港：
        </el-col>
        <el-col :span="8">
          <el-input v-model="detail.name" placeholder="请输入" clearable></el-input>
        </el-col>
      </el-row>
      <el-row class="mr-t-20" type="flex" align="center">
        <el-col :span="6">
          3）REMARKS 备注：
        </el-col>
        <el-col :span="8">
          <el-input v-model="detail.name" placeholder="请输入" clearable></el-input>
        </el-col>
      </el-row>
      <el-row class="flex-c-c mr-t-30">
        <el-button type="primary">确认开票</el-button>
        <el-button @click="route.go(-1)">取消</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  border: 1px solid #000;
  .el-row {
    display: flex;
    border-bottom: 1px solid #000;
    // height: 32px;
    &:last-of-type {
      border-bottom: none;
    }
    .el-col {
      border-right: 1px solid #000;
      padding: 10px 10px;
      height: inherit;
      &:last-of-type {
        border-right: none;
      }
    }
  }
}
/deep/.bg-title {
  background: #dddddd;
  text-align: center;
}
</style>
