
import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import './HomeView.css'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom'
import LeftMenu from '../component/home/LeftMenu';
import TopMenu from '../component/home/TopMenu';
const { Header, Content, Sider } = Layout;

export default class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // 生命周期函数
    componentDidMount() {
        console.log('componentDidMount');
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    render() {
        return (
            <Layout>
                {/* 左侧导航栏 */}
                <Sider width={300} className="layout-nav-box">
                    {/* 渲染左侧菜单组件 */}
                    <LeftMenu />
                </Sider>
                <Layout className="layout-main">
                    {/* 右边区域 */}
                    <Layout
                        style={{
                            position: 'relative',
                            right: 0,
                            top: 0,
                            marginLeft: 300,
                        }}
                    >
                        {/* 头部 */}
                        <Header className='layout-head'>
                            <TopMenu />
                        </Header>
                        <Content
                            className="layout-content"
                            style={{
                                paddingLeft: 24,
                                paddingRight: 24,
                                paddingTop: 70,
                                margin: 0,
                                minHeight: 280,
                                backgroundColor: "rgb(231, 244, 255)"
                            }}
                        >
                            {/* 渲染子路由 匹配到子路由时，用子路由的组件替换此处内容*/}
                            {/* 类似Vue中的router-view */}
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
