<template>
  <Layout>
    <Title title="库存盘点"></Title>
    （盘点的是当天的库存快照，包括当天的各种商品的名称，型号，库存数量，库存均价，批次，批号，出厂日期，并且显示行号。要求可以导出Excel。
    <el-table class="snaptable_table" :data="snapshoot_data_list">
      <el-table-column
        v-for="(item, index) in snapshoot_prop_list"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>


  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import moment from "moment";

export default {
  components: {
    Layout,
    Title
  },
  data() {
    return {
      snapshoot_prop_list: [
        {
          prop: "name",
          label: "编号",
          width: "100"
        },
        {
          prop: "type",
          label: "型号",
          width: "200"
        },
        {
          prop: "quantity",
          label: "库存数量",
          width: "200"
        },
        {
          prop: "price",
          label: "库存均价",
          width: "200"
        },
        {
          prop: "batchId",
          label: "批次",
          width: "200"
        },
        {
          prop: "productionDate",
          label: "出场日期",
          width: "200"
        }
      ],
      snapshoot_data_list: [
        {
          name: "苹果",
          type: "红富士",
          quantity: 2000,
          price: 20,
          batchId: 1,
          productionDate: moment()
        },
        {
          name: "戴尔",
          type: "戴尔(DELL)Vostro笔记本电脑5410 金色 戴尔成就3500Vostro1625D",
          quantity: 250,
          price: 10000,
          batchId: 2,
          productionDate: moment()
        },
        {
          name: "iphone",
          type: "iphone14maxpro",
          quantity: 1000,
          price: 9799,
          batchId: 1,
          productionDate: moment()
        },
        {
          name: "MacBook",
          type: "MacBook M1",
          quantity: 100,
          price: 20000,
          batchId: 2,
          productionDate: moment()
        }
      ]
    };
  },

};
</script>

<style scoped></style>
