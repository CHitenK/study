<template>
  <div class="right-top-box">
    <div class="right-top-bx-l">
      <i class="el-icon-s-fold swich-icon" @click="swichCollapse" v-if="!isCollapse"></i>
      <i class="el-icon-s-unfold swich-icon" @click="swichCollapse" v-if="isCollapse" ></i>
      <span class="company">公司：{{companyName}}</span>
      <span class="change-company" @click="visible.show = true">切换</span>
    </div>
    <div class="right-top-bx-r">
      <i class="el-icon-bell fs-32 clr-w c-p" @click="drawer=!drawer"></i>&nbsp;&nbsp;
      <el-avatar :size="40" :src="circleUrl"></el-avatar>&nbsp;&nbsp;
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userName}} &nbsp;&nbsp;<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <span class="jfx-dropdown-item">
            欢迎
          </span>
          <el-dropdown-item >
            <span class="jfx-dropdown-item">
              个人信息
            </span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span class="jfx-dropdown-item" @click="changePawVisible.show=true,ruleForm.oldPwd='',ruleForm.password=''">
                修改密码
            </span>
          </el-dropdown-item>
          <el-dropdown-item >
            <span class="jfx-dropdown-item" @click="logout">
                退出
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 选择公司主体 -->
    <chose-company :visible.sync="visible" v-if="visible.show" @comfirm="visible.show=false"> </chose-company>
    <!-- 选择公司主体 end-->
    <!-- 修改密码 -->
    <JFX-Dialog
		:visible.sync="changePawVisible"
    :showClose="true"
    @comfirm="changPwd"
    :width="'30vw'"
    :title="'修改密码'"
    :top="'20vh'"
    closeBtnText="取 消"
    confirmBtnText="修改密码"
		>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input type="password" v-model="ruleForm.oldPwd" placeholder="******" clearable style="width: 22vw;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="flex-l-c">
         <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="******" clearable style="width: 22vw;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    </JFX-Dialog>
    <!-- 修改密码 end-->
    <!-- 打开公告 -->
    <el-drawer
    :visible.sync="drawer"
    :direction="'rtl'"
    :with-header="false"
    :size="'25%'"
    :show-close="true"
    >
    <el-row class="pd-10">
      <el-col :span="24" class="fs-16 mr-t-20 clr-I bor-b">系统公告（<span class="clr-r">23</span>）</el-col>
      <el-row class="pd-10 notice-list fs-14 clr-III c-p">
        <el-col :span="18">温热微软特瑞特</el-col>
        <el-col :span="6" >2020-08-12</el-col>
      </el-row>
      <el-row class="pd-10 clr-III notice-list fs-14 c-p">
        <el-col :span="18">温热微软特瑞特</el-col>
        <el-col :span="6">2020-08-12</el-col>
      </el-row>
    </el-row>
    </el-drawer>
    <!-- 打开公告 end -->
  </div>
</template>
<script>
import choseCompany from '@c/choseCompany/index'
export default {
  components: {
    choseCompany
  },
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      visible: {
        show: false
      },
      changePawVisible: { show: false },
      ruleForm: {
        id: 100108,
        oldPwd: '',
        password: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ]
      },
      drawer: false,
      companyName: '',
      userName: ''
    }
  },
  computed: {
    isCollapse() {
      return this.$store.getters.isCollapse
    }
  },
  mounted() {
    let userInfo = sessionStorage.getItem('userInfo')
    userInfo = userInfo ? JSON.parse(userInfo) : {}
    this.companyName = userInfo.merchantName || ''
    this.userName = userInfo.username || ''
  },
  methods: {
    // 收缩菜单
    swichCollapse() {
      const bl = !this.isCollapse
      this.$store.dispatch('base/AC_UPDATE_STATE', { key: 'isCollapse', value: bl })
    },
    // 修改密码点击保存
    changPwd() {

    },
    // 退出登录
    logout() {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('btnList')
      sessionStorage.removeItem('treeMenuList')
      // sessionStorage.removeItem('company')
      sessionStorage.removeItem('userInfo')
      window.location.href = '/login'
    }
  }
}
</script>
<style lang="scss" scoped >
.right-top-box{
  width: 100%;
  height: 100%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 15px;
}
.swich-icon{
  font-size: 30px;
  color: #ffffff;
  cursor: pointer;
}
.company{
  margin-left: 20px;
  margin-right: 10px;
  font-size: 22px;
  color: #ffffff;
}
.change-company{
  font-size: 16px;
  color: #efefef;
  text-decoration: underline;
  cursor: pointer;
}
.right-top-bx-r{
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.el-dropdown-link{
  display: inline-block;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
}
.jfx-dropdown-item{
  display: inline-block;
  width: 120px;
  text-align: center;
  font-size: 16px;
  margin: 5px 0;
}
.bor-b{
  height: 36px;
  margin-bottom: 10px;
  border-bottom: solid 1px #eaeaea;
}
.notice-list{
  height: 40px;
  display: flex;
  align-items: center;
  &:hover{
    color: #6ea9f3;
  }
}
</style>
