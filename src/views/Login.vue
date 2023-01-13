<template>
  <div id="app">
    <div>
      <el-card id="loginBox">
        <el-form label="活动名称">
          <el-input class="loginIpt" type="text" v-model="account" placeholder="请输入内容"></el-input>
          <el-input class="loginIpt" type="password" v-model="password" placeholder="请输入内容"></el-input>
        </el-form>


        <el-row>
          <el-button type="primary" v-on:click="login()">主要按钮</el-button>
        </el-row>
      </el-card>
    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      account: '',
      password: '',
      account: 'buzz',
      password: '123456',
      isLogin : true,
 
  }
 
  },
   methods:{
    login() {
      if (this.account === 'buzz' && this.password === '123456') {
        this.$router.replace('/main')
      }
    }
  }
  }

</script>

<style lang="less">
#loginBox {
  width: 600px;
  height: 400px;
  margin-left: calc(50% - 300px);
  margin-top: calc(50vh - 200px);
}

;

.loginIpt {
  margin: 20px 0px 20px 0px;
}
</style>
