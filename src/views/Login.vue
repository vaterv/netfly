<template>
  <div id="app" v-loading="loading">
    <div id="login_header">
      <h1>Fruit ERP Management System</h1>
    </div>
    <div class="info">
      <div class="buttons">
        <p>
          <a class="modal__trigger" @click="ShowLoginBox()">Login</a>
          <a class="modal__trigger" @click="ShowRegisBox()">Regis</a>
          <a class="modal__trigger">Amend</a>
        </p>
      </div>
      <p class="tip">Click a button to activate a modal.</p>
      <br />
    </div>

    <!-- 登录界面 -->
    <el-card id="login_Box">
      <button id="login_close" @click="LoginClose()">
        <svg class="" viewBox="-3 -3 30 30">
          <path
            d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"
          />
          <path d="M0 0h24v24h-24z" fill="none" />
        </svg>
      </button>
      <h1 id="lean">Login</h1>
      <div id="login_Ifo">
        <el-form label="活动名称">
          <div>
            <span>
              <i class="fa fa-user login_icon"></i>
            </span>
            <input
              class="login_Ipt"
              type="text"
              v-model="Account"
              placeholder="Username"
            />
            <span>
              <i
                class="fa fa-times-circle-o"
                style="padding: 0px; margin: 0px"
              ></i>
            </span>
          </div>
          <div>
            <span>
              <i class="fa fa-key login_icon"></i>
            </span>
            <input
              class="login_Ipt"
              type="password"
              v-model="Password"
              placeholder="Password"
            />
            <span>
              <i
                class="fa fa-times-circle-o"
                style="padding: 0px; margin: 0px"
              ></i>
            </span>
          </div>
        </el-form>
        <el-row>
          <el-button id="login_Btn" @click="linkto()">Login</el-button>
        </el-row>
      </div>
    </el-card>

    <!-- 注册界面 -->
    <el-card id="register_Box">
      <button id="register_close" @click="RegisterClose()">
        <svg class="" viewBox="-3 -3 30 30">
          <path
            d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"
          />
          <path d="M0 0h24v24h-24z" fill="none" />
        </svg>
      </button>
      <h1 id="lean2">Register</h1>
      <div id="register_Ifo">
        <el-form label="活动名称">
          <div>
            <span>
              <i class="fa fa-user login_icon"></i>
            </span>
            <input
              class="login_Ipt"
              type="text"
              v-model="registerUsername"
              placeholder="Account"
            />
            <span>
              <i class="fa fa-times-circle-o"></i>
            </span>
          </div>
          <div>
            <span>
              <i class="fa fa-key login_icon"></i>
            </span>
            <input
              class="login_Ipt"
              type="password"
              v-model="registerPassword"
              placeholder="Password"
            />
            <span>
              <i class="fa fa-times-circle-o"></i>
            </span>
          </div>
          <!-- <div>
            <span>
              <i class="fa fa-check-square-o login_icon"></i>
            </span>
            <input
              class="login_Ipt"
              type="password"
              v-model="confirmPssword"
              placeholder="Confirm Password"
            />
            <span>
              <i class="fa fa-times-circle-o"></i>
            </span>
          </div> -->
        </el-form>
        <el-row>
          <el-button id="login_Btn" v-on:click="register()">Confirm</el-button>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      Account: "",
      Password: "",
      registerUsername: "",
      registerPassword: "",
      isLogin: true,
      Raccount: "",
      Rpassword: "",
      confirm: "",
      loading: false,
      loginData: {},
      loginResData: [],
    };
  },
  methods: {
    linkto() {
      if (this.username === "admin" && this.password === "admin") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.$router.replace("/main/home");
        }, 2000);
      } else {
        this.$router.replace("/main/home");
        //alert("x");
      }

      // this.$axios({
      //   url: "/account/login",
      //   method: "post",
      //   data: {
      //     username: this.Account,
      //     password: this.Password,
      //   },
      // }).then((res) => {
      //   console.log(res.data);
      //   if (res.data.code === 0) {
      // sessionStorage.setItem("mytoken", res.data.token);

      // 解构token值
      // const code = jwtDecode(res.data.token);
      // console.log("解析后的token", code); // 就可以解析成功了
      // 把解析后的token存放到本地存储
      // sessionStorage.setItem("username", code.username);
      // sessionStorage.setItem("staffId", code.staffId);

      // console.log(this.loginData);
      //   // console.log(res.data);
      //   this.loading = true;
      //   setTimeout(() => {
      //     this.loading = false;
      //     this.$router.replace("/main/home");
      //   }, 2000);
      // }

      // if (this.form.username === res.data.data.username && this.form.password === res.data.data.password) {
      //   this.loading = true;
      //   setTimeout(() => {
      //     this.loading = false;
      //     this.$router.replace('/main/home')
      //   }, 2000);
      // } else {
      //   alert('x')
      // }
      // });
    },
    // register() {

    //   if (this.registerUsername)

    //     this.$axios({
    //       url: "/account/add",
    //       method: 'post',
    //       data: {

    //       },
    //       headers: {
    //         token: sessionStorage.getItem("token")
    //       }
    //     }).then((res) => {
    //       console.log(res);

    //       if (res.data.code === 0) {
    //         console.log(res.data);
    //         console.log(res.data.data);
    //         this.supplier = res.data.data

    //       }
    //     })
    // },

    ShowLoginBox() {
      let login_Box = document.getElementById("login_Box");
      let login_Ifo = document.getElementById("login_Ifo");
      let login_close = document.getElementById("login_close");
      let lean = document.getElementById("lean");
      login_Box.style.visibility = "visible";
      login_Box.style.height = 320 + "px";
      login_Box.style.width = 580 + "px";
      login_Box.style.top = 25 + "vh";
      login_Box.style.left = 31 + "vw";
      login_Box.style.transition = "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)";

      window.setTimeout(function () {
        login_Ifo.style.visibility = "visible";
        login_Ifo.style.opacity = "1";
        login_Ifo.style.transition = "all 0.1s cubic-bezier(0.23, 1, 0.32, 1)";
        login_close.style.visibility = "visible";
        login_close.style.opacity = "1";
        login_close.style.transition =
          "all 0.1s cubic-bezier(0.23, 1, 0.32, 1)";
        lean.style.visibility = "visible";
        lean.style.opacity = "1";
        lean.style.transition = "all 0.1s cubic-bezier(0.23, 1, 0.32, 1)";
      }, 500);
    },
    LoginClose() {
      let login_Box = document.getElementById("login_Box");
      let login_Ifo = document.getElementById("login_Ifo");
      let login_close = document.getElementById("login_close");
      let lean = document.getElementById("lean");
      login_Ifo.style.visibility = "hidden";
      login_Ifo.style.opacity = "0";
      login_Ifo.style.transition = "all 0.1s cubic-bezier(0.23, 1, 0.32, 1)";
      login_close.style.visibility = "hidden";
      login_close.style.opacity = "0";
      login_close.style.transition = "all 0.1s cubic-bezier(0.23, 1, 0.32, 1)";
      lean.style.visibility = "hidden";
      lean.style.opacity = "0";
      lean.style.transition = "all 0.1s cubic-bezier(0.23, 1, 0.32, 1)";

      window.setTimeout(function () {
        login_Box.style.visibility = "hidden";
        login_Box.style.height = 55 + "px";
        login_Box.style.width = 126 + "px";
        login_Box.style.top = 48 + "vh";
        login_Box.style.left = 36.3 + "vw";
        login_Box.style.transition = "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
      }, 100);
    },
    ShowRegisBox() {
      let register_Box = document.getElementById("register_Box");
      let register_Ifo = document.getElementById("register_Ifo");
      let register_close = document.getElementById("register_close");
      let lean2 = document.getElementById("lean2");
      register_Box.style.visibility = "visible";
      register_Box.style.height = 400 + "px";
      register_Box.style.width = 580 + "px";
      register_Box.style.top = 22 + "vh";
      register_Box.style.left = 31 + "vw";
      register_Box.style.transition = "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)";

      window.setTimeout(function () {
        register_Ifo.style.visibility = "visible";
        register_Ifo.style.opacity = "1";
        register_Ifo.style.transition =
          "all 0.1s cubic-bezier(0.23, 1, 0.32, 1)";
        register_close.style.visibility = "visible";
        register_close.style.opacity = "1";
        register_close.style.transition =
          "all 0.1s cubic-bezier(0.23, 1, 0.32, 1)";
        lean2.style.visibility = "visible";
        lean2.style.opacity = "1";
        lean2.style.transition = "all 0.1s cubic-bezier(0.23, 1, 0.32, 1)";
      }, 500);
    },
    RegisterClose() {
      let register_Box = document.getElementById("register_Box");
      let register_Ifo = document.getElementById("register_Ifo");
      let register_close = document.getElementById("register_close");
      let lean2 = document.getElementById("lean2");
      register_Ifo.style.visibility = "hidden";
      register_Ifo.style.opacity = "0";
      register_Ifo.style.transition = "all 0.1s cubic-bezier(0.23, 1, 0.32, 1)";
      register_close.style.visibility = "hidden";
      register_close.style.opacity = "0";
      register_close.style.transition =
        "all 0.1s cubic-bezier(0.23, 1, 0.32, 1)";
      lean2.style.visibility = "hidden";
      lean2.style.opacity = "0";
      lean2.style.transition = "all 0.1s cubic-bezier(0.23, 1, 0.32, 1)";

      window.setTimeout(function () {
        register_Box.style.visibility = "hidden";
        register_Box.style.height = 55 + "px";
        register_Box.style.width = 122.5 + "px";
        register_Box.style.top = 48 + "vh";
        register_Box.style.left = 44.1 + "vw";
        register_Box.style.transition =
          "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
      }, 100);
    },
  },
};
</script>

<style lang="less" scoped>
body {
  margin: 0px;
  padding: 0px;
}

#app {
  width: 100vw;
  height: 100vh;
  background-image: url(./../assets/banana.jpg);
  background-size: 100vw 100vh;
  background-position: 0px 80px;
}

h1,
h2,
h3 {
  line-height: 1.3;
}

// 登录头部
#app #login_header {
  padding: 7vh 10vw;
  background: #fffeeb;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  // font: italic 2em Georgia, serif;
}

#app #login_header h1 {
  margin: 0;
  color: rgba(0, 0, 0, 0.54);
  font-weight: 300;
}

// 登录主页
#app .info {
  position: absolute;
  left: 36vw;
  top: 48vh;
}

h1,
h2,
h3,
p {
  font-weight: 300;
  margin: 0 0 2.4rem 0;
}

h1,
h2,
h3 {
  line-height: 1.3;
}

a {
  text-decoration: none;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
  font-size: 16px;
  text-align: center;
}

// 按钮
.modal__trigger {
  position: relative;
  display: inline-block;
  padding: 1.2rem 2.5rem;
  color: rgba(0, 0, 0, 0.54);
  line-height: 1;
  cursor: pointer;
  background: #fffeeb;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  user-select: none;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  border: 0px;
  margin-left: 5px;
  font-size: 18px;
  font-weight: 400;
}

.modal__trigger:hover {
  background: #f0f0d9;
}

// 按钮下方提示
.tip {
  // color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

// 登录模态框
#login_Box {
  width: 126px;
  height: 55px;
  position: absolute;
  top: 48vh;
  left: 36.3vw;
  // margin-left: calc(50% - 300px);
  // margin-top: calc(50vh - 200px);
  background: #fffeeb;
  visibility: hidden;
  border-radius: 0px;
  overflow: visible;
}

#login_close {
  border-radius: 50%;
  height: 35px;
  width: 35px;
  text-align: center;
  line-height: 35px;
  background-color: rgba(0, 0, 0, 0.23);
  color: #fff;
  border: 0px;
  cursor: pointer;
  position: absolute;
  top: -17.5px;
  right: -17.5px;
  font-size: 25px;
  font-weight: 500;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s !important;
}

#login_close:hover {
  background-color: rgba(0, 0, 0, 0.499);
}

#login_close svg {
  width: 35px;
  fill: #fff;
}

h1#lean {
  color: #7e7e7e;
  text-align: center;
  letter-spacing: -0.05em;
  line-height: 20px !important;
  margin: 18px 0px 10px 0px;
  // margin-bottom: 10px;
  height: 20px;
  visibility: hidden;
  opacity: 0;
}

h1#lean:before,
h1#lean:after {
  content: "";
  height: 1px;
  position: absolute;
  top: 47px;
  width: 35%;
}

h1#lean:after {
  background: rgb(126, 126, 126);
  background: linear-gradient(
    to right,
    rgba(126, 126, 126, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  right: 0px;
}

h1#lean:before {
  background: rgb(126, 126, 126);
  background: linear-gradient(
    to left,
    rgba(126, 126, 126, 1),
    rgba(255, 255, 255, 1)
  );
  left: 0px;
}

// 登录模态框内容
#login_Ifo {
  visibility: hidden;
  opacity: 0;
  padding: 0px 50px;
}

.login_icon {
  width: 25px;
  font-size: 18px !important;
}

.login_Ipt {
  margin: 20px 0px 20px 0px;
  border: 0px;
  outline: none;
  height: 30px;
  width: 400px;
  background: #fffeeb;
  border-bottom: 1px solid #7e7e7e !important;
  // border-bottom: linear-gradient(to left, rgba(126, 126, 126, 1), rgba(255, 255, 255, 1));
}

#login_Btn {
  height: 40px;
  width: 100px;
  background-color: #353b48;
  color: aliceblue;
  margin-left: calc(50% - 50px);
  margin-top: 20px;
  border-radius: 0px;
}

// 注册界面
#register_Box {
  width: 122.5px;
  height: 55px;
  position: absolute;
  top: 48vh;
  left: 44.1vw;
  // margin-left: calc(50% - 300px);
  // margin-top: calc(50vh - 200px);
  background: #fffeeb;
  visibility: hidden;
  border-radius: 0px;
  overflow: visible;
}

#register_close {
  border-radius: 50%;
  height: 35px;
  width: 35px;
  text-align: center;
  line-height: 35px;
  background-color: rgba(0, 0, 0, 0.23);
  color: #fff;
  border: 0px;
  cursor: pointer;
  position: absolute;
  top: -17.5px;
  right: -17.5px;
  font-size: 25px;
  font-weight: 500;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s !important;
}

#register_close:hover {
  background-color: rgba(0, 0, 0, 0.499);
}

#register_close svg {
  width: 35px;
  fill: #fff;
}

h1#lean2 {
  color: #7e7e7e;
  text-align: center;
  letter-spacing: -0.05em;
  line-height: 20px !important;
  margin: 18px 0px 10px 0px;
  // margin-bottom: 10px;
  height: 20px;
  visibility: hidden;
  opacity: 0;
}

h1#lean2:before,
h1#lean2:after {
  content: "";
  height: 1px;
  position: absolute;
  top: 47px;
  width: 35%;
}

h1#lean2:after {
  background: rgb(126, 126, 126);
  background: linear-gradient(
    to right,
    rgba(126, 126, 126, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  right: 0px;
}

h1#lean2:before {
  background: rgb(126, 126, 126);
  background: linear-gradient(
    to left,
    rgba(126, 126, 126, 1),
    rgba(255, 255, 255, 1)
  );
  left: 0px;
}

#register_Ifo {
  visibility: hidden;
  opacity: 0;
  padding: 0px 50px;
}
</style>
