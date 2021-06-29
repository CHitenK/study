<template>
    <div id="union">
        <div class="bg_header other-banner" :style="{background: 'url('+ banner +') center / cover no-repeat'}">
            <Headers v-on:getHeaderMag="showHeaderMag"></Headers>
            <p class="title">{{pageTitle}}</p>
        </div>
        <!-- 招募tab -->
        <div
            class="dtp_tab"
            :style="{background: 'url('+ classifyList.img +') center / 100% 100% no-repeat'}"
        >
            <div class="bg_tab_title">
                <div class="container">
                    <div class="row">
                        <div class="tab_title">
                            <ul class="clearfix">
                                <li
                                    :class="{ active: tabIndex == index }"
                                    v-for="(item,index) in classifyList.columnList" :key="index"
                                    @click="switchTab(index)"
                                >{{item.title}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row wow fadeInUp">
                    <vue-scroll>
                        <div
                                v-show="index == tabIndex"
                                :class="tabIndex ==index ? 'animated fadeInUp' :''"
                                v-for="(item,index) in classifyList.columnList"
                                v-html="item.html" :key="index"
                                class="tab_con"
                        ></div>
                    </vue-scroll>

                </div>
            </div>
        </div>
        <!-- 服务商入驻指引 -->
        <div class="server-point">       
            <div class="container">
                <div class="row">
                    <p class="page_title wow fadeInUp">{{entryProcess.name}}</p>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 wow fadeInUp">
                        <div class="row">
                            <div
                                class="col-lg-3 col-md-3 col-sm-3 col-xs-3 arrow"
                                v-for="(item, index) in entryProcess.columnList" :key="index">
                                <div class="row">
                                    <img :src="item.img" alt class="step" />
                                    <p class="step_text">{{item.title}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 wow fadeInUp join" data-wow-delay="400ms" >
              <a class="join-button iconfont icon-dibudaohanglan" @click="toJoin()">{{$t('other.joinDTP')}}</a>
            </div>
          </div>
        </div>
        </div>
        <!-- 服务商说 -->
        <div class="container">
            <div class="row">
                <p class="page_title wow fadeInUp">{{serviceProvider.name}}</p>
                <div
                    class="col-lg-12 col-md-12 col-sm-12 wow fadeInUp"
                    v-if="serviceProvider.columnList"
                >
                    <div class="row">
                        <div
                            class="col-lg-3 col-xs-6"
                            v-for="(item, index) in serviceProvider.columnList" :key="index"
                        >
                            <div class="row">
                                <div class="isp_item clearfix">
                                    <a href="javascript:;"></a>
                                    <div class="xs">
                                        <div class="isp_img">
                                            <img :src="item.img" alt />
                                        </div>
                                        <p class="isp_item_keywords">{{item.keywords}}</p>
                                        <p class="isp_item_title">{{item.title}}</p>
                                    </div>
                                    <div class="isp_item_con_scroll">
                                        <vue-scroll>
                                            <p class="isp_item_con">{{item.description}}</p>
                                        </vue-scroll>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mb80">
            <div class="row">
                <p class="page_title wow fadeInUp">{{union.name}}</p>
                <div class="col-lg-12 wow fadeInUp">
                    <div class="row" v-if="list && list.length">
                        <owlCarousel
                            :loop="true"
                            :autoplay="true"
                            :autoplayTimeout="3000"
                            :nav="false"
                            :autoplayHoverPause="true"
                            :smartSpeed="1000"
                            :responsive="{0:{items:1}}"
                        >
                            <div v-for="(item, index) in union.columnList" :key="index"> 
                                <template v-for="(i,j) in item"> 
                                    <div class="union_item" :key="j">
                                        <div class="union_img">
                                            <img :src="i.img" alt />
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </owlCarousel>
                    </div>
                </div>
            </div>
        </div>
        <Leaving ref="leaving" :roles="roles" />
        <Footers></Footers>
    </div>
</template>
<script>
import { Api } from "@/assets/js/api";
import { WOW } from "wowjs";
import { Loading } from 'element-ui'
import Leaving from '@/components/recruit/leaving'
export default {
    components: { Leaving },
    data() {
        return {
            article: "",
            records: [],
            list: [],
            banner: "",
            pageTitle: "",
            classifyList: [],
            tabIndex: 0,
            union: [],
            serviceProvider: [],
            entryProcess: [],
            roles: [],
            metaTitle: ''
        };
    },
    methods: {
        toJoin(){
          this.$refs.leaving.toShow()
        },
        showHeaderMag(value) {
            this.dtpRecruit();
        },
        dtpRecruit() {
            Api.unionRecruit({
                language: "",
                columnId: this.$route.query.columnId
            }).then(res => {
                let data = res[1];
                if (data && data.result === 1) {
                    this.list = data.data;
                    this.banner = data.data[0].img;
                    this.pageTitle = data.data[0].title;
                    this.classifyList = data.data[1];
                    this.entryProcess = data.data[2];
                    this.serviceProvider = data.data[3];
                    this.roles = data.data[1].columnList
                    let newArray = [];
                    let index = 0;
                    while (index < data.data[4].columnList.length) {
                        newArray.push(
                            data.data[4].columnList.slice(index, (index += 15))
                        );
                    }
                    data.data[4].columnList = newArray;
                    this.union = data.data[4];
                    this.$nextTick(() => {
                        let ie = /msie (6.0|7.0|8.0|9.0)/i.test(
                            navigator.userAgent
                        );
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
                    });
                    this.loadingInstance.close()
                } else {
                    console.log("请求失败");
                }
            });
        },
        switchTab(index) {
            this.tabIndex = index;
        }
    },
    created(){
      this.loadingInstance = Loading.service({})
      this.roles= [1,2]
        if(this.$route.query.language == 'en'){
            window.localStorage.setItem('lang','en')
        }else{
            window.localStorage.setItem('lang','')
        }
    },
    mounted() {
        this.metaTitle = this.$t('menu.joinDTP')
        if(this.$route.query.from == 'login'){
            this.$refs.leaving.toShow()
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
<style lang="less" scope>
@import "../assets/css/font-icon.css";
.bg_header {
    width: 100%;
    position: relative;
    height: 7rem;
}
.title {
    font-size: 0.54rem;
    color: #fff;
    text-align: center;
    // margin-top: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50%,-50%);
    -webkit-transform:translate(-50%,-50%);
    -moz-transform:translate(-50%,-50%);
    -o-transform:translate(-50%,-50%);
    -ms-transform:translate(-50%,-50%);
}
.dtp_tab {
    // height: 4.2rem;
    // padding: 0 0 0.4rem;
    .bg_tab_title {
        width: 100%;
        background: #fff;
    }
}
.mb80{
    margin-bottom: 0.8rem;
}
.tab_title {
    background: #fff;
    ul {
        li {
            font-weight: bold;
            line-height: 0.7rem;
            float: left;
            padding: 0 20px;
            cursor: pointer;
            font-size: 0.2rem;
        }
        .active {
            background: #4da8ff;
            color: #fff;
            position: relative;
            &:after {
                content: "";
                position: absolute;
                width: 0;
                height: 0;
                border-width: 8px;
                border-style: solid;
                border-color: #4da8ff transparent transparent transparent;
                bottom: -16px;
                left: 50%;
                margin-left: -8px;
            }
        }
    }
}
.tab_con {
    color: #fff;
    height: 3.6rem;
    display: table-cell;
    vertical-align: middle;
    p {
        line-height: .35rem;
        font-size: .16rem;
    }
}
.isp_item {
    padding: 20px;
    margin: 5px 10px;
    min-height: 452px;
    position: relative;
    a {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        border: 1px solid #e8e8e8;
        .animates();
    }
    &:hover {
        a{
            box-shadow: 0 13px 19px 0 #bfc8d9;
            .scale(1.05);
        }
        .isp_img {
            .scale(1.05);
            .animates();
        }
    }
}
.isp_item_title {
    font-size: 12px;
    color: #757575;
    text-align: center;
    position: relative;
    padding: 20px 0;
    &:after {
        content: "";
        width: 20px;
        height: 2px;
        background: #0062fe;
        display: block;
        position: absolute;
        bottom: 5px;
        left: 50%;
        margin-left: -10px;
    }
}
.isp_item_keywords {
    text-align: center;
    margin-top:10px
}
.isp_item_con {
    font-size: 0.16rem;
    line-height: 30px;
}
.isp_item_con_scroll{
    height: 2.4rem;
    position: relative;
    z-index: 3;
    padding-top: 10px;
}
.isp_img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    img {
        min-width: 100%;
        min-height: 100%;
    }
}
.page_title {
    text-align: center;
    font-size: 30px;
    padding: 60px 0;font-family: regular;
}
.union_list {
    width: 100%;
    ul {
        li {
            width: 20%;
            float: left;
        }
    }
}
.union_item {
    width: 20%;
    font-size: 0;
    display: inline-block;
    .union_img {
        width: 100px;
        height: 60px;
        line-height: 60px;
        margin: 15px auto;
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
}
#union {
    .owl-carousel .owl-item img{
        display: inline-block;
    }
    .owl-dots {
        .active {
            span {
                width: 0.2rem;
                background: #0062fe;
            }
        }
        span {
            display: inline-block;
            width: 0.08rem;
            height: 0.08rem;
            border-radius: 0.08rem;
            background: #aeaeae;
            margin: 0 5px;
            cursor: pointer;
            transition: width 0.3s;
        }
    }
}

.step {
    width: 174px;
    display: block;
    margin: 0 auto;
    .animates();
    &:hover{
        .scale(1.1);
    }
}

.arrow:not(:last-of-type):after {
    content: "";
    width: 22px;
    height: 14px;
    background: url("@{imageUrl}icon_arrow.png");
    position: absolute;
    right: -8px;
    top: 40%;
    background-size: 100%;
}
.step_text {
    text-align: center;
}
.join{
    margin-top:0.8rem;
    margin-bottom: 0.5rem;
    text-align: center;
}
.join-button{
  .paddingLr(0.4rem);
  .paddingTb(0.07rem);
  .media-font(0.14rem) !important;
  background-color: #fff;
  display: inline-block;
  border-radius: 0.4rem;
  border: 1px solid #0062FE;
  min-width: 1.2rem;
  text-align: center;
  color:#0062FE;
  position: relative;
  cursor: pointer;
    &:before{
        position: absolute;
        right: 0.25rem;
        @media (max-width: 768px){
            right: 0.15rem;
        }
    }
  &:hover{
    color:#fff;
    background-color: #0062FE;
  }
}
.leaving-input{
  .el-select .el-input__inner, .el-input--suffix .el-input__inner{
    border:0;
    padding: 0 1.6rem 0 0;
    border-radius: 0.4rem;
  }
  .el-input__suffix{
    right: none;
  }
}

@media (max-width: 768px) {
    .isp_item_con_scroll{

    }
    .title {
        font-size: 0.6rem;
    }
    .step {
        width: 1.5rem;
    }
    .tab_title ul li {
        width: 33.33%;
        text-align: center;
        padding: 0;
    }
    .tab_con{
      height: 6rem;padding: 0 0.2rem;
    }
    .tab_con p {
        font-size: 0.28rem;
        line-height: 2;
    }
    .isp_item_con {
        font-size: 0.28rem;
        line-height: 1.8;
    }
    .isp_item {
        min-height: inherit;
        .padding(0.1rem);
        .isp_item_title {
            padding: 0.2rem 0 0.4rem 0;
        }
        .isp_img {
            width: 2rem;
            height: 2rem;
        }
        &:hover{
            a{
                box-shadow: 0 3px 9px 0 #bfc8d9;
                .scale(1.02);
            }
        }
    }
    .union_item .union_img {
        width: 1.2rem;
        line-height: 0.6rem;
        height: 0.6rem;
    }
    .page_title {
        font-size: 0.4rem;
        padding: 0.4rem 0;
    }
    .arrow:not(:last-of-type):after {
        width: 0.4rem;
        height: 0.25rem;
        top: 35%;
    }
    .el-select .el-input__inner, .el-input--suffix .el-input__inner{
      height: 30px;
      // padding: 0 45px 0 0;
      border-radius: 0.3rem;
    }
    .el-input__icon{
      line-height: 30px;
    }
}
.server-point{
    background-color: #EEF7FF;
}
</style>
