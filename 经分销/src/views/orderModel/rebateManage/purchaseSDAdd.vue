<template>
    <div class="page-bx bgc-w edit-bx">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
        <!-- 面包屑 -->
        <JFX-Breadcrumb :showGoback="true" />
        <!-- 面包屑 end -->
        <!-- title -->
        <JFX-title title="基本信息" className="mr-t-10" />
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="公司：" prop="merchantId" >
              <el-select v-model="ruleForm.merchantId" style="width: 100%" placeholder="请选择" clearable filterable :data-list="getSelectMerchantBean('merchant_list')" @change="changeMerchantId" >
                <el-option v-for="item in selectOpt.merchant_list"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="事业部：" prop="buId" >
              <el-select v-model="ruleForm.buId" style="width: 100%" placeholder="请选择" filterable clearable >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="供应商：" prop="supplierId" >
              <el-select v-model="ruleForm.supplierId" style="width: 100%" placeholder="请选择" filterable clearable >
                <el-option v-for="item in selectOpt.supplierList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="生效时间：" prop="effectiveTime" >
              <el-date-picker
                clearable
                v-model="ruleForm.effectiveTime"
                type="date"
                value-format="yyyy-MM-dd 00:00:00"
                style="width: 100%"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="失效时间：" prop="invalidTime" >
              <el-date-picker
                clearable
                v-model="ruleForm.invalidTime"
                type="date"
                style="width: 100%"
                value-format="yyyy-MM-dd 23:59:59"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <JFX-title title="单比例配置" style="display: inline-block">
          <div style="float: right">
            <el-button type="primary" @click="add">新增</el-button>
          </div>
        </JFX-title>
        <JFX-table :tableData.sync="tableData" :showPagination="false">
          <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
          <el-table-column prop="creator" align="center" width="260" >
            <template slot="header">
              <span class="need">SD类型</span>
            </template>
            <template slot-scope="{row, $index}">
              <el-select v-model="row.sdConfigId" style="width: 100%" placeholder="请选择" filterable clearable @change="choseSDtype($index)">
                <el-option v-for="item in sdConfigIdListType1" :key="item.id" :label="item.sdTypeName" :value="item.id"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="sdConfigSimpleName" label="简称" align="center" ></el-table-column>
          <el-table-column align="center" width="200">
            <template slot="header">
              <span class="need">比例</span>
            </template>
            <template slot-scope="{row}">
              <JFX-Input v-model="row.proportion" :min="0" :precision="5" placeholder="请输入" clearable />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="90" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="dele(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </JFX-table>
        <JFX-title title="多比例配置" style="display: inline-block">
          <div style="float: right">
            <el-button type="primary" @click="dialogVisible.show=true">导入</el-button>
            <el-button type="primary" @click="deleTable">删除</el-button>
            <el-button type="primary" @click="visible.show=true">选择商品</el-button>
          </div>
        </JFX-title>
        <div class="mr-t-5 fs-14 clr-II">
          合计SKU：{{this.tableData1.list.length}}
        </div>
        <div class="mr-t-5"></div>
        <JFX-table :tableData.sync="tableData1" :showPagination="false" @selection-change="selectionChange">
          <el-table-column type="selection" label="序号" align="center" width="55"></el-table-column>
          <el-table-column prop="creator" align="center" width="220" >
            <template slot="header">
              <span class="need">SD类型</span>
            </template>
            <template slot-scope="{row, $index}">
              <el-select v-model="row.sdConfigId" style="width: 100%" placeholder="请选择" clearable filterable @change="choseSDtypeSec($index)">
                <el-option v-for="item in sdConfigIdListType2" :key="item.id" :label="item.sdTypeName" :value="item.id"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="sdConfigSimpleName" label="简称" align="center" width="200"></el-table-column>
          <el-table-column prop="brandParent" label="标准品牌" align="center" width="200"></el-table-column>
          <el-table-column prop="commbarcode" label="标准条码" align="center" width="200"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" width="200">
            <template slot="header">
              <span class="need">比例</span>
            </template>
            <template slot-scope="{row}">
              <JFX-Input v-model="row.proportion" :min="0" :precision="5" placeholder="请输入" clearable />
            </template>
          </el-table-column>
        </JFX-table>
      </el-form>
      <div class="mr-t-30 flex-c-c">
        <el-button type="primary" @click="save(0)" :loading="saveLoading">保 存</el-button>
        <el-button @click="closeTag">取 消</el-button>
        <el-button type="primary" @click="audit" :loading="saveLoading">审 核</el-button>
      </div>
      <!-- 选择商品 -->
      <sdchose-product v-if="visible.show" :visible.sync="visible" @comfirm="comfirm" :filterData="filterData"></sdchose-product>
      <!-- 选择商品 end -->
      <!-- 导入 -->
      <JFX-Dialog
      :visible.sync="dialogVisible"
      :showClose="true"
      @comfirm="save"
      :width="'860px'"
      :title="'商品导入'"
      :top="'3vh'"
      closeBtnText="取 消"
      confirmBtnText="确 认"
      >
      <div class="import-bx">
        <importfile :url="importSdPurchaseConfigUrl" :templateId="'148'" @successUpload="successUpload"></importfile>
      </div>
      </JFX-Dialog>
      <!-- 导入 end -->
    </div>
</template>
<script>
import { sdTypeConfigGetList, getEditOrCopyPageInfo, sdPurchaseConfigSave, importSdPurchaseConfigUrl } from '@a/rebateManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    sdchoseProduct: () => import('./components/sdchoseProduct'),
    importfile: () => import('@/components/importfile/index')
  },
  data() {
    return {
      ruleForm: {
        merchantId: '',
        buId: '',
        supplierId: '',
        effectiveTime: '',
        invalidTime: ''
      },
      rules: {
        merchantId: [
          { required: true, message: '请选择公司', trigger: 'change' }
        ],
        buId: [
          { required: true, message: '请选择事业部', trigger: 'change' }
        ],
        supplierId: [
          { required: true, message: '请选择供应商', trigger: 'change' }
        ],
        effectiveTime: [
          { required: true, message: '生效时间不能为空', trigger: 'change' }
        ],
        invalidTime: [
          { required: true, message: '失效时间不能为空', trigger: 'blur' }
        ]
      },
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      tableData1: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      visible: { show: false },
      dialogVisible: { show: false },
      filterData: {},
      sdConfigIdListType1: [],
      sdConfigIdListType2: [],
      configData: {},
      saveLoading: false,
      importSdPurchaseConfigUrl
    }
  },
  mounted() {
    this.sdTypeConfigGetList() // 获取下拉数据
    this.getEditOrCopyPageInfo() // 获取数据
  },
  methods: {
    // 新增
    add() {
      const data = {
        sdConfigId: '',
        proportion: '',
        sdSimpleName: ''
      }
      this.tableData.list.push(data)
    },
    dele(index) {
      this.tableData.list.splice(index, 1)
    },
    choseSDtype(index) {
      const { sdConfigId } = this.tableData.list[index]
      this.tableData.list[index].sdConfigSimpleName = ''
      if (sdConfigId) {
        const target = this.sdConfigIdListType1.find(item => +item.id === +sdConfigId) || []
        this.tableData.list[index].sdConfigSimpleName = target.sdSimpleName || ''
      }
    },
    comfirm(list) {
       if (list.length < 1) {
        this.$errorMsg('至少选择一个商品！')
        return false
      }
      list.forEach(item => {
        const { commGoodsName, commBrandParentName, commbarcode, id } = item
        this.tableData1.list.push({
          goodsName: commGoodsName,
          brandParent: commBrandParentName,
          commbarcode,
          sdConfigSimpleName: '',
          id
        })
      })
      this.visible.show = false
    },
    // 选择公司
    changeMerchantId(type) {
      const { merchantId } = this.ruleForm
      delete this.selectOpt.buList
      delete this.selectOpt.supplierList
      if (merchantId) {
        this.getBUSelectBean('buList', { merchantId }) // 获取事业部
        this.getSupplierByMerchantId('supplierList', { merchantId })
      }
      if (type !== 'init') {
        this.ruleForm.buId = ''
        this.ruleForm.supplierId = ''
      }
    },
    // 获取下拉
    async sdTypeConfigGetList() {
      const res = await sdTypeConfigGetList({ type: 1 })
      this.sdConfigIdListType1 = res.data || []
      const res1 = await sdTypeConfigGetList({ type: 2 })
      this.sdConfigIdListType2 = res1.data || []
    },
    choseSDtypeSec(index) {
      const { sdConfigId } = this.tableData1.list[index]
      this.tableData1.list[index].sdConfigSimpleName = ''
      if (sdConfigId) {
        const target = this.sdConfigIdListType2.find(item => +item.id === +sdConfigId) || []
        this.tableData1.list[index].sdConfigSimpleName = target.sdSimpleName || ''
      }
    },
    // 保存/ 审核
    save(status = 0) {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) {
          this.$errorMsg('请先完善信息')
          return false
        }
        const start = this.ruleForm.effectiveTime.substring(0, 10).replace(/-/, '')
        const end = this.ruleForm.invalidTime.substring(0, 10).replace(/-/, '')
        if (end < start) {
          this.$errorMsg('失效时间不能小于生效时间!')
          return false
        }
        let flage = true
        const tips = '单比例配置列表'
        const itemList = []
        this.tableData.list.forEach((item, index) => {
          let { sdConfigId, proportion } = item
          if (!sdConfigId) {
            this.$errorMsg(`${tips}, 第${index + 1}行，请选择SD类型`)
            flage = false
            return false
          }
          if (proportion === '' || proportion === null) {
            this.$errorMsg(`${tips}, 第${index + 1}行，请输入比例`)
            flage = false
            return false
          }
          if (Number(proportion) > 9999.99999) {
            this.$errorMsg(`${tips}, 第${index + 1}行，比例不能超过5位数`)
            flage = false
            return false
          }
          sdConfigId = sdConfigId.toString()
          proportion = proportion.toString()
          itemList.push({ sdConfigId, proportion })
        })
        if (!flage) return false
        const tips1 = '多比例配置'
        this.tableData1.list.forEach((item, index) => {
          let { sdConfigId, proportion, commbarcode } = item
          if (!sdConfigId) {
            this.$errorMsg(`${tips1}, 第${index + 1}行，请选择SD类型`)
            flage = false
            return false
          }
          if (proportion === '' || proportion === null) {
            this.$errorMsg(`${tips1}, 第${index + 1}行，请输入比例`)
            flage = false
            return false
          }
          if (Number(proportion) > 9999.99999) {
            this.$errorMsg(`${tips}, 第${index + 1}行，比例不能超过5位数`)
            flage = false
            return false
          }
          sdConfigId = sdConfigId.toString()
          proportion = proportion.toString()
          itemList.push({ sdConfigId, proportion, commbarcode })
        })
        if (!flage) return false
        if (itemList.length < 1) {
          this.$errorMsg('请选择至少配置一项比例配置')
          return false
        }
        const opt = {
          ...this.ruleForm,
          status: status,
          itemList: JSON.stringify(itemList)
        }
        this.saveLoading = true
        try {
          await sdPurchaseConfigSave(opt)
          this.$successMsg('操作成功')
          this.closeTag()
        } catch (error) {
          console.log(error)
        }
        this.saveLoading = false
      })
    },
    // 审核
    audit() {
      this.$confirm('确认提交审核', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        this.save(1)
			})
    },
    deleTable() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      const ids = this.tableChoseList.map(item => +item.id)
      const list = []
      this.tableData1.list.map(item => {
        if (!ids.includes(+item.id)) list.push(item)
      })
      this.tableData1.list = list
    },
    // 导入成功
    successUpload(result) {
      if (result.data && result.data.mutiItemList.length > 0) {
        const itemList = result.data.mutiItemList || []
        itemList.forEach(item => {
          const { sdConfigSimpleName, brandParent, commbarcode, goodsName, proportion } = item
          let id = Date.now() + '' + Math.floor(Math.random() * 100000)
          this.tableData1.list.push({ sdConfigSimpleName, brandParent, commbarcode, goodsName, proportion, id: Number(id) })
        })
      }
    },
    // 获取数据
    async getEditOrCopyPageInfo() {
      const { query } = this.$route
      const res = await getEditOrCopyPageInfo({ id: query.id })
      this.configData = res.data || {}
      const data = this.configData.detail || {}
      // form 数据
      for (let key in this.ruleForm) {
        this.ruleForm[key] = data[key] ? data[key].toString() : ''
      }
      this.changeMerchantId('init')
      // 多比例数据
      this.tableData1.list = this.configData.itemList.filter(item => item.sdConfigSimpleType === '2')
      this.tableData.list = this.configData.itemList.filter(item => item.sdConfigSimpleType === '1')
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
.title-bx{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tongji-item{
  display: inline-block;
  width: 220px;
}
.import-bx{
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
