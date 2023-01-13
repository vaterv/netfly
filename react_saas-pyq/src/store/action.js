const LOGINSTATE = "LOGINSTATE";
const USERINFO = "USERINFO";
const SHOWSTATE = "SHOWSTATE";
const SHOWREGSTATE = "SHOWREGSTATE";
const SHOWLOADING = "SHOWLOADING";
const ADDORDER = "ADDORDER";
const EDITORDER = "EDITORDER";

export const modifyLoginState = (stateValue) => {
  return { type: LOGINSTATE, stateValue };
};

export const login = (account, password) => {
  return { type: USERINFO, info: { account, password } };
};

export const show = (showState) => {
  return { type: SHOWSTATE, showState };
};

export const showReg = (showRegState) => {
  return { type: SHOWREGSTATE, showRegState };
};

export const showLoading = (loginState) => {
  return { type: SHOWLOADING, loginState };
};
// 采购的action函数
export const addOrder = (orderD) => {
  return { type: ADDORDER, orderD };
};
export const editOrder = (orderD) => {
  return { type: EDITORDER, orderD };
};
