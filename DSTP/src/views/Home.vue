<style lang="less">
  @import "../assets/css/home.less";
  .video{width: 100%;}
  .video_box{padding-left: 0.2rem;}
  @media (max-width: 767px){
    .video_box{padding-left: 0;}
  }
  .tarit-p-scroll{font-family: frutiger;}
</style>
<template>
  <div class="home">
    <!--头部菜单-->
    <Headers v-on:getShowMenu="getShowMenu"/>
    <!--头部菜单 end-->
    <!--banner-->
    <div class="news-banner-con">
       <Banner :banner-msg="false" :list="top" :banner-news="true" :newsList="settlePlatform" />
        <div class="banner-news" v-if="settlePlatform.length>0">
          <!--<div class="container">-->
            <!--<div class="row">-->
                <el-carousel height="0.95rem" direction="vertical" :autoplay="true" indicator-position="none" v-if="$i18n.locale == 'cn'">
                  <el-carousel-item v-for="(item, index) in settlePlatform" :key="index">
                  <div class="col-xs-12">
                    <div class="row">
                      <template v-for="(i, k) in item">
                        <div class="col-xs-6" :key="k" >
                          <div class="row">
                            <div class="medium"><span v-html="i.html" :class="{ icon_fire: i.hot }"></span></div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                  </el-carousel-item>
                </el-carousel>
                <el-carousel height="0.95rem" direction="vertical" :autoplay="true" indicator-position="none" v-if="$i18n.locale == 'en'">
                  <el-carousel-item v-for="(item, index) in settlePlatform_en" :key="index">
                    <div class="col-xs-12">
                      <div class="row">
                        <div class="medium"><span v-html="item.html" :class="{ icon_fire: item.hot }"></span></div>
                      </div>
                    </div>
                  </el-carousel-item>
                </el-carousel>
            <!--</div>-->
          <!--</div>-->
        </div>
    </div>
    <!--banner end-->
    <!--简介-->
    <div v-if="indexObj.synopsis" class="home-profile" :style="{'backgroundImage': 'url('+indexObj.synopsis.img+')'}">
      <div class="container">
        <div class="row">
          <h3 class="wow fadeInUp" data-wow-delay="500ms">{{indexObj.synopsis.name}}</h3>
          <div class="col-xs-12">
            <div class="row">
              <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                <div class="row">
                  <div class="home-profile-scroll">
                    <vue-scroll>
                      <div class="wow fadeInUp" data-wow-delay="600ms" v-html="indexObj.synopsis.html"></div>
                    </vue-scroll>
                  </div>
                </div>
              </div>
              <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                <div class="row wow fadeInUp video_box" data-wow-delay="500ms">
                  <video id="video" :poster="indexObj.synopsis.img1" autoplay="autoplay" controls="controls" webkit-playsinline="true" playsinline="true" muted loop :class="showMenu ? 'hide': 'video'">
                    <source :src="indexObj.synopsis.mediaPath" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--简介 end-->
    <!--特点-->
    <div v-if="characteristic" class="home-trait" :style="{'backgroundImage': 'url('+characteristic.img+')'}">
      <div class="container wow fadeInUp" data-wow-delay="200ms">
        <div class="row">
          <h3 class="wow fadeInUp" data-wow-duration="500ms" data-wow-delay="200ms">{{characteristic.name}}</h3>
          <div class="ht-content wow fadeInUp" data-wow-duration="200ms" data-wow-delay="200ms">
            <div v-for="(item, index) in characteristic.columnList" :key="index"
                 :class="['col-lg-4','col-md-4','col-xs-4',{'last':tdLength%3===0?(tdLength-3) <= index:(tdLength - tdLength%3) <= (index)},{'last2':tdLength%2===0?tdLength-2 <= index:tdLength-1 <= index}]">
              <div class="trait-content">
                <img class="wow fadeInUp" :data-wow-delay="((index+1) * 200)+'ms'" :src="item.img" alt="">
                <span class="wow fadeInUp" :data-wow-delay="((index+1) * 200)+'ms'">{{item.name}}</span>
                <p>
                <vue-scroll style="height: 100%">
                  <div class="tarit-p-scroll">
                    {{item.description}}
                  </div>
                </vue-scroll>
                </p>
              </div>
              <div class="trait-text">
                <!-- <vue-scroll style="height: 100%">

                  </vue-scroll> -->
                  <!-- <div class="wh100">
                    <p>{{item.description}}</p>
                  </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--特点 end-->
    <!--业务数据-->
    <div class="dtp-data" :style="{'backgroundImage': 'url('+businessData.img+')'}">
      <div class="container">
        <div class="row">
          <h3 class="dtp-index-h3 wow fadeInUp" data-wow-delay="500ms">{{businessData.name}}</h3>
          <div class="dtp-data-container" >
            <div id="countTo">
              <div v-for="(item, index) in businessData.columnList" :key="index" :data-index="index" class="dtp-data-content wow fadeInUp" :data-wow-delay="((index+1) * 200)+'ms'">
                <div class="dtp-dc-top">
                  <countTo separator="" :decimals="item.description.split('.').length-1" :autoplay="false" ref="countTo" suffix="+" :endVal='parseInt(item.description)' :duration='3000'></countTo>{{item.keywords}}
                </div>
                <p>{{item.name}}</p>
              </div>
            </div>
            <!--<div v-if="businessData.english && businessData.english != 'null'" class="dtp-data-buttonC" v-show="wow">
              <a class="dtp-data-button wow fadeIn" data-wow-duration="1200ms" data-wow-delay="1200ms" :href="businessData.english">了解详情</a>
            </div>-->
          </div>
        </div>
      </div>
    </div>
    <!--业务数据 end-->
    <!--优品商家-->
    <div class="dtp-store">
      <div class="container">
        <div class="row">
          <h3 class="dtp-store-scroll dtp-index-h3 wow fadeInUp" data-wow-delay="200ms">{{goodBusiness.name}}</h3>
          <div class="dtp-good-container wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="200ms" v-if="goodBusiness.columnList">
            <owlCarousel :loop="false" :dots="false" :autoHeight="true" :autoplay="true" :autoplayTimeout="3000" :nav="false"
            :autoplayHoverPause="true" :smartSpeed="1000" :responsive="{0:{items:2},776:{items:3},992:{items:4}}">
              <div ref="indexStore" v-for="(item,index) in goodBusiness.columnList" :key="index" class="dtp-good-content">
                <a href="javascript:;"></a>
                <div class="dtp-store-top">
                  <img :src="item.img" alt="">
                  <h3>{{item.name}}</h3>
                </div>
                <div class="dtp-good-text" >
                    <vue-scroll>
                      <div>
                        <p>{{item.description}}</p>
                      </div>
                    </vue-scroll>
                </div>
              </div>
            </owlCarousel>
          </div>
        </div>
      </div>
    </div>
    <!--优品商家 end-->
    <Footers />
  </div>
</template>

<script>
import Banner from "../components/home/banner";
import {Api} from '@/assets/js/api_kz'
import { Loading } from 'element-ui';
import countTo from 'vue-count-to'
import { WOW } from 'wowjs'
import { setTimeout } from 'timers';
//import wx from 'weixin-js-sdk';
export default {
  name: "Home",
  components: {Banner, countTo },
  data() {
    return {
      showMenu: false,
      indexObj: {},
      characteristic: '',
      businessData: {},
      goodBusiness: {},
      top:[],
      settlePlatform:[],
      settlePlatform_en: [],
      loadingInstance: null,
      wow: null,
      tdLength:0,
    }
  },
  created() {
    this.loadingInstance = Loading.service({})
  },
  mounted() {
    let that = this
    Api.indexLoad().then(res=>{
      let data = res[1]
      if(data && data.result === 1){
        let obj = data.data
        that.indexObj = obj
        that.characteristic = obj.characteristic
        that.tdLength = that.characteristic.columnList.length
        that.businessData = obj.businessData
        that.goodBusiness = obj.goodBusiness
        that.top = obj.top.columnList
        that.$nextTick(() => {
          that.wowLoad()
        })
      }else{
        this.$message.error(''+this.$t('other.requestHomeFailed'))
        console.log('请求首页失败')
      }
      this.loadingInstance.close()
    })
      Api.settlePlatform().then(res=>{
          let data = res[1]
          if(data && data.result === 1){
              let obj = data.data
              that.settlePlatform_en = obj.columnList // 用于英文版
              let newArray = [];
              let index = 0;
              while (index < obj.columnList.length) {
                  newArray.push(
                      obj.columnList.slice(index, (index += 2))
                  );
              }
              obj.columnList = newArray;
              that.settlePlatform = obj.columnList // 用于中文版
          }else{
              this.$message.error('请求失败')
              console.log('请求失败')
          }
      })
      document.addEventListener('WeixinJSBridgeReady',function(){
          document.getElementById('video').play();
      },false);
  },
  methods: {
    setScroll(){
      let div = document.querySelectorAll('.dtp-store .dtp-store-scroll')
      if(!div || div.length === 0){
        return
      }
      let divScroll = div[0].offsetTop
      let docScroll = this.getScrollTop()
      let time = null
      let speedNum = 0
      if(divScroll >= docScroll){ //
        time = setInterval(()=>{
          this.animateScroll(divScroll, time, speedNum)
        },20)
      }
    },
    animateScroll(divScroll, time, speedNum){
      let osTop = document.documentElement.scrollTop || document.body.scrollTop
      let speed = 30
      if(speedNum > (speed-5)){
        speedNum = speed-5
      }
      if(osTop > divScroll-100 || (this.getScrollTop() + this.getWindowHeight() >= this.getScrollHeight())){
        clearInterval(time)
        return
      }
      document.documentElement.scrollTop = document.body.scrollTop = osTop + speed
    },
    getScrollHeight(){
      let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
      if(document.body){
        bodyScrollHeight = document.body.scrollHeight;
      }
      if(document.documentElement){
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
      return scrollHeight;
    },
    getWindowHeight(){
      let windowHeight = 0;
      if(document.compatMode == "CSS1Compat"){
        windowHeight = document.documentElement.clientHeight;
      }else{
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    },
    getScrollTop(){
      let scrollTop=0;
      if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop=document.documentElement.scrollTop;
      }else if(document.body){
        scrollTop=document.body.scrollTop;
      }
      return scrollTop;
    },
    wowLoad(){
      let that = this
      let  ie = /msie (6.0|7.0|8.0|9.0)/i.test(navigator.userAgent)
      this.wow = new WOW({
                live: false,
                callback: function(box) {
                  if(!ie){ // ie10+
                    box.classList.add('wow1')
                  }
                  if(box.className &&　box.className.indexOf('dtp-data-content') != -1){ // 数字动画
                    that.countToAnimate(box.getAttribute('data-index')||0)
                  }else if(box.className &&　box.className.indexOf('dtp-store-scroll') != -1){
                    setTimeout(()=>{
                      that.setScroll()
                    },500)
                  }
                }
              }
      )
      this.wow.init()
    },
    countToAnimate(index){
      let count = this.$refs.countTo
      if(count &&　count.length) {
        setTimeout(()=>{
          count[index].start()
        },index*100)
      }
    },
      getShowMenu(val){
        this.showMenu = val
      }
  },
  // 配置title和meta数据
  metaInfo: {
    title: "DSTP",
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
//function MakePoster(video){
//    //canvas转Blob
//    var dataURLtoBlob=function (dataurl) {
//        debugger
//        var arr = dataurl.split(','),
//            mime = arr[0].match(/:(.*?);/)[1],
//            bstr = atob(arr[1]),
//            n = bstr.length,
//            u8arr = new Uint8Array(n);
//        while(n--) {
//            u8arr[n] = bstr.charCodeAt(n);
//        }
//        return new Blob([u8arr],{type:mime});
//    };
//    var scale = 0.7;//截图绽放比例
//    video.setAttribute('crossOrigin', 'anonymous');//处理跨域
//    var canvas = document.createElement("canvas");
//    canvas.width = video.clientWidth * scale;
//    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width,canvas.height);
//    var imgsrc = canvas.toDataURL('image/jpeg',0.8);//第二个参数指图片质量
//    var poster=dataURLtoBlob(imgsrc);//这是我们要上传的封面图片
//    video.setAttribute("poster",imgsrc);
//}
//window.onload = function(){
//    var video = document.getElementById('video');
//    video.onloadeddata = function () {
//        MakePoster(video)
//    }
//    return
//    //第一帧图片与原视频的比例
//    var scal = 0.8;
//    //监听页面加载事件
//    video.onloadeddata = function () {
//        //创建一个画布
//        var canvas = document.createElement('canvas');
//        canvas.width = video.clientWidth*scal;
//        canvas.height = video.clientHeight*scal;
//        //绘制图片
//        let ctx = canvas.getContext('2d')
//        ctx.drawImage(video,0,0,canvas.width,canvas.height);
//        //设置标签的poster属性
//        var img = new Image();
//        //设置图片跨域访问
//        img.setAttribute('crossOrigin', 'anonymous');
//        debugger
//        //画图
//        ctx.drawImage(img, 0, 0, canvas.width,canvas.height)
//        var data = canvas.toDataURL('image/jpeg')
//        console.log(data)
//    }
//}
</script>
