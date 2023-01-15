<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <!-- <el-form-item label="审批人">
          <el-input
            style="width: 200px"
            placeholder="请输入名称"
            v-model="formData.examineName"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="制单人">
          <el-input
            style="width: 200px"
            placeholder="请输入制单人名字"
            v-model="formData.preparerName"
          ></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select
            v-model="formData.examineStatus"
            placeholder="请选择审核状态"
            style="with: 100px; height: 40px"
            class="ml-5 elselect"
          >
            <el-option
              v-for="item in reviewoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="warning" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="orderNo"
          label="订单编号"
          width="210"
        ></el-table-column>
        <el-table-column
          prop="staffName"
          label="制单人"
          width="180"
        ></el-table-column>
        <el-table-column prop="checkOrderStatus" label="审核状态">
          <template slot-scope="scope">
            {{ scope.row.checkOrderStatus === 0 ? "待审核" : "审核通过" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="checkDetails(scope.row)"
              >查看详情</el-button
            >
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

    <!-- 查看详情弹框(待审核) -->
    <el-dialog title="审核详情" :visible.sync="reviewedDialog">
      <el-table :data="reviewedTableData" border stripe>
        <el-table-column
          prop="planNumber"
          label="计划编号"
          width="200"
          sortable
        ></el-table-column>
        <el-table-column
          prop="makePerson"
          label="制单人员"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="predictPurchaseTotal"
          label="预计采购总数量"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="predictPurchasePrice"
          label="预计采购总价"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="purchaseCycleBegin"
          label="采购周期"
          width="180"
        ></el-table-column>
        <el-table-column prop="vendorId" label="供应商" width="80">
        </el-table-column>
        <el-table-column prop="created" label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.created }}
          </template>
        </el-table-column>
        <el-table-column prop="auditStatus" label="状态"></el-table-column>
        <el-table-column
          prop="planStatus"
          label="计划执行状态"
        ></el-table-column>
        <el-table-column label="操作">
          <el-button>审核</el-button>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reviewedDialog = false">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- 查看详情弹框(审核通过) -->
    <el-dialog title="审核详情" :visible.sync="adoptDialog">
      <el-table :data="adoptTableData" border stripe>
        <el-table-column
          prop="planNumber"
          label="计划编号"
          width="200"
          sortable
        ></el-table-column>
        <el-table-column
          prop="makePerson"
          label="制单人员"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="predictPurchaseTotal"
          label="预计采购总数量"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="predictPurchasePrice"
          label="预计采购总价"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="purchaseCycleBegin"
          label="采购周期"
          width="180"
        ></el-table-column>
        <el-table-column prop="vendorId" label="供应商" width="80">
        </el-table-column>
        <el-table-column prop="created" label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.created }}
          </template>
        </el-table-column>
        <el-table-column prop="auditStatus" label="状态"></el-table-column>
        <el-table-column
          prop="planStatus"
          label="计划执行状态"
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adoptDialog = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Goods",
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 2,
      plan_number: "",
      form: {},
      planNumber: {},
      dialogFormVisible: false,
      multipleSelection: [],

      reviewoptions: [
        {
          value: 1,
          label: "审核通过",
        },
        {
          value: 2,
          label: "待审核",
        },
      ],
      typeoptions: [
        {
          values: 1,
          label: "计划",
        },
        {
          values: 2,
          label: "采购",
        },
        {
          values: 3,
          label: "退货",
        },
      ],
      value: "",
      values: "",

      /* ---------------------------------------------------------- */
      // 分页
      pageSize: 10, // 每页条数
      currentPage: 1, // 当前页
      pageTotal: 0, // 总页数
      tableData: [], // 表格数据
      adoptDialog: false, // 审核通过弹框
      reviewedDialog: false, // 审核不通过弹框
      reviewedTableData: [], // 待审核表格数据
      adoptTableData: [], // 审核通过表格数据
      // 表单数据
      formData: {
        examineName: "", // 审核人名字
        preparerName: "", // 制单人名字
        examineStatus: null, // 审核状态
      },
      orderGoodsData: [], // 用于存储不同订单类型查询到的数据
      planOrderData: [], // 采购计划单数据
      exitOrderData: [], // 采购退货单数据
    };
  },

  created() {
    // 请求分页查询数据
    // this.load();
  },
  methods: {
    // 分页
    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.pageSize = pageSize;
      // this.load();
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum);
      this.pageNum = pageNum;
      // this.load();
    },

    // 查询
    onSubmit() {},

    // 重置
    reset() {
      this.name = "";
      this.value = "";
      this.values = "";
      // this.load();
    },

    // 查看详情
    checkDetails(row) {
      console.log(row);
      if (row.checkOrderStatus === 0) {
        this.reviewedDialog = true; // 打开待审核弹出框
        this.getOrderDataByCheckTypr(row.checkOrderStatus, row.orderId);
      } else {
        this.adoptDialog = true; // 打开审核通过弹出框
        this.getOrderDataByCheckTypr(row.checkOrderStatus, row.orderId);
      }
    },

    // 获取审核数据
    getExamineData() {
      this.$axios({
        url: "/checkOrder/list",
        method: "post",
        data: {
          page: this.currentPage,
          limit: this.pageSize,
        },
      })
        .then((res) => {
          // console.log("111", res);
          if (res.data.code === 0) {
            // console.log(res.data.data);
            this.tableData = res.data.data;
            this.tableData.forEach((item) => {
              if (item.checkType === 0) {
                this.orderType = "采购计划单";
              } else if (item.checkType === 1) {
                this.orderType = "采购订单";
              } else {
                this.orderType = "退货订单";
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 根据不同的订单类型查找不同的数据
    getOrderDataByCheckTypr(checkType, orderId) {
      if (checkType === 0) {
        // 采购计划单(获取所有计划单信息)
        this.$axios({
          url: "/purchasePlan/list",
          method: "post",
          data: {
            limit: 10,
            page: 1,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.data.code === 0) {
              console.log("采购计划单", res.data.data);
              this.planOrderData = res.data.data;
              this.planOrderData.map((item) => {
                if (orderId === item.id) {
                  let obj = {
                    makePerson: item.makePerson,
                    planNumber: item.planNumber,
                    predictPurchasePrice: item.predictPurchasePrice,
                    predictPurchaseTotal: item.predictPurchaseTotal,
                    purchaseCycleBegin: item.purchaseCycleBegin,
                    purchaseCycleEnd: item.purchaseCycleEnd,
                    auditStatus: item.auditStatus,
                    vendorName: item.vendorName,
                  };
                  this.orderGoodsData.push(obj);
                  console.log("obj", obj);
                }
              });
              console.log("处理过的订单信息数据", this.orderGoodsData);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (checkType === 1) {
        // 采购订单(根据订单状态获取值)
        this.$axios({
          url: "/purchaseOrder/findByAuditStatus",
          method: "get",
        })
          .then((res) => {
            console.log(res);
            if (res.data.code === 0) {
              // console.log("采购订单", res.data.data);
              this.orderGoodsData = res.data.data;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // 采购退货单(获取所有采购退货单信息)
        this.$axios({
          url: "/purReturn/findAll",
          method: "get",
        })
          .then((res) => {
            console.log(res);
            if (res.data.code === 0) {
              // console.log("采购退货单", res.data.data);
              this.exitOrderData = res.data.data;
              this.exitOrderData.forEach((item) => {
                if (orderId === item.id) {
                  this.orderGoodsData.push(item);
                }
              });
              console.log("处理过的退货订单信息数据", this.orderGoodsData);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },

  mounted() {
    this.getExamineData();
  },
};
</script>

<style>
.tittle {
  padding: 10px 10px;
  width: 70px;
  text-align: center;
  height: 20px;
  font-size: 15px;
  color: white;
  margin-right: 40px;
  background-color: rgb(135, 133, 133);
}
.reviewspan {
  padding-left: 15px;
}
.tittle-3 {
  width: 100px;
  color: white;
  text-align: center;
  background-color: rgb(40, 156, 215);
  padding: 10px 10px;
}
</style>
