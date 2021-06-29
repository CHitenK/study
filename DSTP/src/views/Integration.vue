<style scoped lang="less">
    /*@font-face{
        font-family: 'Yuanti-SC-Light';
        src: url("../assets/font/Yuanti-SC-Light.ttf") format('truetype'),
    }*/
    #app{
        .integration{
            /deep/ .iScrollVerticalScrollbar{
                display: none;
            }
            .integration-banner{
                position: relative;
                >div{
                    position: absolute;
                    left: 0;
                    right: 0;
                    z-index: 100;
                }
            }
            .digital-server{
                background-color: #282837;
                overflow: hidden;
                margin-bottom:0.5rem;
                position: relative;
                .server-bg-content{
                    .home-center;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.1);
                    z-index: 1;
                }
                iframe{
                    width: 100%;
                    height:10.8rem;
                    border:none;
                }
            }
            .server-case{
                background-color: #f7f7f7;
                overflow: hidden;
                .col-md-3{
                    padding:0;
                }
                .server-case-scroll{
                    height: 2.8rem;
                    /*@media(max-width: 992px){
                        height: 4rem;
                    }*/
                }
                .server-scroll-container{
                    position: relative;
                    z-index: 1;
                    h3{
                        .media-font(0.3rem);
                      margin-top: 0.2rem;
                      margin-bottom: 0.3rem;
                    }
                }
                .server-case-list{
                    position: relative;
                    margin-bottom: 0.3rem;
                    height: 4.2rem;
                    overflow: hidden;
                    cursor: pointer;
                    .paddingLr(0);
                    .h3{
                        .media-font(0.3rem);
                        color: #FFFFFF;
                        text-align: center;
                        // white-space: nowrap;
                        // overflow: hidden;
                        // text-overflow: ellipsis;
                    }
                    span{
                        .media-font(0.18rem);
                        margin-top:0.1rem;
                        color: #FFFFFF;
                        text-align: justify;
                        display: inline-block;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: inline-block;
                        height: 0.3rem;
                    }
                    .server-case-content{
                        .animates();
                        position: absolute;
                        left:0;
                        top:0;
                        width: 100%;
                        height:100%;
                        opacity: 1;
                        z-index: 2;
                        background-color: #f7f7f7;
                        >div{
                            .home-center;
                            width: 95%;
                        }
                        text-align: center;
                        background-repeat: repeat;
                    }
                    .server-case-text{
                        .animates();
                        .padding(0.1rem);
                        text-align: center;
                        color:#fff;
                        width:100%;
                        height: 100%;
                        background-color: #002C92;
                        p{
                            text-align: left;
                            .media-font(0.18rem);
                            .media-line(0.35rem,0.4rem);
                            padding: 0 0.18rem;
                        }
                    }
                    &:hover{
                        .server-case-content{
                            opacity: 0;
                        }
                        .server-scroll-container{
                            z-index: 3;
                        }

                    }
                    @media (max-width: @xs-width) {
                      height: 4.5rem;
                    }
                }
            }
        }
        .get-way{
          width: 100%;
          height: 0.6rem;
          text-align: center;
          line-height: 0.6rem;
            margin-bottom: 0.2rem;
          span {
            display: inline-block;
            width: 2.2rem;
            height: .52rem;
            line-height: .52rem;
            border-radius: .26rem;
            font-size: .26rem;
            color: #0062fe;
            border: solid 1px #0062fe;
            cursor: pointer;
            &:hover{
              opacity: 0.8;
            }
          }
        }
        .fullpage-wrapper{
            position: absolute !important;
            width: 100%;
        }
        .section-auto{
            height: auto!important;
        }
        .section{
            overflow: hidden;
        }
        .section-pt{

        }
        #page3{
            .dtp-index-h3{
                background: #f7f7f7;
            }
        }
        /*@media(max-width: @xs-width){
            .wow{opacity: 1;}
        }*/
    }
</style>
<style lang="less">
    #app{
    .integration {
        .banner .banner-msg p {
            font-size: 0.54rem;
            font-family: "Yuanti-SC-Light","PingFang SC", "Helvetica Neue";
        }
      }
    }
</style>
<template>
    <div class="integration" id="integration">
        <!--头部菜单-->
        <Headers />
        <template v-if="igObj.columnList">
            <full-page :options="options" ref="fullpage">
                <div class="section section-auto">
                    <!--banner-->
                    <Banner :list="top" :banner-msg="false" :auto-play="autoPlay"/>
                    <!--banner end-->
                </div>
                <template v-for="(itemObj, indexObj) in igObj.columnList">
                    <div class="section section-auto section-pt pageTwo">
                        <div class="server-case">
                            <template v-if="indexObj === 0">
                                <h3 class="dtp-index-h3 wow fadeInDown">{{igObj.name}}</h3>
                                <!--获取方案 按钮 -->
                                <div class="get-way fadeInLeft" v-show="loadHtml">
                                    <span class="" @click="layShow=true">{{$t('other.signUp')}}</span>
                                </div>
                                <!--获取方案 按钮 end-->
                            </template>
                            <div class="container">
                                <div class="row" id="caseList">
                                    <div class="col-xs-12">
                                        <div class="row">
                                            <template v-for="(item, index) in itemObj">
                                                <div ref="case" class="col-md-4 col-xs-6" :key="index">
                                                    <div class="server-case-list">
                                                        <div class="server-case-text">
                                                            <div class="server-case-content" :style="{'backgroundImage': 'url('+item.img+')'}">
                                                                <div>
                                                                    <h3 class="h3" v-if="item.img">{{item.name}}</h3>
                                                                    <span>{{item.keywords}}</span>
                                                                </div>
                                                            </div>
                                                            <div class="server-scroll-container">
                                                                <h3>{{item.name}}</h3>
                                                                <span v-if="item.keywords">{{item.keywords}}</span>
                                                                <div class="server-case-scroll">
                                                                    <vue-scroll>
                                                                        <p>{{item.description}}</p>
                                                                    </vue-scroll>
                                                                </div>
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
                </template>
                <div class="section section-pt section-auto">
                    <h3 class="dtp-index-h3 fadeInUp">{{iframeObj.name}}</h3>
                    <div class="digital-server">
                        <iframe id="ig-iframe" style="width: 1px !important; min-width: 100%;" frameborder="0" scrolling="no" :height="iframe.height" :widht="iframe.width" :src="iframeObj.description"></iframe>
                        <div class="server-bg-content">
                        </div>
                    </div>
                    <Footers />
                </div>
            </full-page>
            <getWay @close="layShow=false"  :show="layShow"/>
        </template>
    </div>
</template>

<script>
  import Banner from "../components/home/banner";
  import {Api} from '@/assets/js/api_kz'
  import { WOW } from 'wowjs'
  import { Loading } from 'element-ui'
  import getWay from "../components/integration/getway"
  import {addClass, removeClass} from "@/assets/utils/domClass";
  const windowWidth = document.body.clientWidth
  export default {
    name: "Integration",
    components: {Banner, getWay},
    data(){
      return{
        top: [],
        iframeObj:{},
        igObj: {},
        autoPlay: false,
        iframe:{width:'100%',height:'auto'},
        layShow: false,
        // 全屏滚动的配置项
        options: {
          licenseKey: "69DAB0C0-9A394DA2-9860E293-CC51DE67",
          start:1,
          scrollOverflow:  windowWidth > 767,
          navigation: false,
         // anchors:['page1','page2','page3'],
          showActiveTooltip: false,
          onLeave:this.onLeave,
          afterRender: this.wowLoad,
          scrollBar: false,
        },
        loadHtml: false,
        metaTitle: ''
      }
    },
    created() {
      this.loadingInstance = Loading.service({})
    },
    mounted() {
      Api.centralizeLoad({columnId: this.$route.query.columnId}).then(res=>{
        let data = res[1]
        if(data && data.result === 1){
          let imgList = data.data[0].columnList
          if(imgList.length > 1){
            this.autoPlay = true
          }
          imgList.forEach((item,key)=>{
            item.description = item.keywords
          })
          this.top = imgList
          this.iframeObj = data.data[1]
          this.igObj = data.data[2]
          let tempObj = []
          let numIndex = -1
          if(this.igObj.columnList){
              const mdList = (windowWidth >= 992 ? 3 : 4)
              this.igObj.columnList.forEach((item, index)=>{
              if(index % mdList === 0){
                tempObj.push([])
                numIndex ++
              }
              tempObj[numIndex].push({...item})
            })
          }
          this.igObj.columnList = tempObj
            setTimeout(()=>{
                this.setIframe()
                if(windowWidth < 778){
                    this.$refs.fullpage.api.setAutoScrolling(false)
                }
            }, 0)
        }else{
          this.$message.error(''+this.$t('other.requestServicesFailed'))
          console.log('请求集成服务失败')
        }
        this.loadingInstance.close()
      })
      this.metaTitle = this.$t('menu.integratedServices')
    },
    methods: {
      onLeave(n,p){
            let header = document.getElementById('headers')
            if(p.isFirst){
              removeClass(header,'on')
            }else{
              setTimeout(()=>{
                addClass(header,'on')
              },100)
            }
            if(p.index === 1){
              // this.$addClass(document.querySelectorAll('.pageTwo .col-xs-12.wow'),'animated fadeInLeft')
            }else if(p.isLast){
              this.$refs.fullpage.api.reBuild()
            }
        },
        wowLoad() {
            this.wow = new WOW({
                live: false,
                callback: function(box) {
                    addClass(box,'wow1')
                }
            });
          this.wow.init();
            setTimeout(()=>{
              this.$refs.fullpage.api.reBuild()
            },500)
        },
        setIframe(){
           let iframe = document.getElementById('ig-iframe')
           let bHeight = iframe.contentWindow.document.body.scrollHeight
           let dHeight = iframe.contentWindow.document.documentElement.scrollHeight
           let height = Math.max(bHeight, dHeight,window.screen.width)
           this.iframe.width = window.screen.width
           this.iframe.height = height
           this.$nextTick(() => {
             if(this.$isInViewPortOfOne(document.getElementById('caseList'))){
               // this.$addClass(document.querySelectorAll('#pageTwo .col-xs-12.wow'),'animated fadeInLeft')
             }
             this.loadHtml = true
            });
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
