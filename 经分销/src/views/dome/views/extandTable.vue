<template>
  <div class="page-bx bgc-w">
    <el-table
      :data="list"
      :span-method="arraySpanMethod"
      border
      :row-class-name="rowClass"
      style="width: 100%">
      <el-table-column type="selection" width="55">
        <template slot-scope="scope" v-if="scope.$index % 2 === 1">
          <div class="selection-bx"></div>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="amount1" label="数值 1"></el-table-column>
      <el-table-column prop="amount2" label="数值 4"></el-table-column>
      <el-table-column prop="amount3" label="数值 2"></el-table-column>
      <el-table-column prop="amount3" label="数值 3"></el-table-column>
      <el-table-column label="操作" >
         <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/transfer/orderEdit/' + scope.row.id )">详情</el-button>
          <el-button type="text" @click="handleOpen(scope.$index)">展开</el-button>
         </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
       list: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        },
        // { show: true },
        {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        },
        // { show: false },
        {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        },
        // { show: false },
        {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        },
        // { show: false },
        {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }
        // { show: false }
      ]
    }
  },
  mounted() {
    const newArr = []
    this.list.forEach((item) => {
      newArr.push(item)
      newArr.push({ show: false })
    })
    this.list = newArr
    console.log(this.list)
  },
  methods: {
    // 处理合并行列
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(rowIndex, columnIndex)
      if (rowIndex % 2) { // 双行
        if (columnIndex === 0) { // 第一列
          return {
            rowspan: 1,
            colspan: 7 // 合并列数
          }
        }
      }
    },
    rowClass(data) {
      return data.row.show !== undefined && !data.row.show ? 'list-item' : ''
    },
    handleOpen(index) {
      this.list[index + 1].show = !this.list[index + 1].show
    }
  }
}
</script>
<style>
/* .list-item{
  display: none !important;
} */
</style>
<style lang="scss" scoped>
.selection-bx{
  width: 100%;
  height: 60px;
  border: solid 1px red;
}
</style>
