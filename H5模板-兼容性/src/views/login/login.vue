<template>
  <div class="login-page">
    <img src="./../../assets/imgs/auction/img_pmdt_zb@3x.png" class="login-logo" />
    <div class="login-list border-b">
       <span class="input-lable">
         手机号
       </span>
       <input type="number" class="input-common" placeholder="请输入手机号码" />
    </div>
    <div class="login-list border-b">
       <span class="input-lable">
         验证码
       </span>
       <input type="number" class="input-common" placeholder="请输入验证码" />
       <span class="small-btn">获取验证码</span>
    </div>
    <div class="login-btn">登录</div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>

.login-page{
  width: 100vw;
  height: 100vh;
  background: #fff;
}
.login-logo{
  display: block;
  margin: 20px auto;
}
.login-list{
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
  .input-lable{
    display: inline-block;
    color: $blackColor;
    @include  font-dpr(36px);
    margin-left: 20px;
  }
  .input-common{
    display: inline-block;
    @include  font-dpr(36px);
    border: none;
    margin-left: 40px;
    margin-bottom: -5px;
    width: 340px;
  }
  .small-btn{
    display: inline-block;
    width: 200px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: $btnGradientBgColor;
    border-radius: 30px;
    @include  font-dpr(26px);
    color: #fff;
  }
}
 .login-btn{
    width:100%;
    height: 100px;
    line-height: 100px;
    color: #fff;
    text-align: center;
    background: $btnGradientBgColor;
    @include  font-dpr(38px);
    letter-spacing: 10px;
    border-radius: 50px;
    margin-top: 150px;
  }

</style>
