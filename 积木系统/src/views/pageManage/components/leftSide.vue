<template>
  <div class="left-box">
    <div v-for="(item,index) in toolsOptios" :key="index">
      <span class="left-box-title">
        {{item.name}}
      </span>
      <div class="left-box-content">
        <span v-for="(citem, i) in item.children" :key="i" @click="link(citem)" :class="{'active': activeName === citem.name }">{{citem.label}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import buildBlock from './../mixins/index.js'
import { componentIds } from '@/views/pageManage/utils/default'
export default {
  mixins: [buildBlock],
  data() {
    return {
      toolsOptios: [
        {
          name: '通用',
          children: [
            // (仅可设置一个)
            { label: 'title', componentsId: componentIds['title'], name: 'title' },
            { label: 'banner', componentsId: componentIds['jm-banner'], name: 'jm-banner', businessData: {}},
            // (仅可设置一个
            { label: '锚点', componentsId: componentIds['jm-nav'], name: 'jm-nav', businessData: {}},
            // (仅可设置一个)
            { label: '搜索', componentsId: componentIds['jm-search'], name: 'jm-search', businessData: {}},
            { label: '定时切换', componentsId: componentIds['jm-timingSwitch'], name: 'jm-timingSwitch', businessData: {}}
          ]
        },
        {
          name: '商品/内容',
          children: [
            { label: '商品', componentsId: componentIds['jm-products'], name: 'jm-products', businessData: {}},
            { label: '规则橱窗', componentsId: componentIds['jm-showcase'], name: 'jm-showcase', businessData: {}}
          ]
        },
        {
          name: '营销工具',
          children: [
            { label: '优惠券', componentsId: componentIds['jm-coupon'], name: 'jm-coupon', businessData: {}},
            { label: '销售奖励', componentsId: componentIds['jm-sales'], name: 'jm-sales', businessData: {}}
          ]
        }
      ]
    }
  },
  created() {
  },
  methods: {
    // 跳转
    link(data) {
      if (!data.name) return false
      // 锚点只能设置一个
      let navflage = false
      if (data.name === 'jm-nav') {
        // 是否设置苗点 是 => true
        navflage = this.buildBlock.jmData.some(item => { return item.name === 'jm-nav' })
      }
      if (navflage) {
        this.$message({
          message: '锚点组件只能设置一个',
          type: 'warning'
        })
        return false
      }
      // 搜索组件只能设置一个
      let seachFlage = false
      if (data.name === 'jm-search') {
        // 是否设置搜索 是 => true
        seachFlage = this.buildBlock.jmData.some(item => { return item.name === 'jm-search' })
      }
      if (seachFlage) {
        this.$message({
          message: '搜索组件只能设置一个',
          type: 'warning'
        })
        return false
      }
      // 先设置设置当前数据uuid为空
      this.$store.dispatch(this.toolType + '/SET_ACTIVE_UUID', '')
      // 设置当前 from表单窗口显示的组件
      this.$store.dispatch(this.toolType + '/SET_ACTIVECOMPONET', { name: '', uuid: '' }) // 保证form组件刷新
      const _timer = setTimeout(() => {
        this.$store.dispatch(this.toolType + '/SET_ACTIVECOMPONET', { name: data.name, uuid: '' })
        clearTimeout(_timer)
      }, 500)
      if (data.name !== 'title') { // 不是点击title时
        // 全局设置每个组件的 uuid
        const uuid = Date.now()
        // 添加组件数据
        this.$store.dispatch(this.toolType + '/ADD_JM_DATA', { ...data, uuid })
        // 设置当前数据uuid
        this.$store.dispatch(this.toolType + '/SET_ACTIVE_UUID', uuid)
        // 手机模拟框滚动到底部
        this.$store.dispatch(this.toolType + '/SET_SCROLL_FOOT', uuid)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
 @import url('./../style/base.scss');
 .left-box{
   width: 300px;
   display: flex;
   height: calc(100vh - 280px);
   flex-direction: column;
   overflow-y: auto;
   box-shadow:0px 1px 15px 0px rgba(188,188,229,0.24);
   margin-top: 30px;
   .left-box-title{
     width: 100%;
     height: 60px;
     display: flex;
     align-items: center;
     box-sizing: border-box;
     padding-left: 20px;
   }
   .left-box-content{
     width: 100%;
     display: inherit;
     span{
      display: flex;
      width: 100%;
      height: 40px;
      cursor: pointer;
      box-sizing: border-box;
      padding-left: 50px;
      align-items: center;
     }
     .active {
       background:rgba(249,250,252,1);
       color: #3488CA;
     }
   }
 }
</style>

