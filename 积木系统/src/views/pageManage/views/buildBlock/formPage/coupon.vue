<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
    <el-form-item label="优惠券图片"   prop="img">
      <el-upload
        class="upload-demo"
        action="/base/block/upload"
        :headers="headers"
        :before-upload="beforeUpload"
        :on-remove="(response, file, fileList) => handleRemove(response, file, imgRemove)"
        :before-remove="beforeRemove"
        :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, uploadImgSuccess)"
        :on-error="(err, file, fileList) => handleError(err,imgRemove)"
        multiple
        :limit="1"
        :accept="accept"
        :on-exceed="handleExceed"
        v-model="ruleForm.img"
        v-show-img="{id: '202004201729' }"
        :file-list="ruleForm.imgFileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          <div class="img-tip-box">只能上传jpg/png文件，且不超过1M，建议图片长宽710 X 540
            <img id="202004201729" v-if="ruleForm.img" :src="ruleForm.img" class="tip-img-show" />
          </div>
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="优惠券ID" prop="id" :rules="{ required: true, validator: (rule, value, callback) => validateCoupon(rule, value, callback, toolType), trigger: 'blur' }" >
      <el-input v-model="ruleForm.id" type="number" style="width: 230px;" clearable></el-input>
    </el-form-item>
    <el-form-item label="领取完图片" prop="drawImgType">
      <el-radio-group v-model="ruleForm.drawImgType" @change="changeDrawImgType">
        <el-radio :label="1">切换样式</el-radio>
        <el-radio :label="0">不显示</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item  v-if="ruleForm.drawImgType === 1" prop="drawImg">
      <el-upload
        class="upload-demo"
        action="/base/block/upload"
        :headers="headers"
        :before-upload="beforeUpload"
        :on-remove="(response, file, fileList) => handleRemove(response, file, drawImgTypeRemove)"
        :on-error="(err, file, fileList) => handleError(err, drawImgTypeRemove)"
        :before-remove="beforeRemove"
        :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, uploadDrawImgSuccess)"
        multiple
        :limit="1"
        :accept="accept"
        :on-exceed="handleExceed"
        v-model="ruleForm.drawImg"
        v-show-img="{id: '202004201731' }"
        :file-list="ruleForm.drawImgFileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          <div class="img-tip-box">只能上传jpg/png文件，且不超过1M，建议图片长宽710 X 540
            <img id="202004201731" v-if="ruleForm.drawImg" :src="ruleForm.drawImg" class="tip-img-show" />
          </div>
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="派发完图片" prop="distributeType">
      <el-radio-group v-model="ruleForm.distributeType" @change="changeDistributeImg">
        <el-radio :label="1">切换样式</el-radio>
        <el-radio :label="0">不显示</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item  v-if="ruleForm.distributeType === 1" prop="distributeImg">
      <el-upload
        class="upload-demo"
        action="/base/block/upload"
        :headers="headers"
        :before-upload="beforeUpload"
        :on-remove="(response, file, fileList) => handleRemove(response, file, distributeTypeRemove)"
        :on-error="(err, file, fileList) => handleError(err, drawImgTypeRemove)"
        :before-remove="beforeRemove"
        :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, uploadDistributeImgSuccess)"
        multiple
        :limit="1"
        :accept="accept"
        :on-exceed="handleExceed"
        v-model="ruleForm.distributeImg"
        v-show-img="{id: '202004201732' }"
        :file-list="ruleForm.distributeImgList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          <div class="img-tip-box">
            只能上传jpg/png文件，且不超过1M，建议图片长宽710 X 540
            <img id="202004201732" v-if="ruleForm.distributeImg" :src="ruleForm.distributeImg" class="tip-img-show" />
          </div>
        </div>
      </el-upload>
    </el-form-item>
  </el-form>
</template>
<script>
import buildBlock from '@/views/pageManage/mixins/index.js'
import { validateCoupon } from '@/views/pageManage/utils/validate.js'
export default {
  mixins: [buildBlock],
  data() {
    return {
      ruleForm: {
        id: '',
        drawImg: '',
        drawImgType: 1,
        img: '',
        imgFileList: [],
        drawImgFileList: [],
        distributeType: 1,
        distributeImg: '',
        distributeImgList: []
      },
      rules: {
        img: [
          { required: true, message: '请上传图片' }
        ],
        drawImg: [
          { required: true, message: '请上传图片' }
        ],
        distributeImg: [
          { required: true, message: '请上传图片' }
        ]
      }
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
    const data = this.buildBlock.jmData.find((item, i) => { // 组件存在数据的时候
      if (this.activeUuid === item.uuid && 'businessData' in item && 'img' in item.businessData) {
        this.ruleForm = item.businessData
        return item
      }
    })
    if (!data) {
      this.ruleForm.drawImgType = 0
      this.ruleForm.drawImgType = 1
    }
  },
  methods: {
    validateCoupon,
    // 切换领取完图片是否切换样式
    changeDrawImgType() {
      this.ruleForm.drawImgFileList = []
      this.ruleForm.drawImg = ''
    },
    // 切换派发完图片
    changeDistributeImg() {
      this.ruleForm.distributeImgList = []
      this.ruleForm.distributeImg = ''
    },
    // 上传优惠券图片 成功
    uploadImgSuccess(url) {
      this.ruleForm.img = url
      this.ruleForm.imgFileList = [{ name: url, url }]
    },
    // 上传优惠券图片 删除
    imgRemove(url) {
      this.ruleForm.img = ''
      this.ruleForm.imgFileList = []
    },
    // 领取完上传图片成功
    uploadDrawImgSuccess(url) {
      this.ruleForm.drawImg = url
      this.ruleForm.drawImgFileList = [{ name: url, url }]
    },
    // 领取完 图片删除
    drawImgTypeRemove() {
      this.ruleForm.drawImgFileList = []
      this.ruleForm.drawImg = ''
    },
    // 派发完 图片删除
    distributeTypeRemove() {
      this.ruleForm.distributeImgList = []
      this.ruleForm.distributeImg = ''
    },
    // 派发完 上传图片成功
    uploadDistributeImgSuccess(url) {
      this.ruleForm.distributeImgList = [{ name: url, url }]
      this.ruleForm.distributeImg = url
    }
  }
}
</script>

<style lang="scss">
 @import url('./../../../style/base.scss');
</style>
