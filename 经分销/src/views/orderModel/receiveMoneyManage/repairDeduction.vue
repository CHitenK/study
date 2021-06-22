<template>
  <div class="page-bx bgc-w edit-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <div class="mr-t-20 mr-b-20 flex">
      <el-button type="primary" @click="addItem">添加补扣款</el-button>
      <el-button type="primary" @click="dele">删除</el-button>
    </div>
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @selection-change="selectionChange"
      :showPagination="false"
    >
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column align="center" min-width="100">
        <template slot="header">
          <span class="need">费用项目</span>
          </template>
        <template slot-scope="scope">
          <el-input v-model.trim="scope.row.projectName" clearable style="width: 100%" @focus="openLay(scope.$index)"  readonly ></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="110">
        <template slot="header">
          <span class="need">类型</span>
          </template>
        <template slot-scope="scope">
          <el-select v-model="scope.row.billType" placeholder="请选择" style="width: 100%" clearable>
            <el-option label="补款" value="0"></el-option>
            <el-option label="扣款" value="1"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" min-width="120">
        <template slot-scope="scope">
          <el-input v-model.trim="scope.row.remark" clearable style="width: 100%" :title="scope.row.remark"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="110">
        <template slot="header">
          <span class="need">母品牌</span>
          </template>
        <template slot-scope="scope">
          <el-select v-model="scope.row.parentBrandId" placeholder="请选择" style="width: 100%" filterable clearable :data-list="getBrandList('muBrandList')">
            <el-option v-for="item in selectOpt.muBrandList" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center" min-width="90">
        <template slot-scope="scope">
          <JFX-Input v-model.trim="scope.row.num" :min="0" :precision="0" placeholder="请输入" clearable />
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="110">
        <template slot="header">
          <span class="need">费用金额</span>
          </template>
        <template slot-scope="scope">
          <JFX-Input v-model.trim="scope.row.price" :min="0" :precision="5" placeholder="请输入" clearable />
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <div class="mr-t-30 mr-b-15 fs-14 clr-II">
      <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
       <el-button id="sale-upload-btn" type="primary">上传附件</el-button>
      </JFX-upload>
    </div>
    <enclosure-list :code="code" v-if="code" ref="enclosure" :showAction="true"></enclosure-list>
    <div class="mr-t-30 flex-c-c">
      <el-button type="primary" @click="save" :loading="saveLoading">保存</el-button>
      <el-button @click="closeTag" id="cancel_ret">取 消</el-button>
    </div>
    <!-- 选择结算项目 -->
    <SelectSettlement v-if="visible.show"
                    :selectSettlementVisible="visible"
                    :customerId="customerId"
                    @comfirm="(data) => comfirm(data)"
    ></SelectSettlement>
    <!-- 选择结算项目 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { getBaseUrl, debounce } from '@u/tool'
import { attachmentUploadFiles } from '@a/base/index'
import { listReceiveCostItem, saveToCReceiveBillCost } from '@a/receiveMoneyManage/index'
export default {
  mixins: [commomMix],
  components: {
    enclosureList: () => import('@c/enclosureList/index'),
    SelectSettlement: () => import('./components/SelectSettlement')
  },
  data() {
    return {
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      code: '',
      id: '',
      action: '',
      customerId: '',
      visible: { show: false },
      actIndex: null,
      saveLoading: false
    }
  },
  mounted() {
    const { query } = this.$route
    this.code = query.code || ''
    this.id = query.id || ''
    this.customerId = query.customerId || ''
    this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.code
    this.getList()
  },
  methods: {
    addItem: debounce(function() {
      this.tableData.list.push({
        projectId: '',
        projectName: '',
        billType: '',
        remark: '',
        returnNum: '',
        superiorParentBrandCode: '',
        num: '',
        price: '',
        uid: Date.now()
      })
    }, 200),
    async save() {
      this.saveLoading = false
      if (this.tableData.list.length < 1) {
        this.$errorMsg('请添加补扣款')
        return false
      }
      let flag = true
      for (let i = 0; i < this.tableData.list.length; i++) {
        const { projectId, billType, price } = this.tableData.list[i]
        const tips = '表格第' + (i + 1) + '行,'
        if (!projectId) {
          this.$errorMsg(tips + '请选择费用项目')
          flag = false
          return false
        }
        if (!this.$transformZeroBl(billType)) {
          this.$errorMsg(tips + '请选择类型')
          flag = false
          return false
        }
        if (!this.$transformZeroBl(price)) {
          this.$errorMsg(tips + '请输入费用金额')
          flag = false
          return false
        }
      }
      if (!flag) return false
      this.saveLoading = false
      try {
        const json = { id: this.id, costItemList: this.tableData.list }
        await saveToCReceiveBillCost({ json: json })
        this.$successMsg('操作成功')
        this.closeTag()
      } catch (error) {
        console.log(error)
      }
      this.saveLoading = false
    },
    async getList() {
      try {
        const res = await listReceiveCostItem({ begin: 0, pageSize: 10000, billId: this.id })
        if (res.data.list) {
          res.data.list.forEach(item => {
            const { billType, projectId, projectName, remark, parentBrandName, parentBrandId, num, billTypeLabel, originalAmount, id } = item
            this.tableData.list.push({
              projectId,
              projectName,
              billType,
              remark,
              billTypeLabel,
              parentBrandId: parentBrandId ? parentBrandId.toString() : '',
              parentBrandName,
              num,
              price: originalAmount,
              uid: id
            })
          })
        } else {
          this.addItem()
        }
      } catch (error) {
        this.addItem()
      }
    },
    comfirm(data) {
      const { projectId, projectName } = data
      const kdata = this.tableData.list[this.actIndex]
      this.tableData.list.splice(this.actIndex, 1, { ...kdata, projectId, projectName })
      this.visible.show = false
    },
    // 上传成功
    successUpload(res) {
      if (res.code + '' === '10000') {
        this.$refs['enclosure'].getEnclosureList(1)
      } else {
        this.$errorMsg(res.data)
      }
    },
    // 删除
    dele() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      const idsArr = this.tableChoseList.map(item => item.uid)
      const list = this.tableData.list.filter(item => !idsArr.includes(item.uid))
      this.tableData.list = list
    },
    openLay(index) {
      this.actIndex = index
      this.visible.show = true
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
