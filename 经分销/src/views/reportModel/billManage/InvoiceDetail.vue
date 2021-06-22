<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb class="mr-b-20" />
    <!-- 面包屑 end -->
    <div class="table-container">
      <el-row>
        <el-col :span="4">
          Supplier<br />
          {{merchantInfo.englishName}}
        </el-col>
        <el-col :span="20">
          Address: ({{merchantInfo.englishRegisteredAddress}}) <br />
          Contact:（jing.lin@topideal.com.cn/020-62262741）
        </el-col>
      </el-row>
      <el-row>
        <el-col>COMMERCIAL INVOICE</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          BILL TO (BUYER’S COMPANY NAME)
        </el-col>
        <el-col :span="20">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          {{merchantInfo.enName}}
        </el-col>
        <el-col :span="20">
          <span>INVOICE DATE :</span>
          <el-date-picker
            v-model="merchantInfo.enName"
            type="month"
            value-format="yyyy-MM"
            placeholder="生效年月"
            clearable
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">Address：</el-col>
        <el-col :span="20">{{merchantInfo.enBusinessAddress}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">INVOICE NUMBER:</el-col>
        <el-col :span="20"></el-col>
      </el-row>
      <el-row>
        <el-col :span="4">Attn:</el-col>
        <el-col :span="20"></el-col>
      </el-row>
      <el-row>
        <el-col :span="4">Contact：siyi.lu@vipshop.com</el-col>
        <el-col :span="20"></el-col>
      </el-row>
      <el-row>
        <el-col>INVOICE PARTICULARS</el-col>
      </el-row>
      <el-table :data="tableData" border stripe>
        <el-table-column prop="goodsName" label="Item Description" align="center"></el-table-column>
        <el-table-column prop="totalNum" label="Quantity" align="center" ></el-table-column>
        <el-table-column prop="price" label="Unit Price" align="center"></el-table-column>
        <el-table-column prop="currency" label="客退补贴Amount Of Customer Return Allowance" align="center">
          <template slot-scope="{row}">
            <el-input v-model="row.customerReturn" clearable />
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="客退折让Promotion DiscountsCustomer Return Details Amount" align="center">
          <template slot-scope="{row}">
            <el-input v-model="row.promotionDiscountsCust" clearable />
          </template>
        </el-table-column>
        <el-table-column label="活动折扣Promotion Discounts" align="center" >
          <template slot-scope="{row}">
            <el-input v-model="row.promotionDiscounts" clearable />
          </template>
        </el-table-column>
        <el-table-column label="补偿折扣Extra discount" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-input v-model="row.extraDiscount" clearable />
          </template>
        </el-table-column>
        <el-table-column label="返利金额Extra discount Amount" align="center">
          <template slot-scope="{row}">
            <el-input v-model="row.extraAmount" clearable />
          </template>
        </el-table-column>
        <el-table-column prop="currency" label="Currency" align="center"></el-table-column>
        <el-table-column label="Amount" align="center">
          <template slot-scope="{row}">
            <el-input v-model="row.totalPrice" clearable />
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col>Notes</el-col>
      </el-row>
      <el-row>
        <el-col>(1) Order will only be confirmed once the buyer has settled full payment</el-col>
      </el-row>
      <el-row>
        <el-col>(2) Any bank charges or extra expenses incurred on behalf of the Buyer shall be borne by the Buyer.</el-col>
      </el-row>
      <el-row>
        <el-col>For and on behalf of:</el-col>
      </el-row>
      <el-row>
        <el-col>(Seller) Supplier A Co. Ltd (HONG KONG HONOUR FAITH LIMITED)</el-col>
      </el-row>
      <el-row>
        <el-col> BANK DETAILS </el-col>
      </el-row>
      <el-row>
        <el-col> BANK NAME：HSBC HongKong </el-col>
      </el-row>
      <el-row>
        <el-col> NO.1 Queen's Road Central HONG KONG </el-col>
      </el-row>
      <el-row>
        <el-col> ACCOUNT NO.124333030838 </el-col>
      </el-row>
      <el-row>
        <el-col> SWIFT CODE HSBCHKHHHKH </el-col>
      </el-row>
      <el-row>
        <el-col> Authorized Signature, company chop & date </el-col>
      </el-row>
    </div>
    <div class="flex-c-c mr-t-20">
      <el-button type="primary">确认开票</el-button>
      <el-button @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      merchantInfo: {},
      date: '',
      tableData: [{}]
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.table-container {
  color: #797979;
  border: 1px solid #cbcbcb;
  .el-row {
    display: flex;
    border-bottom: 1px solid #cbcbcb;
    &:last-of-type {
      border-bottom: none;
    }
    .el-col {
      border-right: 1px solid #cbcbcb;
      padding: 10px 10px;
      height: inherit;
      &:last-of-type {
        border-right: none;
      }
    }
  }
  .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group {
    border-color: #cbcbcb;
  }
  .el-table--border::after, .el-table--group::after, .el-table::before {
    background-color: #cbcbcb;
  }
  .el-table th.gutter {
    display: table-cell !important;
  }
  .el-table colgroup.gutter {
    display: table-cell !important;
  }
}
</style>
