<template>
  <!-- 库存查询 -->
  <div>
    <el-card>
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="商品编码">
          <el-input
            v-model="formData.goodsNumber"
            placeholder="请输入商品编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input
            v-model="formData.goodsName"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在仓库">
          <el-select v-model="formData.warehouseName" placeholder="请选择仓库">
            <el-option
              v-for="item in warehouseData"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getInventoryData">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" @click="goodsDistribution"
        >商品库位分布</el-button
      >
      <el-button type="primary" @click="download">导出</el-button>
      <el-divider></el-divider>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="商品编码" width="120" prop="goodsNumber">
        </el-table-column>
        <el-table-column label="商品图片" width="120">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.image"
              :preview-src-list="[scope.row.image]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="number"
          label="商品可用库存"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="warehouseUsefulUnit"
          label="单位"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="warehouseName"
          label="仓库名称"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="pageTotal"
      >
      </el-pagination>
    </el-card>

    <!-- 查看商品库位分布 -->
    <el-dialog
      title="查看商品库位分布"
      :visible.sync="goodsDistributionDialog"
      width="45%"
    >
      <!-- <el-container>
        <el-aside>
          <label for="">选择仓库</label>
          <el-select
            v-model="selectWarehouseId"
            placeholder="请选择仓库"
            class="area-ipt"
            style="width: 100%"
          >
            <el-option
              v-for="item in warehouseData"
              :key="item.id"
              :label="item.warehouseName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-aside> -->
      <el-main>
        <el-table
          ref="multipleTable"
          :data="goodsDistributionData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            label="库位编码"
            width="120"
            prop="warehouseLocation"
          >
          </el-table-column>
          <el-table-column prop="warehouseZone" label="库区" width="120">
          </el-table-column>
          <el-table-column prop="stock" label="容量" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="warehouseUsefulUnit"
            label="单位"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </el-main>
      <!-- </el-container> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="goodsDistributionDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CsvExportor from "csv-exportor"; //npm i csv-exportor --save
export default {
  data() {
    return {
      pageSize: 10, // 每页显示条数
      currentPage: 1, // 当前页
      pageTotal: null, // 总数据条数
      warehouseData: [], // 仓库数据
      tableData: [], // 表格数据
      goodsDistributionDialog: false, // 商品库位分布弹框
      goodsDistributionData: [], // 仓库数据
      formData: {
        goodsName: "", // 商品名称
        goodsNumber: "", // 商品编码
        warehouseName: "", // 仓库名称
      },
      checkGoodsData: [], // 表格选中的数据
    };
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getInventoryData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getInventoryData();
    },

    // 表格复选框勾选数据
    handleSelectionChange(val) {
      this.checkGoodsData = val;
    },

    // 获取库存信息
    getInventoryData() {
      this.$axios({
        url: "/inventoryQuery/list",
        method: "post",
        data: {
          limit: this.pageSize,
          page: this.currentPage,
          goodsName: this.formData.goodsName,
          goodsNumber: this.formData.goodsNumber,
          warehouseName: this.formData.warehouseName,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.tableData = res.data.data;
            this.pageTotal = res.data.count;
            // // 处理图片数据
            // this.tableData.forEach((item) => {
            //   // 处理下表格的图片显示
            //   if (!item.image) {
            //     item.image = [""];
            //   } else {
            //     item.image = JSON.parse(item.image);
            //   }
            // });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取仓库
    getAllWarehouse() {
      this.$axios({
        url: "/warehouseSettings/findAll",
        method: "get",
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.warehouseData = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 查看商品库位分布
    goodsDistribution() {
      if (this.checkGoodsData.length === 1) {
        this.goodsDistributionDialog = true;
        this.$axios({
          url: "/inventoryQuery/findGoodsLocationByGoodsNumber",
          method: "get",
          params: {
            goodsNumber: this.checkGoodsData[0].goodsNumber,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.data.code === 0) {
              console.log(res.data.data);
              this.goodsDistributionData = res.data.data;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    // 导出
    download() {
      let exportData = []; // 要导出的数据
      let obj = {}; //
      let tableHeader = [
        "商品编码",
        "商品名称",
        "商品库存",
        "商品单位",
        "所在仓库",
      ];
      if (this.checkGoodsData.length > 0) {
        this.checkGoodsData.map((item) => {
          obj = {
            goodsCode: item.goodsNumber,
            goodsName: item.goodsName,
            number: item.number,
            warehouseName: item.warehouseName,
            company: item.warehouseUsefulUnit,
          };
          exportData.push(obj);
        });
      } else {
        this.tableData.map((item) => {
          obj = {
            goodsCode: item.goodsNumber,
            goodsName: item.goodsName,
            number: item.number,
            warehouseName: item.warehouseName,
            company: item.warehouseUsefulUnit,
          };
          exportData.push(obj);
        });
      }
      CsvExportor.downloadCsv(
        csvData,
        { header: tableHeader },
        "商品库存查询.csv"
      );
    },
  },

  mounted() {
    this.getInventoryData(); // 获取库存数据
    this.getAllWarehouse(); // 获取仓库数据
  },
};
</script>

<style scoped>
.el-dialog .el-aside {
  width: 150px;
}
.el-divider {
  margin: 10px 0 10px 0;
}
.first-ul {
  margin-left: 5px;
}
.el-aside {
  width: 200px !important;
}
</style>
