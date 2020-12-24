<template>
  <div class="left-mune-box-content">
    <el-menu
      default-active="1-4"
      :text-color="textColor"
      :background-color="backgroundColor"
      :active-text-color="activeTextColor"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <div class="group-box">
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </div>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航五</span>
        </template>
        <div class="group-box">
          <el-submenu index="5-4">
            <template slot="title">选项4</template>
            <el-menu-item index="5-4-1">选项1</el-menu-item>
          </el-submenu>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backgroundColor: '#008080', // 'transparent', // 菜单的背景色（仅支持 hex 格式) #1C7887
      textColor: '#fff', // 菜单的文字颜色（仅支持 hex 格式)
      activeTextColor: '#00FF7F'
    }
  },
  methods: {
    handleOpen() {

    },
    handleClose() {

    }
  }
}
</script>
<style lang="scss" >
.left-mune-box-content{
  width: 100%;
  min-height: 100vh;
  .el-submenu__title i, .el-menu-item i, .el-icon-arrow-down{
    color: #ffffff;
  }
  .el-menu-item.is-active i{
    color: #00FF7F;
  }
  .group-box{
    width: 100%;
    .is-opened .el-menu .el-menu-item, .is-opened .el-submenu__title{
     background-color: #008B8B !important;
    }
  }
}

</style>
