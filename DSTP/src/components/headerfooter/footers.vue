<style lang="less" scoped>
  @import "../../assets/css/footer.less";
</style>
<style>
    .el-select-dropdown{max-width: 90%;}
</style>
<template>
  <div class="footer" v-show="bottom">
    <div class="container">
      <div class="row">
          <div class="col-md-11">
              <div class="row">
                  <div class="footer-menu">
                      <template v-for="(item, index) in menu.explain">
                          <x-router-link :to="item.english+'?columnId='+item.columnId" :key="index">{{item.name}}</x-router-link>
                      </template>
                      <div class="footer-link" v-if="links.length">
                          <span>{{linkName}}</span>
                          <el-select size="small" v-model="linkValue" :placeholder="$t('footers.optional')" @focus="clearContent" @change="toLinks">
                              <el-option
                                      v-for="(item, index) in links"
                                      :key="index"
                                      :label="item.label"
                                      :value="item.value">
                              </el-option>
                          </el-select>
                      </div>
                  </div>
                  <div class="footer-address row">
                      <div class="col-md-4">
                          <p>{{$t('footers.serviceHotline')}}</p>
                          <div class="footer-call">
                              <a href="javascript:;">{{menu.phone}}</a>
                          </div>
                      </div>
                      <div class="col-md-8">
                          <p>{{$t('footers.address')}}：{{menu.address}}</p>
                          <p>{{$t('footers.email')}}：{{menu.english}}</p>
                          <p>{{$t('footers.postcode')}}：{{menu.zipCode}}</p>
                      </div>
                  </div>
              </div>
          </div>
          <div class="col-md-1 col-xs-8" v-if="menu.qrcode">
              <div class="footer-wxweb row">
                  <!-- <img :src="'https://admin.tidtp.com/mall/images/202004/18124757hg70.jpg'" alt=""> -->
                  <img :src="menu.qrcode" alt="">
                  <div v-if="menu.qrname">
                      <span>{{menu.qrname}}</span>
                  </div>
              </div>
          </div>
          <div class="col-xs-12 footer-bottom">
              <div class="row">
                  <div class="footer-span">
                      <a href="/statement?type=1"><span>{{$t('footers.privacyPolicy')}}</span></a>
                      <a href="/statement?type=2"><span>{{$t('footers.legalStatement')}}</span></a>
                  </div>
                  <div class="footer-com">
                      <p>{{bottom.domainRedirect}}</p>
                      <a target="_blank" :href="bottom.shortName">{{bottom.description}}</a>
                      {{bottom.keywords}}
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Api} from '@/assets/js/api_kz'
  export default {
    name: 'Footers',
    data() {
      return {
        showMenu: false,
        menu: '',
        bottom: '',
        links: [],
        linkName: '',
        linkValue: ''
      }
    },
    mounted() {
      Api.footerLoad().then(res=>{
        let data = res[1]
        if(data && data.result === 1){
          this.menu = data.data
          Api.keywordLoad().then(res=>{
            let data2 = res[1]
            if(data2 && data2.result === 1){
              this.bottom = data2.data.site
                this.$emit('getFooterMsg',document.getElementsByClassName("footer")[0].offsetHeight)
            }
          })
          this.getLinks()
        }else{
          console.log('请求底部导航菜单失败')
        }
      })
    },
    methods:{
      clearContent(){
        this.linkValue = ''
      },
      getLinks(){
        Api.linksLoad().then(res=>{
          let data = res[1]
          if(data && data.result === 1){
            let obj = data.data.columnList
            obj.forEach((item, index)=>{
              item.label = item.name
              item.value = item.description
            })
            this.links = obj
            this.linkName = data.data.title
          }else{
            console.log('请求友情链接失败')
          }
        })
      },
      toLinks(e){
        if(e){
          window.open(this.linkValue)
        }
      }
    }
  }
</script>
