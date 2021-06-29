<template>
  <div class="error">
    <div class="error-container">
      <v-img class="error-img" :src="bg_404"/>
      <h1>Sorry！您访问的页面不存在......</h1>
      <!--<span class="link" role="link" @click="$router.back()">返回上一页</span>-->
    </div>
  </div>
</template>
<script>
import bg_404 from '@/assets/imgs/bg_404.png'

export default {
  name: 'notFound',
  components: {},
  props: {},
  data() {
    return {
      bg_404
    }
  },
  computed: {},
  created() {

  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .error {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #fff;
    overflow: auto;
  }

  .error-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 789px;
    min-height: 650px;
    text-align: center;
    line-height: 1;
  }

  .error-img {
    width: 789px;
    height: 474px;
  }

  h1 {
    margin: 44px 0 32px;
    font-size: 38px;
    color: #000;
    font-weight: normal;
  }

  .link {
    font-size: 30px;
    color: $primaryColor;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      color: lighten($primaryColor, 10%);
    }
  }
</style>
