<style lang="less">
    .traceability_profile{
        background-size: cover;
        color: #fff;
        position: relative;
        .paddingLr(0.1rem);
        .traceability_profile_scroll{
            height: 2.2rem;
            @media(max-width: 767px){
                height: 3.5rem;
            }
        }
        &:before{
            background-color:rgba(0,50,126,0.65);position: absolute;left: 0;top:0;width: 100%;height: 100%;
            content:'';
        }
        .row{
            position: relative;
            z-index: 11;
            >div{
                .media-font(0.2rem);
                .media-line(0.4rem);
            }
        }
        h3{
            .marginTb(0.5rem);
            font-size: 0.45rem;
            text-align: center;
            font-family: regular;
        }

    }
    .traceability_join{
        background-size: cover;
        color: #fff;
        position: relative;
        .paddingLr(0.1rem);
        .traceability_join_scroll{
            height: 4.3rem;
            @media(max-width: 767px){
                height: 8rem;
            }
        }
        .row{
            position: relative;
            z-index: 11;
            >div{
                .media-font(0.2rem);
                .media-line(0.4rem);
            }
        }
        h3{
            .marginTb(0.5rem);
            font-size: 0.45rem;
            text-align: center;font-family: regular;
        }
    }
    .traceability_service{
        min-height: 8rem;
        overflow: hidden;
        h3{
            .marginTb(0.5rem);
            font-size: 0.45rem;
            text-align: center;
            color: #fff;font-family: regular;
        }
    }
    .service_products{
        position: relative;
    }
    .about-grow-banner>div>span{
        display: inline-block!important;
        background-image: url(~"@{imgUrl}timeline_btn_left.png");
        background-repeat: no-repeat;
        background-size: 9px 16px;
        background-color: #fff;
        width: 0.3rem;
        height:0.3rem;
        overflow: hidden;
        cursor: pointer;
        border-radius: 50%;
        background-position: center;
        position: absolute;
        top: 50%;
        margin-top:-0.15rem;
        left:0;
        z-index:2;
        &:hover{
            background-image: url(~"@{imgUrl}timeline_btn_right.png");
            background-size: 30px;
            .rotate(180deg);
        }
        &:last-child{
            &:hover{
                .rotate(0deg);
            }
            .rotate(180deg);
            left:inherit;
            right:0;
        }
    }
    .register_box{background: #f3f3f3;position: absolute;top: 50%;left: 50%;margin: -279px 0 0 -225px;}
    .hideObj{display: none;}
    .tab{
        background: #fff;
        position: absolute;width: 100%;top: 50%;left: 50%;z-index: 9;
        @media (max-width: 767px) {
            height: 4.8rem;
            top: 106%;left: 0;
        }
        .tab_content{padding: 0 0.45rem 0 0.45rem;margin-top: 1.1rem;height: 2.4rem;
            .product_text p{line-height: 2;}
        }
    }
    .tab_bar{
        border-bottom: 1px solid #e5e5e5;
        .tab_item{
            text-align: center;font-size: 0.18rem;
            span{
                line-height: 0.5rem;position: relative;cursor: pointer;
                &:after {
                    content: "";
                    position: absolute;
                    display: block;
                    width: 0;height: 3px;
                    background: #0062fe;left: 0;
                    -webkit-transition: all 0.5s;
                    transition: all 0.5s;
                }
            }
            .active{
                &:after {
                    width: 100%;
                    -webkit-transition: all 0.5s;
                    transition: all 0.5s;
                }
            }
        }
    }
    .num_button{width: 50%;margin-top: 0.15rem;padding-right: 0.2rem;}
    .num{font-size: 0.2rem;color: #fff;}
    .button{
        width: 0.8rem;
        .prev{
            width: 0.3rem;height: 0.3rem;background: url("@{imageUrl}prev.png") center no-repeat;background-size: 100%;
            &:hover{
                background: url("@{imageUrl}prevActive.png") center no-repeat;background-size: 100%;
            }
        }
        .next{
            width: 0.3rem;height: 0.3rem;background: url("@{imageUrl}next.png") center no-repeat;background-size: 100%;
            &:hover{
                background: url("@{imageUrl}nextActive.png") center no-repeat;background-size: 100%;
            }
        }
    }
    .bg_bar{
        background: rgba(20,20,20,0.5);height: 0.9rem;position: absolute;bottom: 0;width: 100%;left: 0;
        .bar_item{
            line-height: 0.9rem;text-align: center;
            span{border-left: 3px solid #0062fe;padding-left: 0.1rem;margin-right: 0.2rem;display: inline-block;line-height: 1;}
            p{display: inline;}
        }
        .bRight{
            &:after{
                content: "";
                position: absolute;width: 2px;height: 40%;background: #fff;right: 0;top: 30%;
            }
        }
        .btn_check{font-size: 0.16rem;line-height: 0.36rem;border: 1px solid #fff;border-radius: 0.18rem;display: inline-block;padding: 0 0.3rem 0 0.2rem;color: #fff;
            background: url("@{imageUrl}arrow.png") 90% center no-repeat;}
    }
    .lineFeed{display: none;}
    @media (max-width: 992px){
        .el-carousel__container{height: 3.3rem}
        .tab_bar .tab_item span{line-height: 0.7rem;}
    }
    @media (max-width: 767px) {
        /*.about {
            .owl-carousel .owl-stage-outer {
                overflow: inherit;
            }
        }*/
        .bg_bar{
            height: 1.4rem;padding: 0.1rem 0;
            .bar_item {line-height: 0.6rem;}
            .btn_check{
             background-size: 0.1rem;}
        }
        .barItem_en .bg_bar{height: 2rem;}
        .barItem_en .traceability_join_scroll{height: 7.6rem;}
        .tab_bar .tab_item span{line-height: 0.9rem;font-size: 0.31rem;}
        .tab .tab_content{margin-top: 2.2rem}
        .traceability_service{min-height: 11rem;}
        .lineFeed{display: block;}
    }

</style>
<template>
    <div class="">
        <!--头部菜单-->
        <div class="other-banner">
            <Headers @getHeaderMag="loadHeader"/>
            <Banner :bcOtherClass="true" :banner-msg="true" :list="top"/>
        </div>
        <!--全球溯源服务介绍-->
        <div v-if="traceabilityObj[1]" class="traceability_profile" :style="{'backgroundImage': 'url('+traceabilityObj[1].img+')'}">
            <div class="container wow fadeInUp">
                <div class="row">
                    <h3> {{traceabilityObj[1].name}}</h3>
                    <div class="traceability_profile_scroll">
                        <vue-scroll>
                            <div v-html="traceabilityObj[1].html"></div>
                        </vue-scroll>
                    </div>
                </div>
            </div>
        </div>
        <!--全球溯源服务介绍 end-->
        <!--助您加入全球溯源-->
        <div v-if="traceabilityObj[2]" class="traceability_join" :style="{'backgroundImage': 'url('+traceabilityObj[2].img+')'}">
            <div class="container wow fadeInUp">
                <div class="row">
                    <h3> {{traceabilityObj[2].name}}</h3>
                    <div class="traceability_join_scroll">
                        <vue-scroll>
                            <div v-html="traceabilityObj[2].html"></div>
                        </vue-scroll>
                    </div>
                </div>
            </div>
            <div class="bg_bar">
                <div class="container" v-if="$i18n.locale == 'cn'">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" v-for="(item,index) in traceabilityObj[2].columnList" :key="index">
                            <div class="bar_item row" :class="{bRight: index == 0}">
                                <span v-html="item.html"></span><br class="lineFeed"/>
                                <a :href="item.description" target="_blank" class="btn_check" v-if="index == 0">{{$t('other.forDetails')}}</a>
                                <a href="javascript:;" class="btn_check" @click="viewDetails" v-if="index == 1">{{$t('other.forDetails')}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" v-for="(item,index) in traceabilityObj[2].columnList" :key="index"  v-if="$i18n.locale == 'en'">
                    <div class="bar_item row" :class="{bRight: index == 0}">
                        <span v-html="item.html"></span><br class="lineFeed"/>
                        <a :href="item.description" target="_blank" class="btn_check" v-if="index == 0">{{$t('other.forDetails')}}</a>
                        <a href="javascript:;" class="btn_check" @click="viewDetails" v-if="index == 1">{{$t('other.forDetails')}}</a>
                    </div>
                </div>
            </div>
        </div>
        <!--助您加入全球溯源 end-->
        <!--溯源服务产品-->
        <div class="traceability_service" :style="{background: 'url('+ traceabilityObj[3].img +') center no-repeat'}">
            <div class="container wow fadeInUp">
                <div class="row">
                    <h3>{{traceabilityObj[3].title}}</h3>
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                        <div class="row">
                            <div class="service_products">
                                <el-carousel :autoplay="true" indicator-position="none" arrow="never" @change="changeCarousel" ref="carousel">
                                    <el-carousel-item v-for="(item,index) in traceabilityObj[3].columnList" :key="index">
                                        <img :src="item.img" alt="">
                                    </el-carousel-item>
                                </el-carousel>
                                <div class="clearfix num_button">
                                    <span class="num fl">{{tabIndex < 9 ?'0' + (tabIndex + 1) : tabIndex}}/{{length < 10 ? '0' + length : length}}</span>
                                    <div class="clearfix fr button">
                                        <div @click="prev" class="prev fl"></div>
                                        <div @click="next" class="next fr"></div>
                                    </div>
                                </div>
                                <div class="tab">
                                        <div class="tab_bar col-xs-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-xs-6" v-for="(item,index) in traceabilityObj[3].columnList" :key="index">
                                                    <div class="tab_item row">
                                                        <span :class="{ active: tabIndex == index }"  @click="switchTab(index)">{{item.title}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <div v-for="(item,index) in traceabilityObj[3].columnList" :key="index">
                                        <div class="tab_content" :class="tabIndex ==index ? 'animated fadeInUp' :''"  v-show="tabIndex == index">
                                            <vue-scroll>
                                                <div class="product_text" v-html="item.html"></div>
                                            </vue-scroll>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--溯源服务产品 end-->
        <Register v-if="showRegister" v-on:registerParams="getRegisterParams"/>
        <Join v-if="showJoin" v-on:joinParams="getjoinParams" :from="from" :phone="phone" :link="link"/>
        <Footers />
    </div>
</template>
<script>
  import {Api} from '@/assets/js/api_kz'
  import Banner from "../components/home/banner"
  import {Loading} from "element-ui";
  import { WOW } from "wowjs";
  import Register from "@/components/traceability/register";
  import Join from "@/components/traceability/join";

  export default {
    components: { Banner, Register, Join},
    data() {
      return {
        loadingInstance: null,
        top: [],
        traceabilityObj: [{},{},{},{},{},{},{},{}],
        length: 0,
        tabIndex: 0,
        showRegister: false,
        showJoin: false,
        from: '',
        phone: '',
        link: '',
        metaTitle: ''
      }
    },
    created() {
      this.loadingInstance = Loading.service({})
      
    },
    mounted() {
//        this.originList()
        this.metaTitle = this.$t('menu.sourceTracing')
    },
    filters: {
      numberTo (value) {
        if(value < 10){
          return '0'+value
        }
        return value
      }
    },
    methods: {
      wowLoad() {
        let that = this;
        let ie = /msie (6.0|7.0|8.0|9.0)/i.test(navigator.userAgent);
        this.wow = new WOW({
          live: false,
          callback: function(box) {
              if (!ie) {
                  // ie10+
                  box.classList.add("wow1");
              }
          }
        });
        this.wow.init();
      },
        viewDetails(){
          this.showRegister = true
        },
        prev() {
            this.$refs.carousel.prev()
        },
        next() {
            this.$refs.carousel.next()
        },
        switchTab(index) {
            this.tabIndex = index;
            this.$refs.carousel.setActiveItem(index)
        },
      loadHeader(res){
        let that = this
        if(res){
          Api.origin({
              columnId: this.$route.query.columnId,
              language: ''
          }).then(res=>{
            let data = res[1]
            if(data && data.result === 1){
              that.traceabilityObj = data.data
              that.length = data.data[3].columnList.length
              that.top = data.data[0].columnList
              that.link = data.data[4].description
              that.$nextTick(() => {
                that.wowLoad();
              });
            }else{
              that.$message.error(''+ this.$t('other.requestFailed'))
              console.log('请求认识DSTP页面失败')
            }
            that.loadingInstance.close()
          })
        }else{
          that.loadingInstance.close()
        }

      },
     
      loadHeaderError(){
        this.loadingInstance.close()
      },
        changeCarousel(v){
          this.tabIndex = v
        },
        getRegisterParams(value){
            let data = value
            this.from = data.from
            this.phone = data.phone
            this.showRegister = false
            this.showJoin = data.toJoin
        },
        getjoinParams(value){
            this.showJoin = value
        }
    },
    
    // 配置title和meta数据
      metaInfo() {
          return {
              title: this.metaTitle,
              meta: [
                  {
                      name: "keywords",
                      content: ""
                  },
                  {
                      name: "description",
                      content: ""
                  }
              ]
          }
      }
  }
</script>
