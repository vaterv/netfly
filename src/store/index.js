import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        username: '',
        staffId: null
    },
    getters: {
        getUser(state) {
            return state.user
        }
    },
    mutations: {
        getUserNameMt(state, username) {
            // console.log('mutations', username);
            state.username = username
        },
        getstaffIdMt(state, staffId) {
            // console.log('mutations', staffId);
            state.staffId = staffId
        },
        getUserInfoMt(state, user) {
            // console.log(user);
            state.user = user
        }
    },
    actions: {
        login(state, user) {
            //保存登录状态
            state.user = user
            state.token = user.token;
            // 存储到本地存储
            window.sessionStorage.setItem('user', JSON.stringify(state.user))
            window.sessionStorage.setItem('token', state.token)
        },
        // 退出登录
        logout(state) {
            // 清除状态
            state.user = {}
            state.token = false
                //清除本地储存
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('token')
        },

        getUserName({ commit }, username) {
            // console.log('actions', username);
            commit('getUserNameMt', username)
        },
        getUserId({ commit }, staffId) {
            // console.log('actions', userstaffIdId);
            commit('getstaffIdMt', staffId)
        },
        getUserInfo({ commit }, user) {
            // console.log(user);
            commit('getUserInfoMt', user)
        }
    },
    modules: {}
})