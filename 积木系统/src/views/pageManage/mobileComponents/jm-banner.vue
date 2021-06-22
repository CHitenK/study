<template>
  <div >
    <cube-slide ref="slide" :data="items" :showDots="false" >
      <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)"  v-show="!!item.image"  >
        <a>
          <img :src="item.image">
        </a>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>
<script>
import { Slide, Style } from 'cube-ui'
const SlideItem = Slide.Item
console.log(Style)
export default {
  components: {
    'cube-slide': Slide,
    'cube-slide-item': SlideItem
  },
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
      showDots: false
    }
  },
  computed: {
    items() {
      return this.targetData.businessData.items || []
    }
  },
  methods: {
    clickHandler(e, index) {
    }
  }
}
</script>
<style lang="scss" scoped>
.banner-none{
  border: solid 1px #5C9EFF;
  width: 100%;
  height: 270px;
  &::after{
    content: '添加banner'
  }
}
</style>

<style lang="stylus">
.cube-slide-item a img
  width:100%
</style>
