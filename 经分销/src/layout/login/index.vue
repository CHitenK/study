<template>
  <div class="login-box">
    <div  class="login-box-content">
      <p class="title clr-I fs-26">经 分 销 系 统</p>
      <p class="mr-t-10 clr-III fs-12">DISTRIBUTION SYSTEM</p>
      <div class="mr-t-30 list-bx clr-II fs-14">
        <i class="el-icon-user fs-26 clr-act"></i>
        <input type="text" v-model="username" autocomplete placeholder="请输入您的账号" @keyup.enter="submit" @change="errMsg=''" />
      </div>
      <div class="mr-t-20 list-bx clr-II fs-14">
        <i class="el-icon-lock fs-26 clr-act"></i>
        <form>
         <input type="password" v-model="password" autocomplete placeholder="请输入密码" @keyup.enter="submit"  @change="errMsg=''" />
        </form>
      </div>
      <div class="fs-12 clr-r mr-t-5" v-if="errMsg">
        {{errMsg}}
      </div>
      <div class="mr-t-10">
        <el-checkbox v-model="remember" :label="true">
          <span class="clr-III fs-12">
            记住账号和密码
          </span>
        </el-checkbox>
      </div>
      <div class="commit-btn mr-t-30 flex-c-c" @click="submit" >
        登 录&nbsp;&nbsp;
        <i class="el-icon-loading" v-if="loading"></i>
      </div>
    </div>
    <div class="last flex-c-c fs-12 clr-w">
      粤ICP备19099077号-1
    </div>
    <!-- 选择公司主体 -->
    <chose-company :visible.sync="visible" v-if="visible.show" @comfirm="visible.show=false" :postData="{username: username, password: password}" type="login" @getPession="getPession"> </chose-company>
  </div>
</template>
<script>
import choseCompany from '@c/choseCompany/index'
import { login, getPessionList } from '@a/base/index'
import { getAndsaveUserInfo } from '@u/common'
export default {
  components: {
    choseCompany
  },
  data() {
    return {
      username: '',
      password: '',
      remember: false,
      errMsg: '',
      loading: false,
      visible: {
        show: false
      },
      treeMenuList: [],
      iframeSrc: ''
    }
  },
  mounted() {
    const initLogin = localStorage.getItem('initLogin')
    if (initLogin) {
      const { username, password } = JSON.parse(initLogin)
      this.username = username
      this.password = password
      this.remember = true
      console.log(this.remember)
    }
  },
  methods: {
    submit() {
      if (!this.username || !this.password) {
        this.errMsg = '请输入账号和密码'
        return false
      }
      if (this.loading) return false
      this.loading = true
      sessionStorage.setItem('token', '') // 全局设置token 为空
      login({
        password: this.password,
        username: this.username,
        remember: ''
      }).then(res => {
        if (res.code === '10000') { // 只有一个公司主体的用户
          sessionStorage.setItem('companys', '') // 公司主体列表为空
          sessionStorage.setItem('token', res.data) // 全局设置token
          // 获取用户信息并保存
          getAndsaveUserInfo()
          this.getPession(res.data)
        } else if (res.code === '10007') { // 多个公司主体的用户
          sessionStorage.setItem('companys', JSON.stringify(res.data))
          sessionStorage.removeItem('merchantId') // 清除上次用户的公司主体
          this.visible.show = true
          this.$nextTick(() => {
            this.$successMsg(res.message)
          })
        }
      }).catch(err => {
        const { message } = err
        this.errMsg = message
      }).finally(() => {
        this.loading = false
        // 记住账号/密码
        const initLogin = this.remember ? JSON.stringify({ username: this.username, password: this.password }) : ''
        localStorage.setItem('initLogin', initLogin)
      })
    },
    // 获取/处理用户权限
    async getPession(token) {
      try {
        const res = await getPessionList(token)
        const { treeMenuList = [], btnList } = res.data
        this.mapTree(treeMenuList) // 菜单树结构转换成数组
        sessionStorage.setItem('treeMenuList', JSON.stringify(this.treeMenuList)) // 保存用户菜单权限列表
        sessionStorage.setItem('btnList', JSON.stringify(btnList)) // 保存用户按钮权限列表
        this.$router.push('/')
      } catch (err) {
        sessionStorage.removeItem('treeMenuList')
        sessionStorage.removeItem('btnList')
      }
    },
    // 处理菜单树结构 树结构转换成数组
    mapTree(data) {
      data.map(items => {
        if (items.children && items.children.length > 0) {
          items.children.map(gtem => {
            this.treeMenuList.push({
              path: gtem.url,
              name: gtem.name,
              id: gtem.id,
              url: gtem.url
            })
          })
        } else if (items.url) {
          this.treeMenuList.push({
            path: items.url,
            name: items.name,
            id: items.id,
            url: items.url
          })
        }
        if (items.children) {
          this.mapTree(items.children)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped >
.login-box{
  width: 100vw;
  height: 100vh;
  background: url('./../../../static/img/login_bg.png') no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
}
.login-box-content{
  width: 360px;
  height: 100vh;
  position: absolute;
  left: 58%;
  display: flex;
  justify-content: start;
  flex-direction: column;
  .title{
    margin-top: 24vh;
  }
  .list-bx{
    width: 100%;
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: solid 1px #eeeeee;
    input{
      flex: 1;
      display: inline-block;
      height: 28px;
      border: 0;
      padding-left: 10px;
      &:focus{
        border: 0;
      }
    }
  }
}
.commit-btn{
  height: 45px;
  width: 85%;
  border-radius: 20px;
  background: #4f93fe;
  text-align: center;
  color: #fff;
  font-size: 18px;
  letter-spacing: 2px;
  border: none;
  cursor: pointer;
}
.last{
  position: absolute;
  bottom: 5px;
  width: 100%;
}
</style>
