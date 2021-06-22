<template>
  <div :style="styleObject" @click="toSearch" class="searchBox">
    <div class="searchBar">
      <i class="iconfont icon-sousuo icon_search"></i>
      <div>搜索商品</div>
    </div>
  </div>
</template>

<script>
import { getJmBusinessData } from '@/api/jmPageConfig'
import Wx from 'weixin-js-sdk'
import { throttle } from '@/libs/common'
export default {
  name: 'jm-search',
  props: {
    componentsId: {
      type: Number,
      required: true
    },
    specialId: {
      type: String,
      required: true
    },
    businessData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      styleObject: null,
      listItem: {}
    }
  },
  created() {
    // this.getJmBusinessBanner(this.specialId, this.componentsId)
    this.getJmBusinessBannerByProps(this.businessData)
  },
  mounted() {
    this.listItem[this.componentsId] = this.$el.offsetHeight
    this.$emit('offsetHeightBack', this.listItem)
  },
  methods: {
    toSearch: throttle(function() {
      Wx.miniProgram.navigateTo({
        url: '/pages/index/search/search'
      })
    }),
    getJmBusinessBanner(specialId, componentsId) {
      let getData = {}
      getData.specialId = specialId
      getData.uuid = componentsId
      getJmBusinessData(getData)
        .then(res => {
          this.styleObject = {}
          this.styleObject.backgroundColor = res.data.bgColor
        })
        .catch(err => {
          console.log(err, 'banner getJmBusinessData')
        })
    },
    getJmBusinessBannerByProps(newVal) {
        this.styleObject = {}
        this.styleObject.backgroundColor = newVal.bgColor
    },
  }
}
</script>

<style scoped>
.searchBox {
  width: 100%;
  height: 46px;
  padding: 8px 10px;
  position: relative;
  top: 0;
  left: 0;
  z-index: 8;
  box-sizing: border-box;
}

.searchBar {
  width: 100%;
  height: 30px;
  background: #eee;
  color: #757575;
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
}
</style>
