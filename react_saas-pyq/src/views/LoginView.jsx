import React, { useRef, useEffect, createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { show, showReg, showLoading } from './../store/action'
import { connect } from 'react-redux'
import './LoginView.css'
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd';

// 1. 映射State到Props中：
function mapStateToProps(state, ownProps) {
    console.log(state);
    // console.log(ownProps);
    return {
        loginState: state.loginState,
        accountList: state.accountList,
        brandList: state.brandList,
        isShow: state.isShow,
        isRegShow: state.isRegShow
    }
}

// 2. 映射方法到Props中：
function mapDispatchToProps(dispatch, ownProps) {
    // console.log(dispatch);
    // console.log(ownProps);
    return {
        showLogin: (showState) => { dispatch(show(showState)) },
        showRegister: (showRegState) => { dispatch(showReg(showRegState)) },
        loading: (loginState) => { dispatch(showLoading(loginState)) }
    }
}

const LoginView = (props) => {

    console.log(props);
    const { loginState, isShow, isRegShow, brandList, accountList, showLogin, showRegister, loading } = props;
    const refAccount = useRef(null);
    const refPassword = useRef(null);
    const refRegAccount = useRef(null);
    const refRegPassword = useRef(null);
    const refComfirm = useRef(null);
    const navigator = useNavigate();
    const antIcon = <LoadingOutlined spin />;

    const login = (account, password) => {
        console.log('before')
        accountList.forEach(el => {
            if (el.account === account && el.password === password) {
                sessionStorage.setItem('pic', el.accountPic)
                sessionStorage.setItem('name', el.account)
                setTimeout(() => {
                    loading(true)
                    navigator("/home")
                }, 2000)
                // console.log('after');
            } else {

            }
        });
    }


    return (
        <div className='pages'>

            <Spin indicator={antIcon} className={loginState ? 'spin1' : 'spin2'} />
            {/* 标题 */}
            <div className='headBox'>
                <h1 className='logo'>LAND<span>SEA</span></h1>
                <h1 className='tip1'>Distribution</h1>
                <h1 className='tip2'>CONTRO<span>L</span> <span>S</span>YSTEM</h1>
            </div>
            <div className={isShow || isRegShow ? 'blurBack' : 'clearBack'}></div>

            <div className='showLogin1' onClick={() => {
                showLogin(true);
            }}>
                <span>L</span>ogin
            </div>
            <div className='showLogin2' onClick={() => {
                showRegister(true)
            }}>
                <span>R</span>egister
            </div>
            <div className='showLogin3'>
                <span>M</span>odify
                {/* Modify */}
            </div>

            {/* 登录框 */}
            <div className={isShow ? 'loginBox1' : 'loginBox2'}>
                <CloseOutlined className='closeBtn' onClick={() => {
                    showLogin(false);
                }} />
                <h1>Login</h1>
                <div>
                    <div>Account :</div>
                    <input className='loginIpt' type="text" ref={refAccount} />
                </div>
                <div>
                    <div>Password :</div>
                    <input className='loginIpt' type="password" ref={refPassword} />
                </div>
                <button type='button' onClick={() => {
                    login(refAccount.current.value, refPassword.current.value);
                    loading(true)
                }}>Login</button>

                {/* <Spin indicator={antIcon} /> */}
            </div>
            {/* 注册框 */}
            <div className={isRegShow ? 'registerBox1' : 'registerBox2'}>
                <CloseOutlined className='closeBtn2' onClick={() => {
                    showRegister(false);
                }} />
                <h1>Login</h1>
                <div>
                    <div>Account :</div>
                    <input className='registerIpt' type="text" ref={refRegAccount} />
                </div>
                <div>
                    <div>Password :</div>
                    <input className='registerIpt' type="password" ref={refRegPassword} />
                </div>
                <div>
                    <div>Comfirm :</div>
                    <input className='registerIpt' type="password" ref={refComfirm} />
                </div>
                <button type='button' onClick={() => {
                    // login(refAccount.current.value, refPassword.current.value)
                }}>Comfirm</button>
            </div>

        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
