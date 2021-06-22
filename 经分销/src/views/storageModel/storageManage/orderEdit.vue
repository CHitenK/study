<template>
  <div class="page-bx bgc-w order-edit-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" :breadcrumb="breadcrumb" />
    <el-form class="mr-t-20" :model="ruleForm" ref="ruleForm" :rules="rules" >
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="盘点仓库：" prop="depotId" >
            <el-select v-model="ruleForm.depotId" placeholder="请选择" filterable clearable :data-list="getSelectBeanByMerchantRel('warehouseList',{ 'isInOutInstruction': 1 })" >
              <el-option v-for="item in selectOpt.warehouseList" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="委托单位：" >
            <el-input v-model.trim="ruleForm.merchantName" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="业务场景：" prop="model" >
            <el-select v-model.trim="ruleForm.model" placeholder="请选择" :filterable="selectOpt.takesStock_modelList && selectOpt.takesStock_modelList.length > 5" clearable :data-list="getSelectList('takesStock_modelList')" >
              <el-option v-for="item in selectOpt.takesStock_modelList" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="服务类型：" prop="serverType" >
            <el-select v-model.trim="ruleForm.serverType" placeholder="请选择" :filterable="selectOpt.takesStock_serverTypeList && selectOpt.takesStock_serverTypeList.length > 5" clearable :data-list="getSelectList('takesStock_serverTypeList')" >
              <el-option v-for="item in selectOpt.takesStock_serverTypeList" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="mr-t-15">
          <el-form-item label="备注：" prop="remark" class="textarea-con">
            <el-input v-model="ruleForm.remark" type="textarea" :rows="3" maxlength="100"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <JFX-title title="商品信息" className="mr-t-15" />
    <div class="mr-t-20"></div>
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      :showPagination="false"
    >
      <el-table-column
				align="center"
				width="160"
				label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="add">
              <i class="el-icon-plus fs-16"></i>
            </el-button>
            <el-button type="text" @click="reduce(scope.$index)">
              <i class="el-icon-minus fs-16"></i>
            </el-button>
          </template>
      </el-table-column>
      <el-table-column
        prop="code"
        label="商品编号"
        align="center"
      >
      <template slot-scope="{row, $index}">
        <el-button type="primary" @click="choseProduct($index)">选择商品</el-button>
        <span>{{row.goodsCode}}</span>
      </template>
      </el-table-column>
      <el-table-column
        label="商品货号"
        prop="goodsNo"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="商品名称"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="barcode"
        label="条形码"
        align="center"
      >
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <div class="mr-t-30 flex-c-c">
      <el-button :loading="submitBtnLoading" type="primary" @click="submitForm">保 存</el-button>
      <el-button @click="beforeGoback">取 消</el-button>
    </div>
    <!-- 选择商品 -->
    <chose-products v-if="visible.show" :visible.sync="visible" @comfirm="handleComfirm" :filterData="filterData"></chose-products>
     <!-- 选择商品 -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import choseProducts from '@c/choseProducts/index'
import { updateTakesStock, saveTakesStock, getEditDetail } from '@a/storageManage/index'
export default {
  mixins: [commomMix],
  components: {
    choseProducts
  },
  data() {
    return {
      breadcrumb: [
        {path: '', meta: { title: '仓储管理' }},
        {path: '/storage/orderlist', meta: { title: '盘点指令列表' }},
        {path: '', meta: { title: '指令编辑' }}
      ],
      ruleForm: {
        depotId: '',
        merchantName: '',
        model: '',
        serverType: '',
        remark: ''
      },
      rules: {
        depotId: [{ required: true, message: '请选择盘点仓库', trigger: 'change' }],
        model: [{ required: true, message: '请选择业务场景', trigger: 'change' }],
        serverType: [{ required: true, message: '请选择服务类型', trigger: 'change' }]
      },
      tableData: {
        list: [{}],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      filterData: {},
      submitBtnLoading: false,
      currentChoseIdx: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取编辑页面信息
    async getList() {
      const id = this.$route.params.id
      if (id !== '01') {
        try {
          this.tableData.loading = true
          const { data: { itemList, takesStockModel } } = await getEditDetail({ id })
          this.tableData.list = itemList
          this.tableData.loading = false
          this.ruleForm = takesStockModel
          this.ruleForm.depotId = this.ruleForm.depotId.toString()
        } catch (err) {
          this.tableData.loading = false
        }
      } else {
        // 获取当前用户的信息
        const userInfo = this.getUserInfo()
        this.ruleForm.merchantName = userInfo.merchantName || ''
      }
    },
    // 提交表单
    submitForm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          const hasEmptyObj = this.tableData.list.find(item => JSON.stringify(item) === '{}')
          if (hasEmptyObj) {
            return this.$errorMsg('请选择商品')
          }
          const id = this.$route.params.id
          const goodsList = JSON.stringify(this.tableData.list.map(item => {
            return {
              goodsId: item.goodsId ? item.goodsId + '' : item.id + '' || '',
              goodsNo: item.goodsNo,
              barcode: item.barcode
            }
          }))
          try {
            this.submitBtnLoading = true
            if (id === '01') {
              await saveTakesStock({
                goodsList,
                ...this.ruleForm
              })
            } else {
              await updateTakesStock({
                id: id,
                goodsList,
                ...this.ruleForm
              })
            }
            this.$successMsg('操作成功')
            this.linkTo('/storage/orderlist')
            this.submitBtnLoading = false
          } catch (error) {
            this.$errorMsg(error)
            this.submitBtnLoading = false
          }
        }
      })
    },
    // 选择商品
    choseProduct(index) {
      if (!this.ruleForm.depotId) {
        return this.$errorMsg('请选择盘点仓库!')
      }
      this.filterData = {
        depotId: this.ruleForm.depotId,
        popupType: 5
      }
      this.currentChoseIdx = index
      this.visible.show = true
    },
    // 点击确认选择商品
    handleComfirm(payload) {
      if (payload.length) {
        const data = payload.map(item => {
          return {
            ...item,
            goodsName: item.name
          }
        })
        this.tableData.list.splice(this.currentChoseIdx, 1, ...data)
      }
      this.visible.show = false
    },
    // 增加表格行
    add() {
      this.tableData.list.push({})
    },
    // 删除表格行
    reduce(index) {
      if (this.tableData.list.length > 1) {
        this.tableData.list.splice(index, 1)
      }
    },
    // 取消
    beforeGoback() {
      this.reset('ruleForm')
      this.tableData.list = [{}]
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.image-preview{
  display: inline-block;
}
/deep/.order-edit-bx .el-form-item__label {
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
/deep/.edit-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
/deep/.textarea-con {
  display: flex;
  align-items: flex-start;
  .el-form-item__label{
    width: 120px;
  }
  .el-form-item__content {
    width: 630px;
  }
}
</style>
