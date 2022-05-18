<template>
  <header>
    <div class="l-content">
      <h3>医院管理系统</h3>
    </div>
    <div class="r-content">
        <el-dropdown trigger="click" size="mini">
          <span>
            <img :src="userImg" class="user">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: "CommonHeader",
  data(){
    return{
      userImg:require('../assets/logo.png')
    }
  },
  methods:{
  }
}
</script>

<style lang="less" scoped>
header{
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content{
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 22px;
  color: white;
}
.r-content{
  .user{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
    margin-top: 25px;
  }
}

</style>