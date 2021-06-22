<template>
   <!--  录入发票时间 组件  -->
  <JFX-Dialog
		:visible.sync="visible"
    :showClose="false"
    @comfirm="comfirm"
    :width="'70vw'"
    :title="'新增/编辑邮件提醒'"
    :top="'8vh'"
    closeBtnText="取 消"
    :beforeClose="close"
    v-loading="loading"
		>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
      <el-row :gutter="10" class="page-view">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="配置ID：" prop="id">
            <el-input v-model="ruleForm.id" style="width: 100%;" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="公司：" prop="merchantId">
            <el-select v-model="ruleForm.merchantId" placeholder="请选择" :disabled="!!filterData.id" filterable clearable  :data-list="getSelectMerchantBean('companyList')"   @change="changeMerchantId" >
              <el-option v-for="item in selectOpt.companyList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="事业部：" prop="buId">
            <el-select v-model="ruleForm.buId" placeholder="请选择" clearable :disabled="!!filterData.id" >
              <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="业务模块：" prop="businessModuleType">
            <el-select v-model="ruleForm.businessModuleType" placeholder="请选择" clearable :disabled="!!filterData.id" :data-list="getBusinessModuleType('businessModuleTypeList')" @change="getReminderByInfo" >
              <el-option v-for="item in selectOpt.businessModuleTypeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="mr-t-10">
          <el-button type="primary" size="mini" @click="add" >新增</el-button>
          <el-button size="mini" @click="deleMore">删除</el-button>
        </el-col>
        <el-col :span="24" class="mr-t-10">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            :showFixedTop="false"
            :tableHeight="'480px'"
            :showPagination="false"
            @selection-change="selectionChange"
          >
            <el-table-column type="selection" label="序号" align="center" width="55" ></el-table-column>
            <el-table-column prop="goodsNo" align="center" min-width="120" >
              <template slot="header">
                <span class="need">操作节点</span>
              </template>
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="请选择" clearable >
                  <el-option v-for="item in reminderTypeValue"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="goodsNo" align="center" min-width="120" >
              <template slot="header">
                <span class="need">提醒对象类型</span>
              </template>
              <template slot-scope="scope">
                <el-select v-model="scope.row.reminderType" placeholder="请选择" clearable @change="changeReminderType(scope.$index)">
                  <el-option v-for="item in initData.billReminderTypeValue"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="goodsNo" align="center" min-width="170" >
              <template slot="header">
                <span class="need">提醒对象</span>
              </template>
              <template slot-scope="scope" >
                <div v-if="scope.row.reminderType === '1'">
                  <el-select v-model="scope.row.roleId" placeholder="请选择" clearable filterable >
                    <el-option v-for="item in roleList"  :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </div>
                <div v-if="scope.row.reminderType === '2'">
                  <el-select v-model="scope.row.billType" placeholder="单据对象" clearable filterable title="请选择单据对象">
                    <el-option v-for="item in reminderUserTypeValue"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                  </el-select>
                  <div class="mr-t-5"></div>
                  <el-select v-model="scope.row.userIdArr" placeholder="固定对象" clearable  multiple collapse-tags filterable title="请选择固定对象">
                    <el-option v-for="item in userList"  :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="goodsNo" align="center" min-width="120" >
              <template slot="header">
                <span class="need">提醒渠道</span>
              </template>
              <template slot-scope="scope">
                <el-select v-model="scope.row.reminderChannel" placeholder="请选择" clearable >
                  <el-option v-for="item in initData.reminderChannelValue"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="150">
              <template slot="header">
                <span>模板编码</span>
              </template>
              <template slot-scope="scope">
                <el-input v-model.trim="scope.row.templateCode" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 100%" placeholder="请输入模板编码"></el-input>
             </template>
            </el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
      </el-row>
    </el-form>
	</JFX-Dialog>
</template>
<script>
import { getReminderByInfo, getAddEditInfo, getRoleList, getUserList, saveReminderEmail, modifyReminderEmail } from '@a/emailManage/index'
import commomMix from '@m/index'
import { throttle } from '@u/tool'
export default {
  mixins: [commomMix],
  props: {
    visible: { show: false },
    filterData: {}
  },
  data() {
    return {
      // table 信息
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      ruleForm: {
        merchantId: '',
        buId: '',
        businessModuleType: '',
        id: ''
      },
      rules: {
        merchantId: { required: true, message: '公司不能为空', trigger: 'change' },
        buId: { required: true, message: '事业部不能为空', trigger: 'change' },
        businessModuleType: { required: true, message: '业务模块不能为空', trigger: 'change' }
      },
      loading: false,
      reminderTypeValue: [],
      initData: {},
      roleList: [],
      userList: [],
      reminderUserTypeValue: []
    }
  },
  mounted() {
    this.init()
    this.getReminderByInfo()
    this.getRoleList()
    this.getUserList()
  },
  methods: {
    comfirm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) return false
        if (this.tableData.list.length < 1) {
          this.$errorMsg('请添加提醒对象')
          return false
        }
        let flag = true
        const items = []
        for (let i = 0; i < this.tableData.list.length; i++) {
          let { type, reminderType, roleId, billType, userIdArr, userIdStr, reminderChannel, templateCode } = this.tableData.list[i]
          const tips = `表格第${i + 1}行,`
          if (!type) {
            this.$errorMsg(tips + '请选择操作节点')
            flag = false
            break
          }
          if (!reminderType) {
            this.$errorMsg(tips + '请选择提醒对象类型')
            flag = false
            break
          }
          if (reminderType === '1') { // 用户
            if (!roleId) {
              this.$errorMsg(tips + '请选择提醒对象')
              flag = false
              break
            }
            billType = ''
            userIdStr = ''
          }
          if (reminderType === '2') { // 角色
            if (!billType && (!userIdArr || userIdArr.length < 1)) {
              this.$errorMsg(tips + '请选择提醒对象或选择固定对象')
              flag = false
              break
            }
            roleId = ''
            userIdStr = userIdArr.map(item => item).toString()
          }
          if (!reminderChannel) {
            this.$errorMsg(tips + '请选择提醒对象类型')
            flag = false
            break
          }
          items.push({
            type,
            reminderType,
            roleId,
            billType,
            userIdStr,
            reminderChannel,
            templateCode
          })
        }
        if (!flag) return false
        const opt = {
          ...this.ruleForm,
          items
        }
        if (this.filterData.id) { // 编辑
          this.editSave(opt)
        } else {
          this.addSave(opt) // 新增
        }
      })
    },
    async getReminderByInfo(type, callback) {
      try {
        const res = await getReminderByInfo({ businessModuleType: this.ruleForm.businessModuleType || '' })
        const { reminderTypeValue, reminderUserTypeValue } = res.data
        this.reminderTypeValue = reminderTypeValue || []
        this.reminderUserTypeValue = reminderUserTypeValue || []
        this.tableData.list.forEach(item => {
          item.type = ''
        })
        if (callback) callback()
      } catch (error) {
        console.log(error)
      }
    },
    async init() {
      try {
        const res = await getAddEditInfo({ id: this.filterData.id || '' })
        this.initData = res.data || {}
        if (this.initData.configDTO) {
          for (let key in this.ruleForm) {
            this.ruleForm[key] = this.initData.configDTO[key] ? this.initData.configDTO[key] + '' : ''
          }
        }
        this.changeMerchantId('init')
        this.getReminderByInfo('init', () => {
          if (this.initData.items) {
            const list = []
            this.initData.items.map(item => {
              const { type, reminderType, reminderChannel, roleId, billType, templateCode, id, userIdStr } = item
              let userIdArr = userIdStr ? userIdStr.split(',') : []
              userIdArr = userIdArr.map(item => +item)
              list.push({
                type,
                reminderType,
                reminderChannel,
                roleId,
                billType,
                templateCode,
                id: id,
                userIdArr
              })
            })
            this.tableData.list = list || []
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    // 获取启用的状态角色接口
    async getRoleList() {
      const res = await getRoleList()
      this.roleList = res.data
    },
    async getUserList() {
      const res = await getUserList()
      this.userList = res.data
    },
    // 选择提醒对象类型
    changeReminderType(index) {
      this.tableData.list[index].roleId = ''
      this.tableData.list[index].billType = ''
      this.tableData.list[index].userIdArr = []
    },
    close() {
      this.$confirm('你将关闭该界面，数据不会被保存，是否继续关闭？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.visible.show = false
			})
    },
    // 新增
    add: throttle(function() {
      this.tableData.list.push({
        type: '',
        reminderType: '1',
        reminderChannel: '',
        roleId: '',
        billType: '',
        userIdArr: [],
        templateCode: '',
        id: Date.now() // 默认Id 用于删除
      })
    }, 800),
    // 删除
    deleMore() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      const list = []
      const goodsIds = this.tableChoseList.map(item => +item.id)
      this.tableData.list.forEach(item => {
        if (!goodsIds.includes(+item.id)) {
          list.push(item)
        }
      })
      this.tableData.list = list
    },
    // 新增保存
    async addSave(opt) {
      try {
        this.loading = true
        await saveReminderEmail(opt)
        this.$successMsg('保存成功')
        this.$emit('comfirm')
        this.visible.show = false
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    // 编辑保存
    async editSave(opt) {
      try {
        this.loading = true
        await modifyReminderEmail(opt)
        this.$successMsg('保存成功')
        this.$emit('comfirm')
        this.visible.show = false
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    changeMerchantId(type) {
      const { merchantId } = this.ruleForm
      if (merchantId) {
        delete this.selectOpt.buList
        this.getBUSelectBean('buList', { merchantId })
      }
      if (type !== 'init') {
        this.ruleForm.buId = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page-view{
  width: 100%;
  margin-bottom: 10px;
}
.flex-l-c{
  display: flex;
  align-items: center;
}
/deep/.page-view .el-form-item__label{
  width: 130px;
}
</style>
