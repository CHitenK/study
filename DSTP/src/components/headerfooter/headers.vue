<style lang="less">
    @import "../../assets/css/headers.less";
    @import "../../assets/css/font-icon.css";
    .line{color: #fff;font-size: 0.2rem;margin: 0 0.02rem;}
    .blue{color: #488dff}
    .menu_en{text-align: left;font-size: 16px;margin-top: 0.3rem;font-weight: bold;}
    .icon_close{color: #fff;font-size: 0.5rem !important;position: absolute;right: 0;top: 0;cursor: pointer;background: #0c41fe;width: 0.85rem;height: 0.85rem;display: block; text-align: center;line-height: 0.85rem;}
</style>
<template>
    <div class="headers" id="headers">
        <!--<div class="container">-->
            <!--<div class="row">-->
                <div class="dtp_header" v-if="$i18n.locale == 'cn'">
                    <ul>
                        <li v-for="(item, index) in menu" :key="index">
                            <x-router-link :class="{active: item.active}" :to="item.english+'?columnId='+item.columnId" v-if="item.columnId != 1259 && item.columnId != 1260">{{item.name}}</x-router-link>
                            <x-router-link :class="{active: item.active}" :to="item.description+'?columnId='+item.columnId + ($i18n.locale == 'en'? '&language=' + $i18n.locale :'')" v-if="item.columnId == 1259 || item.columnId == 1260">{{item.name}}</x-router-link>
                            <template v-if="item.columnList">
                                <ul>
                                    <li v-for="(item2, index2) in item.columnList" :key="index2">
                                        <x-router-link :to="item2.english">{{item2.name}}</x-router-link>
                                    </li>
                                </ul>
                            </template>
                        </li>
                        <!--<li><a href="javascript:;" style="color: #488dff" @click="Cn">中</a> <span class="line">|</span> <a href="javascript:;"  @click="En">En</a></li>-->
                    </ul>
                    <div class="nav-app" @click="showMenu=true">
                        <span></span><span></span><span></span>
                    </div>
                    <div class="bg_hover" v-show="showMenu" @click="showMenu = false"></div>
                    <div :class="{'app-menu':true,'on':showMenu}">
                        <ul>
                            <li v-for="(item, index) in menu" :key="index">
                            <!-- <a :class="item.english === $route.path ? 'active' : ''" @click="goLink(item)" >{{item.name}}</a> -->
                                <x-router-link :class="{active: item.active}" :to="item.english+'?columnId='+item.columnId ||'/'"  v-if="item.columnId != 1259 && item.columnId != 1260">{{item.name}}</x-router-link>
                                <x-router-link :class="{active: item.active}" :to="item.description+'?columnId='+item.columnId + ($i18n.locale == 'en'? '&language=' + $i18n.locale :'')" v-if="item.columnId == 1259 || item.columnId == 1260">{{item.name}}</x-router-link>
                                <template v-if="item.columnList">
                                    <ul>
                                        <li v-for="(item2, index2) in item.columnList" :key="index2">
                                            <x-router-link :to="item2.english">{{item2.name}}</x-router-link>
                                        </li>
                                    </ul>
                                </template>
                            </li>
                            <!--<li class="menu_en"><a href="javascript:;" style="color: #488dff" @click="Cn">中</a> <span style="color: #444">|</span> <a href="javascript:;" @click="En">En</a></li>-->
                        </ul>
                    </div>
                </div>
                <template v-if="$i18n.locale == 'en'">
                    <div class="nav_en" @click="showMenu=true">
                        <span></span><span></span><span></span>
                    </div>
                    <div :class="{'app-menu_en':true,'on':showMenu}">
                        <span class="iconfont icon-guanbi icon_close" @click="showMenu=false"></span>
                        <ul>
                            <li v-for="(item, index) in menu" :key="index">
                                <!-- <a :class="item.english === $route.path ? 'active' : ''" @click="goLink(item)" >{{item.name}}</a> -->
                                <x-router-link :class="{active: item.active}" :to="item.english+'?columnId='+item.columnId ||'/'" v-if="item.columnId != 1259 && item.columnId != 1260">{{item.name}}</x-router-link>
                                <x-router-link :class="{active: item.active}" :to="item.description+'?columnId='+item.columnId + ($i18n.locale == 'en'? '&language=' + $i18n.locale :'')" v-if="item.columnId == 1259 || item.columnId == 1260">{{item.name}}</x-router-link>
                                <template v-if="item.columnList">
                                    <ul>
                                        <li v-for="(item2, index2) in item.columnList" :key="index2">
                                            <x-router-link :to="item2.english">{{item2.name}}</x-router-link>
                                        </li>
                                    </ul>
                                </template>
                            </li>
                            <!--<li class="menu_en"><a href="javascript:;" @click="Cn">中</a> <span>|</span> <a href="javascript:;" style="color: #0c41fe" @click="En">En</a></li>-->
                        </ul>
                    </div>
                </template>
            <!--</div>-->
        <!--</div>-->
    </div>
</template>
<script>
    import {Api} from '@/assets/js/api_kz'
    export default {
        name: 'Headers',
        data() {
            return {
                showMenu: false,
                menu: '',
                loginUrl: '', // 登录地址
            }
        },
        props: {
            from: {
                type: String
            },
        },
        watch:{
            showMenu(val){
                this.$emit('getShowMenu',val)
            }
        },
        created(){
            this.loginUrl = (this.$i18n.locale === 'cn' ? process.env.VUE_APP_LOGIN_URL : process.env.VUE_APP_LOGIN_URL + '?language=' + this.$i18n.locale)
        },
        mounted() {
            Api.indexMenu().then(res=>{
                let data = res[1]
                if(data && data.result === 1){
                    let loadObj = data.data
                    let route = this.$route
                    if(loadObj && loadObj.length){
//                        if(route.name !== 'Home'){ // 首页不需要加标记
                            const array = [625,930]
                            if(array.includes(this.$route.query.columnId)){
                                let index =  null
                                let page = loadObj.forEach((e, i) => {
                                    if (e.columnId == 625 || e.columnId == 930) {
                                        index = i
                                    }
                                })
                               if (index !== null ) {
                                   loadObj[index].active = true
                               }
                            }else{
                                for(let item of loadObj){ // 找到当前页面标记关系
                                    if(item.english === route.path || item.english === '/'+route.meta.pName){
                                        item.active = true
                                        break
                                    }
                                }
                            }
//                        }
                        this.menu = loadObj
                        this.$emit('getHeaderMag',loadObj)
                    }else{
                        console.log('导航菜单数据格式错误')
                        this.$emit('getHeaderMag', null)
                    }
                }else{
                    console.log('请求导航菜单失败')
                  this.$emit('getHeaderMag', null)
                }
            })
            if(window.localStorage.getItem('lang') == 'en'){
                this.$i18n.locale = 'en'
            }else{
                this.$i18n.locale = 'cn'
            }
        },
        methods: {
          // 移动端跳转
          goLink(data) {
           if (data.english && data.english.indexOf('http') > -1) {
             window.location.href = data.english
           } else {
             this.$router.push({ path: data.english || '/' })
             document.title = data.name
           }
          },
            Cn(){
                window.localStorage.setItem('lang','')
                if(this.from == 'newsDetails'){
                    this.$router.go(-1)
                }else{
                    window.location.reload();
                }
            },
            En(){
                window.localStorage.setItem('lang','en')
                if(this.from == 'newsDetails'){
                    this.$router.go(-1)
                }else{
                    window.location.reload();
                }
            }
        }
    }

</script>
