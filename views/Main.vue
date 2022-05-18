<template>
  <div>
    <el-container>
      <el-header height="80px">
        <common-header></common-header>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <common-aside></common-aside>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "@/components/CommonAside";
import CommonHeader from "@/components/CommonHeader";
export default {
  name: "Main",
  data() {
    return {}
  },
  components:{
    CommonAside,
    CommonHeader
  }
}
</script>

<style lang="less" scoped>
.el-header{
  color: #333;
  line-height: 80px;
  background-color: #409EFF;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  padding-top: 0;
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 160px;
  border-left-style:solid;
  border-left-width: 2px;
  border-left-color:#E4E7ED;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

</style>