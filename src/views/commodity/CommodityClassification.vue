<template>
  <Layout>
    <Title title="商品分类管理"></Title>
    <div class="classification-body">
      <div class="button-container">
        <el-button type="primary" @click="add()" class="button">新增一级商品分类</el-button>
      </div>
      <el-tree
        :data="classificationList"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :highlight-current="true">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data.name }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="append(data)">
              +
            </el-button>
            <el-button
              type="text"
              size="mini"
              v-if="node.isLeaf"
              @click="remove(data)">
              -
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </Layout>
</template>

<script>
  import Layout from "@/components/content/Layout";
  import Title from "@/components/content/Title";
  import { getAllCommodityClassification,
           deleteCommodityClassification } from "../../network/commodity";
  export default {
    components: {
        Layout,
        Title
    },
    data() {
      return {
        classificationList: []
      }
    },
    mounted() {
      getAllCommodityClassification({}).then(_res => {
        this.classificationList = _res.result;
        this.classificationList = JSON.parse(JSON.stringify(this.arrayToTree(this.classificationList, 0)));
        console.log(this.classificationList);
      }).catch(err => {
        alert("获取商品分类列表失败", err);
      })
    },
    methods: {
      // 将数组转为tree
      arrayToTree(list, rootValue) {
        var arr = []
        list && list.forEach(item => {
          if (item.parentId === rootValue) {
            arr.push(item);
            const child = this.arrayToTree(list, item.id);
            if (child.length) {
              item.children = child;
            }
          }
        })
        return arr;
      },
      add() {
        
      },
      append(data) {
        console.log(data.id);
      },
      remove(data) {
        console.log(data.id);
        let params = {
          id: data.id
        }
        console.log(params);
        deleteCommodityClassification(params).then(_res => {
          console.log(_res);
        })
        // this.$confirm('是否删除该商品分类？', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   deleteCommodityClassification({
        //     id: data.id
        //   }).then(() => {
        //     this.$message({
        //       type: 'success',
        //       message: '删除成功!'
        //     });
        //   })
        // });
      },
    }
  };
</script>

<style>
.classification-body {
  width: 80%;
  margin: 0 auto;
}
.button-container {
  margin-bottom: 10px;
}
.button {
  border-radius: 6px;
}
.el-tree {
  background-color: transparent;
}
.el-tree-node__content:hover {
  background-color: #eff7ff;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding-right: 8px;
}
</style>
