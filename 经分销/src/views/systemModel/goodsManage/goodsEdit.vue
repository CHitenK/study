<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <JFX-title title="货品基本信息" className="mr-t-20" />
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          <el-form-item label="一级类目：" prop="productTypeId0" >
            <el-select v-model="ruleForm.productTypeId0" placeholder="请选择" filterable clearable @change="changeProductTypeId0">
              <el-option v-for="item in target.oneCatBean"  :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          <el-form-item label="二级类目：" prop="productTypeId" >
            <el-select v-model="ruleForm.productTypeId"  placeholder="请选择" filterable clearable  >
              <el-option v-for="item in target.twoCatBean" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          <el-form-item label="品牌：" prop="brandId" >
            <el-select v-model="ruleForm.brandId" placeholder="请选择" filterable clearable >
              <el-option v-for="item in target.brandBean"  :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col  class="mr-b-15" :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          条形码: {{detail.barcode}}
        </el-col>
        <el-col  class="mr-b-15" :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          规格型号：{{detail.spec}}
        </el-col>
        <el-col  class="mr-b-15" :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          保质天数：{{detail.shelfLifeDays}}
        </el-col>
        <el-col  class="mr-b-15" :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          毛重：{{detail.grossWeight}}
        </el-col>
        <el-col  class="mr-b-15" :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          净重：{{detail.netWeight}}
        </el-col>
        <el-col  class="mr-b-15" :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          长：{{detail.length}}
        </el-col>
        <el-col  class="mr-b-15" :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          宽：{{detail.width}}
        </el-col>
        <el-col  class="mr-b-15" :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          高：{{detail.height}}
        </el-col>
        <el-col  class="mr-b-15" :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          体积：{{detail.volume}}
        </el-col>
        <el-col  class="mr-b-15" :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          生产厂家：{{detail.manufacturer}}
        </el-col>
        <el-col  class="mr-b-15" :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          生产地址：{{detail.manufacturerAddr}}
        </el-col>
        <el-col  class="mr-b-15" :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          计量单位：{{detail.unitName}}
        </el-col>
        <el-col  class="mr-b-15" :xs="24"  :sm="12" :md="12" :lg="8" :xl="8" >
          原产国：{{detail.countyName}}
        </el-col>
        <el-col  class="mr-b-15" :xs="24" :sm="24" :md="16" :lg="12" :xl="12" >
          备注：{{detail.remark}}
        </el-col>
        <el-col class="mr-b-15 mr-t-15" :xs="24" :sm="12" :md="24" :lg="24" :xl="24" >
          <span style="vertical-align: top;">商品图片：</span>
          <div class="image-preview">
            <el-image
              v-for="(item, i) in srcList"
              :key="i"
              style="width: 120px; height: 120px;margin-left: 10px;"
              :src="item"
              :preview-src-list="srcList">
            </el-image>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="mr-t-30 flex-c-c">
      <el-button type="primary" :loading="saveLoading" @click="save">保 存</el-button>
      <el-button @click="closeTag">取 消</el-button>
    </div>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { productToEditPage, productModifyProduct, getTwoLevel } from '@a/goodsManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      srcList: ['', '', '', '', '', ''],
      detail: {},
      target: {},
      ruleForm: {
        id: '',
        productTypeId0: '',
        productTypeId: '',
        brandId: ''
      },
      rules: {
        productTypeId0: { required: true, message: '一级类目不能为空', trigger: 'change' },
        productTypeId: { required: true, message: '二级类目不能为空', trigger: 'change' },
        brandId: { required: true, message: '品牌不能为空', trigger: 'change' }
      },
      saveLoading: false
    }
  },
   mounted() {
    this.init()
    this.$nextTick(() => {
      setTimeout(() => {
        const domes = document.getElementsByClassName('el-image__error')
        if (domes && domes.length > 0) {
          for (let i = 0; i < domes.length; i++) {
            domes[i].innerHTML = '暂无图片'
          }
        }
      }, 3000)
    })
  },
  methods: {
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      try {
        const res = await productToEditPage({ id: query.id })
        this.target = res.data || {}
        this.detail = res.data.detail || {}
        for (let key in this.ruleForm) {
          this.ruleForm[key] = this.detail[key] ? this.detail[key].toString() : ''
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 选择一级类目
    async changeProductTypeId0() {
      const { productTypeId0 } = this.ruleForm
      this.ruleForm.productTypeId = ''
      if (productTypeId0) {
        try {
          const res = await getTwoLevel({ id: productTypeId0 })
          this.detail.twoCatBean = res.data
        } catch (error) {
          console.log(error)
        }
      }
    },
    // 保存
    save() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) return false
        this.saveLoading = true
        try {
          await productModifyProduct(this.ruleForm)
          this.$successMsg('保存成功')
          this.closeTag()
        } catch (error) {
          console.log(error)
        }
        this.saveLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.image-preview{
  display: inline-block;
}
</style>
