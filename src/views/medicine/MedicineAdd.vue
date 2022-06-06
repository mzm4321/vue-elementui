<template>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="药品名" prop="medicineName">
      <el-input v-model="ruleForm.medicineName"></el-input>
    </el-form-item>

    <el-form-item label="数量" prop="medicineNum">
      <el-input v-model="ruleForm.medicineNum"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import {addMedicine, getMedicines} from "@/api/medicine";

export default {
  data() {
    return {
      ruleForm: {
        medicineName: '',
        medicineNum: ''
      },
      rules: {
        medicineName:[
          { required: true, message: '药品名不能为空', trigger: 'blur' }
        ],
        medicineNum:[
          { required: true, message: '数量不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if(valid){
          addMedicine(this.ruleForm.medicineName,this.ruleForm.medicineNum).then((res) => {
            _this.$message.success("入库成功")
          })
        }else {
          _this.$message.warning("入库失败")
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>