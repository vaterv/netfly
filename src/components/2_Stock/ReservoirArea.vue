<template>
  <div>
    <!-- 库区管理 -->
    <el-card>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="库区编号">
          <el-input v-model="zoneCode" placeholder="请输入库区编号"></el-input>
        </el-form-item>
        <el-form-item label="库区号">
          <el-input
            v-model="libraryAreaCode"
            placeholder="请输入库区号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getZone(selectWarehouseId)"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="选择仓库">
          <el-select
            v-model="selectWarehouseId"
            placeholder="请选择仓库"
            class="area-ipt"
            style="width: 100%"
            @change="getIsLock()"
          >
            <el-option
              v-for="item in warehouseData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addZone">新增</el-button>
        </el-form-item>
      </el-form>
      <!-- <el-divider></el-divider> -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="number" label="库区编号" width="180">
        </el-table-column>
        <el-table-column prop="num" label="库区号"> </el-table-column>
        <el-table-column prop="created" label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.created | dateFmt("YYYY-MM-DD") }}
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
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="pageTotal"
      >
      </el-pagination> -->
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

    <!-- 新增库区弹框 -->
    <el-dialog title="新增库区" :visible.sync="addDialog">
      <el-form
        :model="addFormData"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item
          label="库区编号"
          :label-width="formLabelWidth"
          prop="number"
        >
          <el-input
            v-model="addFormData.number"
            autocomplete="off"
            class="area-ipt"
            @blur="blurFn"
          ></el-input>
        </el-form-item>
        <el-form-item label="库区号" :label-width="formLabelWidth" prop="num">
          <el-input
            v-model="addFormData.num"
            autocomplete="off"
            class="area-ipt"
            @blur="blurFn"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSure('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改库区 -->
    <el-dialog title="修改库区" :visible.sync="modifyDialog">
      <el-form
        :model="modifyFormData"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item
          label="库区编号"
          :label-width="formLabelWidth"
          prop="number"
        >
          <el-input
            v-model="modifyFormData.warehouseCode"
            autocomplete="off"
            class="area-ipt"
            @blur="blurFn"
          ></el-input>
        </el-form-item>
        <el-form-item label="库区号" :label-width="formLabelWidth" prop="num">
          <el-input
            v-model="modifyFormData.zone"
            autocomplete="off"
            class="area-ipt"
            @blur="blurFn"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyDialog = false">取 消</el-button>
        <el-button type="primary" @click="sureModify()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, // 当前页
      pageSize: 10,
      pageTotal: 0,
      // 新增
      addDialog: false,
      zoneCode: "", // 库区编号
      libraryAreaCode: "", // 库区号
      warehouseData: [], // 仓库数组数据
      // 新增中仓库数据
      addFormData: {
        num: "", //库区号
        number: "", //库区编号
      },
      selectWarehouseId: null, // 下拉框的仓库ID
      warehouseIsLock: null, // 仓库类型
      tableData: [], // 表格数据
      modifyDialog: false,
      // 修改的数据
      modifyFormData: {
        warehouseCode: "", // 库区编号
        zone: "", //库区号
        zoneId: "", //库区id
      },
      formLabelWidth: "120px", // form表单标签宽度
      isIptNum: false, // 库区输入状态
      isIptNumber: false, // 库区编号输入状态

      rules: {
        number: [
          { required: true, message: "请输入库区编号", trigger: "blur" },
        ],
        num: [{ required: true, message: "请输入库区号", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getZone(this.selectWarehouseId);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getZone(this.selectWarehouseId);
    },

    /**
     * 仓库
     */
    // 获取仓库数据
    getWarehouseData() {
      this.$axios({
        url: "/warehouseSettings/findAll",
        method: "get",
      })
        .then((res) => {
          console.log(res.data.data);
          this.warehouseData = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取仓库是否锁盘
    getIsLock() {
      // console.log(this.selectWarehouseId);
      this.getZone(this.selectWarehouseId);
      this.warehouseData.forEach((item) => {
        if (this.selectWarehouseId === item.id) {
          this.warehouseIsLock = item.startStatus;
        }
      });
    },

    /**
     * 库区
     */
    // 获取库区
    getZone(warehouseId) {
      // console.log(Number(this.addFormData.warehouseId));
      this.$axios({
        url: "/warehouseZone/list",
        method: "post",
        data: {
          limit: this.pageSize,
          page: this.currentPage,
          warehouseId: warehouseId,
          num: this.libraryAreaCode, // 库区号
          number: this.zoneCode, // 库区编号
        },
      })
        .then((res) => {
          console.log("库区数据", res.data);
          this.pageTotal = Number(res.data.count);
          this.tableData = res.data.data;
          console.log(this.tableData);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 删除
    del(id) {
      this.$axios({
        url: "/warehouseZone/delete",
        method: "get",
        params: {
          id: id,
        },
      })
        .then((res) => {
          if (res.data.code === 0) {
            this.getZone(this.selectWarehouseId);
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 新增库区
    addZone() {
      if (this.selectWarehouseId === null) {
        this.$message({
          type: "error",
          message: "请选择仓库",
        });
      } else {
        if (this.warehouseIsLock === 0) {
          this.$message({
            type: "warning",
            message: "该仓库已锁盘",
          });
        } else {
          this.addDialog = true;
        }
      }
    },

    // 确认新增
    addSure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isIptNum == true || this.isIptNumber == true) {
            this.$message({
              type: "error",
              message: "库区号或者库区编号已存在,请重新输入",
            });
            this.addDialog = true;
            this.addFormData.num = ""; // 清空库区号
            this.addFormData.number = ""; // 清空库区编号
          } else {
            this.$axios({
              url: "/warehouseZone/add",
              method: "post",
              data: {
                warehouseId: Number(this.selectWarehouseId),
                num: this.addFormData.num,
                number: this.addFormData.number,
              },
            })
              .then(async (res) => {
                // console.log(res.data);
                if (res.data.code === 0) {
                  this.addDialog = false;
                  await this.getZone(this.selectWarehouseId);
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

    // 修改
    modify(row) {
      this.modifyDialog = true;
      this.modifyFormData.warehouseCode = row.number; // 库区编号
      this.modifyFormData.zone = row.num; // 库区号
      this.modifyFormData.zoneId = row.id; //库区id
    },
    // 确认修改
    sureModify() {
      if (this.isIptNum == true || this.isIptNumber == true) {
        this.$message({
          type: "error",
          message: "库区号或者库区编号已存在,请重新输入",
        });
        this.modifyDialog = true;
      } else {
        this.$axios({
          url: "/warehouseZone/update",
          method: "post",
          data: {
            id: this.modifyFormData.zoneId,
            num: this.modifyFormData.zone,
            number: this.modifyFormData.warehouseCode,
            warehouseId: this.selectWarehouseId,
          },
        })
          .then((res) => {
            if (res.data.code === 0) {
              this.getZone(this.selectWarehouseId);
              this.modifyDialog = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    // 输入框失焦事件(验证)
    blurFn() {
      this.tableData.forEach((item) => {
        // 新增表单验证
        if (item.num == this.addFormData.num) {
          this.isIptNum = true;
        }
        if (item.number == this.addFormData.number) {
          this.isIptNumber = true;
        }
        // 修改表单验证
        if (this.modifyFormData.zone == item.num) {
          this.isIptNum = true;
        }
        if (this.modifyFormData.warehouseCode == item.num) {
          this.isIptNumber = true;
        }
      });
    },
  },

  mounted() {
    this.getWarehouseData(); // 获取仓库数据
  },
};
</script>

<style scope>
.el-dialog {
  border-radius: 10px;
}
.el-divider {
  margin: 10px 0 10px 0;
}
</style>
