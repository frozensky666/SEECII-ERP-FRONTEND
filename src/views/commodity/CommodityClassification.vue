<template>
  <Layout>
    <Title title="商品分类管理"></Title>
    （商品存在多种分类，商品分类的功能包括增加分类、删除分类、修改分类。增加一个分类时，系统应自动给该分类生成一个编号。分类下还可以有子分类，所以是一个树状结构，且只有叶节点的分类才能添加商品，一旦分类（或者子分类）下有商品就不能在该分类下再添加子分类。）
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
  };
</script>

<style scoped>
</style>
