<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      :width="'800px'"
      :title="'适用配置'"
      :btnAlign="'right'"
      top="6vh"
      @comfirm="comfrim"
      :beforeClose="beforeClose"
      :loading="loading"
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-row :gutter="10" class="kk-bx">
          <el-col :span="12">
            <el-form-item  label="状态："  prop="status" class="search-panel-item fs-14 clr-II" >
              <el-radio v-model="ruleForm.status" label="1">启用</el-radio>
              <el-radio v-model="ruleForm.status" label="0">禁用</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="选择关联模板："  prop="fileTempId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.fileTempId" placeholder="请选择" filterable clearable :data-list="getFileTemp('tempList', { begin: 0, pageSize: 10000, type: '3', status: '1' }, { 'key': 'id', value: 'title', 'code': 'code' })" >
                <el-option v-for="item in selectOpt.tempList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="进出仓配置："  prop="depotConfig" class="search-panel-item fs-14 clr-II" >
              <el-radio v-model="ruleForm.depotConfig" label="0">进仓</el-radio>
              <el-radio v-model="ruleForm.depotConfig" label="1">出仓</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="ruleForm.depotConfig === '1'">
            <el-form-item  label="是否同关区："  prop="isSameArea" class="search-panel-item fs-14 clr-II" >
              <el-radio v-model="ruleForm.isSameArea" label="1">是</el-radio>
              <el-radio v-model="ruleForm.isSameArea" label="0">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="适用仓库：" prop="depotlist" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.depotlist" placeholder="请选择" filterable multiple clearable style="width: 520px;" >
                <el-option v-for="item in depotListsOpts"  :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button class="mr-t-5" size="small" type="primary" @click="add">确定</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="company-page">
        <el-col :span="24"  class="mr-t-10">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            :showPagination="false"
            :tableHeight="'300px'"
          >
            <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
            <el-table-column prop="depotCode" label="仓库编码" align="center" min-width="130"></el-table-column>
            <el-table-column prop="depotName" label="仓库名称" align="center" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerCode" label="平台关区" align="center" min-width="200">
              <template slot-scope="scope">
                <el-select v-model="scope.row.platformCustomsIds" placeholder="请选择" filterable clearable multiple collapse-tags :data-list="getSelectCustomsArea(scope.row.depotCode, { depotId: scope.row.depotId })" >
                  <el-option v-for="item in selectOpt[scope.row.depotCode]" :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-button type="text" v-if="scope.row.status !== '0'" @click="dele(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import { customsFileSaveOrModify, listDepotRel } from '@a/templateManage/index'
import { getSelectBeanByDTO } from '@a/base/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    filterData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      compayId: '',
      parment: '',
      ruleForm: {
        id: '',
        status: '1',
        fileTempId: '',
        depotConfig: '',
        isSameArea: '',
        depotlist: ''
      },
      rules: {
        status: { required: true, message: '不能为空', trigger: 'change' },
        fileTempId: { required: true, message: '请选择关联模板', trigger: 'change' },
        depotConfig: { required: true, message: '请选择进出仓配置', trigger: 'change' },
        isSameArea: { required: true, message: '请选择是否同关区', trigger: 'change' }
      },
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      loading: false,
      depotListsOpts: []
    }
  },
  mounted() {
    this.getSelectBeanByDTO()
    if (this.filterData.id) {
      this.init()
    }
  },
  methods: {
    async init() {
      for (let key in this.ruleForm) {
        this.ruleForm[key] = this.filterData[key] || ''
      }
      const res = await listDepotRel({ fileId: this.filterData.id })
      if (res.data) {
        res.data.forEach(item => {
          const { depotId, depotName, depotCode, platformCustomsIds } = item
          this.tableData.list.push({
            depotId,
            depotName,
            depotCode,
            platformCustomsIds: platformCustomsIds ? platformCustomsIds.split(',') : ''
          })
        })
      }
    },
    // 增加
    add() {
      if (!this.ruleForm.depotlist || this.ruleForm.depotlist.length < 1) {
        this.$errorMsg('请选择适用仓库')
        return false
      }
      this.ruleForm.depotlist.forEach(item => {
        const target = this.depotListsOpts.find(gtem => +gtem.id === +item) || {}
        const flag = this.tableData.list.find(ktem => +ktem.depotId === +target.id) // 排除已经选中过的数据
        if (!flag && Object.keys(target).length > 0) {
          this.tableData.list.push({
            depotId: target.id,
            depotName: target.name,
            depotCode: target.code,
            platformCustomsIds: ''
          })
        }
      })
      this.ruleForm.depotlist = []
    },
    // 删除
    dele(index) {
      delete this.selectOpt[this.tableData.list[index].depotCode]
      this.tableData.list.splice(index, 1)
    },
    beforeClose(done) {
       this.$confirm('你将关闭该界面，数据不会被保存，是否继续关闭？', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        if (done) done()
        this.visible.show = false
      })
    },
    async comfrim() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) return false
        if (this.tableData.list.length < 1) {
          this.$errorMsg('请选择适用仓库')
          return false
        }
        this.loading = true
        const { status, fileTempId, depotConfig, isSameArea, id } = this.ruleForm
        const opt = {
          id,
          status,
          fileTempId,
          depotConfig,
          isSameArea: depotConfig === '1' ? isSameArea : ''
        }
        const fileTemp = this.selectOpt.tempList.find(item => item.key === fileTempId) || {}
        opt.fileTempCode = fileTemp.code
        opt.fileTempName = fileTemp.value
        const depotRelList = []
        this.tableData.list.map(item => {
          if (item.platformCustomsIds && item.platformCustomsIds.length > 0) {
            item.platformCustomsIds = item.platformCustomsIds.map(item => item).toString()
          } else {
            item.platformCustomsIds = ''
          }
          depotRelList.push(item)
        })
        opt.depotRelList = depotRelList
        try {
          const res = await customsFileSaveOrModify({ json: JSON.stringify(opt) })
          if (res.data.code === '00') {
            this.$successMsg('操作成功')
            this.$emit('update')
            this.visible.show = false
          } else {
            this.$errorMsg(res.data.message)
          }
        } catch (err) {
          console.log(err)
        }
        this.loading = false
      })
    },
    // 获取适用仓库列表
    async getSelectBeanByDTO() {
      try {
        const res = await getSelectBeanByDTO()
        this.depotListsOpts = res.data || []
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.company-page{
  width: 100%;
  margin-bottom: 10px;
  min-height: 200px;
}
.fen-pei-bx{
  margin-top: -30px;
  border-top: solid 1px #eaeaea;
  border-bottom: solid 1px #eaeaea;
  height: 80px;
}
.dialog-footer{
  height: 30px;
  margin-top: -30px;
}
.flex-r{
  display: flex;
  justify-content: flex-end;
}
/deep/ .el-form-item__label{
  width: 130px;
}
/deep/.el-dialog__body {
  padding-bottom: 0;
}

.footer-bx{
  margin-top: -30px;
}
</style>
