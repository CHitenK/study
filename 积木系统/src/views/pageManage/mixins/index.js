import { mapGetters } from 'vuex'
import { insertBlock, updateBlock, getBlockById, manyActivityCheckout, checkCoupon, checkSalse, checkProductList, isBlockExistingByIds, checkUseLabelsById } from '@/api/pageManage/index'
import { validateSalesData, validateCouponData, validateSearchData, validateAnchorData, validateBannerData, validateTitleData, validaCouponIds, validaSalesIds, validaProducts, validateBannerProductIds, validaProductsAct, validaProductList, getSpecialIds, validateShowCaseData, validateSwitchTime, getUseLabels } from './../utils/validate'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      fileList: [], // 图片上传
      accept: 'image/*',
      formName: 'ruleForm',
      loading: null,
      headers: {
        token: sessionStorage.getItem('token')
      },
      Loading: null
    }
  },
  computed: {
    ...mapGetters([
      'addBuildBlock',
      'editBuildBlock'
    ]),
    /**
     * @description toolType 用来区分新增/编辑 专题的store
     * @description addBuildBlock 为新增 改变store状态使用 this.$store.dispatc(this.toolType + '/xxxx')
     * @description editBuildBlock 为编辑 改变store状态使用 this.$store.dispatc(this.toolType + '/xxxx')
     */
    toolType() {
      let type = 'addBuildBlock'
      if (this.$route.path === '/pageManage/buildBlockAdd') { // 新增专题
        type = 'addBuildBlock'
      } else if (this.$route.path === '/pageManage/buildBlockEdit') { // 编辑
        type = 'editBuildBlock'
      }
      return type
    },
    buildBlock() { // 积木数据 数组
      if (this.toolType === 'editBuildBlock') {
        return this.editBuildBlock
      } else {
        return this.addBuildBlock
      }
    },
    activeName() { // 当前组件名称
      return this.buildBlock.activeComponent.name
    },
    activeUuid() { // 当前楼层uuid
      return this.buildBlock.activeUuid
    },
    saveCommitFlage() { // 触发保存/提交操作
      return this.buildBlock.saveCommitFlage
    },
    scrollOptions() { // 滚动需要的位置数据
      return this.buildBlock.scrollOptions
    }
  },
  // submitForm
  watch: {
    saveCommitFlage(data) {
      if (!this.$refs[this.formName]) return false
      if (data.indexOf('save') > 0) { // data = xxxxxxxx-save 执行保存
        this.submitForm('save')
      } else if (data.indexOf('commit') > 0) { // // data = xxxxxxxx-commit 执行提交
        this.submitForm('commit')
      }
    }
  },
  directives: {
    // 保留多少位小数
    tofixed: {
      inserted(el, binding, vnode) {
        const { value } = binding
        const num = +value || 0
        if (el.nodeName === 'INPUT') {
          if (el.type !== 'number') return false
          el.onblur = () => {
            if (!el.value) return false
            el.value = (+el.value).toFixed(num)
          }
        } else {
          const dom = el.getElementsByTagName('input')
          if (dom && dom.length > 0) {
            for (let key = 0; key < dom.length; key++) {
              if (dom[key].type === 'number') {
                dom[key].onblur = () => {
                  if (!dom[key].value) return false
                  dom[key].value = (+dom[key].value).toFixed(num)
                }
              }
            }
          }
        }
      }
    }
  },
  created() {
  },
  methods: {
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const limit = file.size / 1024 / 1024 < 1
      if (['jpg', 'png', 'gif', 'svg'].includes(testmsg)) {
        if (!limit) {
          this.$message({
            message: '上传文件大小不能超过1MB!',
            type: 'warning'
          })
          return false
        }
        return true
      } else {
        this.$message({
          message: '上传文件只能图片!',
          type: 'error'
        })
        return false
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
    },
    // 文件上传之前
    beforeRemove(file, fileList) {
    },
    // 文件上传成功
    handleSuccess(res, file, fileList, callback) {
      if (res.code === 200) {
        const url = res.data.url
        if (callback) callback(url)
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    // 文件删除后
    handleRemove(file, fileList, callback) {
      const deleteuUrl = ''
      if (callback) callback(deleteuUrl)
    },
    // 文件上传失败
    handleError(res, callback) {
      this.$message({
        message: '上传出错，稍后重试',
        type: 'error'
      })
      if (callback) callback()
    },
    // 提交校验
    submitForm(type) {
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          if (type === 'save') { // 保存
            // 专题状态为在线中时
            if (this.buildBlock.titleData.status === '1') {
              this.$confirm('此专题已经上线，保存后为草稿状态, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$store.dispatch(this.toolType + '/SET_TITLE_DATA', { ...this.buildBlock.titleData, status: '-2' })
                this.saveBlockData()
              }).catch(() => {
              })
            } else {
              this.saveBlockData()
            }
          } else if (type === 'commit') { // 提交
            this.validateJmdata()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 积木数据转为可提交的JSON
    handleJmData() {
      // this.Loading = Loading.service({ fullscreen: true, background: 'rgba(255, 255, 255, .5)' })
      // 提交数据
      const data = JSON.parse(JSON.stringify(this.buildBlock.titleData)) // 标题数据
      // 组件数据
      data.pages = JSON.parse(JSON.stringify({ pageId: 'jm-' + data.uuid, content: this.buildBlock.jmData }))
      // 遍历组件数据， 获取导航（锚点）数据 label
      const flage = data.pages.content.some(item => item.name === 'jm-nav') // 是否设置锚点组件 true
      if (flage) { // 设置锚点组件时
        const labels = []
        // 获取modelName
        data.pages.content.forEach(item => {
          if (item.modelName && item.modelId) {
            labels.push(item.modelName)
          }
        })
        // label赋值
        data.pages.content.forEach(item => {
          if (item.name === 'jm-nav') {
            item.businessData.useLabels = labels
          }
        })
      }
      // updateTime 更新时间 编辑人
      const editor = sessionStorage.getItem('userName')
      return { ...data, updateTime: Date.now(), editor }
    },
    /**
     * @description 保存积木数据 点击保存
     * 点击保存时，判断是否数据里specialId是否存在，
     * 已存在， 更新专题数据
     * 不存在， 新增专题数据
     */
    saveBlockData() {
      this.Loading = Loading.service({ fullscreen: true, background: 'rgba(255, 255, 255, .5)' })
      const data = this.handleJmData()
      // ajax 校验专题是否已经存在
      getBlockById(data.specialId).then(res => {
        if (res.data && res.data.id) { // 已存在专题
          this.uodateBlock({ ...data, id: res.data.id, editorTime: Date.now, status: '-2' }) // 更新数据
        } else { // 未存在专题
          this.insertBlock(data) // 新增数据
        }
      }).catch(res => {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }).finally(() => {
        this.Loading.close()
      })
    },
    // 新增专题数据
    insertBlock(data) {
      this.Loading = Loading.service({ fullscreen: true, background: 'rgba(255, 255, 255, .5)' })
      // ajax
      insertBlock(data).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      }).catch(err => {
        this.$message({
          message: err.msg,
          type: 'error'
        })
      }).finally(() => {
        this.Loading.close()
      })
    },
    // 更新专题数据
    uodateBlock(data) {
      this.Loading = Loading.service({ fullscreen: true, background: 'rgba(255, 255, 255, .5)' })
      // ajax
      updateBlock(data).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      }).catch(err => {
        this.$message({
          message: err.msg,
          type: 'error'
        })
      }).finally(() => {
        this.Loading.close()
      })
    },
    /**
     * @description 提交积木数据 点击提交 更新状态 0， 1， -1
     * 点击提交时，判断是否数据里specialId是否存在，
     * 已存在， 更新专题数据
     * 不存在， 新增专题数据
     */
    commitBlockData() {
      const data = this.handleJmData() // 获取可提交数据
      let status = '0'
      const dateNow = Date.now()
      if (data.isForever) { // 设置了永久有效
        status = '1' // 上线中
      } else { // 设置了启用时间
        if (data.startTime > dateNow) { // 启用开始时间 大于当前时间
          status = '0' // 待上线
        } else if (data.endTime <= dateNow) { // 启用结束时间 小于当前时间
          status = '-1' // 已下线
        } else {
          status = '1' // 上线中
        }
      }
      data.status = status // 更新状态
      // ajax 校验专题是否已经存在
      getBlockById(data.specialId).then(res => {
        if (res.data && res.data.id) { // 已存在专题
          this.uodateBlock({ ...data, id: res.data.id, editorTime: Date.now }) // 更新数据
        } else { // 未存在专题
          this.insertBlock(data) // 新增数据
        }
      }).catch(res => {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      })
    },
    // 提交时校验数据
    async validateJmdata() {
      if (!validateTitleData(this.buildBlock.titleData)) {
        return false
      }
      // 校验其他数据
      if (!this.buildBlock.jmData && this.buildBlock.jmData.length < 1) {
        this.$message({
          message: '请添加组件数据',
          type: 'error'
        })
        return false
      }
      let flage = true
      for (let index = 0; index < this.buildBlock.jmData.length; index++) {
        const item = this.buildBlock.jmData[index]
        // 开始校验各个组件数据是否符合要求
        switch (item.name) {
          case 'jm-banner': {
            flage = validateBannerData(item, index)
            break
          }
          case 'jm-nav': {
            flage = validateAnchorData(item, index)
            break
          }
          case 'jm-search': {
            flage = validateSearchData(item, index)
            break
          }
          case 'jm-sales': {
            flage = validateSalesData(item, index)
            break
          }
          case 'jm-coupon': {
            flage = validateCouponData(item, index)
            break
          }
          case 'jm-products': {
            flage = validaProducts(item, index, this.toolType)
            break
          }
          case 'jm-showcase': {
            flage = validateShowCaseData(item, index)
            break
          }
          case 'jm-timingSwitch': {
            flage = validateSwitchTime(item, index)
            break
          }
          default: break
        }
        // 停止循环
        if (!flage) {
          return false
        }
      }
      if (!flage) {
        return false
      }
      const couponIdsData = validaCouponIds(this.toolType) // 全局优惠券IDs
      const salesIdsData = validaSalesIds(this.toolType) // 全局奖励佣金Ids
      const activeProductIdsData = [...validateBannerProductIds(this.toolType), ...validaProductsAct(this.toolType)] // 全局活动id
      const productList = validaProductList(this.toolType) // 全部商品Ids
      const specialIdsCommitData = getSpecialIds(this.toolType) // 全部专题Ids
      const useLabels = getUseLabels(this.toolType) // 获取橱窗组件配置专题的模块名称
      try {
        let couponData = { code: 200 }
        let salesData = { code: 200 }
        let productData = { code: 200 }
        let productListData = { code: 200 }
        let specialIdsData = { code: 200 }
        let useLabelsData = { code: 200 }
        if (couponIdsData.idList) { // 优惠券ID存在时
          couponData = await checkCoupon(couponIdsData) // ajax
        }
        // 校验不通过
        if (couponData.code !== 200) {
          this.$message({
            message: couponData.msg,
            type: 'error'
          })
          return false
        }
        if (salesIdsData.idList) { // 全局奖励佣金Ids存在时
          salesData = await checkSalse(salesIdsData) // ajax
        }
        // 校验不通过
        if (salesData.code !== 200) {
          this.$message({
            message: salesData.msg,
            type: 'error'
          })
          return false
        }
        if (activeProductIdsData && activeProductIdsData.length > 0) { //  banner组件的活动商品Ids
          productData = await manyActivityCheckout({ list: activeProductIdsData }) // ajax
        }
        // 校验不通过
        if (productData.code !== 200) {
          this.$message({
            message: productData.msg,
            type: 'error'
          })
          return false
        }
        if (productList && productList.length > 0) { //  banner组件的商品Ids
          productListData = await checkProductList({ idList: productList }) // ajax
        }
        // 校验不通过
        if (productListData.code !== 200) {
          this.$message({
            message: productListData.msg,
            type: 'error'
          })
          return false
        }
        // 校验全局专题Ids
        let checkSspecialIdsFalge = true
        if ('specialIds' in specialIdsCommitData) {
          specialIdsData = await isBlockExistingByIds(specialIdsCommitData)
          // 校验不通过
          if (specialIdsData.code !== 200) {
            this.$message({
              message: specialIdsData.msg,
              type: 'error'
            })
            checkSspecialIdsFalge = false
            return false
          }
        }
        if (!checkSspecialIdsFalge) {
          return false
        }
        // 校验橱窗组件配置专题的模块名称
        if (useLabels) {
          useLabelsData = await checkUseLabelsById({ useLabels })
        }
        // 校验橱窗组件配置专题的模块名称 校验不通过
        if (useLabelsData.code !== 200) {
          this.$message({
            message: useLabelsData.msg,
            type: 'error'
          })
          return false
        }
        // 全部校验通过
        console.log('commit')
        this.commitBlockData()
      } catch (err) {
        return false
      }
    }
  }
}
