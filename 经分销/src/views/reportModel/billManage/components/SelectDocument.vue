<template>
  <!-- 选择单据组件 -->
  <JFX-Dialog
    title="选择单据"
    closeBtnText="取 消"
    :width="'900px'"
    :top="'80px'"
    :showClose="true"
		:visible="isVisible"
    @comfirm="comfirm"
	>
    <el-form :model="searchProps" ref="searchForm" class="search-bx">
      <el-row :gutter="10" class="page-view">
        <el-col :span="9">
          <el-form-item label="客户：" prop="codes">
            <el-input v-model="searchProps.codes" placeholder="请选择" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="单据类型：" prop="customerId">
            <el-select
              v-model="searchProps.customerId"
              placeholder="请选择"
              clearable
              :data-list="getSelectList('adjustmentType_sourceList')"
            >
              <el-option
                v-for="item in selectOpt.adjustmentType_sourceList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div style="float: right;overflow: hidden;">
            <el-button type="text" @click="isShow=!isShow">
              {{!isShow ? '展开' : '收起'}}
              <i :class="!isShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" style="margin-left: 4px" />
            </el-button>
            <el-button @click="getList(1)" type="primary">查询</el-button>
            <el-button @click="reset('searchForm')">重置</el-button>
          </div>
        </el-col>
        <template v-if="isShow">
          <el-col :span="9">
            <el-form-item label="PO单号：" prop="outDepotId">
              <el-select
                v-model="searchProps.outDepotId"
                placeholder="请选择"
                clearable
                :data-list="getSelectList('adjustmentType_sourceList')"
              >
                <el-option
                  v-for="item in selectOpt.adjustmentType_sourceList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="业务单据号：" prop="poNo">
              <el-input v-model="searchProps.poNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <el-row class="mr-b-20">
      已选 <span style="color: red;">0</span> 行记录，
      PO <span style="color: red;">0</span> 个，
      数量 <span style="color: red;">0</span> 件，
      金额 <span style="color: red;">0</span>
      <el-checkbox>
        <span style="color: red;">应收增加残损金额</span>
      </el-checkbox>
    </el-row>
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="code" align="center" label="业务单据号" />
      <el-table-column prop="customerName" align="center" label="客户" />
      <el-table-column prop="outDepotName" align="center" label="PO号" />
      <el-table-column prop="poNo" align="center" label="事业部" />
      <el-table-column prop="businessModelLabel" align="center" label="销售金额" />
      <el-table-column prop="createName" align="center" label="数量" />
      <el-table-column prop="createDate" align="center" label="单据类型" />
    </JFX-table>
    <!-- 表格 end-->
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    isVisible: { show: false }
  },
  data() {
    return {
      isShow: false,
      // 查询数据
      searchProps: {
        codes: '',
        customerId: '',
        outDepotId: '',
        poNo: ''
      },
      // 表格数据
      tableData: {
        list: [{}],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 11
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 拉取表格数据
		getList(pageNum) {
      const params = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.searchProps
      }
      console.log(params)
    },
    // 提交表单
    comfirm() {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          this.$emit('comfirm')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-view{
  width: 100%;
  margin-bottom: 10px;
}
/deep/.search-bx .el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 120px;
}
/deep/.search-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
