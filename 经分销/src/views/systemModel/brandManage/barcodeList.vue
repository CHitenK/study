<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <div class="mr-t-15"></div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="标准条码管理" name="first" v-if="permissionShowTab('commbarcode_list')">
        <barcode-list></barcode-list>
      </el-tab-pane>
      <el-tab-pane label="组码管理" name="second" v-if="permissionShowTab('groupCommbarcode_list')">
        <ancestral-code-list></ancestral-code-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    barcodeList: () => import('./components/barcode'),
    ancestralCodeList: () => import('./components/ancestralCode')
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>
