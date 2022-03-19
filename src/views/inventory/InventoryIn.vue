<template>
  <Layout activePath="/inventoryOperation">
    <Title title="库存入库单"></Title>
    <!--    某一种商品的入库单： 1-->
    <!--    选择某一种商品(如果是新商品，应该新建商品)，选定之后，显示商品的详细信息，如库存、商品ID、名称等；-->
    <!--    2 新建入库单，进行入库信息设置<br />-->

    <!--    选择商品：-->
    <!--    <div class="searchBox_wrapper">-->
    <!--      <div class="search-box">-->
    <!--        <img class="button-left" src="@/assets/search.svg" alt="" />-->
    <!--        <input v-model="data.search_key" />-->
    <!--        <img class="button-right" src="@/assets/cancel.svg" alt="" />-->
    <!--      </div>-->
    <!--    </div>-->

    <div class="select-wrapper">
      <el-autocomplete
        class="myAutocomplete"
        v-model="selected_product"
        :fetch-suggestions="querySearch"
        placeholder="请选择商品"
        @select="handleSelect"
        :popper-append-to-body="false"
      >
        <i
          class="el-icon-edit el-input__icon"
          slot="suffix"
          @click="handleIconClick"
        >
        </i>
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
          <span class="id">id: {{ item.id }}</span>
        </template>
      </el-autocomplete>
    </div>

    <product-info-card
      v-if="cur_product"
      class="info-card"
      :product_info="cur_product"
      @handleSubmit="handleSubmit"
    ></product-info-card>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { findAllProduct } from "@/network/product";
import ProductInfoCard from "@/views/inventory/components/productInfoCard";
export default {
  name: "inventoryAdd",
  components: {
    ProductInfoCard,
    Layout,
    Title
  },
  data() {
    return {
      selected_product: "",
      cur_product: null,
      all_products: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      findAllProduct()
        .then(_res => {
          console.log("fetchProduct", _res);
          this.all_products = _res.result;
        })
        .catch(_err => {
          console.log(_err);
        });
    },
    querySearch(queryString, cb) {
      let products = this.all_products.map(item => {
        return {
          value: item.name,
          id: item.id
        };
      });
      console.log(products);
      let results = queryString
        ? products.filter(
            item =>
              item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
          )
        : products; //注意这里的item.value
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      console.log(item);
      console.log(this.selected_product);
      this.cur_product = this.all_products.find(i => i.name === item.value && i.id === item.id);
      console.log("cur_product", this.cur_product);
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    handleSubmit(submitInfo) {
      console.log(submitInfo);
      // warehouseInput(submitInfo)
      //   .then(_res => {
      //     console.log(_res);
      //   })
      //   .catch(_err => {
      //     console.log(_err);
      //   });
    }
  }
};
</script>

<style lang="scss" scoped>
.select-wrapper {
  width: 980px;
  margin: 70px auto 30px auto;

  .myAutocomplete {
    width: 350px;

    /deep/ li {
      padding: 10px 20px;
      line-height: 20px;

      .name {
        font-size: 14px;
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .id {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .id {
        color: #ddd;
      }
    }
  }

  .info-card {
    margin-top: 100px;
  }
}
</style>
