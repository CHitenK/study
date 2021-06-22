<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      @comfirm="comfirm"
      closeBtnText="取消调整"
      confirmBtnText="确认调整"
      :width="'1000px'"
      :title="'调整额度'"
      :btnAlign="'center'"
      top="6vh"
    >
      <div class="company-page" :loading="loading">
        <!-- 部门额度 -->
        <el-row class="fs-14 clr-II" v-if="type === 'department'">
          <el-col :span="8" class="mr-b-10"> 部门名称：{{targetData.departmentName}}</el-col>
          <el-col :span="8" class="mr-b-10"> 额度币种：{{targetData.currency}}</el-col>
          <el-col :span="8" class="mr-b-10"> 现使用项目额度：{{targetData.departmentQuota ? numberFormat(targetData.departmentQuota || 0) : 0}}</el-col>
          <el-col :span="8" class="mr-b-10"> 生效日期：{{targetData.effectiveDate ? targetData.effectiveDate.substring(0, 10) : ''}}</el-col>
          <el-col :span="8" class="mr-b-10"> 失效日期：{{targetData.expirationDate ? targetData.expirationDate.substring(0, 10) : ''}}</el-col>
          <el-col :span="24"><span class="need">调整部门额度：<JFX-Input v-model.trim="quota" :precision="0" placeholder="请输入" style="width: 300px;" clearable /></span></el-col>
        </el-row>
        <!-- 部门额度 end -->
        <!-- 客户，项目额度调整 -->
        <el-row class="fs-14 clr-II" v-else>
          <el-col :span="8" class="mr-b-10"> 事业部：{{targetData.buName}}</el-col>
          <el-col :span="8" class="mr-b-10" v-if="type === 'article'"> 母品牌：{{targetData.superiorParentBrand}}</el-col>
          <el-col :span="8" class="mr-b-10" v-if="type === 'customer'"> 客户：{{targetData.customerName}}</el-col>
          <el-col :span="8" class="mr-b-10" v-if="type === 'article'"> 现使用项目额度：{{numberFormat(targetData.projectQuota) || 0}}</el-col>
          <el-col :span="8" class="mr-b-10" v-if="type === 'customer'"> 现使用项目额度：{{numberFormat(targetData.customerQuota) || 0}}</el-col>
          <el-col :span="8" class="mr-b-10" > 额度币种：{{targetData.currency}}</el-col>
          <el-col :span="8" class="mr-b-10"> 生效日期：{{targetData.effectiveDate ? targetData.effectiveDate.substring(0, 10) : ''}}</el-col>
          <el-col :span="8" class="mr-b-10"> 失效日期：{{targetData.expirationDate ? targetData.expirationDate.substring(0, 10) : ''}}</el-col>
          <el-col :span="24"><span class="need" v-if="type === 'article'">调整项目额度：<JFX-Input v-model.trim="quota" :precision="0" placeholder="请输入" style="width: 300px;" clearable /></span></el-col>
          <el-col :span="24"><span class="need" v-if="type === 'customer'">调整客户额度：<JFX-Input v-model.trim="quota" :precision="0" placeholder="请输入" style="width: 300px;" clearable /></span></el-col>
        </el-row>
        <!-- 客户，项目额度调整 end -->
        <div :span="24"  class="mr-t-10 mr-b-10 fs-16 clr-I">调整日志</div>
        <!-- 表格 -->
        <JFX-table
          :tableData.sync="tableData"
          :showPagination="false"
        >
          <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
          <el-table-column prop="operater" label="操作人" align="center" min-width="120"></el-table-column>
          <el-table-column prop="operateDate" label="操作时间" align="center" min-width="140"></el-table-column>
          <el-table-column prop="commbarcode" label="操作内容" align="center" min-width="120">
            <template slot-scope="scope">
              {{scope.row.operateAction || scope.row.operateResult || scope.row.operateRemark }}
            </template>
          </el-table-column>
          <el-table-column prop="operateRemark" label="备注" align="center" min-width="160"></el-table-column>
        </JFX-table>
        <!-- 表格 end-->
      </div>
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { numberFormat } from '@u/tool'
import {
  getOperateLogList
} from '@a/base/index'
import { updateDepartmentQuota, updateProjectQuota, updateCustomerQuota } from '@a/limitPositionManage/index'
export default {
  mixins: [commomMix],
  props: {
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    targetData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    type: {
      type: String,
      default: 'department' // department 部门，article 项目，customer 客户
    }
  },
  data() {
    return {
      compayId: '',
      companylist: [],
      innerVisible: false,
      parment: '',
      quota: '',
      brandParentIdList: [],
      detail: {},
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    numberFormat,
    async comfirm() {
      if (this.loading) return false
      if (!this.$transformZeroBl(this.quota)) {
        this.$errorMsg('请输入修改额度!')
        return false
      }
      if (this.targetData.effectiveDate) {
        let start = this.targetData.expirationDate.replace(/-/, '/')
        start = new Date(start).getTime()
        const end = Date.now()
        if (end > start) {
          this.$errorMsg('失效日期不能小于当前时间!')
          return false
        }
      }
      this.loading = true
      try {
        // department 部门，article 项目，customer 客户
        switch (this.type) {
          case 'department': { // 部门额度修改
            await updateDepartmentQuota({ id: this.targetData.id, departmentQuota: this.quota })
            break
          }
          case 'article': { // 项目额度修改
            await updateProjectQuota({ id: this.targetData.id, projectQuota: this.quota })
            break
          }
          case 'customer': { // 客户额度修改
            await updateCustomerQuota({ id: this.targetData.id, customerQuota: this.quota })
            break
          }
          default: break
        }
        this.$successMsg('操作成功')
        this.$emit('close')
        this.visible.show = false
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    async getList() {
      try {
				this.tableData.loading = true
        let module = 7
        switch (this.type) { // department 部门，article 项目，customer 客户
          case 'department': {
            module = 7
            break
          }
          case 'article': {
            module = 9
            break
          }
          case 'customer': {
            module = 8
            break
          }
          default: break
        }
        // 模块 1-采购 2-预付 3-应付 4-采购预申报 5-销售 6-销售预申报 7-部门额度配置 8-客户额度 9-项目额度
        const res = await getOperateLogList({ module, relCode: this.targetData.id })
				this.tableData.list = res.data || []
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
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
</style>
