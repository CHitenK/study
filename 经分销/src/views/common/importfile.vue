<template>
 <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" :breadcrumb="breadcrumb" />
    <!-- 面包屑 end -->
    <importfile :templateId="templateId" :url="url" :accept="accept"></importfile>
</div>
</template>
<script>
import { getBaseUrl } from '@u/tool'
export default {
  components: {
   importfile: () => import('@/components/importfile/index')
  },
  data() {
    return {
      breadcrumb: [{
        path: '', meta: { title: '上传文件' }
      }],
      url: '',
      tips: '',
      loading: false,
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 100000,
        total: 100001
      },
      failure: 0,
      success: 0,
      templateId: '',
      accept: '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  },
  mounted() {
    /**
     * @description 参数解析
     * @param {String} url 上传地址 如'/app/upload'  必填
     * @param {String} breadcrumb 当前位置 如'采购SD列表,调整SD导入'
     * @param {String} templateId 下载模板的id
     */
    const { url, breadcrumb, templateId, accept } = this.$route.query
    this.url = url ? getBaseUrl(url) + url + '' : ''
    this.templateId = templateId || ''
    // 设置当前位置
    if (breadcrumb) {
      this.breadcrumb = []
      const array = breadcrumb.split(',')
      const breadcrumbArray = []
      array.map(item => {
        breadcrumbArray.push({
          path: '',
          meta: { title: item }
        })
      })
      this.breadcrumb = breadcrumbArray
    }
    // 类型拦截
    if (accept) {
      this.accept = accept
    }
  }
}
</script>
