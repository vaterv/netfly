<template>
  <div id="myCss">
    <el-card class="box-card">
      <!-- <div class="pagetitle">新订单</div>
      <el-divider></el-divider> -->
      <el-form label-width="100px" class="demo-ruleForm">
        <!-- 用查询页面的排序方式 -->
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form>
              <el-form-item label="订单号" label-width="126px" :rules="[{ required: true, message: '订单号不能为空' }]"
                prop="inputOrderNum" size="medium">
                <el-input v-model="inputOrderNum"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6">
            <el-form-item label=" 选择仓库" class="width_single">
              <el-select v-model="wareHouseoptions.value" placeholder="请选择仓库">
                <el-option v-for="(item, index) in wareHouseoptions" :key="index" :value="item.id" :label="item.value"
                  size="mideum">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label=" 物流公司" class="width_single">
              <el-select v-model="logisticcompanyoptions.value" placeholder="请选择物流公司" size="medium">
                <el-option v-for="(item, index) in logisticcompanyoptions" :key="index" :value="item.id"
                  :label="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form> </el-form>
          </el-col>
          <el-col :span="6">
            <el-form-item label="下单时间" label-width="106px">
              <el-date-picker size="medium" v-model="orderTime" type="datetime" placeholder="选择日期时间"
                value-format="timestamp" class="datePickerStyle">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 新订单的第二行 -->

        <!-- 新订单的第三行 -->
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form>
              <el-form-item label="收货人" label-width="126px" :rules="[{ required: true, message: '收货人不能为空' }]"
                size="medium" prop="receiver">
                <el-input v-model="receiverName"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品信息" class="width_single" :rules="[{ required: true, message: '商品信息不能为空' }]"
              prop="receiver">
              <el-input v-model="goodsInfo" placeholder="请输入商品信息">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="重量" class="width_single" prop="receiver"
              :rules="[{ required: true, message: '重量不能为空' }]">
              <el-input v-model="goodsWeight" placeholder="请输入重量" prop="receiver">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运费" class="width_single" prop="receiver"
              :rules="[{ required: true, message: '运费不能为空' }]">
              <el-input v-model="goodsFreight" placeholder="请输入运费">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <div class="mywhite"></div>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" @click="dataAdd">添加</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- <el-divider></el-divider> -->

    <!-- --------------------------------展示表格----------------------------------- -->
    <el-card class="box-card">
      <el-table v-bind:data="limitTableData" style="width: 100%">
        <el-table-column label="订单号" width="120" prop="orderNum">
        </el-table-column>

        <el-table-column label="买家信息" width="120" prop="buyerId">
        </el-table-column>
        <el-table-column label="仓库" width="120" prop="warehouseId">
          <template slot-scope="scope">
            {{ warehouseFormatChange(scope.row.warehouseId) }}
          </template>
        </el-table-column>
        <el-table-column label="商品信息" width="120" prop="goodsId">
        </el-table-column>
        <el-table-column label="实付金额" width="80" prop="realPay">
        </el-table-column>
        <el-table-column label="重量" width="80" prop="weight">
        </el-table-column>
        <el-table-column label="运费" width="80" prop="freight">
        </el-table-column>
        <el-table-column label="物流公司" width="120" prop="logisticsId">
          <template slot-scope="scope">
            {{ logisticFormatChange(scope.row.logisticsId) }}
          </template>
        </el-table-column>
        <el-table-column label="下单时间" width="150" prop="orderTime">
          <template slot-scope="scope">
            {{ scope.row.orderTime | dateFmt("YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column label="付款时间" width="150" prop="payTime">
          <template slot-scope="scope">
            {{ scope.row.payTime | dateFmt("YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column label="买家留言" width="120" prop="buyerMsg">
        </el-table-column>
        <el-table-column label="订单备注" width="100" prop="orderMsg">
        </el-table-column>

        <!-- 切换发货状态的开关 -->
        <el-table-column label="点击发货" prop="orderStatus" width="100">
          <template slot-scope="scope">
            <el-button type="success" plain icon="el-icon-s-goods" circle @click="changeStatus(scope.row.id)">
            </el-button>
          </template>
        </el-table-column>

        <!-- 删除订单的操作 -->
        <el-table-column label="订单操作">
          <template slot-scope="scope">
            <el-popconfirm @confirm="delOrder(scope.row.id)" title="确定删除该订单吗？">
              <el-button type="danger" icon="el-icon-delete" circle slot="reference">
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 这是分页 -->
      <el-pagination @current-change="handlePaging" :page-size="this.size" layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      value: true,

      //添加时间
      orderTime: "",
      //收货人
      receiverName: "",
      goodsInfo: "",
      goodsWeight: "",
      goodsFreight: "",
      //新订单
      inputOrderNum: "",
      //用来装后端分页获取到的数据
      limitTableData: [],

      //订单表数据
      orderTableData: [],

      // 缓存数据
      bufferData: [],

      //分页后的表格数据
      tableData: [],

      //提示是否删除 的模态框判断变量
      centerDialogVisible: false,

      //物流公司选项数据
      logisticcompanyoptions: [
        { id: "1", value: "天天快递" },
        { id: "2", value: "顺丰快递" },
        { id: "3", value: "中通快递" },
        { id: "4", value: "圆通快递" },
      ],

      //收货省份选项数据
      provinceoptions: [
        { id: "1", value: "四川" },
        { id: "2", value: "福建" },
        { id: "3", value: "湖北" },
      ],

      //收货仓库选择数据
      wareHouseoptions: [
        { id: "1", value: "福建仓库" },
        { id: "2", value: "成都仓库" },
        { id: "1", value: "福建仓库2号" },
        { id: "2", value: "福建仓库3号" },
        { id: "1", value: "山西仓库" },
        { id: "2", value: "重庆仓库" },
      ],

      //转换成数值后的储存变量的地方
      logisticcompanyNumber: "",
      provinceNumber: "",
      wareHouseNumber: "",

      //用来装服务器返回的code的变量
      orderReturnCode: "",
      userReturnCode: "",

      /****分页相关的属性数字设置***/
      //一页显示几行数据
      size: 5,
      //当前页码
      page: "",
      //总数组长度
      totalLegnth: "",

      /******新订单的一些数据*******/
      //重量
      weight: "",
      //下单时间
      dateValue: "",
    };
  },
  // 在挂在前获取用户表数据
  beforeMount() {
    //使用前端分页是 后端返回的字段不全
    this.getOrder();
  },
  mounted() {
    //使用后端分页函数
    //this.getLimitTableData(1);
  },
  methods: {
    //格式转换函数
    logisticFormatChange(type) {
      //映射结构
      const map = {
        1: "天天快递",
        2: "顺丰快递",
        3: "中通快递",
        4: "圆通快递",
      };
      return map[type];
    },

    //仓库映射函数
    warehouseFormatChange(type) {
      //映射仓库
      const map = {
        1: "福建仓库",
        2: "成都仓库",
        3: "福建仓库2号",
        4: "福建仓库3号",
        5: "山西仓库",
        6: "重庆仓库",
      };
      return map[type];
    },

    //获取订单表数据
    getOrder() {
      this.$axios({
        method: "get",
        url: "/order/findAll",
      })
        .then((res) => {
          if (res) {
            console.log("0服务器返回的是", res.data.data);
            this.bufferData = res.data.data;
            this.limitTableData = res.data.data;

            this.limitTableData = this.limitTableData.slice(0, 5);
          } else {
            console.log("出错了");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击新增时，把数据添加到数据库
    //在这里更改了函数 的名字

    //新增订单测试函数
    datatest() {
      console.log("点击了添加订单");
      console.log(this.dateValue);
    },

    dataAdd() {
      //将多选框的值转换成对应的数字
      this.wareHouseNumber = Number(this.wareHouseoptions.value);
      this.logisticcompanyNumber = Number(this.logisticcompanyoptions.value);
      // console.log('选择的时间值是',this.orderTime);
      // console.log('选择的订单号是',this.inputOrderNum);
      // console.log('选择的仓库是',this.wareHouseNumber);
      // console.log('选择的物流公司值是',this.logisticcompanyNumber);

      //       console.log('收货人是',this.receiverName);
      // console.log('商品信息是',this.goodsInfo);
      // console.log('重量',this.goodsWeight);
      // console.log('运费',this.logisticcompanyNumber);
      // //判断新增订单内容是否为空
      if (
        this.orderTime === "" ||
        this.goodsWeight === "" ||
        this.goodsFreight === "" ||
        this.logisticcompanyNumber === "" ||
        this.inputOrderNum === "" ||
        this.wareHouseNumber === "" ||
        this.inputOrderNum === ""
      ) {
        this.$message({
          message: "请输入完整订单内容",
          type: "warning",
        });
      } else {
        //   /****将warehouseId仓库名、logisticsId物流公司名字、物流单号orderNum 存入订单表****/
        this.$axios({
          method: "post",
          url: "/order/add",
          data: {
            orderTime: this.orderTime,
            payTime: this.orderTime,
            buyerId: "1",
            goodsId: "9",
            weight: this.goodsWeight,
            freight: this.logisticcompanyNumber,
            logisticsId: this.logisticcompanyNumber,
            orderNum: this.inputOrderNum,
            warehouseId: this.wareHouseNumber,
          },
        })
          .then((response) => {
            if (response.status === 200) {
              console.log("存入订单表数据成功。返回的数据是", response.data);
              //将返回码存入变量中
              this.orderReturnCode = response.data.code;
              this.$message({
                message: "添加新订单成功",
                type: "success",
              });
              //成功后重新渲染页面
              this.getOrder();
            } else {
              console.log("出错了");
              this.$message({
                message: "添加新订单失败",
                type: "warning",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    //点击触发分页函数
    handlePaging(val) {
      this.getTableData(val);
      console.log("当前页数是", val);
    },
    //切割数据的函数
    getTableData(val) {
      console.log("完整的数组是", this.bufferData);
      this.limitTableData = this.bufferData.slice((val - 1) * 5, val * 5);
      console.log("调用切割函数后的数组是", this.limitTableData);
    },

    //点击触发删除订单
    delOrder(id) {
      console.log("点击了删除,唯一的id是", id);
      //实际向后台请求删除的操作
      this.$axios({
        method: "get",
        url: "/order/delete",
        params: {
          id: id,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            // this.getOpenTableData();
            this.$message({
              message: "删除新订单成功",
              type: "success",
            });
          } else {
            console.log("出错了");
            this.$message({
              message: "删除新订单失败",
              type: "warning",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      this.centerDialogVisible = false;
    },
    //修改订单的函数
    editOrder() {
      console.log("点击了修改状态按钮");
    },
    //修改顶单状态的函数
    changeStatus(rowId) {
      console.log("点击了切换按钮", rowId);
      //实际进行修改状态的函数
      this.$axios({
        method: "post",
        url: "/order/update",
        data: {
          id: rowId,
          orderStatus: 1,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("修改后是", res.data);
            this.$message({
              message: "该订单发货成功，在已发货页查看详情",
              type: "success",
            });

            this.$axios({
              method: "post",
              url: "/order/listPostedOrder",
              data: {
                limit: 10,
              },
            })
              .then((response) => {
                if (response.status === 200) {
                  console.log("已经发货的订单是", response.data.data);
                } else {
                  console.log("出错了");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.log("出错了");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取后端分页的函数

    /************现在已经弃用********** */
    getLimitTableData(val) {
      this.$axios({
        method: "post",
        url: "/order/listAllOrder",
        data: {
          limit: 5,
          page: val,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            this.limitTableData = res.data.data;
            console.log(
              "4------通过点击分页后拿到的后端分页的已发货订单是",
              this.limitTableData
            );
          } else {
            console.log("出错了");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /************现在已经弃用***********/
  },
};
</script>

<style>
/* 与主题相同的背景色 */
main.el-main {
  background-color: #f1f2f7;
  padding: 0;
}

/* datePickerStyle */
.datePickerStyle {
  width: 185px !important;
}

/* 按钮行占位 */
.mywhite {
  width: 100%;
  height: 20px;
  background-color: #fff;
}

/* 页码数字字体大小 */
.el-pager li {
  font-size: 16px !important;
}

/* 设置页码居中 */
.el-pagination {
  text-align: center;
  margin-top: 10px;
}

.box-card {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 20px;
}

.width_single {
  width: 290px;
  display: inline-block;
  margin-bottom: 5px;
}

.buttonStyle {
  margin-left: 130px;
  display: inline-block;
}

.pagetitle {
  font-family: "PingFang SC";
  font-size: 30px;
}
</style>