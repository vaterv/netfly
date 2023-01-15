import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.min.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import Axios from 'axios'
import Axios from './util/axios'
import moment from 'moment'
import * as echarts from 'echarts';

// 引入dayjs
import dayjs from 'dayjs'
Vue.prototype.$dayjs=dayjs;

Vue.config.productionTip = false
Vue.prototype.$axios = Axios;
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);

//全局过滤器
Vue.filter('dateFmt', (input, formatString = "YYYY-MM-DD") => {
    //es5函数参数设置默认值
    //const lastFormatString = formatString || ''
    // moment(input) 把时间字符串转成时间对象
    // format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
    return moment(input).format(formatString)
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')