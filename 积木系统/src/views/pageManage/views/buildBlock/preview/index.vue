<template>
  <div class="pre-box">
   <div class="view-box">
      <div class="views-box-content">
        <div class="head-box" :style="{'backgroundColor': targetData.titleBgColor || ''}">
          {{targetData.title || ''}}
        </div>
        <!-- 模拟手机窗口内容 -->
        <views-content :preData="targetData" :titleData="targetData"></views-content>
        <!-- 模拟手机窗口内容 -->
         <!-- 浮动按钮 -->
        <jm-float :titleData="targetData"></jm-float>
        <!-- 浮动按钮 end-->
      </div>
   </div>
  </div>
</template>
<script>
import viewsContent from './viewsContent'
import jmFloat from '@/views/pageManage/mobileComponents/jm-float.vue'
export default {
  components: {
    viewsContent,
    jmFloat
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
  computed: {
    // contentData() {
    //   console.log(this.targetData.pages.content)
    //   return this.targetData.pages ? this.targetData.pages.content : []
    // }
  }
}
</script>
<style lang="scss" scoped>
 .pre-box{
  margin-top: -30px;
  max-height: 78vh;
  overflow-y: auto;
  width: 100%;
  overflow-x: hidden;
 }
  .view-box{
    width: 100%;
    min-width: 500px;
    padding: 0 0 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -30px;
  }
  .views-box-content {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 436px;
      height: 830px;
      background: url(../../../../../assets/mobileView/iphoneX.38c8778.png) no-repeat center 0;
      background-size: 100%;
      position: relative;
  }
  .head-box{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 55px;
    font-size: 12px;
    width: 375px;
    height: 45px;
    background-color: #edf0f4;
    box-shadow: 0 0 1px 0 #ccc;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 5;
  }
</style>

