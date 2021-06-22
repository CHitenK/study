<template>
  <div class="kk-box" style="margin-top: -30px"  v-loading="loading">
    <div class="form-box">
      <el-select v-model="ruleForm.actType" placeholder="请选择" >
        <el-option
          v-for="item in actTypeOpitions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="ruleForm.actId" clearable style="width: 220px; margin-left: 20px;" placeholder="请输入活动编号/id" ></el-input>
      &nbsp;&nbsp;商品录入:
      <el-input v-model="itemCodeList"  type="textarea" :rows="2" clearable style="width: 420px; margin-left: 20px;" placeholder="一次支持上传50个商品opg码,仅支持逗号(,),分号(;)分隔方式" ></el-input>
      <el-button style="margin-left: 10px" type="primary" @click="getActivityProduct">添加</el-button>
      <el-upload
        action="/base/block/upload"
        :headers="headers"
        :before-upload="beforeUploadExcel"
        :show-file-list="false"
         :accept="'.xlsx'"
        >
        <el-button style="margin-left: 10px" type="primary" >导入</el-button>
        <div slot="tip" class="el-upload__tip" v-if="false" > </div>
      </el-upload>
      <el-button type="success" style="margin-left: 10px"  plain @click="reset">重置</el-button>
      <el-button style="margin-left: 10px" type="primary" @click="exportData">导出列表数据</el-button>
      <el-button style="margin-left: 10px" type="primary" @click="exportModel">下载导入模板</el-button>
    </div>
    <el-table :data="product" border height="650" >
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="{$index}">
          {{$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="商品名称" align="center">
         <template slot-scope="scope">
           <span class="name-box" :title="scope.row.name">
             {{scope.row.name}}
           </span>
         </template>
      </el-table-column>
      <el-table-column label="opg" align="center">
         <template slot-scope="scope">
           <span class="name-box">
             {{scope.row.opgCode}}
           </span>
         </template>
      </el-table-column>
      <el-table-column label="商品图片" width="200" align="center">
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
            <div class="image-box" v-if="scope.row.imageUrl">
               <img  :src="scope.row.imageUrl" class="avatar" />
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
      <el-table-column prop="itemCode" label="商品编码"  width="180" align="center" > </el-table-column>
      <el-table-column label="商品卖点" width="300" align="center">
       <template slot-scope="scope">
        <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="product[scope.$index].activityTag">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="160" align="center">
       <template slot-scope="scope">
        <el-input
            type="number"
            placeholder="请输入内容"
            v-tofixed
            v-model="product[scope.$index].goodsIdx">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="80">
        <template slot-scope="scope">
          <div class="do-btn">
            <el-button type="text" size="small" @click="deleteProduct(scope.$index)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="list-item-box">
      <el-button style="margin-left: 10px" @click="save" type="primary" >保存</el-button>
      <el-button  @click="close">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getActivityProduct, epxTemplate, exportProductInfo, importProductExcel } from '@/api/pageManage/index'
import buildBlock from '@/views/pageManage/mixins/index.js'
import axios from 'axios'
import { transformTime } from '@/views/pageManage/utils/tool'
export default {
  mixins: [buildBlock],
  props: {
    ruleForm: {
      type: Object,
      default: function() {
        return {}
      }
    },
    rouNum: {
      type: Number,
      default: function() {
        return 0
      }
    }
  },

  data() {
    return {
      loading: false,
      itemCodeList: '',
      commitData: {},
      actTypeOpitions: [
        { label: '促销活动（整点秒杀、天天特价、精选活动）', value: 'promotionType' },
        { label: '砍价活动', value: 'bargainActivity' },
        { label: '第二件半价', value: 'secondPieces' },
        { label: '今日爆款', value: 'hotActivity' },
        { label: '拼团活动', value: 'assembleActivity' }
      ],
      product: [],
      importProductExcel, // 导入地址
      excleFileList: [],
      gteProductTimes: 0
    }
  },
  watch: {
    rouNum() { // 每次打开活动商品, 保存当前的活动类型，活动id
      const data = JSON.parse(JSON.stringify(this.ruleForm))
      this.commitData = {
        actId: data.actId,
        actType: data.actType
      }
      this.itemCodeList = ''
      this.product = data.product || []
      this.gteProductTimes = 0
    }
  },
  mounted() {
    // 每次打开活动商品, 保存当前的活动类型，活动id
    const data = JSON.parse(JSON.stringify(this.ruleForm))
    this.commitData = {
      actId: data.actId,
      actType: data.actType
    }
    this.itemCodeList = ''
    this.product = data.product || []
  },
  methods: {
    // 根据活动Id获取商品
    getActivityProduct() {
      if (!this.ruleForm.actId) {
        this.$message({
          message: '请输入活动编号',
          type: 'error'
        })
        this.product = []
        return false
      }
      let itemCodeList = ''
      if (this.itemCodeList) {
        const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
        if (reg.test(this.itemCodeList)) {
          this.$message({
            message: '商品录入不能有中文字符',
            type: 'error'
          })
          return false
        }
        itemCodeList = this.itemCodeList.replace(/\s*/gi, '') // 去除空格
        itemCodeList = itemCodeList.replace(/;/gi, ',') // 替换
        itemCodeList = itemCodeList.replace(/；/gi, ',') // 替换
        itemCodeList = itemCodeList.replace(/，/gi, ',') // 替换
        itemCodeList = itemCodeList.replace(/^,+/, '').replace(/,+$/, '')
        itemCodeList = itemCodeList.split(',')
      }
      this.loading = true
      const data = {
        startTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.startTime,
        endTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.endTime,
        id: this.ruleForm.actId,
        activityType: this.ruleForm.actType,
        sortType: this.ruleForm.sortType + '',
        opgCodeList: itemCodeList || []
      }
      getActivityProduct(data).then(res => {
        if (res.code === 200) {
          this.gteProductTimes++
          if (res.msg) {
            this.$message({
              message: res.msg || '操作成功',
              type: 'warning'
            })
          }
          // 这里需要数据去重
          if (this.commitData.actId === this.ruleForm.actId && this.commitData.activityType === this.ruleForm.activityType && itemCodeList) {
            const productIds = []
            this.product.forEach(item => {
              productIds.push(item.productId)
            })
            if (res.data && res.data.length > 0) {
              res.data.forEach(item => {
                if (!productIds.includes(item.id)) {
                  const { name, brandName, itemCode, opgCode, typeName, price, status, checkStatus, imageUrl, salesVolume, id, promotionPrice, activityTag, orderValue } = item
                  this.product.push({
                    name, brandName, itemCode, opgCode, typeName, price, status, checkStatus, imageUrl, salesVolume, promotionPrice,
                    productId: id,
                    goodsIdx: orderValue || '',
                    activityTag: activityTag || ''
                  })
                }
              })
            }
          } else { // 不需要数组去重
            this.product = []
            if (res.data && res.data.length > 0) {
              res.data.forEach(item => {
                const { name, brandName, itemCode, opgCode, typeName, price, status, checkStatus, imageUrl, salesVolume, id, promotionPrice, activityTag, orderValue } = item
                this.product.push({
                  name, brandName, itemCode, opgCode, typeName, price, status, checkStatus, imageUrl, salesVolume, promotionPrice,
                  productId: id,
                  goodsIdx: orderValue || '',
                  activityTag: activityTag || ''
                })
              })
            }
          }
          // 存储提交的数据
          const data = JSON.parse(JSON.stringify(this.ruleForm))
          this.commitData = {
            actId: data.actId,
            actType: data.actType
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
          this.product = []
        }
      }).catch(res => {
        this.product = []
      }).finally(() => {
        this.loading = false
      })
    },
    // 图片上传成功
    handleSuccess(res, file, fileList, index) {
      if (res.code === 200) {
        const data = this.product[index]
        const imageUrl = res.data.url
        this.product.splice(index, 1, { ...data, imageUrl })
      }
    },
    // 删除
    deleteProduct(index) {
      this.loading = true
      this.product.splice(index, 1)
      const _timer = setTimeout(() => {
        this.loading = false
        clearTimeout(_timer)
      }, 800)
    },
    handleError() {
      this.$message({
        message: '上传出错，稍后重试',
        type: 'error'
      })
    },
    reset() {
      this.gteProductTimes++
      // this.ruleForm.actId = ''
      this.itemCodeList = ''
      this.product = []
    },
    // 取消
    close() {
      this.product = []
      this.$emit('close')
    },
    // 导出模板
    exportModel() {
      axios.get(epxTemplate, {
        responseType: 'blob',
        headers: { 'token': this.headers.token }
      }).then(res => {
        const blob = new Blob([res.data], {
          type: 'application/vnd.ms-excel;charset=UTF-8'
        })
        var filename = '模板' + '.xlsx'
        var a = document.createElement('a')
        // 创键临时url对象
        var url = URL.createObjectURL(blob)
        a.href = url
        a.download = filename
        a.click()
        // 释放之前创建的URL对象
        window.URL.revokeObjectURL(url)
      })
    },
    // 导出数据
    exportData() {
      if (!this.product || this.product.length < 1) {
        this.$message.error('无数据可导出')
        return false
      }
      const productExcelDtoList = []
      this.product.forEach(item => {
        productExcelDtoList.push({
          opgCode: item.opgCode,
          name: item.name,
          orderValue: item.goodsIdx,
          activityTag: item.activityTag
        })
      })
      const data = {
        productExcelDtoList
      }
      this.loading = true
      axios.post(exportProductInfo, data, {
        responseType: 'blob',
        headers: { 'token': this.headers.token }
      }).then(res => {
        const blob = new Blob([res.data], {
          type: 'application/vnd.ms-excel;charset=UTF-8'
        })
        var filename = transformTime() + '.xlsx'
        var a = document.createElement('a')
        // 创键临时url对象
        var url = URL.createObjectURL(blob)
        a.href = url
        a.download = filename
        a.click()
        // 释放之前创建的URL对象
        window.URL.revokeObjectURL(url)
      }).catch(res => {
        this.$message.error(res.msg)
      }).finally(res => {
        this.loading = false
      })
    },
    // 导入数据成功
    handleSuccessExcel(response) {
      this.gteProductTimes++
      const data = response.data
      if (!data || data.length < 1) return false
      this.gteProductTimes++
      const productIds = []
      this.product.forEach(item => {
        productIds.push(item.productId)
      })
      if (data && data.length > 0) {
        data.forEach(item => {
          const { name, brandName, itemCode, opgCode, typeName, price, status, checkStatus, imageUrl, salesVolume, id, promotionPrice, activityTag, orderValue } = item
          const lldata = {
            name, brandName, itemCode, opgCode, typeName, price, status, checkStatus, imageUrl, salesVolume, promotionPrice,
            productId: id,
            goodsIdx: orderValue || '',
            activityTag: activityTag || ''
          }
          if (productIds.includes(item.id)) {
            const i = productIds.indexOf(item.id)
            this.product.splice(i, 1)
            productIds.splice(i, 1)
          }
          this.product.push(lldata)
        })
      }
    },
    // 导入数据之前
    beforeUploadExcel(file) {
      if (!this.ruleForm.actId) {
        this.$message({
          message: '请输入活动编号',
          type: 'error'
        })
        this.product = []
        return false
      }
      this.loading = true
      const formData = new FormData()
      formData.append('file', file)
      formData.append('pfChannel', +sessionStorage.getItem('CHANNEL_ID'))
      formData.append('activityType', this.ruleForm.actType)
      formData.append('id', this.ruleForm.actId)
      formData.append('sortType', this.ruleForm.sortType)
      if (!this.buildBlock.titleData.isForever) {
        formData.append('startTime', this.buildBlock.titleData.startTime)
        formData.append('endTime', this.buildBlock.titleData.endTime)
      }
      importProductExcel(formData).then(res => {
        this.handleSuccessExcel(res)
        if (res.msg) {
          this.$message.success(res.msg)
        }
      }).catch(res => {
        this.$message.error(res.msg)
      }).finally(res => {
        this.loading = false
      })
      return false
    },
    // 导入数据出错
    handleErrorExcel() {
      this.loading = false
      this.$message.error('导入数据出错，稍后重试')
    },
    // 保存
    save() {
      // 保存数据到积木JSON
      if (!this.buildBlock.titleData.isCopy || this.gteProductTimes > 0) {
        this.setIndex(this.product)
      } else { // 用货号去获取商品数据
        if (!this.ruleForm.actId || !this.product) {
          this.setIndex(this.product)
          return false
        }
        const opgCodeList = []
        this.product.forEach(item => {
          opgCodeList.push(item.opgCode)
        })
        // 原来的数据
        const productOld = this.product ? JSON.parse(JSON.stringify(this.product)) : []
        const postDaDta = {
          startTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.startTime,
          endTime: this.buildBlock.titleData.isForever ? null : this.buildBlock.titleData.endTime,
          id: this.ruleForm.actId,
          activityType: this.ruleForm.actType,
          sortType: this.ruleForm.sortType + '',
          opgCodeList: opgCodeList
        }
        this.loading = true
        getActivityProduct(postDaDta).then(res => {
          if (res.code === 200) {
            this.gteProductTimes++
            if (res.msg) {
              this.$message({
                message: res.msg || '操作成功',
                type: 'warning'
              })
            }
            if (res.data && res.data.length > 0) {
              this.product = []
              res.data.forEach(item => {
                const { name, brandName, itemCode, opgCode, typeName, price, status, checkStatus, imageUrl, salesVolume, id, promotionPrice, activityTag, orderValue } = item
                let goodsIdxNew = orderValue
                let activityTagNew = activityTag
                // 保留之前的卖点，排序
                if (opgCodeList.includes(opgCode)) {
                  const key = opgCodeList.indexOf(opgCode)
                  goodsIdxNew = productOld[key].goodsIdx || ''
                  activityTagNew = productOld[key].activityTag || ''
                }
                this.product.push({
                  name, brandName, itemCode, opgCode, typeName, price, status, checkStatus, imageUrl, salesVolume, promotionPrice,
                  productId: id,
                  goodsIdx: goodsIdxNew,
                  activityTag: activityTagNew
                })
              })
            }
            // 存储提交的数据
            const data = JSON.parse(JSON.stringify(this.ruleForm))
            this.commitData = {
              actId: data.actId,
              actType: data.actType
            }
            this.setIndex(this.product)
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
            this.product = []
            this.$emit('close')
          }
        }).catch(res => {
          this.product = []
        }).finally(() => {
          this.loading = false
          this.$emit('close')
        })
      }
    },
    // 排序
    setIndex(product) {
      if (!product) { // 数据为空时
        this.ruleForm.product = product || []
        this.$emit('close')
        return false
      }
      const hasGoodsIdxArray = [] // 有输入排序值的数组
      const noHasGoodsIdxArray = [] // 无输入排序值的数组
      product.forEach(item => {
        if (item.goodsIdx) {
          hasGoodsIdxArray.push(item)
        } else {
          noHasGoodsIdxArray.push(item)
        }
      })
      if (hasGoodsIdxArray) {
        for (var i = hasGoodsIdxArray.length - 1; i > 0; i--) {
          for (var j = 0; j < i; j++) {
            if (hasGoodsIdxArray[j].goodsIdx > hasGoodsIdxArray[j + 1].goodsIdx) {
              [hasGoodsIdxArray[j], hasGoodsIdxArray[j + 1]] = [hasGoodsIdxArray[j + 1], hasGoodsIdxArray[j]]
            }
          }
        }
      }
      this.ruleForm.product = [...hasGoodsIdxArray, ...noHasGoodsIdxArray]
      this.$emit('close')
    }
  }
}
</script>
<style>
.kk-box .el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 150px;
    height: 70px;
    cursor: pointer;
    line-height: 70px;
    vertical-align: top;
}
</style>

<style lang="scss" scoped>
 .form-box{
   width: 100%;
   height: 60px;
   display: flex;
   justify-content: flex-start;
   align-items: center;
  }
  .last-box{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .do-btn{
   display: flex;
   justify-content: space-around;
 }
 .name-box{
   display: inline-block;
   width: 100%;
   height: 30px;
   overflow: hidden;
   text-overflow:ellipsis;
   white-space: nowrap
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
 .list-item-box{
   width: 100%;
   height: 60px;
   text-align: right;
   margin-top: 5px;
   line-height: 60px;
   border-top: solid 1px #eaeaea;
 }
</style>
