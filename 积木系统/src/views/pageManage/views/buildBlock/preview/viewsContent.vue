<script>
// import buildBlock from './../mixins/index.js'
import jmBanner from './../../../mobileComponents/jm-banner.vue'
import jmNav from './../../../mobileComponents/jm-nav-pre.vue'
import jmSearch from './../../../mobileComponents/jm-search.vue'
import jmCoupon from './../../../mobileComponents/jm-coupon.vue'
import jmSales from './../../../mobileComponents/jm-sales.vue'
import jmProducts from './../../../mobileComponents/jm-products.vue'
import jmShowcase from './../../../mobileComponents/jm-showcase.vue'
let timer = null
export default {
  components: {
    jmBanner,
    jmNav,
    jmSearch,
    jmCoupon,
    jmSales,
    jmProducts,
    jmShowcase
  },
  // mixins: [buildBlock],
  props: {
    scrollTop: {
      type: Number,
      default: function() {
        return 0
      }
    },
    preData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      offSetTops: {}, // 组件渲染后位置数据 { statr: 1, end: 120, modelName: '' }
      navActiveUuid: 0 // 滚动时，导航navActiveUuid
    }
  },
  computed: {
    JMDATA() {
      return this.preData.pages ? this.preData.pages.content : []
    },
    scrollTopOpitions() {
      return {} // this.buildBlock.scrollTopOptions
    },
    titleData() {
      return this.preData || {}
    }
  },
  watch: {
    scrollTop(data) {
      this.scroolTo(+data)
    },
    scrollTopOpitions: {
      deep: true,
      handler: function(data) {
        if (!data.uuid) return false
        // 滚动到底部
        this.$nextTick(() => {
          this.getOffSetTops()
          // this.$refs.scrollView.scrollTop = this.$refs.scrollView.scrollHeight
        })
      }
    },
    preData: {
      deep: true,
      handler: function(data) {
        // 滚动到底部
        this.$nextTick(() => {
          this.$refs.scrollView.scrollTop = this.$refs.scrollView.scrollHeight
        })
      }
    }
  },
  created() {
    console.log(this.titleData, 12)
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
    // 定时器， 监听滚动div高度变化，如果3次其高度没变化，则认为其已经加载完成
    let num = -5
    let times = 0
    timer = setInterval(() => {
      if (!this.$refs.scrollView.clientHeight) {
        clearInterval(timer)
        timer = null
      }
      if (this.$refs.scrollView.clientHeight === num && times > 3) {
        this.getOffSetTops()
        clearInterval(timer)
        timer = null
      } else {
        num = this.$refs.scrollView.clientHeight
        times++
      }
    }, 500)
  },
  methods: {
    mobileScroll() {
      const scrollTop = this.$refs.scrollView.scrollTop
      // 当锚点组件与搜索组件同时设置吸顶时 优先搜索组件 flage => true
      const flage = this.JMDATA.some(item => item.name === 'jm-search' && item.location === 0)
      if (flage) { //  优先搜索组件
        this.fixedTop(scrollTop, 'jm-search')
      } else { // 锚点组件
        this.fixedTop(scrollTop, 'jm-nav')
      }
      // 设置锚点active
      Object.keys(this.offSetTops).forEach(item => {
        const height = 160 // 滚动窗口的高度
        const tData = this.offSetTops[item]
        if (tData.start < scrollTop + height && scrollTop + height < tData.end && tData.modelName) {
          this.navActiveUuid = tData.modelId
        }
      })
    },
    // 设置滚动到某一位置
    scroolTo(uuid) {
      // if (!this.scrollOptions[uuid]) return false
      // this.$refs.scrollView.scrollTop = this.scrollOptions[uuid].start
    },
    // 设置吸顶
    fixedTop(scrollTop, name = 'jm-search') {
      let uuid = ''
      this.JMDATA.forEach(item => {
        if (item.name === name && item.location === 0) {
          uuid = item.uuid
        }
      })
      if (uuid === '') return false
      const dom = document.getElementById('pre-' + uuid)
      if (dom && this.offSetTops[uuid].start - 100 < scrollTop) {
        dom.style = 'position:absolute;top:100px; width: ' + 373 + 'px; z-index: 100;'
      } else {
        dom.style = ''
      }
    },
    // 获取手机虚拟框里dom的位置
    getOffSetTops() {
      const doms = document.getElementsByClassName('jm-compenent-pre')
      if (doms.length < 1) return false
      const nav = {}
      let modelId = null
      this.offSetTops = {}
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
          nav[modelId] = { start: doms[key].offsetTop, modelName, modelId, end: this.offSetTops[objKey].end }
        } else if (modelId) {
          nav[modelId].end = this.offSetTops[objKey].end
        }
      }
      this.offSetTops = { ... this.offSetTops, ...nav }
    }
  },
  render: function(h) {
    let modelName = ''
    return h('div', {
      style: {
        backgroundColor: this.titleData.coverColor,
        backgroundImage: 'url("' + this.titleData.coverImageUrl + '")'
      },
      class: {
        'jm-demo scrollbar': true,
        more: false,
        'is-bgImg': !!this.titleData.coverImageUrl
      },
      on: {
        scroll: this.mobileScroll
      },
      ref: 'scrollView'
    }, this.JMDATA.map((item) => {
      modelName = item.businessData.modelName || modelName
      return h(item.name, {
        class: { 'jm-compenent-pre': true },
        props: {
          targetData: item,
          navActiveUuid: item.name === 'jm-nav' ? this.navActiveUuid : null,
          jmData: item.name === 'jm-nav' ? this.JMDATA : [],
          isShowMuch: this.titleData.isShowMuch
        },
        attrs: {
          id: 'pre-' + item.uuid,
          'data-uuid': item.uuid,
          'data-modelName': modelName,
          'data-modelId': item.businessData.modelId || ''
        }
      })
    }))
  }
}
</script>

<style lang="scss" scoped>
.view-box-pre{
  width: 375px;
  height: 675px;
  border: solid 1px #eaeaea;
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
  .views-box-content .jm-demo {
    width: 375px;
    height: 680px;
    border: solid 1px #eaeaea;
    overflow-x: hidden;
    overflow: auto;
  }
  .floor-box {
      width: 100px;
      height: 500px;
      border: solid 1px #eeeeee;

      .title {
          width: 100%;
          height: 36px;
          background: #eaeaea;
      }
  }
 .is-bgImg{
   background-repeat: no-repeat;
   background-position: 0 0;
   background-size: 100%;
 }
</style>

