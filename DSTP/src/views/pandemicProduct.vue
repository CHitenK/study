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
            <div v-for="(item,index) in productCategory" :key="index" class="product_box" :style="{marginRight:(index === 4 || index === 9 ? '0': '')}">
              <router-link :to="{name: 'pandemicProductList', query:{id: item.columnId, title: ''+$t('other.reliableSuppliers'), detailImg: detailImg, columnId: columnId}}">
                <div class="imgbox">
                 <img :src="item.img" alt="">
                </div>
                 <p>{{item.title}}</p>
              </router-link>
            </div>
      </div>
        <Footers></Footers>
    </div>
</template>
<script>
import { Api } from '@/assets/js/api_kz'
export default {
    components: { },
    data() {
        return {
            article: '',
            records: [],
            id: '',
            linkTitle: '',
            columnId: '',
            detailImg: '',
            showRecommend: true,
            productCategory: null
        };
    },
    methods:{
        getProductCategory() {
            Api.category({
              language: this.$i18n.locale === 'en' ? 'en' : null
            }).then(res => {
              let data = res[1]
                if (data && data.result === 1) {
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
      this.getProductCategory()
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
       padding: 0 2rem;
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
          float: left;
          width: 1.56rem;
          height: 1.9rem;
          margin: 0.32rem 0.23rem 0 0;
          padding: 0.42rem 0 0;
          background:rgba(255,255,255,1);
          box-shadow:0px 2px 3px 0px rgba(221,221,221,0.64);
          .imgbox {
            width: 0.79rem;
            height: 0.68rem;
            margin: 0 auto;
            text-align: center;
            img {
              width: auto;  
              height: auto;  
              max-width: 100%;  
              max-height: 100%;
            }
          }
          p {
            padding-top: 0.1rem;
            width: 0.99rem;
            margin: 0 auto;
            text-align: center;
            font-size: 0.15rem;
            font-family:Source Han Sans SC;
            font-weight:500;
            color:rgba(38,90,218,1);
            line-height:0.18rem;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        } 
    }
</style>