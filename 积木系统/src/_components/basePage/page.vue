<template>
  <div id="page">
    <el-pagination
      background
      @size-change="val => pageSize = val"
      :current-page.sync="pageNo"
      :page-sizes="[10, 50, 100, 200]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ['page'],
  computed: {
    // page: {
    //   handler: function (val, oldVal) {
    //     console.log(val)
    //     console.log(oldVal)
    //     this.$emit('update:page', val)
    //   },
    //   deep: true
    // }
    pageNo: {
      get: function() { return this.page.pageNo },
      set: function(val) {
        this.page.pageNo = val
        this.$emit('update:page', this.page)
      }
    },
    pageSize: {
      set: function(val) {
        this.page.pageSize = val
        this.$emit('update:page', this.page)
      },
      get: function() { return this.page.pageSize }
    },
    total: {
      get: function() { return this.page.total },
      set: function(val) {
        this.page.total = val
        this.$emit('update:page', this.page)
      }
    }
  }
}
</script>

<style scoped>
#page {
  text-align: center
}
</style>
