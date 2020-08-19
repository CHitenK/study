<template>
  <div class="container">
       <el-row :gutter="10" id="container-item">
         <el-col :xs="24" :sm="8">
           <div class="product-detail-img-box">

           </div>
         </el-col>
         <el-col :xs="24" :sm="12">
         </el-col>
         <el-col :xs="24" :sm="4">
         </el-col>
      </el-row>
  </div>
</template>
<style>
*{
  padding: 0;
  margin: 0;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  border: solid 1px red;
}
.product-detail-img-box{
  width: 100%;
  height: 300px;
  border: solid 1px red;
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
   
}
@media screen and (min-width: 1181px) {
    .container {
        width: 1180px;
    }
   
}
</style>
