<template>
  <!-- 签收组件 -->
  <JFX-Dialog
    title="签收"
    closeBtnText="取 消"
    :width="'500px'"
    :top="'80px'"
    :showClose="true"
		:visible="signForOrderVisible"
    @comfirm="comfirm"
	>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="edit-bx">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="签收日期：" prop="receiveDate">
            <el-date-picker
              v-model="ruleForm.receiveDate"
              type="date"
              style="width: 203px"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="PO单号：" prop="poNoReceive">
            <el-input v-model.trim="ruleForm.poNoReceive" placeholder="多PO输入时以&字符隔开" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
	</JFX-Dialog>
</template>

<script>
import {
  checkExistByPo,
  receiveSaleOrder
} from '@a/salesManage/index'
export default {
  props: {
    signForOrderVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    id: {
      type: String,
      defalut: ''
    },
    poNo: {
      type: String,
      defalut: ''
    },
    businessModel: {
      type: String,
      defalut: ''
    }
  },
  data() {
    // 检验po号
    const validatePoNo = (rule, value, callback) => {
      const list = value.split('&')
      const map = new Map()
      let flag = true
      if (list && list.length) {
        for (let i = 0; i < list.length; i++) {
          if (map.has(list[i])) {
            flag = false
          } else {
            map.set(list[i], i)
          }
        }
      }
      if (value === '') {
        callback(new Error('请输入PO单号'))
      } else if (!flag) {
        callback(new Error('PO单号重复了'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        receiveDate: '',
        poNoReceive: ''
      },
      rules: {
        receiveDate: { required: true, message: '请选择签收日期', trigger: 'change' },
        poNoReceive: { required: true, validator: validatePoNo, trigger: 'blur' }
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const { poNo } = this
      this.ruleForm.poNoReceive = poNo
    },
    comfirm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          const { id, businessModel } = this
          const { receiveDate, poNoReceive } = this.ruleForm
          try {
            const { data } = await checkExistByPo({ orderId: id, poNo: poNoReceive })
            if ((businessModel === '1' || businessModel === '4') && data.length > 0) {
              this.$alertWarning(`PO号:${data[0]}已有存在销售订单信息`, async() => {
                await receiveSaleOrder({ id, receiveDate, manyPoNo: poNoReceive })
                this.$successMsg('签收成功')
                this.$emit('comfirm')
              })
            } else {
              await receiveSaleOrder({ id, receiveDate, manyPoNo: poNoReceive })
              this.$successMsg('签收成功')
              this.$emit('comfirm')
            }
          } catch (error) {
            return this.$errorMsg(error.message)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 /deep/.edit-bx .el-form-item__label {
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
</style>
