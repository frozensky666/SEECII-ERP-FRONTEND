<template>
  <Layout>
    <Title title="库存盘点"></Title>
    （盘点的是当天的库存快照，包括当天的各种商品的名称，型号，库存数量，库存均价，批次，批号，出厂日期，并且显示行号。要求可以导出Excel。
    <el-button @click="toLoss">库存报损</el-button>
    <el-button @click="toOverflow">库存报溢</el-button>
    <el-button @click="toPresent">库存赠送</el-button>
    <el-button @click="toWarning">库存报警</el-button>
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
    methods: {
      toLoss() {
        this.$router.push({name: "InventoryLoss", params: { payload: {} }});
      },
      toOverflow() {
        this.$router.push({name: "InventoryOverflow", params: { payload: {} }});
      },
      toPresent() {
        this.$router.push({name: "InventoryPresent", params: { payload: {} }});
      },
      toWarning() {
        this.$router.push({name: "InventoryWarning", params: { payload: {} }});
      },
    }
  };
</script>

<style scoped>
</style>
