<template>
    <div class="page-bx bgc-w edit-bx">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
        <!-- 面包屑 -->
        <JFX-Breadcrumb :showGoback="true" />
        <!-- 面包屑 end -->
        <!-- title -->
        <JFX-title title="基础信息" className="mr-t-10" />
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="商品货号：" prop="goodsNo" >
              <el-input v-model.trim="ruleForm.goodsNo" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="商品条形码：" prop="barcode" >
              <el-input v-model.trim="ruleForm.barcode" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="商品名称：" prop="name" >
              <el-input v-model.trim="ruleForm.name" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="平台备案关区：" prop="customsAreaIds" >
              <el-select v-model="ruleForm.customsAreaIds" style="width: 120%" placeholder="请选择" filterable multiple collapse-tags clearable :data-list="getCustomsSelectBean('guanquList')" >
                <el-option v-for="item in selectOpt.guanquList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="hs编码：" prop="hsCode" >
              <el-input v-model.trim="ruleForm.hsCode" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="商品英文名称：" prop="englishGoodsName" >
              <el-input v-model.trim="ruleForm.englishGoodsName" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="企业商品编码：" prop="factoryNo" >
              <el-input v-model.trim="ruleForm.factoryNo" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <JFX-title title="备案信息" className="mr-t-10" />
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="商品净重(kg)：" prop="netWeight" >
              <JFX-Input v-model="ruleForm.netWeight" :min="0" :precision="5" placeholder="请输入" clearable style="width: 120%" />
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="商品毛重(kg)：" prop="grossWeight" >
              <JFX-Input v-model="ruleForm.grossWeight" :min="0" :precision="5" placeholder="请输入" clearable style="width: 120%" />
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="规格型号：" prop="spec" >
              <el-input v-model.trim="ruleForm.spec" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="保质天数：" prop="shelfLifeDays" >
              <el-input v-model.trim="ruleForm.shelfLifeDays" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="备案单价：" prop="filingPrice" >
              <JFX-Input v-model="ruleForm.filingPrice" :min="0" :precision="2" placeholder="请输入" clearable style="width: 120%" />
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="计量单位：" prop="unit" >
              <el-select v-model="ruleForm.unit" style="width: 120%" placeholder="请选择" filterable clearable >
                <el-option v-for="item in unitBean"  :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="原产国：" prop="countyId" >
              <el-select v-model="ruleForm.countyId" style="width: 120%" placeholder="请选择" filterable clearable >
                <el-option v-for="item in countryBean"  :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="原产地区：" prop="countyArea" >
              <el-input v-model.trim="ruleForm.countyArea" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="申报要素：" prop="declareFactor" >
              <el-input v-model.trim="ruleForm.declareFactor" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="商品成分：" prop="component" >
              <el-input v-model.trim="ruleForm.component" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="生产企业名称：" prop="manufacturer" >
              <el-input v-model.trim="ruleForm.manufacturer" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="生产企业地址：" prop="manufacturerAddr" >
              <el-input v-model.trim="ruleForm.manufacturerAddr" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="第一法定单位：" prop="unitNameOne" >
              <el-input v-model.trim="ruleForm.unitNameOne" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="第二法定单位：" prop="unitNameTwo" >
              <el-input v-model.trim="ruleForm.unitNameTwo" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="海关商品备案号：" prop="customsGoodsRecordNo" >
              <el-input v-model.trim="ruleForm.customsGoodsRecordNo" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <JFX-title title="箱规设置" className="mr-t-10" />
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            箱转换：1箱转换为<JFX-Input v-model="ruleForm.boxToUnit" :min="0" :precision="0" placeholder="请输入" clearable style="width: 100px" />件
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            托转换：1托转换为<JFX-Input v-model="ruleForm.torrToUnit" :min="0" :precision="0" placeholder="请输入" clearable style="width: 100px" />件
          </el-col>
        </el-row>
        <JFX-title title="规格描述" className="mr-t-10" />
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="长(cm)：" prop="length" >
              <JFX-Input v-model="ruleForm.length" :min="0" :precision="2" placeholder="请输入" clearable style="width: 120%" />
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="宽(cm)：" prop="width" >
              <JFX-Input v-model="ruleForm.width" :min="0" :precision="2" placeholder="请输入" clearable style="width: 120%" />
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="高(cm)：" prop="height" >
              <JFX-Input v-model="ruleForm.height" :min="0" :precision="2" placeholder="请输入" clearable style="width: 120%" />
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="体积(cm³)：" prop="volume" >
              <JFX-Input v-model="ruleForm.volume" :min="0" :precision="2" placeholder="请输入" clearable style="width: 120%" />
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="包装方式：" prop="packType" >
              <el-select v-model="ruleForm.packType" style="width: 120%" placeholder="请选择" filterable clearable >
                <el-option v-for="item in packBean"  :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-form-item label="描述：" prop="describe" >
              <el-input type="textarea" :row="1" v-model="ruleForm.describe" clearable style="width: 120%" placeholder="请输入"></el-input>
            </el-form-item>
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
import { toAddPage, saveMerchandise } from '@a/goodsManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        goodsNo: '',
        barcode: '',
        name: '',
        customsAreaIds: '',
        englishGoodsName: '',
        factoryNo: '',
        netWeight: '',
        grossWeight: '',
        spec: '',
        shelfLifeDays: '',
        filingPrice: '',
        unit: '',
        countyId: '',
        countyArea: '',
        declareFactor: '',
        component: '',
        manufacturer: '',
        manufacturerAddr: '',
        unitNameTwo: '',
        unitNameOne: '',
        boxToUnit: '',
        torrToUnit: '',
        length: '',
        width: '',
        height: '',
        volume: '',
        packType: '',
        describe: '',
        hsCode: '',
        customsGoodsRecordNo: ''
      },
      rules: {
        goodsNo: { required: true, message: '请输入商品货号', trigger: 'blur' },
        barcode: { required: true, message: '请输入商品条形码', trigger: 'blur' },
        name: { required: true, message: '请输入商品名称', trigger: 'blur' },
        countyId: { required: true, message: '原产国不能为空', trigger: 'change' },
        unit: { required: true, message: '计量单位不能为空', trigger: 'change' },
        spec: { required: true, message: '规格型不能为空', trigger: 'change' }
      },
      countryBean: [],
      unitBean: [],
      packBean: [],
      saveLoading: false
    }
  },
  mounted() {
    this.toAddPage()
  },
  methods: {
    // 获取各种下拉数据
    async toAddPage() {
      const res = await toAddPage()
      const { countryBean, unitBean, packBean } = res.data
      this.countryBean = countryBean || []
      this.unitBean = unitBean || []
      this.packBean = packBean || []
    },
    // 保存
    save() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) return false
        let customsAreaIds = ''
        if (this.ruleForm.customsAreaIds) {
          customsAreaIds = this.ruleForm.customsAreaIds.map(item => item).toString()
        }
        this.saveLoading = true
        try {
          await saveMerchandise({ ...this.ruleForm, customsAreaIds })
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
<style>
  .edit-bx .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 130px;
}
.edit-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
<style lang="scss" scoped>
.image-preview{
  display: inline-block;
}
</style>
