import { Route, Routes } from "react-router-dom";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import { Provider } from "react-redux";
import store from "./store/store";
import HomeMain from "./component/home/HomeMain";
import BrandClassify from "./component/brand/BrandClassify";
import BrandAdd from "./component/brand/BrandAdd";
import PurchManage from "./component/purchase/PurchManage";
import AddPurch from "./component/purchase/AddPurch";
import EditPurch from "./component/purchase/EditPurch";

function App(props) {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<LoginView />}></Route>
          <Route exact path="/loginview" element={<LoginView />}></Route>
          <Route exact path="/home" element={<HomeView />}>
            <Route exact index element={<HomeMain />}></Route>
            <Route
              exact
              path="/home/goods/brand/brandclassify"
              element={<BrandClassify />}
            ></Route>
            <Route
              exact
              path="/home/goods/brand/brandadd"
              element={<BrandAdd />}
            ></Route>
            <Route path="/home/purchmanage" element={<PurchManage />}></Route>
            <Route path="/home/addpurch" element={<AddPurch />}></Route>
            <Route path="/home/editpurch" element={<EditPurch />}></Route>
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
