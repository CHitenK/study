<style lang="less" scope>
    #app .banner{
        .owl-theme .owl-dots .owl-dot{
            outline: none;
        }
        position:relative;
        .pageDown{position:absolute;bottom:20px;left:0;text-align: center;z-index: 1;width: 100%;
            @media(max-width: @xs-width){
                width: auto;
                .home-center;
                top: initial;
                bottom: 0;
            }
        }
        .pageDown img{width: 3%;max-width: 31px;min-width: 10px;
            animation: heart 0.8s ease-in-out 2s infinite alternate;}
        .ww_banner-msg-bc{
            background-color:rgba(24,73,181,0.3);
        }
        .ww_banner-msg{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            .msg_contain{
              position: absolute;
              left: 50%;
              top:50%;
              .slate(-50%,-50%);
              p{
                text-align: center;
                font-size:0.54rem;color:#fff;
              }
              .banner_keywords{
                font-size: 0.28rem;
              }
              .banner_detail{
                  .paddingLr(0.3rem);
                  .paddingTb(0.08rem);
                display: inline-block;
                text-align: center;
                border-radius: 0.18rem;
                color: #0062FE;
                background: #FFFFFF;
                font-size: 0.14rem;
                margin-top: 0.2rem;
              }
            }
            .msg_en{
                left: 56%;
                top: 72%;
            }
            .msg_contain_left{
              text-align: left;
              p{
                text-align: left;
                font-size:0.54rem;color:#fff;
              }
            }
            // p{
            //     font-size:0.6rem;color:#fff;position: absolute;top:50%;
            //     left: 50%;text-align: center;width: 80%;
            //     transform:translate(-50%,-50%)
            // }
        }
        .owl-dots{
            position: absolute;
            z-index: 20;
            bottom: 10px;
            width: 50%!important;
            text-align: right;
            right:20%;
            .active{
                span{
                    width: 0.2rem;
                }
            }
            span{
                display: inline-block;
                width: 0.08rem;
                height: 0.08rem;
                border-radius: 0.08rem;
                background: #fff;
                margin: 0 5px;
                border: 1px solid #fff;
                cursor: pointer;
                transition: width 0.3s;
            }
        }
    }
   .swiper-slide {
      position: relative;
    }
    .mongolia {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(22,97,209,0.8);
    }
    .toDetails{width: 5rem;height: 0.4rem;position: absolute;top: 0;cursor: pointer;display: inline-block;left: -2rem;}
    @media (max-width: 768px){
      #app .banner{
        .ww_banner-msg{
            .msg_contain{
              p{
                font-size:0.22rem;color:#fff;
              }
              .banner_keywords{
                font-size: 0.20rem;
              }
            }
            .msg_contain_left{
                margin-left: 0.4rem;
            }
        }
      }
    }
    @media(max-width: 992px){
      #app .banner{
        .ww_banner-msg{
            .msg_contain_left{
              left: 50%;
                @media(max-width: @xs-width){
                    left: 30%;
                }
            }
        }
      }
    }

</style>
<template>
    <div class="banner" v-if="list && list.length">
        <div v-if="listLength!==null">
        <owlCarousel  :autoHeight="true" :mouseDrag="listLength" :touchDrag="listLength" :loop="listLength" :dots="listLength" :autoplay="autoPlay&&listLength" :autoplayTimeout="3000" :nav="false"
                  :autoplayHoverPause="true" :smartSpeed="1000" :responsive="{0:{items:1}}">
            <template v-for="(item, index) in list">
                <div class="swiper-slide" :key="index">
                        <img :src="item.img" alt=""/>
                        <div :class="['ww_banner-msg',{'ww_banner-msg-bc': false}, item.english && item.english != 'null' && $i18n.locale == 'cn' ? 'mongolia' : '']">
                            <div :class="[ 'container',{'msg_contain':true},{'msg_contain_left': item.english && item.english != 'null'},{'msg_en': $i18n.locale == 'en'}]">
                              <div v-html="item.html"></div>
                              <p class="banner_keywords" v-if="item.english && item.english != 'null'">{{item.keywords}}</p>
                              <x-router-link :to="item.english+'?columnId='+740"><span class="banner_detail iconfont icon-dow" v-if="item.english && item.english != 'null' && $i18n.locale == 'cn'">{{$t('other.forDetails')}}</span></x-router-link>
                              <x-router-link :to="item.english+'?columnId='+740" v-if="$i18n.locale == 'en'" class="toDetails"></x-router-link>
                            </div>
                        </div>
                </div>
            </template>
        </owlCarousel>
        <div class="pageDown" v-if="listLength">
            <img src="/static/images/banner_ic_godown.png" alt="">
        </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Banner',
        props:{
          'list':{
            type: Array,
            default: []
          },
          autoPlay: {
            type: Boolean,
            default: true
          },
          bannerMsg: {
            type: Boolean,
            default: true
          }
        },
        updated() {
          if(this.list.length>0){
            if(this.list.length > 1){
              this.listLength = true
            }else{
              this.listLength = false
            }
          }
        },
        data() {
            return {
                loadImg: false,
                img: [],
                listLength: null
            }
        }
    }
</script>
