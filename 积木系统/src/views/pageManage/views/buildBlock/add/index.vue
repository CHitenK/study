<template>
  <div class="my-box">
    <div class="page-box" >
      <div>
        <!-- 左边组件选择框 -->
        <left-side />
        <!-- 左边组件选择框 end -->
      </div>
      <div class="page-box-right">
        <div class="page-box-right-top">
            <el-button type="primary" size="mini" @click="save" :disabled="buildBlock.titleData.status === '1'">保存为草稿</el-button>
            <el-button type="primary"  size="mini" @click="clickPraViews">预览</el-button>
            <el-button type="primary" size="mini"  @click="commit">提交</el-button>
        </div>
        <!-- 模拟窗口 -->
        <mobile-view />
        <!-- 模拟窗口 end -->
        <!-- 预览 -->
        <el-dialog
          title="预览"
          :visible.sync="dialogVisible"
          width="560px"
          top="60px"
        >
          <pre-view :targetData="preTargetData" />
        </el-dialog>
      <!-- 预览 end-->
      </div>
    </div>
  </div>
</template>
<script>
import leftSide from '@/views/pageManage/components/leftSide'
import mobileView from '@/views/pageManage/components/mobileView'
import buildBlock from '@/views/pageManage/mixins/index.js'
import preView from './../preview/index.vue'
export default {
  components: {
    leftSide,
    mobileView,
    preView
  },
  mixins: [buildBlock],
  data() {
    return {
      preTargetData: {},
      dialogVisible: false
    }
  },
  mounted() {
    console.log(process.env.VUE_APP_API_ROOT)
    if (!this.activeName) {
      this.$store.dispatch(this.toolType + '/SET_ACTIVECOMPONET', { name: 'title', jsonId: '' })
    }
  },
  methods: {
    save() {
      this.$store.dispatch(this.toolType + '/SET_SAVE_COMMIT_FLAGE', Date.now() + '-save')
    },
    commit() {
      this.$store.dispatch(this.toolType + '/SET_SAVE_COMMIT_FLAGE', Date.now() + '-commit')
    },
    // 预览
    clickPraViews() {
      // 预览数据
      const data = JSON.parse(JSON.stringify(this.buildBlock.titleData)) // 标题数据
      // 组件数据
      data.pages = JSON.parse(JSON.stringify({ content: this.buildBlock.jmData }))
      // 遍历组件数据， 获取导航（锚点）数据 label
      const flage = data.pages.content.some(item => item.name === 'jm-nav') // 是否设置锚点组件 true
      if (flage) { // 设置锚点组件时
        const label = []
        // 获取modelName
        data.pages.content.forEach(item => {
          if (item.modelName && item.isAnchorPoint) {
            label.push(item.modelName)
          }
        })
        // label赋值
        data.pages.content.forEach(item => {
          if (item.name === 'jm-nav') {
            item.label = label
          }
        })
      }
      this.dialogVisible = true
      this.preTargetData = data
    }
  }
}
</script>
<style lang="scss" scoped>
.my-box{
  width: 100%;
  height: 100%;
  overflow-x: auto;
}
.page-box{
  width: 100%;
  max-height: calc(100vh -30px);
  box-sizing: border-box;
  /*padding: 20px  15px 0px 0;*/
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 1500px;
}
.btn-box{
  margin-top: 30px;
}
.page-box-right{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: calc(100% - 320px);
  margin-left: 10px;
  margin-top: 20px;
}
.page-box-right-top{
  width: 300px;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /*border-bottom: solid 1px rgba(234,234,255,1);*/
  position: absolute;
  right: 40px;
  top: 125px;
}
.route-box{
  margin-left: 20px;
  flex-grow: 1;
  min-height: 500px;
  border: solid 1px #cccccc;
  box-sizing: border-box;
  padding: 15px;
}
</style>
