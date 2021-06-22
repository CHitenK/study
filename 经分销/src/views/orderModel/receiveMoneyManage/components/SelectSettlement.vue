<template>
  <div>
    <JFX-Dialog
      :visible.sync="selectSettlementVisible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'1000px'"
      :title="'选择结算项目'"
      :btnAlign="'center'"
      :confirmBtnLoading="confirmBtnLoading"
      top="15vh"
    >
      <JFX-search-panel @reset="resetForm" @search="getList(1)">
        <el-form :model="searchProps" ref="searchForm">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="一级费项：" prop="parentId" class="search-panel-item fs-14 clr-II">
                <el-select v-model="searchProps.parentId"
                           style="width: 220px;"
                           placeholder="请选择"
                           filterable
                           @change="oneSelecChange"
                           clearable>
                  <el-option
                    v-for="item in oneProjectList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="二级费项：" prop="projectId" class="search-panel-item fs-14 clr-II">
                <el-select v-model="searchProps.projectId"
                           style="width: 220px;"
                           placeholder="请选择"
                           filterable
                           clearable>
                  <el-option
                    v-for="item in twoProjectList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </JFX-search-panel>
      <el-row class="company-page mr-t-20">
        <el-col :span="24" class="mr-t-10">
          <!-- 表格 -->
          <JFX-table :tableData.sync="tableData"
                     :tableColumn="tableColumn"
                     ref="rootTable"
                     showSelection
                     @selection-change="selectionChange"
                     @change="getList">
          </JFX-table>
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>

<script>
import {
  settlementConfigListByCustomer,
  getSettlementConfigBean
} from '@a/receiveMoneyManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    selectSettlementVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    customerId: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      searchProps: {
        parentId: '',
        projectId: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '一级费项', prop: 'parentProjectName', minWidth: '120', align: 'center', hide: true },
        { label: '二级费项', prop: 'projectName', minWidth: '120', align: 'center', hide: true }
      ],
      oneProjectList: [],
      twoProjectList: [],
      confirmBtnLoading: false
    }
  },
  mounted() {
    this.getList()
    this.getOneSelect()
    this.getTwoSelect()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum = '') {
      const { parentId, projectId } = this.searchProps
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await settlementConfigListByCustomer({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          parentId: parentId || '',
          id: projectId || '',
          customerId: this.customerId,
          type: '1',
          moduleType: 4
        })
				this.tableData.list = data ? data.list : []
        this.tableData.total = data ? data.total : 0
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.tableData.loading = false
      }
    },
    // 获取一级项目列表
    async getOneSelect() {
      const { customerId } = this
      const { data } = await getSettlementConfigBean({
        token: sessionStorage.getItem('token'),
        level: 1,
        customerId,
        type: 1,
        moduleType: 4
      })
      if (data && data.length) {
        this.oneProjectList = data.map(item => ({ key: item.value, value: item.label }))
      } else {
        this.oneProjectList = []
      }
    },
    // 获取二级项目列表
    async getTwoSelect(parentId) {
      const { customerId } = this
      const { data } = await getSettlementConfigBean({
        token: sessionStorage.getItem('token'),
        parentId,
        customerId,
        level: 2,
        type: 1,
        moduleType: 4
      })
      if (data && data.length) {
        this.twoProjectList = data.map(item => ({ key: item.value, value: item.label }))
      } else {
        this.twoProjectList = []
      }
    },
    // 提交
    async comfirm() {
      if (!this.tableChoseList.length) {
        return this.$emit('comfirm')
      }
      this.confirmBtnLoading = true
      const { id: projectId, projectName, parentProjectName: oneLevelProjectName } = this.tableChoseList[0]
      this.$emit('comfirm', { projectId, projectName, oneLevelProjectName, index: this.index })
      this.confirmBtnLoading = false
    },
    selectionChange(rows) {
      if (rows.length >= 2) {
        this.$errorMsg('只能选择一条单据')
        console.log(this.$refs['rootTable'].$refs['el-table'])
        this.$refs['rootTable'].$refs['el-table'].clearSelection()
        this.$refs['rootTable'].$refs['el-table'].toggleRowSelection(rows.pop())
        // this.tableChoseList = []
        return false
      }
      this.tableChoseList = rows
    },
    // 隐藏弹窗
    closeModal(type) {
      switch (type) {
        // 选择单据
        case 'selectDocument':
          this.selectDocument.visible.show = false
          break
      }
      this.init()
    },
    // 一级项目改变
    oneSelecChange(parentId) {
      this.searchProps.projectId = ''
      this.getTwoSelect(parentId)
    },
    // 重置搜索栏
    resetForm() {
      this.reset('searchForm', () => {
        this.getList(1)
      })
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
