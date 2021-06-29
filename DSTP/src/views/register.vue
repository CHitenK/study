<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="logo_bar">
                    <div class="logo">
                        <p>{{$t('other.pervicePlatform')}}</p>
                        <p class="en" v-if="$i18n.locale == 'cn'">DIGITAL SERVICES TRADE PLATFORM</p>
                    </div>
                    <router-link to="/" class="btn_back">{{$t('other.home')}}</router-link>
                </div>
            </div>
        </div>
        <div class="bg">
            <div class="register">
                <p class="title_register">{{$t('registered.createAccount')}}</p>
                <div :class="['checkBoxRole',{'left-text': cities.length>3}]">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="(item, index) in cities" :label="item.id" :key="index">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="input_box">
                    <i class="icon icon_user"></i>
                    <input type="text" :placeholder="$t('registered.name')" v-model="userName">
                </div>
                <div class="input_box">
                    <i class="icon icon_user"></i>
                    <input AUTOCOMPLETE="off" type="text" :placeholder="$t('registered.companyName')"
                           v-model="companyName">
                </div>
                <div class="input_box">
                    <i class="icon icon_phone"></i>
                    <input AUTOCOMPLETE="off" type="number" :placeholder="$t('registered.phoneNumber')" v-model="phone">
                </div>
                <div class="code_box">
                    <div class="code_con">
                        <i class="icon icon_phone"></i>
                        <input AUTOCOMPLETE="off" type="text" :placeholder="$t('registered.verificationCode')"
                               v-model="smsCode">
                    </div>
                    <a href="javascript:;" class="get_code"
                       v-show="show" @click="getCode">{{$t('registered.getVerificationCode')}}</a>
                    <a href="javascript:;" class="get_code" v-show="!show">{{count}}s</a>
                </div>
                <div class="inputHideContent">
                    <input type="text" name="hidden1">
                    <input type="password" name="hidden2">
                </div>
                <div class="input_box">
                    <i class="icon icon_email"></i>
                    <input type="text" :placeholder="$t('registered.email')" v-model="email">
                </div>
                <div class="input_box">
                    <i class="icon icon_password"></i>
                    <input type="password" AUTOCOMPLETE="off" :placeholder="$t('registered.password')"
                           v-model="password">
                </div>
                <div class="input_box">
                    <i class="icon icon_password"></i>
                    <input type="password" :placeholder="$t('registered.confirmPassword')" v-model="passwordTwo">
                </div>
                <div class="checkAccept">
                    <label class="check_box">
                        <input type="checkbox" v-model="consent">
                        <el-button type="text" @click="dialogShow">{{$t('registered.acceptService')}}</el-button>
                    </label>
                    <label class="check_box" v-if="isCertificate">
                        <input type="checkbox" v-model="certificateConsent">
                        <el-button type="text" @click="dialogShow(1)">已阅读并同意授权</el-button>
                    </label>
                </div>
                <a href="javascript:;" class="btn_submit" @click="submit">{{$t('registered.signUp')}}</a>
                <p class="account_login"><a :href="loginUrl" target="_blank">{{$t('registered.signIn')}} ></a></p>
            </div>
        </div>
        <Footers v-on:getFooterMsg="showFooterMsg"></Footers>
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
    import {Api} from '@/assets/js/api'
    import {Api as Api_kz} from '@/assets/js/api_kz'

    export default {
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
                loginUrl: '', // 登录地址
                metaTitle: '',
                terms: '',
                cities: [],
                checkedCities: [],
                isCertificate: false, // 角色是否为工厂
                certificateHtml: '', // 授权书html,
                certificateConsent: '', // 授权书html
                dialogHtml: '',
                isSubmit: false, // 防止重复提交
                email: ''
            };
        },
        computed: {
            verify: function () {
//                if (this.checkedCities.length === 0 || this.checkedCities[0] === undefined) {
//                    return {"flag": false, "msg": '请勾选要注册的角色'};
//                }
                if (!this.userName) {
                    return {"flag": false, "msg": '' + this.$t('registered.name')};
                }
                if (!this.companyName) {
                    return {"flag": false, "msg": '' + this.$t('registered.companyName')};
                }
                if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[0-9])\d{8}$/.test(this.phone)) {
                    return {"flag": false, "msg": '' + this.$t('registered.phoneNumber')};
                }
                if (!this.smsCode) {
                    return {"flag": false, "msg": '' + this.$t('registered.vCode')};
                }
                if (this.smsCode != this.captcha) {
                    return {"flag": false, "msg": '' + this.$t('registered.verificationCodeError')};
                }
                if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.email)) {
                    return {"flag": false, "msg": '' + this.$t('registered.email')};
                }
                if (!/^[0-9A-Za-z]{6,12}$/.test(this.password)) {
                    return {"flag": false, "msg": '' + this.$t('registered.lettersNnumbers')};
                }
                if (this.password != this.passwordTwo) {
                    return {"flag": false, "msg": '' + this.$t('registered.inconsistentPassword')};
                }
                if (!this.consent) {
                    return {"flag": false, "msg": '' + this.$t('registered.conditions')};
                }
//                if (this.isCertificate && !this.certificateConsent) {
//                    return {"flag": false, "msg": '请勾选已阅读并同意授权'};
//                }

                return {"flag": true, "msg": 'ok'};
            }
        },
        methods: {
            handleCheckedCitiesChange(value) {
                const thatVal = value.pop()
                const that = this
                that.checkedCities = [thatVal]
                that.isCertificate = (thatVal === this.cities.find(e => e.name === '工厂').id)
                that.consent = false
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
            getCode() {
                if (this.phone == '') {
                    this.$message.error("" + this.$t('registered.phoneNumber'));
                    return;
                } else if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[0-9])\d{8}$/.test(this.phone)) {
                    this.$message.error("" + this.$t('registered.pNumber'));
                    return;
                }
                Api.smsVerification({
                    tel: this.phone
                }).then(res => {
                    let data = res[1]
                    if (data && data.result === 1) {
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
            submit() {
                if(this.isSubmit == true){
                    return
                }
                if (!this.verify.flag) {
                    this.$message.error(this.verify.msg);
//                    const h = this.$createElement;
//                    this.$msgbox({
//                        title: '提示',
//                        message: h('p', null, [
//                            h('span', { style: 'font-size: 16px' }, this.verify.msg)
//                        ]),
//                        center: true,
//                        confirmButtonText: '确定',
//                    });
                } else {
                    this.isSubmit = true
                    Api.register({
                        userName: this.userName,
                        companyName: this.companyName,
                        phone: this.phone,
                        password: this.password,
                        captchaId: this.captchaId,
                        captcha: this.smsCode,
                        email: this.email
//                        clientRole: this.checkedCities[0]
                    }).then(res => {
                        let data = res[1]
                        if (data && data.result === 1) {
                            const h = this.$createElement;
                            this.$msgbox({
                                title: "" + this.$t('other.reminder'),
                                message: h('p', null, [
                                    h('span', {style: 'font-size: 16px'}, "" + this.$t('registered.registrationSuccessful'))
                                ]),
                                center: true,
                                confirmButtonText: '' + this.$t('form.ok'),
                                callback: action => {
                                    this.$router.push('/')
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
            showFooterMsg(value) {
                document.getElementsByClassName("bg")[0].style.cssText = "min-height: " + (document.documentElement.clientHeight - value - 90) + "px";
            },
            getRoles() { // 角色列表
                Api_kz.roles().then(res => {
                    let data = res[1]
                    if (data && data.result === 1) {
                        let temp = []
                        for (let v of data.data[0].columnList) {
                            temp.push({name: v.name, id: v.title})
                        }
                        this.cities = temp
                    }
                })
            },
            getWarrant(){ // 授权书
                Api_kz.warrant().then(res => {
                    let data = res[1]
                    if (data && data.result === 1) {
                        this.certificateHtml = data.data.html
                    }
                })
            }
        },
        created() {
            this.loginUrl = (this.$i18n.locale === 'cn' ? process.env.VUE_APP_LOGIN_URL : process.env.VUE_APP_LOGIN_URL + '?language=' + this.$i18n.locale)
        },
        mounted() {
            Api.registrationTerms().then(res => {
                let data = res[1]
                if (data && data.result === 1) {
                    this.terms = data.data
                }
            })
            this.getRoles()
            this.getWarrant()
            if (document.documentElement.clientWidth > 768) {
                this.width = '50%'
            }
            if(this.$route.query.language == 'en'){
                window.localStorage.setItem('lang','en')
            }else{
                window.localStorage.setItem('lang','')
            }
            if (window.localStorage.getItem('lang') == 'en') {
                this.$i18n.locale = 'en'
            } else {
                this.$i18n.locale = 'cn'
            }
            this.metaTitle = this.$t('menu.clientRegistration')
        },
        // 配置title和meta数据
        metaInfo() {
            return {
                title: this.metaTitle,
                meta: [
                    {
                        name: "keywords",
                        content: ""
                    },
                    {
                        name: "description",
                        content: ""
                    }
                ]
            }
        }
    };
</script>
<style lang="less" scoped>
    .logo_bar {
        height: 90px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .en {
        font-size: 12px;
    }

    .btn_back {
        width: 120px;
        height: 36px;
        border-radius: 18px;
        text-align: center;
        line-height: 36px;
        border: 1px solid #d4d4d4;
        display: block;
        color: #333;
    }

    .title_register {
        font-size: 20px;
        text-align: center;
        padding: 20px 0;
    }

    .register {
        width: 450px;
        background: #f3f3f3;
        margin: 0 auto;
        padding-bottom: 30px;
    }

    .input_box {
        width: 310px;
        background: #fff;
        height: 40px;
        border-radius: 20px;
        margin: 0 auto 15px auto;
        padding-left: 40px;
        position: relative;
    }

    .input_box input {
        height: 100%;
        outline: none;
        width: 100%;
        border: none;
        background: transparent;
    }

    .code_box {
        width: 310px;
        margin: 0 auto 15px auto;
        display: flex;
        justify-content: space-between;
    }

    .code_con {
        background: #fff;
        height: 40px;
        border-radius: 20px;
        padding-left: 40px;
        width: 180px;
        position: relative;
    }

    .code_con input {
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

    .btn_submit {
        width: 310px;
        line-height: 40px;
        border-radius: 20px;
        color: #fff;
        background: #0062fe;
        text-align: center;
        display: block;
        margin: 0 auto;
    }

    .account_login {
        text-align: center;
        margin-top: 20px;
    }

    .account_login a {
        color: #0062fe;
    }

    .checkAccept{
        margin-bottom: 15px;
    }
    .check_box {
        width: 310px;
        margin: 0 auto;
        display: block;
        font-weight: normal;
        font-size: 12px;

        input {
            position: relative;
            top: 2px;
        }

        /deep/ button {
            padding: 5px;
            span {
                color: #0062FE;
            }
        }
    }

    .icon {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        left: 0;
    }

    .bg {
        width: 100%;
        background: url("@{imageUrl}bg_register.png") center no-repeat;
        background-size: cover;
        padding: 40px 0;
        display: flex;
        align-items: center;
    }

    .icon_user {
        background: url("@{imageUrl}icon_user.png") center no-repeat;
    }

    .icon_phone {
        background: url("@{imageUrl}icon_phone.png") center no-repeat;
    }

    .icon_password {
        background: url("@{imageUrl}icon_password.png") center no-repeat;
    }
    .icon_email{
        background: url("@{imageUrl}mail-icon.png") center no-repeat;
    }

    .register-content-s {
        .media-font(0.20rem);
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }

    .el-button--text {
        color: #0062fe;
        padding-left: 0.1rem;
    }

    .logo {
        font-family: regular;
    }

    .checkBoxRole {
        .marginLr(auto);
        width: 310px;
        margin-bottom: 15px;
        text-align: center;

        &.left-text {
            text-align: left;
        }
    }

    .inputHideContent {
        overflow: hidden;
        width: 0;
        height: 0;

        .inputHide {

        }
    }

    @media (max-width: 768px) {
        .register {
            width: 100%;
        }

        .logo_bar {
            padding: 0 10px;
        }

        .bg {
            padding: 0;
        }

        .get_code {
            font-size: 0.32rem;
        }
    }
</style>
