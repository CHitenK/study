<template>
  <div class="user">
      <span>{{userName}}</span> |
      <span class="logout" @click="logout">退出</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: sessionStorage.getItem('userName')
    }
  },
  methods: {
    logout() {
      this.$confirm('确定退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.clear()
        this.$router.replace('/login')
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user{
  display: inline-block;
  float: right;
  margin-right: 20px;
  color: #ffffff;
  margin-left: 15px;
}
.logout{
  cursor: pointer;
}
</style>
