<template>
  <div>
    <div class="mr-t-20 list-bx fs-14 clr-II">
      <span class="wid-20">Sales Organisation</span>
      <span>HK01</span>
      <span>Sold to code</span>
      <span>{{detail.soldToCode }}</span>
      <span>Internal order #</span>
      <span></span>

      <span class="wid-20">Distribution Channel</span>
      <span>{{detail.distributionChannel}}</span>
      <span>Ship to code</span>
      <span>{{detail.shipToCode }}</span>
      <span>GL account #</span>
      <span></span>
      <!--  -->
      <span class="wid-20">Division</span>
      <span>01</span>
      <span>Requesting department</span>
      <span></span>
      <span>Cost center #</span>
      <span></span>
      <!--  -->
      <span class="wid-20">Order Type</span>
      <span>Z001</span>
      <span>Shipping Condition</span>
      <span></span>
      <span>Delivery Plant</span>
      <span>{{detail.deliveryPlant}}</span>

      <span class="wid-20">Order date</span>
      <span>
        <el-date-picker
          v-model="detail.orderDate"
          type="date"
          value-format="yyyy-MM-dd"
          clearable
          disabled
          style="width:100%;"
        >
        </el-date-picker>
      </span>
      <span>Order Reason</span>
      <span></span>
      <span>PO Number</span>
      <span>{{detail.poNo}}</span>
      <span class="wid-20">Request delivery date</span>
      <span>
        {{detail.requestDeliveryDate}}
      </span>
      <span>SLOG bracket</span>
      <span></span>
      <span>Sold-to Name</span>
      <span></span>

      <span class="wid-20">Remark</span>
      <span style="width: 32%;"></span>
      <span>MAXIMUM 30 LETTERS</span>
      <span style="width: 32%;"></span>

      <span style="width: 100%;"></span>

      <span style="width: 100%;">Order list</span>

      <span class="wid-20">Description</span>
      <span></span>
      <span>PG code</span>
      <span>Barcode</span>
      <span>Order Qty</span>
      <span>UOM</span>
    </div>
    <div style="border-top: 0;" class="list-bx fs-14 clr-II" v-for="(item, i) in detail.goodsList" :key="i">
      <span class="wid-20">{{item.description}}</span>
      <span></span>
      <span>{{item.pgCode}}</span>
      <span></span>
      <span>{{item.orderQty}}</span>
      <span>CS</span>
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
          orderDate: '',
          requestDeliveryDate: '',
          description: ''
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
  width: 66vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: solid 1px #ccc;
  border-right: solid 1px #ccc;
  span{
    display: inline-block;
    width: 16%;
    border: solid 1px #ccc;
    border-bottom: 0;
    border-right: 0;
    min-height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    padding: 0 10px;
  }
  .wid-20{
    width: 20%;
  }
}
</style>
