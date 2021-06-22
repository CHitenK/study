<template>
  <div class="components-container">
    <div>
      <tinymce v-model="content" :height="400" />
    </div>
  </div>
</template>

<script>
import Tinymce from '@c/tinymce'
export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content: ''
    }
  },
  methods() {
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>
