import vue from 'vue'
import VueRouter from "vue-router"
import Main from "@/views/Main";
import Home from "@/views/home/index";
import User from "@/views/user/index";
import Medicine from "@/views/medicine/index";
import MedicineAdd from "@/views/medicine/MedicineAdd"
import Doctor from "@/views/doctor";
import DoctorAdd from "@/views/doctor/DoctorAdd"
import Login from "@/views/login/index";
import Register from "@/views/register/index";
import store from "../src/store";
import ShowDoctor from "@/views/medical/ShowDoctor";
import GetGuahao from "@/views/medical/GetGuahao";
import Patient from "@/views/patient";
import PatientAdd from "@/views/patient/PatientAdd"
import PatientUpdate from "@/views/patient/PatientUpdate";
import DoctorUpdate from "@/views/doctor/DoctorUpdate";
import UserPassword from "@/views/user/UserPassword"
vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home,
            },
            {
                path: '/medical/showdoctor/1',
                name: 'GuaHao1',
                props: {departId: 1},
                component: ShowDoctor
            },
            {
                path: '/medical/showdoctor/2',
                name: 'GuaHao2',
                props: {departId: 2},
                component: ShowDoctor
            },
            {
                path: '/medical/showdoctor/3',
                name: 'GuaHao3',
                props: {departId: 3},
                component: ShowDoctor
            },
            {
                path: '/medical/getGuaHao',
                name: 'GetGuaHao',
                component:GetGuahao
            },
            {
                path: '/doctor',
                name: 'Doctor',
                component: Doctor,
            },
            {
                path: '/doctor/add',
                name: 'DoctorAdd',
                component: DoctorAdd,
            },
            {
                path: '/doctor/update/:doctorId',
                name: 'DoctorUpdate',
                component: DoctorUpdate,
                props: true
            },
            {
                path: '/patient',
                name: 'Patient',
                component: Patient
            },
            {
                path: '/patient/add',
                name: 'PatientAdd',
                component: PatientAdd
            },
            {
                path: '/patient/update/:patientId',
                name: 'PatientUpdate',
                component: PatientUpdate,
                props: true
            },
            {
                path: '/medicine',
                name: 'Medicine',
                component: Medicine,
            },
            {
                path: '/medicine/add',
                name: 'MedicineAdd',
                component: MedicineAdd
            },
            {
                path: '/user',
                name: 'User',
                component: User,
            },
            {
                path: '/user/password',
                name: 'UserPassword',
                component: UserPassword,
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]
const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if(to.name=='Register'){
        next()
    }else if (!token && to.name !== 'Login') {
        next({name: 'Login'})
    } else if (token && to.name === 'Login') {
        next({name: 'Home'})
    } else {
        next()
    }
})

export default router