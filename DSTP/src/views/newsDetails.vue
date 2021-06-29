<template>
    <div class="new-detail-box">
        <div class="bg_header" :style="{background: 'url('+ detailImg +') center / cover no-repeat'}">
            <Headers :from="'newsDetails'"></Headers>
            <div class="container container-box"  v-if="columnId == 625 || columnId == 930">
                <div class="row">
                    <p class="title_ch_new" v-if="$i18n.locale == 'cn'">{{linkTitle || '政策动态'}}</p>
                    <p class="title_en" v-if="$i18n.locale == 'cn'">NEWS</p>
                    <p class="title_ch_new" v-if="$i18n.locale == 'en'">NEWS</p>
                </div>
            </div>
        </div>
        <div class="newsDetails">
            <div class="container">
                <div class="row" >
                    <div class="col-lg-12 col-md-12 col-sm-12"> 
                        <div class="row">
                            <div class="col-lg-9 col-md-8">
                                <div class="row">
                                    <div class="article_con">
                                        <div class="xue-box">
                                          <a :href="'/confrontChannel?columnId='+740" v-if="columnId != 625 && columnId != 930">{{$t('menu.antiEpidemic')}} ></a>
                                          <a :href="'/confrontChannel?columnId='+740" v-if="columnId != 625 && columnId != 930">{{linkTitle}} ></a>
                                          <!-- <a :href="'/prevention?columnId=' + this.columnId" v-if="columnId != 625 && columnId != 930">{{linkTitle}} ></a> -->
                                          <a :href="'/newsList?columnId=' + this.columnId" v-if="columnId == 625 || columnId == 930">{{linkTitle}} ></a>
                                          <a href="javascript:;"  v-if="columnId != 625 && columnId != 930">{{$t('other.factories')}}</a>
                                        </div>
                                        <p class="title">{{article.title}}</p>
                                        <p class="pubTime" v-if="[827, 1140].includes(columnId)">{{article.pubTime}}</p>
                                        <p v-html="article.content" v-if="article.content"></p>
                                        <p v-else>{{article.description}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="recommend">
                                <div class="col-lg-3 col-md-4" v-if="showRecommend">
                                    <div class="row">
                                        <p class="new_info">{{$t('other.mightNeed')}}</p>
                                        <template v-for="(item, index) in records">
                                            <div class="col-xs-12 recommendItem" :key="index"  v-if="item.articleId != id" @click="toDetails(item.articleId)">
                                                <div class="cursor news-recommend">
                                                    <div class="col-sm-5 col-xs-4">
                                                        <div class="row">
                                                            <div class="img_box" :style="{background: 'url('+ item.img +') center no-repeat',backgroundSize: 'cover'}"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-7 col-xs-8">
                                                        <div class="row">
                                                            <el-tooltip :content="item.title" placement="top">
                                                                <p class="recommend_title">{{item.title}}</p>
                                                            </el-tooltip>
                                                            <p class="recommend_description">{{item.description}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footers></Footers>
    </div>
</template>
<script>
import { Api } from '@/assets/js/api'
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
            showRecommend: true
        };
    },
    methods:{
        newsDetails(){
          Api.newsDetails({
              articleId: this.id,
          }).then(res => {
              let data = res[1]
              if(data && data.result === 1){
                  this.article = data.data
              } else {
                  console.log('请求失败')
              }
          })
      },
        newInfo(){
            Api.recommendNewsList({
                columnId:this.columnId,
                pageSize: 5,
                pageIndex: 1
            }).then(res => {
                let data = res[1]
                if(data && data.result === 1){
                    this.records = data.data.records
                    if(data.data.records.length == 1 && data.data.records[0].articleId == this.id){
                        this.showRecommend = false
                    }
                } else {
                    console.log('请求失败')
                }
            })
        },
        toDetails(id){
          this.init(id)
          window.scrollTo(0,0)
        },
    init (id) {
      console.log(this.$route)
      this.id = id || this.$route.query.id
      this.linkTitle = this.$route.query.title
      this.columnId = this.$route.query.columnId
      this.detailImg = this.$route.query.detailImg
      this.newsDetails()
      this.newInfo()
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
      .xue-box {
        .media-font(0.24rem,0.26rem,0.3rem);
        line-height: 0.4rem;
        font-weight: bold;margin: 0.1rem 0;
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
      .newsDetails{
          margin-top: 0.1rem;
          .title{
              margin-bottom: 0.3rem;
          }
      }
      .article_con{
          padding-right: 0.2rem;
          overflow: auto;
          img{
            width: 100% !important;
            height: auto !important;
          }
          table{
              border-collapse: collapse; border-spacing: 0;
              display: inline-block;
              *{
                  width: auto!important;
                  word-wrap: break-word;
              }
          }
          .title{font-size: 0.2rem;color: #333;}
      }
      .pubTime{
          color: #6a6a6a;
          line-height: 40px;
      }
      .img_box{
          width: 100px;
          height: 78px;
          margin-right: 5px;
      }
      .new_info{
          line-height: 0.4rem;
          font-size: 16px;
          padding-left: 0.15rem;
      }
      .recommend_title{
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-weight: bold;
          margin-bottom: 1px;
      }
      .recommend_description{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          font-size: 12px;
          line-height: 1.6;
          max-height: 57px;
      }
        .recommendItem{
            margin-bottom: 0.15rem;
        }
        @media(max-width: @md-width){
            .news-recommend{
                .marginLr(-0.15rem);
                .col-sm-5{
                    width: auto;
                }
                .col-sm-7{
                    position: absolute;
                    padding-left: 120px;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100px;
                }
            }
            .article_con{
                .xue-box{
                    .marginTb(0.3rem);
                }
            }
        }
    }
    @media (max-width: 768px){
      .new-detail-box{
          .clr-w{
              padding-right: 0.2rem;
          }
        .register{width: 100%;}
        .news_box_pc{display: none;}
        .news_box_mobile{display: block;}
        .news_img{width: 100%;}
        .news_title{padding: 0 10px;}
        .title_en{.media-font(0.18rem);margin-left: 10px;}
        .article_con,.new_info{
            .paddingLr(0.2rem);
            padding-left: 0.15rem;}
        .article_con {
          img{
            width: 100%!important;
            height: auto !important;
          }
        }
        .xue-box a{
          padding-right: 0.05rem;
          cursor: pointer;
          color: rgba(0,98,254);
            font-size: 16px;
          &:hover{
            color: rgba(0,98,254, .7);
          }
        }
        .newsDetails{
          margin-top: 0.08rem;
          .title {
            margin-top: 0.20rem;
              font-size: 16px;
              margin-bottom: 0.4rem;
          }
        }
      }
      .recommend{padding: 0 0.2rem;}
    }
</style>