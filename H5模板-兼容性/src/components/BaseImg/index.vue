<template>
  <img
      :src="imgUrl"
      :data-src="src"
      @error="handleOnerror($event)"
      class="v-img">
</template>
<script>
/** 对原生img标签封装一层，处理加载图片失败时的，显示一个默认图片*/
import defImgSquare from '@/assets/imgs/def_img_square.png'
import defImgRectangle from '@/assets/imgs/def_img_rectangle.png'
import defImgSlimRectangle from '@/assets/imgs/def_img_slim_rectangle.png'

export default {
  name: 'v-img',
  components: {},
  props: {
    src: { // 图片路径
      default: '#'
    },
    errorImg: { // 图片加载失败时代替的图片
      default: defImgSquare
    },
    errorImgType: { // square,rectangle,slim
      type: String
    }
  },
  data() {
    return {
      imgUrl: this.src ? this.src : ''
    }
  },
  created() {
  },
  methods: {
    handleOnerror(e) {
      let errorImg = this.errorImg
      if (this.errorImgType) { // 使用不同的默认图片
        console.log(this.errorImgType)
        switch (this.errorImgType) {
          case 'square': errorImg = defImgSquare
            break
          case 'rectangle': errorImg = defImgRectangle
            break
          case 'slim': errorImg = defImgSlimRectangle
            break
          default:
        }
      } else {
        if (errorImg === defImgSquare) { // 尝试计算图片设定的尺寸去使用默认图片
          const width = e.target.clientWidth
          const height = e.target.clientHeight
          if (Math.abs(width - height) > 10) { // 不是正方形
            if (width > height * 2) { // 比较瘦的矩形
              errorImg = defImgSlimRectangle
            } else {
              errorImg = defImgRectangle
            }
          } else if (width === 0 && height === 0) {
            errorImg = defImgRectangle
          }
        }
      }
      this.imgUrl = errorImg
    }
  },
  watch: {
    src(val) {
      this.imgUrl = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .v-img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
