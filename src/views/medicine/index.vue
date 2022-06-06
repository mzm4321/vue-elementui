<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-input v-model="query" placeholder="通过药品名搜索" autocomplete></el-input>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
        :data="medicines"
        style="width: 100%">
      <el-table-column
          label="编号"
          width="220"
      >
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.medicineId }}</span>
        </template>
      </el-table-column>


      <el-table-column
          label="药品名"
          width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.medicineName }}</span>
        </template>
      </el-table-column>

      <el-table-column
          label="数量"
          width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.medicineNum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.row.medicineId)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.medicineId)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog title="药品信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form style="margin-top: 0px;margin-left: 40px;width: 80%">
        <el-form-item label="药品编号:" style="width: 100%">
          <el-tag>{{ medicine.medicineId }}</el-tag>
        </el-form-item>
        <el-form-item label="药品名称:" style="width: 100%">
          <el-input v-model="medicine.medicineName" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="药品数量:" style="width: 100%" >
          <el-input v-model="medicine.medicineNum" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="doUpdateMedicine()">更新</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {deletePatientbyId, getPatientbyId, getPatients, queryPatients, updateHistory} from "@/api/patient";
import {deleteMedicinebyId, getMedicinebyId, getMedicines, queryMedicines, updateMedicine} from "@/api/medicine";

export default {

  data() {
    return {
      nowId: '10',
      query:'',
      departId: 0,
      history: "",
      flag: true,
      dialogVisible: false,
      medicines: [{
        medicineId: '',
        medicineName: '',
        medicineNum: ''
      }
      ],
      medicine: {
        medicineId: '',
        medicineName: '',
        medicineNum: ''
      }
    }
  },
  watch: {
    flag: function () {
      const _this = this
      getMedicines().then((res) => {
        _this.medicines = res.data
      })
    },
    query: function(){
      if(this.query.length > 0){
        queryMedicines(this.query).then((res)=>{
          this.medicines = res.data
        })
      }else {
        getMedicines().then((res) => {
          this.medicines = res.data
        })
      }
    }
  },

  created() {
    const _this = this
    getMedicines().then((res) => {
      _this.medicines = res.data
    })
  },
  methods: {
    handleDelete(id) {
      const _this = this
      this.$confirm('您确认删除吗？')
          .then(_ => {
            deleteMedicinebyId(id).then((res) => {
              _this.$message.success('删除成功')
              _this.flag = !_this.flag
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
    handleEdit(medicineId) {
      const _this = this
      getMedicinebyId(medicineId).then((res) => {
        _this.medicine = res.data
        _this.dialogVisible = true
      })
    },
    doUpdateMedicine() {
      const _this = this
      console.log(this.medicine.medicineId)
      updateMedicine(this.medicine.medicineId, this.medicine.medicineName, this.medicine.medicineNum).then((res) => {
        _this.$message.success("更新成功")
        _this.dialogVisible = false
        _this.flag=!_this.flag
      })
    },
  }
}
</script>


<style scoped>
.el-button {
  text-align: left;
}
</style>