<template>
  <table class="table-container">
    <tbody>
      <tr>
        <td colspan="4">应收款项</td>
      </tr>
      <tr>
        <td colspan="2">项目</td>
        <td>金额</td>
        <td>币种</td>
      </tr>
      <tr>
        <td rowspan="3">快递服务费</td>
        <td>快递费</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>包装费</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>超件/重附加费</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td rowspan="2">其他费用</td>
        <td>取消订单服务费</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>快递理赔费</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>税费</td>
        <td>综合税金</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>堆存费</td>
        <td>堆存费</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td rowspan="2">入仓费用</td>
        <td>一线进口清关费</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>入库验收费</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td rowspan="3">出仓费用</td>
        <td>转关费</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>调拨费</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>退运费</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td colspan="2">未分配金额</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td colspan="2">合计总额：</td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-bottom: 40px;
  border: 1px solid #cbcbcb;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  color: #666;
  td {
    border-left: 1px solid #cbcbcb;
    border-bottom: 1px solid #cbcbcb;
    padding: 8px 0;
  }
}
</style>
