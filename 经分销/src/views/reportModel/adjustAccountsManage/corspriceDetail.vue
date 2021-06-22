<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="事业部" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-14 clr-II">
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        公司：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部：{{detail.buName || '- -'}}
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="商品详情" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-14 clr-II">
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        商品名称：{{detail.goodsName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        条形码：{{detail.barcode || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        品牌：{{detail.brandName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        规格型号：{{detail.goodsSpec || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        品类：{{detail.productTypeName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
       原产国：{{detail.countyName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        计量单位：{{detail.unitName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        是否组合：{{['否', '是'][detail.isGroup] || '- -'}}
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="组合品详情" v-if="detail.isGroup === '1'" className="mr-t-20" />
    <JFX-table
      :tableData.sync="tableData1"
      :showPagination="false"
      v-if="detail.isGroup === '1'"
    >
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column prop="barcode" label="商品条码" align="center" width="200" ></el-table-column>
      <el-table-column prop="goodsNo" label="商品货号" align="center" width="200"></el-table-column>
      <el-table-column prop="name" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsCode" label="商品编码" align="center" width="200"></el-table-column>
      <el-table-column prop="groupNum" label="单品数量" align="center" width="180"></el-table-column>
      <el-table-column prop="groupPrice" label="商品价格" align="center" width="160"></el-table-column>
    </JFX-table>
    <!-- title end -->
    <!-- title -->
    <JFX-title title="标准成本单价记录" className="mr-t-20" />
    <JFX-table
      :tableData.sync="tableData1"
      :showPagination="false"
    >
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column prop="effectiveDate" label="生效年月" align="center"></el-table-column>
      <el-table-column prop="price" label="标准成本单价" align="center"></el-table-column>
      <el-table-column prop="currency" label="结算币种" align="center"></el-table-column>
      <el-table-column prop="createDate" label="创建日期" align="center"></el-table-column>
      <el-table-column prop="modifyDate" label="修改日期" align="center"></el-table-column>
    </JFX-table>
    <!-- title end -->
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
  </div>
</template>
<script>
import { getList } from '@a/base/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      tableData1: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      detail: {}
    }
  },
  methods: {
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
