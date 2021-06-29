<template>
    <div>
        <div style="height:3.7rem" class="bg_header" :style="{position:'relative',background: 'url('+ navigData.img +') center/cover no-repeat'}">
            <div class="mongolia"></div>
            <Headers></Headers>
            <div class="container container-box">
                <div class="row">
                    <p class="title_ch_new">{{navigData.title}}</p>
                </div>
            </div>
        </div>
    <!--    <div class="container container-tab">
            <div class="row">
                <span v-for="(item,index) in navigData.columnList" :key="index" :class="{'last-item-tab': navigData.columnList.length - 1 == index, 'active-tab': activeColumnId === item.columnId,'tab_en':$i18n.locale == 'en' }" @click="switchTab(index,item.columnId)">{{item.title}}</span>
            </div>
        </div>
        <div class="w100 line"></div>-->
        <div :style="{backgroundColor: activeColumnId == 827? '#EEF7FF' : '' }">\
            <CertifiedFactory  v-if="columnId == 824 || columnId == 1136" :columnId="columnId"/>
            <div class="container fadeIn">
          <Policy v-if="activeColumnId === 827 || activeColumnId === 1140" :policyList="policyList" :detailImg="detailImg" />
          <!-- <Compliance v-if="(activeColumnId !== 827 && activeColumnId !== 1140 && !showList) && activeColumnId != 824" :activeId="activeColumnId" :recordsData="records" :boxImg="img" :detailImg="detailImg" :title="title" v-on:toShowList="toShowList"/> -->
          <Compliance v-if="(columnId !== 827 && columnId !== 1140 && !showList) && (columnId != 824 && columnId != 1136)" :columnId="flashId" />
        </div>
            <!--<SecondaryList v-if="showList" :detailImg="detailImg" :columnId="columnId"/>-->
            <!--
              <div class="tab_box">
                <div class="container">
                    <div class="row" >
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="row">
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" v-for="(item,index) in navigData.columnList" :key="index">
                                    <div class="row tab">
                                        <span :class="{ active: tabIndex == index }"  @click="switchTab(index,item.columnId)">{{item.title}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              <div class="container" v-if="navigData.columnList">
                <div class="row" >
                    <div class="news_title">
                        <span>{{navigData.columnList[tabIndex].title}}</span>
                    </div>
                </div>
            </div> -->
        <!-- <div class="w100" v-for="item in records" :key="item.articleId" @click="goLink(item.articleId)" >
            <div :class="[824, 827].includes(navigData.columnList[tabIndex].columnId)? 'container container-active' : 'container'">
                <div class="news_box">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 ">
                            <div class="row">
                                <div class="col-lg-4 col-md-5 col-sm-6">
                                    <div class="news_img news_img-ot">
                                        <img :src="item.img" alt="">
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-7 col-sm-6">
                                    <p class="info_title_new">{{item.title}}</p>
                                    <p class="info_time" v-if="item.pubTime && item.pubTime !== 'null'">{{item.pubTime}}</p>
                                    <div class="news_box_scroll">
                                        <vue-scroll>
                                        <p class="info_con_new">{{item.description}}</p>
                                        </vue-scroll>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="pageSize"
                    :current-page = "pageIndex"
                    :pager-count="5"
                    layout="prev, pager, next"
                    :total="total">
            </el-pagination>
        </div> -->
        <Footers></Footers>
    </div>
  </div>
</template>
<script>
import { Api } from '@/assets/js/api'
import Policy from '@/components/preventionTab/policy'
import Compliance from '@/components/preventionTab/compliance'
import SecondaryList from '@/components/preventionTab/secondaryList'
import CertifiedFactory from '@/components/preventionTab/certifiedFactory'
export default {
    components: { Policy, Compliance, SecondaryList, CertifiedFactory },
    data() {
        return {
            menu: [], // 导航栏
            pageSize: 10, // 一页几条数据
            pageIndex: 1, // 当前页
            navigData: [],
            tabIndex: 0,
            records: [],
            total: 0,
            activeColumnId: '',
            img: null,
            detailImg: '',
            title: '',
            showList: false, // 展示抗疫物资认证工厂列表页
            columnId: '',
            flashId: null
        };
    },
    methods:{
        getnavigList(){
          Api.navigList().then(res => {
              let data = res[1]
              if(data && data.result === 1){
                  this.navigData = data.data
//                  const { columnId} = this.$route.query
//                  let i = 0
//                  if (columnId) { // 获取地址的columnId 直接带出数据
//                    this.navigData.columnList.forEach((item, key) => {
//                      if (+item.columnId === +columnId) {
//                        i = key
//                      }
//                    })
//                  }
//                  this.switchTab(i, this.navigData.columnList[i].columnId)
//                  this.policyList = data.data.columnList.find(e => e.columnId === 827 || e.columnId === 1140)
              }else{
                  console.log('请求失败')
              }
          })
      },
        newsList(){
            Api.newsList({
                columnId: this.columnId,
                pageSize: this.pageSize,
                pageIndex: this.pageIndex,
                year: 0,
            }).then(res => {
                let data = res[1]
                 if(data && data.result === 1){
                  if(this.activeColumnId === 824 || this.activeColumnId === 1136){
                      this.records = data.data.records.slice(0,4)
                  }else{
                      this.records = data.data.records.slice(0,3)
                  }
                    this.total = data.data.total
                 }else{
                     console.log('请求失败')
                 }
            })
        },
//        switchTab(index, columnId){
//            this.img = this.navigData.columnList[index].img
//            this.detailImg = this.navigData.columnList[index].img1
//            this.title = this.navigData.columnList[index].title
//            this.tabIndex = index
//            this.columnId = columnId
//            this.activeColumnId = columnId
//            this.pageIndex = 1
//            this.showList = false
//            this.newsList()
//        },
    handleCurrentChange(val){
        this.pageIndex = val
//        this.newsList()
    },
    // 跳转
    goLink(id) {
      if ([824, 827].includes(this.navigData.columnList[this.tabIndex].columnId)) {
        this.$router.push({
          path: '/newsDetails?id=' + id + '&title=' + this.navigData.columnList[this.tabIndex].title + '&columnId=' + this.navigData.columnList[this.tabIndex].columnId + '&img=' + this.img
        })
      }
    },
//        toShowList(value){
//            this.showList = value.show
//            this.columnId = value.columnId
//        }
    },
    mounted(){
        this.flashId = Number(this.$route.query.flashId)
        this.columnId = Number(this.$route.query.columnId) // 安心找
        this.getnavigList()
    }
};
</script>
<style lang="less" scoped>
    .bg_header{
        width: 100%;
        min-height: 3.7rem;
        position: relative;
        .mongolia{width: 100%;height: 100%;top: 0;left: 0;position: absolute;background: rgba(0,21,109,0.5);}
    }
    .tab_box{border-bottom: 1px solid #e8e8e8;margin-bottom: 0.2rem;}
    .tab{
        text-align: center;padding: 10px 0;
        span{
            .media-font(0.2rem);
            .paddingTb(0.12rem);
            cursor: pointer;
            font-weight: bold;
        }
        .active{
            border-bottom: 2px solid #4a96f9;
        }
    }

    .container-box{
        height:  100%;
        .home-center;
        @media(max-width: 767px){
            width: 100%;
        }
    }
    .title_ch_new{
        .media-font(0.54rem);
        width: 100%;
        color: #fff;
        text-align: center;
        .home-center;
        @media(max-width: 767px){
            padding:0 0.15rem;
        }
    }
    .news_title{
        font-size: 20px;
        border-bottom: 1px solid #e8e8e8;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
    }
    .info_title{
        font-size: 16px;
        .marginTb(0.1rem);
        font-weight: bold;
    }
    .info_title_new{
        .media-font(0.20rem);
        .media-line(0.3rem);
        .marginTb(0.2rem);
        font-weight: bold;
    }
    .info_con_new{
        .media-font(0.16rem,0.2rem,0.22rem);
        .media-line(0.3rem);
    }
    .w100{
        width: 100%;
        &:hover{
            background: #f5f7fb;
        }
    }

    .VuePagination__count{
        display: none;
    }
    .el-input__inner{
        border: none;
    }
    .container-active:hover{
      color: #23527c;
      cursor: pointer;
    }
    .news_box_scroll{
        // height: 140px;
        padding-top: 0.1rem;
    }
    @media (max-width: 768px){
        .register{width: 100%;}
        .news_box_pc{display: none;}
        .news_box_mobile{display: block;}
        .news_title{padding: 0 10px;}
        .title_en{font-size: 20px;margin-left: 10px;}
    }
    .container-b{
      border: solid 1px red;
      height: 120px;
    }
    .container-tab{
      /*height: 0.7rem;*/
      text-align: left;
      span{
        display: inline-block;
        height: 100%;
        width: 20%;
        line-height: 0.7rem;
        text-align: center;
        font-size: 0.24rem;
        color: #444444;
        cursor: pointer;
      }
      .last-item-tab{
        width: 19%;
      }
      .active-tab{
        background: #4DA8FF;
        color: #fff;
        font-size: 0.26rem;
        position: relative;
        &::after{
          display: inline-block;
          content: '';
          position: absolute;
          bottom: -0.28rem;
          left: 50%;
          margin-left: -0.07rem;
          width:0;
          height:0; 
          border-width: 0.15rem;
          border-style:solid;
          border-color:#4DA8FF transparent transparent; 
          font-size:0; 
          line-height:0;
        }
      }
     .tab_en{font-size: 0.16rem;
         @media (max-width: 768px){
             width: 50%;
         }
     }
    }
    .line{
      height: 0.01rem;
      background: #e8e8e8;
    }
</style>