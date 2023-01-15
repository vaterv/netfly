<template>
  <div>
    <el-card class="box-card">
      <!-- <div class="pagetitle">直营退货管理</div>
      <el-divider></el-divider> -->
      <!-- 第一行 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form label-width="138px" class="demo-ruleForm">
            <el-form-item label="根据用户id查询退货">
              <el-input
                autocomplete="off"
                width="200px"
                v-model="inputId"
              ></el-input> </el-form-item
          ></el-form>
        </el-col>

        <el-col :span="4"> <el-button type="primary" @click="searchById">查询</el-button></el-col>
        <el-col :span="4"> </el-col>
        <el-col :span="4">
          
        </el-col>
      </el-row>
    </el-card>
    <!-- <el-divider></el-divider> -->
    <!-- --------------------------------这是渲染的表格-------------------------------------- -->
<el-card class="box-card">
    <el-table :data="refundAllTableData" style="width: 100%">
      <el-table-column prop="refundCode" label="退货编号" width="180">
      </el-table-column>
      <el-table-column prop="refundNum" label="订单号" width="180">
      </el-table-column>

      <!-- <el-table-column prop="storeName" label="买家姓名" width="180">
      </el-table-column> -->
      <!-- <el-table-column prop="buyerPhone" label="买家手机" width="180">
      </el-table-column> -->
      <!-- <el-table-column prop="goodsInformation" label="商品信息" width="180">
      </el-table-column> -->
      <el-table-column prop="refundStatus" label="退货状态" width="180">
        <template slot-scope="scope">
{{scope.row.refundStatus===1?"退货中":"已退货"}}
        </template>
      </el-table-column>
      <el-table-column prop="refundAmount" label="退款金额" width="180">
      </el-table-column>
      <el-table-column prop="goodsStatus" label="商品状态" width="180">
      </el-table-column>

      <!-- <el-table-column label="物流公司" prop="logistics" width="180">
      </el-table-column> -->
      <el-table-column prop="created" label="创建时间" width="180">
                                    <template slot-scope="scope">
            {{ scope.row.created | dateFmt("YYYY-MM-DD") }}
          </template>
      </el-table-column>
      <el-table-column prop="reviewTime" label="审核时间" width="180">
                            <template slot-scope="scope">
            {{ scope.row.reviewTime | dateFmt("YYYY-MM-DD") }}
          </template>
      </el-table-column>
    </el-table>

    <!-- 这是分页 -->
    <el-pagination
      @current-change="handlePaging"
      layout="prev, pager, next, jumper"
      :total="100"
    >
    </el-pagination>
</el-card>
  </div>
</template>

<script>
export default {
  name: "returnOrder",
  data() {
    return {
      //所有的已经退货的信息
      refundAllTableData: [],

      //用来装分页了的退货信息
      pagedTableData: [],

      //用来装从输入框获取的id
      inputId: "",
      //缓存的数组
      bufferData: [],
    };
  },
  //在创建时发起axios请求已经退货的数据
  mounted() {
    this.getTableData(1);
  },
  methods: {
    //点击触发分页函数
    handlePaging(val) {
      //调用后端分页函数
      // this.limitTable(val);
this.getTableData(val)


      //调用前端分页函数
    },

    //获取所有数据的函数
    getTableData(val) {
      this.$axios({
        method: "post",
        url: "/orderRefund/list",
        data:{
          limit:5,
          page:val
        }
      })
        .then((res) => {
          if (res) {
            this.refundAllTableData = res.data.data;
          } else {
            console.log("出错了");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //通过id查询订单的函数
    searchById() {
      if (this.inputId === "") {
        this.$message({
          message: "输入不能为空",
          type: "warning",
        });
      } else {
        this.$axios({
          method: "get",
          url: "/orderRefund/find",
          params: {
            id: this.inputId,
          },
        })
          .then((res) => {
            if (res.data.data !== null) {
              this.$message({
                message: "查询成功",
                type: "success",
              });
              this.refundAllTableData = [];
              console.log("根据id查询成功,取得到值是", res.data.data);
              this.refundAllTableData.push(res.data.data);
            } else {
              this.$message({
                message: "查询失败,该退货订单不存在",
                type: "warning",
              });
              console.log("出错了");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //limitTable(val) {
      //将缓存数据赋值给表格绑定的数据
      //前端用以实现数据分割
      // this.refundAllTableData = this.bufferData;
      // this.refundAllTableData = this.refundAllTableData.slice(
      //   (val - 1) * 5,
      //   val * 5
      // );
      //this.getTableData(val)
    //},
  },
};
</script>

<style>
/* 与主题相同的背景色 */
main.el-main{
background-color: #f1f2f7;
padding: 0;
}

/* 设置card的样式 */
.box-card{
    width: 90%;
margin-left:5%;
margin-right: 5%;
margin-top: 20px;
}

/* 页码数字字体大小 */
.el-pager li {
  font-size: 20px;
}

/* 设置页码居中 */
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.pagetitle {
  font-family: "PingFang SC";
  font-size: 30px;
}
.mygap {
  width: 200px;
  height: 100%;
  border: 1px white solid;
}
</style>