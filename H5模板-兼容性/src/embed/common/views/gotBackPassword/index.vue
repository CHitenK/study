<template>
  <div class="login-page">
    <v-title></v-title>

    <div class="login-container" :class="{'left-hidden': nextStep === 1}">
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

        <v-btn type="primary" @click="validatePhoneHandler" :disabled="!(codeForm.phone.length >= 11 && codeForm.code)">下一步</v-btn>
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

        <v-btn type="primary" @click="loginByPasswordHandler" :disabled="!(phoneStatus && passwordStatus)">确定</v-btn>
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

//import VerifyAPI from '@/api/verify'

export default {
  data() {
    return {
      activeName: 'loginByCode',

      codeStatus: false,
      canGetCode: true,
      countDownInterval: null,
      countDown: 0,

      showDlg: false,
      nextStep: 0,

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
     
    },
    /**
     * 验证码手机号码 - 步骤
     * @returns {void}
     */
    validatePhoneHandler() {
      this.nextStep++
      // VerifyAPI.forgetPasswrodVerify(this.codeForm).then(response => {
      // }).catch(e => {
      //   this.$message('短信验证码错误，请重新输入')
      // })
    },
    /**
     * 密码登录事件
     * @returns {void}
     */
    loginByPasswordHandler() {
      this.$message('修改密码')
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

  .login-container{
    width: 200%;
    transition: margin .3s;

    .login-form{
      display: inline-block;
      vertical-align: top;
      width: 50%;
      padding: 0 30px;
      margin: 80px 0px 0px;
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
