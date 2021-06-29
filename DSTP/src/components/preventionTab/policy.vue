<template>
    <div class="policy_box">
        <div class="container bg_color">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                        <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <div class="row">
                                <div class="policy_tab" :style="{background: 'url('+ policyList.img +') center / 100% 100% no-repeat'}">
                                    <ul>
                                        <li v-for="(item,index) in policyList.columnList" :key="index" :class="{active: tabIndex == index}" @click="switchTab(index,item.columnId)">{{item.title}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <div class="row">
                                <div class="records_box">
                                    <div class="records_item" v-for="(item,index) in records" :key="index">
                                        <router-link :to="{name:'newsDetails', query: {id: item.articleId,title: ''+$t('other.policyDynamics'), detailImg: detailImg,columnId: $i18n.locale == 'en'? 1140 : 827}}">
                                            <p class="records_title">{{item.title}}</p>
                                            <p class="records_pubTime">{{item.pubTime}}</p>
                                            <div class="records_description">{{item.description}}</div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-pagination
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                :current-page = "pageIndex"
                :pager-count="5"
                layout="prev, pager, next"
                :total="total"
                background>
        </el-pagination>
    </div>
</template>
<script>
import { Api } from '@/assets/js/api'
export default {
    components: { },
    data() {
        return {
          tabIndex: 0,
          pageSize:3,
          pageIndex: 1,
          columnList: '',
          records: [],
          total: 0,
          detailImg: ''
        };
    },
    props:{ policyList: '',boxImg:'', boxImg1:'', 
    title:{ 
      type: String,
      default: ''
    }},//底图
    methods:{
        getNewsList(){
            Api.newsList({
                columnId: this.columnId,
                pageSize: this.pageSize,
                pageIndex: this.pageIndex,
                year: 0,
            }).then(res => {
                let data = res[1]
                if(data && data.result === 1){
                    this.records = data.data.records
                    this.total = data.data.total
                }else{
                    console.log('请求失败')
                }
            })
        },
        switchTab(index, columnId){
            this.tabIndex = index
            this.columnId = columnId
            this.pageIndex = 1
            this.getNewsList()
        },
        handleCurrentChange(val){
            this.pageIndex = val
            this.getNewsList()
        },
    },
    mounted(){
        this.columnId = this.policyList.columnList[0].columnId
        this.detailImg = this.policyList.img1
        this.getNewsList()
    }
}
</script>

<style lang="less" scoped>
  .policy_box{margin: 0.6rem 0;}
  .bg_color{background: #fff;}
  .policy_tab{
    padding: 0.5rem 0 0 0.4rem;height: 5rem;
      @media (max-width: 768px){
          height: 8rem;
      }
    ul{
      li{
        color: #fff;font-size: 0.18rem;line-height: 0.45rem;list-style: disc;position: relative;cursor: pointer;
        @media (max-width: 768px){
          margin-left: 0.2rem;
        }
      }
      .active{
        font-size: 0.22rem;list-style: none;padding-left: 0.2rem;
        @media (max-width: 768px){
          margin-left: 0;
        }
        &:after{
          content: "";
          position: absolute;
          width: 0.25rem;
          height: 2px;
          background: #3fe1d3;top: 50%;left: -0.15rem;
        }
      }
    }
  }
  .records_box{
    padding: 0.2rem;
    .records_item{
      border-bottom: 1px solid #e8e8e8;padding: 0.1rem 0;
      .records_title{
          font-size: 0.2rem;line-height: 0.4rem;font-weight: bold;
          @media (max-width: 768px){
              font-size: 0.3rem;
          }
      }
      .records_pubTime{color: #6a6a6a;line-height: 0.3rem;font-size: 0.12rem;}
      .records_description{color: #6a6a6a;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;}
    }

  }
  .el-pagination{text-align: center;margin: 0.2rem 0;}
</style>