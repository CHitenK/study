<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" v-loading="commitLoading" >
    <el-form-item label="切换时间" prop="switchTime" :rules="rules.commonRules">
      <el-date-picker
        v-model="ruleForm.switchTime"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择切换时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="初始图片"  :rules="rules.imgSrc" >
      <el-upload
        class="upload-demo"
        action="/base/block/upload"
        :headers="headers"
        :before-upload="beforeUpload"
        :on-remove="(response, file, fileList) => handleRemove(response, file, (url) => uploadRemove(url, 'initImg'))"
        :before-remove="beforeRemove"
        :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, (url) => uploadSccess(url, 'initImg'))"
        :on-error="(err, file, fileList) => handleError(err, () => uploadRemove('', 'initImg'))"
        multiple
        :limit="1"
        :accept="accept"
        :on-exceed="handleExceed"
        v-model="ruleForm.initImg"
        v-show-img="{ id: '20200529155134' }"
        :file-list="ruleForm.initImgFile">
        <el-button size="small" type="primary">点击上传</el-button> <span v-if="!isShow() && ruleForm.initImgFile" style="color: red">当前显示及图片</span>
        <div slot="tip" class="el-upload__tip">
          <div class="img-tip-box">只能上传jpg/png文件，且不超过1M，建议宽度750
            <img id="20200529155134" v-if="ruleForm.initImg" :src="ruleForm.initImg" class="tip-img-show" />
          </div>
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="切换图片"  :rules="rules.imgSrc" >
      <el-upload
        class="upload-demo"
        action="/base/block/upload"
        :headers="headers"
        :before-upload="beforeUpload"
        :on-remove="(response, file, fileList) => handleRemove(response, file, (url) => uploadRemove(url, 'switchImg'))"
        :before-remove="beforeRemove"
        :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, (url) => uploadSccess(url, 'switchImg'))"
        :on-error="(err, file, fileList) => handleError(err, () => uploadRemove('', 'switchImg'))"
        multiple
        :limit="1"
        :accept="accept"
        :on-exceed="handleExceed"
        v-model="ruleForm.switchImg"
        v-show-img="{id: '20200529155212' }"
        :file-list="ruleForm.switchImgtFile">
        <el-button size="small" type="primary">点击上传</el-button> <span v-if="isShow() && ruleForm.switchImg" style="color: red">当前显示及图片</span>
        <div slot="tip" class="el-upload__tip">
          <div class="img-tip-box">只能上传jpg/png文件，且不超过1M，建议宽度750
            <img id="20200529155212" v-if="ruleForm.switchImg" :src="ruleForm.switchImg" class="tip-img-show" />
          </div>
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="跳转至" required >
      <el-radio-group v-model="ruleForm.jumpType" @change="jumpTypeChange">
        <el-radio :label="0">商品</el-radio>
        <el-radio :label="1">专题</el-radio>
        <el-radio :label="2">活动</el-radio>
        <el-radio :label="3">链接</el-radio>
        <el-radio :label="4">无跳转</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="商品ID" prop="productCode" :rules="rules.commonRules"  v-if="ruleForm.jumpType=== 0">
      <el-input v-model="ruleForm.productCode" style="max-width: 350px;" :name="`productCode`" v-trim clearable @blur="checkProductCode"></el-input>
    </el-form-item>
    <el-form-item label="专题ID" prop="specialId" :rules="rules.commonRules"  v-if="ruleForm.jumpType=== 1">
      <el-input v-model="ruleForm.specialId" style="max-width: 350px;" :name="`specialId`" @blur="checkSpecialId" v-trim clearable></el-input>
    </el-form-item>
    <el-form-item label="活动类型" v-if="ruleForm.jumpType===2">
      <el-select v-model="ruleForm.activityType" placeholder="活动类型选择" style="max-width: 350px;" @change="ruleForm.activityId=''" >
        <el-option v-for="(gitem, gindex) in activityTypeOpitios" :key="gindex" :label="gitem.label" :value="gitem.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动编号" :prop="`activityId`" :rules="rules.commonRules" v-if="ruleForm.jumpType===2">
      <el-input v-model="ruleForm.activityId" style="max-width: 350px;" :name="`activityId`" @blur="validateCheckActivity" v-trim clearable></el-input>
    </el-form-item>
    <el-form-item label="链接" :prop="`link`" :rules="rules.commonRules"  v-if="ruleForm.jumpType===3" >
      <el-input v-model="ruleForm.link" style="max-width: 850px;"  placeholder="http://www.cnblogs.com/long_/archive/2010/09/13/1825239.html" v-trim clearable></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.valiteTips">
      <a style="color: red">{{ruleForm.valiteTips}}</a>
    </el-form-item>
  </el-form>
</template>

<script>
import buildBlock from '@/views/pageManage/mixins/index.js'
import { checkProductId, checkBatchProduct, checkActivity } from '@/api/pageManage/index'
export default {
  mixins: [buildBlock],
  data() {
    return {
      ruleForm: {
        switchTime: '',
        initImg: '',
        switchImg: '',
        jumpType: 4,
        initImgFile: [],
        switchImgFile: [],
        productCode: '',
        specialId: '',
        activityType: 'promotionType',
        activityId: '',
        link: '',
        valiteTips: ''
      },
      rules: {
        commonRules: { required: true, message: '不能为空', trigger: 'blur' },
        imgSrc: { required: true, message: '请上传图片' }
      },
      // 活动类型 、第二件优惠、今日爆款、砍价活动
      activityTypeOpitios: [
        { label: '促销活动', value: 'promotionType' },
        // { label: '第二件优惠', value: 'secondPieces' },
        { label: '今日爆款', value: 'hotActivity' },
        // { label: '砍价活动', value: 'bargainActivity' },
        { label: '销售专场', value: 'saleSpecial' },
        { label: '拼团活动', value: 'assembleActivity' }
      ],
      commitLoading: false
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
        const kData = { ...this.buildBlock.jmData[key], businessData: { ...newData }}
        this.$store.dispatch(this.toolType + '/CHANGE_JM_DATA', { index: key, data: kData })
      }
    }
  },
  created() {
    const data = this.buildBlock.jmData.find((item, i) => { // 组件存在数据的时候
      if (this.activeUuid === item.uuid && 'businessData' in item && 'switchTime' in item.businessData) {
        this.ruleForm = { ...item.businessData }
        return item
      }
    })
    // 确保积木JSON有businessData数据
    if (!data) {
      this.ruleForm.jumpType = ''
      this.ruleForm.jumpType = 4
    }
  },
  methods: {
    // 校验商品号
    async checkProductCode() {
      if (!this.ruleForm.productCode) {
        this.ruleForm.valiteTips = '请输入商品号'
        return false
      }
      try {
        this.commitLoading = true
        const data = await checkProductId(this.ruleForm.productCode)
        if (data.code === 200) {
          this.ruleForm.valiteTips = ''
        } else {
          this.ruleForm.valiteTips = data.msg
        }
        this.commitLoading = false
      } catch (err) {
        this.commitLoading = false
        this.ruleForm.valiteTips = '校验出错，请重新输入'
      }
    },
    // 校验专题Id
    async checkSpecialId() {
      if (!this.ruleForm.specialId) {
        this.ruleForm.valiteTips = '请输入专题Id'
        return false
      }
      try {
        this.commitLoading = true
        const data = await checkBatchProduct({
          specialId: this.ruleForm.specialId.replace(/^(\s|\xA0)+|(\s|\xA0)+$/gi, ''),
          startTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.startTime,
          endTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.endTime
        })
        if (data.code === 200) {
          if (data.data.flag === true) {
            this.ruleForm.valiteTips = ''
          } else {
            this.ruleForm.valiteTips = '不存在此专题'
          }
        } else {
          this.ruleForm.valiteTips = data.msg
        }
        this.commitLoading = false
      } catch (err) {
        this.commitLoading = false
        this.ruleForm.valiteTips = '校验出错，请重新输入'
      }
    },
    // 校验活动id
    async validateCheckActivity() {
      if (!this.ruleForm.activityId) {
        this.ruleForm.valiteTips = '请输入活动id'
        return false
      }
      const cmomitData = {
        activityType: this.ruleForm.activityType,
        id: this.ruleForm.activityId,
        startTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.startTime,
        endTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.endTime
      }
      try {
        const data = await checkActivity(cmomitData)
        if (data.code === 200) {
          this.ruleForm.valiteTips = ''
        } else {
          this.ruleForm.valiteTips = data.msg
        }
      } catch (err) {
        this.ruleForm.valiteTips = '校验出错，请重新输入'
      }
    },
    // 切换类型时清空数据
    jumpTypeChange() {
      this.ruleForm.valiteTips = ''
      this.ruleForm.productCode = ''
      this.ruleForm.specialId = ''
      this.ruleForm.activityId = ''
      this.ruleForm.link = ''
      this.ruleForm.activityType = 'promotionType'
    },
    // 图片上传成功执行
    uploadSccess(url, type) {
      this.ruleForm[type] = url
      this.ruleForm[type + 'File'] = [{ url, name: url }]
    },
    // 删除图片后执行
    uploadRemove(url, type) {
      this.ruleForm[type] = ''
      this.ruleForm[type + 'File'] = []
    },
    isShow() {
      const switchTime = this.ruleForm.switchTime
      if (!switchTime) return false
      const nowTimes = Date.now()
      const endTime = new Date(switchTime.replace(/(^\s*)|(\s*$)/g, '').replace(/-/gi, '/')).getTime()
      if (nowTimes > endTime) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
