
<template>
  <el-row>
    <el-col :span="22" >
      <div class="breadcrumb-bx" v-if="list.length > 0">
        <span class="status-bar bgc-act"></span>
        <span class="fs-14 clr-II" >当前位置：</span>
        <div class="breadcrumb-bx-main">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
            v-for="(item, index) in list"
            :key="index" :to="(item.children && item.children.length  > 0 ) || index === list.length - 1 ? '' : { path: item.path }"
            :replace="true">
              <span class="fs-14 clr-II fw-nor breadcrumb-item" :class="index === list.length - 1 ? ' clr-act' : ''">{{item.meta.title}}</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
       </div>
     </el-col>
     <el-col :span="2" class="fs-12" v-if="showGoback" >
       <JFX-back />
     </el-col>
  </el-row>
</template>
<script>
/**
 * @description 面包屑 全局组件
 * 使用示例:
 *  <JFX-Breadcrumb :breadcrumb="[]" />
 *  breadcrumb => 自定义面包屑 格式 [{ path: '/iindex', meta: {title: '首页' }}, ...] 空数组时根据路由生成面包屑
 */
import routeList from '@/router/menu-route'
export default {
  props: {
    breadcrumb: {
      type: Array,
      default: () => {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    showGoback: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    activePath() {
      return this.$route.path
    }
  },
  watch: {
    breadcrumb() {
      this.setBreadcrumb()
    }
  },
  mounted() {
    this.setBreadcrumb()
  },
  methods: {
    setBreadcrumb() {
      if (!this.breadcrumb || this.breadcrumb.length < 1) {
        this.list = this.init(routeList, data => data.path === this.activePath)
      } else {
        this.list = this.breadcrumb
      }
    },
    // 设置面包屑
    init(tree, func, list = []) {
      if (!tree) return []
      for (const data of tree) {
        list.push(data)
        if (func(data)) return list
        if (data.children) {
          const findChilren = this.init(data.children, func, list)
          if (findChilren.length) return findChilren
        }
        list.pop()
      }
      return []
    }
  }
}
</script>
<style lang="scss" scoped >
.breadcrumb-bx {
  display: flex;
  align-items: center;
  height: 20px;
}
.status-bar{
  display: inline-block;
  width: 4px;
  height: 80%;
  margin-right: 5px;
}
.breadcrumb-item{
  display: inline-block;
}
.breadcrumb-bx-main{
  span{
    display: inline-block;
    margin-top: 2px;
    cursor: pointer;
  }
}
</style>
