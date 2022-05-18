<template>
  <div>
    <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse"
    >
      <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
        <i :class="item.icon" ></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>

      <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item v-for="(subItem,subIndex) in item.children" :key="subItem.path">
          <el-menu-item :index="subIndex"><i :class="subItem.icon"></i>{{subItem.name}}</el-menu-item>
        </el-menu-item>
      </el-submenu>
      <el-button @click="handleMenu">开关侧栏</el-button>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.el-menu{
  height: 100%;
  text-align: left;
  color: #303133;
  border-color: #E4E7ED;
  border-style: solid;
  min-width: 250px;
  h3{
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
el-menu-item{

}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menu: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 'el-icon-s-home',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'home',
          label: '商品管理',
          icon: 'el-icon-video-play',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'el-icon-user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'el-icon-location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'el-icon-setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'el-icon-setting',
              url: 'Other/PageTwo'
            },
          ]
        },
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
      this.$router.push({
        name:item.name
      })
    },
    handleMenu(){
      this.$store.commit('collapseMenu')
    }
  },
  computed:{
    noChildren(){
      return this.menu.filter(item => !item.children)
    },
    hasChildren(){
      return this.menu.filter(item => item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse //通过Vuex中store组件改变侧栏开关
    }
  }
}
</script>