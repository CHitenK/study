<template>
  <div>
    <div v-if="businessData && businessData.showcaseConfig.length > 0" class="show-case-box" :style="{'height': pH + 'px'}" >
      <div class="show-case-item" :id="'showcase' + targetData.uuid" :class="'imgstyle'" :style="{'width': pW, 'backgroundColor': businessData.showCaseBgColor}">
        <img v-for="(item, i) in businessData.showcaseConfig" :key="i" :style="{'width': imgWidth + 'px' }" class="showcase-img" :src="item.image" />
      </div>
    </div>
    <div class="no-data" v-else>
      请选择橱窗样式
    </div>
    <!-- <div  class="show-case-bbox" :style="{'height': pH - 20 + 'px' }" v-if="businessData && businessData.showcaseConfig.length > 0"> businessData.showCaseBgColor
      <div class="show-case-box" :style="{'height': pH + 'px'}" >
        <div class="show-case-item" id="showcase" :class="'imgstyle'" :style="{'width': pW}">
          <img v-for="(item, i) in businessData.showcaseConfig" :key="i" :style="{'width': imgWidth + 'px' }" :src="item.image" />
        </div>
      </div>
    </div>
    <div class="no-data" v-else>
      请选择橱窗样式
    </div> -->
  </div>
</template>
<script>
export default {
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
      pH: '100px',
      pW: '100%',
      imgWidth: 375
    }
  },
  computed: {
    businessData() {
      return Object.keys(this.targetData.businessData).length > 0 ? this.targetData.businessData : null
    }
  },
  watch: {
    businessData: {
      immediate: false,
      deep: true,
      handler(newData, oldData) {
        this.handeleWidth()
      }
    }
  },
  mounted() {
    this.handeleWidth()
  },
  methods: {
    // 处理整个组件的高度
    handeleHeight() {
      this.$nextTick(() => {
        setTimeout(() => {
          const dome = document.getElementById('showcase' + this.targetData.uuid)
          if (!dome) return false
          const domHei = dome.clientHeight
          this.pH = domHei
        }, 1000)
      })
    },
    // 计算组件的宽度/图片的宽度
    handeleWidth() {
      if (!this.businessData) return false
      const rowNum = (this.businessData && this.businessData.rowNum) ? this.businessData.rowNum : '1'
      const maxShowNum = +this.businessData.showItemNum
      const wid = Math.ceil(375 / maxShowNum)
      this.imgWidth = wid
      switch (rowNum + '') {
        case '1': {
          this.pW = wid * this.businessData.showcaseConfig.length + 'px'
          this.handeleHeight()
          break
        }
        case '2':
        case '3': {
          const yuShu = this.businessData.showcaseConfig.length - (maxShowNum * rowNum) // 展示满行数后还剩多少个数据
          const num = yuShu > 0 ? maxShowNum + Math.ceil(yuShu / rowNum) : maxShowNum
          this.pW = wid * num + 'px'
          this.handeleHeight()
          break
        }
        default: break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.no-data{
  width: 100%;
  height: 130px;
  border: solid red 1px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.show-case-box{
  width: 100%;
  height: 100px;
  overflow-y: hidden;
  overflow-x: auto;
}
.show-case-item{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  height: auto;
}
.show-case-bbox{
  width: 100%;
  overflow: hidden;
  height: 100px;
}
.show-case-box::-webkit-scrollbar {
    display: none;
}
</style>

