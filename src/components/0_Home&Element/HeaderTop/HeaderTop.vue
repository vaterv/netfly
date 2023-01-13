<template>
  <div class="head">
    <div class="account">
        <i class="fa fa-user" style="color:green" aria-hidden="true"></i>
        <span> buzz,欢迎您。</span>
    </div>
    <div class="logo">
      <span>果时REP管理系统</span>
    </div>
    <div>
      <div class="login">
        <i class="fa fa-user-circle"></i>
         <a href="/"> 账户设置</a>    
      </div>
      <div class="login">
        <i class="fa fa-sign-out"></i>
         <a href="/"> 退出登录</a>    
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderTop",
  data() {
    return {};
  },
  props: {
    list: Array,
  },
};
</script>

<style>
.account{
  float: left;
  color: rgb(0, 0, 0);
  line-height: 50px;
  margin-left: 10px;
}
.logo{
  float: left;
  color: rgb(0, 0, 0);
  margin-left: 450px;
  font-size: 16px;
  font-weight: 600;
  line-height: 50px;

}
.login{
  float: right;
  line-height: 50px;
  color:rgb(0, 0, 0); 
  margin-right: 20px; 
}
.login > a{
  color:rgb(0, 0, 0);  
  text-decoration: none;
}
</style>
