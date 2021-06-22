<template>
  <div class="float-btn-box">
    <span v-if="speedy.includes(0)">
      <i class="el-icon-share"></i>
    </span>
    <span v-if="speedy.includes(1)">
     <i class="el-icon-shopping-cart-2"></i>
    </span>
    <span class="zhuan-180" v-if="speedy.includes(2)">
      <i class="el-icon-download"></i>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    titleData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    speedy() {
      const array = []
      if (this.titleData.speedy && this.titleData.speedy.handle.length > 0) {
        this.titleData.speedy.handle.forEach(item => {
          array.push(item)
        })
      }
      return array
    }
  }
}
</script>
<style lang="scss" scoped>
.float-btn-box{
  width: 40px;
  position: absolute;
  top: 460px;
  right: 35px;
  display: flex;
  align-items: center;
  flex-direction: column;
  span{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.4);
    margin-bottom: 15px;
    i{
      color: #ffffff;
      font-size: 20px;
    }
  }
  .zhuan-180{
    transform: rotate(180deg);
  }
}
</style>
