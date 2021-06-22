<script>
import buildBlock from './../mixins/index.js'
import jmBanner from './../mobileComponents/jm-banner.vue'
import jmNav from './../mobileComponents/jm-nav.vue'
import jmSearch from './../mobileComponents/jm-search.vue'
import jmCoupon from './../mobileComponents/jm-coupon.vue'
import jmSales from './../mobileComponents/jm-sales.vue'
import jmProducts from './../mobileComponents/jm-products.vue'
import jmShowcase from './../mobileComponents/jm-showcase.vue'
import jmTimingSwitch from './../mobileComponents/jm-timingSwitch.vue'
export default {
  components: {
    jmBanner,
    jmNav,
    jmSearch,
    jmCoupon,
    jmSales,
    jmProducts,
    jmShowcase,
    jmTimingSwitch
  },
  mixins: [buildBlock],
  props: {
    scrollTop: {
      type: Number,
      default: function() {
        return 0
      }
    }
  },
  data() {
    return {
      dom: null
    }
  },
  computed: {
    JMDATA() {
      return this.buildBlock.jmData
    },
    scrollTopOpitions() {
      return this.buildBlock.scrollTopOptions
    },
    scrollFoot() {
      return this.buildBlock.scrollFoot
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
          this.$refs.scrollView.scrollTop = this.$refs.scrollView.scrollHeight
        })
      }
    },
    scrollFoot(data) {
      this.$nextTick(() => {
        this.scroolTo(data)
      })
    }
  },
  mounted() {
  },
  methods: {
    mobileScroll() {
      const scrollTop = this.$refs.scrollView.scrollTop
      // 当锚点组件与搜索组件同时设置吸顶时 优先搜索组件 flage => true
      const flage = this.buildBlock.jmData.some(item => item.name === 'jm-search' && item.location === 0)
      if (flage) { //  优先搜索组件
        this.fixedTop(scrollTop, 'jm-search')
      } else { // 锚点组件
        this.fixedTop(scrollTop, 'jm-nav')
      }
      // 设置锚点active
      Object.keys(this.scrollOptions).forEach(item => {
        const height = 160 // 滚动窗口的高度
        const tData = this.scrollOptions[item]
        if (tData.start < (scrollTop + height) && (scrollTop + height) < tData.end && tData.modelName) {
          this.$store.dispatch(this.toolType + '/SET_NAV_ACTICE_UUID', item)
        }
      })
    },
    // 设置滚动到某一位置
    scroolTo(uuid) {
      if (!this.scrollOptions[uuid]) return false
      this.$nextTick(() => {
        this.$refs.scrollView.scrollTop = this.scrollOptions[uuid].start
      })
    },
    // 设置吸顶
    fixedTop(scrollTop, name = 'jm-search') {
      let uuid = ''
      let location = 1 // 0 为设置了固定位置
      this.buildBlock.jmData.forEach(item => {
        if (item.name === name) {
          uuid = item.uuid
          location = item.location
        }
      })
      if (uuid === '') {
        if (this.dom) this.dom.style = ''
        return false
      }
      this.dom = document.getElementById(uuid)
      if (this.dom && this.scrollOptions[uuid].start - 100 < scrollTop && location === 0) {
        this.dom.style = 'position:absolute;top:100px; width: ' + 373 + 'px; z-index: 100;'
      } else {
        this.dom.style = ''
      }
    }
  },
  render: function(h) {
    let modelName = ''
    return h('div', {
      style: {
        backgroundColor: this.buildBlock.titleData.coverColor,
        backgroundImage: 'url("' + this.buildBlock.titleData.coverImageUrl + '")'
      },
      class: {
        'jm-demo scrollbar': true,
        more: false,
        'is-bgImg': !!this.buildBlock.titleData.coverImageUrl
      },
      attrs: {
        id: 'phone-views'
      },
      on: {
        scroll: this.mobileScroll
      },
      ref: 'scrollView'
    }, this.JMDATA.map((item) => {
      if (item.businessData.modelName) {
        modelName = item.businessData.modelName
      }
      return h(item.name, {
        class: {
          'jm-compenent': true,
          'active': item.uuid === +this.activeUuid
        },
        props: { targetData: item, isShowMuch: !!this.buildBlock.titleData.isShowMuch },
        attrs: {
          id: item.uuid,
          'data-uuid': item.uuid,
          'data-modelName': modelName || '',
          'data-modelId': item.businessData.modelId || ''
        }
      })
    }))
  }
}
</script>
<style lang="scss" scoped>

.floor-box{
  width: 100px;
  height: 500px;
  border: solid 1px #eeeeee;
  .title{
    width: 100%;
    height: 36px;
    background: #eaeaea;
  }
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
 .active{
   box-sizing: border-box;
   border: solid 3px red;
 }
</style>

