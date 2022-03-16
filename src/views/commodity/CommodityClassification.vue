<template>
  <Layout>
    <Title title="商品分类管理"></Title>
    <div class="classification-body">
      <div class="button-container">
        <el-button type="primary" @click="add()" class="button">新增一级商品分类</el-button>
      </div>
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :highlight-current="true">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="append(node, data)">
              +
            </el-button>
            <el-button
              type="text"
              size="mini"
              v-if="node.isLeaf"
              @click="remove(node, data)">
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
  import { getAllCommodityClassification } from "../../network/commodity";
  export default {
    components: {
        Layout,
        Title
    },
    data() {
      const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      return {
        data: JSON.parse(JSON.stringify(data)),
        classificationList: []
      }
    },
    mounted() {
      getAllCommodityClassification({}).then(_res => {
        this.classificationList = _res.result;
      }).catch(err => {
        alert("获取商品分类列表失败", err);
      })
    },
    methods: {
      add() {
        this.data.push({label: '一级 4', children: []})
      },
      append(node, data) {
        console.log(node);
        console.log(data.id);
        const newChild = { id: 100, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
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
