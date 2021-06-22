<template>
  <div class="page-view">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  v-loading="commitLoading">
      <model-nav :jmData="buildBlock.jmData" :default="{modelId: ruleForm.modelId, modelName: ruleForm.modelName }" @commitData="commitData" />
      <div v-for="(item, index) in ruleForm.items" :key="index" >
        <el-form-item label="图片帧数" >
          <el-input :value="`第${index+1}帧`" disabled style="width: 150px;" clearable></el-input>
          <i class="el-icon-circle-plus zuo-btn" @click="addFrames" v-if="index === ruleForm.items.length - 1 && ruleForm.items.length < 10" ></i>
          <i class="el-icon-remove zuo-btn" @click="deletFrames(index)" v-if="ruleForm.items.length > 1" ></i>
        </el-form-item>
        <el-form-item label="图片" :prop="`items.${index}.image`"  :rules="rules.imgSrc" >
          <el-upload
            class="upload-demo"
            action="/base/block/upload"
            :headers="headers"
            :before-upload="beforeUpload"
            :on-remove="(response, file, fileList) => handleRemove(response, file, (url) => uploadRemove(url, index))"
            :before-remove="beforeRemove"
            :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, (url) => uploadSccess(url, index))"
            :on-error="(err, file, fileList) => handleError(err, () => uploadRemove('', index))"
            multiple
            :limit="1"
            :accept="accept"
            :on-exceed="handleExceed"
            v-model="item.image"
            v-show-img="{id: '202004201721' }"
            :file-list="item.listFile">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              <div class="img-tip-box">只能上传jpg/png文件，且不超过1M
                <img id="202004201721" v-if="item.image" :src="item.image" class="tip-img-show" />
              </div>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="跳转至" required >
          <el-radio-group v-model="item.jumpType" @change="jumpTypeChange(index)">
            <el-radio :label="0">商品</el-radio>
            <el-radio :label="1">专题</el-radio>
            <el-radio :label="2">活动</el-radio>
            <el-radio :label="3">链接</el-radio>
            <el-radio :label="4">无跳转</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品ID" :prop="`items.${index}.productCode`" :rules="rules.commonRules"  v-if="item.jumpType=== 0">
          <el-input v-model="item.productCode" style="max-width: 350px;" :name="`items.${index}.productCode`" v-trim clearable @blur="checkProductCode(index)"></el-input>
        </el-form-item>
        <el-form-item label="专题ID" :prop="`items.${index}.specialId`" :rules="rules.commonRules"  v-if="item.jumpType=== 1">
          <el-input v-model="item.specialId" style="max-width: 350px;" :name="`items.${index}.specialId`" @blur="checkSpecialId(index)" v-trim clearable></el-input>
        </el-form-item>
        <el-form-item label="活动类型" v-if="item.jumpType===2">
          <el-select v-model="item.activityType" placeholder="活动类型选择" style="max-width: 350px;" @change="item.activityId=''" >
            <el-option v-for="(gitem, gindex) in activityTypeOpitios" :key="gindex" :label="gitem.label" :value="gitem.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动编号" :prop="`items.${index}.activityId`" :rules="rules.commonRules" v-if="item.jumpType===2">
          <el-input v-model="item.activityId" style="max-width: 350px;" :name="`items.${index}.activityId`" @blur="validateCheckActivity(index)" v-trim clearable></el-input>
        </el-form-item>
        <el-form-item label="链接" :prop="`items.${index}.link`" :rules="rules.commonRules"  v-if="item.jumpType===3" >
          <el-input v-model="item.link" style="max-width: 850px;" :name="`items.${index}.commonRules`" placeholder="http://www.cnblogs.com/long_/archive/2010/09/13/1825239.html" v-trim clearable></el-input>
        </el-form-item>
        <el-form-item v-if="item.valiteTips">
          <a style="color: red">{{item.valiteTips}}</a>
        </el-form-item>
      </div>
      <el-form-item label="跳转时间" prop="jumpTime" v-if="ruleForm.items.length > 1">
        <el-input v-model="ruleForm.jumpTime" style="width: 200px;" v-trim clearable @blur="toInt"></el-input>
        秒
      </el-form-item>
      <!-- <el-form-item label="设置为锚点" prop="isAnchorPoint" required>
        <el-radio-group v-model="ruleForm.isAnchorPoint">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item> -->
    </el-form>
  </div>
</template>
<script>
import buildBlock from '@/views/pageManage/mixins/index.js'
import { checkProductId, checkBatchProduct, checkActivity } from '@/api/pageManage/index'
import { isUrl, validaJumpTime } from '@/views/pageManage/utils/validate'
import modelName from '@/views/pageManage/components/modelName.vue'
export default {
  components: {
    'modelNav': modelName
  },
  mixins: [buildBlock],
  data() {
    return {
      ruleForm: {
        modelName: '',
        modelId: '',
        jumpTime: '',
        isAnchorPoint: false,
        items: [
          {
            jumpType: 0,
            link: '',
            image: '',
            productCode: '',
            specialId: '',
            activityType: 'promotionType',
            activityId: '',
            listFile: [],
            valiteTips: ''
          }
        ]
      },
      rules: {
        modelId: [
          { required: true, message: '请输入模块名称', trigger: 'blur' }
        ],
        jumpTime: [
          { required: true, validator: validaJumpTime, trigger: 'blur' }
        ],
        link: [
          { required: true, validator: isUrl, trigger: 'blur' }
        ],
        commonRules: { required: true, message: ' ', trigger: 'blur' },
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
        // 跳转时间 s => ms
        const jumpTime = newData.jumpTime ? newData.jumpTime * 1000 : newData.jumpTime
        const kData = { ...this.buildBlock.jmData[key], modelName: newData.modelName, modelId: newData.modelId, businessData: { ...newData, jumpTime }}
        this.$store.dispatch(this.toolType + '/CHANGE_JM_DATA', { index: key, data: kData })
      }
    }
  },
  created() {
    const data = this.buildBlock.jmData.find((item, i) => { // 组件存在数据的时候
      if (this.activeUuid === item.uuid && 'businessData' in item && 'modelName' in item.businessData) {
        // 跳转时间 毫秒 => 秒
        const jumpTime = item.businessData.jumpTime ? item.businessData.jumpTime / 1000 : item.businessData.jumpTime
        this.ruleForm = { ...item.businessData, jumpTime }
        return item
      }
    })
    // 确保积木JSON有businessData数据
    if (!data) {
      this.ruleForm.isAnchorPoint = ''
      this.ruleForm.isAnchorPoint = false
    }
  },
  methods: {
    // 添加帧数
    addFrames() {
      const keyArray = Object.keys(this.ruleForm.items[0])
      const data = {}
      let key
      for (key of keyArray) {
        data[key] = ''
      }
      // 设置默认值
      const tData = {
        ...data,
        jumpType: 0,
        listFile: [],
        activityType: 'promotionType'
      }
      this.ruleForm.items.push(tData)
    },
    // 删除帧数
    deletFrames(index) {
      this.ruleForm.items.splice(index, 1)
    },
    // 图片上传成功执行
    uploadSccess(url, index) {
      this.ruleForm.items[index].image = url
      this.ruleForm.items[index].listFile = [{ name: url, url }]
    },
    // 删除图片后执行
    uploadRemove(url, index) {
      this.ruleForm.items[index].image = ''
      this.ruleForm.items[index].listFile = []
    },
    // 校验活动id
    async validateCheckActivity(index) {
      if (!this.ruleForm.items[index].activityId) {
        this.ruleForm.items[index].valiteTips = '请输入活动id'
        return false
      }
      const cmomitData = {
        activityType: this.ruleForm.items[index].activityType,
        id: this.ruleForm.items[index].activityId,
        startTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.startTime,
        endTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.endTime
      }
      try {
        const data = await checkActivity(cmomitData)
        if (data.code === 200) {
          this.ruleForm.items[index].valiteTips = ''
        } else {
          this.ruleForm.items[index].valiteTips = data.msg
        }
      } catch (err) {
        this.ruleForm.items[index].valiteTips = '校验出错，请重新输入'
      }
    },
    // 校验商品号
    async checkProductCode(index) {
      if (!this.ruleForm.items[index].productCode) {
        this.ruleForm.items[index].valiteTips = '请输入商品号'
        return false
      }
      try {
        this.commitLoading = true
        const data = await checkProductId(this.ruleForm.items[index].productCode)
        if (data.code === 200) {
          this.ruleForm.items[index].valiteTips = ''
        } else {
          this.ruleForm.items[index].valiteTips = data.msg
        }
        this.commitLoading = false
      } catch (err) {
        this.commitLoading = false
        this.ruleForm.items[index].valiteTips = '校验出错，请重新输入'
      }
    },
    // 校验专题Id
    async checkSpecialId(index) {
      if (!this.ruleForm.items[index].specialId) {
        this.ruleForm.items[index].valiteTips = '请输入专题Id'
        return false
      }
      try {
        this.commitLoading = true
        const data = await checkBatchProduct({
          specialId: this.ruleForm.items[index].specialId.replace(/^(\s|\xA0)+|(\s|\xA0)+$/gi, ''),
          startTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.startTime,
          endTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.endTime
        })
        if (data.code === 200) {
          if (data.data.flag === true) {
            this.ruleForm.items[index].valiteTips = ''
          } else {
            this.ruleForm.items[index].valiteTips = '不存在此专题'
          }
        } else {
          this.ruleForm.items[index].valiteTips = data.msg
        }
        this.commitLoading = false
      } catch (err) {
        this.commitLoading = false
        this.ruleForm.items[index].valiteTips = '校验出错，请重新输入'
      }
    },
    // 获取模块数据
    commitData(data) {
      this.ruleForm = { ...this.ruleForm, ...data }
    },
    // 保留整数
    toInt() {
      if (!this.ruleForm.jumpTime) return false
      this.ruleForm.jumpTime = parseInt(this.ruleForm.jumpTime)
    },
    // 切换类型时清空数据
    jumpTypeChange(index) {
      this.ruleForm.items[index].valiteTips = ''
      this.ruleForm.items[index].productCode = ''
      this.ruleForm.items[index].specialId = ''
      this.ruleForm.items[index].activityId = ''
      this.ruleForm.items[index].link = ''
      this.ruleForm.items[index].activityType = 'promotionType'
    }
  }
}
</script>

<style lang="scss" scoped>
 .page-view{
   width: 100%;
   max-height: 100%;
   overflow-y: auto;
   transition: width 2s ease-in 0s;
 }
 .zuo-btn{
   font-size: 20px;
   margin: 0 5px;
   cursor: pointer;
   color: #1890ff;
 }
</style>

