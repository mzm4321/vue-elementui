<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4"><div class="grid-content bg-purple"><el-input v-model="query" placeholder="通过患者姓名搜索" autocomplete></el-input></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-search">搜索</el-button></div></el-col>
    </el-row>
    <el-table
        :data="patients"
        style="width: 100%">
      <el-table-column
          label="编号"
          width="220"
      >
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.patientId }}</span>
        </template>
      </el-table-column>


      <el-table-column
          label="患者姓名"
          width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.patientName }}</span>
        </template>
      </el-table-column>

      <el-table-column
          label="性别"
          width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.patientSex }}</span>
        </template>
      </el-table-column>

      <el-table-column
          label="年龄"
          width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.patientAge }}</span>
        </template>
      </el-table-column>

      <el-table-column
          label="患者病史"
          width="180">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleHistory(scope.row.patientId)">更新
          </el-button>
        </template>
      </el-table-column>


      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.row.patientId)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.patientId)">删除
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
    <el-dialog
        title="患者病史"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-input type="textarea" v-model="history" :autosize="{ minRows: 12, maxRows: 18}"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateHistory()">确 定</el-button>
    </span>
    </el-dialog>

  </div>
</template>

<script>
import {deletePatientbyId, getPatientbyId, getPatients, queryPatients, updateHistory} from "@/api/patient";

export default {

  data() {
    return {
      query:'',
      pageSize: '1',
      total: '11',
      nowId:'10',
      departId:0,
      history:"",
      flag:true,
      dialogVisible: false,
      editVisible:false,
      patients: [{
        patientId: Number,
        patientName: String,
        patientAge: String,
        history: String,
        patientSex:String,
      }
      ],
    }
  },
  watch: {
    flag: function () {
      const _this=this
      getPatients(this.patientId).then((res) => {
        _this.patients = res.data
      })
    },
    query: function(){
      if(this.query.length>0){
        queryPatients(this.query).then((res)=>{
          this.patients = res.data
        })
      }else{
        getPatients(this.patientId).then((res) => {
          this.patients = res.data
        })
      }
    }
  },

  created() {
    const _this = this
    getPatients().then((res) => {
      _this.patients = res.data
    })
  },
  methods: {
    handleDelete(id) {
      const _this = this
      this.$confirm('您确认删除吗？')
          .then(_ => {
            deletePatientbyId(id).then((res) => {
              _this.$message.success('删除成功')
              _this.flag = !_this.flag
            })
          })
          .catch(_ => {
          });
    },
    handleHistory(id) {
      this.dialogVisible = true
      const _this = this
      this.nowId = id
      getPatientbyId(id).then((res) => {
        _this.history = res.data.history
      })
    },
    updateHistory() {
      this.dialogVisible = false
      const _this = this
      updateHistory(this.nowId, this.history).then((res) => {
        _this.$message.success('更新成功')
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    handleEdit(patientId){
      this.$router.push({path:`/patient/update/${patientId}`})
    }
  }
}
</script>


<style scoped>
.el-button {
  text-align: left;
}
</style>