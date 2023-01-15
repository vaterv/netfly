<template>
  <div>
    <!-- 库存盘点 -->
    <el-card>
      <el-form ref="form" :model="queryFormData" label-width="80px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="盘点单号">
              <el-input v-model="queryFormData.checkNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="制单人">
              <el-input v-model="queryFormData.staffName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="选择仓库">
              <el-select
                v-model="queryFormData.warehouseId"
                placeholder="请选择仓库"
              >
                <el-option
                  :label="item.name"
                  v-for="item in warehouseData"
                  :key="item.id"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="盘点时间">
              <el-date-picker
                v-model="queryFormData.selectDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
                @blur="getDate"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary" @click="getinventoryData"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" @click="addDialog = true">新增</el-button>
      <el-divider></el-divider>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column label="盘点单号" width="120" prop="checkNum">
        </el-table-column>
        <el-table-column prop="warehouseName" label="盘点仓库" width="120">
        </el-table-column>
        <el-table-column prop="staffName" label="制单人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="inventoryDate"
          label="盘点时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.checkTime | dateFmt("YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column prop="notes" label="备注" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popconfirm @confirm="del(scope.row.id)" title="确定删除？">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                slot="reference"
                class="delBtn"
                style="margin-left: 10px"
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

    <!-- 新增 -->
    <el-dialog title="新增盘点单" :visible.sync="addDialog">
      <el-form :model="addData">
        <el-row>
          <el-col :span="10">
            <el-form-item label="盘点编号" :label-width="formLabelWidth">
              <el-input
                v-model="addData.checkNum"
                autocomplete="off"
                maxlength="5"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="盘点时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="addData.checkTime"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd HH:mm:ss"
                disabled
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="选择仓库" :label-width="formLabelWidth">
              <el-select
                v-model="addData.warehouseId"
                placeholder="请选择仓库"
                @change="getGoodsByWarehouseId"
              >
                <el-option
                  v-for="item in warehouseData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                v-model="addData.note"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-divider></el-divider>
      <el-card>
        <el-table
          ref="multipleTable"
          :data="this.addData.goodsList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="selectGoods"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="商品编码" width="120" prop="goodsNumber">
          </el-table-column>
          <el-table-column label="商品名称" width="120" prop="goodsName">
          </el-table-column>
          <el-table-column prop="locationNumber" label="所在库位" width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="盘点实存"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.inventoryCount"> </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="num" label="现有库存" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="addCurrentPage"
          :page-size="addPageSize"
          layout="prev, pager, next, jumper"
          :total="addPageTotal"
        >
        </el-pagination>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Goods",
  data() {
    return {
      /* ------------------------------------------------ */
      /* 表格分页 */
      currentPage: 1, // 当前页
      pageSize: 10, // 每页显示条数
      pageTotal: null, // 数据总条数
      formLabelWidth: "120px", // form的标签宽度
      tableData: [], // 表格数据

      warehouseData: [], // 仓库数据
      // 查询数据
      queryFormData: {
        warehouseId: null, // 仓库ID
        selectDate: null, // 盘点时间
        staffName: "", // 制单人
        checkNum: "", // 盘点单号
        checkStartTime: "", // 盘点开始时间
        checkEndTime: "", // 盘点结束时间
      },
      // 新增
      /* 新增内分页 */
      addCurrentPage: 1, // 当前页
      addPageSize: 10, // 每页显示条数
      addPageTotal: null, // 数据总条数
      addData: {
        checkNum: "", // 盘点编号
        checkTime: new Date(), // 盘点时间
        warehouseId: null, // 仓库ID
        note: "", // 备注
        goodsList: [], // 选择仓库后用于渲染表格的商品数据
      },
      addDialog: false, // 新增弹出框
      goodsData: [], // 新增时复选框选中的商品数据
      finallGoodsData: [], // 处理好的商品数据
      inventoryCount: null, // 盘点实存
    };
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    // 获取库存盘点数据
    getinventoryData() {
      this.$axios({
        url: "/inventoryCounting/list",
        method: "post",
        data: {
          checkEndTime: this.queryFormData.checkEndTime,
          checkNum: this.queryFormData.checkNum,
          checkStartTime: this.queryFormData.checkStartTime,
          limit: this.pageSize,
          page: this.currentPage,
          staffName: this.queryFormData.staffName,
          warehouseId: this.queryFormData.warehouseId,
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 0) {
            this.tableData = res.data.data;
            this.pageTotal = res.data.count;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取锁盘仓库
    getWarehouseData() {
      // console.log(this.addData.checkTime);
      this.$axios({
        url: "/warehouseSettings/findLock",
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

    // 根据仓库id查询商品
    getGoodsByWarehouseId() {
      // console.log(parseInt(this.addData.checkTime.getTime() / 1000) + "");
      console.log(this.warehouseData);
      this.$axios({
        url: "/warehouseSettings/findGoodsById",
        method: "post",
        data: {
          limit: this.addPageSize,
          page: this.addCurrentPage,
          id: this.addData.warehouseId,
        },
      })
        .then((res) => {
          // console.log(res.data);
          // console.log("根据仓库id查询商品", res.data.data.records);
          if (res.data.code === 0) {
            this.addData.goodsList = res.data.data.records;
            this.addPageTotal = res.data.data.total;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 新增
    add() {
      // console.log("选中的商品数据", this.finallGoodsData);
      console.log(parseInt(this.addData.checkTime.getTime() / 1000) + "");

      this.$axios({
        url: "/inventoryCounting/add",
        method: "post",
        data: {
          checkNum: this.addData.checkNum,
          checkTime: parseInt(this.addData.checkTime.getTime() / 1000) + "",
          goodsList: this.finallGoodsData,
          notes: this.addData.note,
          warehouseId: String(this.addData.warehouseId),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.addDialog = false;
            this.getinventoryData();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取盘点时间周期
    getDate() {
      let arr = this.queryFormData.selectDate;
      this.queryFormData.checkStartTime = arr[0];
      this.queryFormData.checkEndTime = arr[1];
      // console.log("开始日期", this.queryFormData.checkStartTime); // 开始日期 1657641600000
      // console.log("结束日期", this.queryFormData.checkEndTime); // 结束日期 1660579200000
    },

    // 复选框选中的商品数据
    selectGoods(val) {
      this.goodsData = val;
      // console.log("勾选数据", this.goodsData);
      this.finallGoodsData = []; // 循环之前清空，不然会重复push
      this.goodsData.map((item) => {
        let obj = {
          goodsDataId: item.goodsId,
          locationId: item.warehouseLocationId,
          num: Number(item.inventoryCount),
          status: 0,
        };
        this.finallGoodsData.push(obj);
      });
    },

    // 删除
    del(id) {
      // console.log(id);
      this.$axios({
        url: "/inventoryCounting/delete",
        method: "get",
        params: {
          id: id,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.getinventoryData();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.getWarehouseData(); // 获取仓库数据
    this.getinventoryData(); // 获取库存盘点数据
  },
};
</script>

<style scope>
.el-form .el-input {
  width: 100% !important;
}
</style>
