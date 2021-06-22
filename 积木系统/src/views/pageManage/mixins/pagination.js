
export default {
  data() {
    return {
      // 分页信息
      page: {
        pageSize: 10,
        pageNumber: 1,
        total: 0
      }
    }
  },
  methods: {
    /**
     * 修改分页显示行数
     * @param {int} rows 分页行数
     * @param {function} callback 回调函数
     */
    sizeChangeHandler(rows, callback) {
      this.page.pageSize = rows
      this.page.pageNumber = 1
      if (callback) {
        callback()
      }
    },
    /**
     * 修改分页页码
     * @param {int} page 页码
     * @param {function} callback 回调函数
     */
    currentChangeHandler(page, callback) {
      this.page.pageNumber = page
      if (callback) {
        callback()
      }
    }
  }
}
