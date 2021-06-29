<style scoped lang="less">
    .leaving-msg-bc{
        position: fixed;
        width: 100%;
        height:100%;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 99;
    }
    .leaving-content{
        .home-center;
        .padding(0.5rem,1rem);
        position: fixed;
        width: 6rem;
        z-index: 100;
        background: #F3F3F3;
        .hot-line{
          padding: 0.2rem 0.4rem;
          .line-num{
            margin-left: 0.2rem;
            color:  #0062FE;
          }
        }
        h4{
            .media-font(0.24rem);
            text-align: center;
            color: #444444;
            margin-bottom: 0.1rem;
            font-family: regular;
        }
        .icon{
            width: 40px;
            height: 40px;
            position: absolute;
            top: 0;
            left: 0;
        }
        .leaving-close{
            position: absolute;
            cursor: pointer;
            right:0.1rem;
            top:0.1rem;
            width: 32px;
            height: 32px;
            line-height: 32PX;
            text-align: center;
            font-size:14px;
            background: #E5E5E5;
            color:#444;
            overflow: hidden;
            border-radius: 50%;
            &:before{
                .home-center;
            }
        }
        .leaving-input{
            width: 100%;
            background: #fff;
            height: 40px;
            border-radius: 20px;
            margin: 0 auto 15px auto;
            padding-left: 40px;
            position: relative;
            input{
                height: 100%;
                outline: none;
                width: 100%;
                border: none;
                background: transparent;
            }
        }
        .icon_user{
            background: url("@{imgUrl}icon_user.png") center no-repeat;
        }
        .icon_phone{
            background: url("@{imgUrl}icon_phone.png") center no-repeat;
        }
        .icon_gs-icon{
            background: url("@{imgUrl}gs-icon.png") center no-repeat;
        }
        .icon_career-icon{
          background: url("@{imgUrl}career-icon.png") center no-repeat;
        }
        .icon_mail-icon{
          background: url("@{imgUrl}mail-icon.png") center no-repeat;
        }
        .icon_role-icon{
          background: url("@{imgUrl}role-icon.png") center no-repeat;
        }
        .leaving-checkbox{
            font-size:12px;
            white-space: nowrap;
            margin-bottom: 0.2rem;
            margin-top: 0.1rem;
            label{
                color:#444;
                cursor: pointer;
                padding-left: 30px;
                background: url("@{imgUrl}checkbox.jpg") no-repeat left center;
                background-size: 18px 18px;
                &.on{
                    background-image: url("@{imgUrl}checkbox_on.jpg");
                }
            }
            a{
                color:#4189fb
            }
        }
        .leaving-button{
            display: inline-block;
            width: 50%;
            height:40px;
            color:#fff;
            font-size: 14px;
            background: #0062FE;
            border-radius: 42.5px;
            line-height: 40px;
            min-width:3rem;
            cursor: pointer;
            margin-top: 0.2rem;
        }
    }
    .leaving_code_box {
        width: 100%;
        margin: 0 auto 15px auto;
        display: flex;
        justify-content: space-between;
    }

    .leaving_code_con {
        background: #fff;
        height: 40px;
        border-radius: 20px;
        padding-left: 40px;
        width: 230px;
        position: relative;
    }

    .leaving_code_con input {
        height: 100%;
        outline: none;
        width: 100%;
        border: none;
        background: transparent;
    }

    .get_code {
        color: #fff;
        background: #a9a9a9;
        width: 116px;
        line-height: 40px;
        border-radius: 20px;
        text-align: center;
        display: block;
        font-size: 0.12rem;
    }
    .leaving_check_box {
        display: block;
        font-weight: normal;
        font-size: 12px;

        input {
            position: relative;
            top: 2px;
        }

        /deep/ button {
            padding: 2px;
            span {
                color: #0062FE;
            }
        }
    }
    @media (max-width: 992px) {
        .leaving-content{
            .padding(0.3rem,0.5rem);
        }
    }
    @media (max-width: 767px) {
        .leaving-content{
            width: 80%;
            .leaving-input{
                padding-left: 30px;
                height: 30px;
            }
            .icon{
                width: 30px;
                height:30px;
            }
            .leaving-button{
                height:30px;
                line-height: 30px;
                width: 100%;
            }
        }
        .leaving_code_con{
            height: 30px;
        }
        .leaving_code_con{padding-left: 30px;}
        .get_code{line-height: 30px;}
    }
</style>
<template>
    <div class="leaving" v-show="show">
        <div class="leaving-msg-bc" @click="toHide"></div>
        <div class="leaving-content">
            <div @click="toHide" class="leaving-close iconfont icon-guanbi"></div>
            <h4>{{$t('other.join')}}</h4>
            <div class="hot-line">{{$t('other.hotline')}}<span class="line-num">400-847-9898</span> </div>
            <div class="leaving-form">
                <div class="leaving-input">
                    <i class="icon icon_user"></i>
                    <input v-model="subObj.userName" type="text" :placeholder="$t('registered.name')">
                </div>
                <div class="leaving-input">
                    <i class="icon icon_phone"></i>
                    <input v-model="subObj.tel" type="text" :placeholder="$t('registered.phoneNumber')">
                </div>
                <div class="leaving_code_box">
                    <div class="leaving_code_con">
                        <i class="icon icon_phone"></i>
                        <input AUTOCOMPLETE="off" type="text" :placeholder="$t('registered.verificationCode')"
                               v-model="subObj.captcha">
                    </div>
                    <a href="javascript:;" class="get_code"
                       v-show="showText" @click="getCode">{{$t('registered.getVerificationCode')}}</a>
                    <a href="javascript:;" class="get_code" v-show="!showText">{{count}}s</a>
                </div>
                <div class="leaving-input">
                    <i class="icon icon_gs-icon"></i>
                    <input v-model="subObj.companyName" type="text" :placeholder="$t('registered.companyName')">
                </div>
                <div class="leaving-input">
                    <i class="icon icon_career-icon"></i>
                    <input v-model="subObj.position" type="text" :placeholder="$t('registered.position')">
                </div>
                <div class="leaving-input">
                    <i class="icon icon_mail-icon"></i>
                    <input v-model="subObj.emil" type="text" :placeholder="$t('registered.emailAddress')">
                </div>
                <div class="leaving-input">
                    <i class="icon icon_role-icon"></i>
                    <!-- <input v-model="subObj.companyName" type="text" placeholder="请输入公司名称"> -->
                    <el-select v-model="subObj.roles" :placeholder="$t('registered.optionalRole')" @change="handleChecked">
                    <el-option
                      v-for="item in roleOptions"
                      :key="item.name"
                      :label="item.name"
                      :value="item.title">
                    </el-option>
                  </el-select>
                </div>
                <div>
                    <label class="leaving_check_box">
                        <input type="checkbox" v-model="consent">
                        <el-button type="text" @click="dialogShow">{{$t('registered.acceptService')}}</el-button>
                    </label>
                    <label class="leaving_check_box" v-if="isCertificate">
                        <input type="checkbox" v-model="certificateConsent">
                        <el-button type="text" @click="dialogShow(1)">已阅读并同意授权</el-button>
                    </label>
                </div>
                <!--<div class="leaving-checkbox">
                    <label @click="checkbox = !checkbox" :class="{on:checkbox}">阅读并同意</label>
                    <a href="" target="_blank">《免责声明》</a>
                </div>-->
                <div class="ac">
                    <span @click="settleDo" class="leaving-button">{{$t('form.submit')}}</span>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="dialog" :width="width" center>
            <div class="register-content-s">
                <div v-html="dialogHtml"></div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialog = false">{{$t('form.ok')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import {Api} from '@/assets/js/api_kz'
  import {Api as Api_index} from '@/assets/js/api'
  import { MessageBox , Select } from 'element-ui';
  export default {
    name: 'Leaving',
    data() {
      return {
        roleOptions:[],
        show: false,
        checkbox: false,
        showText: true,
        count: '',
        captcha: '',
        consent: false,
        dialog: false,
        width: "80%",
        terms: '',
        isCertificate: false, // 角色是否为工厂
        certificateHtml: '', // 授权书html,
        certificateConsent: '', // 授权书html
        dialogHtml: '',
        subObj: {userName: '', tel: '', companyName: '',position:'',emil:'',roles:'',captchaId: '',captcha: ''},
        isSubmit: false, // 防止重复提交
      }
    },
    created(){
    },
    methods:{
      verify:function (obj) {
        if(!obj.userName){
          return {"flag":false,"msg":''+this.$t('registered.name')};
        }
        if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[0-9])\d{8}$/.test(obj.tel)){
          return {"flag":false,"msg":''+this.$t('registered.phoneNumber')};
        }
        if(!obj.companyName){
          return {"flag":false,"msg":''+this.$t('registered.companyName')};
        }
        if (!obj.position){
          return {"flag":false,"msg":''+this.$t('registered.position')};
        }
          if (!obj.captcha) {
              return {"flag": false, "msg": '' + this.$t('registered.vCode')};
          }
          if (obj.captcha != this.captcha) {
              return {"flag": false, "msg": '' + this.$t('registered.verificationCodeError')};
          }
          if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(obj.emil)){
              return {"flag":false,"msg":''+this.$t('registered.emailAddress')};
          }
        if (!obj.roles){
          return {"flag":false,"msg":''+this.$t('registered.oRole')};
        }
        if (!this.consent) {
          return {"flag": false, "msg": '' + this.$t('registered.conditions')};
        }
      if (this.isCertificate && !this.certificateConsent) {
          return {"flag": false, "msg": '请勾选已阅读并同意授权'};
      }
        return {"flag":true,"msg":'ok'};
      },
      settleDo(){
        if(this.isSubmit == true){
            return
        }
        let msgObj = this.verify(this.subObj)
        if(!msgObj.flag){
          this.$message.error(msgObj.msg);
        }else{
            this.isSubmit = true
            Api.settleDo(this.subObj).then(res=>{
            let data = res[1]
            if(data && data.result === 1){
              const h = this.$createElement;
              this.$msgbox({
                title: ''+this.$t('other.reminder'),
                message: h('p', null, [
                  h('span', { style: 'font-size: 16px' }, data.data)
                ]),
                center: true,
                confirmButtonText: ''+this.$t('other.ok'),
              })
              this.toHide()
              this.subObj = {userName: '', tel: '', companyName: '',position:'',emil: '',role:''}
              this.isSubmit = false
            }else{
              this.$message.error(''+this.$t('other.failJoin'));
            }
          })
        }
      },
        getCode() {
            if (this.subObj.tel == '') {
                this.$message.error("" + this.$t('registered.phoneNumber'));
                return;
            } else if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[0-9])\d{8}$/.test(this.subObj.tel)) {
                this.$message.error("" + this.$t('registered.pNumber'));
                return;
            }
            Api_index.smsVerification({
                tel: this.subObj.tel
            }).then(res => {
                let data = res[1]
                if (data && data.result === 1) {
                    this.subObj.captchaId = data.data.id
                    this.captcha = data.data.captcha
                    const TIME_COUNT = 120;
                    if (!this.timer) {
                        this.count = TIME_COUNT;
                        this.showText = false;
                        this.timer = setInterval(() => {
                            if (this.count > 0 && this.count <= TIME_COUNT) {
                                this.count--;
                            } else {
                                this.showText = true;
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }, 1000)
                    }
                } else {
                    this.$message.error(data.message);
                    console.log('请求失败')
                }
            })
        },
        getRoles(){
            Api_index.settleRoles().then(res => {
              let data = res[1]
              if (data && data.result === 1) {
                  this.roleOptions = data.data
              }
          })
        },
        dialogShow(type) { // 显示弹窗
            const that = this
            if (type === 1) { // 授权书内容
                that.dialogHtml = that.certificateHtml
            }else{ // 注册须知
                that.dialogHtml = that.terms.html
            }
            that.dialog = true
        },
        handleChecked(val){
            if(val == '1'){
                this.isCertificate = true
            }else{
                this.isCertificate = false
            }
        },
        getWarrant(){ // 授权书
            Api.warrant().then(res => {
                let data = res[1]
                if (data && data.result === 1) {
                    this.certificateHtml = data.data.html
                }
            })
        },
      toShow () {
        this.show = true
      },
      toHide(){
        this.show = false
      }
    },
    mounted(){
        this.getWarrant()
        this.getRoles()
        Api_index.registrationTerms().then(res => {
            let data = res[1]
            if (data && data.result === 1) {
                this.terms = data.data
            }
        })
        if (window.localStorage.getItem('lang') == 'en') {
            this.$i18n.locale = 'en'
        } else {
            this.$i18n.locale = 'cn'
        }
    }
  }
</script>
