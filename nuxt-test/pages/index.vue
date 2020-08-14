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
  border: solid 1px red;
  height: 100vh;
  overflow-y: auto;
}
/* 移动端 */
@media screen and (max-width: 767px) {
    .container {
        width: 100%;
    }
}

@media screen and (max-width: 1180px) {
    .container {
        width: 100%;
    }
}
@media screen and (min-width: 1181px) {
    .container {
        width: 1180px;
    }
}
</style>
