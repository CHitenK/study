<template>
   <!--  录入发票时间 组件  -->
  <JFX-Dialog
		:visible.sync="visible"
    :showClose="false"
    @comfirm="comfirm"
    :width="'820px'"
    :title="'新增组'"
    :top="'8vh'"
    closeBtnText="取 消"
    :beforeClose="close"
		>
    <el-form :model="ruleForm" ref="ruleForm" v-loading="loading" >
      <el-row :gutter="10" class="page-view">
        <el-col :span="24">
          <el-form-item label="选择标准条形码：" prop="barcode">
            <el-select v-model="barcode" placeholder="请选择" filterable clearable multiple collapse-tags style="width: 320px;" >
              <el-option v-for="item in barcodeList"  :key="item.commbarcode" :label="item.commbarcode" :value="item.commbarcode"></el-option>
            </el-select>
            <el-button type="primary" size="mini" @click="add" >确定</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="mr-t-10">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            :showFixedTop="false"
            :tableHeight="'480px'"
            :showPagination="false"
            @selection-change="selectionChange"
          >
            <el-table-column type="index" label="序号" align="center" width="55" ></el-table-column>
            <el-table-column prop="commbarcode" label="标准条码" align="center" width="200" ></el-table-column>
            <el-table-column prop="commGoodsName" label="标准品名" align="center" min-width="120" ></el-table-column>
            <el-table-column prop="goodsNo" align="center" width="120" >
              <template slot="header">
                <span class="need">标识为组码</span>
              </template>
              <template slot-scope="scope">
                <el-radio v-model="ruleForm.groupCommbarcode" :label="scope.row.commbarcode">是</el-radio>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="60" >
              <template slot-scope="scope">
                <el-button type="text" @click="dele(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
      </el-row>
    </el-form>
	</JFX-Dialog>
</template>
<script>
import { listCommbarcodes, saveGroupCommbarcodes, groupCommbarcodeDetail } from '@a/brandManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    visible: { show: false },
    filterData: {}
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
      ruleForm: {
        groupCommbarcode: '',
        id: '',
        groupName: '',
        commbarcode: ''
      },
      barcode: '',
      loading: false,
      barcodeList: []
    }
  },
  mounted() {
    this.getList()
    if (this.filterData.id) {
      this.init()
    }
  },
  methods: {
    async getList() {
      try {
        const opt = {
          begin: 0,
          pageSize: 10 * 1000,
          maintainStatus: '1'
        }
				// 同步方法
				const res = await listCommbarcodes(opt)
				this.barcodeList = res.data.list
			} catch (err) {
        console.log(err)
			}
		},
    async comfirm() {
      if (!this.ruleForm.groupCommbarcode) {
        this.$errorMsg('组码未选择')
        return false
      }
      if (this.loading) return false
      this.loading = true
      const target = this.tableData.list.find(item => +this.ruleForm.groupCommbarcode === +item.commbarcode) || {}
      this.ruleForm.groupName = target.commGoodsName || ''
      this.ruleForm.commbarcode = this.tableData.list.map(item => item.commbarcode).toString()
      try {
        await saveGroupCommbarcodes(this.ruleForm)
        this.$successMsg('保存成功')
        this.$emit('close')
        this.visible.show = false
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    async init() {
      try {
        const res = await groupCommbarcodeDetail({ id: this.filterData.id || '' })
        this.ruleForm.id = this.filterData.id
        this.ruleForm.groupCommbarcode = this.filterData.groupCommbarcode || ''
        this.tableData.list = res.data.list || []
        this.tableData.list.forEach(item => {
          item.commGoodsName = item.groupName
        })
      } catch (error) {
        console.log(error)
      }
    },
    close() {
      this.$confirm('你将关闭该界面，数据不会被保存，是否继续关闭？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.visible.show = false
			})
    },
    // 新增
    add() {
      if (!this.barcode || this.barcode.length < 1) {
        this.$errorMsg('请选择标准条形码！')
        return false
      }
      const commbarcodeList = this.tableData.list.map(item => item.commbarcode)
      const list = this.barcodeList.filter(item => this.barcode.includes(item.commbarcode) && !commbarcodeList.includes(item.commbarcode))
      this.tableData.list.push(...list)
      this.barcode = ''
    },
    // 删除
    dele(index) {
      this.tableData.list.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.page-view{
  width: 100%;
  margin-bottom: 10px;
}
.flex-l-c{
  display: flex;
  align-items: center;
}
/deep/.page-view .el-form-item__label{
  width: 150px;
}
</style>
