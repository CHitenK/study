<template>
  <div class="container">
       <el-row :gutter="30" id="container-item">
        <el-col  :xs="24" :sm="20">
          <el-row :gutter="15">
            <el-col  :xs="24" :sm="11">
              <div class="product-detail-img-box">
                  <el-carousel style="height: 3.0rem;" :interval="3000">
                    <el-carousel-item v-for="item in detail.imageMap.Material" :key="item">
                      <img :src="item" class="product-detail-img" />
                    </el-carousel-item>
                  </el-carousel>
              </div>
            </el-col>
            <el-col :xs="24" :sm="13">
              <div class="product-detail-des-box">
                  <div>
                    <p class="product-detail-name">
                      {{detail.name}} <span>({{detail.productType}})</span>
                    </p>
                    <p class="guige">规格：{{detail.specValJson[0].values[0].value}} </p>
                  </div>
                  
                    <div class="tool-box">
                      <div class="change-num-box">
                        购买数量：<el-input-number v-model="num" :min="1" :max="30" label="描述文字"></el-input-number>
                      </div>
                      <div class="btn-box">
                        <el-button class="add-shopcar-btn">加入购物车</el-button>
                        <el-button class="buy-btn">加入购物车</el-button>
                      </div>
                    </div>
              </div>
            </el-col>
          </el-row>
          <div class="jia-shao-box">
            <img v-for="item in  detail.imageMap.Display" :key="item" :src="item" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="4">
          <div class="product-list-box">
            <p class="for-you">
              为你推荐
            </p>
            <div class="product-list-item" v-for="(item, i) in list" :key="i" @click="linkTo(item.id)"> 
              <img :src="item.imageUrl" />
              <p class="product-list-item-name" v-html="item.name">
              </p>
              <p class="product-list-item-price">
                ￥{{item.price}}
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
  </div>
</template>
<script>
export default {
    async asyncData(context) {
    try {
      // 传参获取 context.params  context.query
      let { id } = context.query // ?id=12132, 
      const usefuliIds = ['63276', '63279', '77198', '83549', '83555']
      if (!usefuliIds.includes(id)) {
        const roundNum = Date.now()
        id = usefuliIds[roundNum % 5]
      }
      // 商品信息
      const res = await context.$axios.$get('/product/detail?id=' + id)
      let detail = {}
      if (res.code === 200 && res.data) {
        detail = res.data
      }
      // 为你推荐
      // const roundNum1 = Date.now()
      // page = usefuliIds[roundNum1 % 3] + 1
      const res1 = await context.$axios.$get('/product/list', {params: {page: 1, size: 16 } })
      let list = []
      if (res1.code === 200 && res1.data.content) {
        list = res1.data.content || []
      }
      return { detail, list}
    } catch (err) {
      return { detail: {}, list: [] }
    }
  },
  data() {
    return {
      num: 1
    }
  },
  methods: {
    // 跳转详情
    linkTo(id) {
      window.open('/product/detail?id=' + id, '_blank')
    }
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
}

.product-detail-img-box{
  width: 100%;
}
.product-detail-img{
   width: 100%;
   height: 100%;
}
.product-detail-name{
  width: 100%;
  box-sizing: border-box;
  padding: 0.12rem 0;
  font-size: 0.22rem;
  color: #333;
}
.change-num-box{
  font-size: 0.16rem;
  color: #666;
}
.guige{
  font-size: 0.14rem;
  color: #999;
}
.buy-btn{
  color: #ffffff;
  background-color: rgb(254,67, 101);
  margin: 0;
}
.buy-btn:hover{
  color: #ffffff;
  background-color: rgb(254,67, 101);
}
.add-shopcar-btn,
.add-shopcar-btn:hover{
  margin: 0;
  color: #ffffff;
  background-color: rgb(222,156, 83);
}
.tool-box{
  height: 1rem;
}
.btn-box{
  height: .56rem;
  line-height: 0;
}
.product-list-box{
  width: 100%;
  cursor: pointer;
}
.for-you{
  font-size: 0.18rem;
  color: #666;
  text-align: center;
  padding-top: 0.1rem;
}
.product-list-item{
  width: 100%;
  border: solid 1px #eaeaea;
  margin-top: 0.1rem;
}
.product-list-item img{
  width: 100%;
  height: auto;
  border: solid 1px #eaeaea;
}
.product-list-item-name{
  font-size: 0.12rem;
  color: #666;
  margin-top: -0.15rem;
}
.product-list-item-price{
  margin: 0.08rem 0;
  font-size: 0.16rem;
  color: red;
}
.jia-shao-box{
  width: 100%;
  margin-top: 0.2rem;
  margin-bottom: 0.3rem;
}
.jia-shao-box img{
  display: block;
  width: 100%;
}
/* 移动端 */
@media screen and (max-width: 767px) {
    .container {
        width: 100%;
    }
    
}

@media screen and (max-width: 1180px) {
    .container {
        width: 100%;
    }
    .product-detail-des-box{
      height: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
}
@media screen and (min-width: 1181px) {
    .container {
        width: 1180px;
    }
     .product-detail-des-box{
      height: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
}
</style>
