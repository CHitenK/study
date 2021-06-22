<template>
  <!-- 选择结算项目组件 -->
  <div>
    <JFX-Dialog
      :visible.sync="selectSettlementVisible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'800px'"
      :title="'选择结算项目'"
      :btnAlign="'center'"
      :confirmBtnLoading="confirmBtnLoading"
      top="15vh"
    >
      <JFX-search-panel @reset="resetForm" @search="getList(1)" :showOpenBtn="false" style="margin-top:0;">
        <el-form :model="searchProps" ref="searchForm">
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="费项名称：" prop="parentId" class="search-panel-item fs-14 clr-II">
                <el-select v-model="searchProps.parentId"
                           style="width: 220px;"
                           placeholder="请选择"
                           filterable
                           clearable>
                  <el-option
                    v-for="item in settlementList"
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
  getSettlementConfigList,
  getSettlementConfigBean
} from '@a/paymentManage'
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
    index: {
      type: Number,
      default: 0
    },
    selectType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchProps: {
        parentId: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '一级费项', prop: 'parentProjectName', minWidth: '120', align: 'center', hide: true },
        { label: '二级费项', prop: 'projectName', minWidth: '120', align: 'center', hide: true }
      ],
      // 费项列表
      settlementList: [],
      confirmBtnLoading: false
    }
  },
  mounted() {
    this.getList()
    this.getSettlementList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      const { parentId } = this.searchProps
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await getSettlementConfigList({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          parentId,
          moduleType: 3
        })
				this.tableData.list = data ? data.list : []
        this.tableData.total = data ? data.total : 0
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.tableData.loading = false
      }
    },
    // 获取获取费项列表
    async getSettlementList() {
      const { data } = await getSettlementConfigBean({
        token: sessionStorage.getItem('token'),
        level: 1,
        moduleType: 3
      })
      if (data && data.length) {
        this.settlementList = data.map(item => ({ key: item.value, value: item.label }))
      }
    },
    // 提交
    async comfirm() {
      if (!this.tableChoseList.length) {
        return this.$emit('comfirm')
      }
      this.confirmBtnLoading = true
      const { id: projectId, projectName, parentProjectName, parentId: parentProjectId } = this.tableChoseList[0]
      const data = { projectId, projectName, parentProjectName, parentProjectId, index: this.index }
      if (this.selectType) {
        this.$emit('comfirm', data, this.selectType)
      } else {
        this.$emit('comfirm', data)
      }
      this.confirmBtnLoading = false
    },
    selectionChange(rows) {
      if (rows.length >= 2) {
        this.$refs['rootTable'].$refs['el-table'].clearSelection()
        this.$refs['rootTable'].$refs['el-table'].toggleRowSelection(rows.pop())
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
