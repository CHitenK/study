<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      :showFooter="false"
      @comfirm="comfirm"
      :width="'1000px'"
      :title="'物流联系人'"
      :btnAlign="'center'"
      top="6vh"
      >
      <el-row class="company-page">
        <el-col :span="24">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="联系人" name="first">
              <!-- 表格 -->
              <JFX-table
                :tableData.sync="tableData"
                :tableHeight="'460px'"
                :showPagination="false"
              >
                <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
                <el-table-column label="联系人类型" align="center" width="140">
                  <template slot-scope="scope">{{filterVal(scope.row.type)}}</template>
                </el-table-column>
                <el-table-column prop="name" label="名称/公司" align="center" width="140"></el-table-column>
                <el-table-column label="详情" align="center">
                  <template slot-scope="scope">
                    <div v-text="scope.row.details" style="white-space: pre-line;"></div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="left" fixed="right" width="85">
                  <template slot-scope="scope">
                    <el-button type="text" @click="openEditContactMans(scope.row)">编辑</el-button>
                    <el-button type="text" @click="deleMans(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </JFX-table>
              <!-- 表格 end-->
            </el-tab-pane>
            <el-tab-pane label="常用模板" name="second">
              <!-- 表格 -->
              <JFX-table
                :tableData.sync="tableData1"
                :tableHeight="'460px'"
                :showPagination="false"
              >
                <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
                <el-table-column prop="name" label="模板名称" align="center" width="140"></el-table-column>
                <el-table-column prop="shipperTempName" label="发货人/提货信息" align="center" width="120"></el-table-column>
                <el-table-column prop="consigneeTempName" label="收获人/卸货信息" align="center" width="120"></el-table-column>
                <el-table-column prop="notifierTempName" label="通知人" align="center" ></el-table-column>
                <el-table-column prop="dockingTempName" label="对接人" align="center"></el-table-column>
                <el-table-column prop="carrierInformationTempName" label="承运商信息" align="center"></el-table-column>
                <el-table-column label="操作" align="left" fixed="right" width="85">
                  <template slot-scope="scope">
                    <el-button type="text" @click="openEditCommonTemplate(scope.row)">编辑</el-button>
                    <el-button type="text" @click="delTemplateLink(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </JFX-table>
              <!-- 表格 end-->
            </el-tab-pane>
          </el-tabs>
          <div class="flex-c-c mr-b-15">
            <el-button type="primary" :size="'small'" v-if="activeName === 'first'" @click="openEditContactMans({})">新增</el-button>
            <el-button type="primary" :size="'small'" v-if="activeName === 'second'" @click="openEditCommonTemplate({})">新增</el-button>
            <el-button @click="visible.show=false">关闭</el-button>
          </div>
        </el-col>
      </el-row>
    </JFX-Dialog>
    <contacts-edit v-if="contactsEditVisible.show" :visible="contactsEditVisible" @success="getList1" :options="options"></contacts-edit>
    <common-template-edit v-if="commonTemplateEditVisible.show" :visible="commonTemplateEditVisible" @success="getList2" :options="options"></common-template-edit>
  </div>
</template>
<script>
import { listTemplate, delTemplate, listTemplateLink, delTemplateLink } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    contactsEdit: () => import('./contactsManEdit'),
    commonTemplateEdit: () => import('./commonTemplateEdit')
  },
  props: {
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    filterData: {
      type: Object,
      default: function() {
        return {}
      }
    }
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
      flage: true,
      activeName: 'first',
      contactsEditVisible: { show: false },
      commonTemplateEditVisible: { show: false },
      typeList: [
        { label: '发货人/提货信息', value: '1' },
        { label: '收货人/卸货信息', value: '2' },
        { label: '通知人', value: '3' },
        { label: '对接人', value: '4' },
        { label: '承运商信息', value: '5' }
      ],
      options: {}
    }
  },
  mounted() {
    this.getList1()
    this.getList2()
  },
  methods: {
    async comfirm() {
    },
    async getList1() {
      try {
				this.tableData.loading = true
        this.tableData.pageSize = 1000
				const res = await listTemplate({ type: '' })
				this.tableData.list = res.data || []
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
    },
    async getList2() {
      try {
				this.tableData1.loading = true
        this.tableData1.pageSize = 1000
				const res = await listTemplateLink()
				this.tableData1.list = res.data || []
			} catch (err) {
        console.log(err)
			}
      this.tableData1.loading = false
    },
    filterVal(type) {
      const target = this.typeList.find(item => item.value === type) || {}
      return target.label || ''
    },
    deleMans(row) {
      this.$confirm('确认删除数据?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        await delTemplate({ id: row.id })
				this.$successMsg('删除成功')
        this.getList1()
			})
    },
    // 打开联系人编辑
    openEditContactMans(row) {
      this.options = row
      this.contactsEditVisible.show = true
    },
    openEditCommonTemplate(row) {
      this.options = row
      this.commonTemplateEditVisible.show = true
    },
    delTemplateLink(row) {
      this.$confirm('确认删除数据?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        await delTemplateLink({ id: row.id })
				this.$successMsg('删除成功')
        this.getList2()
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
