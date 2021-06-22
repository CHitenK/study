<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" >
      <el-form-item label="展示橱窗个数" prop="showItemNum"  :rules="rules.ruNumber">
        <el-input v-model="ruleForm.showItemNum" maxlength="50" style="width: 360px;" v-trim clearable @blur="handleNumShowItemNum"></el-input>
      </el-form-item>
      <el-form-item label="橱窗排数" prop="rowNum" :rules="rules.rowNum">
        <el-input v-model="ruleForm.rowNum" maxlength="50" style="width: 360px;" @blur="handleNumRowNum"  v-trim clearable></el-input>
      </el-form-item>
      <el-form-item label="橱窗背景色" prop="showCaseBgColor" :rules="rules.color" >
        <el-color-picker v-model="ruleForm.showCaseBgColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="橱窗配置" prop="type">
        <el-button style="margin-left: 10px" type="primary" @click="goSet">去配置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="橱窗配置"
      :visible.sync="dialogVisible"
      top="80px"
      width="78%">
      <div class="add-box" id="add-box">
        <div class="add-title">橱窗序号排序为从左至右从上到下由1递增</div>
        <el-table
          :data="showcaseConfig"
          :height="taHei"
          border
          v-loading="commitLoading"
          style="width: 100%">
          <el-table-column
            label="橱窗序号"
            align="center"
            width="100">
            <template slot-scope="scope">
              {{'橱窗' + (scope.$index + 1) }}
            </template>
          </el-table-column>
          <el-table-column
            label="跳转至"
            align="center"
            width="230">
            <template slot-scope="scope">
              <el-select placeholder="跳转至" style="max-width: 350px;" v-model="showcaseConfig[scope.$index].jumpType" @change="changeJumpType(scope.$index)" >
                <el-option v-for="(gitem, gindex) in typeOpt" :key="gindex" :label="gitem.label" :value="gitem.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="图片"
            align="center"
             width="220"
            >
            <template slot-scope="scope">
              <el-upload
                class="avatar-uploader"
                action="/base/block/upload"
                :headers="headers"
                :before-upload="beforeUpload"
                :on-error="handleError"
                :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, scope.$index)"
                :accept="accept"
                :show-file-list="false"
                >
                <div class="image-box" v-if="scope.row.image">
                  <img  :src="scope.row.image" class="avatar" />
                  <span class="kk">
                    修改图片
                  </span>
                </div>
                <div v-else class="image-box-none">
                  <i  class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column
            label="内容"
            align="left"
            >
            <template slot-scope="scope">
              <div>
                <el-input v-model="showcaseConfig[scope.$index].productCode" v-if="showcaseConfig[scope.$index].jumpType === 0" style="width: 420px;" placeholder="请输入商品Id" @blur="checkProductCode(scope.$index)" v-trim clearable></el-input>
                <div>
                   <el-input v-model="showcaseConfig[scope.$index].specialId" v-if="showcaseConfig[scope.$index].jumpType === 1" style="width: 180px;" placeholder="请输入专题Id" @blur="checkSpecialId(scope.$index)"   v-trim clearable></el-input>
                   <el-input v-model="showcaseConfig[scope.$index].moduleName" v-if="showcaseConfig[scope.$index].jumpType === 1" style="width: 220px;" placeholder="请输入模块名称"  @blur="checkModelName(scope.$index)"  v-trim clearable></el-input>
                </div>
                <el-input v-model="showcaseConfig[scope.$index].couponId" v-if="showcaseConfig[scope.$index].jumpType === 5" style="width: 420px;" placeholder="请输入优惠券Id" @blur="validateCoupon(scope.$index)" v-trim clearable></el-input>
                <div v-if="showcaseConfig[scope.$index].jumpType=== 2">
                  <el-select placeholder="跳转至" style="max-width: 160px;" v-model="showcaseConfig[scope.$index].activityType" @change="showcaseConfig[scope.$index].activityId='', showcaseConfig[scope.$index].valiteTips=''"  >
                    <el-option v-for="(gitem, gindex) in activityTypeOpitios" :key="gindex" :label="gitem.label" :value="gitem.value"></el-option>
                  </el-select>
                  <el-input v-model="showcaseConfig[scope.$index].activityId"  style="width: 300px;"  placeholder="请输入活动编号" @blur="validateCheckActivity(scope.$index)"  v-trim clearable></el-input>
                </div>
                 <el-input v-model="showcaseConfig[scope.$index].link" v-if="showcaseConfig[scope.$index].jumpType === 3" style="width: 420px;" placeholder="请输入跳转链接" :title="showcaseConfig[scope.$index].link"  v-trim clearable></el-input>
                <span v-if="showcaseConfig[scope.$index].jumpType === 4">无跳转</span>
              </div>
               <span style="color: red;">{{scope.row.valiteTips}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
             width="120"
            >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="deleteList(scope.$index)" >删除</el-button>
              <el-button type="text" size="small" v-if="scope.$index !== 0 " @click="up(scope.$index)" >上移</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="add-tool-box-I">
            <el-button type="primary" @click="addList">+添加橱窗</el-button>
        </div>
        <div class="add-tool-box-II">
            <el-button type="primary" @click="save">确定</el-button>
            <el-button @click="cancle">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import buildBlock from '@/views/pageManage/mixins/index.js'
import { checkProductId, checkBatchProduct, checkActivity, checkCoupon, checkUseLabelsById } from '@/api/pageManage/index'
export default {
  mixins: [buildBlock],
  data() {
    return {
      ruleForm: {
        showItemNum: '',
        rowNum: '',
        showCaseBgColor: '#fff',
        showcaseConfig: []
      },
      rules: {
        ruNumber: {
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (!value) { return callback(new Error('不能为空')) }
            callback()
          }
        },
        rowNum: {
          required: true,
          validator: (rule, value, callback) => {
            if (!value) { return callback(new Error('不能为空')) }
            if (value > 2) { return callback(new Error('不能大于2')) }
            callback()
          },
          trigger: 'blur'
        },
        color: { required: true, message: '请选择颜色', trigger: 'change' }
      },
      dialogVisible: false,
      tableData: [{}],
      taHei: 300,
      typeOpt: [
        { label: '商品', value: 0 },
        { label: '专题', value: 1 },
        { label: '活动', value: 2 },
        { label: '链接', value: 3 },
        { label: '无跳转', value: 4 },
        { label: '优惠券', value: 5 }
      ],
      // 活动类型 、第二件优惠、今日爆款、砍价活动
      activityTypeOpitios: [
        { label: '促销活动（精选活动，整点秒杀，天天特价）', value: 'promotionType' },
        { label: '今日爆款', value: 'hotActivity' },
        // { label: '第二件优惠', value: 'secondPieces' },
        // { label: '砍价活动', value: 'bargainActivity' },
        { label: '销售专场', value: 'saleSpecial' },
        { label: '拼团活动', value: 'assembleActivity' }
      ],
      commitLoading: false,
      showcaseConfig: []
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
      if (this.activeUuid === item.uuid && 'businessData' in item && 'showItemNum' in item.businessData) {
        this.ruleForm = item.businessData
      }
    })
  },
  methods: {
    goSet() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.dialogVisible = true
          // 计算橱窗列表table 高度
          this.$nextTick(() => {
            const height = document.getElementById('add-box').offsetHeight
            this.taHei = height - 110
          })
          // 补全橱窗个数
          this.showcaseConfig = JSON.parse(JSON.stringify(this.ruleForm.showcaseConfig)) // 橱窗列表数据 深复
          const minTotal = this.ruleForm.showItemNum * this.ruleForm.rowNum // 显示个数乘于行数
          if (this.showcaseConfig.length < 1) { // 没设置橱窗数时
            for (let i = 0; i < minTotal; i++) {
              this.addList()
            }
          } else if (this.showcaseConfig.length < minTotal) {
            const num = minTotal - this.showcaseConfig.length
            for (let t = 0; t < num; t++) {
              this.addList()
            }
          }
        }
      })
    },
    // 删除
    deleteList(index) {
      this.showcaseConfig.splice(index, 1)
    },
    // 添加
    addList() {
      const item = {
        jumpType: 0,
        link: '',
        image: '',
        imageFileList: [],
        productCode: '',
        specialId: '',
        activityType: 'promotionType',
        activityId: '',
        couponId: '',
        valiteTips: '',
        moduleName: '',
        flage: false
      }
      this.showcaseConfig.push(item)
    },
    // 上移
    up(index) {
      const oldData = JSON.parse(JSON.stringify(this.showcaseConfig))
      const newData = JSON.parse(JSON.stringify(this.showcaseConfig))
      newData[index - 1] = oldData[index]
      newData[index] = oldData[index - 1]
      this.showcaseConfig = newData
    },
    // 图片上传成功
    handleSuccess(res, file, fileList, index) {
      if (res.code === 200) {
        const data = this.showcaseConfig[index]
        const image = res.data.url
        this.showcaseConfig.splice(index, 1, { ...data, image })
      }
    },
    // 校验商品号
    async checkProductCode(index) {
      if (!this.showcaseConfig[index].productCode) {
        this.showcaseConfig[index].flage = false
        this.showcaseConfig[index].valiteTips = '请输入商品号'
        return false
      }
      try {
        this.commitLoading = true
        const data = await checkProductId(this.showcaseConfig[index].productCode)
        if (data.code === 200) {
          this.showcaseConfig[index].flage = true
          this.showcaseConfig[index].valiteTips = ''
        } else {
          this.showcaseConfig[index].flage = false
          this.showcaseConfig[index].valiteTips = data.msg
        }
        this.commitLoading = false
      } catch (err) {
        this.showcaseConfig[index].valiteTips = '校验出错，请重新输入'
        this.commitLoading = false
        this.showcaseConfig[index].flage = false
      }
    },
    // 校验专题Id
    async checkSpecialId(index) {
      if (!this.showcaseConfig[index].specialId) {
        this.showcaseConfig[index].flage = false
        this.showcaseConfig[index].valiteTips = '请输入专题Id'
        return false
      }
      try {
        this.commitLoading = true
        const data = await checkBatchProduct({
          specialId: this.showcaseConfig[index].specialId.replace(/^(\s|\xA0)+|(\s|\xA0)+$/gi, ''),
          startTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.startTime,
          endTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.endTime
        })
        if (data.code === 200) {
          if (data.data.flag === true) {
            this.flag = true
            this.showcaseConfig[index].flage = true
            this.showcaseConfig[index].valiteTips = ''
          } else {
            this.showcaseConfig[index].flage = false
            this.showcaseConfig[index].valiteTips = '不存在此专题'
          }
          this.commitLoading = false
        } else {
          this.commitLoading = false
          this.showcaseConfig[index].valiteTips = data.msg
          this.showcaseConfig[index].flage = false
        }
        this.commitLoading = false
      } catch (err) {
        this.commitLoading = false
        this.showcaseConfig[index].flage = false
        this.showcaseConfig[index].valiteTips = '校验出错，请重新输入'
      }
    },
    // 校验模块名称
    async checkModelName(index) {
      if (!this.showcaseConfig[index].specialId) {
        this.showcaseConfig[index].flage = false
        this.showcaseConfig[index].valiteTips = '请输入专题Id'
        return false
      }
      if (!this.showcaseConfig[index].moduleName) {
        return false
      }
      try {
        this.commitLoading = true
        const data = await checkUseLabelsById({
          useLabels: [
            {
              specialId: this.showcaseConfig[index].specialId.replace(/^(\s|\xA0)+|(\s|\xA0)+$/gi, ''),
              useLabel: this.showcaseConfig[index].moduleName
            }
          ]
        })
        if (data.code === 200) {
          this.flag = true
          this.showcaseConfig[index].flage = true
          this.showcaseConfig[index].valiteTips = ''
        } else {
          this.showcaseConfig[index].valiteTips = data.msg
          this.showcaseConfig[index].flage = false
        }
        this.commitLoading = false
      } catch (err) {
        this.commitLoading = false
        this.showcaseConfig[index].flage = false
        this.showcaseConfig[index].valiteTips = '校验出错，请重新输入'
      }
    },
    // 校验活动id
    async validateCheckActivity(index) {
      if (!this.showcaseConfig[index].activityId) {
        this.showcaseConfig[index].flage = false
        this.showcaseConfig[index].valiteTips = '请输入活动id'
        return false
      }
      const cmomitData = {
        activityType: this.showcaseConfig[index].activityType,
        id: this.showcaseConfig[index].activityId,
        startTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.startTime,
        endTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.endTime
      }
      try {
        this.commitLoading = true
        const data = await checkActivity(cmomitData)
        if (data.code === 200) {
          this.flag = true
          this.showcaseConfig[index].valiteTips = ''
          this.showcaseConfig[index].flage = true
        } else {
          this.showcaseConfig[index].valiteTips = data.msg
          this.showcaseConfig[index].flage = false
        }
        this.commitLoading = false
      } catch (err) {
        this.commitLoading = false
        this.showcaseConfig[index].valiteTips = '校验出错，请重新输入'
        this.showcaseConfig[index].flage = false
      }
    },
    // 校验优惠券id
    async validateCoupon(index) {
      if (!this.showcaseConfig[index].couponId) {
        this.showcaseConfig[index].flage = false
        this.showcaseConfig[index].valiteTips = '请输入优惠券Id'
        return false
      }
      try {
        const cmomitData = {
          idList: [this.showcaseConfig[index].couponId],
          startTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.startTime,
          endTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.endTime
        }
        this.commitLoading = true
        const data = await checkCoupon(cmomitData)
        if (data.code === 200) {
          this.showcaseConfig[index].valiteTips = ''
          this.showcaseConfig[index].flage = true
          this.flag = true
        } else {
          this.showcaseConfig[index].flage = false
          this.showcaseConfig[index].valiteTips = data.msg
        }
        this.commitLoading = false
      } catch (err) {
        this.commitLoading = false
        this.showcaseConfig[index].valiteTips = '校验出错，请重新输入'
        this.showcaseConfig[index].flage = false
      }
    },
    changeJumpType(index) {
      console.log(this.showcaseConfig[index].jumpType === 4)
      this.showcaseConfig[index].link = ''
      this.showcaseConfig[index].productCode = ''
      this.showcaseConfig[index].specialId = ''
      this.showcaseConfig[index].activityType = 'promotionType'
      this.showcaseConfig[index].activityId = ''
      this.showcaseConfig[index].couponId = ''
      this.showcaseConfig[index].moduleName = ''
      this.showcaseConfig[index].valiteTips = ''
      this.showcaseConfig[index].flage = this.showcaseConfig[index].jumpType === 4
    },
    // 点击确定
    save() {
      const flag = this.showcaseConfig.some(item => {
        return item.flage === false && !item.image
      })
      if (flag) {
        this.$message({
          message: '请先完成列表信息的填入',
          type: 'error'
        })
        return false
      }
      const minNum = this.ruleForm.showItemNum * 1
      if (this.showcaseConfig.length < minNum) {
        this.$message({
          message: '请橱窗个数不能小于' + minNum,
          type: 'error'
        })
        return false
      }
      this.ruleForm.showcaseConfig = this.showcaseConfig
      this.dialogVisible = false
    },
    // 取消
    cancle() {
      this.dialogVisible = false
    },
    // 处理数据
    handleNumShowItemNum() {
      if (!this.ruleForm.showItemNum) return ''
      this.ruleForm.showItemNum = parseInt(this.ruleForm.showItemNum)
    }, // 处理数据
    handleNumRowNum() {
      if (!this.ruleForm.rowNum) return ''
      this.ruleForm.rowNum = parseInt(this.ruleForm.rowNum)
    }
  }
}
</script>

<style lang="scss" scoped >
 @import url('./../../../style/base.scss');
 .add-box{
   width: 100%;
   height: 72vh;
   background: #ffffff;
   margin-top: -30px;
   box-sizing: border-box;
   padding: 0 30px;
 }
 .add-title{
   font-size: 14px;
   padding: 10px 0;
   color:red;
 }
 .add-tool-box-I{
   margin-top: 10px;
 }
 .add-tool-box-II{
   width: 100%;
   text-align: right;
 }
 .avatar-uploade{
   width: 100px;
   height: 80px;
 }
 .image-box{
   width: 160px;
   height: 80px;
   position: relative;
   img{
     width: 100%;
     height: 100%;
   }
   span{
     position: absolute;
     top: 50%;
     left: 50%;
     font-size: 16px;
     color: #eaeaea;
     margin-top: -12px;
     margin-left: -30px;
     display: none;
   }
   &:hover{
     background: rgba(0,0,0, .5);
     .kk {
       display: block;
     }
   }
 }
 .image-box-none{
   width: 160px;
   height: 80px;
   display: flex;
   justify-content: center;
   align-items: center;
   border: #eaeaea 1px solid;
 }
</style>

