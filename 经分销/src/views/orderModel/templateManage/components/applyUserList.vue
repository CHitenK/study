<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      :width="'60vw'"
      :title="'适用客户'"
      :btnAlign="'right'"
      top="6vh"
      @comfirm="comfrim"
      :beforeClose="beforeClose"
      :loading="loading"
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-row :gutter="10" class="kk-bx">
          <el-col :span="24">
            <el-form-item  label="状态："  prop="status" class="search-panel-item fs-14 clr-II" >
              <el-radio v-model="ruleForm.status" label="1">启用</el-radio>
              <el-radio v-model="ruleForm.status" label="0">禁用</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="选择适用客户：" prop="companylist" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.companylist" placeholder="请选择" filterable multiple clearable :data-list="getSelectBeanByDto('kuhuList', { cusType: '1' }, { 'key': 'id', 'value': 'name', 'code': '' })" style="width: 32vw;" >
                <el-option v-for="item in selectOpt.kuhuList"  :key="item.key" :label="item.value" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button class="mr-t-5" size="small" type="primary" @click="add">确定</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="company-page">
        <el-col :span="24"  class="mr-t-20">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            :showPagination="false"
            :tableHeight="'340px'"
          >
            <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
            <el-table-column prop="customerName" label="客户名称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerCode" label="客户编码" align="center" width="200"></el-table-column>
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
import { getRelCustomer, saveCustomerRel } from '@a/templateManage/index'
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
        status: '1',
        companylist: []
      },
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      rules: {
        status: { required: true }
      },
      loading: false
    }
  },
  mounted() {
    // 设置table 高度
    this.getList()
  },
  methods: {
    async getList() {
      try {
				this.tableData.loading = true
				const res = await getRelCustomer({ ...this.filterData })
        this.tableData.list = res.data || []
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
    },
    // 增加
    add() {
      if (!this.ruleForm.companylist || this.ruleForm.companylist.length < 1) {
        this.$errorMsg('请选择适用客户')
        return false
      }
      this.ruleForm.companylist.map(item => {
        const falge = this.tableData.list.find(gtem => +gtem.customerId === +item.key)
        if (!falge) {
         this.tableData.list.push({
           customerId: item.key,
           customerName: item.value,
           customerCode: item.code
         })
        }
      })
      this.ruleForm.companylist = []
    },
    // 删除
    dele(index) {
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
      this.loading = true
      const customerRelList = this.tableData.list.map(item => {
        return {
          customerId: item.customerId + '',
          customerName: item.customerName,
          customerCode: item.customerCode + ''
        }
      })
      const opt = {
        status: this.ruleForm.status,
        id: this.filterData.fileId,
        customerRelList
      }
      try {
        const res = await saveCustomerRel({ json: JSON.stringify(opt) })
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
.kk-bx{
  max-height: 90px;
  overflow: auto;
}
.footer-bx{
  margin-top: -30px;
}
</style>
