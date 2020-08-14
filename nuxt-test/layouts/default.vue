<template>
  <div>
    <Nuxt />
  </div>
</template>
<script>
export default {
  mounted() {
    setRem ()
    window.addEventListener('resize',setRem,false)
  }
}
// 设置rem基础
function setRem () {
      const baseSize = 50
      let clientWidth = document.documentElement.clientWidth
      if(clientWidth < 600){
          clientWidth = 600
      }else if(clientWidth > 1920){
          clientWidth = 1920
      }
      const scale = clientWidth / 750
      document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
  }
</script>
<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

</style>
