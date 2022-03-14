<template>
  <Layout>
    <Title title="商品管理"></Title>
    (商品管理（每个商品都属于一个分类，点击某个叶节点分类后能显示该分类下的所有商品。商品的属性有：编号、名称、型号、库存数量、进价、零售价、最近进价、最近零售价。因为在实际中进价和售价一直都在变化，所以一开始规定一个进价和售价作为默认值，保存一个最近的进价和售价属性。商品的增删改查包括增加商品、删除商品、修改商品和查询商品。商品编号根据其所在的分类以及添加次序自动生成。商品的查询可以通过输入关键字、商品编号等进行模糊查找。）
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
