<template>
  <el-row>
    <el-card>
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="账户" prop="userName" style="text-align: center">
          <el-input type="text" v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login('ruleForm')">提交</el-button>
          <el-button @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>
<script>
import {insertDoctor} from "@/api/doctor";
import {login} from "@/api/login";

export default {
  name: 'login',
  data() {
    return {
      ruleForm: {
        userName: '',
        password: '',
      },
      rules: {
        userName: [
          {trigger: 'blur', message: '请输入用户名', required: true}
        ],
        password: [
          {trigger: 'blur', message: '请输入密码', required: true}
        ]
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        const _this=this
        if (valid) {
          login(this.ruleForm.userName,this.ruleForm.password).then((res) => {
            this.$store.commit('setToken', res.data)
            this.$router.push({name: 'Home'})
            _this.$message.success("登录成功")
          },(rej)=>{

          })
        } else {
          _this.$message.error("登录失败")
          return false;
        }
      });
    },
    register() {
      this.$router.push({
        path: '/register'
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

.el-form {
  margin: auto;
  width: 500px;
  height: 250px;
}

.el-row {
  margin-top: 200px;
  text-align: center;
}

.el-card {
  width: 600px;
  height: 350px;
  margin-top: 0px;
  margin: auto;
  text-align: center;
}

.el-form-item {
  margin-top: 25px;
  width: 500px;
  text-align: center;
}

.el-input {
  width: 400px;
  margin-right: 20px;
}

</style>