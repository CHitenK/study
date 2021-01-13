<template>
  <div class="right-tag-box">
    <div class="item-bx" ref="tagbx">
      <div class="item-tag-bx" :style="{ 'width': tagBxWidth }" ref="all-tags">
        <div v-for="(item, index) in tags" :key="index" :class="activePath === item.path ? 'item-tag item-tag-act' : 'item-tag'" @click.self="linkTo(item)" :id="item.path">
          <!-- customTitle 自定定义的tag 名称  -->
          {{ item.customTitle || item.meta.title }}
          <i class="el-icon-circle-close" v-if="!item.meta.affix" @click.self="close(index)"></i>
        </div>
      </div>
    </div>
    <div class="tool-bx">
      <span class="tool-bx-dian">...</span>
      <div class="tool-list">
        <div class="tool-list-item b-n" @click="closeAll">
          关闭全部
        </div>
        <div class="tool-list-item" @click="closeOthers">
          关闭其他区
        </div>
        <div class="tool-list-item-ot">
          切换标签
          <div class="link-list">
            <span v-for="(item, index) in tags" :key="index" :class="activePath === item.path ? 'link-list-item link-list-item-atc' : 'link-list-item'" @click.prevent="linkTo(item)" >
               {{ item.customTitle || item.meta.title }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let _timer = null
let _timer1 = null
import { throttle, debounce } from '@/utils/tool'
export default {
  data () {
    return {
      baseWid: 0
    }
  },
  computed: {
    tags () { // tag栏数据
      return this.$store.getters.tagsList
    },
    activePath () { // 当前路由
      return this.$route.path
    },
    tagBxWidth () { // tab栏宽度
      return this.$store.getters.tagBxWidth
    }
  },
  watch: {
    $route (to, from) {
      const flage = this.tags.some(item => item.path === to.path)
      if (!flage) {
        this.$store.dispatch('tags/AC_ADD_TAGS_LIST', to)
      }
      // 设置滚动距离
      this.$nextTick(() => {
        this.setScrollLeft()
      })
    },
    tags (data) {
      const len = data.length < 5 ? 5 : data.length
      // 先粗略设置tag栏宽度
      this.$store.dispatch('tags/AC_UPDATE_STATE', { key: 'tagBxWidth', value: `calc(200px * ${len})` })
      clearTimeout(_timer) // 用于快速切换点击时，清除上次延时器
      // 延时器 精确计算tag栏宽度
      _timer = setTimeout(() => {
        this.$nextTick(() => {
          const doms = document.getElementsByClassName('item-tag') // offsietWidth
          if (doms && doms.length > 0) {
            let wd = 0
            for (let i = 0; i < doms.length; i++) {
              wd = wd + doms[i].offsetWidth + 6
            }
            this.$store.dispatch('tags/AC_UPDATE_STATE', { key: 'tagBxWidth', value: wd + 'px' })
          }
        })
      }, 300)
    }
  },
  mounted () {
    this.baseWid = this.$refs.tagbx.clientWidth + 200
  },
  methods: {
    linkTo (data) {
      if (data.path === this.activePath) return false
      this.$router.push(data)
    },
    // 关闭单个
    close (index) {
      const tags = this.tags
      if (tags[index].path === this.activePath) {
        const len = tags.length
        this.linkTo(tags[len - 2])
      }
      tags.splice(index, 1)
      this.$store.dispatch('tags/AC_UPDATE_STATE', { key: 'tagsList', value: tags })
    },
    // 关闭全部
    closeAll () {
      let target = []
      this.tags.map(item => {
        if (item.meta.affix) {
          target.push(item)
        }
      })
      this.$store.dispatch('tags/AC_UPDATE_STATE', { key: 'tagsList', value: target })
      this.linkTo(target[0])
    },
    // 关闭其他
    closeOthers () {
      let target = []
      this.tags.map(item => {
        if (item.path === this.activePath || item.meta.affix) {
          target.push(item)
        }
      })
      this.$store.dispatch('tags/AC_UPDATE_STATE', { key: 'tagsList', value: target })
    },
    // 设置tab栏滚动距离
    setScrollLeft: debounce(function() {
      const dom = document.getElementById(this.activePath) // offsietWidth
      if (dom) {
        console.log(dom.offsetLeft, this.baseWid)
        if (dom.offsetLeft + 20 >= this.baseWid) {
          this.$refs.tagbx.scrollLeft = this.$refs['all-tags'].clientWidth
        } else {
          this.$refs.tagbx.scrollLeft = 0
        }
      }
    }, 200)
  },
  destroyed() {
    clearTimeout(_timer)
    clearInterval(_timer1)
    _timer = null
    _timer1 = null
  }
}
</script>
<style lang="scss" scoped >
$toobWid: 46px;
.right-tag-box{
  width: 70%;
  margin: 0 auto;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  cursor: pointer;
  &:hover{
    color: #00BFFF;
  }
}
.link-list-item-atc{
  color: #00BFFF;
}
</style>
