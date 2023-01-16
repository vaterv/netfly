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
          <el-col :span="1">
            <el-form-item>
              <el-button
                type="success"
                @click="refresh"
                icon="el-icon-refresh"
                class="refresh"
              ></el-button>
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
      <el-form
        :model="addData"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="盘点编号"
              prop="checkNum"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="addData.checkNum"
                autocomplete="off"
                maxlength="6"
                @blur="verificationFn"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选择仓库" :label-width="formLabelWidth">
              <el-select
                v-model="addData.warehouseId"
                placeholder="请选择仓库"
                @change="getGoodsByWarehouseId"
                style="width: 100%"
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
          <el-col :span="24">
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                v-model="addData.note"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-card>
                <el-table
                  ref="multipleTable"
                  :data="addData.goodsList"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="selectGoods"
                >
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column
                    label="商品编码"
                    width="120"
                    prop="goodsNumber"
                  >
                  </el-table-column>
                  <el-table-column
                    label="商品名称"
                    width="120"
                    prop="goodsName"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="locationNumber"
                    label="所在库位"
                    width="120"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="inventoryCount"
                    label="盘点实存"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.inventoryCount"> </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="num"
                    label="现有库存"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
              </el-card>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-pagination
            @size-change="addhandleSizeChange"
            @current-change="addhandleCurrentChange"
            :current-page.sync="addCurrentPage"
            :page-sizes="[3, 5, 7, 10]"
            :page-size="addPageSize"
            layout="sizes, prev, pager, next"
            :total="addPageTotal"
          >
          </el-pagination>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add('ruleForm')">确 定</el-button>
          <el-button @click="close">取 消</el-button>
        </el-form-item>
      </el-form>
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
        selectDate: "", // 盘点时间
        staffName: "", // 制单人
        checkNum: "", // 盘点单号
        checkStartTime: "", // 盘点开始时间
        checkEndTime: "", // 盘点结束时间
      },
      // 新增
      /* 新增内分页 */
      addCurrentPage: 1, // 当前页
      addPageSize: 5, // 每页显示条数
      addPageTotal: null, // 数据总条数
      addData: {
        checkNum: "", // 盘点编号
        warehouseId: null, // 仓库ID
        note: "", // 备注
        goodsList: [], // 选择仓库后用于渲染表格的商品数据
      },
      addDialog: false, // 新增弹出框
      goodsData: [], // 新增时复选框选中的商品数据
      finallGoodsData: [], // 处理好的商品数据
      inventoryCount: 0, // 盘点实存
      flag: false, // 判断盘点编号标志符
      inventoryFlag: false, // 盘点实存标志符

      // 规则
      rules: {
        checkNum: [
          { required: true, message: "请输入盘点编码", trigger: "blur" },
          {
            message: "请输入PD开头后面为4位数字的盘点编号",
            pattern: /^PD[0-9]\d*$/,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getinventoryData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getinventoryData();
    },

    // 新增库存盘点页码
    addhandleSizeChange(val) {
      this.addPageSize = val;
      this.getGoodsByWarehouseId();
    },
    addhandleCurrentChange(val) {
      this.addCurrentPage = val;
      this.getGoodsByWarehouseId();
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
          console.log("根据仓库id查询商品", res.data.data.records);
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
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.flag === true) {
            this.$message({
              type: "error",
              message: "该盘点编号已存在或长度不足6位",
            });
          } else {
            this.$axios({
              url: "/inventoryCounting/add",
              method: "post",
              data: {
                checkNum: this.addData.checkNum,
                checkTime: parseInt(new Date().getTime()) + "",
                goodsList: this.finallGoodsData,
                notes: this.addData.note,
                warehouseId: this.addData.warehouseId,
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
          }
        } else {
          return false;
        }
      });
    },

    // 关闭新增
    close() {
      this.addDialog = false;
      this.addData.checkNum = "";
      this.addData.goodsList = [];
      this.addData.warehouseId = null;
      this.addData.note = "";
    },

    // 获取盘点时间周期
    getDate() {
      let arr = this.queryFormData.selectDate;
      this.queryFormData.checkStartTime = arr[0];
      this.queryFormData.checkEndTime = arr[1];
      // console.log("开始日期", this.queryFormData.checkStartTime); // 开始日期 1657641600000
      // console.log("结束日期", this.queryFormData.checkEndTime); // 结束日期 1660579200000
    },

    // 复选框选中的商品数据处理
    selectGoods(val) {
      this.goodsData = val;
      this.finallGoodsData = []; // 循环之前清空，不然会重复push
      this.goodsData.map((item) => {
        let obj = {
          goodsDataId: item.goodsId,
          locationId: item.warehouseLocationId,
          num: Number(item.inventoryCount),
          status: 0,
        };
        return this.finallGoodsData.push(obj);
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

    // 刷新
    refresh() {
      this.queryFormData.warehouseId = null;
      this.queryFormData.staffName = "";
      this.queryFormData.checkNum = "";
      this.queryFormData.selectDate = "";
      this.getinventoryData();
    },

    // 表单验证
    verificationFn() {
      // console.log("222", this.addData.checkNum);
      this.tableData.forEach((item) => {
        // console.log("111", item.checkNum);
        if (
          item.checkNum === this.addData.checkNum ||
          this.addData.checkNum.length != 6
        ) {
          this.flag = true;
        }
      });
      // console.log(this.addData);
      // console.log(this.inventoryCount);
      // this.addData.goodsList.forEach((item) => {
      //   // console.log(this.inventoryCount);
      //   if (this.inventoryCount > item.num) {
      //     this.$message({
      //       type: "error",
      //       message: "盘点实存不能大于现有库存",
      //     });
      //   }
      // });
      // if (!/^[0-9]\d*$/.test(this.inventoryCount)) {
      //   this.$message({
      //     type: "error",
      //     message: "盘点实存应为数字类型的",
      //   });
      // }
    },
  },

  mounted() {
    this.getWarehouseData(); // 获取仓库数据
    this.getinventoryData(); // 获取库存盘点数据
  },
};
</script>

<style scoped>
.el-form .el-input {
  width: 100% !important;
}
.el-form-item .el-button {
  float: right;
  margin: 0 5px;
}
</style>
