<template>
  <div>
    <el-row>
      <el-col :span="2" v-for="(item, index) in doctors" :key="item.doctorId" :offset="2">
        <el-card :body-style="{ padding: '0px'}">
          <img :src="item.doctorImg" class="image">
          <div style="padding: 2px;">
            <span>{{item.doctorName}} </span>
            <span>{{item.title}}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="handleGuahao(item.doctorId)">挂号</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="请输入患者编号" :visible.sync="dialogVisible" width="35%" :before-close="handlePatientClose">
      <el-input v-model="patient.patientId"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="findPatientCancel">取 消</el-button>
        <el-button type="primary" @click="findPatient">选择</el-button>
      </div>
    </el-dialog>

    <el-dialog title="请确认挂号信息" :visible.sync="guaHaoVisible" width="35%" :before-close="handleClose">
      <el-form style="margin-top: 0px;margin-left: 40px">
        <el-form-item label="患者编号:">
          <el-tag  >{{patient.patientId}}</el-tag>
        </el-form-item>
        <el-form-item label="患者姓名:">
          <el-tag  >{{patient.patientName}}</el-tag>
        </el-form-item>
        <el-form-item label="医生编号:">
          <el-tag  >{{doctor.doctorId}}</el-tag>
        </el-form-item>
        <el-form-item label="医生姓名:">
          <el-tag  >{{doctor.doctorName}}</el-tag>
        </el-form-item>
        <el-form-item label="挂号日期:">
          <el-select v-model="date" placeholder="请选择挂号日期">
            <el-option
                v-for="item in doctor.hospitalTime"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="guaHaoCancel">取 消</el-button>
        <el-button type="primary" @click="doGuahao">挂号</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getDoctorbyId, getDoctorsbyDepartId, getNoStopDoctorsbyDepartId} from "@/api/doctor";
import {getPatientbyId} from "@/api/patient";
import {insertGuahao} from "@/api/medical";
export default {
  name: "showDoctor",
  data() {
    return {
      dialogVisible:false,
      guaHaoVisible:false,
      formLabelWidth:'100px',
      date:'',
      doctors:[
        {
          departName: "外科",
          doctorAge: 32,
          doctorDetail: "毕业于中山大学医学系",
          doctorId: '',
          doctorImg: '',
          doctorName: "Zhang",
          doctorSex: "男",
          history: "硕士",
          hospitalTime:[],
          stop: 0,
          title: "主治医师"
        }
      ],
      doctor:{
        doctorId:'',
        doctorName:'',
        hospitalTime:[],
      },
      patient:{
        patientId:"",
        patientName:"",
        patientSex:"",
        patientAge:""
      },
      userImg:''
    }
  },
  created() {
    const _this=this
    getNoStopDoctorsbyDepartId(_this.departId).then((res)=>{
      _this.doctors=res.data
    })
  },
  methods:{
    handleGuahao(doctorId){
      this.dialogVisible=true
      this.doctor.doctorId=doctorId
    },
    findPatientCancel(){
      this.dialogVisible=false
      this.patient.patientId=""
    },
    findPatient(){
      const _this=this
      if(this.patient.patientId===''){
        _this.$message.warning("患者编号不能为空")
      }else{
        getPatientbyId(_this.patient.patientId).then((res)=>{
          console.log(res)
          _this.patient=res.data
          console.log(_this.patient.patientId+"getpatientbyId")
          getDoctorbyId(_this.doctor.doctorId).then((res)=>{
            _this.doctor=res.data
            _this.dialogVisible=false
            _this.guaHaoVisible=true
            console.log(_this.patient.patientId+"getDoctorbyId")
          })
        },(rej)=>{
          // _this.$message.warning(rej)
        })
      }

    },
    guaHaoCancel(){
      this.patient.patientId=''
      this.doctor.doctorId=''
      this.date=''
      this.guaHaoVisible=false
    },
    handleClose(){
      this.$confirm('确认关闭？')
          .then(_ => {
            this.guaHaoCancel()
          })
          .catch(_ => {
          });
    },
    handlePatientClose(){
      this.$confirm('确认关闭？')
          .then(_ => {
            this.findPatientCancel()
          })
          .catch(_ => {
          });

    },
    doGuahao(){
      const _this =this
      insertGuahao(this.patient.patientId,this.doctor.doctorId,this.date).then((res)=>{
        _this.$message.success("挂号成功")
        _this.guaHaoVisible=false
      })
    }
  },
  watch:{
    departId:function (){
      const _this=this
      getNoStopDoctorsbyDepartId(_this.departId).then((res)=>{
        _this.doctors=res.data
      })
    }
  },
  props:{
    departId:Number
  }
}
</script>

<style scoped>
.el-card{
  width: 200px;
  margin-top: 10px;
  margin-left: 0px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 200px;
  height: 380px;
  display: block;
  justify-content: center;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>