<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="患者编号">
        <el-tag  >{{patientId}}</el-tag>
      </el-form-item>
      <el-form-item label="患者名称" prop="patientName">
        <el-input v-model="ruleForm.patientName"></el-input>
      </el-form-item>
      <el-form-item label="患者年龄" prop="patientAge">
        <el-input v-model="ruleForm.patientAge"></el-input>
      </el-form-item>
      <el-form-item label="患者性别" prop="patientSex">
        <el-select v-model="ruleForm.patientSex" placeholder="请选择患者性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="患者病史" prop="history" >
        <el-input type="textarea" v-model="ruleForm.history" :autosize="{ minRows: 12, maxRows: 18}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
        <el-button @click="cancelForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
.el-input{
  width: 46%
}
</style>
<script>
import {deletePatientbyId, getPatientbyId, getPatients, insertPatient, updatePatient} from "@/api/patient";

export default {
  props:{
    patientId:''
  },
  data() {
    return {
      ruleForm: {
        patientName: '',
        patientAge: '',
        patientSex: '',
        history:''
      },
      rules: {
        patientName: [
          { required: true, message: '请输入患者名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        patientAge: [
          { required: true, message: '请输入患者年龄', trigger: 'blur' }
        ],
        patientSex: [
          { required: true, message: '请选择患者性别', trigger: 'change' }
        ],
      }
    };
  },
  created() {
    const _this = this
    getPatientbyId(_this.patientId).then((res) => {
      _this.ruleForm = res.data
    })
  },
  methods: {
    submitForm(formName) {
      const _this=this
        this.$confirm('您确认修改吗？')
            .then(_ => {
              const _thiss=_this
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  updatePatient(this.patientId,this.ruleForm.patientName, this.ruleForm.patientAge, this.ruleForm.patientSex,this.ruleForm.history).then((res) => {
                    this.$message.success("修改成功")
                    this.$router.push("/patient")
                  })
                } else {
                  this.$message.error("修改失败")
                  return false;
                }
              })
            })
            .catch(_ => {
            });
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    cancelForm(){
      this.$router.push("/patient")
    }
  }
}
</script>