<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <div class="mr-t-15"></div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="标准品牌" name="first" v-if="permissionShowTab('brandParentList')">
        <standard-brand></standard-brand>
      </el-tab-pane>
      <el-tab-pane label="母品牌" name="second" v-if="permissionShowTab('brandSuperiorList')">
        <parent-brand></parent-brand>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    standardBrand: () => import('./components/standardBrand'),
    parentBrand: () => import('./components/parentBrand')
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>
