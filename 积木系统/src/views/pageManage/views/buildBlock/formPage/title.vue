<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="130px" class="views-page">
    <!--  标题设置-->
    <span>标题设置</span>
    <el-divider></el-divider>
    <el-form-item label="标题名称" prop="title">
      <el-input v-model="ruleForm.title" maxlength="50"  v-trim clearable></el-input>
    </el-form-item>
    <el-form-item label="启用时间" v-if="buildBlock.titleData.status !== '1'">
      <el-col :span="24" v-if="!ruleForm.isForever">
        <el-form-item prop="useTimes">
          <el-date-picker
            v-model="ruleForm.useTimes"
            type="datetimerange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="启用开始时间"
            end-placeholder="启用结束时间"
            :disabled="ruleForm.isForever"
            @change="setTiems"
            >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="永久生效">
          <el-switch v-model="ruleForm.isForever" @change="ruleForm.useTimes = [], setTiems()"></el-switch>
        </el-form-item>
      </el-col>
    </el-form-item>
    <!--  标题设置 end-->
    <!-- 页面设置 -->
    <span>页面设置</span>
    <el-divider></el-divider>
    <el-form-item label="标题栏背景" prop="titleBgColor" required>
      <el-color-picker v-model="ruleForm.titleBgColor"></el-color-picker>
    </el-form-item>
    <el-form-item label="页面背景" prop="bgType" required>
      <el-radio-group v-model="ruleForm.bgType" @change="chose">
        <el-radio label="0">纯色</el-radio>
        <el-radio label="1">图片</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="选择背景色" prop="coverColor"  required v-if="ruleForm.bgType === '0'">
      <el-color-picker v-model="ruleForm.coverColor"></el-color-picker>
    </el-form-item>
    <el-form-item label="选择背景图"  v-if="ruleForm.bgType === '1'" prop="coverImageUrl" required>
      <el-upload
        class="upload-demo"
        action="/base/block/upload"
        :headers="headers"
        :before-upload="beforeUpload"
        :on-remove="(response, file, fileList) => handleRemove(response, file, uploadRemove)"
        :on-error="(err, file, fileList) => handleError(err, uploadRemove)"
        :before-remove="beforeRemove"
        :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, uploadSccess)"
        multiple
        :limit="1"
        :accept="accept"
        :on-exceed="handleExceed"
        v-model="ruleForm.coverImageUrl"
        v-show-img="{id: '202004201735'}"
        :file-list="ruleForm.fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          <div class="img-tip-box">
            只能上传jpg/png文件，且不超过1M
            <img id="202004201736" v-if="ruleForm.coverImageUrl" :src="ruleForm.coverImageUrl" class="tip-img-show" />
          </div>
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="店主显示赚多少" prop="isShowMuch"  required>
      <el-radio-group v-model="ruleForm.isShowMuch">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否首页" prop="titleIndex" required>
      <el-radio-group v-model="ruleForm.titleIndex">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- 页面设置 end-->
    <!-- 页面控制 -->
    <span>页面控制</span>
    <el-divider></el-divider>
    <el-form-item label="浮动按钮" prop="speedy.handle">
      <el-checkbox-group v-model="ruleForm.speedy.handle">
        <el-checkbox v-for="htem in handleOpitions" :label="htem.value" :key="htem.value">{{htem.label}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="目标人群" prop="targetPeople" required>
      <el-checkbox-group v-model="ruleForm.targetPeople">
        <el-checkbox :label="0">全部用户</el-checkbox>
        <el-checkbox :label="3">店主</el-checkbox>
        <el-checkbox :label="1">新用户</el-checkbox>
        <el-checkbox :label="2">老用户</el-checkbox>
      </el-checkbox-group>
    </el-form-item>'
    <!-- v-if="ruleForm.speedy.handle.includes(0)" -->
     <el-form-item label="选择分享图" v-if="ruleForm.speedy.handle.includes(0)"   prop="shareBgImg">
      <el-upload
        class="upload-demo"
        action="/base/block/upload"
        :headers="headers"
        :before-upload="beforeUpload"
        :on-remove="(response, file, fileList) => handleRemove(response, file, uploadRemoveShareBgImg)"
        :on-error="(err, file, fileList) => handleError(err, uploadRemoveShareBgImg)"
        :before-remove="beforeRemove"
        :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, uploadSccessShareBgImg)"
        multiple
        :limit="1"
        :accept="accept"
        :on-exceed="handleExceed"
        v-model="ruleForm.shareBgImg"
        :file-list="ruleForm.shareBgImgFileList"
         v-show-img="{id: '202004201644' }">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            <div class="img-tip-box">只能上传jpg/png文件，且不超过1M，建议宽高595 X 811
              <img id="202004201644" v-if="ruleForm.shareBgImg" :src="ruleForm.shareBgImg" class="tip-img-show" />
            </div>
          </div>
      </el-upload>
    </el-form-item>
  </el-form>
</template>
<script>
import { validateNowTiems } from '@/views/pageManage/utils/validate'
import { transformTime } from '@/views/pageManage/utils/tool'
import buildBlock from '@/views/pageManage/mixins/index.js'
export default {
  mixins: [buildBlock],
  data() {
    return {
      ruleForm: {
        title: '',
        useTimes: [],
        isForever: false,
        coverImageUrl: '',
        coverColor: '#FFFFFF',
        titleBgColor: '#edf0f4',
        bgType: '0',
        isShowMuch: false,
        titleIndex: true,
        speedy: {
          quickNav: false,
          handle: []
        },
        targetPeople: [],
        startTime: '',
        endTime: '',
        fileList: [],
        shareBgImg: '',
        shareBgImgFileList: []
      },
      handleOpitions: [
        { value: 0, label: '分享' },
        { value: 1, label: '购物车' },
        { value: 2, label: '回到顶部' }
      ],
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { required: true, message: '请输入活动名称', trigger: 'focus' }
        ],
        useTimes: [
          { required: true, type: 'array', validator: validateNowTiems, trigger: 'blur' }
        ],
        titleBgColor: [
          { required: true, message: '请选择背景颜色', trigger: 'change' }
        ],
        coverColor: [
          { required: true, message: '请选择背景颜色', trigger: 'change' }
        ],
        targetPeople: [
          { required: true, message: '请选择目标人群', trigger: 'change' }
        ],
        coverImageUrl: [
          { required: true, message: '请选择上传图片' }
        ],
        shareBgImg: [
          { required: true, message: '请选择上传图片' }
        ]
      }
    }
  },
  watch: {
    'ruleForm': {
      immediate: false,
      deep: true,
      handler(newData, oldData) {
        this.$store.dispatch(this.toolType + '/SET_TITLE_DATA', { ...this.buildBlock.titleData, ...newData })
      }
    }
  },
  mounted() {
    // 如果之前设置过 ruleForm取设置好的值
    if ('title' in this.buildBlock.titleData) {
      this.ruleForm = this.buildBlock.titleData
    } else { // 如果没有设置过
      const specialId = 'ZT' + transformTime() + 'PF' + sessionStorage.getItem('CHANNEL_ID') || 36 // 设置专题Id 全局设置的地方 Cookies
      const createName = sessionStorage.getItem('userName') || ''
      const createTime = Date.now()
      this.$store.dispatch(this.toolType + '/SET_TITLE_DATA', { status: '-2', uuid: Date.now(), specialId, createName, createTime, ...this.ruleForm })
    }
  },
  methods: {
    // 设置启用时间
    setTiems() {
      const data = this.ruleForm.useTimes
      if (data && data.length > 0) {
        this.ruleForm.startTime = data[0]
        this.ruleForm.endTime = data[1]
      } else {
        this.ruleForm.startTime = ''
        this.ruleForm.endTime = ''
      }
    },
    // 图片上传后处理
    uploadSccess(url) {
      this.ruleForm.coverImageUrl = url || ''
      this.ruleForm.fileList = [{ name: url, url }]
    },
    // 图片删除后处理
    uploadRemove(url) {
      this.ruleForm.coverImageUrl = ''
      this.ruleForm.fileList = []
    },
    // 切换背景色/图
    chose() {
      this.ruleForm.coverColor = this.ruleForm.bgType === '0' ? this.ruleForm.coverColor : ''
      this.ruleForm.coverImageUrl = this.ruleForm.bgType === '1' ? this.ruleForm.coverImageUrl : ''
      this.ruleForm.fileList = []
    },
    // 删除分享图
    uploadRemoveShareBgImg(url) {
      this.ruleForm = {
        ...this.ruleForm,
        shareBgImgFileList: [],
        shareBgImg: ''
      }
    },
    // 图片上传后处理
    uploadSccessShareBgImg(url) {
      this.ruleForm = {
        ...this.ruleForm,
        shareBgImgFileList: [{ name: url, url }],
        shareBgImg: url
      }
    }
  }
}
</script>
<style lang="scss">
 @import url('./../../../style/base.scss');
</style>

<style lang="scss" scoped>

.views-page{
  width: 100%;
}
</style>
