<template>
  <Layout>
    <Title title="库存盘点"></Title>
    （盘点的是当天的库存快照，包括当天的各种商品的名称，型号，库存数量，库存均价，批次，批号，出厂日期，并且显示行号。要求可以导出Excel。
    <el-button @click="exportAsExcel">导出Excel</el-button>
    <div class="table-body">
      <el-table
        :data="display_list"
        style="width: 100%;"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column fixed type="index" label="行号" min-width="12%">
        </el-table-column>
        <el-table-column prop="salePrice" label="售价" min-width="12%">
        </el-table-column>
        <el-table-column prop="quantity" label="数量" min-width="12%">
        </el-table-column>
        <el-table-column prop="batchId" label="批次" min-width="12%">
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="22%">
        </el-table-column>
        <el-table-column prop="operator" label="操作人" min-width="12%">
        </el-table-column>
        <el-table-column prop="saleSheetId" label="售货单Id" min-width="12%">
        </el-table-column>
      </el-table>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";

export default {
  components: {
    Layout,
    Title
  },
  data(){
    return {
      display_list: [
        {
          pid: 1,
          salePrice: 20,
          quantity: 200,
          batchId: 12,
          remark: "japde",
          operator: "小苏",
          saleSheetId: 12,
        },
        {
          pid: 1,
          salePrice: 20,
          quantity: 200,
          batchId: 12,
          remark: "japde",
          operator: "小苏",
          saleSheetId: 12,
        },
        {
          pid: 1,
          salePrice: 20,
          quantity: 200,
          batchId: 12,
          remark: "japde",
          operator: "小苏",
          saleSheetId: 12,
        }
      ]
    }
  },
  mounted() {
    //TODO 接口暂无
  },
  methods: {
    exportAsExcel() { //导出Excel
      alert("导出成Excel");
    }
  }
};
</script>

<style scoped>

.table-body {
  width: 80%;
  margin: 20px auto;
}
</style>
