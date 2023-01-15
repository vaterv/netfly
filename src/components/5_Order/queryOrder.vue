<template>
  <div>
    <el-card class="box-card">
      <!-- <div class="pagetitle">综合查询</div>
      <el-divider></el-divider> -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form label-width="126px" class="demo-ruleForm">
            <el-form-item label="根据订单号查询">
              <el-input
                width="200px"
                v-model="searchOrderNum"
              ></el-input> </el-form-item
          ></el-form>
        </el-col>
        <!--<el-col :span="5">
           <el-form label-width="130px" class="demo-ruleForm">
            <el-form-item label="根据用户id查询">
              <el-input
                width="200px"
                v-model="searchId"
              ></el-input> </el-form-item
          ></el-form> 
        </el-col>-->
        <el-col :span="6">
          <el-form label-width="126px" class="demo-ruleForm">
            <el-form-item label="根据买家姓名查询">
              <el-input
                width="200px"
                v-model="searchBuyerName"
              ></el-input> </el-form-item
          ></el-form>
        </el-col>
        <el-col :span="6">
                   <el-form label-width="126px" class="demo-ruleForm">
          <el-form-item label="起始时间" label-width="70px">
              <el-date-picker
                size="medium"
                v-model="searchOrderTime1"
                type="datetime"
                placeholder="选择日期时间"
                class="datePickerStyle"
              >
              </el-date-picker>
            </el-form-item>
</el-form>
        </el-col>
        <el-col :span="6">

                   <el-form label-width="126px" class="demo-ruleForm">

          <el-form-item label="结束时间" label-width="70px">
              <el-date-picker
                size="medium"
                v-model="searchOrderTime2"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd"
                class="datePickerStyle"
              >
              </el-date-picker>
            </el-form-item>
</el-form>

         
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="22">

        <div class="mywhite">

        </div>

        </el-col>
        <el-col :span="2">
                 <el-button type="primary" @click="searchById">查询</el-button>

        
        </el-col>
      </el-row>
    </el-card>
    <!-- <el-divider></el-divider> -->
    <!-- 这是表格 -->
    <el-card class="box-card">
    <el-table v-bind:data="limitOverAllData" style="width: 100%">
      <el-table-column label="买家姓名" width="180" prop="buyerName">
      </el-table-column>

      <el-table-column label="订单号" width="180" prop="orderNum">
      </el-table-column>

      <el-table-column label="仓库" width="180" prop="warehouseId">
        <template slot-scope="scope">
          {{ warehouseFormatChange(scope.row.logisticsId)}}
        </template>
      </el-table-column>
      <!-- <el-table-column label="商品信息" width="150" prop="goodsId">
      </el-table-column>
      <el-table-column label="实付金额" width="80" prop="realPay">
      </el-table-column>
      <el-table-column label="重量" width="80" prop="weight"> </el-table-column>
      <el-table-column label="运费" width="80" prop="freight">
      </el-table-column>
   <el-table-column label="收货地址" width="150" prop="address"> 
   <template slot-scope="scope">
          {{ scope.address == null ? "没有收货地址" : "守护地址" }}
        </template> 
      </el-table-column>-->
      <el-table-column label="下单时间" width="180" prop="orderTime">
                                    <template slot-scope="scope">
            {{ scope.row.orderTime | dateFmt("YYYY-MM-DD") }}
          </template>
      </el-table-column>
      <el-table-column label="付款时间" width="180" prop="payTime">
            <template slot-scope="scope">
            {{ scope.row.payTime | dateFmt("YYYY-MM-DD") }}
          </template>
      </el-table-column>
      <el-table-column label="买家留言" width="180" prop="buyerMsg">
      </el-table-column>
      <el-table-column label="订单备注" width="180" prop="orderMsg">
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
  name: "overallQuery",
  data() {
    return {
      queryOpenData: [],
      limitOverAllData: [],
      //用来装所有的数据
      allTableData: [],

      //用来装从输入框获取的id
      searchId: "",
      //用来装从输入框获取到的订单号码
      searchOrderNum: "",
      //装买家姓名
      searchBuyerName: "",
      //装下单时间
      searchOrderTime1: "",
      searchOrderTime2:"",
      //装前端用来限制条数
      searchLimit: "",

      //用来装仓库下拉框的数据
      warehouseOptions: [
        {
          id: "1",
          value: "福建仓库",
        },
        {
          id: "2",
          value: "成都仓库",
        },
      ],

      //用来装物流公司下来跨数据
      logisticscompanyOptions: [
        { id: "1", value: "顺丰快递" },
        { id: "2", value: "中通快递" },
      ],
    };
  },
  created() {
    //this.getLimitTableData(1);
    this.getAllOrder();
    // this.$axios({
    //   method: "get",
    //   url: "api/order/findAll",
    // })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       this.queryOpenData = res.data.data;
    //       console.log("查询到的所有订单是", res.data.data);
    //     } else {
    //       console.log("出错了");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  methods: {
//仓库映射函数
warehouseFormatChange(type){
//映射仓库
const map={

  1:'福建仓库',
  2:'成都仓库',
  3:'福建仓库2号',
  4:'福建仓库3号',
  5:'山西仓库',
  6:'重庆仓库'
}
return map[type]
},


    //点击触发分页函数
    handlePaging(val) {
      this.frontPaging(val);
    },
    //获取分页数据的函数
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
            //????
          } else {
            console.log("出错了");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取所有数据
    getAllOrder() {
      this.$axios({
        method: "get",
        url: "/order/findAll",
      })
        .then((res) => {
          if (res.status === 200) {
            this.allTableData = res.data.data;
            this.limitOverAllData = this.allTableData.slice(0, 5);
            // console.log("首次渲染的数据是", this.limitOverAllData);
          } else {
            console.log("出错了");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //实现前端分页的函数
    frontPaging(val) {
      this.limitOverAllData = this.allTableData.slice((val - 1) * 5, val * 5);
    },
    //实现向后端发起查询请求的函数

    //点击按钮后的函数
    searchById() {

      console.log('下单时间',this.searchOrderTime);
      if (this.searchOrderTime === "") {
        this.searchLimit = "5";
      } else {
        this.searchLimit = "1";
      }
if(this.searchId!=="")
{
 //根据用户唯一id查询订单数据
        // this.$axios({
        //   method: "get",
        //   url: "api/order/find",
        //   params: {
        //     id: this.searchId,
        //   },
        // })
        //   .then((res) => {
        //     if (res.data.data !== null) {
        //       this.$message({
        //         message: "查询成功",
        //         type: "success",
        //       });
        //       this.limitOverAllData = [];
        //       console.log("根据id查询成功,取得到值是", res.data.data);
        //       this.limitOverAllData.push(res.data.data);
        //     } else {
        //       this.$message({
        //         message: "查询失败",
        //         type: "warning",
        //       });
        //       console.log("出错了");
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
}
console.log('起始时间1',this.searchOrderTime1 )
console.log('时间2',this.searchOrderTime2)

          // orderTime1: this.searchOrderTime1,
          // orderTime2: this.searchOrderTime2,
      //根据其他查询条件查询订单数据          // limit: this.searchLimit,
      this.$axios({
        method: "post",
        url: "/order/listAllOrder",
        data: {
          orderNum: this.searchOrderNum,
          buyerName: this.searchBuyerName,
          orderTime1: this.searchOrderTime1,
          orderTime2: this.searchOrderTime2,
          warehouseName: this.warehouseOptions.value,

        },
      })
        .then((res) => {
          if (res.status === 200) {
            let buffer = res.data.data;
            this.limitOverAllData = buffer;
            

            if(buffer.length===0)
            {
                            this.$message({
                message: "未查询到该订单",
                type: "warning",
              });
            }else{           console.log("根据条件查询返回的数据是", buffer);
              this.$message({
                message: "查询成功",
                type: "success",
              });}
 

          } else {
            console.log("出错了");
                    this.$message({
          message: "查询失败",
          type: "warning",
        });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less">
/* 与主题相同的背景色 */
main.el-main{
background-color: #f1f2f7;
padding: 0;
}

.box-card{
  width: 90%;
margin-left:5%;
margin-right: 5%;
margin-top: 20px;

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

.pagetitle {
  font-family: "PingFang SC";
  font-size: 30px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.mywhite{
  width: 100%;
  height: 20px;
  background-color: #fff;
}
</style>