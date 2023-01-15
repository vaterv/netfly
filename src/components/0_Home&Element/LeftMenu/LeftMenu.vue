<template>
  <!-- 侧边栏 -->
  <el-menu
    background-color="#292929"
    text-color="rgb(206, 206, 206)"
    active-text-color="#fff"
    id="menu_box"
    :default-openeds="['2']"
    :router="true"
  >
    <template v-for="item in list">
      <el-menu-item
        :key="item.id"
        v-if="item.submenus.length === 0"
        :route="{ path: item.url }"
        :dat-id="item.url"
        :index="item.id + ''"
      >
        {{ item.name }}
      </el-menu-item>
      <el-submenu :key="item.id + 0" :index="item.id + ''" v-else>
        <template slot="title">{{ item.name }}</template>

        <!-- 第二循环 -->
        <!-- <el-menu-item v-if="itemm.submenus.length === 0">
                    {{ itemm.name }}
                    </el-menu-item> -->
        <template
          :style="{ height: item.height }"
          v-for="itemm in item.submenus"
        >
          <el-menu-item
            :key="itemm.id"
            v-if="itemm.submenus.length === 0"
            :route="{ path: itemm.url }"
            :index="itemm.id + ''"
          >
            {{ itemm.name }}
          </el-menu-item>
          <el-submenu :key="itemm.id + 0" :index="itemm.id + ''" v-else>
            <template slot="title">
              {{ itemm.name }}
            </template>

            <!-- 第三循环 -->
            <el-menu-item
              :style="{ height: item.height }"
              v-for="itemmm in itemm.submenus"
              :key="itemmm.id"
              :route="{ path: itemmm.url }"
              :index="itemmm.id + ''"
            >
              {{ itemmm.name }}
            </el-menu-item>
          </el-submenu>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: "LeftMenu",
  data() {
    return {
      isCollapse: true,
    };
  },
  props: {
    list: Array,
  },
  methods: {
    // handleOpen(key, keyPath) {
    //     console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //     console.log(key, keyPath);
    // }
  },
};
</script>

<style>
</style>