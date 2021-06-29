<template>
    <div id="union">

        <div class="ww">
            <!-- <Header v-on:getHeaderMag="showHeaderMag"></Header>
            <div class="container">
                <div class="row">
                    <p class="header_title">{{pageTitle}}</p>
                </div>
            </div> -->
            <div class="ww-banner">
              <Headers />
          </div>
            <!-- <Headers v-on:getHeaderMag="showHeaderMag"/> -->
            <Banner :list="top" :auto-play="autoPlay"/>
        </div>
        <div class="service_model" :style="{background: 'url('+ serviceModel.img +') center / cover no-repeat'}">
            <div class="row">
                <p class="digital_page_title wow fadeInUp" data-wow-delay="500ms">{{serviceModel.name}}</p>
                <div class="container">
                    <!-- <div class="row"> -->
                        <div class="digital_tab_title">
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 digital_tab_box clearfix  wow fadeInUp" data-wow-delay="500ms">
                              <ul class="clearfix">
                                <li  :class="{ active: tabIndex == index, hoverActive: hoverIndex ==index }" v-for="(item,index) in serviceModel.columnList" :key="index" @mouseover="switchTab(index)"><div :class="tabIndex ==index ? 'animated hoverActive' :''">{{item.title}}</div></li>
                              </ul>
                            </div>
                            <template v-for="(item,index) in serviceModel.columnList">
                            <div v-if="index == tabIndex" :class="tabIndex ==index ? 'animated' :''" :key="index" class="col-lg-6 col-md-6 col-sm-6 col-xs-6 digital_tab_con wow fadeInUp" data-wow-delay="500ms">
                                <vue-scroll style="height: 3.2rem;">
                                    <div v-html="item.html"></div>
                                </vue-scroll>
                            </div>
                            </template>
                        </div>
                    <!-- </div> -->
                </div>
            </div>

        </div>
        <div class="product_position_box" :style="{background: 'url('+ productPosition.img +') center / cover no-repeat'}">
          <div class="container">
            <div class="row">
                <div class="product_position clearfix"  :style="{background: 'url('+ productPosition +') center no-repeat'}">
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 product_item" v-for="(item,index) in productPosition.columnList" :key="index">
                    <div class="product_position_con wow fadeInUp" data-wow-delay="1200ms">
                      <p class="product_title">{{item.title}}</p>
                      <div v-html="item.html" class="product_position_list wow fadeInUp">

                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div :style="{background: 'url('+ skuNumber.img +') center / cover no-repeat'}">
          <div class="sku_number_box" >
            <p class="digital_page_title wow fadeInUp" data-wow-delay="500ms">{{skuNumber.name}}</p>
              <div class="sku_num_box ">
                <div class="sku_num wow fadeInUp" data-wow-delay="500ms">
                  <countTo :autoplay="true" ref="countTo" :startVal="0" :endVal='parseInt(skuNumber.description)' :duration='3000'>+</countTo>
                    <span class="num_plus">+</span>
                </div>
              </div>

        </div>
        </div>
        <div class="container">
            <div class="row">
                <p class="digital_page_title wow fadeInUp" data-wow-delay="500ms">{{productSkuList.name}}</p>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="sku_list clearfix"
                v-for="(item,index) in productSkuList.columnList" :key="index">
                  <div class="col-md-3 col-xs-6 sku_item wow fadeInUp" data-wow-delay="100ms" v-for="(list,index1) in item" :key="index1">
                      <div class="clearfix">
                          <a href="javascript:;"></a>
                          <div class="sku_list_bg" :style="{background: 'url('+ list.img +') center / cover no-repeat'}"  v-if="$i18n.locale == 'cn'">
                              {{list.title}}
                          </div>
                          <div class="sku_list_bg_en" :style="{background: 'url('+ list.img +') center / cover no-repeat'}"  v-if="$i18n.locale == 'en'">
                              {{list.title}}
                          </div>                          
                          <ul>
                              <li v-for="(cate,index3) in list.columnList" class="sku_list_cate" :key="index3">
                                  <el-tooltip :content="cate.title" placement="top">
                                      <p>{{cate.title}}</p>
                                  </el-tooltip>
                                  <div class="sku_img_box">
                                      <img :src="cate.img">
                                  </div>
                              </li>
                          </ul>
                      </div>
                  </div>
                </div>
            </div>
        </div>
        <div class="service_advantage">
          <div class="container">
              <div class="row">
                  <p class="digital_page_title wow fadeInUp" data-wow-delay="500ms">{{serviceAdvantage.name}}</p>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 service_advantage_item"
                  v-for="(item,index) in serviceAdvantage.columnList" :key="index" ref="indexAdvantage">
                    <div class="service_advantage_con wow fadeInUp" data-wow-delay="200ms">
                      <a href="javascript:;"></a>
                      <img :src="item.img">
                      <p class="service_advantage_title">{{item.title}}</p>
                      <p>{{item.description}}</p>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from "@/components/headerfooter/headers";
import Footer from "@/components/headerfooter/footers";
import {Api} from '@/assets/js/api_kz'
import Banner from "../components/ww/banner";
import countTo from 'vue-count-to'
import { Loading } from 'element-ui';
import { WOW } from 'wowjs'
export default {
    components: { Header, Footer,Banner, countTo },
    data() {
        return {
            top: [],
            autoPlay: false,
            pageTitle: '',
            tabIndex: 0,
            hoverIndex:null,
            skuNumber: [],
            serviceModel:[],
            productPosition:[],
            productSkuList:[],
            serviceAdvantage:[],
            metaTitle: ''
        };
    },
    created() {
      this.loadingInstance = Loading.service({})
    },
    mounted(){
      this.dtpDigital()
      this.metaTitle = this.$t('menu.Demand')
    },
    methods:{
        wowLoad(){
          let that = this
          let  ie = /msie (6.0|7.0|8.0|9.0)/i.test(navigator.userAgent)
          this.wow = new WOW({
                    live: false,
                    callback: function(box) {
                      if(!ie){ // ie10+
                        box.classList.add('wow1')
                      }
                      if(box.className.indexOf('sku_num') != -1){ // 数字动画
                        that.countToAnimate()
                      }
                    }
                  }
          )
          this.wow.init()

          setTimeout(()=>{
            let maxHeight = 0
            let listArray = []
            for(let v of that.$refs.indexAdvantage){
              listArray.push(v.offsetHeight)
            }
            maxHeight = (Math.max.apply(null, listArray)) + 'px'
            let list = document.querySelectorAll('.service_advantage .service_advantage_item')
            for(let ll of list){
              ll.style.minHeight = maxHeight
            }
          },500)
        },
        dtpDigital(){
            let that = this
            Api.digitalService({ columnId: this.$route.query.columnId }).then(res => {
                let data = res[1]
                if(data && data.result === 1){
                    this.top = data.data[0].columnList
                    if(this.top.length > 1){
                      this.autoPlay = true
                    }
                    this.pageTitle = data.data[0].description
                    this.serviceModel = data.data[1]
                    this.productPosition = data.data[2]
                    this.skuNumber = data.data[3]
                    this.productSkuList = data.data[4]
                    this.serviceAdvantage = data.data[5]
                    data.data[4].columnList = [data.data[4].columnList]
                    that.$nextTick(() => {
                      that.wowLoad()
                    })
                }else{
                    this.$message.error(''+this.$t('other.requestHomeFailed'))
                    console.log('请求失败')
                }
                this.loadingInstance.close()
            })
        },
        switchTab(index){
            this.tabIndex = index
        },
        // mouseOver(index){
        //     this.hoverIndex = index
        // },
        // mouseLeave(index){
        //     this.hoverIndex = index
        // },
        countToAnimate(index){
          let count = this.$refs.countTo
          if(count) {
              count.start()
          }
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
};
</script>
<style lang="less" >

    @import "../assets/css/font-icon.css";
    #union{
        overflow: hidden;
        .icon-dow:after {
            content: "\e736";
            margin-left: 0.1rem;
        }
    }
    .header_title{
        font-size: 0.6rem;
        font-family: PingFangSC-Thin;
        color: #fff;
        text-align: center;
        margin: 0;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    .service_model{
      width: 100%;
      height: 5.2rem;
      color: #ffffff;

    }
    .digital_tab_title{
        .digital_tab_box{
          padding: 0.2rem 0;
          float: left;
          border-right: 1px solid #ECECEC;
          margin-right: 0.7rem;
        }
        ul{
            li{
                line-height: 0.35rem;
                font-size: 0.18rem;
                cursor: pointer;
                text-align: center;
                margin-bottom: 0.40rem;
            }
            li:last-child{
              margin-bottom: 0;
            }
            .active{
                border-right: 0.05rem solid #0062FE;
                margin-left: 0.05rem;
                // font-size: ;
            }
            .hoverActive{
               font-size: 0.24rem;
            }
        }
        .digital_tab_con{
          float: left;
          color: #fff;
          p{
            line-height: 0.4rem;
            font-size: 0.18rem;
          }
        }
    }

    .digital_page_title{text-align: center;font-size: 0.4rem;padding: 0.6rem 0;font-family: regular;}
    .product_position_box{
      padding: 0.97rem 0 1.23rem;
    }
    .product_position{
      padding: 0 1rem;
      .product_item{
        &:nth-child(2){
          .product_position_con{
            float: right;
          }
        }
      }
      .product_position_con{
        width: 2.74rem;
        height: 3.8rem;
        background-color:rgba(3,13,38,0.8);
        color: #fff;
        padding: 0.35rem;
        .product_title{
          padding-left: 0.18rem;
          margin-bottom: 0.35rem;
          font-size: 0.3rem;
          position: relative;
            &:after{
                content: "";
                width: 0.05rem;
                height: 68%;
                background: #0062FE;
                position: absolute;
                left: 0;top: 18%;
            }
        }
        .product_position_list{
          padding-left: 0.2rem;
          p{
              z-index:9999;
              font-size: 0.18rem;
          }
        }
      }
    }
    .sku_number_box{
      position: relative;
      height: 5.6rem;
      .sku_num_box{
        position: absolute;
        left: 50%;
        top: 50%;
        .slate(-50%,-50%);
        font-size: 0.9rem;
        color: #FF3333;
        .sku_num{

          position: relative;
          font-weight: bold;
          width: 100%;
          .num_plus{
            position: absolute;
            right: 0;
            top: 0;
            .slate(100%,-20%)
          }
        }

      }
    }
    .sku_item{
      .sku_list_bg{
        height: 1.75rem;
        line-height: 1.75rem;
        text-align: center;
        font-size: 0.24rem;
        color: #FFFFFF;
          .animates();
      }
      .sku_list_bg_en{
        height: 1.75rem;
        line-height: 1.75rem;
        text-align: center;
        font-size: 0.20rem;
        color: #FFFFFF;
          .animates();
      }      
      .sku_list_cate{
        width: 48%;
        float: left;
        padding-top: 0.45rem;
        margin-bottom: 0.4rem;
        &:nth-child(odd){
          margin-right: 4%;
        }
        p{
          font-size: 0.18rem;
          color: #444444;
          text-align: center;
          margin-bottom: 0.54rem;
          height:0.28rem;
          line-height: 0.28rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          width: 100%;
        }
        .sku_img_box{
          height: 1.75rem;
          line-height: 1.75rem;
          text-align: center;
          img{
            width: auto;
            height: auto;
            max-width: 88%;
            max-height: 96%;
          }
        }
      }
        .clearfix{
            position: relative;
            margin-bottom: 0.4rem;
        }
        a{
           .animates();
           display: block;
           border: 1px solid #ebebeb;
           cursor: pointer;
           position: absolute;
           top: 0;
           left: 0;
           z-index: 2;
           width: 100%;
           height: 100%;
       }
        &:hover{
            a{
                .scale(1.05);
                -moz-box-shadow: 0px 5px 7px #ddd;
                -webkit-box-shadow: 0px 5px 7px #ddd;
                box-shadow: 0px 5px 7px #ddd;
            }
            .sku_list_bg{
                .scale(1.05);
            }
            .sku_list_bg_en{
                .scale(1.05);
            }            
        }
        ul{
            position: relative;
            z-index: 3;
        }
    }
    .service_advantage{
      background-color: #F5F7FB;
      padding-bottom: 1rem;
      .service_advantage_item{
        .service_advantage_con{
          position: relative;
      .transform(origin,50% 0 0);
          a{
            .animates();
        display: block;
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
          &:hover{
          .scale(1.05);
          -moz-box-shadow: 0px 5px 7px #ddd;
          -webkit-box-shadow: 0px 5px 7px #ddd;
          box-shadow: 0px 5px 7px #ddd;
        }
          }

          img{
            height: 1rem;
          }
          padding: 0.9rem 0;
          background: #FFFFFF;
          text-align: center;
          .service_advantage_title{
            position: relative;
            padding: 0.3rem 0;
            font-size: 0.18rem;
            &:after{
            content: "";
            width: 0.2rem;
            height: 2px;
            background: #0062fe;
            display: block;
            position: absolute;
            bottom: 0.1rem;
            left: 50%;
            margin-left: -0.1rem;
        }
          }
        }
      }
    }
    @media (max-width: 768px){
      .digital_tab_title{
        ul{
          .active{
            font-size: 0.24rem;
          }
          .hoverActive{
            font-size: 0.32rem;
          }
        }
        .digital_tab_con{
          p{
            font-size: 0.24rem;
            padding-right: 0.15rem;
          }
        }
      }
      .product_position{
        .product_position_con{
          height: 2.6rem;
        }
      }
    }
</style>
