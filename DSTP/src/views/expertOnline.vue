<template>
    <div class="expertOnline">
        <div class="bg_header" :style="{background: 'url('+ banner.img +') center / cover no-repeat'}">
            <Headers v-on:getHeaderMag="showHeaderMag"></Headers>
            <p class="banner-title">{{banner.description}}</p>
            <a class="consult_btn wow fadeIn" @click="toConsult()" href="javascript:;" >{{$t('other.onlineQA')}}</a>
        </div>
        <!-- 在线服务团队介绍 -->
        <div
            class="bg_introduce"
            :style="{background: 'url('+ introduce.img +') center no-repeat'}"
        >
            <div class="container">
                <div class="row">
                    <p class="introduce_title wow fadeInUp">{{introduce.title}}</p>
                    <div class="introduce_title_scroll">
                        <vue-scroll>
                          <p class="introduce_con wow fadeInUp introduce_con-ll">{{introduce.description}}</p>
                        </vue-scroll>
                    </div>
                </div>
            </div>
        </div>
        <!-- 专家团队 -->
        <div class="container">
            <div class="row">
                <p class="page_title wow fadeInUp">{{expertTeam.title}}</p>
                <div class="col-md-4 col-xs-6" v-for="(item,index) in expertTeam.columnList" :key="index">
                    <div class="expert_team wow fadeInUp">
                        <div class="expertImg">
                            <img :src="item.img" alt />
                        </div>
                        <p class="keywords">{{item.keywords}}</p>
                        <el-tooltip :content="item.title" placement="bottom">
                            <p class="expert_name">{{item.title}}</p>
                        </el-tooltip>
                        <div class="expert_description_scroll">
                            <vue-scroll>
                                <p class="description">{{item.description}}</p>
                            </vue-scroll>
                        </div>
                    </div>
                </div>
                <!--<div class="expert_team">
                    <ul class="clearfix">
                        <li class="wow fadeInUp" v-for="item in expertTeam.columnList">
                            <div class="expertImg">
                                <img :src="item.img" alt />
                            </div>
                            <p class="keywords">{{item.keywords}}</p>
                            <p class="expert_name">{{item.title}}</p>
                            <div class="expert_description_scroll">
                                <vue-scroll>
                                    <p class="description">{{item.description}}</p>
                                </vue-scroll>
                            </div>
                        </li>
                    </ul>
                </div>-->
            </div>
        </div>
        <!-- 立即咨询 -->
        <div class="consult" ref="consult">
            <div class="container">
                <div class="row">
                    <p class="page_title wow fadeInUp">{{consult.title}}</p>
                    <div class="col-lg-12 col-md-12 col-sm-12 wow fadeInUp">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="row">
                                    <div class="consult_box">
                                        <p class="consult_title">{{$t('other.name')}}({{$t('form.required')}})</p>
                                        <div class="input_box">
                                            <i class="icon icon_user"></i>
                                            <input type="text" :placeholder="$t('registered.name')" v-model="userName" />
                                        </div>
                                        <p class="consult_title">{{$t('other.phoneNumber')}}({{$t('form.required')}})</p>
                                        <div class="input_box">
                                            <i class="icon icon_phone"></i>
                                            <input type="number" :placeholder="$t('registered.phoneNumber')" v-model="tel" />
                                        </div>
                                        <p class="consult_title">{{$t('other.industry')}}</p>
                                        <div class="input_box">
                                            <i class="icon icon_industry"></i>
                                            <input type="text" :placeholder="$t('other.yourIndustry')" v-model="industry" />
                                        </div>
                                        <p class="consult_title">{{$t('other.serviceDemand')}}({{$t('form.required')}})</p>
                                        <div class="input_box  input-box-ot">
                                            <i class="icon icon_service"></i>
                                            <el-select v-model="name" :placeholder="$t('other.yourServiceDemand')" style="width:100%" @focus="clearContent" @blur="selectBlur">
                                              <el-option
                                                v-for="item in demandOptions"
                                                :key="item.name"
                                                :label="item.name"
                                                :value="item.name">
                                              </el-option>
                                            </el-select>
                                            <!-- <input type="text" placeholder="请输入您的要求" v-model="demand" /> -->
                                        </div>
                                        <a href="javascript:;" class="btn_consult" @click="submit">{{$t('other.contactUsNow')}}</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="row">
                                    <div
                                            class="bg_consult"
                                            :style="{background: 'url('+ consult.img +') center / 100% 100% no-repeat'}"
                                    >
                                        <div v-html="consult.html"></div>
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
import { Api } from "@/assets/js/api";
import { WOW } from "wowjs";
import { Loading } from 'element-ui'
export default {
    components: {},
    data() {
        return {
            banner: "",
            userName: "",
            tel: "",
            industry: "",
            name: "",
            expertTeam: "",
            introduce: "",
            consult: "",
            demandOptions:[],
            value:"",
            loadingInstance: null,
            metaTitle: ''
        };
    },
    computed: {
        verify: function() {
            if (!this.userName) {
                return { flag: false, msg: ''+this.$t('registered.name') };
            }
            if (
                !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[0-9])\d{8}$/.test(
                    this.tel
                )
            ) {
                return { flag: false, msg: ''+this.$t('registered.pNumber')};
            }
            if (!this.name) {
                return { flag: false, msg: ''+this.$t('registered.newServiceDemand')};
            }
            return { flag: true, msg: "ok" };
        }
    },
    methods: {
        clearContent(){
          this.name = ''
        },
        selectBlur(e){
          this.name = e.target.value
        },
        toConsult(){
          let time = null
          let speedNum = 0
          let divScroll = this.$refs.consult.offsetTop
          let docScroll = this.getScrollTop()
          if(divScroll >= docScroll){ //
            time = setInterval(()=>{
              this.animateScroll(divScroll, time, speedNum)
            },20)
            /*window.scrollTo({
              top: divScroll - 100,
              behavior: "smooth"
            })*/
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
        countToAnimate(index) {
            let count = this.$refs.countTo;
            if (count && count.length) {
                setTimeout(() => {
                    count[index].start();
                }, index * 100);
            }
        },
        showHeaderMag(value) {
            this.expertOnline();
        },
        expertOnline() {
            let that = this;
            Api.expertList({ columnId: this.$route.query.columnId }).then(res => {
                let data = res[1];
                if (data && data.result === 1) {
                    this.banner = data.data[0];
                    this.introduce = data.data[1];
                    this.expertTeam = data.data[2];
                    this.consult = data.data[3];
                    this.demandOptions = data.data[3].columnList
                }
                that.$nextTick(() => {
                    that.wowLoad();
                });
                this.loadingInstance.close()
            });
        },
        submit() {
            if (!this.verify.flag) {
                this.$message.error(this.verify.msg);
            } else {
                
                Api.advisory({
                    userName: this.userName,
                    tel: this.tel,
                    industry: this.industry,
                    demand: this.name
                }).then(res => {
                    let data = res[1];
                    if (data && data.result === 1) {
                        const h = this.$createElement;
                        this.$msgbox({
                            title: "" + this.$t('other.reminder'),
                            message: h("p", null, [
                                h(
                                    "span",
                                    { style: "font-size: 16px" },
                                    "" + this.$t('other.submit')
                                )
                            ]),
                            center: true,
                            confirmButtonText: "" + this.$t('other.ok'),
                            callback: action => {
                                this.userName = "";
                                this.tel = "";
                                this.industry = "";
                                this.name = "";
                            }
                        });
                    } else {
                        this.$message.error(data.message);
                        console.log("请求失败");
                    }
                });
            }
        },
        imageCommon(url, wh) {
            if (url.indexOf("e111.com.cn") > 0) {
                // 拦截e仓的图片,替换成750压缩的文件
                let sp = url.split(".");
                if (sp.length > 0) {
                    // url = url + '_750.' + sp[sp.length - 1]
                    if (sp[sp.length - 1] == "png") {
                        url = url + "_750.png";
                    } else {
                        url = url + "_750.jpg";
                    }
                }
            }
            if (!url) {
                return "";
            } else if (
                url.indexOf("http") === 0 ||
                url.indexOf("data:image") === 0
            ) {
                // http:// || data:image开头
                return url;
            } else if (/^\/?enrollDaren/.test(url)) {
                return this.BASE_URL + url;
            } else if (wh === 0) {
                // 使用原图
                return this.BASE_URL + "/image/" + url;
            } else {
                // 默认压缩 750x750
                return (
                    this.BASE_URL + "/pic/" + (wh ? wh : "750x750") + "/" + url
                );
            }
        }
    },
    created() {
      this.loadingInstance = Loading.service({})
    },
    mounted() {
        this.metaTitle = this.$t('menu.expertsOnline')
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
<style lang="less">
.expertOnline {
    .bg_header {
        width: 100%;
        height: 7rem;
        background: url("@{imageUrl}bg_news.png") center no-repeat;
        background-size: cover !important;
        position: relative;

        .banner-title {
            text-align: center;
            position: absolute;
            left: 50%;
            top: 24%;
            font-size: 0.54rem;
            color: #fff;
            .slate(-50%, 0);
        }
    }

    .bg_introduce {
        min-height: 4.26rem;
        background-size: cover !important;
    }

    .consult_btn {
        position: absolute;
        left: 50%;
        top: 40%;
        display: inline-block;
        width: 2rem;
        line-height: 0.48rem;
        text-align: center;
        border-radius: 0.24rem;
        color: #0062fe;;
        font-size: 0.14rem;
        margin-top: 0.2rem;
        .slate(-50%, 0);
        background: #fff url("@{imageUrl}bluearrows.png") 80% center no-repeat;
        @media (max-width: 767px) {
            background: #fff url("@{imageUrl}bluearrows.png") 90% center no-repeat;background-size: 0.1rem;
        }
        &:hover {
            color: #0062fe;
        }

        &:link {
            color: #0062fe;
            text-decoration: none;
        }
    }


    .expert_description_scroll {
        height: 200px;padding: 0 0.2rem;
    }

    .introduce_title {
        .media-font(0.45rem);
        text-align: center;
        color: #fff;
        .marginTb(0.5rem);
        font-family: regular;
    }

    .introduce_title_scroll {
        height: 2.5rem;
    }

    .introduce_con {
        .paddingLr(0.8rem);
        .media-font(0.19rem);
        .media-line(0.4rem);
        text-align: center;
        color: #fff;
    }

    .consult {
        margin-bottom: 0.6rem;
        @media (max-width: 767px) {
            margin-bottom: 0;
        }
    }

    .consult_box {
        background: #f3f3f3;
        padding: 20px 80px;

        .consult_title {
            font-size: 16px;
            color: #444;
            line-height: 40px;
            padding-left: 20px;
            position: relative;

            &:after {
                content: "";
                width: 3px;
                height: 14px;
                background: #0062fe;
                position: absolute;
                display: block;
                left: 0;
                top: 50%;
                margin-top: -7px;
            }
        }

        .input_box {
            height: 40px;
            background: #fff;
            border-radius: 20px;
            padding-left: 40px;
            position: relative;

            input {
                width: 100%;
                height: 40px;
                border: none;
                background: transparent;
                outline: none;
            }
        }

        .btn_consult {
            width: 130px;
            line-height: 36px;
            border-radius: 18px;
            color: #0062fe;
            border: 1px solid #0062fe;
            display: block;
            text-align: center;
            margin-top: 20px;
        }
    }

    .bg_consult {
        width: 100%;
        height: 418px;
        position: relative;
        div{
            .home-left;
            padding-left: 0.4rem;
        }
        p {
            font-size: 0.26rem;
            color: #fff;
        }
    }

    .page_title {
        text-align: center;
        font-size: 0.45rem;
        padding: 60px 0;font-family: regular;
    }

    .bg_consult {
        width: 100%;
        height: 418px;
        p {
            font-size: 0.26rem;
            color: #fff;
        }
    }
    .expert_team {
        width: 100%;
        margin-bottom: 0.34rem;
        .expertImg {
            width: 2rem;
            height: 2rem;
            margin: 0 auto;
            overflow: hidden;
            border-radius: 50%;
            img {
                .animates();
                &:hover{
                    .scale(1.1);
                }
                width: 100%;
                height: 100%;
            }
        }
        .keywords {
            text-align: center;
            margin-top: 0.27rem;
            color: #444;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            line-height: 1;
        }
        .expert_name {
            text-align: center;
            color: #757575;
            margin-top: 0.2rem;
            margin-bottom: 0.2rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;line-height: 1;
        }
        .description {
            font-size: 14px;
            line-height: 25px;
            word-wrap: break-word;
            padding: 0 0.2rem 0 0.1rem;
        }
    }
    .icon {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        left: 0;
    }
    .icon_user {
        background: url("@{imageUrl}icon_user.png") center no-repeat;
    }
    .icon_phone {
        background: url("@{imageUrl}icon_phone.png") center no-repeat;
    }
    .icon_industry {
        background: url("@{imageUrl}icon_industry.png") center no-repeat;
    }
    .icon_service {
        background: url("@{imageUrl}icon_service.png") center no-repeat;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input[type="number"] { -moz-appearance: textfield;}
    .el-select .el-input__inner, .el-input--suffix .el-input__inner{
        padding: 0;
    }
    .el-scrollbar {
        > .el-scrollbar__bar {
            opacity: 1 !important;
        }
    }
    .el-select__input{
        margin: 0;
    }
    @media (max-width: 767px) {
        .bg_header {
            // height: 73px;
            background-size: 100%;
        }
        .page_title {
            font-size: 0.4rem;
            padding: 0.4rem 0;
        }
        .expert_team {
            margin-bottom: 0.5rem;
            .description{
                font-size: 12px;
                line-height: 20px;
            }
        }
        .bg_consult {
            height: 6rem;
            p {
                font-size: 0.4rem;
                color: #fff;
            }
        }
        .get_code{font-size: 0.32rem;}
    }
    .introduce_con-ll{
        text-align: left;
        text-indent: 2em;
    }
}
</style>