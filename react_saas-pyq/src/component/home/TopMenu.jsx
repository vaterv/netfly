import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import './TopMenu.css'
import { LogoutOutlined, SettingOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { show, showReg, showLoading } from './../../store/action'

function mapStateToProps(state, ownProps) {
    console.log(state);
    // console.log(ownProps);
    return {
        loginState: state.loginState,
        accountList: state.accountList,
    }

}
function mapDispatchToProps(dispatch, ownProps) {
    // console.log(dispatch);
    // console.log(ownProps);
    return {
        showLogin: (showState) => { dispatch(show(showState)) },
        showRegister: (showRegState) => { dispatch(showReg(showRegState)) },
        loading: (loginState) => { dispatch(showLoading(loginState)) }
    }
}

const TopMenu = (props) => {

    console.log(props);
    const { accountList, loginState, loading, isShow, showLogin } = props;
    const pic = sessionStorage.getItem('pic')
    const name = sessionStorage.getItem('name')
    const navigator = useNavigate();
    // const logout = () => {

    //     navigator("/loginview")
    // }
    useEffect(() => {
        if (!loginState) {
            navigator("/loginview")
        }
    }, [loginState])
    return (
        <div className='headInfo'>
            <div className='headIpt'>
                <input type="text" placeholder='search for something...' />
                <SearchOutlined className='searchBtn' />
            </div>
            <div className='userInfo'>
                <div onClick={() => {
                    loading(false);
                    showLogin(false)
                }} className='opt1' >
                    <LogoutOutlined />
                    <span className='sp1'> Out</span></div>
                <div className='lined'></div>
                <div className='opt2' >
                    <BellOutlined />
                    <span className='sp2'> Info</span>
                </div>
                <div className='lined'></div>
                <div className='opt3' >
                    <SettingOutlined />
                    <span className='sp3'> Set</span>
                </div>
                <div className='lined2'></div>
                <span><span>{name}</span> </span>
                {/* <span><span>{name},</span> Welcome ! </span> */}
                {/* <img src={require(pic).default} alt="" /> */}
                <img src={require('./../../static/zayn.jpg')} alt="" />

            </div>
        </div >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
