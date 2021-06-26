<template>
  <div class="login-page">
    <v-title></v-title>

    <steps :active="registerStep" class="register-step">
      <step title="验证手机号"></step>
      <step title="设置密码"></step>
      <step title="注册成功"></step>
    </steps>

    <div class="login-container" :class="{'left-hidden': registerStep !== 1}">
      <div class="login-form">
        <div class="form-item border-b">
          <label for="phone"><v-icon icon="tab_icon_my_sel"></v-icon></label>
          <input name="phone" type="number" v-model="codeForm.phone" placeholder="请输入手机号" @input="phonevalidator">
        </div>

        <div class="form-item item-verify border-b">
          <label for="code"><v-icon icon="tab_icon_my_sel"></v-icon></label>
          <input name="code" type="text" v-model="codeForm.code" placeholder="请输入验证码">
          <span v-if="canGetCode" class="verify-code" :class="{'code-disable': !codeStatus}" @click="getCodeHandler">获取验证码</span>
          <span v-else class="verify-code code-disable">{{countDown}}秒后重发</span>
        </div>
        
        <v-btn type="primary" @click="loginByCodeHandler" :disabled="!(codeForm.phone.length >= 11 && codeForm.code)">下一步</v-btn>
      </div>

      <div class="login-form password-form">
        <div class="form-item border-b">
          <label for="phone"><v-icon icon="tab_icon_my_sel"></v-icon></label>
          <input name="phone" type="password" v-model="passwordForm.userName" placeholder="请输入新密码(6-20位大小写字母、数字)" @input="passwordPhonevalidator">
        </div>

        <div class="form-item border-b">
          <label for="password"><v-icon icon="tab_icon_my_sel"></v-icon></label>
          <input name="password" type="password" v-model="passwordForm.password" placeholder="请再次输入密码" @input="passwordValidator">
        </div>

        <v-btn type="primary" @click="loginByPasswordHandler" :disabled="!(phoneStatus && passwordStatus)">立即注册</v-btn>
      </div>
    </div>

    <!--  -->
    <v-dlg :visible.sync="showDlg" >
      <p>该手机号未注册，是否注册为新的账号</p>
      <p slot="tool" class="dlg-tools">
        <span @touchstart.prevent="showDlg = false">不用了</span>
        <span class="tool-active" @touchstart.prevent="showDlg = false">前往注册</span>
      </p>
    </v-dlg>
  </div>
</template>

<script>
import { validatePhone } from '@/utils/validate'

import Steps from '@/components/Steps'
import Step from '@/components/Steps/step'

//import VerifyAPI from '@/api/verify'
import LoginAPI from '@/api/login'

export default {
  data() {
    return {
      activeName: 'loginByCode',

      codeStatus: false,
      canGetCode: true,
      countDownInterval: null,
      countDown: 0,

      showDlg: false,
      registerStep: 1,

      phoneStatus: false,
      passwordStatus: false,

      codeForm: {
        phone: '',
        code: ''
      },

      passwordForm: {
        userName: '',
        password: ''
      }
    }
  },
  components: {
    Steps,
    Step
  },
  methods: {
    phonevalidator(e) {
      const val = e.target.value
      if (val && val.length >= 11) {
        this.canGetCode = true
        this.codeStatus = true
      }
    },
    passwordPhonevalidator(e) {
      const val = e.target.value
      if (val && val.length > 0) {
        this.phoneStatus = true
      }
    },
    passwordValidator(e) {
      const val = e.target.value
      if (val && val.length > 0) {
        this.passwordStatus = true
      }
    },
    countDownHandler() {
      if (this.countDown > 0) {
        this.countDown--
      } else {
        this.canGetCode = true
        clearInterval(this.countDownInterval)
      }
    },
    /**
     * 获取登录验证码
     * @returns {void}
     */
    getCodeHandler() {
      if (this.canGetCode && this.codeStatus) {
        if (validatePhone(this.codeForm.phone)) {
          this.canGetCode = false
          this.countDown = 60
          // 触发定时器
          this.countDownInterval = setInterval(this.countDownHandler, 1000)
          // 请求短信验证接口 - 已注册
         /*  */
        } else {
          this.$message('请输入正确的手机号码')
        }
      }
    },
    /**
     * 验证码登录事件
     * @returns {void}
     */
    loginByCodeHandler() {
      this.registerStep++
    },
    /**
     * 密码登录事件
     * @returns {void}
     */
    loginByPasswordHandler() {
     
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-page{
    overflow: hidden;
  }

  .left-hidden{
    margin-left: -100%;
  }

  .register-step{
    margin: 40px 30px 100px;
  }

  .login-container{
    width: 200%;
    transition: margin .3s;

    .login-form{
      display: inline-block;
      vertical-align: top;
      width: 50%;
      padding: 0 30px;
      box-sizing: border-box;

      .v-btn{
        margin-top: 146px;
      }

      .forget-password{
        float: right;
        font-size: 30px;
        height: 30px;
        line-height: 30px;
        color: $primaryColor;
        margin-top: 30px;
        margin-bottom: -60px;
      }
    }

    .form-item{
      display: flex;

      label{
        text-align: center;
        margin-right: 30px;

        .v-icon{
          width: 56px;
          height: 56px;
          vertical-align: middle;
          border: 1px solid $blackColor-3;
          border-radius: 50%;
        }
      }

      input{
        font-size: 36px;
        padding-right: 20px;
      }
      
    }

    .item-verify{
      input{
        width: 384px;
      }

      .verify-code{
        display: inline-block;
        width: 200px;
        height: 80px;
        line-height: 80px;
        border: 2px solid $primaryColor;
        border-radius: 40px;
        color: $primaryColor;
        text-align: center;
        font-size: 28px;
      }

      .code-disable{
        color: $blackColor-3;
        border-color: $blackColor-3;
      }
    }

    .form-item,
    .form-item input{
      height: 100px;
      line-height: 100px;
      border: none;
    }

    .form-item + .form-item{
      margin-top: 20px;
    }
  }
  .password-form{
    input{
      width: 100%;
    }
  }
</style>
