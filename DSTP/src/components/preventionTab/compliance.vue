<template>
  <div class="certifiedFactory_box">
    <div class="container">
      <div class="nav_box">
        <a
          :href="'/confrontChannel?columnId='+740"
          v-if="columnId != 625 && columnId != 930"
        >{{$t('menu.antiEpidemic')}} ></a>
        <a 
          :href="'/confrontChannel?columnId='+740"
          v-if="columnId != 625 && columnId != 930">{{$t('other.transport')}} ></a>
        <a href="javascript:;">{{name}}</a>
      </div>
          <div class="main-info" :style="{'background': 'url('+img1+') center / cover no-repeat'} ">
            <ul class="clearfix">
              <template v-for="(item, index) in lightObj" >
                <li @click="goLink(item)" v-if="index == 0" :key="index" class="col-xs-12 col-md-12 col-sm-12 col-xs-12 header">
                  <div class="header-con">
                    <h3>{{item.name}}</h3>
                    <div class="message" v-html="item.html"></div>
                    <x-router-link class="register" v-if="item.english && item.english != 'null'" :to="item.english">{{$t('other.applyNow')}}</x-router-link>
                  </div>
                </li>
                <li @click="goLink(item)" v-else :key="index" :class="colClass" class="footer" :style="{'background':index % 2 === 0 ? '#0D35AE':'#0C29A8'}">
                  <div class="footer-con">
                    <img :src="item.img" alt="">
                    <div><span class="footer-title">{{item.name}}</span></div>
                    <!-- <div class="text" v-html="item.html"></div> -->
                  </div>
                </li>
              </template>
            </ul>
          </div>
      <div class="row"></div>
    </div>
  </div>
</template>
<script>
import { WOW } from "wowjs";
import { Api } from "@/assets/js/api_kz";
export default {
  props: {
    columnId: {
      type: Number,
      default: 1201,
    }
  },
  data() {
    return {
      name: '',
      img1: '',
      lightObj: null,
      colClass: ''
    }
  },
  created () {

  },
  mounted() {
    this.loadPage()
  },
  updated() {
    $('.text').find('p').css({'white-space': 'nowrap','margin-bottom':'0.1rem'});
  },
  methods: {
    loadPage() {
      let that = this
      Api.confrontLoad({ columnId: 740 }).then(res => {
        let data = res[1];
        if (data && data.result === 1) {
          data = data.data[1].columnList[1].columnList.filter(item => {
            return item.columnId == that.columnId
          })
          if(data[0]){
            that.name = data[0].name
            that.img1 = data[0].img1
            that.lightObj = data[0].columnList

            let col = 12 / (that.lightObj.length -1)
            that.colClass = `col-lg-${col} col-md-${col} col-sm-${12} col-xs-${12}`
          }
        } else {
          this.$message.error("请求失败,请刷新页面重试");
        }
      });
    },
    // 跳转
    goLink(item) {
      this.$router.push({
        path: item.english
      })
    },
  }
};
</script>
<style lang="less" scoped>
.main-info{
  // height: 6.02rem;
  margin-bottom: 12px;
  ul{
    margin-bottom: 12px;
    .header-con,.footer-con{
      position: absolute;
      top: 50%;
      left: 50%;
      .slate(-50%,-50%);
      text-align: center;
      color: #fff;
    }
    .header{
      height: 3.58rem;
      .header-con{
        h3{
          font-size: .3rem;
          font-weight: bold;
          margin-bottom: .1rem;
        }
        .message{
          font-size: .26rem;
          margin-bottom: .10rem;
        }
        .register{
          display: inline-block;
          width: 1.2rem;
          height: .38rem;
          line-height: .38rem;
          color: #0d2aa8;
          font-size: .24rem;
          border-radius: .18rem;
          text-align: center;
          background: #fff;
        }
      }
    }
    .footer{
      height: 2.44rem;
      .footer-con{
        .footer-title{
          display: inline-block;
          margin: .06rem 0 .2rem;
          padding: 0 .1rem 0.05rem;
          border-bottom: 2px solid #fff;
        }
        .text{
          text-align: left;
          // width: 4rem;
          // line-height: .28rem;
        }
        img{
          width: .6rem;
          height: .6rem;
        }
      }
    }
  }
}
.certifiedFactory_box {
  padding-top: 0.2rem;
  .nav_box {
    .media-font(0.24rem, 0.26rem, 0.3rem);
    line-height: 0.4rem;
    font-weight: bold;
    margin: 0.1rem 0;
    a {
      padding-right: 5px;
      cursor: pointer;
      color: rgba(0, 98, 254);
      &:hover {
        color: rgba(0, 98, 254, 0.7);
      }
    }
  }
}
.factory_img {
  width: 2.2rem;
  height: 1.4rem;
  margin: 0 auto;
  cursor: pointer;
  img {
    width: 100%;
  }
}
.factory_description {
  width: 2.2rem;
  margin: 0 auto 0.1rem auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  cursor: pointer;
}
.el-pagination {
  text-align: center;
  padding: 30px 0;
}
@media (max-width: 768px) {
  .main-info{
    ul{
      .footer{
        height: 3rem;
      }
    }
  }
}
</style>
