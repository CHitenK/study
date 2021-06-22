<template>
  <div class="page-view">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" >
      <model-nav v-if="false" :jmData="buildBlock.jmData" :default="{modelId: ruleForm.modelId, modelName: ruleForm.modelName }" @commitData="commitData" />
      <el-form-item label="展示样式" prop="styleType" required>
        <el-radio-group v-model="ruleForm.styleType" @change="choseStyleType">
          <el-radio :label="0"   style="height: 40px;">抄底样式（3列）</el-radio>
          <el-radio :label="1">活动样式（3列）</el-radio>
          <el-radio :label="2">活动样式（2列）</el-radio>
          <el-radio :label="3">活动样式（1列）</el-radio>
          <el-radio :label="4">美赞臣专属样式（1列）</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="block">
        <span class="demonstration">样式示例图：</span>
        <el-image :src="procuctImgOp[ruleForm.styleType]"></el-image>
      </div>
      <el-form-item label="赚多少颜色" prop="muchColor" :rules="rules.color" v-if="buildBlock.titleData && buildBlock.titleData.isShowMuch" >
        <el-color-picker v-model="ruleForm.muchColor"></el-color-picker> <span style="vertical-align: top;">(店主显示必填)</span>
      </el-form-item>
      <!-- 样式不同点 -->
      <el-form-item label="标题颜色" prop="titleTextColor" :rules="rules.color" v-if="[0, 3].includes(ruleForm.styleType)">
        <el-color-picker v-model="ruleForm.titleTextColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="价格文字色" prop="priceTextColor" :rules="rules.color" v-if="[1, 2].includes(ruleForm.styleType)">
        <el-color-picker v-model="ruleForm.priceTextColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="背景图"  prop="productBgImg" :rules="rules.imgSrc">
        <el-upload
          class="upload-demo"
          action="/base/block/upload"
          :headers="headers"
          :before-upload="beforeUpload"
          :on-remove="(response, file, fileList) => handleRemove(response, file, uploadRemoveProductBgImg)"
          :on-error="(err, file, fileList) => handleError(err, uploadRemoveProductBgImg)"
          :before-remove="beforeRemove"
          :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, uploadSccessProductBgImg)"
          multiple
          :limit="1"
          :accept="accept"
          :on-exceed="handleExceed"
          v-model="ruleForm.productBgImg"
          v-show-img="{id: '202004201733' }"
          :file-list="ruleForm.productBgImgFileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            <div class="img-tip-box">
              只能上传jpg/png文件，且不超过1M
              <img id="202004201733" v-if="ruleForm.productBgImg" :src="ruleForm.productBgImg" class="tip-img-show" />
            </div>
          </div>
        </el-upload>
      </el-form-item>
      <!-- 样式不同点 end-->
      <el-form-item label="背景样式" prop="bgType">
        <el-radio-group v-model="ruleForm.bgType" @change="chose">
          <el-radio :label="0">纯色</el-radio>
          <el-radio :label="1">图片</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="背景样式纯色" prop="wrapperBgColor" v-if="ruleForm.bgType === 0" :rules="rules.color">
        <el-color-picker v-model="ruleForm.wrapperBgColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="背景样式图"  v-if="ruleForm.bgType === 1" prop="wrapperBgImg" :rules="rules.imgSrc" >
        <el-upload
          class="upload-demo"
          action="/base/block/upload"
          :headers="headers"
          :before-upload="beforeUpload"
          :on-remove="(response, file, fileList) => handleRemove(response, file, uploadRemoveWrapperBgImg)"
          :on-error="(err, file, fileList) => handleError(err, uploadRemoveWrapperBgImg)"
          :before-remove="beforeRemove"
          :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, uploadSccessWrapperBgImg)"
          multiple
          :limit="1"
          :accept="accept"
          :on-exceed="handleExceed"
          v-model="ruleForm.wrapperBgImg"
          v-show-img="{id: '202004201738' }"
          :file-list="ruleForm.wrapperBgImgFileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
             <div class="img-tip-box">
                只能上传jpg/png文件，且不超过1M
                <img id="202004201738" v-if="ruleForm.wrapperBgImg" :src="ruleForm.wrapperBgImg" class="tip-img-show" />
              </div>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品添加" prop="type">
        <el-button style="margin-left: 10px" type="primary" @click="dialogVisible =true, rouNum=Date.now()" v-if="ruleForm.product.length === 0">添加</el-button>
        <el-button style="margin-left: 10px" type="primary" @click="dialogVisible =true, rouNum=Date.now()" v-if="ruleForm.product.length > 0">查看</el-button>
        <span v-if="ruleForm.product.length > 0">(已添加{{ruleForm.product.length}}件商品)</span>
      </el-form-item>
      <el-form-item label="展示商品数" prop="showProNum" :rules="{ required: true, validator: (rule, value, callback) => valitaShowProNum(rule, value, callback), trigger: 'blur' }" v-if="ruleForm.product.length > 0">
        <el-input v-model="ruleForm.showProNum" type="number" clearable style="width: 200px;" v-tofixed ></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sortType">
        <el-radio-group v-model="ruleForm.sortType">
          <el-radio :label="1">手动排序</el-radio>
          <el-radio :label="0">销量排序</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="楼层分享图" >
        <el-upload
          class="upload-demo"
          action="/base/block/upload"
          :headers="headers"
          :before-upload="beforeUpload"
          :on-remove="(response, file, fileList) => handleRemove(response, file, uploadRemoveFloorShareImg)"
          :on-error="(err, file, fileList) => handleError(err, uploadRemoveFloorShareImg)"
          :before-remove="beforeRemove"
          :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, uploadSccessFloorShareImg)"
          multiple
          :limit="1"
          :accept="accept"
          :on-exceed="handleExceed"
          v-model="ruleForm.floorShareImg"
          v-show-img="{id: '202004201778'}"
          :file-list="ruleForm.floorShareImgFileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            <div class="img-tip-box">
              只能上传750*235的jpg/png文件，且不超过1M
              <img id="202004201778" v-if="ruleForm.floorShareImg" :src="ruleForm.floorShareImg" class="tip-img-show" />
            </div>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="分享价格名称"  prop="sharePriceName" :rules="rules.sharePriceName" >
        <el-input v-model="ruleForm.sharePriceName" type="text" style="width: 360px;" clearable  ></el-input>
      </el-form-item>
      <div>页面设置</div>
      <el-form-item label="抢光商品展示" prop="soldOutShow">
        <el-radio-group v-model="ruleForm.soldOutShow">
          <el-radio :label="0">抢光商品默认排序展示</el-radio>
          <el-radio :label="2">抢光商品沉底显示</el-radio>
          <el-radio :label="1">不显示</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-dialog
      title="活动商品"
      :showClose="false"
      :closeOnClickModal="false"
      :visible.sync="dialogVisible"
      top="80px"
      width="86%">
      <products-act :ruleForm.sync="ruleForm"  @close="dialogVisible=false" :rouNum="rouNum" />
    </el-dialog>
  </div>
</template>
<script>
import buildBlock from '@/views/pageManage/mixins/index.js'
import modelName from '@/views/pageManage/components/modelName.vue'
import productsAct from '@/views/pageManage/components/productsAct'
// import { getActivityProduct } from '@/api/pageManage/index'
import type0 from '@/assets/product_img/type0.png'
import type1 from '@/assets/product_img/type1.png'
import type2 from '@/assets/product_img/type2.png'
import type3 from '@/assets/product_img/type3.jpg'
import type4 from '@/assets/product_img/type4.jpg'
export default {
  components: {
    'modelNav': modelName,
    productsAct
  },
  mixins: [buildBlock],
  data() {
    return {
      ruleForm: {
        modelName: '',
        modelId: '',
        styleType: 0,
        bgType: 0,
        muchColor: '#ffffff',
        titleTextColor: '#999999',
        priceTextColor: '#999999',
        type: 1,
        soldOutShow: 0,
        showProNum: 9,
        sortType: 1,
        actType: 'promotionType',
        actId: '',
        wrapperBgColor: '#FFFFFF',
        wrapperBgImg: '',
        wrapperBgImgFileList: [],
        productBgImg: '', // 商品背景图
        productBgImgFileList: [],
        product: [],
        floorShareImgFileList: [],
        floorShareImg: ''
      },
      procuctImgOp: [type0, type1, type2, type3, type4],
      rules: {
        specialType: { required: true, message: '请选择活动类型', trigger: 'change' },
        showProNum: { required: true, message: '请输入内容', trigger: 'blur' },
        imgSrc: { required: true, message: '请上传图片' },
        color: { required: true, message: '请选择颜色', trigger: 'change' },
        sharePriceName: { required: true, message: '不能为空', trigger: 'blur' }
      },
      dialogVisible: false,
      rouNum: Date.now() // 随机数
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
        const kData = { ...this.buildBlock.jmData[key], modelId: newData.modelId, mdelName: newData.mdelName, businessData: newData }
        this.$store.dispatch(this.toolType + '/CHANGE_JM_DATA', { index: key, data: kData })
      }
    }
  },
  created() {
    this.buildBlock.jmData.forEach((item, i) => { // 组件存在数据的时候
      if (this.activeUuid === item.uuid && 'businessData' in item && 'type' in item.businessData) {
        this.ruleForm = item.businessData
      }
    })
  },
  methods: {
    // 选中样式类型执行
    choseStyleType() {
      this.ruleForm.titleTextColor = ''
      this.ruleForm.priceTextColor = ''
      this.ruleForm.productBgImg = ''
      this.ruleForm.productBgImgFileList = []
    },
    // 选中背景类型
    chose() {
      this.ruleForm.wrapperBgImg = ''
      this.ruleForm.wrapperBgColor = ''
      this.ruleForm.wrapperBgImgFileList = []
    },
    // 图片上传成功执行
    uploadSccess(url, index) {
      this.ruleForm.bgImg = url
      this.ruleForm.listFile = [{ name: url, url }]
    },
    // 删除图片后执行
    uploadRemove(url, index) {
      this.ruleForm.bgImg = ''
      this.ruleForm.listFile = []
    },
    // 获取模块数据
    commitData(data) {
      this.ruleForm = { ...this.ruleForm, ...data }
    },
    // 校验展示商品数
    valitaShowProNum(rule, value, callback) {
      if (!value || value === '0') {
        return callback(new Error('请输入内容且大于0'))
      }
      if (+value < 0) {
        return callback(new Error('请输入正整数'))
      }
      if (+value > this.ruleForm.product.length) {
        return callback(new Error('展示商品数不能超过商品数'))
      }
      return callback()
    },
    // 删除背景图后执行
    uploadRemoveProductBgImg(url) {
      this.ruleForm.productBgImg = ''
      this.ruleForm.productBgImgFileList = []
    },
    // 上传背景图成功执行
    uploadSccessProductBgImg(url) {
      this.ruleForm.productBgImg = url
      this.ruleForm.productBgImgFileList = [{ name: url, url }]
    },
    // 删除背景样式图执行
    uploadRemoveWrapperBgImg() {
      this.ruleForm.wrapperBgImg = ''
      this.ruleForm.wrapperBgImgFileList = []
    },
    // 上传背景样式图成功执行
    uploadSccessWrapperBgImg(url) {
      this.ruleForm.wrapperBgImg = url
      this.ruleForm.wrapperBgImgFileList = [{ name: url, url }]
    },
    // 上传分享图成功执行
    uploadSccessFloorShareImg(url) {
      const ruleForm = this.ruleForm
      ruleForm.floorShareImg = url
      ruleForm.floorShareImgFileList = [{ name: url, url }]
      this.ruleForm = ruleForm
    },
    // 删除分享图执行
    uploadRemoveFloorShareImg() {
      const ruleForm = this.ruleForm
      ruleForm.floorShareImg = ''
      ruleForm.floorShareImgFileList = []
      this.ruleForm = ruleForm
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
 .product-box{
   width: 100%;
   height: 300px;
   margin-bottom: 15px;
   box-sizing: border-box;
   padding-left: 15px;
 }
 .add-btn-box{
   margin-bottom: 10px;
   margin-left: 100px;
 }
 .do-btn{
   display: flex;
   justify-content: space-around;
 }
 .block{
   width: 300px;
   margin-left: 120px;
   .el-image__inner{
     width: 100%;
     margin-top: 10px;
     display: inline-block;
   }
   .demonstration{
     margin-bottom: 10px;
     display: inline-block;
   }
 }
</style>

