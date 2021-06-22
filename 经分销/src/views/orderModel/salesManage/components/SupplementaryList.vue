<template>
  <!-- 事业部补录列表 -->
  <div>
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)" style="margin-top: 0px">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="出仓仓库：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.depotId"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectBeanByMerchantRel('warehouseList')">
                <el-option
                  v-for="item in selectOpt.warehouseList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台名称：" prop="storePlatformName" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.storePlatformName"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('storePlatformList')"
              >
                <el-option
                  v-for="item in selectOpt.storePlatformList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="店铺名称：" prop="shopCode" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.shopCode"
                placeholder="请选择"
                clearable
                filterable
              >
                <el-option
                  v-for="item in shopInfoList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.goodsNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品条码：" prop="barcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.barcode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="外部交易单号：" prop="externalCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.externalCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary"
                   v-permission="'order_businessUnitRecord_update'"
                   @click="showModal">批量更新</el-button>
        <el-button type="primary"
                   v-permission="'order_businessUnitRecord_update'"
                   @click="exportList">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               @selection-change="selectionChange"
               @change="getList">
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="externalCode"
                       align="center"
                       min-width="120"
                       label="外部订单号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="storePlatformNameLabel"
                       min-width="100"
                       align="center"
                       label="平台"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="shopName"
                       align="center"
                       min-width="120"
                       label="店铺名称"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="depotName"
                       align="center"
                       min-width="120"
                       label="出仓仓库"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsNo"
                       align="center"
                       min-width="120"
                       label="商品货号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="barcode"
                       align="center"
                       min-width="120"
                       label="商品条码"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsName"
                       align="center"
                       label="商品名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="deliverDate"
                       align="center"
                       width="150"
                       label="发货时间"
      ></el-table-column>
    </JFX-table>
    <JFX-Dialog title="批量更新"
                closeBtnText="取 消"
                :width="'500px'"
                :top="'80px'"
                :showClose="true"
                :visible="visible"
                @comfirm="handleUpdate"
                :showFooter="true">
      <div style="padding-left: 20px;">
        <span class="need">事业部：</span>
        <el-select v-model="buId"
                   placeholder="请选择"
                   clearable
                   filterable
                   :data-list="getBUSelectBean('businessList')">
          <el-option
            v-for="item in selectOpt.businessList"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
        <div class="mr-t-10 mr-b-20">请确认是否对当前所选单据填入事业部信息！</div>
      </div>
    </JFX-Dialog>
    <!-- 表格 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  getShopInfoList,
  listBusinessUnitRecord,
  updateBusinessUnitRecord,
  businessUnitRecordExportUrl
} from '@a/salesManage'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        depotId: '',
        storePlatformName: '',
        shopCode: '',
        goodsNo: '',
        barcode: '',
        externalCode: ''
      },
      // 店铺信息列表
      shopInfoList: [],
      // 批量更新的事业部id
      buId: ''
    }
  },
  activated() {
    this.getList()
    this.getShopInfoList()
  },
  mounted() {
    this.getList()
    this.getShopInfoList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listBusinessUnitRecord({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (err) {}
      this.tableData.loading = false
    },
    // 获取店铺列表
    async getShopInfoList() {
      try {
        const { data = [] } = await getShopInfoList()
        const tempList = data.map(item => ({ key: item.shopCode, value: item.shopName }))
        await this.$nextTick()
        this.shopInfoList = tempList
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 批量更新
    async handleUpdate() {
      const { buId } = this
      if (!buId) {
        return this.$errorMsg('事业部不能为空')
      }
      const info = this.tableChoseList.map(item => `${item.externalCode}:${item.goodsId}`).toString()
      const target = this.selectOpt.businessList.find(item => item.key === this.buId)
      const buName = target ? target.value : ''
      try {
        await updateBusinessUnitRecord({ buId, info, buName })
        this.visible.show = false
        this.$successMsg('操作成功')
        this.getList()
      } catch (error) {
        this.$message.closeAll()
        const msgData = []
        const errList = error.message.split('\n')
        errList.forEach(item => {
          msgData.push(this.$createElement('p', null, item))
        })
        this.$message.error({
          message: this.$createElement('div', { 'class': {'clr-r': true} }, msgData)
        })
      }
    },
    // 显示弹窗
    showModal() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.visible.show = true
    },
    // 导出
    exportList() {
      if (this.tableData.total < 1) {
        return this.$errorMsg('暂无数据可导出')
      }
      try {
        if (this.tableChoseList.length) {
          this.$showToast('确定导出勾选数据？', async() => {
            const ids = this.tableChoseList.map(item => item.id).toString()
            this.$exportFile(businessUnitRecordExportUrl, { ids })
          })
        } else {
          this.$exportFile(businessUnitRecordExportUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
