<template>
  <div class="view-page">
      <!-- 模拟手机窗口 -->
      <div class="views-box-content" >
        <div :class="{'head-box': true, 'head-box-active' : !activeUuid}" :style="{'backgroundColor': buildBlock.titleData.titleBgColor }" >
          {{buildBlock.titleData.title}}
        </div>
        <!-- 模拟手机窗口内容 -->
        <views-content :scrollTop="scrollTop" ></views-content>
        <!-- 模拟手机窗口内容 -->
        <!-- 浮动按钮 -->
        <jm-float :titleData="buildBlock.titleData"></jm-float>
        <!-- 浮动按钮 end-->
      </div>
      <!-- 模拟手机窗口 end-->
      <!-- 表单场窗口 -->
      <div class="form-box" v-loading="loading" >
        <handle-view></handle-view>
        <form-pages></form-pages>
      </div>
      <!-- 表单场窗口 end-->
      <!-- 楼层 -->
      <div class="floor-box">
        <span class="title">楼层</span>
        <a v-for="(item, index) in buildBlock.jmData" :key="index" @click="handleClick(item)" :class="{'ver-lev-active': (+activeUuid) === item.uuid }">{{index + 1}}. {{item.label}}</a>
      </div>
      <!-- 楼层 end -->
  </div>
</template>
<script>
// import { Button, Style } from 'cube-ui'
import viewsContent from './viewsContent.vue'
import handleView from './handleView.vue'
import formPages from './formPages.vue'
import buildBlock from '@/views/pageManage/mixins/index.js'
import jmFloat from '@/views/pageManage/mobileComponents/jm-float.vue'
let timer = null
export default {
  components: {
  // CubeButton: Button,
    viewsContent,
    handleView,
    formPages,
    jmFloat
  },
  mixins: [buildBlock],
  data() {
    return {
      offSetTops: {},
      loading: false,
      scrollTop: 0
    }
  },
  computed: {
    jmData() {
      return this.buildBlock.jmData
    }
  },
  watch: {
    jmData: {
      deep: true,
      handler: function() {
        this.$nextTick(() => {
          this.getOffSetTops()
          console.log()
        })
      }
    }
  },
  beforeDestroy() {
    clearInterval(timer)
    timer = null
  },
  destroyed() {
    clearInterval(timer)
    timer = null
  },
  mounted() {
    this.$nextTick(() => {
      this.getOffSetTops()
    })
    // 定时器， 监听滚动div高度变化，如果3次其高度没变化，则认为其已经加载完成
    let num = -5
    let times = 0
    const dom = document.getElementById('phone-views')
    timer = setInterval(() => {
      if (!dom.clientHeight) {
        clearInterval(timer)
        timer = null
      }
      if (dom.clientHeight === num && times > 3) {
        this.getOffSetTops()
        clearInterval(timer)
        timer = null
      } else {
        num = dom.clientHeight
        times++
      }
    }, 500)
  },
  methods: {
    // 获取手机虚拟框里dom的位置
    getOffSetTops() {
      const doms = document.getElementsByClassName('jm-compenent')
      const nav = {}
      let modelId = null
      this.offSetTops = {}
      if (doms.length < 1) return false
      for (let key = 0; key < doms.length; key++) {
        const objKey = doms[key].getAttribute('data-uuid')
        const modelName = doms[key].getAttribute('data-modelName') ? doms[key].getAttribute('data-modelName') : null
        modelId = doms[key].getAttribute('data-modelId') ? doms[key].getAttribute('data-modelId') : modelId
        this.offSetTops[objKey] = {
          start: doms[key].offsetTop,
          end: key === doms.length - 1 ? doms[key].offsetTop + doms[key].clientHeight : doms[key + 1].offsetTop - 1,
          modelName,
          modelId
        }
        // 锚点数据
        if (!nav[modelId] && modelId) {
          nav[modelId] = { start: doms[key].offsetTop, modelName, modelId }
        } else if (modelId) {
          nav[modelId].end = this.offSetTops[objKey].end
        }
      }
      this.$store.dispatch(this.toolType + '/SET_SCROLL_OPITIOS', { ...this.offSetTops, ...nav })
    },
    // 点击楼层
    handleClick(data) {
      const { name, uuid } = data
      if (!name) return false
      this.$store.dispatch(this.toolType + '/SET_ACTIVE_UUID', uuid)
      this.loading = true
      // 保证页面数据刷新
      this.$store.dispatch(this.toolType + '/SET_ACTIVECOMPONET', { name: '', uuid })
      const _timer = setTimeout(() => {
        this.$store.dispatch(this.toolType + '/SET_ACTIVECOMPONET', { name, uuid })
        this.loading = false
        clearInterval(_timer)
      }, 500)
      this.scrollTop = uuid
    }
  }
}
</script>

<style lang="scss">
.view-page{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}
.views-box{
  height: 667px ;
  width: 100%;
  overflow: auto;

}
.box{
  width: 100%;
  height: 300px;
}
.content-head{
  width: 100%;
  height: 80px;
  background: red;
}
.ver-lev-active{
  color: #5C9EFF;
  transform: scaleY(1.4);
}
/* 滚动样式 **** */
.scrollbar::-webkit-scrollbar {
  width: 3px;
}
.scrollbar::-webkit-scrollbar-track {
  border-radius: 1px;
  background-color: #cccccc;
}
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #eaeaea;
}
.scrollbar::-webkit-scrollbar-button{
   height: 10px;
   background-color: #eeeeee;
}
/* 滚动样式 end**** */
  .views-box-content {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 472px;
      height: 830px;
      background: url(../../../assets/mobileView/iphoneX.38c8778.png) no-repeat center 0;
      background-size: 100%;
      position: relative;
  }
  .head-box{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 55px;
    font-size: 12px;
    width: 375px;
    height: 45px;
    background-color: #edf0f4;
    box-shadow: 0 0 1px 0 #ccc;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 5;
    color: #fff;
  }
  .box {
    width: 100%;
    height: 300px;
  }

  .content-head {
    width: 100%;
    height: 80px;
  }

  .floor-box {
    width: 140px;
    max-height: calc(100vh - 280px);
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 5px 0px rgba(188,188,229,0.24);
    /*margin-left: 10px;*/
    box-sizing: border-box;
    padding-left: 20px;
      margin-top: 50px;
    overflow-y: auto;
    span.title {
      display: flex;
      align-items: center;
      width: 100%;
      height: 36px;
      font-size: 16px;
      font-weight: 800;
      background: #fff;
    }
    a {
     display:  flex;
     align-items: center;
     height: 40px;
    }
    a.active {
      color: #84BAFF;
    }
  }
  .form-box{
    width: calc(100% - 505px);
    min-width: 300px;
    margin: 0 10px;
  }

</style>

