<template>
  <Layout>
    <Title title="出入库确认"></Title>
    （当实际库房中的商品数量比系统中的多时要进行库存报溢，向系统库存中添加商品使一致。）

    <div class="table-body">
      <el-table
        :data="draft_list"
        style="width: 100%;"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column fixed type="index" label="行号" min-width="12%">
        </el-table-column>
        <el-table-column prop="id" label="Id" min-width="13%">
        </el-table-column>
        <el-table-column label="销售单Id" min-width="13%">
          <template slot-scope="scope">
            <el-button type="text" @click="showSaleSheet(scope.row.purchaseSheetId)">{{ scope.row.purchaseSheetId }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" min-width="8%">
        </el-table-column>
        <el-table-column prop="batchId" label="批次" min-width="10%">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="20%">
        </el-table-column>
        <el-table-column prop="operator" label="操作人" min-width="12%">
        </el-table-column>
        <el-table-column label="操作" min-width="20%">
          <template slot-scope="scope">
            <el-button :plain="true" @click="open(scope.row)">确认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="确认出入库操作"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <div>
        <div>入库单草稿Id：{{cur_row.id}}</div>
        <div>销售单Id：{{cur_row.purchaseSheetId}}</div>
        <div>批次：{{cur_row.batchId}}</div>
        <div>创建时间：{{cur_row.createTime}}</div>
        <div>操作人：{{cur_row.operator}}</div>
      </div>

    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { getWarehouseInputSheet, getWarehouseOutputSheet, warehouseOutputSheetApprove } from "@/network/warehouse";
export default {
  components: {
    Layout,
    Title
  },
  created() {
    getWarehouseInputSheet({
      "state": "DRAFT",
    }).then(res => {
      console.log(res);
      this.draft_list = res.result.map(item => {
        item["type"] = "入库";
        return item;
      });
      this.cur_row = this.draft_list[0];

      getWarehouseOutputSheet({
        "state": "DRAFT",
      }).then(res => {
        console.log(res);
        this.draft_list = this.draft_list.concat(res.result.map(item => {
          item["type"] = "出库";
          return item;
        }));
      })
    }).catch(err => {
      console.log(err);
    });

  },
  data(){
    return {
      draft_list: [],
      dialogVisible: false,
      cur_row: {},
    }
  },
  methods: {
    showSaleSheet(sheetId){
      console.log(sheetId);
      this.dialogVisible = true;
    },
    open(row) {
      console.log(row);
      this.$confirm('请确认出入库操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功'
        });
        if (row.type === "出库") {
          warehouseOutputSheetApprove({ //userVO如何传递
            sheetId: row.batchId,
            state: "SUCCESS",
          }).then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
        }else {
          //TODO 接口暂无
          console.log("暂无接口");
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作成功'
        });
      });
    },
    handleClose(done) {
      done();
    }
  }
};
</script>

<style scoped>
.table-body {
  width: 95%;
  margin: 20px auto;
}
</style>
