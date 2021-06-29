<style scoped lang="less">
    @import "../assets/css/other.less";
</style>
<style lang="less">
    @media (max-width: 767px) {
        .about {
            .owl-carousel .owl-stage-outer {
                overflow: inherit;
            }
        }
    }
    .about-grow-banner>div>span{
        display: inline-block!important;
        background: url(~"@{imgUrl}timeline_btn_left.png") no-repeat;
        background-size: 100%;
        width: 0.3rem;
        height:0.3rem;
        overflow: hidden;
        cursor: pointer;
        position: absolute;
        top: 50%;
        margin-top:-0.15rem;
        left:0;
        z-index:2;
        &:hover{
            background-image: url(~"@{imgUrl}timeline_btn_right.png");
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
    .about-process{padding-bottom: 0.25rem;background: #eef7ff;}
</style>
<template>
    <div class="about">
        <!--头部菜单-->
        <div class="other-banner">
            <Headers @getHeaderMag="loadHeader"/>
            <Banner :banner-msg="false" :list="top"/>
            <!--<img style="width: 100%" :src="aboutObj[0].img" alt="">
            <div class="banner-msg">
                <p class="banner-title">{{aboutObj[0].description}}</p>
            </div>-->
        </div>
        <!--dtp介绍-->
        <div v-if="aboutObj[1]" class="about-profile" :style="{'backgroundImage': 'url('+aboutObj[1].img+')'}">
            <div class="container wow fadeInUp">
                <div class="row">
                    <h3> {{aboutObj[1].name}}</h3>
                    <div class="about-profile-scroll">
                        <vue-scroll>
                            <div v-html="aboutObj[1].html"></div>
                        </vue-scroll>
                    </div>
                </div>
            </div>
        </div>
        <!--dtp介绍 end-->
        <!--全球市场-->
        <div  v-if="aboutObj[2] && aboutObj[2].title !== 'null'" class="about-global wow fadeInUp" :style="{'backgroundImage': 'url('+aboutObj[2].img+')'}">
            <div class="container">
                <div class="row">
                    <div v-if="aboutObj[2].name"><span><i>“</i>{{aboutObj[2].name}}<i v-if="!aboutObj[2].html">”</i></span></div>
                    <div><span><i v-if="!aboutObj[2].name">“</i> <template v-html="aboutObj[2].html"><div v-html="aboutObj[2].html"></div></template> <i v-if="aboutObj[2].html">”</i></span></div>
                </div>
            </div>
        </div>
        <!--全球市场 end-->
        <!--DTP发展里程碑-->
        <div class="about-process wow zoomIn" v-if="aboutObj[3]">
            <div class="container">
                <div class="row">
                    <h3 class="dtp-about-h3">{{aboutObj[3] ? aboutObj[3].name : ''}}</h3>
                    <div class="about-grow-banner" v-if="aboutObj[3].columnList && aboutObj[3].columnList.length">
                        <owlCarousel :dots="false" :autoplay="true" :nav="false" :responsive="{0:{items:2,nav:false},767:{items:3},992:{items:4},1200:{items:6}}">
                            <template slot="prev"> </template>
                            <template slot="next"></template>
                            <div class="about-banner-content" v-for="(item,index) in aboutObj[3].columnList" :key="index">
                                <div :class="{'about-grow-carousel':true,'about-grow-carousel-on': index%2!==0}">
                                  <div class="about-grow-carousel-kk">
                                    <vue-scroll class="about-grow-scroll" style="height:130px">
                                      <div>
                                          <span class="about-grow-title">{{item.name}}</span>
                                          <div class="about-grow-html" v-html="item.html"></div>
                                       </div>
                                    </vue-scroll>
                                  </div>
                                </div>
                            </div>
                        </owlCarousel>
                    </div>
                </div>
            </div>
        </div>
        <!--DTP发展里程碑 end-->
        <!--DTP蓝图展望-->
        <div class="about-grow" v-if="aboutObj[4]">
            <div class="container">
                <div class="row">
                    <h3 class="dtp-about-h3 wow fadeInUp">{{aboutObj[4] ? aboutObj[4].name : ''}}</h3>
                    <div v-for="(item,index) in '123'" :key="index" class="blue-yuan wow fadeInUp"></div>
                    <div class="about-blueprint" v-if="aboutObj[4].columnList">
                        <div class="about-blueprint-list wow fadeInUp" v-for="(item,index) in aboutObj[4].columnList" :key="index">
                            <div class="row">
                                <div class="col-lg-7 col-md-8 col-xs-6">
                                    <div class="about-blueprint-img">
                                        <img :src="item.img" alt="">
                                    </div>
                                </div>
                                <div class="col-lg-5 col-md-4 col-xs-6">
                                    <div class="about-blueprint-text">
                                        <h3>{{(index+1)|numberTo}}</h3>
                                        <h4>{{item.title}}</h4>
                                        <div class="about-blueprint-scroll">
                                        <vue-scroll>
                                        <p>{{item.description}}</p>
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
        <!--DTP蓝图展望 end-->
        <Footers />
    </div>
</template>
<script>
  import {Api} from '@/assets/js/api_kz'
  import Banner from "../components/home/banner"
  import {Loading} from "element-ui";
  import { WOW } from "wowjs";
  export default {
    components: { Banner},
    data() {
      return {
        loadingInstance: null,
        top: [],
        aboutObj: [{},{},{},{},{},{},{},{}],
        metaTitle: ''
      }
    },
    created() {
      this.loadingInstance = Loading.service({})

    },
    mounted() {
        this.metaTitle = this.$t('menu.about')
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
      loadHeader(res){
        let that = this
        if(res){
          Api.meetLoad({columnId: this.$route.query.columnId}).then(res=>{
            let data = res[1]
            if(data && data.result === 1){
              that.aboutObj = data.data
              that.top = that.aboutObj[0].columnList
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
