<template>
<div class="copy-box" v-loading="loading">
    <el-row>
      <el-col :span="24">
        <div class="title-box">跨渠道复制专题编码</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <div class="row-box">
           <div class="row-box-item">
               <span>输出渠道</span>
                 <el-select v-model="outProtocolType"  style="width: 220px;" filterable placeholder="请选择渠道" >
                  <el-option
                    v-for="item in getPfChannel"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
           </div>
           <div class="row-box-item">
              <span>专题ID</span>
              <el-input v-model="id" style="width: 220px;"  v-trim clearable placeholder="请输入专题ID" ></el-input>
           </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="row-box row-box">
            ===复 制==>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="row-box">
           <div class="row-box-item">
               <span>录入渠道</span>
                 <el-select v-model="inProtocolType"  style="width: 220px;" filterable placeholder="请选择渠道" >
                  <el-option
                    v-for="item in getPfChannel"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
           </div>
           <div class="row-box-item">
              <span>专题ID</span>
              <el-input v-model="copyId" style="width: 220px;" disabled placeholder="专题ID" ></el-input>
           </div>
        </div>
      </el-col>
    </el-row>
     <el-row>
      <el-col :span="24">
        <div class="title-box">      <el-button style="margin-left: 10px" type="primary" @click="save">确定</el-button></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getBlockById, insertBlock } from '@/api/pageManage/index'
import { transformTime } from '@/views/pageManage/utils/tool'
export default {
  data() {
    return {
      getPfChannel: [],
      outProtocolType: '',
      inProtocolType: '',
      id: '',
      copyId: '',
      loading: false
    }
  },
  created() {
    this.getChannel()
  },
  methods: {
    // 获取渠道
    getChannel() {
      const channelOptions = sessionStorage.getItem('channelOptions')
      this.getPfChannel = JSON.parse(channelOptions)
      //   { id: 36, name: '美赞臣' },
      //   { id: 12, name: '红人超市' },
      //   { id: 25, name: '长生态' },
      //   { id: 18, name: '阳光保险' }
      // ]
      // User.getPfChannel().then(res => {
      //   if (res.data.obj) {
      //     this.getPfChannel = res.data.obj
      //   }
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    // 保存
    save() {
      if (!this.outProtocolType) {
        this.$message.error('请选择输出渠道')
        return false
      }
      if (!this.inProtocolType) {
        this.$message.error('请选择录入渠道')
        return false
      }
      if (!this.id) {
        this.$message.error('请输入专题id')
        return false
      }
      this.loading = true
      this.id = this.id.replace(/^(\s|\xA0)+|(\s|\xA0)+$/gi, '')
      getBlockById(this.id).then(res => {
        if (!res.data) {
          this.$message.error('不存在此专题，请重新输入专题ID')
          return false
        }
        this.pushCopyData(res.data)
      }).catch(res => {
        this.$message.error('系统繁忙，稍后重试')
      }).finally(() => {
        this.loading = false
      })
    },
    // 保存复制的数据
    pushCopyData(dataJSON) {
      const data = dataJSON
      delete data.id // 删除id
      // 修改复制后的专题Id
      const specialId = 'ZT' + transformTime() + 'PF' + this.inProtocolType || '' // 设置专题Id
      const createName = sessionStorage.getItem('userName') || '' // 创建人
      data.specialId = specialId
      data.isCopy = true
      data.pfChannelId = this.inProtocolType
      data.status = '-2'
      data.createName = createName
      this.loading = true
      insertBlock(data).then(res => {
        this.$message.success('保存成功！')
        this.copyId = specialId
      }).catch(res => {
        this.$message.error(res.msg)
      }).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 1100)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.copy-box{
  padding: 15px;
  border: solid 1px #eaeaee;
  margin-top: 50px;
  font-size: 14px;
  color: #333;
  width:  800px;
}
.title-box{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
}
.row-box{
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.row-box-item{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  span{
    display: inline-block;
    text-align: right;
    width: 80px;
    margin-right: 10px;
  }
}
</style>
