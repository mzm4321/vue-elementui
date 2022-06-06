<template>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="旧密码" prop="oldPassword">
      <el-input v-model="ruleForm.oldPassword" type="password"></el-input>
    </el-form-item>

    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="ruleForm.newPassword" type="password"></el-input>
    </el-form-item>

    <el-form-item label="重复密码" prop="repeatPassword">
      <el-input v-model="ruleForm.repeatPassword" type="password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import {addMedicine, getMedicines} from "@/api/medicine";
import {updatePassword} from "@/api/user";

export default {
  data() {
    return {
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        repeatPassword:''
      },
      rules: {
        oldPassword:[
          { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        newPassword:[
          { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
        repeatPassword:[
          { required: true, message: '重复密码不能为空', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if(valid){
          if(this.ruleForm.newPassword!=this.ruleForm.repeatPassword){
            _this.$message.warning("两次密码不一致")
          }else{
            updatePassword(this.ruleForm.oldPassword,this.ruleForm.newPassword).then((res) => {
              _this.$message.success("修改成功")
            })
          }
        }else {
          _this.$message.error("修改失败")
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