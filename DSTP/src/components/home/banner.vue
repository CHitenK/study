<style lang="less">
    #app .banner{
        .owl-theme .owl-dots .owl-dot{
            outline: none;
        }
        position:relative;
        .pageDown{position:absolute;bottom:20px;left:0;text-align: center;width:100%;z-index: 1;}
        .pageDown img{width: 3%;max-width: 31px;min-width: 10px;
            animation: heart 0.8s ease-in-out 2s infinite alternate;}
        .banner-msg-bc{
            background-color:rgba(24,73,181,0.3);
        }
        .banner-msg{position: absolute;left: 0;top:0;width: 100%;height: 100%;
            > p{
                font-size:0.6rem;color:#fff;position: absolute;top:50%;
                left: 50%;text-align: center;width: 80%;
                transform:translate(-50%,-50%)
            }
        }
        .top-center{
            .home-center;
            width: 80%;
            text-align: left;
            color: #fff;
            p{
                font-size: 0.6rem;
                margin-bottom: 0.1rem;
            }
            span{
                display: block;
                font-size: 0.3rem;
            }
        }
        .owl-dots{
            position: absolute;
            z-index: 20;
            bottom: 0.9rem;
            width: 100%;
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
        .bac-msg-class{
            background-color: rgba(0,3,89,0.51);
        }
    }
</style>
<template>
    <div class="banner" v-if="list && list.length">
        <div v-if="listLength!==null">
        <owlCarousel ref="carousel" :autoHeight="true" :mouseDrag="listLength" :touchDrag="listLength" :loop="listLength" :dots="listLength" :autoplay="autoPlay&&listLength" :autoplayTimeout="3000" :nav="false"
                  :autoplayHoverPause="true" :smartSpeed="1000" :responsive="{0:{items:1}}">
            <template v-for="(item, index) in list">
                <div class="swiper-slide" :key="index">
                    <x-router-link :to="item.english+'?columnId='+item.id">
                        <img :src="item.img" alt=""/>
                        <div :class="['banner-msg',{'banner-msg-bc': bannerMsg}, {'bac-msg-class': bcOtherClass}]" v-if="item.description">
                            <template v-if="textP && item.keywords">
                                <div class="top-center">
                                    <p>{{item.description}}</p>
                                    <span>{{item.keywords}}</span>
                                </div>
                            </template>
                            <template v-else>
                                <p>{{item.description}}</p>
                            </template>
                        </div>
                        <div :class="['banner-msg',{'banner-msg-bc': bannerMsg}, {'bac-msg-class': bcOtherClass}]" v-html="item.html">
                            <div class="top-center">
                                <p v-html="item.html"></p>
                            </div>
                        </div>
                    </x-router-link>
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
    import countTo from "vue-count-to";
    export default {
        name: 'Banner',
        props:{
          'list':{
            type: Array,
            default: []
          },
          textP:{
            type: Boolean,
            default: false
          },
          autoPlay: {
            type: Boolean,
            default: true
          },
          bannerMsg: {
            type: Boolean,
            default: true
          },
          bcOtherClass: {
              type: Boolean,
              default: false
          },
        },
        mounted() {
            this.isBanner()
            this.$nextTick(() => { // dom渲染完成再计算一次轮播宽度
                if(document.createEvent) {
                    let event = document.createEvent("HTMLEvents");
                    event.initEvent("resize", true, true);
                    window.dispatchEvent(event);
                } else if(document.createEventObject) {
                    window.fireEvent("onresize");
                }
            })
        },
        updated() {
              this.isBanner()
          },
        data() {
            return {
                loadImg: false,
                img: [],
                listLength: null,
            }
        },
        methods: {
            isBanner(){
                if(this.list && this.list.length){
                    if(this.list.length > 1){
                        this.listLength = true
                    }else{
                        this.listLength = false
                    }
                }
            }
        }
    }
</script>
