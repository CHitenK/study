<style lang="less" scoped>
    .bg_popup{width: 100%;height: 100%;position: fixed;background: rgba(0,0,0,0.5);top: 0;left: 0;z-index: 1000;}
    .join_box{width: 450px;background: #fff;position: absolute;top: 50%;left: 50%;padding-bottom: 50px;margin: -239px 0 0 -225px;}
    .icon_traceability{display: block;margin: 0 auto;padding: 20px 0;}
    .join_text{font-size: 20px;text-align: center;}
    .inputPhone{width: 300px;line-height: 40px;background: #e8e8e8;border-radius: 20px;outline: none;border: none;padding-left: 10px;margin: 30px auto 0 auto;display: block;}
    .btn_join{width: 300px;line-height: 40px;border-radius: 20px;text-align: center;display: block;margin: 20px auto 0 auto;background: #0062fe;color: #fff;}
    .close{width: 20px;height: 20px;background: url("@{imgUrl}icon_menu_close.png") center no-repeat;background-size: 100%;position: absolute;top: 10px;right: 10px;}
    @media (max-width: 768px){
        .join_box{width: 100%;left: 0;margin: 0;top: 20%;}
    }
</style>
<template>
    <div class="bg_popup">
        <div class="join_box">
            <a href="javascript:;" class="close" @click="closeJoin"></a>
            <img src="/static/images/traceability.png" alt="" class="icon_traceability">
            <p class="join_text">{{$t('other.joinGlobalSource')}}</p>
            <input type="text" :placeholder="$t('other.registeredPhoneNumber')" class="inputPhone" v-model="tel" v-if="from == 2">
            <a href="javascript:;" class="btn_join" @click="join">{{$t('other.joinNow')}}</a>
        </div>
    </div>
</template>
<script>
    import { Api } from '@/assets/js/api'
    import { MessageBox } from 'element-ui';
    export default {
        components: { },
        data() {
            return {
                tel: '',
            };
        },
        props:{ from: '', phone: '', link: ''},
        methods:{
            join(){
                if(this.from == 2){
                    if(this.tel == ''){
                        this.$message.error(''+this.$t('registered.phoneNumber'));
                        return;
                    }else if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[0-9])\d{8}$/.test(this.tel)){
                        this.$message.error(''+this.$t('registered.pNumber'));
                        return;
                    }
                }
                Api.joinOrigin({
                    tel: this.tel || this.phone
                }).then(res => {
                    let data = res[1]
                    if(data && data.result === 1){
                        window.location.href = this.link
                    } else {
                        this.$message.error(data.message);
                        console.log('请求失败')
                    }
                })
            },
            closeJoin(){
                this.$emit('joinParams',false)
            }
        },
        mounted(){

        },
    };
</script>
