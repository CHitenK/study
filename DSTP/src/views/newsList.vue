<template>
    <div>
        <div class="bg_header" :style="{background: 'url('+ banner +') center / cover no-repeat'}">
            <Header v-on:getHeaderMag="showHeaderMag"></Header>
            <div class="container">
                <div class="row">
                    <p class="title_ch">{{$t('other.news')}}</p>
                    <p class="title_en" v-if="$i18n.locale == 'cn'">NEWS</p>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row" >
                <div class="news_title">
                    <span>{{$t('other.latestNews')}}</span>
                    <el-select v-model="value" :placeholder="$t('footers.optional')" @change="newsList">
                        <el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="w100" v-for="(item, index) in records" :key="index">
            <router-link :to="{name:'newsDetails', query: {id:item.articleId,columnId: columnId,detailImg: banner,title: '' + $t('menu.news')}}">
                <div class="container">
                    <div class="row">
                        <div class="news_box">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12 ">
                                    <div class="row">
                                        <div class="col-lg-4 col-md-5 col-sm-6">
                                            <div class="news_img">
                                                <img :src="item.img" alt="">
                                            </div>
                                        </div>
                                        <div class="col-lg-8 col-md-7 col-sm-6">
                                            <p class="info_title">{{item.title}}</p>
                                            <p class="info_time">{{item.pubTime}}</p>
                                            <p class="info_con">{{item.description}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="container">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="pageSize"
                    :pager-count="5"
                    layout="prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from "@/components/headerfooter/headers";
import Footer from "@/components/headerfooter/footers";
import { Api } from '@/assets/js/api'
export default {
    components: { Header, Footer },
    data() {
        return {
            records: [],
            pageSize: 10, // 一页几条数据
            pageIndex: 1, // 当前页
            total: 0,
            value: '',
            years: [],
            banner: ''
        };
    },
    methods:{
        showHeaderMag(value){
            let page = value.find(e => e.columnId === 625 || e.columnId === 930)
            this.years = page.years
            this.value = page.years[0]
            this.columnId = page.columnId
            this.banner = page.img
            this.newsList()
        },
      newsList(){
          Api.newsList({
              columnId: this.$route.query.columnId,
              pageSize: this.pageSize,
              pageIndex: this.pageIndex,
              year: this.value,
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
    handleCurrentChange(val){
        this.pageIndex = val
        this.newsList()
    },
    },
    mounted(){

    }
};
</script>
<style lang="less" scoped>
    .bg_header{
        width: 100%;
        height: 3.7rem;
    }
    .title_ch{
        .media-font(0.54rem);
        color: #fff;
        margin-top: 1.5rem;
    }
    .title_en{
        .media-font(0.3rem);
        color: rgba(255,255,255,0.26);
    }
    .news_title{
        font-size: 20px;
        border-bottom: 1px solid #e8e8e8;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        padding: 0.1rem 0;font-family: regular;
    }
    .news_img{
        width: 340px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            .animates();
            &:hover{
                .scale(1.05);
            }
            max-width: 100%;
            max-height: 100%;
            @media (max-width: 768px){
                width: 100%;
            }
        }
    }
    .info_title{
        font-size: 0.2rem;
        margin: 10px 0;font-weight: bold;
    }
    .info_time{
        color: #6a6a6a;
    }
    .info_con{
        line-height: 30px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        margin-top: 10px;
    }
    .news_box{
        padding: 10px 0;
        border-bottom: 1px solid #e8e8e8;
    }
    .w100{
        width: 100%;
        &:hover{
            background: #f5f7fb;
        }
    }
    .el-pagination{
        text-align: center;
        padding: 20px 0;
    }
    .VuePagination__count{
        display: none;
    }
    .el-input__inner{
        border: none;
    }
    @media (max-width: 768px){
        .register{width: 100%;}
        .news_box_pc{display: none;}
        .news_box_mobile{display: block;}
        .news_img{width: 100%;padding: 0 0.2rem;}
        .news_title{padding: 0 10px;}
        .bg_header{height: 73px;background-size: 100%}
        .title_ch{margin-top: 10px;font-size: 20px;margin-left: 10px;}
        .title_en{font-size: 20px;margin-left: 10px;}
        .info_title,.info_time,.info_con{padding: 0 0.2rem;}
    }
</style>