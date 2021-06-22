<template>
  <JFX-table v-bind="$attrs"
             v-on="$listeners">
    <el-table-column v-if="showSelection"
                     type="selection"
                     align="center"
                     width="55"
    ></el-table-column>
    <el-table-column v-if="showIndex"
                     type="index"
                     align="center"
                     label="序号"
                     width="55"
    ></el-table-column>
    <template v-for="(item, index) in tableColumn">
      <el-table-column v-if="!item.slotTo"
                       v-bind="item"
                       :key="index"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column v-else
                       v-bind="item"
                       :key="index"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <slot :name="item.slotTo" v-bind="scope"></slot>
        </template>
      </el-table-column>
    </template>
  </JFX-table>
</template>

<script>
export default {
  props: {
    // 显示序号
    showIndex: {
      type: Boolean,
      default: false
    },
    // 显示复选框
    showSelection: {
      type: Boolean,
      default: false
    },
    // 表格列
    tableColumn: {
      type: Array,
      default: null
    }
  }
}
</script>
