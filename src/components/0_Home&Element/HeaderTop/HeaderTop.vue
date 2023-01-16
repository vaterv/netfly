<template>
  <!-- <div class="head" v-loading="loading">
 

  </div> -->
  <div id="head-nav">
    <div class="logo">
      <span><i class="el-icon-eleme logo_ico"></i></span>
      <span>果时ERP管理系统</span>
    </div>
    <i class="fa fa-bar-chart" id="chart"></i>
    <i class="fa fa-cog" style="color: #97bbf5" id="set"></i>
    <i class="fa fa-bell-o" style="color: #97bbf5" id="bell"></i>

    <div class="user_head" @click="headBox()">
      <div id="headshot">
        <img
          src="./../../../assets/lime-998903__340.jpg"
          width="100%"
          style="border-radius: 10px; cursor: pointer"
        />

        <!-- 用户点击后的模态框 -->
        <div id="box-head">
          <div @click="dialogVisible = true">
            <i class="fa fa-user-o"></i>
            <span>主页</span>
          </div>
          <div>
            <i class="fa fa-cog"></i>
            <span>设置</span>
          </div>
          <p id="line"></p>
          <div
            id="Logout"
            @click="logOut()"
            @click.stop="userClick = !userClick"
          >
            <i class="fa fa-sign-out"></i>
            <span>退出系统</span>
          </div>
        </div>

        <el-dialog
          title="用户信息"
          :visible.sync="dialogVisible"
          width="30%"
          class="user_info"
        >
          <span>用户信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button
              type="primary"
              class="user_info_btn"
              @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
      <div class="user_name">
        <span>admin</span>
        <span><i class="el-icon-arrow-down name_arrow"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderTop",
  data() {
    return {
      loading: false,
      dialogVisible: false,
      userClick: false,
    };
  },
  props: {
    list: Array,
  },
  methods: {
    // 头像浮窗
    headBox() {
      let box = document.getElementById("box-head");
      if (box.style.visibility == "visible") {
        box.style.visibility = "hidden";
        box.style.opacity = "0";
        box.style.transition = "visibility 0.3s";
        box.style.transition = "opacity 0.8s";
        box.style.transform = "rotateX(45deg)";
        box.style.transition = "transform 0.8s";
      } else {
        box.style.visibility = "visible";
        box.style.opacity = "1";
        box.style.transition = "visibility 0.3s";
        box.style.transition = "opacity 0.8s";
        box.style.transform = "rotateX(0deg)";
        box.style.transition = "transform 0.8s";
      }
    },
    // 登出按钮
    logOut() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$router.replace("/");
        sessionStorage.removeItem("mytoken");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("staffId");
      }, 2000);
    },
    // 用户信息
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0px;
  padding: 0px;
}
.head {
  width: 100%;
  height: 100%;
}
//头部导航栏
#head-nav {
  border: 0px;
  width: 100%;
  height: 100%;
  background-color: white;
  // z-index: 111;
}
.logo {
  color: #fff;
  line-height: 60px;
  font-size: 20px;
  background-color: #292929;
  /* background: linear-gradient(to left, rgb(188, 232, 168), rgba(255, 255, 255, 1));  */
  width: 200px;
  height: 60px;
  border: 0px;
  float: left;
  padding-left: 20px;
  padding-right: 80px;
}
.logo > span {
  // float: left;
  color: #fff;
}
.logo_ico {
  width: 30px;
  // padding-left: 30px;
  color: #fff;
  line-height: 45px !important;
  // float: left;
}
#chart {
  float: left;
  border: 0px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  color: #97bbf5;
  cursor: pointer;
  margin-left: 30px;
  margin-right: 10px;
  transition: all 0.3s;
  margin-top: 10px;
}
#chart:hover {
  background-color: #97bbf5;
  color: white;
}
/* 搜索格 */
// #search {
//   float: left;
//   border: 1px;
//   width: 250px;
//   height: 40px;
//   border-radius: 10px;
//   background-color: rgb(230, 239, 240);
//   margin-top: 10px;
// }
// #ipt-search {
//   border: 0px;
//   outline: 0;
//   background-color: rgb(230, 239, 240);
//   width: 200px;
//   height: 40px;
//   margin-left: 10px;
// }
#head-nav > div > i {
  font-size: 20px;
  color: rgb(133, 132, 132);
  float: right;
  margin-right: 10px;
  line-height: 40px;
  cursor: pointer;
}
/* 用户头像 */
.user_head {
  width: 250px;
  height: 100%;
  float: right;
  cursor: pointer;
}
.user_head:hover .user_name {
  color: #000;
  transition: all 0.3s;
}
#headshot {
  border: 0px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin-right: 10px;
  margin-top: 10px;
  float: left;
}
.user_name {
  height: 60px;
  width: 200px;
  line-height: 60px;
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 500;
  float: left;
  color: #979898;
  transition: all 0.3s;
}
.name_arrow {
  font-size: 13px !important;
  margin-left: 5px;
  font-weight: 600 !important;
}
#box-head {
  width: 250px;
  height: 160px;
  margin-left: -100px;
  margin-top: 15px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 1px 2px 0px rgb(223, 223, 223);
  transform: rotateX(45deg);
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s;
  border-radius: 0px 0px 3px 3px;
  padding-top: 5px;
  z-index: 11111 !important;
  position: absolute;
  top: 45px;
  right: 30px;
}
#box-head > div {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin: 0px 0px 10px 0px;
  padding-left: 20px;
  cursor: pointer;
  transition: all 0.5s;
  color: rgb(105, 105, 105);
  overflow: hidden;
}
#box-head > p {
  margin-bottom: 10px;
}
#box-head > div:hover {
  background-color: rgb(233, 232, 232);
}
#line {
  height: 1px;
  background-color: rgb(233, 233, 233);
}
.user_info {
  height: 500px;
}
.user_info_btn {
  width: 50px;
  height: 30px;
}
.head_btn {
  margin-top: 10px;
}
#set,
#bell {
  border: 0px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  float: left !important;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  transition: all 0.3s;
  margin-top: 10px;
}
#set:hover {
  color: white !important;
  background-color: #97bbf5;
}
#bell:hover {
  color: white !important;
  background-color: #97bbf5;
}
#head-nav > a {
  text-decoration: none;
  border: 0px;
  width: auto;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
  color: #97bbf5;
  font-weight: 400;
  font-size: 16px;
  float: right;
  transition: all 0.3s;
}
#head-nav > a:hover {
  color: white;
  background-color: #97bbf5;
}
div > i {
  width: 20px;
}
</style>