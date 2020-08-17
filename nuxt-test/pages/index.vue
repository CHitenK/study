<template>
  <div class="container">
      <el-row :gutter="10" id="container-item">
         <el-col :xs="12" :sm="6" v-for="item in list" :key="item._id">
           <div class="product-item" >
             <img :src="item.imageUrl" />
             <div class="des">
                <span class="name" v-html="item.name" :title="item.name"  ></span>
                <span class="price">￥{{item.price}}</span>
             </div>
           </div>
           </el-col>
      </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getList } from '@/assets/api/index.ts'
import { ElTooltip } from 'element-ui/types/tooltip'
export default Vue.extend({
  async asyncData(context) {
    try {
      const res:any = await getList({page: 1, size: 12})
      let list: any[] = []
      let total:number = -1
      if (res.data && res.data.content) {
        list = res.data.content || []
        total = res.data.total
      }
      return { list, total  }
    } catch (err) {
      return { list: [], total: -1}
    }
  },
  data() {
    return {
      cando: true,
      page: 1
    }
  },
  mounted () {
    window.onscroll = () => {
      if (this.total < this.list.length) return false
      const scrollTop:number = document.documentElement.scrollTop || document.body.scrollTop
      const targetDom:any = document.getElementById('container-item')
      const hei:number = targetDom.clientHeight
      if (hei - scrollTop < (80 + window.screen.height) && this.cando) {
        this.cando = false
        const page:number = this.page + 1
        this.getListData(page)
      }
    }
  },
  created() {
  },
  methods: {
    getListData(page:number):void {
      getList({page: page, size: 12}).then((res:any) =>{
        if (res.data.content) {
          this.list = [...this.list, ...res.data.content]
          this.total = res.data.total
          this.page = page
        }
      }).catch((res:any) => {

      }).finally(() => {
        setTimeout(() => {
          this.cando = true
        }, 1500)
      })
    }
 }
})
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
}
.product-item{
  width: 100%;
  /* border: solid 1px #eaeaea; */
  margin-bottom: 0.2rem;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  
}
.product-item img{
  width: 100%;
  height: auto; 
  cursor: pointer;
  border: solid 1px #eaeaea;
  padding: 0;
  margin: 0;
}
.des{
  width: 100%;
  font-size: 0.14rem;
  height: 0.6rem;
  cursor: pointer;
  border: solid 1px #eaeaea;
  border-top: 0;
  padding: 0.05rem;
  box-sizing: border-box;
}
.price{
  font-size: 0.16rem;
  color: red;
}
.name{
  margin-right: 0.05rem;
  width: 100%;
  display: block;
}
/* 移动端 */
@media screen and (max-width: 767px) {
    .container {
        width: 100%;
    }
    .des{
      height: 1rem;
    }
    
}

@media screen and (max-width: 1180px) {
    .container {
        width: 100%;
    }
    .name{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
}
@media screen and (min-width: 1181px) {
    .container {
        width: 1180px;
    }
    .name{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
}
</style>
