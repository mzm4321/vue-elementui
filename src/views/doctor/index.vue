<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="selectDepart(activeName)">
      <el-tab-pane label="全部" name=0></el-tab-pane>
      <el-tab-pane label="内科" name=1></el-tab-pane>
      <el-tab-pane label="外科" name=2></el-tab-pane>
      <el-tab-pane label="急诊科" name=3></el-tab-pane>
    </el-tabs>
    <el-table
        :data="doctors"
        style="width: 100%">
      <el-table-column
          label="编号"
          width="220"
      >
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.doctorId }}</span>
        </template>
      </el-table-column>

      <el-table-column
          label="部门"
          width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.departName }}</span>
        </template>
      </el-table-column>

      <el-table-column
          label="医生姓名"
          width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.doctorName }}</span>
        </template>
      </el-table-column>

      <el-table-column
          label="职称"
          width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column
          label="年龄"
          width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.doctorAge }}</span>
        </template>
      </el-table-column>

      <el-table-column
          label="性别"
          width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.doctorSex }}</span>
        </template>
      </el-table-column>


      <el-table-column label="编辑信息">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleUpdate(scope.row.doctorId)">详细信息
          </el-button>
        </template>
      </el-table-column>

      <el-table-column label="删除操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.doctorId)">删除信息
          </el-button>
        </template>
      </el-table-column>

    </el-table>
<!--    <el-pagination-->
<!--        background-->
<!--        layout="prev, pager, next"-->
<!--        :page-size="pageSize"-->
<!--        :total="total"-->
<!--        @current-change="page">-->
<!--    </el-pagination>-->
  </div>
</template>

<script>
import {deleteDoctorbyId, getDoctors, getDoctorsbyDepartId} from "@/api/doctor";
export default {

  data() {
    return {
      pageSize: '1',
      total: '11',
      nowId:'10',
      departId:0,
      activeName: 0,
      flag:true,
      dialogVisible: false,
      prescription: "",
      doctors: [{
        doctorId: Number,
        doctorName: String,
        doctorAge: String,
        history: String,
        title:String,
        stop:Number,
        hostpitalTime:"",
        doctorDetail:String,
        doctorSex:String,
        doctorImg:String,
        departName:String
      }
      ],
    }
  },
  watch: {
    flag: function () {
      const _this=this
      getDoctorsbyDepartId(this.departId).then((res) => {
        _this.doctors = res.data
      })
    }
  },

  created() {
    const _this = this
    getDoctors().then((res) => {
      _this.doctors = res.data
    })
  },
  methods: {
    handleDelete(id) {
      const _this = this
      this.$confirm('您确认删除吗？')
          .then(_ => {
            deleteDoctorbyId(id).then((res) => {
              _this.$message.success('删除成功')
              _this.flag=!_this.flag
            })
          })
          .catch(_ => {
          });
    },
    selectDepart(id) {
      const _this = this
      this.departId = id
      this.flag=!this.flag
    },
    handleUpdate(doctorId){
      this.$router.push({path:`/doctor/update/${doctorId}`});
    }
  },
}
</script>


<style scoped>
.el-button {
  text-align: left;
}
</style>