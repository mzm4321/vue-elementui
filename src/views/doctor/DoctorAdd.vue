<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="医生名称：" prop="doctorName">
        <el-input v-model="ruleForm.doctorName"></el-input>
      </el-form-item>
      <el-form-item label="医生年龄：" prop="doctorAge">
        <el-input v-model="ruleForm.doctorAge"></el-input>
      </el-form-item>
      <el-form-item label="所属科室：" prop="departId">
        <el-select v-model="ruleForm.departId" placeholder="请选择医生科室">
          <el-option label="内科" value=1></el-option>
          <el-option label="外科" value=2></el-option>
          <el-option label="急诊科" value=3></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医生学历：" prop="history">
        <el-select v-model="ruleForm.history" placeholder="请选择医生学历">
          <el-option label="专科" value="专科"></el-option>
          <el-option label="本科" value="本科"></el-option>
          <el-option label="硕士" value="硕士"></el-option>
          <el-option label="博士" value="博士"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医生性别：" prop="doctorSex">
        <el-select v-model="ruleForm.doctorSex" placeholder="请选择医生性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否停诊：" prop="stop">
        <el-switch v-model="ruleForm.stop"></el-switch>
      </el-form-item>
      <el-form-item label="出诊时间：" prop="hospitalTime">
        <el-checkbox-group v-model="ruleForm.hospitalTime">
          <el-checkbox label="星期一" name="hospitalTime"></el-checkbox>
          <el-checkbox label="星期二" name="hospitalTime"></el-checkbox>
          <el-checkbox label="星期三" name="hospitalTime"></el-checkbox>
          <el-checkbox label="星期四" name="hospitalTime"></el-checkbox>
          <el-checkbox label="星期五" name="hospitalTime"></el-checkbox>
          <el-checkbox label="星期六" name="hospitalTime"></el-checkbox>
          <el-checkbox label="星期天" name="hospitalTime"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="医生职称：" prop="title">
        <el-radio-group v-model="ruleForm.title">
          <el-radio label="主任医师"></el-radio>
          <el-radio label="副主任医师"></el-radio>
          <el-radio label="主治医师"></el-radio>
          <el-radio label="住院医师"></el-radio>
          <el-radio label="实习医师"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="医生图片：">
        <el-upload
            class="upload-demo"
            action="http://localhost:8081/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="信息描述：" prop="doctorDetail">
        <el-input type="textarea" v-model="ruleForm.doctorDetail"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
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
import {insertDoctor} from "@/api/doctor";
import {upload} from "@/api/upload";

export default {
  data() {
    return {
      fileList: [
      ],
      ruleForm: {
        doctorId: '',
        doctorName: '',
        doctorAge: '',
        history: '',
        title:'',
        stop:false,
        hospitalTime:[],
        doctorDetail:'',
        doctorSex:'',
        doctorImg:'',
        departId:''
      },
      rules: {
        doctorName: [
          { required: true, message: '请输入医生名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        doctorAge: [
          { required: true, message: '请输入医生年龄', trigger: 'blur' }
        ],
        history: [
          { required: true, message: '请选择医生学历', trigger: 'change' }
        ],
        title:[
          { required: true, message: '请选择医生职称', trigger: 'change' }
        ],
        doctorDetail: [
          {  required: true, message: '请填写医生详细信息',  trigger: 'blur' }
        ],
        type: [
          { type: 'array',  trigger: 'change' }
        ],
        doctorSex:[
          { required: true, message: '请选择医生性别', trigger: 'change' }
        ],
        departId:[
          { required: true, message: '请选择医生科室', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this=this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          insertDoctor(this.ruleForm.doctorName, this.ruleForm.doctorAge, this.ruleForm.history, this.ruleForm.title, this.ruleForm.stop, this.ruleForm.hospitalTime, this.ruleForm.doctorDetail, this.ruleForm.doctorSex, this.ruleForm.doctorImg, this.ruleForm.departId).then((res) => {
            _this.$message.success("添加成功")
          })
        } else {
          _this.$message.error("提交失败")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      window.open(file.response.data)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleSuccess(response,file){
      this.ruleForm.doctorImg=response.data;
      console.log(response.data)
    }
  }
}
</script>