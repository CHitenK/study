<template>
    <a v-if="(to && to[0] !== '/') || to === '/'" :href="to.indexOf('null') !== -1 || to=='/ww'?'javascript:;':to" :target="to=='/'||to.indexOf('null') !== -1 ||to=='/ww'?'':target">
        <slot></slot>
    </a>
    <router-link v-else :to="path">
        <slot></slot>
    </router-link>
</template>
<script>
  export default {
    name: 'XRouterLink',
    props: {
      to: {
        type: String,
        default: '/',
        required: true,
      },
      target: {
        type: String,
        default: '_blank'
      },
    },
    computed: {
      path(){
        return {
          path: this.to,
          query:{
            t: Date.now(),
          }
        }
      },
      vProps() {
        // 包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。
        // 当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。
        return {...this.$props, ...this.$attrs}
      }
    },
  }
</script>