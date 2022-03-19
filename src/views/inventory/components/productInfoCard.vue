<template>
  <section class="product">
    <div class="product__photo">
      <div class="photo-container">
        <div class="photo-main">
          <img src="@/assets/pic/dell.png" alt="dell computer" />
        </div>
      </div>
    </div>
    <div class="product__info">
      <div class="title">
        <h1>{{ my_product_info.name }}</h1>
        <span>ID: {{ my_product_info.id }}</span>
      </div>
      <div class="type">
        <h3>类型</h3>
        <div>{{ my_product_info.type }}</div>
      </div>
      <div class="quantity">
        库存量 <span>{{ my_product_info.quantity }}</span>
      </div>

      <div class="description">
        <h3>价格详情</h3>
        <ul>
          <li>进价: {{ my_product_info.purchasePrice }}</li>
          <li>零售价: {{ my_product_info.retailPrice }}</li>
          <li>最近进价: {{ my_product_info.recentPp }}</li>
          <li>最近零售价: {{ my_product_info.recentRp }}</li>
        </ul>
      </div>
      <button class="create-btn" @click="createInventoryIn">新建入库单</button>
    </div>

    <el-dialog
      title="新建入库单"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="basic-info">
        <div class="title">
          <h1>{{ my_product_info.name }}</h1>
          <span>ID: {{ my_product_info.id }}</span>
        </div>
        <div class="type">
          <h3>类型</h3>
          <div>{{ my_product_info.type }}</div>
        </div>
        <div>
          入库数量
          <el-input v-model="inventory_in.quantity" />
        </div>
        <div>
          进价
          <el-input v-model="inventory_in.purchasePrice" />
        </div>
        <div>
          备注
          <el-input type="textarea" v-model="inventory_in.remark" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import moment from "moment";

export default {
  name: "productInfoCard",
  props: [
    "product_info",
  ],
  data() {
    return {
      // product_info2: {
      //   id: "0000000000400000",
      //   name: "戴尔电脑",
      //   categoryId: 4,
      //   type: "戴尔(DELL)Vostro笔记本电脑5410 金色 戴尔成就3500Vostro1625D",
      //   quantity: 3200,
      //   purchasePrice: 3000.0,
      //   retailPrice: 4056.0,
      //   recentPp: 3250.0,
      //   recentRp: null
      // },
      my_product_info: {},
      dialogVisible: false,
      inventory_in: {
        purchasePrice: 0,
        quantity: 0,
        remark: ""
      }
    };
  },
  mounted() {
  },
  computed: {
  },
  watch: {
    product_info() {
      this.my_product_info = this.product_info;
    },

  },
  methods: {
    createInventoryIn() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submit() {
      this.inventory_in["pid"] = this.product_info.id;
      this.inventory_in["productionDate"] = moment().format();
      this.$emit("handleSubmit", this.inventory_in);
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
/* ----- Variables ----- */
$color-primary: #4c4c4c;
$color-secondary: #a6a6a6;
$color-highlight: #a486c7;

/* ----- Global ----- */
* {
  box-sizing: border-box;
}

h3 {
  font-size: 0.7em;
  letter-spacing: 1.2px;
  color: $color-secondary;
}

img {
  max-width: 100%;
  filter: drop-shadow(1px 1px 3px $color-secondary);
}

/* ----- Product Section ----- */
.product {
  display: grid;
  grid-template-columns: 0.9fr 1fr;
  margin: 50px auto;
  padding: 2.5em 0;
  width: 800px;
  background-color: white;
  border-radius: 5px;

  /* ----- Photo Section ----- */
  .product__photo {
    position: relative;

    .photo-container {
      position: absolute;
      left: -2.5em;
      display: grid;
      grid-template-rows: 1fr;
      width: 100%;
      height: 100%;
      border-radius: 6px;
      box-shadow: 4px 4px 25px -2px rgba(0, 0, 0, 0.3);

      .photo-main {
        border-radius: 6px;
        background: radial-gradient(white, #9fa8da);

        img {
          position: absolute;
          left: -3.5em;
          top: 4.5em;
          max-width: 110%;
          filter: saturate(150%) contrast(120%) hue-rotate(10deg)
            drop-shadow(1px 20px 10px rgba(0, 0, 0, 0.3));
        }
      }
    }
  }

  /* ----- Informations Section ----- */
  .product__info {
    padding: 0.8em 0;

    .title {
      h1 {
        margin-bottom: 0.1em;
        color: $color-primary;
        font-size: 1.5em;
        font-weight: 900;
      }

      span {
        font-size: 0.7em;
        color: $color-secondary;
      }
    }

    .type {
      font-size: 14px;
      letter-spacing: 0.01em;
    }

    .quantity {
      margin: 1.5em 0;
      color: $color-highlight;
      font-size: 1.2em;

      span {
        padding-left: 0.15em;
        font-size: 2.9em;
      }
    }

    .description {
      clear: left;
      margin: 2em 0;

      h3 {
        margin-bottom: 1em;
      }

      ul {
        font-size: 0.8em;
        list-style: disc;
        margin-left: 1em;
      }

      li {
        text-indent: -0.6em;
        margin-bottom: 0.5em;
      }
    }

    .create-btn {
      padding: 1.5em 3.1em;
      border: none;
      border-radius: 7px;
      font-size: 0.8em;
      font-weight: 700;
      letter-spacing: 1.5px;
      color: #fff;
      background-color: $color-highlight;
      box-shadow: 2px 2px 25px -7px $color-primary;
      cursor: pointer;
      margin-left: 50px;

      &:active {
        transform: scale(0.97);
      }
    }
  }
}
</style>
