<template>
  <div class="right-tag-box">
    <div class="item-bx" ref="tagbx">
      <div class="item-tag-bx" :style="{ 'width': tagBxWidth }">
        <div v-for="(item, index) in tags" :key="index" :class="activePath === item.path ? 'item-tag item-tag-act' : 'item-tag'" @click.prevent="linkTo(item)">
          <!-- customTitle 自定定义的tag 名称  -->
          {{ item.customTitle || item.meta.title }}
          <i class="el-icon-circle-close" v-if="!item.meta.affix"></i>
        </div>
      </div>
    </div>
    <div class="tool-bx">
      <span class="tool-bx-dian">...</span>
      <div class="tool-list">
        <div class="tool-list-item b-n">
          关闭全部
        </div>
        <div class="tool-list-item">
          关闭其他区
        </div>
        <div class="tool-list-item-ot">
          切换标签
          <div class="link-list">
            <span class="link-list-item">
              我的
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      baseWid: 0,
      tagBxWidth: 'calc(80px * 10)'
    }
  },
  computed: {
    tags () {
      return this.$store.getters.tagsList
    },
    activePath () {
      return this.$route.path
    }
  },
  watch: {
    $route (to, from) {
      console.log(to, 122)
      const flage = this.tags.some(item => item.path === to.path)
      if (!flage) {
        this.$store.dispatch('tags/AC_ADD_TAGS_LIST', to)
      }
    },
    tags (data) {
      const len = data.length > 10 ? data.length : 10
      this.tagBxWidth =  `calc(80px * ${len})`
      this.$nextTick(() => {
        const doms = document.getElementsByClassName('item-tag') // offsietWidth
        console.log(23)
        if (doms && doms.length > 0) {
          let wd = 0
          for (let i = 0; i < doms.length; i++) {
            console.log(doms[i].offsietWidth)
           // wd += (doms[i].offsietWidth + 6)
          }
        }
      })
    }
  },
  mounted () {
    // this.baseWid = this.$refs.tagbx.offsetWidth
    // this.tagBxWidth = this.baseWid + 10
    // console.log(this.baseWid)
    // setTimeout(() => {
    //   this.$refs.tagbx.scrollLeft = 3000
    // }, 3000)
  },
  methods: {
    linkTo (data) {
      console.log(data, 43)
      this.$router.push(data)
    }
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
  box-shadow: 0px 1px 2px rgba(0, 0, 0, .15);
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
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
  background-color: red;
}
.item-tag{
  padding: 5px 10px;
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
    color: #00BFFF;
    border: solid 1px #00BFFF;
  }
}
.item-tag-act{
  color: #00BFFF;
  border: solid 1px #00BFFF;
  &::before{
    display: inline-block;
    content: '';
    width: 6px;
    height: 6px;
    background-color: #00BFFF;
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
  width: 90px;
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
}
</style>
