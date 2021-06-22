<template>
  <!-- 编辑标准品牌 -->
  <div class="edit-bx">
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      :width="'840px'"
      :title="(targetData.id ? '编辑' : '新增') +'标准品牌'"
      :btnAlign="'center'"
      top="20vh"
      :showFooter="false"
      >
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="标准品牌：" prop="name" class="search-panel-item fs-14 clr-II" >
                <el-input v-model.trim="ruleForm.name" clearable placeholder="请输入" :maxlength="30" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="英文名称：" prop="englishName" class="search-panel-item fs-14 clr-II" >
                <el-input v-model.trim="ruleForm.englishName" clearable placeholder="请输入" :maxlength="50" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上级母品牌：" prop="superiorParentBrandCodeEditOrAdd" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.superiorParentBrandCodeEditOrAdd" placeholder="请选择" filterable clearable :data-list="getBrandList('brandList')" >
                  <el-option v-for="item in selectOpt.brandList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="授权方：" prop="authorizer" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.authorizer" placeholder="请选择" clearable >
                  <el-option :label="'品牌方'" :value="'1'">品牌方</el-option>
                  <el-option :label="'经销商'" :value="'2'">经销商</el-option>
                  <el-option :label="'无授权'" :value="'3'">无授权</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分类：" prop="type" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.type" placeholder="请选择" clearable>
                  <el-option :label="'跨境电商'" :value="'1'">跨境电商</el-option>
                  <el-option :label="'内贸'" :value="'2'">内贸</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="mr-t-20 flex-c-c">
            <el-button type="primary" @click="save" :loading="saveLoading">保 存</el-button>
            <el-button @click="visible.show=false" id="cancel_ret">取 消</el-button>
          </div>
          <div class="mr-t-30"></div>
      </el-form>
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { brandParentSave, brandParentModify } from '@a/brandManage/index'
export default {
  mixins: [commomMix],
  props: {
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    // 数据
    targetData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      ruleForm: {
        id: '',
        name: '',
        englishName: '',
        authorizer: '',
        type: '',
        superiorParentBrandCodeEditOrAdd: ''
      },
      rules: {
        name: { required: true, message: '请输入标准品牌', trigger: 'change' },
        authorizer: { required: true, message: '请选择授权方', trigger: 'change' },
        superiorParentBrandCodeEditOrAdd: { required: true, message: '请上级母品牌', trigger: 'change' },
        type: { required: true, message: '请选择分类', trigger: 'change' }
      },
      saveLoading: false
    }
  },
  mounted() {
    // 编辑
    if (this.targetData.id) {
      this.init()
    }
  },
  methods: {
    async init() {
      for (let key in this.ruleForm) {
        this.ruleForm[key] = this.targetData[key] ? this.targetData[key].toString() : ''
      }
      this.ruleForm.superiorParentBrandCodeEditOrAdd = this.targetData.superiorParentBrandId ? this.targetData.superiorParentBrandId.toString() : ''
    },
    async save() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) return false
        const regEng = /^[a-zA-Z\s]*$/
        if (!regEng.test(this.ruleForm.englishName)) {
          this.$errorMsg('英文名称必须为英文')
          return false
        }
        if (!this.ruleForm.id) delete this.ruleForm.id
        this.saveLoading = true
        const opt = {
          ...this.ruleForm
        }
        try {
          if (this.ruleForm.id) { // 编辑
            opt.oldName = this.targetData.name
            await brandParentModify(opt)
          } else { // 新增
            await brandParentSave(opt)
          }
          this.$successMsg('操作成功')
          this.$emit('close')
          this.visible.show = false
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
/deep/.edit-bx {
  .el-form-item {
    display: flex;
    flex-wrap: wrap;
  }
  .el-form-item__label {
    width: 150px;
    text-align: right;
  }
  .el-form-item__content {
    flex: 1;
    padding-right: 40px;
  }
}
</style>
