<template>
  <div class="nav-box" >
    <div class="nav-box-content-content" ref="navBox" >
       <div class="nav-box-content-box"  :style="[{'width': width}, navStyle ]">
         <span class="nav-box-item" v-for="item in label" :key="item.uuid" :style="+navActiveUuid === +item.modelId ? navActiveStyle : ''" :id="'nav-' + item.modelId" >{{item.name}}</span>
       </div>
        <span v-if="label.length < 1">
          添加锚点
        </span>
    </div>
  </div>
</template>
<script>
import buildBlock from './../mixins/index.js'
export default {
  mixins: [buildBlock],
  props: {
    targetData: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      label: [],
      width: '377px'
    }
  },
  computed: {
    navStyle() {
      return {
        'background': this.targetData.businessData.bgColor || '',
        'color': this.targetData.businessData.textColor || ''
      }
    },
    navActiveStyle() {
      return {
        'background': this.targetData.businessData.bgColorActive || '',
        'color': this.targetData.businessData.textColorActive || ''
      }
    },
    jmData() {
      return this.buildBlock.jmData
    },
    navActiveUuid() {
      return this.buildBlock.navActiveUuid
    }
  },
  watch: {
    jmData: {
      deep: true,
      handler: function(data) {
        this.label = []
        data.forEach(item => {
          if (item.businessData.modelName && item.businessData.modelId) {
            this.label.push({ uuid: item.uuid, name: item.businessData.modelName, modelId: item.businessData.modelId })
          }
        })
        this.getWidth()
      }
    },
    // 监听 滚动锚点active
    navActiveUuid(data) {
      this.scrollNavLeft(data)
    }
  },
  created() {
    this.jmData.forEach(item => {
      if (item.businessData.modelName && item.businessData.modelId) {
        this.label.push({ uuid: item.uuid, name: item.businessData.modelName, modelId: item.businessData.modelId })
      }
    })
    this.getWidth()
  },
  methods: {
    // 计算滚动div的长度且设置label里子元素距离父元素的左侧距离 用来横向滚动到某元素
    getWidth() {
      this.$nextTick(() => {
        const doms = document.getElementsByClassName('nav-box-item')
        if (!doms || doms.length < 1) {
          this.width = '377px'
        } else {
          let width = 0
          for (let key = 0; key < doms.length; key++) {
            width += doms[key].clientWidth
            // 设置label里子元素距离父元素的左侧距离 用来横向滚动到某元素
            const rectwidth = doms[key].getBoundingClientRect().width
            const start = key === 0 ? 0 : doms[key - 1].getAttribute('data-left-end')
            const end = +start + rectwidth
            doms[key].setAttribute('data-left-start', start)
            doms[key].setAttribute('data-left-end', end)
          }
          this.width = width > 373 ? width + 'px' : '377px'
        }
      })
    },
    // 锚点里滚动到某点 uuid 为组件uuid
    scrollNavLeft(uuid) {
      this.$nextTick(() => {
        if (!uuid) return false
        const dom = document.getElementById('nav-' + uuid)
        if (!dom) return false
        const scrollLeft = dom.getAttribute('data-left-start')
        if (+scrollLeft > 375) {
          this.$refs['navBox'].scrollLeft = +scrollLeft
        } else {
          this.$refs['navBox'].scrollLeft = 0
        }
      })
    }
  }
}
</script>
<style lang="scss">
.nav-box{
  width: 100%;
  height: 60px;
  overflow-y: hidden;
  overflow-x: hidden;
}
.nav-box-content-content{
  width: 100%;
  height: 100px;
  overflow-y: hidden;
  overflow-x: auto;
}
.nav-box-content-box{
  width: 375px;
  height: 60px;
  display: block;
  background: #ababab;
}
.nav-box-content-box{
  span{
    height: 60px;
    line-height: 60px;
    display: inline-block;
    padding: 0 15px;
  }
}
/* 滚动样式 **** */
// .nav-box::-webkit-scrollbar { width: 0 !important }
// .nav-box { -ms-overflow-style: none; }
// .nav-box { overflow: -moz-scrollbars-none; }
</style>

