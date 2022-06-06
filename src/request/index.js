import axios from 'axios'
import JSON_BIG from 'json-bigint'
import ElementUI, {Message} from 'element-ui';
import store from '@/store'
import router from "../../router";

const service = axios.create({
    // baseURL: process.env.BASE_API,
    baseURL: "http://localhost:8081",
    timeout: 5000,
    transformResponse: data => {
        try {
            return JSON.parse(data);
        } catch (err) {
            console.log(err);
            return JSON_BIG.parse(data)
        }
    }
})

// request拦截器
service.interceptors.request.use(config => {

    if (localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token')
    }
    return config
}, error => {

    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {

        //全局统一处理 Session超时
        // if (response.headers['session_time_out'] == 'timeout') {
        //
        //     store.dispatch('fedLogOut')
        // }

        const res = response.data;
        if (res.code === 999) {
            Message({
                message: res.msg,
                type: 'warning'
            })
            return Promise.reject(res.msg);
        } else if (res.code === 90002) {
            store.commit("clearToken")
            router.replace({
                name: 'Login'
            })
            Message({
                message: res.msg,
                type: 'error'
            })
            return Promise.reject(res.msg);
        } else if (res.code !== 200) {
            Message({
                message: res.msg,
                type: 'error'
            })
            return Promise.reject(res.msg);
        } else {
            return response.data;
        }
    },
    error => {
        Message({
            type: 'error',
            showClose: true,
            message: '系统异常'
        })
        return Promise.reject('error')
    })

export default service
