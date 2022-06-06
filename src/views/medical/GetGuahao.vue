<template>
  <div>
    <el-table
        :data="medicals"
        style="width: 100%">
      <el-table-column
          label="编号"
          width="250">
        <template slot-scope="scope">
          <span style="">{{ scope.row.medicalId }}</span>
        </template>
      </el-table-column>

      <el-table-column
          label="患者姓名"
          width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.patientName }}</span>
        </template>
      </el-table-column>

      <el-table-column
          label="医生姓名"
          width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.doctorName }}</span>
        </template>
      </el-table-column>

      <el-table-column
          label="日期"
          width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column
          label="处方"
          width="180">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handlePrescription(scope.row.medicalId)">查看

          </el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.medicalId)">删除信息
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
        title="编辑处方"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-input type="textarea" v-model="prescription" :autosize="{ minRows: 12, maxRows: 18}"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updatePrescription()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {getGuahao} from "@/api/medical";
import {getGuahaobyId} from "@/api/medical";
import {updatePrescription} from "@/api/medical";
import {deleteGuahaobyId} from "@/api/medical";

export default {

  data() {
    return {
      pageSize: '1',
      total: '11',
      nowId: '10',
      dialogVisible: false,
      prescription: String,
      flag: false,
      medicals: [{
        medicalId: String,
        patientName: String,
        doctorName: String,
        date: String,
      }
      ]
    }
  },
  watch: {
    flag: function () {
      const _this = this
      getGuahao().then((res) => {
        _this.medicals = res.data
      })
    }
  },

  created() {
    const _this = this
    getGuahao().then((res) => {
      _this.medicals = res.data
    })
  },
  methods: {
    handleDelete(id) {
      const _this = this
      this.$confirm('您确认删除吗？')
          .then(_ => {
            deleteGuahaobyId(id).then((res) => {
              _this.$message.success('删除成功')
              _this.flag=!_this.flag
            })
          })
          .catch(_ => {
          });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    handlePrescription(id) {
      this.dialogVisible = true
      const _this = this
      this.nowId = id
      getGuahaobyId(id).then((res) => {
        _this.prescription = res.data.prescription
      })
    },
    updatePrescription() {
      this.dialogVisible = false
      const _this = this
      updatePrescription(this.nowId, this.prescription).then((res) => {
      })
    }
  },
}
</script>


<style scoped>
.el-button {
  text-align: left;
}
</style>