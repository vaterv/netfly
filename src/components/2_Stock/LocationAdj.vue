<template>
  <!-- 库位调整 -->
  <div>
    <!-- 查询 -->
    <el-card>
      <el-form :inline="true" :model="queryFormData" class="demo-form-inline">
        <el-form-item label="库位调整号">
          <el-input
            v-model="queryFormData.adjustNo"
            placeholder="库位调整号"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择仓库">
          <el-select v-model="queryFormData.warehouseId" placeholder="请选择">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in warehouseData"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转移时间">
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
        <el-form-item>
          <el-button type="primary" @click="getLocationAdj"> 查询 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格数据 -->
    <el-card>
      <el-button type="primary" @click="outerVisible = true">新增</el-button>
      <el-divider></el-divider>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column label="库位调整号" prop="adjustNo" width="120">
        </el-table-column>
        <el-table-column prop="warehouseName" label="调整仓库" width="120">
        </el-table-column>
        <el-table-column prop="staffName" label="制单人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="adjustTime"
          label="转移时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.adjustTime | dateFmt("YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column prop="note" label="备注" show-overflow-tooltip>
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
    <el-dialog title="库位调整单" :visible.sync="outerVisible">
      <el-form :model="transferData" style="text-align: left">
        <el-row>
          <el-col :span="11">
            <el-form-item label="调整编号" :label-width="formLabelWidth">
              <el-input
                v-model="transferData.adjustNo"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="库位编号" :label-width="formLabelWidth">
              <el-select
                v-model="transferData.locationOutId"
                placeholder="请选择库位编码"
                @change="getGoodsDataByLocationId"
              >
                <el-option
                  v-for="item in locationData"
                  :key="item.id"
                  :value="item.id"
                  :label="item.number"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                v-model="transferData.note"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-card>
        <el-table :data="transferGoodsData" style="width: 100%">
          <el-table-column prop="goodsNumber" label="商品编码" width="180">
          </el-table-column>
          <el-table-column prop="goodsName" label="商品名称" width="180">
          </el-table-column>
          <el-table-column prop="num" label="商品数量"></el-table-column>
          <el-table-column prop="warehouseUsefulUnit" label="单位">
          </el-table-column>
          <el-table-column label="调入库位">
            <template slot-scope="scope">
              <i
                class="el-icon-position"
                @click="getTransferInData(scope.row)"
              ></i>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="outerVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 调入库位弹框 -->
    <el-dialog title="选调入库位" :visible.sync="transferInDialog">
      <div id="tsTitle">
        商品当前库位 <span>{{ currentLocationName }}</span>
      </div>
      <el-form :model="transferData" label-width="100px">
        <el-divider></el-divider>
        <el-form-item label="库位编码">
          <el-select
            v-model="transferData.locationInId"
            placeholder="请选择库位编码"
            @change="checkLocation"
          >
            <el-option
              v-for="item in locationData"
              :key="item.id"
              :label="item.number"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位剩余容量">
          <el-input v-model="transferData.lastCapacity" disabled></el-input>
        </el-form-item>
        <el-form-item label="所调数量">
          <el-input v-model="transferData.adjustNum"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="transferData.goodsCompany" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="transferInDialog = false">取消</el-button>
          <el-button type="primary" @click="add">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, // 当前页
      pageSize: 10, // 每页条数
      pageTotal: 0, // 数据总条数
      tableData: [], // 表格数据
      outerVisible: false, // 新增外层dialog
      warehouseData: [], // 仓库
      warehouseId: "", // 搜索下拉框仓库id
      locationData: [], // 库位数据
      goodsDataBylocaId: [], // 根据库位查找的商品信息
      transferGoodsData: [], //新增页面的商品数据
      currentLocationName: "", // 当前库位名称
      transferInDialog: false, // 调入数据
      // 调整出入库的数据
      transferData: {
        adjustNo: "", // 调整编号
        adjustNum: 0, // 所调数量
        goodId: 0, // 商品ID
        locationOutId: null, // 调出库位ID
        locationInId: null, // 调入库位ID
        note: "", // 备注
        num: 0, // 商品数量
        staffId: null, // 员工ID
        goodsCompany: "", //单位
        lastCapacity: 0, // 库位剩余容量
        // status: 0, //
      },
      // 查询数据
      queryFormData: {
        warehouseId: null, // 仓库ID
        adjustNo: "", // 调整单号
        selectDate: null, // 盘点时间
        checkStartTime: "", // 盘点开始时间
        checkEndTime: "", // 盘点结束时间
      },
      formLabelWidth: "120px", // form表单label宽度
    };
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getLocationAdj();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getLocationAdj();
    },

    // 获取仓库数据
    getWarehouseData() {
      this.$axios({
        url: "/warehouseSettings/findAll",
        method: "get",
      })
        .then((res) => {
          // console.log(res.data.data);
          if (res.data.code === 0) {
            this.warehouseData = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取库位
    getLocationData() {
      this.$axios({
        url: "/warehouseLocation/findAll",
        method: "get",
      })
        .then((res) => {
          // console.log("库位数据", res.data);
          if (res.data.code === 0) {
            this.locationData = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 根据库位id查询商品
    getGoodsDataByLocationId() {
      this.$axios({
        url: "/warehouseLocationAdjust/findGoodsDataByLocationId",
        method: "get",
        params: {
          locationId: this.transferData.locationOutId,
        },
      })
        .then((res) => {
          if (res.data.code === 0) {
            this.transferGoodsData = res.data.data;
            console.log(this.transferGoodsData);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // 获取当前选择的库位名称
      this.locationData.forEach((item) => {
        if (this.transferData.locationOutId == item.id) {
          this.currentLocationName = item.number;
        }
      });
    },

    // 获取库位调整信息
    getLocationAdj() {
      // console.log(sessionStorage.getItem("username"));
      // console.log(sessionStorage.getItem("staffId"));
      this.$axios({
        url: "/warehouseLocationAdjust/list",
        method: "post",
        data: {
          limit: this.pageSize,
          page: this.currentPage,
          adjustNo: this.queryFormData.adjustNo,
          endTime: this.queryFormData.checkEndTime,
          startTime: this.queryFormData.checkStartTime,
          warehouseId: this.queryFormData.warehouseId,
        },
      })
        .then((res) => {
          // console.log("库位调整数据信息", res.data.data);
          if (res.data.code === 0) {
            // console.log(res.data.data);
            this.tableData = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取库位容量
    checkLocation() {
      console.log(this.transferData.locationOutId);
      this.$axios({
        url: "/warehouseLocation/findLastCapacity",
        method: "get",
        params: {
          id: Number(this.transferData.locationOutId),
        },
      })
        .then((res) => {
          if (res.data.code === 0) {
            this.transferData.lastCapacity = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 点击调入库位按钮
    getTransferInData(row) {
      this.transferInDialog = true;
      this.transferData.goodsCompany = row.warehouseUsefulUnit;
      this.transferData.goodId = row.goodId;
    },

    // 确认新增
    add() {
      this.transferData.staffId = sessionStorage.getItem("staffId");
      this.$axios({
        url: "/warehouseLocationAdjust/add",
        method: "post",
        data: {
          adjustNo: this.transferData.adjustNo,
          adjustNum: this.transferData.adjustNum,
          goodId: this.transferData.goodId,
          locationInId: this.transferData.locationInId,
          locationOutId: this.transferData.locationOutId,
          note: this.transferData.note,
          staffId: Number(this.transferData.staffId),
        },
      })
        .then((res) => {
          // console.log(res.data);
          if (res.data.code === 0) {
            this.transferInDialog = false;
            this.getLocationAdj();
            this.transferData.adjustNo = "";
            this.transferData.adjustNum = 0;
            this.transferData.goodId = null;
            this.transferData.locationInId = null;
            this.transferData.note = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取日期周期
    getDate() {
      console.log(this.queryFormData.selectDate);
      if (this.queryFormData.selectDate !== "") {
        let arr = this.queryFormData.selectDate;
        this.queryFormData.checkStartTime = arr[0];
        this.queryFormData.checkEndTime = arr[1];
        // console.log("开始日期", this.queryFormData.checkStartTime); // 开始日期 1657641600000
        // console.log("结束日期", this.queryFormData.checkEndTime); // 结束日期 1660579200000
      }
    },

    // 删除
    del(id) {
      this.$axios({
        url: "/warehouseLocationAdjust/delete",
        method: "get",
        params: { id: id },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.getLocationAdj();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.getWarehouseData(); // 获取仓库
    this.getLocationData(); // 获取库位
    this.getLocationAdj(); // 获取库位调整信息
  },
};
</script>

<style scoped>
#tsTitle {
  font-size: 17px;
}
.el-select {
  width: 100%;
}
.el-form-item .el-button {
  float: right;
  margin: 0 5px;
}
</style>
