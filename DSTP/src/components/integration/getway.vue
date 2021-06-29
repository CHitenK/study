
<template>
  <div class="leaving" v-show="show">
      <div class="leaving-msg-bc" @click="toHide"></div>
      <div class="leaving-content">
          <div @click="toHide" class="leaving-close iconfont icon-guanbi"></div>
          <h4>{{$t('other.signUp')}}</h4>
          <div class="leaving-form">
              <p class="consult_title">{{$t('other.name')}}({{$t('form.required')}})</p>
              <div class="leaving-input">
                  <i class="icon icon_user"></i>
                  <input v-model="userName" type="text" :placeholder="$t('registered.name')">
              </div>
              <p class="consult_title">{{$t('other.phoneNumber')}}({{$t('form.required')}})</p>
              <div class="leaving-input">
                  <i class="icon icon_phone"></i>
                  <input v-model="tel" type="text" :placeholder="$t('registered.phoneNumber')">
              </div>
              <p class="consult_title">{{$t('other.industry')}}</p>
              <div class="leaving-input">
                  <i class="icon icon_gs-icon"></i>
                  <input v-model="industry" type="text" :placeholder="$t('other.yourIndustry')">
              </div>
              <p class="consult_title">{{$t('other.serviceDemand')}}({{$t('form.required')}})</p>
              <div class="leaving-input leaving-input-ot" ref="leavingSelect">
                <i class="icon icon_gs-icon"></i>
                <el-select v-model="name" :placeholder="$t('other.yourServiceDemand')" style="width:100%" @focus="clearContent" @blur="selectBlur">
                  <el-option
                    v-for="item in demandOptions"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                <!-- <input type="text" placeholder="请输入您的要求" v-model="demand" /> -->
            </div>
              <div class="ac">
                  <span @click="submit" class="leaving-button">{{$t('registered.signUp')}}</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  import { Api } from "@/assets/js/api";
  import { MessageBox } from 'element-ui';
  import { connect } from 'tls';
  export default {
    name: 'Leaving',
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        demandOptions: [],
        name: '',
        industry: '',
        tel: '',
        userName: '',
        isSubmit: false, // 防止重复提交
      }
    },
    watch: {
      show() {
        // 重置
        this.industry = ''
        this.tel = ''
        this.userName = ''
        this.name = ''
      }
    },
    mounted() {
      // 解决样式问题
      const leavingSelect = this.$refs.leavingSelect
      if (leavingSelect) {
        const input = leavingSelect.getElementsByTagName('input')
        input[0].style = input[0].style + '; border:0; background: transparent;'
      }
      // 获取数据
      this.expertOnline()
    },
    methods:{
      submit() {
        if(this.isSubmit == true){
            return
        }
        if(!this.userName){
          this.$message.error(''+this.$t('registered.name'))
          return false
        }
        if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[0-9])\d{8}$/.test(this.tel)){
          this.$message.error(''+this.$t('registered.pNumber'))
          return false
        }
        if (!this.name) {
           this.$message.error(''+this.$t('other.yourServiceDemand'))
          return false
        }
          this.isSubmit = true
          Api.setScheme({
          userName: this.userName,
          tel: this.tel,
          industry: this.industry,
          demand: this.name
        }).then(res => {
            let data = res[1];
            if (data && data.result === 1) {
              const h = this.$createElement;
              this.$msgbox({
                title: ''+this.$t('other.reminder'),
                message: h('p', null, [
                  h('span', { style: 'font-size: 16px' }, this.$t('other.submit') + '！')
                ]),
                center: true,
                confirmButtonText: ''+ this.$t('other.ok'),
              })
              this.toHide()
              this.isSubmit = false
            } else {
              this.$message.error(data.message);
            }
        });
      },
      toHide(){
        this.$emit('close')
      },
      expertOnline() {
        Api.demandList().then(res => {
          const data = res[1]
          if (data && data.result === 1) {
            this.demandOptions = data.data.columnList
          }
        });
     },
     clearContent(){
        this.name = ''
      },
      selectBlur(e){
        this.name = e.target.value
      }
    }
  }
</script>
<style scoped lang="less">
    .consult_title {
        font-size: 0.16rem;
        color: #444;
        line-height: 0.4rem;
        padding-left: 0.2rem;
        position: relative;
        &:after {
            content: "";
            width: 3px;
            height: 14px;
            background: #0062fe;
            position: absolute;
            display: block;
            left: 0;
            top: 50%;
            margin-top: -7px;
        }
    }
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
        z-index: 1000;
        background: #F3F3F3;
        h4{
            .media-font(0.24rem);
            text-align: center;
            color: #444444;
            margin-bottom: 0.3rem;
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
            font-size:20px;
            background: #E5E5E5;
            color:#444;
            overflow: hidden;
            border-radius: 50%;
            text-align: center;
            line-height: 32px;
          /*  &:before{
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%,-50%);
              -moz-transform: translate(-50%,-50%);
              -webkit-transform: translate(-50%,-50%);
              content: "x";
            }*/
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
        .leaving-text{
            textarea{
                width: 100%;
                height: 2rem;
                padding:0.1rem;
                background: #FFFFFF;
                border-radius: 8px;
                border:none;
                outline: none;
            }
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
        /deep/ .el-select .el-input__inner{font-size: 0.3rem;padding-left: 0;}
    }
</style>