<template>
  <div class="right-tag-box">
    <div class="item-bx" ref="tagbx">
      <div class="item-tag-bx" >
        <!-- <div class="item-tag" v-for="(item, i ) in 30">
         {{i}}
        </div> -->
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
      baseWid: 1000
    }
  },
  watch: {
    $route(to,from){
      console.log(to.path);
    }
  },
  mounted () {
    this.baseWid = this.$refs.tagbx.offsetWidth
    console.log(this.baseWid)
    // setTimeout(() => {
    //   this.$refs.tagbx.scrollLeft = 3000
    // }, 3000)
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
.item-tag{
  display: inline-block;
  width: 120px;
  height: calc(100% - 4px);
  border: solid 1px red;
}
.item-tag-bx{
  height: 100%;
  width: 10000px;
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
