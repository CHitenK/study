<template>
 <a :href="BASE_URL+'/static/html/mini-license.html'" class="licenseBg">
    <img :src="BASE_URL+'/static/mini/miniImages/licenceEncense.png'" alt="营业执照">
  </a>
</template>
<script>

export default {
  name: 'jm-license',
  data() {
    return {
      BASE_URL: process.env.VUE_APP_BUS_URL,
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
.licenseBg
 width: 100%;
 height: 40px;
 display: block
.licenseBg img
  width: 100%;
  height: 40px;
</style>
