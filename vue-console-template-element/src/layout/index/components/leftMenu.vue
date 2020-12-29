<template>
  <div class="left-mune-box-content">
    <el-menu
      :default-active="activeMenu"
      :text-color="textColor"
      :background-color="backgroundColor"
      :active-text-color="activeTextColor"
      :isCollapse="true"
      >
      <!-- 一级菜单  redirect-->
      <div v-for="(lev1, l1) in routeList" :key="l1">
        <el-submenu :index="lev1.path" v-if="!lev1.redirect">
          <template slot="title" @click="linkTo">
            <i class="el-icon-location"></i>
            <span>{{lev1.meta.title}}</span>
          </template>
          <!-- 二级级菜单 -->
          <div class="group-box" v-for="(lev2, l2) in lev1.children" :key="l2">
            <el-submenu v-if="!lev2.meta.hide && lev2.children" :index="lev2.path" >
              <template slot="title">{{lev2.meta.title}}</template>
              <!-- 三级级菜单 -->
              <div v-for="(lev3, l3) in lev2.children" :key="l3" >
                <el-menu-item :index="lev3.path" v-if="!lev3.meta.hide" @click="linkTo(lev3)" >{{lev3.meta.title}}</el-menu-item>
              </div>
              <!-- 三级级菜单 end -->
            </el-submenu>
            <el-menu-item v-else-if="!lev2.meta.hide" :index="lev2.path" @click="linkTo(lev2)" >{{lev2.meta.title}}</el-menu-item>
          </div>
          <!-- 二级级菜单 end -->
        </el-submenu>
        <el-menu-item :index="lev1.path" v-else>
          <div @click="linkTo(lev1, redirect)">
            <i class="el-icon-setting"></i>
            <span>{{lev1.meta.title}}</span>
          </div>
        </el-menu-item>
      </div>
      <!-- 一级菜单 end-->
    </el-menu>
  </div>
</template>
<script>
import menu from '@/router/menu-route'
export default {
  data () {
    return {
      backgroundColor: '#008080', // 'transparent', // 菜单的背景色（仅支持 hex 格式) #1C7887
      textColor: '#fff', // 菜单的文字颜色（仅支持 hex 格式)
      activeTextColor: '#00FF7F',
      routeList: menu || []
    }
  },
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      console.log(path)
      return path
    }
  },
  methods: {
    handleOpen (data1, data2) {
      console.log(data1, data2)
    },
    handleClose () {

    },
    linkTo(data, key="path") {
      const path = data[key]
      if (this.activeMenu !== path) {
        this.$router.push(path)
      }
    }
  }
}
</script>
<style lang="scss" >
.left-mune-box-content{
  width: 100%;
  min-height: 100vh;
  .el-menu{
    border: 0;
  }
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
    .el-menu-item{
       background-color: #008B8B !important;
    }
  }
  .is-opened .group-box .el-submenu__title{
    background-color: #008B8B !important;
  }
}

</style>
