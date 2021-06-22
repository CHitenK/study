<template>
  <!-- 新增配置组件 -->
  <JFX-Dialog
    title="新增配置"
    closeBtnText="取 消"
    :width="'800px'"
    :top="'15vh'"
    :showClose="true"
		:visible="isVisible"
    @comfirm="comfirm"
    btnAlign="center"
	>
    <el-form :model="baseForm" ref="baseForm" :rules="rules">
      <el-row :gutter="10">
        <!-- 平台费用配置 -->
        <el-col :span="12" v-if="type === 'platformCostConfigEdit'">
          <el-form-item label="平台费项：" prop="platformSettlementId">
            <el-select v-model="baseForm.platformSettlementId"
                        placeholder="请选择"
                        filterable
                        clearable
                        :data-list="getPlatformCostConfigSelectBean('platformCostConfigList', { storePlatformCode: storePlatformCode })"
                        style="width: 100%;">
              <el-option
                v-for="item in selectOpt.platformCostConfigList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 销售SD配置 -->
        <el-col :span="12" v-if="type === 'SaleSDConfigEdit'">
          <el-form-item label="SD类型：" prop="sdTypeId">
            <el-select v-model="baseForm.sdTypeId"
                        placeholder="请选择"
                        filterable
                        clearable
                        style="width: 100%;">
              <el-option
                v-for="item in SDtypeList"
                :key="item.id"
                :label="item.sdTypeName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      <el-col :span="12">
        <el-form-item label="平台品类：" prop="categoryId">
          <el-select v-model="baseForm.categoryId"
                      placeholder="请选择"
                      filterable
                      clearable
                      style="width: 100%;"
                      >
            <el-option
              v-for="item in categoryIdList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="比例：" prop="ratio">
          <JFX-Input v-model.trim="baseForm.ratio" :min="0" :precision="5" placeholder="请输入" clearable />
        </el-form-item>
      </el-col>
      </el-row>
    </el-form>
    <el-row type="flex" align="middle" :gutter="10" class="mr-t-10 mr-b-20" style="padding: 0 6%">
      <el-col :span="10">
        <div class="need mr-b-10">选择母品牌</div>
        <div class="container-both">
          <el-input v-model="brandName" prefix-icon="el-icon-search" class="search el-transfer-panel__filter" clearable placeholder="模糊查询"/>
          <div class="content">
            <el-radio-group v-model="baseForm.superiorParentBrandId" v-if="muBrandList && muBrandList.length > 0">
              <el-radio v-for="item in muBrandList" :key="item.key" :label="item.key"  @change="brandParentList">{{item.value}}</el-radio>
            </el-radio-group>
            <div class="empty-text" v-else>暂无数据</div>
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="icon-right">
        <i class="el-icon-right" />
      </el-col>
      <el-col :span="10">
        <div class="mr-b-10">选择标准品牌</div>
        <div class="container-both">
          <el-input type="text" v-model.trim="bzBrandName" prefix-icon="el-icon-search" class="search el-transfer-panel__filter" placeholder="模糊查询" clearable />
          <div class="content">
            <el-checkbox class="mr-t-5" v-model="checkAll" @change="handleCheckAllChange" v-if="biaozhunBrandList && biaozhunBrandList.length > 0">全选</el-checkbox>
            <el-checkbox-group v-model="bzBrandList" @change="handleCheckedbzBrandListChange" v-if="biaozhunBrandList && biaozhunBrandList.length > 0">
              <div class="checkbox-group-bx"><el-checkbox v-for="item in biaozhunBrandList" :label="item.id" :key="item.id" class="mr-t-10">{{item.name}}</el-checkbox></div>
            </el-checkbox-group>
            <div class="empty-text" v-else>暂无数据</div>
          </div>
        </div>
      </el-col>
    </el-row>
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
import { brandParentList } from '@a/brandManage/index'
import { sdSaleTypeListDTOByPage, getPlatformSelectBean } from '@a/rebateManage/index'
export default {
  mixins: [commomMix],
  props: {
    isVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    customerId: {
      type: String,
      default: ''
    },
    storePlatformCode: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      baseForm: {
        sdTypeId: '',
        platformSettlementId: '',
        platformSettlementName: '',
        sdTypeName: '',
        categoryId: '',
        categoryName: '',
        superiorParentBrandId: '',
        superiorParentBrandName: '',
        ratio: ''
      },
      rules: {
        sdTypeId: { required: true, message: '请选择SD类型', trigger: 'change' },
        platformSettlementId: { required: true, message: '请选择平台费项', trigger: 'change' },
        categoryId: { required: true, message: '请选择平台品类', trigger: 'change' },
        ratio: { required: true, message: '请输入比例', trigger: 'blur' }
      },
      btnFlag: true,
      superiorBrandList: [],
      brandList: [],
      radio: '',
      brandName: '',
      muBrandList: [],
      oldBiaozhunBrandList: [],
      biaozhunBrandList: [],
      checkAll: false,
      bzBrandList: [],
      bzBrandName: '',
      SDtypeList: [],
      categoryIdList: []
    }
  },
  watch: {
    brandName(val) {
      if (val) {
       this.muBrandList = this.selectOpt.muBrandList.filter(item => item.value.includes(val))
      } else {
        this.muBrandList = this.selectOpt.muBrandList || []
      }
    },
    bzBrandName(val) {
      if (val) {
       this.biaozhunBrandList = this.oldBiaozhunBrandList.filter(item => item.name.includes(val))
      } else {
        this.biaozhunBrandList = this.oldBiaozhunBrandList || []
      }
    }
  },
  mounted() {
    // 获取母品牌
    this.getBrandList('muBrandList', null, null, () => {
      this.muBrandList = this.selectOpt.muBrandList
    })
    this.getSdSaleTypeListDTOByPage()
    this.getPlatformSelectBean()
  },
  methods: {
    comfirm() {
      this.$refs['baseForm'].validate(async(valid) => {
        if (valid) {
          if (!this.baseForm.superiorParentBrandId) {
            this.$errorMsg('请选择母品牌')
            return false
          }
          const { sdTypeId, categoryId, superiorParentBrandId, platformSettlementId } = this.baseForm
          const tdata = this.SDtypeList.find(item => sdTypeId === item.id) || {}
          this.baseForm.sdTypeName = tdata.sdTypeName || ''
          const gdata = this.categoryIdList.find(item => categoryId === item.value) || {}
          this.baseForm.categoryName = gdata.label || ''
          const kdata = this.muBrandList.find(item => superiorParentBrandId === item.key) || {}
          this.baseForm.superiorParentBrandName = kdata.value || ''
          const pdata = this.selectOpt.platformCostConfigList ? this.selectOpt.platformCostConfigList.find(item => +platformSettlementId === +item.key) || {} : {}
          this.baseForm.platformSettlementName = pdata.value || ''
          const list = []
          if (this.checkAll || this.bzBrandList.length < 1) { // 全选
            list.push({
              ...this.baseForm,
              brandParentName: '全子品牌',
              isAllBrandParent: '1',
              brandParentId: '',
              id: Date.now()
            })
          } else {
            this.bzBrandList.forEach(item => {
              const ldata = this.biaozhunBrandList.find(gtem => gtem.id === item) || {}
              list.push({
                ...this.baseForm,
                brandParentName: ldata.name,
                brandParentId: item,
                isAllBrandParent: '0',
                id: Date.now() + '' + Math.random()
              })
            })
          }
          this.$emit('comfirm', list)
        }
      })
    },
    // 获取标准品牌下拉
    async brandParentList(type) {
      const { superiorParentBrandId } = this.baseForm
      if (type === 'init') {
        this.bzBrandList = []
        this.biaozhunBrandList = []
        this.oldBiaozhunBrandList = []
        this.checkAll = false
      }
      if (superiorParentBrandId) {
        const res = await brandParentList({ superiorParentBrandId, begin: 0, pageSize: 10000, status: 1 }) // 根据母品牌获取标准品牌下拉
        this.biaozhunBrandList = res.data.list
        this.oldBiaozhunBrandList = res.data.list
      }
    },
    // 全选
    handleCheckAllChange() {
      if (this.checkAll) {
        this.bzBrandList = this.biaozhunBrandList.map(item => item.id)
      } else {
        this.bzBrandList = []
      }
    },
    handleCheckedbzBrandListChange() {
      this.checkAll = this.biaozhunBrandList.length > 0 && this.bzBrandList.length === this.biaozhunBrandList.length
    },
    // 获取SD类型下拉
    async getSdSaleTypeListDTOByPage() {
      const res = await sdSaleTypeListDTOByPage({ begin: 0, pageSize: 10000, status: '1' })
      this.SDtypeList = res.data.list
    },
    // 获取平台品类
    async getPlatformSelectBean() {
      const res = await getPlatformSelectBean({ customerId: this.customerId })
      this.categoryIdList = res.data
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.form__container {
  .el-form-item {
    padding-right: 30px;
    margin-bottom: 20px;
    display: flex;
    .el-form-item__label {
      width: 120px;
    }
    .el-form-item__content {
      width: 200px;
    }
  }
}

.container-both {
  position: relative;
  padding: 60px 10px 0;
  border: 1px solid #DCDFE6;
  height: 230px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .content {
    overflow: auto;
    height: inherit;
  }
  .checkbox-group-bx{
    display: flex;
    flex-direction: column;
  }
  .search {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .el-radio {
    display: flex;
    margin-bottom: 10px;
  }
}

.content::-webkit-scrollbar-track-piece {
  background-color:#f8f8f8;
}

.content::-webkit-scrollbar {
  width:9px;
  height:9px;
}

.content::-webkit-scrollbar-thumb {
  background-color:#ddd;
  border-radius: 6px;
  background-clip:padding-box;
  min-height:28px;
}

.content::-webkit-scrollbar-thumb:hover {
  background-color:#bbb;
}

.empty-text {
  text-align: center;
  color: #909399;
}

.dialog-footer{
  height: 30px;
  margin-top: -30px;
}

.icon-right {
  text-align: center;
  font-size: 30px;
  color: #6EA9F3;
}
</style>
