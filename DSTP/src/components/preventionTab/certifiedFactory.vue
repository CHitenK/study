<template>
  <div class="certifiedFactory_box">
    <div class="container">
      <div class="nav_box">
        <a :href="'/confrontChannel?columnId='+740" v-if="columnId != 625 && columnId != 930">{{$t('menu.antiEpidemic')}} ></a>
        <a :href="'/confrontChannel?columnId='+740" v-if="columnId != 625 && columnId != 930">{{$t('other.reliableSuppliers')}} ></a>
        <a href="javascript:;">{{$t('other.factories')}}</a>
      </div>
      <div class="row">
        <div class="col-md-3 col-xs-6 col-sm-4" v-for="item in records"  @click="goLink(item.articleId)">
          <div class="row">
            <div class="factory_img">
              <img :src="item.img" alt="">
            </div>
            <p class="factory_description">{{item.description}}</p>
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
      columnId: {
          type: Number,
          default: 824,
      }
  },
  data () {
    return {
        records: [],
        pageIndex: 1,
        pageSize: 8,
        total: 0,
        detailImg: ''
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
                  this.detailImg =  data.data.img
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
  .certifiedFactory_box{
    padding-top: 0.2rem;
    .nav_box{
      .media-font(0.24rem,0.26rem,0.3rem);
      line-height: 0.4rem;
      font-weight: bold;margin: 0.1rem 0;
      a{
        padding-right: 5px;
        cursor: pointer;
        color: rgba(0,98,254);
        &:hover{
          color: rgba(0,98,254, .7);
        }
      }
    }
  }
  .factory_img{
    width: 2.2rem;height: 1.4rem;margin: 0 auto;cursor: pointer;
    img{width: 100%;height: 90%;}
  }
.factory_description{
  width: 2.2rem;
  margin: 0 auto 0.1rem auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  cursor: pointer;
}
  .el-pagination{
    text-align: center;
    padding: 30px 0;
  }
  @media (max-width: 768px){
    .factory_img{width: 4.2rem;height: 2.6rem;}
    .factory_description{ width: 4.2rem;}
  }
</style>