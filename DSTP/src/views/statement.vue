<template>
    <div>
        <div class="bg_header">
            <Headers></Headers>
        </div>
        <div class="container">
            <div class="row">
                <div class="statement_con" v-html="statement.html"></div>
            </div>
        </div>
        <Footers></Footers>
    </div>
</template>
<script>
import { Api } from '@/assets/js/api'
export default {
    components: { },
    data() {
        return {
            statement: ''
        };
    },
    methods:{
        init(){
            Api.legalSecrecy().then(res => {
                let data = res[1]
                if(data && data.result === 1){
                    if(this.$route.query.type == 1){
                        this.statement = data.data.secrecyColumn
                    }else if(this.$route.query.type == 2){
                        this.statement = data.data.legalColumn
                    }
                }else{
                    console.log('请求失败')
                }
            })
        },
    },
    mounted(){
        this.init()
    }
};
</script>
<style lang="less">
    .bg_header{background: #3e97ff;height: 90px;}
    .statement_con{margin: 30px 0}
    @media (max-width: 768px){
        .statement_con{margin: 0.4rem;}
    }
</style>