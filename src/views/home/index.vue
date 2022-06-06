<template>
  <div>
    <el-row :gutter="150" >
      <el-col :span="180">
        <div>
          <el-row>
            <el-col>
              <el-card :body-style="{ padding: '0px' }">
                <img :src="user.avatar" class="image">
                <div style="padding: 20px;">
                  <span style="margin-top: 0px">{{user.nickname}}</span>
                  <div class="bottom clearfix">
                    <span class="time">当前时间：</span>
                    <time class="time">{{ currentDate }}</time>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <el-col :span="150">
        <h2>欢迎来到医院管理系统，您的身份是{{user.role}}</h2>
        <div id="drawPic" style="width: 800px;height:550px;"></div>
      </el-col>
    </el-row>

  </div>
</template>

<style scoped>
.el-row{
  margin-top: 20px;
}
.el-card{
  width: 270px;
  height: 635px;
  margin-top: 10px;
  margin-left: 20px;

}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 270px;
  height:480px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>

<script>
import * as echarts from 'echarts';
import {getNowUser} from "@/api/user";


export default {
  data() {
    return {
      currentDate: new Date(),
      user:{
        id:'',
        nickname:'',
        role:'',
        avatar:''
      },
    }
  },
  created() {
    getNowUser().then((res)=>{
      this.user = res.data;
      console.log(this.user)
    })
  },
  methods:{
    draw(){
      var myChart = echarts.init(document.getElementById('drawPic'));
// 绘制图表
      myChart.setOption({
        title: {
          text: '近期医院门诊量'
        },
        tooltip: {},
        xAxis: {
          data: ['周一', '周二', '周三', '周四', '周五', '周六','周日']
        },
        yAxis: {},
        series: [
          {
            name: '门诊量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20,10,20]
          }
        ]
      });
    }
  },
  mounted() {
    this.draw();
  }
}
</script>