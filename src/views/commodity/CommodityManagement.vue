<template>
  <Layout>
    <Title title="商品管理"></Title>
    <div class="commodity-body">
      <el-table
        :data="commodityList.filter(data => !search || data.name.includes(search) || data.id.includes(search))"
        style="width: 100%;"
        :header-cell-style="{'text-align': 'center'}"
        :cell-style="{'text-align': 'center'}">
        <el-table-column
          fixed
          prop="id"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="type"
          label="型号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="库存数量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="purchase_price"
          label="进价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="retail_price"
          label="零售价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="recent_pp"
          label="最近进价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="recent_rp"
          label="最近零售价"
          width="100">
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </Layout>
</template>

<script>
  import Layout from "@/components/content/Layout";
  import Title from "@/components/content/Title";
  import { getAllCommodity } from "../../network/commodity";
  export default {
    components: {
      Layout,
      Title
    },
    data() {
      return {
        commodityList: [],
        search: ''
      }
    },
    mounted() {
      getAllCommodity({}).then(_res => {
        this.commodityList = _res.data.commodity_list;
      }).catch(err => {
        console.log("获取商品列表失败!", err);
      })
    }
  };
</script>

<style scoped>
.commodity-body {
  width: 80%;
  margin: 0 auto;
}
</style>
