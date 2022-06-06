<template>
  <div>
    <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <!--                :default-active="activeIndex"-->
      <el-menu-item @click="clickMenu(item)" v-for="(item,index) in noChildren" :index="item.path" :key="item.path">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>

      <el-submenu v-for="(item,index) in hasChildren" :index="item.name" :key="item.name">
        <template slot="title">
          <i :class="item.icon"/>
          <span slot="title">{{ item.label }}</span>
        </template>

        <el-menu-item @click="clickMenu(subItem)" v-for="(subItem,subIndex) in item.children" :index="subItem.path"
                      :key=subItem.path>
          <i :class="subItem.icon"/>
          {{ subItem.label }}
        </el-menu-item>

      </el-submenu>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.el-menu {
  height: 100%;
  text-align: left;
  color: #303133;
  border-color: #E4E7ED;
  border-style: solid;
  min-width: 250px;

  h3 {
    color: white;
    text-align: center;
    line-height: 48px;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
  min-height: 800px;
  border: #D3DCE6;
}

el-menu-item {

}
</style>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    clickMenu(item) {
      this.$router.push({
        path: item.path
      })
    },
    handleMenu() {
      this.$store.commit('collapseMenu')
    }
  },
  computed: {
    noChildren() {
      return this.$store.state.menu.menu.filter(item => !item.children)
    },
    hasChildren() {
      return this.$store.state.menu.menu.filter(item => item.children)
    },
  }
}
</script>