// import { config } from "vue/types/umd";
import Axios from 'axios'

const configBaseURL = '/api';

const axios = Axios.create({
    baseURL: configBaseURL,
    timeout: 1000 * 60 * 60
})

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    // 添加header头的token
    // let token = window.sessionStorage.getItem('mytoken')
    // if (config.token === true) {
    //     config.headers['token'] = token
    // }
    let token = sessionStorage.getItem('mytoken');
    token && (config.headers['token'] = token);

    return config;
}, (error) => {
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
    // console.log('响应拦截器 成功');
    let { token } = response.data;
    token && sessionStorage.setItem('mytoken', token);
    // 对响应数据做点什么
    return response;
}, (err) => {
    // 全局错误提示
    if (err.response && err.response.data && err.response.data.errorCode) {
        Message.error(err.response.data.msg)
    }
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios;