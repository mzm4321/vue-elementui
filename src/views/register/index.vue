<template>
  <el-row>
    <el-card>
      <div slot="header" class="clearfix">
        <span>注册</span>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="账户" prop="checkUserName">
          <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPassword">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        userName: '',
        password: '',
      },
      rules: {
        checkUserName: [
          { trigger: 'blur',message: '请输入用户名',required:true }
        ],
        checkPassword: [
          { trigger: 'blur',message: '请输入密码',required:true }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    register(){
      this.$router.push({
        path:'/register'
      })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.el-form{
  width: 500px;
  height: 250px;
  text-align: left;
  margin-top: 50px;
  width: 50%;
}
.el-row {
  margin-top: 200px;
  text-align: center;
}
.el-card{
  width: 600px;
  height: 350px;
  margin-top: 0px;
  margin: auto;
  text-align: center;
}
.el-form-item{
  margin-top: 25px;
  width: 500px;
  text-align: center;
}
.el-input{
  width: 400px;
  margin-right: 20px;
}

</style>