import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: Login
},
{
    path: '/main',
    name: 'main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "about" */ '../views/Main.vue'),
    children: [{
        path: 'home',
        name: 'home',
        component: () =>
            import('../components/0_Home&Element/Home/Home.vue'),
    },
    {
        path: 'location', // 库位管理
        name: 'location',
        component: () =>
            import('../components/2_Stock/Location.vue'),
    },
    {
        path: 'locationadj', // 库位调整
        name: 'locationadj',
        component: () =>
            import('../components/2_Stock/LocationAdj.vue'),
    },
    {
        path: 'reservoirarea', // 库区管理
        name: 'reservoirarea',
        component: () =>
            import('../components/2_Stock/ReservoirArea.vue'),
    },
    {
        path: 'inventoryimport', // 库存盘点
        name: 'inventoryimport',
        component: () =>
            import('../components/2_Stock/InventoryImport.vue'),
    },
    {
        path: 'inventoryquery', // 库存查询
        name: 'inventoryquery',
        component: () =>
            import('../components/2_Stock/InventoryQuery.vue'),
    },
    {
        path: 'examine', // 我的审核
        name: 'examine',
        component: () =>
            import('../components/3_officialBusiness/ViewPaper.vue'),
    }, ,
    {
        path: 'afterSale', // 订单售后
        name: 'afterSale',
        component: () =>
            import('../components/5_Order/afterSale.vue'),
    },
    {
        path: 'queryOrder', //订单查询
        name: 'queryOrder',
        component: () =>
            import('../components/5_Order/queryOrder.vue')
    }, {
        path: 'newOrder', //订单新增
        name: 'newOrder',
        component: () =>
            import('../components/5_Order/newOrder.vue')
    }, {
        path: 'diliveredOrder', //已发货订单
        name: 'diliveredOrder',
        component: () =>
            import('../components/5_Order/diliveredOrder.vue')
    }
    ]
}
]

const router = new VueRouter({
    routes
})

export default router