<template>
  <!-- 预售转销组件 -->
  <div class="edit-bx">
    <JFX-Dialog
      closeBtnText="取 消"
      title="转销售订单"
      :width="'1200px'"
      :top="'80px'"
      :showClose="true"
      :visible.sync="choosePreSaleNumVisible"
      @comfirm="comfirm"
    >
      <!-- 表单部分 -->
      <el-form ref="ruleForm" :model="ruleForm">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="客户：" prop="customerId">
              <el-select
                v-model="ruleForm.customerId"
                placeholder="请选择"
                clearable
                disabled
                filterable
                :data-list="getCustomerSelectBean('customer_list')"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in selectOpt.customer_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="PO号：" prop="poNo">
              <el-input v-model="ruleForm.poNo" placeholder="请输入" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预售单号：" prop="code">
              <el-input v-model="ruleForm.preSaleOrderCode" placeholder="请输入" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表单部分 end -->
      <!-- 表格 -->
      <JFX-table :tableData.sync="tableData"
                 :showPagination="false"
                 @selection-change="selectionChange">
        <el-table-column type="selection"
                         align="center"
                         width="55"
        ></el-table-column>
        <el-table-column prop="goodsNo"
                         align="center"
                         label="商品货号"
                         min-width="120"
                         show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="goodsName"
                         align="center"
                         label="商品名称"
                         min-width="120"
                         show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="preNum"
                         align="center"
                         label="预售总量"
                         width="100"
                         show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="price"
                         align="center"
                         label="预售单价"
                         width="100"
                         show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="staySaleNum"
                         align="center"
                         label="待销量"
                         width="100"
                         show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center"
                         label="本次销售量"
                         show-overflow-tooltip
                         width="150">
          <template slot-scope="{row}">
            <el-input-number v-model.trim="row.num" :precision="0" :controls="false" :min="0"  style="width: 100%" />
          </template>
        </el-table-column>
      </JFX-table>
      <!-- 表格 end-->
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    choosePreSaleNumVisible: {
      type: Object,
      default: function() {
        return {
          show: false
        }
      }
    },
    codes: {
      type: String,
      default: ''
    },
    form: {
      type: Object,
      default: () => {}
    },
    itemList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      ruleForm: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const { form, itemList } = this
      this.ruleForm = form
      this.tableData.list = itemList
    },
    comfirm() {
      if (!this.tableChoseList.length) {
        return this.$errorMsg('至少选择一条商品进行分配销售量')
      }
      let flag = true
      const goodsIdArr = this.tableChoseList.map(item => item.goodsNo)
      const hash = {}
      const temp = []
      for (const i in goodsIdArr) {
        if (hash[goodsIdArr[i]]) { temp.push(goodsIdArr[i]) }
        hash[goodsIdArr[i]] = true
      }
      const tempArr = this.tableChoseList.filter(item => temp.includes(item.goodsNo))
      const priceArr = tempArr.map(item => item.price)
      if ([...new Set(priceArr)].length >= 2) {
        this.$errorMsg('不能选择不同单价的相同商品')
        flag = false
      }
      let checkList = []
      this.tableChoseList.forEach(item => {
        const target = this.tableData.list.find(subItem => item.id === subItem.id && item.price === subItem.price)
        if (target) {
          checkList.push(target)
        }
      })
      for (let i = 0; i < checkList.length; i++) {
        const { staySaleNum, num } = checkList[i]
        if (num === null || num === undefined) {
          this.$errorMsg(`选择的单据存在本次销售量为空`)
          flag = false
          break
        }
        if (num > staySaleNum) {
          this.$errorMsg(`选择的单据存在本次销售量大于待销量`)
          flag = false
          break
        }
      }
      if (!flag) return false
      // const itemList = checkList.map(item => ({
      //   id: item.id,
      //   goodsNo: item.goodsNo,
      //   price: item.price || '',
      //   brandName: item.brandName || '',
      //   num: item.num ? item.num + '' : '0'
      // }))
      console.log(checkList)
      this.$emit('comfirm', checkList)
    },
    selectionChange(rows) {
      this.tableChoseList = rows
      this.tableChoseList.forEach((item) => {
        const target = this.tableData.list.find(subItem => subItem.id === item.id && subItem.price === item.price)
        if (target) {
          target.num = item.staySaleNum || '0'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.edit-bx {
  .el-form-item {
    display: flex;
    flex-wrap: wrap;
  }
  .el-form-item__label {
    width: 130px;
    text-align: right;
  }
  .el-form-item__content {
    flex: 1;
    padding-right: 40px;
  }
}
</style>
