<style scoped lang="less">
    @import "../assets/css/font-icon.css";

    .confront {
        overflow: hidden;

        .other-banner {
            position: relative;

            > div.container {
                position: absolute;
                left: 0;
                right: 0;
                z-index: 100;
            }
        }

        .confront-h3 {
            .padding(0.5rem);
            font-size: 0.45rem;
            line-height: 0.6rem;
            font-family: regular;
        }

        .confront-case {
            color: #fff;
            text-align: center;
            position: relative;
            min-height: 8.3rem;
            padding-bottom: 0.2rem;
            background-repeat: no-repeat;
            background-color: #042355;
            background-size: cover;
            font-family: regular;

            .row {
                position: relative;
                .icon1{
                  i{
                    background: url("@{imgUrl}productCategory.png") no-repeat center center;
                  }
                    }
                .icon2{
                  i {
                    background: url("@{imgUrl}suppliers.png") no-repeat center center;
                  }
                  }
                .icon1_active{
                  i {
                    background: url("@{imgUrl}productCategory_active.png") no-repeat center center;
                  }
                    }
                .icon2_active{
                  i {
                    background: url("@{imgUrl}suppliers_active.png") no-repeat center center;
                  }
                  }
                .tab {
                  width: 7rem;
                  padding-bottom: 0.3rem;
                  @media (max-width: 768px) {
                    padding-bottom: 0.1rem;
                  }
                  li {
                    background-color: #fff;
                    border-radius: 0 0 0.25rem 0.25rem;
                    color: #134AE4;
                    float: left;
                    width: 50%;
                    cursor: pointer;
                    font-weight: 400;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    i {
                     display: inline-block;
                      width: 0.14rem;
                      height: 0.14rem;
                      margin-right: 0.05rem;
                      background-size: contain;
                    }
                  }
                .tab_active {
                    background-color: #3E97FF;
                    color: #fff;
                }
               }
               .category {
                 padding: 0.15rem 10.8% 0;
                   .col-sm-2 {
                     width: 20%;
                 }
                .productCategoryBox {
                   .imgBox {
                     width: 0.96rem;
                     height: 0.74rem;
                     margin: 0 auto;
                     line-height: 0.74rem;
                       img {
                        width: auto;  
                        height: auto;  
                        max-width: 100%;  
                        max-height: 100%;
                       }
                    }
                    P {
                      font-size: 0.15rem;
                      line-height: 0.17rem;
                      color: #fff;
                      margin: 0.2rem auto 0;
                      width: 1.2rem;
                    }
                }
               }
            }

            .confront-case-list {
                .padding(0.3rem);
                padding-bottom: 0;
                min-height: 2.5rem;
                color: #444444;
                background: #fff;

                > img {
                    height: 0.48rem;
                }

                h4 {
                    position: relative;
                    color: rgba(0, 98, 254);
                    .media-font(0.28rem);
                    .marginTb(0.2rem);

                    &:after {
                        content: "";
                        width: 0.2rem;
                        height: 2px;
                        // background: rgb(0, 98, 254);
                        background: #fff;
                        display: block;
                        position: absolute;
                        bottom: -0.1rem;
                        left: 50%;
                        margin-left: -0.1rem;
                    }
                }

                .confront-case-list-p {
                    .media-font(0.18rem);
                    .media-line(0.3rem);
                    margin-bottom: 0.05rem;
                }

                .text-content {
                    height: 1.5rem;
                    @media (max-width: 992px) {
                        margin-bottom: 0.2rem;
                    }
                }

                div:last-of-type {
                    height: .1rem
                }

                .animates();

                &:hover {
                    cursor: pointer;

                    .confront-button {
                        background: rgba(0, 98, 254, .7);
                        color: #fff;
                    }
                }
            }

            .caseList_en {
                h4 {
                    min-height: 0.6rem;
                }
            }
        }
        .zIndexDiv{
            position: relative;
            z-index: 1;
        }
        .dowHover{
            background-color: #265adb;
            background-image: url("@{imgUrl}upIcon.png");
            color: #fff;
        }
        .hoverView {
            .down-content {
                background-color: #fff;
                height: 0.36rem;
                color: #b0b2b5;
                background-image: url("@{imgUrl}dowIcon.png");
                background-repeat: no-repeat;
                background-size: 0.41rem 0.23rem;
                background-position: center;
                margin-top: -1px;
                .animates();
                &.on{
                    .dowHover;
                }
            }

            .viewAll_box {
                position: absolute;
                left: 0px;
                z-index: 8;
                display: none;
                top: 100%;
                padding-top: 0.2rem;
                @media (max-width: 768px) {
                    padding-top: 0.3rem;
                }
                .bc_viewAll,.bc_viewAll_supply {
                    padding: 0.2rem 0.3rem;
                    height: 2.23rem;
                    background: rgba(63, 109, 228, 1);
                    display: block;
                    box-shadow: 0px 0px 1px rgba(0, 61, 216, 0.33);
                    .col-sm-3{
                        .paddingLr(0.1rem);
                    }
                    .suppliersImg{
                        margin: 0.1rem 0;
                        img{
                            height: 1.5rem;
                        }
                    }
                    @media (max-width: 768px) {
                        height: auto;
                        padding: 0.25rem 0.3rem;
                    }
                }
                .bc_viewAll_first {
                  padding: 0 0.3rem 0.2rem;
                   height: 2.43rem;
                    @media (max-width: 768px) {
                       height: 5.43rem;
                    }
                }
                .pandemicHeight {
                   @media (max-width: 768px) {
                       height: 2.43rem;
                    }
                }
                &.viewAll_box_center {
                    left: -100%;
                    font-size: 0.16rem;
                    @media (min-width: @lg-width) {
                        .bc_viewAll {
                            .paddingLr(0.54rem);
                        }

                        .col-xs-4 {
                            .paddingLr(0.27rem);
                        }

                    /*    .row {
                            margin-right: -0.27rem;
                            margin-left: -0.27rem;
                        }*/
                    }
                    .supply {
                        position: relative;
                        padding-right: 1rem;
                        cursor: pointer;
                        margin: 0.01rem 0;
                        @media (max-width: @md-width) {
                            padding-right: 1.5rem;
                        }

                        .supply-img {
                            position: relative;

                            p {
                                position: absolute;
                                bottom: 0;
                                background: rgba(0, 0, 0, 0.53);
                                width: 100%;
                                height: 0.28rem;
                                line-height: 0.28rem;
                                color: #fff;
                                left: 0;
                            }

                            img {
                                width: 100%;
                                height: 1.81rem;
                            }
                        }

                        .supply-text {
                            position: absolute;
                            width: 1rem;
                            right: 0;
                            bottom: 0;
                            height: 100%;
                            background: #1a50cd;
                            @media (max-width: @md-width) {
                                width: 1.5rem;
                            }

                            .supply-text-content {
                                .home-center;
                                width: 100%;
                                padding-left: 0.15rem;
                               /deep/ p{
                                    position: relative;
                                    text-align: left;
                                    padding-left: 0.1rem;
                                    margin-bottom: 0.15rem;
                                    word-wrap: break-word;
                                   &:before {
                                        .home-left;
                                        content: '';
                                        width: 3px;
                                        height: 3px;
                                        border-radius: 50%;
                                        background-color: #fff;
                                        top: 0.12rem;
                                    }
                                }
                            }
                        }
                    }
                }

                .suppliers_img {
                    width: 20%;
                    padding-right: 0.2rem;
                    float: left;
                    @media(max-width: @xs-width){
                        width: 33.333%;
                        margin-bottom: 0.2rem;
                    }
                }

                .btn_viewAll {
                    background: #fff;
                    color: rgba(0, 98, 254);
                    font-size: 0.2rem;
                    line-height: 0.38rem;
                    display: inline-block;
                    height: 0.38rem;
                    padding: 0 0.2rem;
                    border-radius: 0.25rem;
                    margin: 0.1rem auto 0 auto;
                }
                .show_big{
                    @media (max-width: 767px) {
                        display: none;
                    }
                }
                .show_small{
                    display: none;
                    @media (max-width: 767px) {
                        display: inline-block;
                    }
                }
                .btn_apply{
                    border: 1px solid #fff;
                    color: #fff;
                    font-size: 0.2rem;
                    line-height: 0.38rem;
                    display: inline-block;
                    padding: 0 0.2rem;
                    border-radius: 0.25rem;
                    margin: 0.2rem auto 0.1rem auto;
                }

                &.viewAll_box_right {
                    left: initial;
                    right: 0;
                    @media(max-width: @xs-width){
                        right:-50%;
                    }
                    .compliance{
                        text-align: center;
                        border-bottom: 2px solid #fff;
                        padding: 0.1rem 0 0.2rem 0;
                        margin: 0 0.5rem;
                        @media(max-width: 768px){
                            margin: 0 0.2rem;
                        }
                        img{
                            height: 0.6rem;
                            @media(max-width: 768px){
                                display: block;
                                margin: 0 auto;
                            }
                        }
                        p{
                            /*display: inline-block;*/
                            font-size: 0.24rem;
                        }
                    }
                }
            }

            &:hover {
                @media(min-width: 768px){
                    .viewAll_box {
                        display: block;
                    }
                    .down-content {
                        .dowHover;
                    }
                }
            }
        }

        .confront-born {
            background-repeat: no-repeat;
            background-position: center;
            background-color: #002472;
            // background-size: 100%;
            color: #fff;
            text-align: center;
            position: relative;
            min-height: 4.5rem;
            padding-bottom: 0.5rem;
            .row > div {
                text-align: justify;
                .media-font(0.19rem);
                .media-line(0.4rem);
            }
        }

        .confront-material {
            color: #fff;
            text-align: center;
            min-height: 4.2rem;
            position: relative;
            padding-bottom: 1rem;
            background-size: cover;

            &:before {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(24, 73, 181, 0.3);
                content: '';
                z-index: 1;
            }

            > div {
                position: relative;
                z-index: 2;
            }

            .row > div:first-child {
                .media-font(0.19rem);
                .media-line(0.4rem);
                text-align: justify;
                min-height: 1rem;
            }

            .confront-material-button {
                .marginTb(0.1rem);

                .confront-button {
                    background-color: transparent;
                    border-width: 2px;
                    border-color: #fff;
                    color: #fff;
                    padding-right: 0.4rem;

                    &:before {
                        right: 0.1rem;
                    }

                    &:hover {
                        opacity: 0.8;
                    }
                }
            }

            .confront-material-bottom {
                .media-font(0.2rem);
                .media-line(0.4rem);
                .paddingTb(0.2rem);
                background-color: rgba(0, 0, 0, 0.4);
                color: #fff;
                position: absolute;
                left: 0;
                bottom: 0;
                z-index: 3;
                width: 100%;
            }
        }

        .real-time {
            color: #fff;
            text-align: center;
            min-height: 5.2rem;

            .real-time-container {
                padding-bottom: 0.5rem;

                &:first-child {
                    border-right: 1px solid #fff;
                }
            }

            .rt-content-list {
                .marginTb(0.5rem);
                position: relative;
                overflow: hidden;
                word-wrap: break-word;

                > div {
                    position: relative;
                    width: 22%;
                    float: left;

                    &:before {
                        width: 1px;
                        background-color: rgba(255, 255, 255, 0.63);
                        position: absolute;
                        right: 0;
                        top: 20%;
                        height: 80%;
                        content: '';
                    }

                    &:last-child {
                        &:before {
                            display: none;
                        }
                    }

                    span {
                        .media-font(0.38rem);
                    }

                    p {
                        .media-font(0.18rem);
                    }
                }
            }
            .rt-content-list > div:last-of-type {
                width: 34%;
            }

            div.rt-button {
                position: absolute;
                bottom: 0;
                width: 100%;
                left: 0;
                min-width: 1.6rem;

                .confront-button {
                    background-color: transparent;
                    border-width: 2px;
                    color: #fff;
                    border-color: #fff;

                    &:before {

                    }

                    &:hover {
                        background: #fff;
                        color: rgba(0, 98, 254, .7);
                    }
                }
            }
        }

        .confront-record {
            text-align: center;
            margin-bottom: 0.5rem;

            .confront-h3 {
                color: #444444;
            }

            .confront-record-list {
                border: 1px solid #E5E5E5;
                overflow: hidden;
                margin-bottom: 0.3rem;
                margin-left: 1px;
                cursor: pointer;

                .record-text {
                    text-align: justify;
                    color: #444444;
                    .paddingTb(0.3rem);
                    .paddingLr(0.15rem);

                    > h4 {
                        .media-font(0.2rem);
                        .media-line(0.3rem);
                        font-weight: bold;
                        margin-bottom: 0.1rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    p {
                        .media-font(0.18rem);
                        .media-line(0.3rem);
                        .marginTb(0.1rem);
                    }

                    > a {
                        .media-font(0.14rem);
                        color: #757575;
                        display: block;
                        margin-top: 0.1rem;
                    }
                }

            }
        }
    }

    .real-time-content-h {
        font-size: 0.30rem;
    }

    @media (max-width: @md-width) {
        .confront {
            .confront-case {
                .confront-button {
                    padding: 0.05rem 0.4rem;
                }

                .col-xs-6 {
                    margin-bottom: 0.3rem;
                    width: 50%;
                    float: none;
                    display: inline-block;
                }
            }

            .confront-material .confront-material-button .confront-button {
                min-width: 20%;
            }

            .confront-born .row > div,
            .confront-material .row > div:first-child {
                padding: 0 0.3rem !important;
            }

            .real-time {
                padding-bottom: 1rem;

                .real-time-container {
                    padding-bottom: 1rem;

                    &:first-child {
                        border: none;
                    }
                }

                div.rt-button {
                    bottom: 0.5rem;

                    .confront-button {
                        .paddingLr(0.5rem);
                    }
                }

            }
        }
    }

    @media (max-width: 767px) {
        // .confront-case-list{
        //   margin-bottom: 0.4rem;
        // }
        .confront .confront-record {
            .paddingLr(0.1rem);
        }

        .clr-w {
            line-height: 0.4rem !important;
        }

        .confront .confront-material .confront-material-button {
            .marginTb(0.3rem);
        }

        .confront .confront-h3_en {
            padding: .5rem;
        }
    }

    .font-30 {
        margin-top: 0.2rem;
        margin-bottom: 0.05rem;
        font-size: 0.3rem;
    }

    .confront-button, .to-ww-btn {
        .paddingLr(0.2rem);
        .paddingTb(0.05rem);
        .animates();
        .media-font(0.16rem);
        background-color: #fff;
        display: inline-block;
        border-radius: 0.2rem;
        border: 1px solid #0062FE;
        min-width: 1.2rem;
        text-align: center;
        color: #0062FE;
        position: relative;

        &:before {
            .slate(0, -50%);
            position: absolute;
            right: 0.05rem;
            top: 50%;
            font-size: 0.22rem;
        }

        @media (max-width: 767px) {
            border-width: 1px !important;
            margin-top: 0 !important;
        }
    }

    .to-ww-btn {
        margin-top: 0.6rem;
        height: 0.6rem;
        padding: 0 0.3rem;
        line-height: 0.6rem;
        border-radius: 0.3rem;
        font-size: 0.3rem;
        font-weight: bold;
        border: none;
    }

    .new-fight-cov {
        width: 100%;
        position: relative;

        img {
            width: 100%;
            height: auto;
        }
    }

    .new-fight-title {
        width: 100%;
        text-align: center;
        font-size: 0.22rem;
        line-height: 0.3rem;
        font-weight: bold;
        margin-top: 0.1rem;
        margin-bottom: 0.3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .new-fight-cov:hover .new-fight-content {
        height: 100%;
        // transform: scale(1);
        transition: height 0.8s;
        transform-origin: top center;
    }

    .new-fight-cov:hover + .new-fight-title {
        opacity: 0;
    }

    .new-fight-content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background: rgba(27, 34, 106, 0.6);
        height: 0;
        // transform: scale(0);
        overflow: hidden;
        transition: height 0.8s;
        transform-origin: top center;
    }

    .new-fight-title-ot {
        width: 80%;
        text-align: center;
        font-size: 0.22rem;
        line-height: 0.3rem;
        font-weight: bold;
        margin-top: 0.1rem;
        margin-bottom: 0.1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #ffffff;
        margin: 5% auto;
    }

    .content-text {
        width: 80%;
        height: 68%;
        overflow: hidden;
        margin: 0 auto;
    }

    .clr-w {
        color: #ffffff;
        font-size: 0.20rem;
        line-height: 0.30rem;
        text-align: left;
        padding-right: 0.1rem;
    }

    .content-text-ot {
        width: 100.1%;
        height: 100%;
    }

    .content-line {
        display: block;
        height: 100%;
        width: 0.01rem;
        position: absolute;
        background: rgba(27, 34, 106, .6);
        top: 0;
        right: 10%;

    }

    .link-to {
        color: #ffffff;
        text-decoration: underline;

        &:hover {
            color: rgba(255, 255, 255, .6);
        }
    }

    .scroll_height_1 {
        height: 2.3rem;

        div {
            padding-right: 0.2rem;
            @media (max-width: 767px) {
                padding-right: 0.6rem;
            }
        }
    }

    .scroll_height_2 {
        height: 1.3rem;

        div {
            padding-right: 0.2rem;
            @media (max-width: 767px) {
                padding-right: 0.6rem;
            }
        }
    }

</style>
<template>
    <div class="confront">
        <!--头部菜单-->
        <div class="other-banner">
            <Headers/>
            <Banner :textP="true" :list="top" :banner-msg="false"/>
            <div class="banner-news" v-if="settlePlatform.length>0">
                <!--<div class="container">-->
                <!--<div class="row">-->
                <el-carousel height="0.95rem" direction="vertical" :autoplay="true" indicator-position="none"
                             v-if="$i18n.locale == 'cn'">
                    <el-carousel-item v-for="(item, index) in settlePlatform" :key="index">
                        <div class="col-xs-12">
                            <div class="row">
                                <div class="col-xs-6" v-for="(i, k) in item" :key="k">
                                    <div class="row">
                                        <div class="medium"><span v-html="i.html" :class="{ icon_fire: i.hot }"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
                <el-carousel height="0.95rem" direction="vertical" :autoplay="true" indicator-position="none"
                             v-if="$i18n.locale == 'en'">
                    <el-carousel-item v-for="(item, index) in settlePlatform_en" :key="index">
                        <div class="col-xs-12">
                            <div class="row">
                                <div class="medium"><span v-html="item.html" :class="{ icon_fire: item.hot }"></span>
                                </div>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
                <!--</div>-->
                <!--</div>-->
            </div>
        </div>
        <!--dtp全球抗疫频道解决方案-->
        <div v-if="confrontObj[1].img" class="confront-case"
             :style="{'background': 'url('+confrontObj[1].img+') center / cover no-repeat'}">
            <h3 class=" wow fadeInUp confront-h3" data-wow-delay="200ms">{{confrontObj[1].name}}</h3>
            <div class="container wow fadeInUp zIndexDiv" v-if="confrontObj[1].columnList" data-wow-delay="500ms">
                <div class="row">
                    <template v-for="(item, index) in confrontObj[1].columnList">
                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 hoverView" :key="index">
                            <div :class="$i18n.locale == 'en' ? 'confront-case-list caseList_en': 'confront-case-list'">
                                <img :src="item.img" alt="">
                                <h4>{{item.name}}</h4>
                                <div class="text-content">
                                    <vue-scroll>
                                        <div class="confront-case-list-p" v-html="item.html"></div>
                                    </vue-scroll>
                                </div>
                                <div>
                                   <!-- <x-router-link class="confront-button iconfont icon-dibudaohanglan" v-if="item.english && item.id && item.english != 'null'" :to="item.english + '?columnId=' + item.id">{{$t('other.forDetails')}}</x-router-link>-->
                                </div>
                                <div></div>
                            </div>
                            <div class="down-content"></div>
                            <div class="viewAll_box container" v-if="index == 0">
                                <div :class="['bc_viewAll', 'clearfix', 'bc_viewAll_first', tabValue ? '' : 'pandemicHeight']" :style="{'background': 'url('+ bgSuppliers +') center / cover no-repeat'}">
                                        <div class="row">
                                          <ul class="tab clearfix center-block"><li :class="['clearfix', tabValue ? 'icon1': 'tab_active icon1_active']" @click="tabValue = 0"><i></i>{{$t('other.pandemicProduct')}}</li><li :class="['clearfix', tabValue ? 'tab_active icon2_active': 'icon2']" @click="tabValue = 1"><i class="icon2"></i>{{$t('other.factories')}}</li></ul>
                                          <div v-if="!tabValue" class="category clearfix">
                                              <div class="col-sm-2 col-xs-2" v-for="(item2, index2) in productCategory" :key="index2 + 'one'">
                                                <div class="productCategoryBox">
                                                    <router-link :to="{name: 'pandemicProductList', query:{id: item2.columnId, title: ''+$t('other.reliableSuppliers'), detailImg: suppliersImg, columnId: item.id}}">
                                                        <div class="imgBox">
                                                        <img :src="item2.img" alt="">
                                                        </div>
                                                        <p>{{item2.title}}</p>
                                                    </router-link>
                                                </div>
                                            </div>
                                          </div>
                                          <div v-if="tabValue">
                                            <div class="col-sm-3 col-xs-6" v-for="(item3, index3) in suppliersList">
                                                <div class="suppliersImg">
                                                    <router-link :key="index3" :to="{name: 'newsDetails', query:{id: item3.articleId, title: ''+$t('other.reliableSuppliers'), detailImg: suppliersImg, columnId: item.id}}">
                                                        <img :src="item3.img" alt="">
                                                    </router-link>
                                                </div>
                                            </div>
                                          </div>
                                        </div>
                                    <x-router-link class="btn_viewAll show_small"
                                                   v-if="item.english && item.id && item.english != 'null'"
                                                   :to="item.english + '?columnId=' + item.id">{{$t('other.viewAll')}}
                                    </x-router-link>
                                </div>
                                <x-router-link class="btn_viewAll show_big"
                                               v-if="tabValue && item.english && item.id && item.english != 'null'"
                                               :to="item.english + '?columnId=' + item.id">{{$t('other.viewAll')}}
                                </x-router-link>
                                <router-link class="btn_viewAll show_big pandemicMore"
                                               v-if="!tabValue && item.english && item.id && item.english != 'null'"
                                               :to="{name: 'pandemicProduct', query:{title: ''+ $t('other.reliableSuppliers'), detailImg: suppliersImg, columnId: item.id}} ">{{$t('other.viewAll')}}
                                </router-link>
                            </div>
                            <div class="viewAll_box container viewAll_box_center" v-else-if="index == 1">
                                <div class="bc_viewAll_supply">
                                    <div class="row">
                                        <template v-for="(item, index) in supplyList">
                                                <div class="col-xs-6 col-sm-4" :key="index">
                                                    <router-link tag="div" :to="{name: index === 2 ? 'register': 'supplyChannel',query: {columnId:825,flashId: item.columnId}}">
                                                        <div class="supply">
                                                                <div class="supply-img">
                                                                    <img :src="item.img" alt="">
                                                                    <p>{{item.name}}</p>
                                                                </div>
                                                                <div class="supply-text">
                                                                    <div class="supply-text-content"  v-html="item.html"></div>
                                                                </div>
                                                            </div>
                                                    </router-link>
                                                </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="viewAll_box container viewAll_box_right" v-else-if="index == 2">
                                <div class="bc_viewAll" :style="{'background': 'url('+ bgCompliance +') center / cover no-repeat','background-size': '100% 100%'}">
                                    <div class="row">
                                        <template v-for="(item, index) in complianceList">
                                            <div class="col-xs-4" :key="index">
                                                <div class="compliance">
                                                    <img :src="item.img" alt="">
                                                    <p>{{item.name}}</p>
                                                </div>
                                                <x-router-link class="btn_apply" to="/register">{{$t('other.applyNow')}}</x-router-link>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="wow fadeInDown">
                <x-router-link class="to-ww-btn wow fadeInDown" data-wow-delay="200ms" :to="'/ww?columnId=628'">
                    {{$t('other.supplyChannel')}}
                </x-router-link>
            </div>
            <div class="font-30 wow fadeInDown" data-wow-delay="200ms">{{confrontObj[1].description}}</div>
        </div>
        <!--dtp全球抗疫频道解决方案 end-->

        <!--全球抗疫频道诞生-->
        <div v-if="confrontObj[2].img" class="confront-born"
             :style="{'backgroundImage': 'url('+confrontObj[2].img+')'}">
            <h3 class="confront-h3 wow fadeInUp" data-wow-delay="200ms">{{confrontObj[2].name}}</h3>
            <div class="container wow fadeInUp" data-wow-delay="200ms">
                <div class="row">
                    <div class="scroll_height_1">
                        <vue-scroll>
                            <div v-html="confrontObj[2].html"></div>
                        </vue-scroll>
                    </div>
                </div>
            </div>
        </div>
        <!--全球抗疫频道诞生 end-->
        <!--广东抗疫物资出口联盟介绍-->
        <div v-if="confrontObj[3].img" class="confront-material"
             :style="{'backgroundImage': 'url('+confrontObj[3].img+')'}">
            <div>
                <h3 class="confront-h3 wow fadeInUp real-time-content-h" data-wow-delay="200ms"
                    v-if=" $i18n.locale == 'en'" v-html="confrontObj[3].name">{{}}</h3>
                <h3 class="confront-h3 wow fadeInUp real-time-content-h" data-wow-delay="200ms"
                    v-if=" $i18n.locale == 'cn'">{{confrontObj[3].name}}</h3>
                <div class="container wow fadeInUp" data-wow-delay="200ms">
                    <div class="row">
                        <div class="scroll_height_2">
                            <vue-scroll>
                                <div v-html="confrontObj[3].html"></div>
                            </vue-scroll>
                        </div>
                        <div class="confront-material-button wow fadeInUp" data-wow-delay="500ms">
                            <a @click="showLeaving" class="confront-button iconfont icon-dibudaohanglan"
                               href="javascript:;">{{$t('other.messageBox')}}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="confront-material-bottom wow fadeInUp" data-wow-delay="200ms">
                <b v-if=" $i18n.locale == 'en'">{{confrontObj[3].english}}</b>&nbsp;{{confrontObj[3].description}}&nbsp;<b v-if=" $i18n.locale == 'en'">{{confrontObj[3].keywords}}</b>&nbsp;{{confrontObj[3].gps}}
            </div>
        </div>
        <!--广东抗疫物资出口联盟介绍 end-->

        <!--广东抗疫物资出口联盟介绍-->
        <div class="real-time" v-if="confrontObj[4].img" :style="{'backgroundImage': 'url('+confrontObj[4].img+')'}">
            <h3 class="confront-h3 wow fadeInUp">{{confrontObj[4].name}}</h3>
            <div class="container wow fadeInUp">
                <div class="row">
                    <template v-for="(item, index) in confrontObj[4].columnList">
                        <div class="col-md-6 real-time-container" :key="index">
                            <div class="real-time-content">
                                <h4 class="wow fadeInUp real-time-content-h" data-wow-delay="200ms">{{item.name}}</h4>
                                <div class="rt-content-list wow fadeInUp" data-wow-delay="200ms">
                                    <!--item2.description-->
                                    <div v-for="(item2, index2) in item.columnList" :key="index2"
                                         class="real-time-count wow fadeInUp" :data-wow-delay="((index2+1) * 200)+'ms'">
                                        <countTo separator=""
                                                 :decimals="item2.description.split('.').length == 2 ? item2.description.split('.')[1].length: 0"
                                                 :autoplay="false" ref="countTo2" :suffix="item2.keywords||''"
                                                 :endVal='item2.description * 1'></countTo>
                                        <p class="wow fadeInUp" data-wow-delay="200ms">{{item2.name}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="rt-button">
                                <a class="confront-button iconfont icon-dibudaohanglan wow fadeInDown"
                                   data-wow-delay="500ms" :href="item.english + '?columnId=' + item.id">{{item.description}}</a>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <!--广东抗疫物资出口联盟介绍 end-->
        <div class="confront-record" v-if="confrontObj[5].name">
            <h3 class="confront-h3 wow fadeInUp" data-wow-delay="200ms">{{confrontObj[5].name}}</h3>
            <!-- <div class="container">
                <div class="row wow fadeInUp" data-wow-delay="500ms">
                    <carousel :loop="true" :dots="false" :margin="20" :autoHeight="true" :autoplay="true" :autoplayTimeout="3000" :nav="false"
                              :autoplayHoverPause="true" :smartSpeed="1000" :responsive="{0:{items:2},500:{items:2},776:{items:3}}">
                        <template v-for="(item,index) in confrontObj[5].columnList">
                            <div class="confront-record-list" ref="confront">
                                <div class="record-img">
                                    <img :src="item.img" alt="">
                                </div>
                                <div class="record-text">
                                    <h4>{{item.name}}</h4>
                                    <vue-scroll style="height: 2.2rem;">
                                        <div>
                                            <p>{{item.description}}</p>
                                        </div>
                                    </vue-scroll>
                                    <a v-if=" (item.english && item.english.length > 1) && item.english !== 'null' " :href="item.english" target="_blank">全文链接-公众号</a>
                                </div>
                            </div>
                        </template>
                    </carousel>
                </div>
            </div> -->
            <div class="container">
                <div class="row wow fadeInUp" data-wow-delay="500ms">
                    <div class="col-md-4 col-xs-6" v-for="(item,index) in confrontObj[5].columnList" :key="index">
                        <div class="new-fight-cov">
                            <img :src="item.img"/>
                            <div class="new-fight-content">
                                <p class="new-fight-title-ot" :title="item.name">{{item.name}}</p>
                                <div class="content-text">
                                    <div class="content-text-ot">
                                        <vue-scroll>
                                            <div class="clr-w">{{item.description}}
                                                <br/>
                                                <a class="link-to"
                                                   v-if=" (item.english && item.english.length > 1) && item.english !== 'null' "
                                                   :href="item.english" target="_blank">全文链接-公众号</a>
                                            </div>
                                        </vue-scroll>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <p class="new-fight-title" :title="item.name">{{item.name}}</p>
                    </div>
                </div>
            </div>

        </div>
        <Leaving ref="leaving"/>
        <Footers/>
    </div>
</template>
<script>
    import {Api} from '@/assets/js/api_kz'
    import Banner from "@/components/home/banner";
    import Leaving from '@/components/leaving/leaving'
    import countTo from 'vue-count-to'
    import {WOW} from 'wowjs'
    import {Loading} from 'element-ui';
    import {setTimeout} from 'timers';

    const windowWidth = document.body.clientWidth
    export default {
        components: {Banner, Leaving, countTo},
        data() {
            return {
                top: [],
                loadingInstance: null,
                confrontObj: [{}, {}, {}, {}, {}, {}, {}, {}],
                settlePlatform: [],
                settlePlatform_en: [],
                metaTitle: '',
                suppliersList: [],
                suppliersImg: '', // 安心找banner
                productCategory: null, // 安心找抗疫产品
                bgSuppliers: '', // 安心找背景图
                complianceList: [], // 合规办
                bgCompliance: '', // 合规办背景图
                supplyList: [], // 闪电送
                supplyId: '', // 安心找id
                tabValue: 0
            }
        },
        created() {
            this.loadingInstance = Loading.service({})
        },
        mounted() {
            this.loadPage()
            let that = this
            Api.settlePlatform().then(res => {
                let data = res[1]
                if (data && data.result === 1) {
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
                } else {
                    this.$message.error('' + this.$t('other.requestFailed'))
                    console.log('请求失败')
                }
            })
            this.metaTitle = this.$t('menu.antiEpidemic')
        },
        methods: {
            showLeaving() {
                this.$refs.leaving.toShow()
            },
            wowLoad() {
                let that = this
                let ie = /msie (6.0|7.0|8.0|9.0)/i.test(navigator.userAgent)
                this.wow = new WOW({
                        live: false,
                        callback: function (box) {
                            if (!ie) { // ie10+
                                box.classList.add('wow1')
                            }
                            if (box.className.indexOf('real-time-count') != -1) { // 数字动画
                                that.countToAnimate()
                            }
                        }
                    }
                )
                this.wow.init()
            },
            countToAnimate(index) {
                let count = this.$refs.countTo2
                if (count && count.length) {
                    for (let v of count) {
                        v.start()
                    }
                }
            },
            loadPage() {
                Api.confrontLoad({columnId: this.$route.query.columnId}).then(res => {
                    let data = res[1]
                    if (data && data.result === 1) {
                        let obj = data.data
                        this.confrontObj = obj
                        this.top = obj[0] && obj[0].columnList
                        let caseList = obj[1]
                        if (caseList) {
                            caseList = caseList.columnList
                            this.supplyList = caseList[1] && caseList[1].columnList
                            this.complianceList = caseList[2] && caseList[2].columnList
                            this.bgCompliance = caseList[2] && caseList[2].img2
                            this.bgSuppliers = caseList[0] && caseList[0].img2
                            this.supplyId = caseList[0] && caseList[0].columnId
                            this.getSuppliers()
                            this.getProductCategory()
                        }
                        this.$nextTick(() => {
                            /*let maxHeight = 0
                            let listArray = []
                            for(let v of this.$refs.confront){
                              listArray.push(v.offsetHeight)
                            }
                            maxHeight = (Math.max.apply(null, listArray)) + 'px'
                            let list = document.querySelectorAll('.confront-record .confront-record-list')
                            for(let ll of list){
                              ll.style.minHeight = maxHeight
                            }*/
                            this.wowLoad()
                            if (windowWidth < 768) {
                                $('.viewAll_box').css({
                                    width: $('.viewAll_box').parent().parent().width(),
                                    paddingRight: '0.15rem'
                                })
                                $('.hoverView').click(function (e) {
                                    // $('.hoverView .viewAll_box').css({display: 'none'})
                                    let viewAll_box = $('.viewAll_box')
                                    let content = $(this).find('.down-content')
                                    if($(this).find('.viewAll_box').css('display') === 'none'){
                                        viewAll_box.css({display: 'none'})
                                        $(this).find('.viewAll_box').css({display: 'block'})
                                        $('.down-content').removeClass('on')
                                        content.addClass('on')
                                    }else{
                                        viewAll_box.css({display: 'none'})
                                        $('.down-content').removeClass('on')
                                    }
                                    e.stopPropagation();
                                })
                                /*$('.hoverView').click(function () {
                                    if($(this).find('.viewAll_box').css('display') !== 'none'){
                                        $(this).find('.viewAll_box').css({display: 'none'})
                                    }else{
                                        $(this).find('.viewAll_box').css({display: 'block'})
                                    }
                                })*/
                            }
                        })
                    } else {
                        this.$message.error('请求失败,请刷新页面重试')
                        console.log('请求全球抗疫页面失败')
                    }
                    this.loadingInstance.close()
                })
            },
            getSuppliers() {
                Api.recommendNewsList({
                    columnId: this.supplyId,
                    pageSize: 4,
                    pageIndex: 1
                }).then(res => {
                    let data = res[1]
                    if (data && data.result === 1) {
                        this.suppliersList = data.data.records
                        this.suppliersImg = data.data.img
                    } else {
                        console.log('请求失败')
                    }
                })
            },
            getProductCategory() {
                Api.category({
                    language: this.$i18n.locale === 'en' ? 'en' : null,
                    hot: true
                }).then(res => {
                  let data = res[1]
                    if (data && data.result === 1) {
                        this.productCategory = data.data
                    } else {
                        console.log('请求失败')
                    }
                })
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
<style lang="less" scoped>

</style>

