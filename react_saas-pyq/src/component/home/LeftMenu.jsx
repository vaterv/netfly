import { Menu } from 'antd';
import React from 'react';
import { ShoppingOutlined, DesktopOutlined, LineOutlined } from '@ant-design/icons';
import { NavLink as Link } from 'react-router-dom';

export default class LeftMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [{
                key: "/home",
                icon: React.createElement(DesktopOutlined),
                label: <Link to="/home">概览</Link>
            }, {
                key: "/home/goods",
                icon: React.createElement(ShoppingOutlined),
                label: "商品管理",
                children: [
                    {
                        key: "/home/goods/brand",
                        icon: React.createElement(LineOutlined),
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
                    {
                        key: "/home/goods/goodsclassify",
                        icon: React.createElement(LineOutlined),
                        label: "商品分类",
                        children: [{
                            // key: "/home/goods/goodsclassify",
                            label: <Link to="/">商品分类</Link>
                        }, {
                            // key: "/home/goods/goodsclassify",
                            label: <Link to="/">添加分类</Link>
                        },
                        ]
                    },
                    {
                        key: "/home/purchmanage",
                        icon: React.createElement(LineOutlined),
                        label: "采购管理",
                        children: [{
                            label: <Link to="/home/purchmanage">采购管理</Link>
                        }
                        ]
                    },
                ]
            }]
        };
    };


    openChange() {
        console.log('OpenChange');
    }
    render() {
        return (
            <>
                {/* 标题 */}
                <div className='headBox2'>
                    <h1 className='logo2'>LAND<span>SEA</span></h1>
                    <h1 className='tip12'>Distribution</h1>
                    {/* <h1 className='tip22'>CONTRO<span>L</span> <span>S</span>YSTEM</h1> */}
                </div>
                <div className='line'></div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/home']}
                    defaultOpenKeys={['/home/goods']}
                    style={{
                        height: '100%',
                        borderRight: 0,
                        // marginTop: '30px'
                    }}
                    items={this.state.items}
                    onOpenChange={() => this.openChange()}
                />
            </>
        )
    }
}