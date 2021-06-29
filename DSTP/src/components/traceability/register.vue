<template>
    <div>
        <div class="bg_popup">
            <div class="register">
                <a href="javascript:;" class="close" @click="closeRegister"></a>
                <p class="title_register">{{$t('registered.accessSystem')}}</p>
                <div class="input_box">
                    <i class="icon icon_user"></i>
                    <input type="text" :placeholder="$t('registered.name')" v-model="userName">
                </div>
                <div class="input_box">
                    <i class="icon icon_user"></i>
                    <input type="text" :placeholder="$t('registered.companyName')" v-model="companyName">
                </div>
                <div class="input_box">
                    <i class="icon icon_phone"></i>
                    <input type="number" :placeholder="$t('registered.phoneNumber')" v-model="phone">
                </div>
                <div class="code_box">
                    <div class="code_con">
                        <i class="icon icon_phone"></i>
                        <input type="text":placeholder="$t('registered.verificationCode')" v-model="smsCode">
                    </div>
                    <a href="javascript:;"  class="get_code" v-show="show" @click="getCode">{{$t('registered.getVerificationCode')}}</a>
                    <a href="javascript:;" class="get_code" v-show="!show">{{count}}s</a>
                </div>
                <div class="input_box">
                    <i class="icon icon_email"></i>
                    <input type="text" :placeholder="$t('registered.email')" v-model="email">
                </div>
                <div class="input_box">
                    <i class="icon icon_password"></i>
                    <input type="password" :placeholder="$t('registered.password')" v-model="password">
                </div>
                <div class="input_box">
                    <i class="icon icon_password"></i>
                    <input type="password" :placeholder="$t('registered.confirmPassword')" v-model="passwordTwo">
                </div>
                <label class="check_box">
                    <input type="checkbox" v-model="consent">
                    <el-button type="text" @click="dialog = true">{{$t('registered.acceptService')}}</el-button>
                </label>
                <a href="javascript:;" class="btn_submit" @click="submit">{{$t('registered.signUp')}}</a>
                <p class="account_login"><a href="javascript:;" @click="toLogin">{{$t('registered.registeredsignIn')}} ></a></p>
            </div>
        </div>
        <el-dialog :visible.sync="dialog" :width="width" center>
            <div class="register-content-s">
                <div v-html="terms.html"></div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialog = false">{{$t('form.ok')}}</el-button>
            </span>
        </el-dialog>
    </div>

</template>
<script>
    import { Api } from '@/assets/js/api'
    import { MessageBox } from 'element-ui';
    export default {
        components: { },
        data() {
            return {
                userName: '',
                companyName: '',
                phone: '',
                password: '',
                passwordTwo: '',
                consent: false,
                show: true,
                count: '',
                timer: null,
                captcha: '',
                smsCode: '',
                dialog: false,
                width: "80%",
                terms: '',
                isSubmit: false, // 防止重复提交
                email: ''
            };
        },
        computed:{
            verify:function () {
                if(!this.userName){
                    return {"flag":false,"msg":''+this.$t('registered.companyName')};
                }
                if(!this.companyName){
                    return {"flag":false,"msg":''+this.$t('registered.companyName')};
                }
                if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[0-9])\d{8}$/.test(this.phone)){
                    return {"flag":false,"msg":''+this.$t('registered.phoneNumber')};
                }
                if(!this.smsCode){
                    return {"flag":false,"msg":''+this.$t('registered.vCode')};
                }
                if(this.smsCode != this.captcha){
                    return {"flag":false,"msg":''+this.$t('registered.verificationCodeError')};
                }
                if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.email)) {
                    return {"flag": false, "msg": '' + this.$t('registered.email')};
                }
                if( !/^[0-9A-Za-z]{6,12}$/.test(this.password)){
                    return {"flag":false,"msg":''+this.$t('registered.lettersNnumbers')};
                }
                if(this.password != this.passwordTwo){
                    return {"flag":false,"msg":''+this.$t('registered.inconsistentPassword')};
                }
                if(!this.consent){
                    return {"flag":false,"msg":''+this.$t('registered.conditions')};
                }
                return {"flag":true,"msg":'ok'};
            }
        },
        methods:{
            getCode(){
                if(this.phone == ''){
                    this.$message.error(""+this.$t('registered.phoneNumber'));
                    return;
                }else if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[0-9])\d{8}$/.test(this.phone)){
                    this.$message.error(""+this.$t('registered.pNumber'));
                    return;
                }
                Api.smsOrigin({
                    tel: this.phone
                }).then(res => {
                    let data = res[1]
                    if(data && data.result === 1){
                        this.captchaId = data.data.id
                        this.captcha = data.data.captcha
                        const TIME_COUNT = 120;
                        if (!this.timer) {
                            this.count = TIME_COUNT;
                            this.show = false;
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= TIME_COUNT) {
                                    this.count--;
                                } else {
                                    this.show = true;
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
            submit(){
                if(this.isSubmit == true){
                    return
                }
                if(!this.verify.flag){
                    this.$message.error(this.verify.msg);
                }else{
                    this.isSubmit = true
                    Api.register({
                        userName: this.userName,
                        companyName: this.companyName,
                        phone: this.phone,
                        password: this.password,
                        captchaId: this.captchaId,
                        captcha: this.smsCode,
                        email: this.email
                    }).then(res => {
                        let data = res[1]
                        if(data && data.result === 1){
                            const h = this.$createElement;
                            this.$msgbox({
                                title: ""+this.$t('other.reminder'),
                                message: h('p', null, [
                                    h('span', { style: 'font-size: 16px' }, ""+this.$t('registered.registrationSuccessful'))
                                ]),
                                center: true,
                                confirmButtonText: ''+this.$t('form.ok'),
                                callback: action => {
                                    this.$emit('registerParams',{from: 1, toJoin: true, phone: this.phone}) // 1为提交按钮，2为已注册，账号登录
                                }
                            })
                            this.isSubmit = false
                        } else {
                            this.$message.error(data.message);
                            console.log('请求失败')
                        }

                    })
                }
            },
            closeRegister(){
                this.$emit('registerParams',{from: 2, toJoin: false}) // 1为提交按钮，2为已注册，账号登录
            },
            toLogin(){
                this.$emit('registerParams',{from: 2, toJoin: true}) // 1为提交按钮，2为已注册，账号登录
            }
        },
        mounted(){
            Api.registrationTerms().then(res => {
                let data = res[1]
                if(data && data.result === 1){
                    this.terms = data.data
                }
            })
            if(document.documentElement.clientWidth > 768){
                this.width = '50%'
            }
        },
    };
</script>
<style lang="less" scoped>
    .logo_bar{
        height: 90px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .en{
        font-size: 12px;
    }
    .btn_back{
        width: 120px;
        height: 36px;
        border-radius: 18px;
        text-align: center;
        line-height: 36px;
        border: 1px solid #d4d4d4;
        display: block;
        color: #333;
    }
    .title_register{
        font-size: 0.18rem;
        text-align: center;
        padding: 20px 0;
    }
    .register{
        width: 450px;
        background: #f3f3f3;
        margin: 0 auto;
        padding: 30px 0;
        position: absolute;top: 50%;left: 50%;margin: -297px 0 0 -225px;
    }
    .input_box{
        width: 310px;
        background: #fff;
        height: 40px;
        border-radius: 20px;
        margin: 0 auto 15px auto;
        padding-left: 40px;
        position: relative;
    }
    .input_box input{
        height: 100%;
        outline: none;
        width: 100%;
        border: none;
        background: transparent;
    }
    .code_box{
        width: 310px;margin: 0 auto 15px auto;
        display: flex;
        justify-content: space-between;
    }
    .code_con{
        background: #fff;
        height: 40px;
        border-radius: 20px;
        padding-left: 40px;
        width: 180px;
        position: relative;
    }
    .code_con input{
        height: 100%;
        outline: none;
        width: 100%;
        border: none;
        background: transparent;
    }
    .get_code{
        color: #fff;
        background: #a9a9a9;
        width: 116px;
        line-height: 40px;
        border-radius: 20px;
        text-align: center;
        display: block;
        font-size: 0.12rem;
    }
    .btn_submit{
        width: 310px;
        line-height: 40px;
        border-radius: 20px;
        color: #fff;
        background: #0062fe;
        text-align: center;
        display: block;
        margin: 10px auto 0 auto;
    }
    .account_login{
        text-align: center;
        margin-top: 20px;
    }
    .account_login a{
        color: #0062fe;
    }
    .check_box{
        width: 300px;
        margin: 0 auto;
        display: block;
        font-weight: normal;
        font-size: 12px;
        &:first-of-type{margin-bottom: 10px;}
    }
    .check_box input{
        position: relative;
        top: 2px;
    }
    .icon{
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        left: 0;
    }
    .bg{
        width: 100%;
        background: url("@{imgUrl}bg_register.png") center no-repeat;
        background-size: cover;
        padding: 40px 0;
        display: flex;
        align-items: center;
    }
    .icon_user{
        background: url("@{imgUrl}icon_user.png") center no-repeat;
    }
    .icon_phone{
        background: url("@{imgUrl}icon_phone.png") center no-repeat;
    }
    .icon_password{
        background: url("@{imgUrl}icon_password.png") center no-repeat;
    }
    .icon_email{
        background: url("@{imgUrl}mail-icon.png") center no-repeat;
    }
    .register-content-s{
        .media-font(0.20rem);
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input[type="number"] { -moz-appearance: textfield;}
    .el-button--text{padding: 0;}
    .bg_popup{width: 100%;height: 100%;position: fixed;background: rgba(0,0,0,0.5);top: 0;left: 0;z-index: 1000;}
    .close{width: 20px;height: 20px;background: url("@{imgUrl}icon_menu_close.png") center no-repeat;background-size: 100%;position: absolute;top: 10px;right: 10px;}
    @media (max-width: 768px){
        .register{width: 100%;left: 0;margin: 0;top: 10%;}
        .title_register{font-size: 0.4rem;}
        .logo_bar{padding: 0 10px;}
        .bg{padding: 0;}
    }
</style>