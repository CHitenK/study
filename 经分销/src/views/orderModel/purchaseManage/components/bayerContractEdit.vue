<template>
  <div>
    <div class="mr-t-20 list-bx fs-12 clr-II">
      <span style="width: 100%; height: 60px" class="">
        {{detail.buyerEnName}}<br> {{detail.buyerAddress}}
      </span>
      <span style="width: 100%; " class="">
        Order Placement
      </span>
      <!--  -->
      <span style="width: 15%; " class="">PO Number</span>
      <span class=""  style="width: 30%;">{{detail.poNo}}</span>
      <span style="width: 10%; " class="">Week Number</span>
      <span style="width:45%; " class="">
        <el-input v-model="detail.weekNumber" clearable style="width:100%"></el-input>
      </span>
      <!--  -->
      <span style="width: 15%; " class="">Buyer Name</span>
      <span class="fs-12 line-2" style="width: 30%;" :title="detail.buyerEnName">{{detail.buyerEnName}}</span>
      <span style="width: 10%; " class="">Seller Name</span>
      <span style="width: 45%; " class="">{{detail.sellerEnName}}</span>
      <!--  -->
      <span style="width: 15%; " class="">Buyer Address</span>
      <span class=""  style="width: 30%;">{{detail.buyerAddress}}</span>
      <span style="width: 10%; " class="">Seller Address</span>
      <span style="width: 45%; " class="">{{detail.sellerAddress}}</span>
      <!--  -->
      <span style="width: 100%; text-align: right;" class="flex-end">
        Value ({{detail.currency}})
      </span>
      <!--  -->
      <span style="width: 5%; " class="">NO</span>
      <span>Brand</span>
      <span>Product Name</span>
      <span>SKUs</span>
      <span>Globan</span>
      <span>条码</span>
      <span>BatchNo.</span>
      <span>Expired date</span>
      <span style="width: 5%; ">合计总数</span>
      <span class="fs-12">Purchase Price</span>
      <span>Net Sales</span>
      <!--  -->
      <div style="border-top: 0;" class="list-bx fs-12 clr-II" v-for="(item,i) in detail.goodsList" :key="i">
        <span style="width: 5%; " class="">{{i + 1}}</span>
        <span><el-input v-model="item.brand" clearable style="width:100%"></el-input></span>
        <span><el-input v-model="item.productName" clearable style="width:100%"></el-input></span>
        <span><el-input v-model="item.skus" clearable style="width:100%"></el-input></span>
        <span><el-input v-model="item.globan" clearable style="width:100%"></el-input></span>
        <span>{{item.barcode}}</span>
        <span><el-input v-model="item.batch" clearable style="width:100%"></el-input></span>
        <span><el-input v-model="item.expiredDate" clearable style="width:100%"></el-input></span>
        <span style="width: 5%; ">{{item.num}}</span>
        <span>{{item.price}}</span>
        <span>{{item.amount}}</span>
      </div>
      <!--  -->
      <span style="width: 100%; " class=""></span>
      <!--  -->
      <span style="width: 5%; " class=""></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span style="width: 5%; ">{{detail.totalNum}}</span>
      <span class="fs-12"></span>
      <span>{{detail.currency}}{{detail.totalAccount}}</span>
      <!--  -->
      <span style="width: 100%; " class=""></span>
      <!--  -->
      <span style="width: 15%; ">Signature</span>
      <span style="width: 20%; "></span>
      <span style="width: 65%; ">Seller Signature</span>
      <!--  -->
      <span style="width: 15%; border-top: 0"></span>
      <span style="width: 20%; "></span>
      <span style="width: 65%; "></span>
      <!--  -->
       <span style="width: 100%; " class="">
         Delivery address：<el-input v-model="detail.deliveryAddress" clearable style="width:60%"></el-input>
       </span>
    </div>
</div>
</template>
<script>
export default {
  props: {
    detail: {
      type: Object,
      defalut: function() {
        return {
        }
      }
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.list-bx{
  width: 80vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: solid 1px #ccc;
  border-right: solid 1px #ccc;
  span{
    display: inline-flex;
    width: 10%;
    border: solid 1px #ccc;
    border-bottom: 0;
    border-right: 0;
    height: 40px;
    box-sizing: border-box;
    padding: 0 5px;
    justify-content: center;
    align-items: center;
  }
  .line-2{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .wid-20{
    width: 20%;
  }
  .flex-end{
    justify-content: flex-end;
  }
}

</style>
