<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="选择事业部" className="mr-t-10" />
    <!-- title end -->
    <el-form class="mr-t-20" :model="ruleForm" ref="ruleForm" :rules="rules" >
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="" prop="buId" >
            <el-select v-model="ruleForm.buId" placeholder="请选择" :filterable="selectOpt.bulist && selectOpt.bulist.length > 5" clearable :data-list="getBUSelectBean('bulist')">
              <el-option v-for="item in selectOpt.bulist"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- title -->
      <JFX-title title="商品信息" className="mr-t-20" />
      <!-- 操作 -->
      <el-row class="mr-t-20" v-if="type === 'add'">
        <el-col :span="24" >
          <el-button type="primary" :size="'small'" @click="openChoseProduct">选择商品</el-button>
          <el-button type="primary" :size="'small'" @click="$successMsg('成功导出')">删除</el-button>
        </el-col>
      </el-row>
      <!-- 操作 end -->
      <div class="mr-t-15"></div>
      <JFX-table
        :tableData.sync="tableData1"
        :showPagination="false"
      >
        <el-table-column type="selection" label="序号" align="center" width="50"></el-table-column>
        <el-table-column prop="barcode" label="条形码" align="center" width="180" ></el-table-column>
        <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip ></el-table-column>
        <el-table-column prop="brandName" label="品牌" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodsSpec" label="规格" align="center" width="140"></el-table-column>
        <el-table-column prop="currency" label="结算币种" align="center" width="160">
          <template slot="header">
            <span class="need">结算币种</span>
          </template>
          <template slot-scope="scope">
            <el-select v-model="ruleForm.buId" placeholder="请选择" :filterable="selectOpt.buList && selectOpt.buList.length > 5" clearable :data-list="getBUSelectBean('buList')">
              <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="标准成本单价" align="center" width="160">
          <template slot="header">
            <span class="need">标准成本单价</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="tableData.list[scope.$index].price" style="width: 100%"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="effectiveDate" label="生效年月" align="center" width="160">
          <template slot="header">
            <span class="need">生效年月</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker
              clearable
              v-model="tableData.list[scope.$index].date"
              type="month"
              value-format="yyyy-MM"
              placeholder="生效年月"
              style="width: 100%">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="isGroup" label="是否组合" align="center" width="100"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="linkTo('/transfer/deliveryDetail?id=' + scope.row.id )">详情</el-button>
          </template>
        </el-table-column>
      </JFX-table>
      <el-row  :gutter="10" class="fs-14 clr-II mr-t-15" v-if="type === 'edit'">
        <el-col :span="24">
          <el-form-item label="调价原因：" prop="adjustPriceResult" >
            <el-input type="textarea" v-model="ruleForm.adjustPriceResult" :rows="6" placeholder="请输入内容" style="width: 480px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- title -->
      <JFX-title title="修改历史记录" className="mr-t-20" />
      <JFX-table
        :tableData.sync="tableData"
        @change="getList"
      >
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column prop="effectiveDate" label="生效年月" align="center" width="160"></el-table-column>
        <el-table-column prop="price" label="标准成本单价" align="center" width="160"></el-table-column>
        <el-table-column prop="currency" label="结算币种" align="center" width="120"></el-table-column>
        <el-table-column prop="createDate" label="修改时间" align="center" width="160"></el-table-column>
        <el-table-column prop="modifyDate" label="修改人员" align="center" width="160"></el-table-column>
        <el-table-column prop="modifyDate" label="调价原因" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modifyDate" label="审核时间" align="center" width="180"></el-table-column>
        <el-table-column prop="modifyDate" label="审核人员" align="center" width="120"></el-table-column>
        <el-table-column prop="modifyDate" label="修改人员" align="center" width="140"></el-table-column>
        <el-table-column prop="modifyDate" label="状态" align="center" width="120"></el-table-column>
      </JFX-table>
    <!-- title end -->
    </el-form>
    <!-- 选择商品 -->
    <chose-products v-if="visible.show" :visible.sync="visible" @comfirm="comfirm" :filterData="filterData"></chose-products>
    <!-- 选择商品 -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { getList } from '@a/base/index'
export default {
  mixins: [commomMix],
  components: {
    choseProducts: () => import('@c/choseProducts/index')
  },
  data() {
    return {
      tableData1: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      detail: {},
      ruleForm: {
        buId: '',
        adjustPriceResult: ''
      },
      rules: {
        adjustPriceResult: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      visible: { show: false },
      filterData: {},
      type: 'add', // add 新增 type 编辑
      id: ''
    }
  },
  mounted() {
    const { query, params } = this.$route
    this.type = params.type
    this.id = query.id
  },
  methods: {
    comfirm(list) {},
    openChoseProduct() {
      this.visible.show = true
    },
    async getList(pageNum) {
      try {
        this.tableData.loading = true
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await getList(opt)
				this.tableData = {
					list: res.data.list,
					loading: false,
					pageNum: pageNum || res.data.pageNo,
					total: res.data.total,
					pageSize: res.data.pageSize
				}
			} catch (err) {
        this.tableData.loading = false
			}
		}
  }
}
</script>
