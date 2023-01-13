<template>
  <div>



    <el-container style="border:0px;margin:0px,">
      <el-header>
        <!-- 顶部导航 -->
        <HeaderTop class="home">
        </HeaderTop>
      </el-header>

      <el-container style="height: calc(100vh - 60px); border: 0px;">
        <el-aside style="background-c r: rgb(255, 255, 255);border: 0px;">
          <LeftMenu v-bind:list="menus"></LeftMenu>

        </el-aside>


        <!-- 右边内容 -->
        <el-main>
        <router-view>

        </router-view>

        </el-main>

      </el-container>

    </el-container>

  </div>
</template>
<script>
import HeaderTop from '@/components/0_Home&Element/HeaderTop/HeaderTop.vue'
import LeftMenu from '@/components/0_Home&Element/LeftMenu/LeftMenu.vue'
import Home from '@/components/0_Home&Element/Home/Home.vue'

export default {
  name: 'UserList',
  components: {
    HeaderTop,
    LeftMenu,
    Home,
  },
  data() {
    return {

      //左侧菜单数据
      menus: [
        { id: 1, name: "ERP首页", url: "/main/home", state: 1, submenus: [] },
        {
          id: 2, name: "基础信息", url: "/", state: 1, submenus: [
            {
              id: 21, name: "公司架构", url: "/ ", state: 2, submenus: [
                { id: 211, name: "部门设置", url: "/main", state: 2, submenus: [] },
                { id: 212, name: "职务设置", url: "/ ", state: 2, submenus: [] },
                { id: 213, name: "员工列表", url: "/ ", state: 2, submenus: [] },
                { id: 214, name: "权限管理", url: "/ ", state: 2, submenus: [] },
              ]
            },
            { id: 22, name: "物流公司", url: "/ ", state: 2, submenus: [] },
            {
              id: 23, name: "往来单位管理", url: "/ ", state: 2, submenus: [
                { id: 231, name: "供应商管理", url: "/ ", state: 2, submenus: [] },
                { id: 232, name: "供应商价格", url: "/ ", state: 2, submenus: [] },
                { id: 233, name: "客户管理", url: "/ ", state: 2, submenus: [] },
              ]
            },

          ]
        },
        {
          id: 3, name: "库存管理", url: "/", state: 1, submenus: [
            { id: 31, name: "仓库设置", url: "/ ", state: 2, submenus: [] },
            { id: 32, name: "库位管理", url: "/ ", state: 2, submenus: [] },
            { id: 33, name: "采购入库", url: "/ ", state: 2, submenus: [] },
            { id: 34, name: "采购出库", url: "/ ", state: 2, submenus: [] },
            { id: 35, name: "库位调整", url: "/ ", state: 2, submenus: [] },
            { id: 36, name: "库存盘点", url: "/ ", state: 2, submenus: [] },
            { id: 37, name: "出入库查询", url: "/  ", state: 2, submenus: [] },
            { id: 38, name: "库存查询", url: "/  ", state: 2, submenus: [] },

          ]
        },
        {
          id: 4, name: "协同办公", url: "/", state: 1, submenus: [
            { id: 41, name: "审批管理", url: "/ ", state: 2, submenus: [] },
            { id: 42, name: "我的审批", url: "/ ", state: 2, submenus: [] },

          ]
        },
        {
          id: 5, name: "商品管理", url: "/", state: 1, submenus: [
            { id: 51, name: "商品资料", url: "/ ", state: 2, submenus: [] },
            { id: 52, name: "商品分类", url: "/ ", state: 2, submenus: [] },
            { id: 53, name: "商品产地", url: "/ ", state: 2, submenus: [] },
            { id: 54, name: "店铺管理", url: "/ ", state: 2, submenus: [] },

          ]
        },
        {
          id: 6, name: "订单采购", url: "/", state: 1, submenus: [
            {
              id: 61, name: "订单售前", url: "/ ", state: 2, submenus: [
                { id: 62, name: "代发货新订单", url: "/ ", state: 2, submenus: [] },
                { id: 63, name: "已发货订单", url: "/ ", state: 2, submenus: [] },
              ]
            },
            { id: 64, name: "订单售后", url: "/ ", state: 2, submenus: [] },
            { id: 65, name: "订单查询", url: "/ ", state: 2, submenus: [] },

          ]
        },
        {
          id: 7, name: "采购管理", url: "/", state: 1, submenus: [
            { id: 71, name: "采购计划单", url: "/ ", state: 2, submenus: [] },
            { id: 72, name: "采购订单", url: "/ ", state: 2, submenus: [] },
            { id: 73, name: "采购退货单", url: "/ ", state: 2, submenus: [] },
            { id: 74, name: "订单查询", url: "/ ", state: 2, submenus: [] },

          ]
        },
      ],
    }
  },
  methods: {

  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.home {
  width: 100%;
  height: 50px;
  background-color: #ffffff;

}

;

.li1 {
  height: 30px;
  padding-left: 10px;

}

.li2 {
  height: 30px;
  padding-left: 40px;
}
</style>
