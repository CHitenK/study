<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  >
    <el-form-item label="背景图片"   prop="bgImg" required >
      <el-upload
        class="upload-demo"
        action="/base/block/upload"
        :headers="headers"
        :before-upload="beforeUpload"
        :on-remove="(response, file, fileList) => handleRemove(response, file, imgRemove)"
        :on-error="(err, file, fileList) => handleError(err, imgRemove)"
        :before-remove="beforeRemove"
        :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, uploadImgSuccess)"
        multiple
        :limit="1"
        :accept="accept"
        :on-exceed="handleExceed"
        v-model="ruleForm.bgImg"
        v-show-img="{id: '202004201735'}"
        :file-list="ruleForm.drawImgFileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          <div class="img-tip-box">
            只能上传jpg/png文件，且不超过1M，建议图片长宽710 X 540
            <img id="202004201735" v-if="ruleForm.bgImg" :src="ruleForm.bgImg" class="tip-img-show" />
          </div>
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="奖励佣金ID" prop="id" :rules=" { required: true, validator: checkSalse, trigger: 'blur' }" v-loading="loading">
      <el-input v-model="ruleForm.id" type="number" style="width: 360px;" clearable  ></el-input>
    </el-form-item>
    <el-form-item label="奖励梯度设置"  v-if="false"></el-form-item>
    <el-table
      v-loading="loading"
      :data="ruleForm.grad"
      border
      v-if="false"
      style="width: 100%">
      <el-table-column
        prop="value"
        label="梯度"
        width="180">
      </el-table-column>
      <el-table-column
        label="奖励描述"
      >
      <template slot-scope="scope">
        <el-input v-model="ruleForm.grad[scope.$index].desc" type="textarea" maxlength="50"  clearable></el-input>
      </template>
      </el-table-column>
  </el-table>
  </el-form>
</template>
<script>
import buildBlock from '@/views/pageManage/mixins/index.js'
import { checkSalse } from '@/api/pageManage/index'
export default {
  mixins: [buildBlock],
  data() {
    return {
      ruleForm: {
        id: '',
        bgImg: '',
        drawImgFileList: [],
        grad: [],
        gradData: {}
      },
      rules: {
        bgImg: [
          { required: true, message: '请上传图片' }
        ]
      },
      loading: false
    }
  },
  watch: {
    'ruleForm': {
      immediate: false,
      deep: true,
      handler(newData, oldData) {
        let key = ''
        this.buildBlock.jmData.forEach((item, i) => { // 组建存在数据的时候
          if (this.activeUuid === item.uuid) {
            key = i
          }
        })
        if (key === '') return false
        const kData = { ...this.buildBlock.jmData[key], businessData: newData }
        this.$store.dispatch(this.toolType + '/CHANGE_JM_DATA', { index: key, data: kData })
      }
    }
  },
  created() {
    this.buildBlock.jmData.forEach((item, i) => { // 组件存在数据的时候
      if (this.activeUuid === item.uuid && 'businessData' in item && 'bgImg' in item.businessData) {
        this.ruleForm = item.businessData
      }
    })
  },
  methods: {
    // 上传优惠券图片 成功
    uploadImgSuccess(url) {
      this.ruleForm.bgImg = url
      this.ruleForm.drawImgFileList = [{ name: url, url }]
    },
    // 上传优惠券图片 删除
    imgRemove(url) {
      this.ruleForm.bgImg = ''
      this.ruleForm.drawImgFileList = []
    },
    // 校验数据
    async checkSalse(rule, value, callback) {
      this.ruleForm.grad = []
      if (!value) {
        return callback(new Error('请输入ID'))
      }
      if (!('startTime' in this.buildBlock.titleData)) {
        return callback(new Error('请先设置专题启用时间'))
      }
      this.loading = true
      const cmomitData = {
        idList: [+value],
        startTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.startTime,
        endTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.endTime
      }
      try {
        const data = await checkSalse(cmomitData)
        this.loading = false
        if (data.code === 200) {
          const targatData = data.data[0] ? (data.data[0].gradient || []) : []
          this.ruleForm.gradData = data.data[0] || {}
          this.getGraddData(targatData)
          callback()
        } else {
          this.ruleForm.grad = []
          return callback(new Error(data.msg))
        }
      } catch (err) {
        this.loading = false
        this.ruleForm.grad = []
        return callback(new Error(err.msg || '输入ID无效'))
      }
    },
    // 获取梯数据
    getGraddData(data) {
      if (!data) {
        return false
      }
      if (typeof data === 'string') {
        data = JSON.parse(data)
      }
      data.forEach(item => {
        this.ruleForm.grad.push({
          value: item.when,
          ...item,
          desc: ''
        })
      })
    }
  }
}
</script>

<style lang="scss">
 @import url('./../../../style/base.scss');
</style>
