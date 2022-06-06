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
            <el-dropdown-item @click.native="goMain">首页</el-dropdown-item>
            <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
  </header>
</template>

<script>
import {logout} from "@/api/login";

export default {
  name: "CommonHeader",
  data(){
    return{
      userImg:require('@/static/img_1.png')
    }
  },
  methods:{
    logOut(){
      const _this=this
      console.log(this.$store.state.user.token)
      logout(this.$store.state.user.token).then((res)=>{
        _this.$store.commit('clearToken')
        _this.$message.success("退出成功")
        _this.$router.push('/login')
      })
    },
    goMain(){
      this.$router.push('/')
    }
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