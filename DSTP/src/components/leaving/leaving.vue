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
    }
</style>
<template>
    <div class="leaving" v-show="show">
        <div class="leaving-msg-bc" @click="toHide"></div>
        <div class="leaving-content">
            <div @click="toHide" class="leaving-close iconfont icon-guanbi"></div>
            <h4>{{$t('other.messageBox')}}</h4>
            <div class="leaving-form">
                <div class="leaving-input">
                    <i class="icon icon_user"></i>
                    <input v-model="subObj.userName" type="text" :placeholder="$t('registered.name')">
                </div>
                <div class="leaving-input">
                    <i class="icon icon_phone"></i>
                    <input v-model="subObj.tel" type="text" :placeholder="$t('registered.phoneNumber')">
                </div>
                <div class="leaving-input">
                    <i class="icon icon_gs-icon"></i>
                    <input v-model="subObj.companyName" type="text" :placeholder="$t('registered.companyName')">
                </div>
                <div class="leaving-text">
                    <textarea v-model="subObj.message" :placeholder="$t('other.advice')"></textarea>
                </div>
                <!--<div class="leaving-checkbox">
                    <label @click="checkbox = !checkbox" :class="{on:checkbox}">阅读并同意</label>
                    <a href="" target="_blank">《免责声明》</a>
                </div>-->
                <div class="ac">
                    <span @click="leaveDo" class="leaving-button">{{$t('registered.signUp')}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {Api} from '@/assets/js/api_kz'
  import { MessageBox } from 'element-ui';
  export default {
    name: 'Leaving',
    data() {
      return {
        show: false,
        checkbox: false,
        subObj: {userName: '', tel: '', companyName: '',message: ''}
      }
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
        if(!obj.message){
          return {"flag":false,"msg":''+this.$t('other.messageDTP')};
        }
        /*if(!this.checkbox){
          return {"flag":false,"msg":'请勾选阅读并同意《免责声明》'};
        }*/
        return {"flag":true,"msg":'ok'};
      },
      leaveDo(){
        let msgObj = this.verify(this.subObj)
        if(!msgObj.flag){
          this.$message.error(msgObj.msg);
        }else{
          Api.leaveDo(this.subObj).then(res=>{
            let data = res[1]
            if(data && data.result === 1){
              const h = this.$createElement;
              this.$msgbox({
                title: ""+this.$t('other.reminder'),
                message: h('p', null, [
                  h('span', { style: 'font-size: 16px' }, data.data)
                ]),
                center: true,
                confirmButtonText: ""+this.$t('other.ok'),
              })
              this.toHide()
              this.subObj = {userName: '', tel: '', companyName: '',message: ''}
            }else{
              this.$message.error(""+this.$t('other.messageFailed'));
            }
          })
        }
      },
      toShow () {
        this.show = true
      },
      toHide(){
        this.show = false
      }
    }
  }
</script>
