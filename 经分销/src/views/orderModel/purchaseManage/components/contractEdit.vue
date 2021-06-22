<template>
  <div class="contract-bx">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
      <div class="mr-t-10 flex-c-c fs-18 clr-I">合同</div>
      <div class="contract-I mr-t-10">
        <div>
          <div style="margin-top: 5px;">
            <el-form-item label="合同编号：" prop="contractNo" >
              <el-input v-model="ruleForm.contractNo" clearable style="width: 260px" :readonly="type==='detail'"></el-input>
            </el-form-item>
          </div>
          <div style="margin-top: 5px;">
            <el-form-item label="签订日期：" prop="signingDateStr" >
              <el-date-picker
                v-model="ruleForm.signingDateStr"
                type="date"
                style="width: 260px"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :readonly="type==='detail'"
              >
              </el-date-picker>
            </el-form-item>
          </div>
          <div style="margin-top: 5px;">
            <el-form-item label="签订地点：" prop="signingAddr" >
              <el-input v-model="ruleForm.signingAddr" clearable style="width: 260px" :readonly="type==='detail'"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <div>
        <el-form-item label="甲方：" prop="firstParty" >
          <el-input v-model="detail.firstParty" clearable style="width: 700px" :readonly="type==='detail'"></el-input>
        </el-form-item>
      </div>
      <div style="margin-top: 5px;">
        <el-form-item label="甲方地址：" prop="firstPartyAddr" >
          <el-input v-model="detail.firstPartyAddr" clearable style="width: 700px" :readonly="type==='detail'"></el-input>
        </el-form-item>
      </div>
      <div style="margin-top: 5px;">
        <el-form-item label="乙方：" prop="secondParty" >
          <el-input v-model="detail.secondParty" clearable style="width: 700px" :readonly="type==='detail'"></el-input>
        </el-form-item>
      </div>
      <div class="fs-14 clr-II mr-t-20">一、商品资料明细</div>
      <div class="mr-t-20"></div>
      <!-- 表格 -->
      <JFX-table
        :tableData.sync="tableData"
        :showPagination="false"
      >
        <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodsNo" label="货号" align="center" width="180" ></el-table-column>
        <el-table-column prop="num" label="数量" align="center" width="180"></el-table-column>
        <el-table-column prop="price" label="单价(RMB)" align="center" width="180" ></el-table-column>
        <el-table-column prop="amount" label="总价(RMB)" align="center" width="180" ></el-table-column>
        <el-table-column prop="countryName" label="原产地" align="center" show-overflow-tooltip></el-table-column>
      </JFX-table>
      <!-- 表格 end-->
      <div class="fs-14 clr-II mr-t-10">商品原产地：{{detail.countryOrigin}}</div>
      <div class="fs-14 clr-II mr-t-10">特殊操作要求：{{detail.requirement}}</div>
      <div class="fs-14 clr-II mr-t-20">二、其他</div>
      <div class="fs-14 clr-II mr-t-10">
        <p class="mr-t-5">1.本协议一式贰份，甲、乙双方各持一份，具有同等法律效力。</p>
        <p class="mr-t-5">2.本协议经甲、乙双方签章后生效，通过传真件或扫描件方式签订同样具备法律效力。</p>
        <p class="mr-t-5">3.本协议作为《委托服务协议》不可分割的组成部分，未尽之处，适用《委托服务协议》的约定。</p>
      </div>
      <div class="mr-t-10 flex-c-c fs-14 clr-II">(以下无正文)</div>
      <div class="fs-14 clr-II mr-t-30 flex-c-c">
        <div class="jia-tam">
          甲方（签章）
        </div>
         <div>
          乙方（签章）
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    detail: {
      type: Object,
      default: function() {
        return {}
      }
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ruleForm: {
        contractNo: '',
        signingDateStr: '',
        signingAddr: '',
        firstParty: '',
        firstPartyAddr: '',
        secondParty: ''
      },
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      rules: {}
    }
  },
  watch: {
    detail() {
      this.tableData.list = this.detail.itemList || []
    }
  }
}
</script>
<style >
  .contract-bx .el-form-item__label{
    width: 100px;
    border: 0;
  }
  .contract-bx .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #E4E7ED;
    color: #C0C4CC;
    cursor: not-allowed;
 }
</style>
<style lang="scss" scoped>
.contract-I{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.jia-tam{
  margin-right: 400px;
}
</style>
