<template>
  <div>
    <div class="mr-t-20 list-bx fs-12 clr-II">
      <span style="width: 60%; " class=""></span>
      <span style="width: 40%; " class="">採購單Purchase Order</span>
      <!--  -->
      <span style="width: 100%;" class="flex-start">
        Company Name: ({{detail.buyerEnName}})
      </span>
      <!--  -->
      <span style="width: 80%; " class="">
        Address:&nbsp;&nbsp; <el-input v-model="detail.buyerAddress" clearable style="width:60%"></el-input>
      </span>
      <span style="width: 20%; " class="">
        日期: &nbsp;&nbsp;<el-date-picker
            v-model="detail.date"
            type="date"
            value-format="yyyy/MM/dd"
            style="width: 60%; "
            placeholder="选择日期">
          </el-date-picker>
      </span>
       <!--  -->
      <span style="width: 80%; " class="">
        <el-input v-model="detail.title" clearable style="width:60%"></el-input>
      </span>
      <span style="width: 20%; " class="">PO No:{{detail.poNo}}</span>
      <!--  -->
      <span style="width: 80%; " class="">
        Supplier:{{detail.sellerEnName}}
      </span>
      <span style="width: 20%; " class="">
        聯絡人:&nbsp;&nbsp;<el-input v-model="detail.linkman" clearable style="width:60%"></el-input>
      </span>
      <!--  -->
      <span style="width: 80%; " class="">
        交貨地址:&nbsp;&nbsp; <el-input v-model="detail.deliveryAddress" clearable style="width:60%"></el-input>
      </span>
      <span style="width: 20%; " class="">
        電話:&nbsp;&nbsp;<el-input v-model="detail.tel" clearable style="width:60%"></el-input>
      </span>
      <!--  -->
      <span style="width: 80%; " class=""></span>
      <span style="width: 20%; " class="">
        手機:&nbsp;&nbsp;<el-input v-model="detail.moblie" clearable style="width:60%"></el-input>
      </span>
      <!--  -->
      <span style="width: 70%; " class="">
        送貨日期:&nbsp;&nbsp;<el-date-picker
            v-model="detail.deliveryDate"
            type="date"
            value-format="yyyyMMdd"
            style="width: 60%; "
            placeholder="选择日期">
          </el-date-picker>
      </span>
      <span style="width: 30%; " class="">
        送貨方式:&nbsp;&nbsp;<el-input v-model="detail.deliveryMethod" clearable style="width:60%"></el-input>
      </span>
      <!--  -->
      <span class="">SAP CODE</span>
      <span style="width: 30%; " >產品名稱</span>
      <span>板數</span>
      <span>每板數量/罐</span>
      <span>數量/罐</span>
      <span>List price/{{detail.currency}}</span>
      <span v-if="detail.codDiscount">Net price {{detail.codDiscount}}% COD/{{detail.currency}}</span>
      <span v-else>Net price 1% COD/{{detail.currency}}</span>
      <span>Total</span>
      <!--  -->
      <div style="border-top: 0;" class="list-bx fs-12 clr-II" v-for="(item,i) in detail.goodsList" :key="i">
        <span class=""><el-input v-model="item.sapCode" clearable style="width:100%"></el-input></span>
        <span style="width: 30%; " >{{item.goodsName}}</span>
        <span>{{item.platesNum}}</span>
        <span>
          <el-input v-model="item.preNum" clearable style="width:100%" @change="changPreNum(i)"></el-input>
        </span>
        <span>{{item.num}}</span>
        <span>
          <el-input v-model="item.listPrice" clearable style="width:100%"></el-input>
        </span>
        <span>{{item.price}}</span>
        <span>{{item.amount}}</span>
      </div>
      <!--  -->
      <span class="">Total：</span>
      <span style="width: 30%; " ></span>
      <span>{{detail.totalPlatesNum}}</span>
      <span></span>
      <span>{{detail.totalNum}}</span>
      <span></span>
      <span>Grand Total：</span>
      <span>
        <el-input v-model="detail.totalAccount" clearable style="width:100%"></el-input>
      </span>
      <!--  -->
      <span class=""  style="height: 120px;">
        備註:
      </span>
      <span style="width: 90%;  height: 120px; " >
       <el-input type="textarea" v-model="detail.remark" clearable style="width:80%" rows="5"></el-input>
      </span>
      <!--  -->
      <span>公司蓋章:</span>
      <span style="width: 70%;"></span>
      <span>COD Discount:</span>
      <span>
        <el-input v-model="detail.codDiscount" clearable style="width:100%"></el-input>%
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
  },
  mounted() {
  },
  methods: {
    changPreNum(i) {
      const { num, preNum } = this.detail.goodsList[i]
      if (isNaN(preNum)) {
        this.detail.goodsList[i].preNum = ''
        return false
      }
      const platesNum = num / preNum
      this.detail.goodsList[i].platesNum = platesNum.toFixed(2)
      // 计算总数
      let totalPlatesNum = 0
      this.detail.goodsList.forEach(item => {
        const num = item.platesNum ? +item.platesNum : 0
        totalPlatesNum = totalPlatesNum + num
      })
      this.detail.totalPlatesNum = totalPlatesNum.toFixed(2)
    }
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
    justify-content: flex-start;
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
