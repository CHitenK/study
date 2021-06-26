<template>
  <ul class="base-title border-b v-title">
    <li class="title-back">
      <slot name="back">
        <!-- 返回 -->
        <v-icon icon="icon-nav_icon_back" @click.native="backHandler" v-show="!closeShow"></v-icon>
       <!-- 关闭 -->
        <!-- <img src="./../../assets/imgs/home/head-close.svg" class="img-close " v-show="closeShow" />  -->
      </slot>
    </li>
    <li class="title-info">
      <slot name="title">{{$route.meta.title}}</slot>
    </li>
    <li class="title-tools">
      <slot name="tools"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      backHandler() {
        this.$router.back()
      }
    }
  },
  props: {
    closeShow:{
      type: Boolean,
      defalut: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .base-title{
    display: flex;
    width: 100%;
    height: 88px;
    line-height: 88px;
    font-size: 30px;
    font-weight: 600;
    color: $blackColor;

    .title-back{
      // width: 32px;
      // height: 32px;
      margin-left: 22px;
    }

    .title-info{
      flex: 1;
      align-items: center;
      text-align: center;
    }

    .title-tools{
      margin-right: 30px;
    }
    .img-close{
      display: inline-block;
      width: 30px;
      height: 30px;
    }
  }
</style>
