<template>
  <div class="container">
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getList } from '@/assets/api/index.ts'
export default Vue.extend({
  async asyncData(context) {
    try {
      const res:any = await getList()
      console.log(res)
      let list: any[] = []
      if (res.data && res.data.content) {
        list = res.data.content || []
      }
      return { list  }
    } catch (err) {
      return { list: [] }
    }
  },
  data() {
    return {
      // name: 'ccc'
    }
  },
  created() {
    //  getList().then( res => {
    //   console.log(res)
    // })
  },
  methods: {
    async getListData() {
      
    }
 }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
