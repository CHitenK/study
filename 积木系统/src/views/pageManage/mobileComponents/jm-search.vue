<template>
   <div>
      <div class="seach-box" :class="{'banner-box': !targetData.businessData.bgColor}" :style="style">
        <div class="searchBar" v-if="targetData.businessData.bgColor">
          <i class="el-icon-search icon_search"></i>
          <input type="text" placeholder="搜索商品" readonly/>
        </div>
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
  computed: {
    style() {
      return this.targetData.businessData.bgColor ? { 'background': this.targetData.businessData.bgColor } : ''
    }
  }
}
</script>
<style lang="scss" scoped>
.seach-box{
  width: 100%;
  height: 46px;
  padding: 8px 10px;
  box-sizing: border-box;
}
.banner-box{
  height: 30px;
  &::after{
    content: '添加搜索'
  }
}
.searchBar {
    width: 100%;
    height: 30px;
    background: #eee;
    font-size: 14px;
    position: relative;
    border-radius: 15px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
}

.searchBar input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background: transparent;
}

.icon_search {
    padding: 0 8px;
    line-height: 35px;
    color: #757575;
    margin-top: 3px;
}
</style>
