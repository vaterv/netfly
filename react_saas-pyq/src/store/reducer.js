import initData from "./initData";

export default function reducer(state = initData, action) {
  switch (action.type) {
    case "LOGINSTATE":
      return { ...state, loginState: action.stateValue };
    case "USERINFO":
      return { ...state, userInfo: action.info };
    case "SHOWSTATE":
      return { ...state, isShow: action.showState };
    case "SHOWREGSTATE":
      return { ...state, isRegShow: action.showRegState };
    case "SHOWLOADING":
      return { ...state, loginState: action.loginState };
    case "ADDORDER":
      let temp = state.purchaseList.push(action.orderD);
      console.log("添加后是", temp);
      return state;
    // yeehaw 这个方法是可以用的
    case "EDITORDER":
      state.purchaseList = action.orderD;
      return state;
    default:
      return { ...state };
  }
}
