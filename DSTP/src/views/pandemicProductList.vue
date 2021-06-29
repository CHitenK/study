<template>
    <div class="new-detail-box">
        <div class="bg_header" :style="{background: 'url('+ detailImg +') center / cover no-repeat'}">
            <Headers></Headers>
            <div class="container container-box"  v-if="columnId == 625 || columnId == 930">
                <div class="row">
                    <p class="title_ch_new" v-if="$i18n.locale == 'cn'">{{linkTitle || '政策动态'}}</p>
                    <p class="title_en" v-if="$i18n.locale == 'cn'">NEWS</p>
                    <p class="title_ch_new" v-if="$i18n.locale == 'en'">NEWS</p>
                </div>
            </div>
        </div>
        <div class="container clearfix">
          <div class="xue-box">
              <a :href="'/confrontChannel?columnId='+740" v-if="columnId != 625 && columnId != 930">{{$t('menu.antiEpidemic')}} ></a>
              <a :href="'/confrontChannel?columnId='+740" v-if="columnId != 625 && columnId != 930">{{linkTitle}} ></a>
              <a :href="'/newsList?columnId=' + this.columnId" v-if="columnId == 625 || columnId == 930">{{linkTitle}} ></a>
              <a href="javascript:;"  v-if="columnId != 625 && columnId != 930">{{$t('other.pandemicProduct')}}</a>
        </div>
            <div v-for="(item,index) in productCategory.records" :key="index" class="product_box" :style="{marginRight:(index === 3 || index === 7 ? '0': '')}">
              <router-link :to="{name: 'pandemicProductList', query:{id: item.columnId, title: ''+$t('other.reliableSuppliers'), detailImg: detailImg, columnId: columnId}}">
                 <img :src="item.img" alt="">
                 <p>{{item.title}}</p>
                 <span>{{item.title}}</span>
                 <div class="inquiry" @click="isShow = true">我要询价></div>
              </router-link>
            </div>
      </div>
      <div class="mask" v-show="isShow">
          <div class="inquiryFrom">
               <div class="backgroudBox clearfix">
                 <div class="cancel" @click="isShow = false">×</div>
                 <div class="fromBox">
                   <p>{{$t('other.inquiry')}}</p>
                   <div class="clearfix inputBox">
                     <span>{{$t('other.person') + ' :'}}</span>
                     <div class="clearfix"><i class="icon1"></i><input v-model="userName" type="text"  @blur="blurName($event)" :placeholder="$t('registered.name')"></div>
                   </div>
                   <div class="clearfix inputBox">
                     <span>{{$t('footers.email') + ' :'}}</span>
                     <div class="clearfix"><i class="icon2"></i><input v-model="email" type="text"  @blur="blurEmail($event)" :placeholder="$t('registered.emailAddress')"></div>
                   </div>
                   <div class="clearfix inputBox">
                     <span>{{$t('other.certification') + ' :'}}</span>
                     <div class="clearfix"><i class="icon3"></i><input v-model="certification" type="text"></div>
                   </div>
                   <div class="clearfix inputBox">
                     <span>{{$t('other.specification') + ' :'}}</span>
                     <div class="clearfix"><i class="icon4"></i><input v-model="specification" type="text"></div>
                   </div>
                   <div class="clearfix inputBox">
                     <span>{{$t('other.quantity') + ' :'}}</span>
                     <div class="clearfix"><i class="icon5"></i><input v-model="quantity" type="text" placeholder="请输入数量"></div>
                   </div>
                   <div class="submit" @click="submit()">{{$t('form.submit')}}</div>
                 </div>
                </div>  
          </div>
      </div>
      <template>
         <el-button :plain="true">错误</el-button>
      </template>
        <Footers></Footers>
    </div>
</template>
<script>
import { Api } from '@/assets/js/api_kz'
import {Message} from 'element-ui';
export default {
    components: { },
    data() {
        return {
            id: '',
            linkTitle: '',
            columnId: '',
            detailImg: '',
            productCategory: null,
            isShow: false,
            userName: null,
            email: null,
            certification: null,
            specification: null,
            quantity: null
        };
    },
    methods:{
      ProductList(id) {
        Api.pandemicProducts({
           columnId: id,
           pageIndex: 1,
           pageSize: 8
        }).then(res => {
          let data = res[1]
        if (res && res.data && res.result === 1) {
          this.productCategory = data.data 
          } else {
            console.log('请求失败')
        }
      })
    },
    init (id) {
      console.log(this.$route)
      this.id = id || this.$route.query.id
      this.linkTitle = this.$route.query.title
      this.columnId = this.$route.query.columnId
      this.detailImg = this.$route.query.detailImg
      this.ProductList(id)
    },
    blurName ($even) {
     if (!$even.target.value) {
          Message({
               showClose: true,
               message: '不能为空',
               type: 'warning'
             });
     }
    },
    blurEmail($even) {
       if (!$even.target.value) {
          Message({
               showClose: true,
               message: '不能为空',
               type: 'warning'
             });
     }
    },
    submit() {
      if (this.userName && this.email) {
         Api.demand({
           userName: this.userName,
           email: this.email,
           seniority: this.certification,
           specification: this.specification,
           number: this.quantity
        }).then(res => {
          if(res && res.result === 1) {
            Message({
               showClose: true,
               message: this.$t('other.success'),
               type: 'success'
             });
          } else if (res.message){
           Message({
               showClose: true,
               message: res.message,
               type: 'error'
             }); 
          }
          this.isShow = false
          this.userName = null
          this.email = null
          this.seniority = null
          this.specification = null
          this.number = null
        })
      }
     }
    },
    mounted(){
      this.init()
    }
};
</script>
<style lang="less" scoped>
    .new-detail-box {
      .bg_header{
          width: 100%;
          height: 3.7rem;
          background: url("@{imageUrl}bg_news.png") center / cover no-repeat;
          position: relative;
      }
      .container-box{
          height:  100%;
        .home-center;
          @media(max-width: 767px){
              width: 100%;
          }
      }
      .title_ch_new{
          .media-font(0.54rem);
          width: 100%;
          color: #fff;
          margin-top: 1.5rem;
//          .home-center;
          @media(max-width: 767px){
              padding:0 0.15rem;
          }
      }
      .title_en{
          .media-font(0.3rem);
          color: rgba(255,255,255,0.26);
      }
      >.title{
          .media-font(0.2rem,0.22rem,0.26rem);
          .media-line(0.2rem);
          .marginTb(0.1rem);
      }
      .container {
       padding: 0 1.81rem;
       margin-bottom: 0.93rem;
      .xue-box {
        .media-font(0.186rem,0.206rem,0.246rem);
        line-height: 0.4rem;
        font-weight: bold;margin: 0.2rem 0 0;
          a{
              padding-right: 5px;
              cursor: pointer;
              color: rgba(0,98,254);
              &:hover{
                  color: rgba(0,98,254, .7);
              }
          }
          span {
              color: #999999;
          }
       }
       }
        .product_box {
          position: relative;
          float: left;
          width: 2.13rem;
          height: 3rem;
          margin: 0.32rem 0.23rem 0 0;
            img {
              width: 2.13rem;  
              height: 1.69rem;
          }
          p {
            padding-top: 0.19rem;
            font-size:0.15rem;
            font-family:Source Han Sans CN;
            font-weight:bold;
            color:rgba(89,87,87,1);
            line-height:0.18rem;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          span {
            font-size:0.12rem;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(148,148,148,1);
            line-height:0.17rem;
          }
          .inquiry {
            position: absolute;
            bottom: 0;
            left: 50%;
            -webkit-transform: translateX(-50%);
            -ms-transform: translateX(-50%);      
            -moz-transform: translateX(-50%);    
            -o-transform: translateX(-50%);
            transform: translateX(-50%);
            width:1.68rem;
            height:0.34rem;
            background:linear-gradient(-90deg,rgba(0,98,254,1),rgba(44,124,255,1));
            border-radius:0.16rem;
            margin: 0 auto;
            font-size:0.15rem;
            line-height: 0.34rem;
            text-align: center;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(255,255,255,1);
          }
        } 
        .mask {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 99;
          width: 100%;
          height: 100%;
          background: #000;
          background: rgba(0,0,0,0.5);
          .inquiryFrom {
            padding: 0.094rem;
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%,-50%);
            -ms-transform: translate(-50%,-50%);      
            -moz-transform: translate(-50%,-50%);    
            -o-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
            width: 8.48rem;
            height: 5.32rem;
            background:rgba(243,245,251,0.8);
            .backgroudBox {
              background: #fff url("@{imageUrl}hemisphere.png") -3.21rem -2.8rem no-repeat;
              background-size: cover;
              width: 100%;
              height: 100%;
              padding: 0.1rem;
              .cancel {
                cursor: pointer;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                font-size: 0.3rem;
                width: 0.3rem;
                height: 0.3rem;
                float: right;
                line-height: 0;
                background: none;
                text-align: center;
                line-height: 0.3rem;
                color: #ccc;
              }
              .fromBox {
                float: right;
                width: 4.2rem;
                height: 1px;
                margin:0.236rem 0.372rem 0 0;
                .inputBox {
                  height: 0.417rem;
                  margin-top: 0.218rem;
                  span {
                    float: left;
                    font-size:0.175rem;
                    margin-right: 0.1rem;
                    font-family:Source Han Sans CN;
                    font-weight:500;
                    color:rgba(0,98,250,1);
                    line-height:0.417rem;
                  }
                  .icon1 {
                    background: url("@{imageUrl}icon1.png") center no-repeat;
                  }
                  .icon2 {
                    background: url("@{imageUrl}icon2.png") center no-repeat;
                  }
                   .icon3 {
                    background: url("@{imageUrl}icon3.png") center no-repeat;
                  }
                   .icon4 {
                    background: url("@{imageUrl}icon4.png") center no-repeat;
                  }
                   .icon5 {
                    background: url("@{imageUrl}icon5.png") center no-repeat;
                  }
                  div {
                    height: 100%;
                    overflow:hidden;
                    background:rgba(250,250,250,1);
                    border-radius: 0.20863rem;
                    i {
                      float: left;
                      height: 0.417rem;
                      width: 0.417rem;
                      background-size: cover;
                    }
                    input {
                      height: 100%;
                      overflow:hidden;
                      outline: none;
                      border: none;
                      background: transparent;

                    }
                    input::-webkit-input-placeholder{
                      color: #C8C8C8;
                    }
                  }
                }
                p {
                  font-size: 0.23rem;
                  text-align: center;
                  font-family:Source Han Sans CN;
                  font-weight:500;
                  color:rgba(0,98,250,1);
                  padding-bottom: 0.1rem;
                }
              .submit {
                cursor: pointer;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                width: 4.21rem;
                height: 0.516rem;
                margin: 0.38rem auto 0;
                text-align: center;
                line-height: 0.516rem;
                font-size: 0.21961rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                color: #fff;
                background:rgba(0,98,250,1);
                border-radius:0.25256rem;
              }
              }
            }
          }
        }
    }
</style>