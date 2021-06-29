<template>
  <div class="secondary_box">
    <div class="w100" v-for="item in records" :key="item.articleId" @click="goLink(item.articleId)" >
      <div class="container container-active">
        <div class="row">
          <div class="news_box">
              <div class="col-lg-12 col-md-12 col-sm-12 ">
                <div class="row">
                  <div class="col-lg-4 col-md-5 col-sm-6">
                    <div class="row">
                      <div class="news_img news_img-ot">
                        <img :src="item.img" alt="">
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-8 col-md-7 col-sm-6">
                    <div class="row">
                      <p class="info_title_new">{{item.title}}</p>
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
    </div>
  </div>
</template>
<script>
import { WOW } from 'wowjs'
import { setTimeout } from 'timers'
import { Api } from '@/assets/js/api'
export default {
  props: {
      detailImg: '',
      columnId: ''
  },
  data () {
    return {
        records: [],
        pageIndex: 1,
        pageSize: 10,
        total: 0
    }
  },
  methods: {
      handleCurrentChange(val){
          this.pageIndex = val
          this.legalizeList()
      },
      legalizeList(){
          Api.legalize({
              pageIndex: this.pageIndex,
              pageSize: this.pageSize,
          }).then(res =>{
              let data = res[1]
              if(data && data.result === 1){
                  this.records = data.data.records
                  this.total = data.data.total
              }else{
                  console.log('请求失败')
              }
          })
      },
      goLink(id) {
          this.$router.push({
              path: '/newsDetails?id=' + id + '&title=' + this.$t('other.dependableSuppliers') + '&detailImg='+ this.detailImg + '&columnId=' + this.columnId
          })
      },
  },
  mounted(){
   this.legalizeList()
  },
}
</script>
<style lang="less" scoped>
  .secondary_box{padding-bottom: 1.2rem;}
  .news_box{
    padding: 10px 0;
    border-bottom: 1px solid #e8e8e8;
  }
  .w100{
    width: 100%;
    cursor: pointer;
    &:hover{
      background: #f5f7fb;
    }
  }
  .news_img{
    width: 340px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e8e8e8;
    @media (max-width: 768px){
      width: 100%;
    }
    img{
      .animates();
      &:hover{
        .scale(1.05);
      }
      max-width: 100%;
      max-height: 100%;
    }
  }
  .news_img-ot{
    background: 0;
  }
  .el-pagination{
    text-align: center;
    padding: 20px 0;
  }
  .info_title_new{
    .media-font(0.20rem);
    .media-line(0.3rem);
    .marginTb(0.2rem);
    font-weight: bold;
  }
  @media (max-width: 768px){
    .info_title_new,.info_con_new{.padding(0,0.2rem);}
  }
</style>