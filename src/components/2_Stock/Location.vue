<template>
  <!-- 库位管理 -->
  <div>
    <div class="contralBox">
      <el-card>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="选择仓库">
            <el-select
              v-model="warehouseId"
              placeholder="请选择仓库"
              @change="getWarehouseLocation"
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in warehouseData"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              @click="refresh"
              icon="el-icon-refresh"
              class="refresh"
            ></el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <el-card>
      <el-form>
        <el-form-item>
          <el-button type="primary" @click="addDialog = true">新增</el-button>
          <el-button type="primary" @click="checkGoods">查看库位商品</el-button>
          <el-button type="primary" @click="download">导出</el-button>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>

      <el-table
        :data="tableData"
        style="width: 100%"
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" :reserve-selection="true">
        </el-table-column>
        <el-table-column prop="number" label="库位编号" width="180">
        </el-table-column>
        <el-table-column prop="warehouseName" label="仓库名称" width="180">
        </el-table-column>
        <el-table-column prop="stock" label="存量"></el-table-column>
        <el-table-column prop="usedCapacity" label="已有容量"></el-table-column>
        <el-table-column prop="startStatus" label="是否停用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.startStatus"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="0"
              :inactive-value="1"
              @change="changeUseStatus(scope.row)"
              :active-text="scope.row.startStatus === 1 ? '禁用' : '启用'"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              type="primary"
              circle
              size="mini"
              @click="modify(scope.row)"
            ></el-button>
            <el-popconfirm
              @confirm="del(scope.row.locationId)"
              title="确定删除？"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                slot="reference"
                class="delBtn"
              ></el-button>
            </el-popconfirm>
          </template>
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

    <!-- 修改库位弹框 -->
    <el-dialog title="修改库位" :visible.sync="modifyDialog">
      <el-form
        :model="modifyData"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="选择库区">
          <el-select
            v-model="modifyData.zoneId"
            placeholder="请选择库区"
            class="iptCount"
            @change="verificationFn"
          >
            <el-option
              v-for="item in zoneData"
              :key="item.id"
              :label="item.number"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位行数" prop="rowCount">
          <el-input
            v-model="modifyData.rowCount"
            class="iptCount"
            maxlength="2"
            @blur="verificationFn"
          ></el-input>
        </el-form-item>
        <el-form-item label="库位列数" prop="colCount">
          <el-input
            v-model="modifyData.colCount"
            class="iptCount"
            maxlength="2"
            @blur="verificationFn"
          ></el-input>
        </el-form-item>
        <el-form-item label="库位层数" prop="layerCount">
          <el-input
            v-model="modifyData.layerCount"
            class="iptCount"
            maxlength="2"
            @blur="verificationFn"
          ></el-input>
        </el-form-item>
        <el-form-item label="库位存量" prop="totalCapacity">
          <el-input
            v-model="modifyData.totalCapacity"
            class="iptCount"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyDialog = false">取 消</el-button>
        <el-button type="primary" @click="sureModify">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增弹框 -->
    <el-dialog title="新建库位" :visible.sync="addDialog">
      <el-form
        :model="addData"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="选择库区">
          <el-select
            v-model="addData.zoneId"
            placeholder="请选择库区"
            class="iptCount"
            @change="verificationFn"
          >
            <el-option
              v-for="item in zoneData"
              :key="item.id"
              :label="item.number"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位行数" prop="rowCount">
          <el-input
            v-model="addData.rowCount"
            class="iptCount"
            maxlength="2"
            @blur="verificationFn"
          ></el-input>
        </el-form-item>
        <el-form-item label="库位列数" prop="colCount">
          <el-input
            v-model="addData.colCount"
            class="iptCount"
            maxlength="2"
            @blur="verificationFn"
          ></el-input>
        </el-form-item>
        <el-form-item label="库位层数" prop="layerCount">
          <el-input
            v-model="addData.layerCount"
            class="iptCount"
            maxlength="2"
            @blur="verificationFn"
          ></el-input>
        </el-form-item>
        <el-form-item label="库位存量" prop="totalCapacity">
          <el-input v-model="addData.totalCapacity" class="iptCount"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAdd">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 查看库位商品 -->
    <el-dialog title="查看库位商品明细" :visible.sync="goodsInfoDialog">
      <div>
        <p style="font-size: 17px">
          库位存量:<span>{{ goodsTotalCount }}</span>
        </p>
      </div>
      <el-divider></el-divider>
      <el-table :data="locationGoodsTableData">
        <el-table-column
          property="goodsNumber"
          label="商品编码"
          width="150"
        ></el-table-column>
        <el-table-column
          property="goodsName"
          label="商品名称"
          width="200"
        ></el-table-column>
        <el-table-column property="num" label="商品数量"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeCheckGoods" type="info">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CsvExportor from "csv-exportor"; //npm i csv-exportor --save
export default {
  name: "Location",
  data() {
    return {
      tableCheckedData: null, // 表格选中的id
      currentPage: 1, // 当前页
      pageSize: 10, // 每页显示条数
      pageTotal: null, // 数据总条数
      tableData: [], // 库位数据
      // 新增
      addData: {
        zoneId: null,
        rowCount: "",
        colCount: "",
        layerCount: "",
        totalCapacity: "",
      },
      addDialog: false, // 新增弹出框

      // 修改
      modifyData: {
        locationId: null,
        zoneId: null,
        rowCount: "",
        colCount: "",
        layerCount: "",
        totalCapacity: "",
      },
      modifyDialog: false, // 修改模态框
      locationGoodsTableData: [], // 库位商品明细
      goodsTotalCount: 0, // 库位商品存量
      goodsInfoDialog: false, // 查看库位商品弹框
      warehouseData: [], // 仓库数据
      warehouseId: null, // 仓库ID
      zoneData: [], // 库区数据
      zoneId: null, //库区ID
      flag: false, // 用于正则验证

      // 规则
      rules: {
        rowCount: [
          { required: true, message: "请输入库位行数", trigger: "blur" },
          {
            message: "库位行数是大于0的正整数",
            pattern: /^[1-9]\d*$/,
            trigger: "blur",
          },
        ],
        colCount: [
          { required: true, message: "请输入库位列数", trigger: "blur" },
          {
            message: "库位列数是大于0的正整数",
            pattern: /^[1-9]\d*$/,
            trigger: "blur",
          },
        ],
        layerCount: [
          { required: true, message: "请输入库位层数", trigger: "blur" },
          {
            message: "库位层数是大于0的正整数",
            pattern: /^[1-9]\d*$/,
            trigger: "blur",
          },
        ],
        totalCapacity: [
          { required: true, message: "请输入库位总容量", trigger: "blur" },
          {
            message: "库位层数是大于0的正整数",
            pattern: /^0[1-9]|[1-9]\d*$/,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.getWarehouseLocation();
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.getWarehouseLocation();
      this.currentPage = val;
    },

    // 获取表格数据当前行的id(多用于跨页多选的情况)
    getRowKeys(row) {
      return row.locationId;
    },

    // 获取仓库
    getWarehouseData() {
      this.$axios({
        url: "/warehouseSettings/findAll",
        method: "get",
      })
        .then((res) => {
          // console.log("仓库数据", res.data.data);
          if (res.data.code === 0) {
            this.warehouseData = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取库区数据
    getZoneData() {
      this.$axios({
        url: "/warehouseZone/findAll",
        method: "get",
      })
        .then((res) => {
          this.zoneData = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取库位信息
    getWarehouseLocation() {
      this.$axios({
        url: "/warehouseLocation/list",
        method: "post",
        data: {
          limit: this.pageSize,
          page: this.currentPage,
          warehouseId: this.warehouseId, // 仓库id
          zoneId: this.zoneId, // 库区id
        },
      })
        .then((res) => {
          console.log("库位数据", res.data.data);
          this.pageTotal = res.data.count;
          this.tableData = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 表格内容的复选框是否选中
    handleSelectionChange(v) {
      this.tableCheckedData = v;
      // console.log(this.tableCheckedData); // 3
    },

    // 确认新增库位
    add() {
      // console.log(this.addData.rowCount.length);
      if (this.addflag == true) {
        this.$message({
          type: "error",
          message: "改库位已存在",
        });
        this.addflag = false;
      } else {
        // 发起axios请求
        this.$axios({
          url: "/warehouseLocation/add",
          method: "post",
          data: {
            col:
              this.addData.colCount.length === 1
                ? `0${this.addData.colCount}`
                : this.addData.colCount,
            layer:
              this.addData.layerCount.length === 1
                ? `0${this.addData.layerCount}`
                : this.addData.layerCount,
            row:
              this.addData.rowCount.length === 1
                ? `0${this.addData.rowCount}`
                : this.addData.rowCount,
            stock: Number(this.addData.totalCapacity),
            zoneId: this.addData.zoneId,
          },
        })
          .then((res) => {
            // console.log(res);
            if (res.data.code === 0) {
              this.getWarehouseLocation();
              this.closeAdd();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    // 关闭模态框并清空数据
    closeAdd() {
      this.addDialog = false;
      this.addData.zoneId = null;
      this.addData.rowCount = "";
      this.addData.colCount = "";
      this.addData.layerCount = "";
      this.addData.totalCapacity = "";
    },

    // 修改库位使用状态
    changeUseStatus(row) {
      console.log(row.locationId);
      this.$axios({
        url: "/warehouseLocation/updateStartStatus",
        method: "get",
        params: {
          id: row.locationId,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.getWarehouseLocation();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /* 查看库位商品详细 */
    checkGoods() {
      if (this.tableCheckedData == null) {
        this.$message({
          type: "error",
          message: "请选择一个库位信息",
        });
      } else {
        // console.log(this.tableCheckedData);
        this.goodsInfoDialog = true;
        // 发起axios请求，查看库位的商品详情
        this.$axios({
          url: "/warehouseLocationAdjust/findGoodsDataByLocationId",
          method: "get",
          params: {
            locationId: this.tableCheckedData[0].locationId,
          },
        })
          .then((res) => {
            if (res.data.code === 0) {
              this.locationGoodsTableData = res.data.data;
              this.locationGoodsTableData.forEach((item) => {
                this.goodsTotalCount = this.goodsTotalCount + item.num;
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    // 关闭查看商品明细
    closeCheckGoods() {
      this.goodsInfoDialog = false;
      this.goodsTotalCount = 0;
    },

    // 删除库位信息
    del(id) {
      // console.log("要删除的id是", id); // 要删除的id是 3
      this.$axios({
        url: "/warehouseLocation/delete",
        method: "get",
        params: {
          id: id,
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data.code === 0) {
            this.getWarehouseLocation();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 修改
    modify(row) {
      // console.log(row);
      this.modifyDialog = true;
      this.modifyData.locationId = row.locationId;
      this.modifyData.zoneId = row.zoneId;
      this.modifyData.rowCount = row.row;
      this.modifyData.colCount = row.col;
      this.modifyData.layerCount = row.layer;
      this.modifyData.totalCapacity = row.stock;
    },

    // 确认修改
    sureModify() {
      this.$axios({
        url: "/warehouseLocation/update",
        method: "post",
        data: {
          col:
            this.modifyData.colCount.length === 1
              ? `0${this.modifyData.colCount}`
              : this.modifyData.colCount,
          layer:
            this.modifyData.layerCount.length === 1
              ? `0${this.modifyData.layerCount}`
              : this.modifyData.layerCount,
          row:
            this.modifyData.rowCount.length === 1
              ? `0${this.modifyData.rowCount}`
              : this.modifyData.rowCount,
          stock: Number(this.modifyData.totalCapacity),
          zoneId: this.modifyData.zoneId,
          id: this.modifyData.locationId,
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 0) {
            this.modifyDialog = false;
            this.getWarehouseLocation();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 刷新
    refresh() {
      this.warehouseId = null;
      this.getWarehouseLocation();
    },

    // 导出
    download() {
      let exportData = []; // 要导出的数据
      let obj = {}; //
      let tableHeader = [
        "库位编码",
        "仓库名称",
        "存量",
        "已有容量",
        "是否停用",
      ];
      if (this.tableCheckedData.length > 0) {
        this.tableCheckedData.map((item) => {
          obj = {
            number: item.number,
            warehouseName: item.warehouseName,
            stock: item.stock,
            usedCapacity: item.usedCapacity,
            startStatus: item.startStatus === 1 ? "禁用" : "启用",
          };
          exportData.push(obj);
        });
      } else {
        this.tableData.map((item) => {
          obj = {
            number: item.number,
            warehouseName: item.warehouseName,
            stock: item.stock,
            usedCapacity: item.usedCapacity,
            startStatus: item.startStatus === 1 ? "禁用" : "启用",
          };
          exportData.push(obj);
        });
      }
      CsvExportor.downloadCsv(
        exportData,
        { header: tableHeader },
        "库位信息表.csv"
      );
    },

    // 正则验证
    verificationFn() {
      // this.addData.colCount =
      //   this.addData.colCount.length === 1
      //     ? `0${this.addData.colCount}`
      //     : this.addData.colCount;
      // this.addData.layerCount =
      //   this.addData.layerCount.length === 1
      //     ? `0${this.addData.layerCount}`
      //     : this.addData.layerCount;
      // this.addData.rowCount =
      //   this.addData.rowCount.length === 1
      //     ? `0${this.addData.rowCount}`
      //     : this.addData.rowCount;
      // console.log(typeof this.addData.colCount);

      this.tableData.forEach((item) => {
        if (
          this.addData.rowCount == item.row &&
          this.addData.zoneId == item.zoneId &&
          this.addData.colCount == item.col &&
          this.addData.layerCount == item.layer
        ) {
          this.addflag = true;
        }

        if (
          this.modifyData.rowCount == item.row &&
          this.modifyData.zoneId == item.zoneId &&
          this.modifyData.colCount == item.col &&
          this.modifyData.layerCount == item.layer
        ) {
          this.flag = true;
        }
      });
    },
  },

  mounted() {
    this.getWarehouseData(); // 获取仓库树数据
    this.getWarehouseLocation(); // 获取库位信息
    this.getZoneData(); // 获取库区
  },
};
</script>

<style scoped>
.contralBox {
  width: 100%;
  margin-bottom: 20px;
}
.el-card {
  width: 90%;
  margin: 0 5%;
  position: relative;
  top: 20px;
}
#title {
  background-color: rgba(211, 208, 208, 0.627);
  height: 40px;
  line-height: 40px;
}
.el-aside {
  width: 150px !important;
  height: calc(100vh - 60px);
  border: 1px solid rgba(62, 62, 62, 0.459);
  padding: 0;
  box-sizing: border-box;
}
.el-main {
  /* height: calc(100vh - 50px); */
  padding-top: 0 !important;
}

.second-ul-li {
  margin-left: 20px;
}

/deep/ .el-dialog {
  width: 30% !important;
  border-radius: 10px;
}

.iptCount {
  width: 50%;
}
.el-checkbox-group {
  margin-left: -60px;
}
.first-ul {
  margin-left: 5px;
}

.el-popover {
  border-radius: 10px;
}
.p-text {
  margin: 10px 5px 10px 5px;
}
.el-popover {
  height: 20px;
}

.el-button-group > .el-button:last-child {
  border-radius: 5px;
}
.el-button-group > .el-button:first-child {
  border: 1px solid rgba(155, 155, 155, 0.66);
  width: 54px;
  border-radius: 5px;
  margin-right: 10px;
}
.delBtn {
  margin-left: 10px;
}
.iptCount {
  width: 50%;
}
.el-checkbox-group {
  margin-left: -60px;
}
</style>
