<template>
  <!-- 选择关联公司组件 -->
  <JFX-Dialog
		:visible.sync="companyVisible"
    :showClose="true"
    :width="'60vw'"
    :title="'选择公司'"
    :top="'80px'"
    closeBtnText="取 消"
    :confirmBtnLoading="confirmBtnLoading"
    @comfirm="comfirm"
	>
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               :showPagination="false"
               ref="rootTable"
               showSelection
               @selection-change="selectionChange">
      <template slot="accountPeriod" slot-scope="{row}">
        <el-select v-model="row.accountPeriod"
                   placeholder="请选择"
                   filterable
                   clearable>
          <el-option
            v-for="item in accountPeriodList"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </template>
      <template slot="businessModel" slot-scope="{row}">
        <el-select v-model="row.businessModel"
                   placeholder="请选择"
                   filterable
                   clearable>
          <el-option
            v-for="item in businessModelList"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </template>
    </JFX-table>
    <!-- 表格 end-->
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
import {
  getMerchantInfo,
  getMerchantRel
} from '@a/customerManage'
export default {
  mixins: [commomMix],
  props: {
    companyVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    id: {
      type: String,
      default: ''
    },
    isDefaultChecked: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 表格列数据
      tableColumn: [
        { label: '公司编码', prop: 'code', minWidth: '120', align: 'center', hide: true },
        { label: '公司名称', prop: 'name', minWidth: '120', align: 'center', hide: true },
        { label: '账期', slotTo: 'accountPeriod', minWidth: '120', align: 'center', hide: true },
        { label: '销售模式', slotTo: 'businessModel', minWidth: '120', align: 'center', hide: true }
      ],
      confirmBtnLoading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id } = this
      try {
        const { data: list } = await getMerchantInfo()
        this.tableData.list = list || []
        // 默认勾选
        if (id && this.isDefaultChecked) {
          const { data: relList } = await getMerchantRel({ id })
          // 客户id集合
          const merchantIds = relList.map(item => item.merchantId)
          await this.$nextTick()
          this.tableData.list.forEach(item => {
            if (merchantIds.includes(item.id)) {
              this.$refs['rootTable'].$refs['el-table'].toggleRowSelection(item)
            }
          })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    comfirm() {
      if (!this.tableChoseList.length) {
        this.$emit('comfirm')
        return false
      }
      this.$emit('comfirm', this.tableChoseList)
    }
  }
}
</script>
