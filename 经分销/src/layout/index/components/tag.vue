<template>
  <div class="right-tag-box">
    <div class="item-bx" ref="tagbx">
      <div class="item-tag-bx" :style="{ 'width': tagBxWidth }" ref="all-tags">
        <div v-for="(item, index) in tags" :key="index" :class="activePath === item.path ? 'item-tag item-tag-act' : 'item-tag'" @click.self="linkTo(item)" :id="item.path">
          <!-- customTitle 自定定义的tag 名称  -->
          {{ item.customTitle || item.meta.title }}
          <i class="el-icon-circle-close" v-if="!item.meta.affix" @click.self="close(index)" :id="activePath === item.path ? 'close_' + activePath : ''"></i>
        </div>
      </div>
    </div>
    <div class="tool-bx flex-c-c">
      <i class="el-icon-more fs-14 clr-III "></i>
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
import { debounce } from '@/utils/tool'
import { findIndex } from 'lodash'
let _timer = null
export default {
  data() {
    return {
      baseWid: 0
    }
  },
  computed: {
    tags() { // tag栏数据
      return this.$store.getters.tagsList
    },
    activePath() { // 当前路由
      return this.$route.path
    },
    tagBxWidth() { // tab栏宽度
      return this.$store.getters.tagBxWidth
    }
  },
  watch: {
    $route(to, from) {
      const flage = this.tags.some(item => item.path === to.path)
      if (!flage) { // tags 不存在当前路由时
        this.$store.dispatch('tags/AC_ADD_TAGS_LIST', to)
      } else { // 已存在
        // 更新
        const tags = this.tags
        const index = findIndex(tags, { path: to.path })
        tags.splice(index, 1, to)
        this.$store.dispatch('tags/AC_UPDATE_STATE', { key: 'tagsList', value: tags })
      }
      // 设置滚动距离
      this.$nextTick(() => {
        this.setScrollLeft()
      })
    },
    tags(data) {
      const len = data.length > 5 ? data.length : 5
      // 先粗略设置tag栏宽度
      this.$store.dispatch('tags/AC_UPDATE_STATE', { key: 'tagBxWidth', value: `calc(160px * ${len})` })
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
  mounted() {
    this.baseWid = this.$refs.tagbx.offsetWidth
  },
  methods: {
    linkTo(data) {
      if (data.path === this.activePath) return false
      this.$router.push(data)
    },
    // 关闭单个
    close(index) {
      const tags = this.tags
      if (tags[index].path === this.activePath) {
        const len = tags.length
        this.linkTo(tags[len - 2])
        // this.$router.go(-1)
      }
      tags.splice(index, 1)
      this.$store.dispatch('tags/AC_UPDATE_STATE', { key: 'tagsList', value: tags })
    },
    // 关闭全部
    closeAll() {
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
    closeOthers() {
      let target = []
      this.tags.map(item => {
        if (item.path === this.activePath || item.meta.affix) {
          target.push(item)
        }
      })
      this.$store.dispatch('tags/AC_UPDATE_STATE', { key: 'tagsList', value: target })
    },
    // 设置tab栏滚动距离 函数防抖 事件被调用后，在执行之前无论被调用多少次都会从头开始计时
    setScrollLeft: debounce(function() {
      const dom = document.getElementById(this.activePath) // offsietWidth
      const baseWid = this.$refs.tagbx.clientWidth // tab栏最外父元素的宽度 已知是固定值
      const domWidth = dom.clientWidth // 当前元素宽度
      const targetOffLeft = dom.offsetLeft // dom距离父元素的距离
      if (dom) {
        if (targetOffLeft + domWidth >= baseWid) {
          let i = 0
          this.tags.find((item, index) => {
            if (item.path === this.activePath) i = index
          })
          // 如果是最后一个tab
          if (i === this.tags.length - 1) {
            this.$refs.tagbx.scrollLeft = targetOffLeft + domWidth - baseWid
          } else {
            this.$refs.tagbx.scrollLeft = targetOffLeft - baseWid + domWidth + domWidth
          }
        } else {
          this.$refs.tagbx.scrollLeft = 0
        }
      }
    }, 200)
  }
}
</script>
<style lang="scss" scoped >
$toobWid: 46px;
.right-tag-box{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.tool-bx{
  height: 100%;
  width: $toobWid;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
  text-align: center;
  font-size: 30px;
  color: #666;
  cursor: pointer;
  position: relative;
  .tool-bx-dian{
    display: inline-block;
  }
  &:hover .tool-list{
    display: block;
  }
}
.item-bx{
  width: calc(100% - #{$toobWid});
  height: 100%;
  overflow-x: scroll;
  background-color: #ffffff;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  position: relative;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
.item-tag-bx{
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}
.item-tag{
  padding: 0px 10px;
  border: solid 1px #eaeaea;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  font-size: 12px;
  color: #999;
  i {
    margin-left: 3px;
    font-size: 14px;
  }
  &:hover{
    color: #6ea9f3;
    border: solid 1px #6ea9f3;
  }
}
.item-tag-act{
  color:#6ea9f3;
  border: solid 1px #6ea9f3;
  &::before{
    display: inline-block;
    content: '';
    width: 6px;
    height: 6px;
    background-color:#6ea9f3;
    border-radius: 50%;
    margin-right: 3px;
  }
}
.tool-list{
  display: none;
  width: 80px;
  background-color: #ffffff;
  position: absolute;
  top: 100%;
  right: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
  z-index: 1;
}
.tool-list-item{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-top: solid 1px #eaeaea;
}
.tool-list-item-ot{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-top: solid 1px #eaeaea;
  position: relative;
  &:hover .link-list{
    display: block;
  }
}
.b-n{
  border: 0;
}
.link-list{
  display: none;
  width: 120px;
  max-height: 50vh;
  overflow-y: scroll;
  background-color: #ffffff;
  font-size: 12px;
  position: absolute;
  top: 0;
  right: 80px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
.link-list-item{
  display: block;
  text-align: center;
  height: 40px;
  line-height: 40px;
  width: 70%;
  margin: 0 auto;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  cursor: pointer;
  &:hover{
    color: #6ea9f3;
  }
}
.link-list-item-atc{
  color: #6ea9f3;
}
</style>
