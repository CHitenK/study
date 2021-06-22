<template>
  <div class="left-mune-box-content">
    <el-menu
      :default-active="activeMenu"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      unique-opened
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      >
      <!-- 一级菜单  redirect-->
      <div v-for="(lev1, l1) in routeList" :key="l1">
        <el-submenu :index="lev1.path" v-if="!lev1.redirect && lev1.showMenu">
          <template slot="title" @click="linkTo">
            <i :class="lev1.meta.icon"></i>
            <span v-if="!isCollapse">{{lev1.meta.title}}</span>
          </template>
          <!-- 二级级菜单 -->
          <div class="group-box" v-for="(lev2, l2) in lev1.children" :key="l2">
            <el-submenu v-if="!lev2.hide && lev2.children" :index="lev2.path" >
              <template slot="title">{{lev2.meta.title}}</template>
              <!-- 三级级菜单 -->
              <div v-for="(lev3, l3) in lev2.children" :key="l3" >
                <el-menu-item :index="lev3.path" v-if="!lev3.hide" @click="linkTo(lev3)" >{{lev3.meta.title}}</el-menu-item>
              </div>
              <!-- 三级级菜单 end -->
            </el-submenu>
            <el-menu-item v-else-if="!lev2.hide" :index="lev2.path" @click="linkTo(lev2)" >{{lev2.meta.title}}</el-menu-item>
          </div>
          <!-- 二级级菜单 end -->
        </el-submenu>
        <el-menu-item :index="lev1.redirect" v-else-if="lev1.showMenu">
          <div @click="linkTo(lev1, 'redirect')">
            <i class="el-icon-setting"></i>
            <span v-if="!isCollapse">{{lev1.meta.title}}</span>
          </div>
        </el-menu-item>
      </div>
      <!-- 一级菜单 end-->
    </el-menu>
  </div>
</template>
<script>
import menu from '@/router/menu-route'
import lodash from 'lodash'
import config from '@u/config'
export default {
  data() {
    return {
      backgroundColor: '#008080', // 'transparent', // 菜单的背景色（仅支持 hex 格式) #1C7887
      textColor: '#333', // 菜单的文字颜色（仅支持 hex 格式)
      activeTextColor: '#6ea9f3',
      routeList: []
    }
  },
  computed: {
    activeMenu() {
      return this.$route.path
    },
    isCollapse() {
      return this.$store.getters.isCollapse
    }
  },
  mounted() {
    this.routeList = this.pessionMenu()
  },
  methods: {
    linkTo(data, key = 'path') {
      const path = data[key]
      if (this.activeMenu !== path) {
        this.$router.push(path)
      }
    },
    /**
     * @description 一级菜单栏 是否显示
     */
    pessionMenu() {
      const treeMenuList = sessionStorage.getItem('treeMenuList') ? JSON.parse(sessionStorage.getItem('treeMenuList')) : []
      menu.map(items => {
        // 开发环境或者白名单 显示所有菜单
        if (!config.usePermission) {
          items.showMenu = items.showMenu === false ? items.showMenu : true
        } else if (items.showMenu === false) { // 如果原先设置了showMenu=false 保持原值
          items.showMenu = items.showMenu
        } else if (items.children && items.children.length > 0 && !items.redirect) {
          // 存在路由的path与菜单url匹配时显示
          let flage = items.children.some(item => {
            // return !!(lodash.find(treeMenuList, { url: item.path }))
            return !!(lodash.find(treeMenuList, { name: item.meta.title })) // ----暂时----
          })
          items.showMenu = !!flage // 整个菜单组是否显示
        } else { // 一级菜单为页面的情况
          items.showMenu = !!(lodash.find(treeMenuList, { url: items.redirect }))
        }
      })
      return menu
    }
  }
}
</script>
<style lang="scss" >

.left-mune-box-content{
  width: 100%;
  height: calc(100vh - 70px);
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  z-index: 1;
  overflow-x: hidden;
  .el-menu{
    border: 0;
  }
  .el-submenu [class^=menu-icon] {
    font-size: 18px !important;
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    color: #6ea9f3;
  }
  &::-webkit-scrollbar {
    width: 4px;  /*滚动条宽度*/
    height: 4px;  /*滚动条高度*/
  }
  /*定义滚动条轨道 内阴影+圆角*/
  &::-webkit-scrollbar-track {
      border-radius: 100px;;  /*滚动条的背景区域的圆角*/
      background-color: transparent; /*滚动条的背景颜色*/
  }
  /*定义滑块 内阴影 + 圆角*/
  &::-webkit-scrollbar-thumb  {
      border-radius: 0px;  /*滚动条的圆角*/
      -webkit-box-shadow: inset 0 0 6px rgba(16, 164, 209, 0.2);
      background-color: rgba(0, 0, 0, 0.07);  /*滚动条的背景颜色*/
  }
  .el-menu-item, .el-submenu__title {
    height: 42px;
    line-height: 42px;
  }
  .el-submenu .el-menu-item {
    height: 35px;
    line-height: 35px;
  }
}
</style>
