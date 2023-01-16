<template>
  <div>
    <el-card class="box-card">
      <!-- <div class="pagetitle">已发货订单</div>-->
      <el-button
        type="primary"
        icon="el-icon-printer"
        @click="exportExcelSelect"
        >导出订单</el-button
      >

      <el-divider></el-divider>
      <!--表头 -->
      <el-table
        v-bind:data="limitDiliveredData"
        style="width: 100%"
        ref="exportTableRef"
        id="myExport"
      >
        <el-table-column label="订单编号" prop="orderNum"> </el-table-column>
        <el-table-column label="下单时间" prop="orderTime">
          <template slot-scope="scope">
            {{ scope.row.orderTime | dateFmt("YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column label="买家姓名" prop="buyerName"> </el-table-column>

        <el-table-column label="运费" prop="freight"> </el-table-column>
        <el-table-column label="重量" prop="weight"> </el-table-column>
        <el-table-column label="查看订单详情">
          <template slot-scope="scope">
            <el-button type="text" @click="showDialog(scope.row.id)"
              >查看订单的详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 模态框 -->

      <el-dialog :visible.sync="dialogFormVisible" title="商品详情">
        <div class="myheader">商品/赠品</div>
        <el-form :model="form">
          <el-form-item>
            <el-table :data="dialogTableData">
              <el-table-column
                property="orderNum"
                label="订单号"
              ></el-table-column>
              <el-table-column
                property="goodsName"
                label="商品名称"
              ></el-table-column>

              <el-table-column
                property="realPay"
                label="商品金额"
              ></el-table-column>
              <el-table-column
                property="orderMsg"
                label="备注"
              ></el-table-column>
            </el-table>
          </el-form-item>

          <div class="myheader">订单信息</div>

          <!-- 订单信息分区 -->
          <!-- 第二个表格 -->
          <!--表头 -->
          <el-table v-bind:data="dialogTableData" style="width: 100%">
            <el-table-column label="下单时间" prop="orderTime">
              <template slot-scope="scope">
                {{ scope.row.orderTime | dateFmt("YYYY-MM-DD") }}
              </template>
            </el-table-column>
            <el-table-column label="付款时间" prop="payTime">
              <template slot-scope="scope">
                {{ scope.row.payTime | dateFmt("YYYY-MM-DD") }}
              </template>
            </el-table-column>
            <el-table-column label="重量" prop="weight"> </el-table-column>
            <el-table-column label="订单运费" prop="freight"> </el-table-column>

            <el-table-column label="卖家备注" prop="sellerMsg">
            </el-table-column>
            <el-table-column label="订单说明" prop="orderMsg">
            </el-table-column>
          </el-table>

          <el-divider></el-divider>
          <!-- 第三块分区 -->
          <div class="myheader">收货信息</div>

          <el-row :gutter="2">
            <el-col :span="6">
              <el-form-item label="收货人姓名">
                <el-input
                  disabled
                  v-model="this.dialogObject.buyerName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收货省">
                <el-input
                  disabled
                  v-model="this.dialogObject.province"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收货市">
                <el-input disabled v-model="this.dialogObject.city"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收货区">
                <el-input disabled v-model="this.dialogObject.area"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="2">
            <el-col :span="6">
              <el-form-item label="收货人昵称">
                <el-input
                  disabled
                  v-model="this.dialogObject.caller"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收货人手机">
                <el-input disabled v-model="this.dialogObject.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>

      <!-- 这是分页 -->
      <el-pagination
        @current-change="handlePaging"
        layout="prev, pager, next, jumper"
        :total="count"
        :page-size="5"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 引入导出表格的工具
import FileSaver from "file-saver";
import XLSX from "xlsx";
// import htmlToExcel from '@/util/htmlToExcel';

export default {
  name: "diliveredOrder",
  data() {
    return {
      // 测试日期
      value3: "",
      readDate: "",
      // 用来装从后端返回的所有的页数
      count: 0,
      //表格中的数据
      tableData: [],
      //后端分页已发货数据
      limitDiliveredData: [],
      // 模态对话框中的数据
      dialogTableData: [],
      // 模态对话框中的数据对象
      dialogObject: "",
      // 控制模态框显示与否的布尔值
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  mounted() {
    this.getTableData(1);
  },
  methods: {
    //通过传入行数参数来展示模态框
    showDialog(rowId) {
      console.log("拿到的唯一id是", rowId);
      this.dialogFormVisible = true;
      // 筛选出该id对应的数据
      this.limitDiliveredData.forEach((item) => {
        if (item.id === rowId) {
          this.dialogObject = item;
          this.dialogTableData = [];
          this.dialogTableData.push(this.dialogObject);
        }
      });
    },

    //向后端发起请求分页数据
    getTableData(val) {
      //通过限制条数查询所有已发货订单
      this.$axios({
        method: "post",
        url: "/order/listPostedOrder",
        data: {
          limit: 5,
          page: val,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            this.limitDiliveredData = res.data.data;
            console.log("已发货订单返回的数据是", res);
            // 获取总条数
            this.count = res.data.count;
            console.log("获取到的总条数是", this.count);
          } else {
            console.log("出错了");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取已发货订单的总条数

    //点击然后触发向后端发起请求的函数
    handlePaging(val) {
      this.getTableData(val);
    },

    // 数据转换成表格
    exportExcelSelect() {
      // 另一种名字
      // 获取表格元素
      // const els = this.$refs.exportTableRef;
      // // 文件名
      const filename = "已发货订单.xlsx";
      // /* generate workbook object from table */
      // const wb = XLSX.utils.table_to_book(els);
      /* 或者用id */
      const wb = XLSX.utils.table_to_book(document.getElementById("myExport"));
      /* get binary string as output */
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          filename
        );
      } catch (e) {
        console.log(e);
      }
      return wbout;
    },
  },
};
</script>

<style>
.el-main {
  background-color: #f1f2f7;
  padding: 0;
}

.box-card {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 20px;
}

/* 页码数字字体大小 */
.el-pager li {
  font-size: 16px !important;
}

/* 设置页码居中 */
.el-pagination {
  margin-top: 20px;
}

.myheader {
  width: 100%;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  background: #909399;
  border-radius: 3px;
}

.pagetitle {
  font-family: "PingFang SC";
  font-size: 30px;
}
</style>