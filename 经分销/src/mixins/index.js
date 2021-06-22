import funcsObj from './defineFunc'

export default {
  data() {
    return {
      // table 信息
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      tableChoseList: [], // table 选中的数据
      visible: { show: false }, // dialog 是否显示
      selectOpt: {},
      btnsWidth: 60,
      resetBtnsWidth: true
    }
  },
  watch: {
    'tableData.loading': function() {
      if (this.tableData.loading) this.btnsWidth = 55
    }
  },
  methods: {
    ...funcsObj,
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    selectRow(rows, row) {
      console.log('当用户手动勾选数据行的 Checkbox 时触发的事件', rows, row)
    },
    // 当选择项发生变化时会触发该事件
    selectionChange(rows) {
      console.log('当选择项发生变化时会触发该事件', rows)
      this.tableChoseList = rows
    },
    // 当用户手动勾选全选 Checkbox 时触发的事件
    selectAll(rows) {
      console.log('当用户手动勾选全选 Checkbox 时触发的事件', rows)
    },
    // 页面跳转 tagName 修改tab栏tab标题
    linkTo(data, tagName) {
      const pathData = typeof data === 'string' ? { path: data } : { ...data, customTitle: tagName }
      this.$router.push(pathData, (data) => {
        if (!tagName) return false
        // 设置自定义tagName
        this.$nextTick(() => {
          let { params, path, matched } = this.$route
          const tags = this.$store.getters.tagsList
          let url = path
          let index = null
          if (Object.keys(params).length > 0) { // 路由 params有值
            const target = matched ? matched[matched.length - 1] : null
            url = target ? target.path.split('/:')[0] : ''
            const arr = []
            for (let key in params) {
              arr.push(params[key])
            }
            tags.find((item, i) => {
              const flag = arr.every(gtem => item.path.includes(gtem))
              if (item.path.includes(url) && flag) {
                index = i
                return item
              }
            })
          } else { // 路由params无值
            tags.find((item, i) => {
              if (item.path === url) {
                index = i
                return item
              }
            })
          }
          if (index !== null) {
            tags.splice(index, 1, { ...tags[index], customTitle: tagName })
            this.$store.dispatch('tags/AC_UPDATE_STATE', { key: 'tagsList', value: tags })
          }
        })
      })
    },
    // 重置
    reset(formName = 'ruleForm', callback) {
      this.$refs[formName].resetFields()
      if (callback) {
        this.$nextTick(() => {
          callback()
        })
      }
    },
    // 计算宽度
    countWidth(num) {
      if (!num) return false
      if (num < this.btnsWidth) return false
      this.btnsWidth = num + ''
    },
    // 关闭当前tag
    closeTag() {
      if (sessionStorage.getItem('from') === 'oldsystem') {
        this.$router.go(-1)
        return false
      }
      const activePath = this.$route.path
      const dom = document.getElementById('close_' + activePath)
      dom.click()
    },
    // 根据路径关闭某个tag
    closeTagByIndex(path, callback) {
      if (sessionStorage.getItem('from') === 'oldsystem') {
        if (callback) callback()
        return false
      }
      const tags = this.$store.getters.tagsList
      let index = null
      tags.forEach((item, i) => {
        if (item.path === path) index = i
      })
      tags.splice(index, 1)
      this.$store.dispatch('tags/AC_UPDATE_STATE', { key: 'tagsList', value: tags })
      if (callback) callback()
    },
    // 从缓存中获取用户的主要信息
    getUserInfo() {
      let userInfo = sessionStorage.getItem('userInfo')
      userInfo = userInfo ? JSON.parse(userInfo) : {}
      return userInfo
    },
    /**
     * tab显示 是否有权限
     * @param {*} name 权限名称
     * @returns {Boolean}
     * 结合 v-if 使用
     */
    permissionShowTab(name = '') {
      const btnList = sessionStorage.getItem('btnList') ? JSON.parse(sessionStorage.getItem('btnList')) : []
      return btnList.includes(name)
    }
  }
}
