import { Menu } from 'antd';
import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink as Link } from 'react-router-dom';

export default class LeftMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [{
                key: "/home",
                icon: React.createElement(UserOutlined),
                label: <Link to="/home">概览</Link>
            }, {
                key: "/home/goods",
                icon: React.createElement(UserOutlined),
                label: "商品管理",
                children: [{
                    key: "/home/goods/brand",
                    icon: React.createElement(UserOutlined),
                    label: "品牌管理",
                    children: [{
                        key: "/home/goods/brand/brandclassify",
                        label: <Link to="/home/goods/brand/brandclassify">品牌管理</Link>
                    }, {
                        key: "/home/goods/brand/brandadd",
                        label: <Link to="/home/goods/brand/brandadd">添加品牌</Link>
                    },
                    ]
                },
                    //     {
                    //     key: "/home/goods/goodsclassify",
                    //     icon: React.createElement(UserOutlined),
                    //     label: "商品分类",
                    //     children: [{
                    //         key: "/home/goods/goodsclassify",
                    //         label: <Link to="/home/goods/brand/brandclassify">商品分类</Link>
                    //     }, {
                    //         key: "/home/goods/goodsclassify",
                    //         label: <Link to="/home/goods/brand/brandadd">添加分类</Link>
                    //     },
                    //     ]
                    // },
                ]
            }]
        };
    };


    openChange() {
        console.log('OpenChange');
    }
    render() {
        return (
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/home']}
                defaultOpenKeys={['/home/goods']}
                style={{
                    height: '100%',
                    borderRight: 0,
                }}
                items={this.state.items}
                onOpenChange={() => this.openChange()}
            />
        )
    }
}