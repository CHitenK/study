<template>
  <div v-show="isShow" class="back-top" @click="handleBackTop">
    <v-icon icon="back-top"/>
  </div>
</template>
<script>
export default {
  name: 'backTop',
  components: {},
  props: {},
  data() {
    return {
      timeId: '',
      isShow: false
    }
  },
  computed: {},
  created() {
    window.addEventListener('scroll', (e) => {
      if (document.querySelector('html').scrollTop > 100) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }, false)
  },
  methods: {
    handleBackTop() {
      let scrollTop = document.querySelector('html').scrollTop
      clearInterval(this.timeId)
      this.timeId = setInterval(() => {
        scrollTop -= 15
        if (scrollTop <= 0) {
          scrollTop = 0
          clearInterval(this.timeId)
        }
        document.querySelector('html').scrollTop = scrollTop
      }, 1)
    }
  },
  beforeDestroy() {
    clearInterval(this.timeId)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .back-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 2000;
    height: 40px;
    width: 40px;
    border-radius: 20px;
    background-color: $primaryColor;
    color: #fff;
    text-align: center;
    line-height: 40px;
    font-size: 22px;
    transition: background-color .5s;
    &:hover {
      background-color: lighten($primaryColor, 10);
    }
    &:active, &:active:hover {
      background-color: $primaryColor;
    }
  }
</style>
