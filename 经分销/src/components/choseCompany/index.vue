<template>
  <JFX-Dialog
		:visible.sync="visible"
    :showClose="true"
    @comfirm="comfirm"
    :width="'800px'"
    :title="'选择公司主体'"
    :btnAlign="'center'"
		>
    <el-row :gutter="10" class="company-page" v-loading="loading">
      <el-col :span="12" v-for="item in companylist" :key="item.id" class="mr-t-20">
        <el-radio v-model="merchantId" :label="item.id" >
         <span class="fs-16" style="vertical-align: initial;">{{item.code}} {{item.name}}</span>
        </el-radio>
      </el-col>
    </el-row>
	</JFX-Dialog>
</template>
<script>
/**
 * @description 选择主体公司
 * 参数说明
 * visible
 *  show 是否显示
 * close 函数 点击关闭执行
 * getPession 函数 登录选择公司主体成功执行获取用户权限
 */
import { choseCompanylogin, changeCompanylogin } from '@a/base/index'
import { getAndsaveUserInfo } from '@u/common'
export default {
  props: {
    visible: {
      type: Object,
      default: function(params) {
        return { show: false }
      }
    },
    // 请求数据 登录选择公司时传入username, pawssword 切换公司主体可不传
    postData: {
      type: Object,
      default: function(params) {
        return {}
      }
    },
    // 类型 changeCompany => 切换公司主体 其他 => 用户登录选择公司主体
    type: {
      type: String,
      default: 'changeCompany'
    }
  },
  data() {
    return {
      merchantId: '',
      companylist: [],
      loading: false
    }
  },
  mounted() {
    // 列表
    const companylist = sessionStorage.getItem('companys')
    if (companylist) {
      this.companylist = JSON.parse(companylist)
    }

    // 用户当前公司主体
    const merchantId = sessionStorage.getItem('merchantId') || ''
    this.merchantId = +merchantId
  },
  methods: {
    async comfirm() {
      if (!this.merchantId) {
        this.$errorMsg('请选择公司主体')
        return false
      }
      if (this.loading) return false
      this.loading = true
      let ajax = null
      let postdata = null
      // 切换公司主体
      if (this.type === 'changeCompany') {
        ajax = changeCompanylogin
        postdata = {
          merchantId: this.merchantId,
          token: sessionStorage.getItem('token')
        }
      } else { // 用户登录选择公司主体
        ajax = choseCompanylogin
        postdata = {
          merchantId: this.merchantId,
          remember: '',
          ...this.postData
        }
      }
      ajax(postdata).then(res => {
        // const company = this.companylist.find(item => item.id === this.merchantId) || {}
        sessionStorage.setItem('merchantId', this.merchantId) // 保存已选择的公司主体
        sessionStorage.setItem('token', res.data) // 全局设置token
        // 获取用户信息并保存
        getAndsaveUserInfo()
        // sessionStorage.setItem('company', JSON.stringify(company)) // 公司信息
        if (this.type === 'changeCompany') { // 切换公司主体
          window.location.href = window.location.origin + '/' // 刷新
        } else { // 用户登录选择公司主体
          this.$emit('getPession', res.data)
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.company-page{
  width: 100%;
  max-height: 50vh;
  min-height: 60px;
  margin-bottom: 10px;
}
</style>
