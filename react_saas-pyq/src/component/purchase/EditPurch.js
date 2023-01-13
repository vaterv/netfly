import React from "react";
import store from "../../store/store";
import * as action from "../../store/action";
import detailstyle from "./PurchDetail.module.css";
import { Row, Col, Button, Form, Card, Select, Input, DatePicker } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
// 引入moment
import moment from "moment";
// 定义日期函数
const dateFormat = "YYYY-MM-DD";
// 将拿到的数据赋给表格
const tempData = store.getState().purchaseList;
const EditPurch = () => {
  const confirmEdit = () => {
    console.log("单单看时间是", editOrder.diliverTime);
    console.log("00000编辑后的是", editOrder);
    // 匹配数组里的id
    tempData.filter((item) => {
      if (item.key === editOrder.key) {
        let idtify = item.key - 1;
        tempData[idtify] = editOrder;
      }
      return tempData;
    });
    // store.dispatch(action.editOrder(tempData));
    navigate(-1);
  };
  const params = useLocation();
  const { Option } = Select;
  const navigate = useNavigate();
  const editOrder = {
    key: params.state.editInfo.key,
    orderNum: params.state.editInfo.orderNum,
    diliverTime: params.state.editInfo.diliverTime,
    goods: params.state.editInfo.goods,
    goodsType: params.state.editInfo.goodsType,
    sply: params.state.editInfo.sply,
    orderState: params.state.editInfo.orderState,
    deviceNumber: params.state.editInfo.deviceNumber,
    price: params.state.editInfo.price,
  };

  const handAddOrder = (e) => {
    editOrder.orderNum = e;
  };
  const handAddDate = (dateString, ee) => {
    editOrder.diliverTime = ee;
    // 没有及时更新值,因为这个方法传入 的第二个函数才是转缓后的值
    // console.log("下拉框onchange获取的时间是", dateString._i, ee);
  };
  const handAddSply = (e) => {
    editOrder.sply = e;
  };
  const handAddGoods = (e) => {
    editOrder.goods = e;
  };
  const handAddGoodsType = (e) => {
    editOrder.goodsType = e;
  };
  const handOrderState = (e) => {
    editOrder.orderState = e;
  };
  const handAddPrice = (e) => {
    editOrder.price = e;
  };
  const handAdddeviceNumber = (e) => {
    editOrder.deviceNumber = e.target.value;
  };

  return (
    <>
      <Row>
        <Col span={1}></Col>
        <Col span={22}>
          <div className={detailstyle.title}>
            <div>编辑订单</div>
          </div>
          <Card
            style={{
              width: "100%",
            }}
          >
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout={"inline"}
            >
              <Form.Item label="发货日期:">
                <DatePicker
                  defaultValue={moment(
                    params.state.editInfo.diliverTime,
                    dateFormat
                  )}
                  style={{
                    width: 130,
                  }}
                  onChange={handAddDate}
                />
              </Form.Item>
              <Form.Item
                label="订单编号: "
                name="orderNum"
                rules={[
                  {
                    required: true,
                    message: "订单编号不能为空!",
                  },
                ]}
              >
                <Input
                  defaultValue={params.state.editInfo.orderNum}
                  style={{
                    width: 130,
                  }}
                  onChange={(v) => {
                    handAddOrder(v);
                  }}
                ></Input>
              </Form.Item>
              <Form.Item label="供货厂商">
                <Select
                  defaultValue={params.state.editInfo.sply}
                  style={{
                    width: 130,
                  }}
                  onChange={(v) => {
                    handAddSply(v);
                  }}
                >
                  <Option value="美的">美的</Option>
                  <Option value="格力">格力</Option>
                  <Option value="索尼">索尼</Option>
                  <Option value="小米">小米</Option>
                </Select>
              </Form.Item>
              <Form.Item label="订单状态">
                <Select
                  defaultValue={params.state.editInfo.orderState}
                  style={{
                    width: 130,
                  }}
                  onChange={(v) => {
                    handOrderState(v);
                  }}
                >
                  <Option value="1">已申请</Option>
                  <Option value="0">已通过</Option>
                </Select>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={1}></Col>
      </Row>

      <Row>
        <Col span={1}></Col>
        <Col span={22}>
          <div className={detailstyle.subTitle}>
            <div>选择商品</div>
          </div>
          <Card
            style={{
              width: "100%",
            }}
          >
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout={"inline"}
            >
              <Form.Item label="选择商品: ">
                <Select
                  defaultValue={params.state.editInfo.goods}
                  style={{
                    width: 130,
                  }}
                  onChange={(v) => {
                    handAddGoods(v);
                  }}
                >
                  <Option value="美的KFR">美的KFR</Option>
                  <Option value="格力KF">格力KF</Option>
                  <Option value="索尼XR">索尼XR</Option>
                  <Option value="小米电视2">小米电视2</Option>
                  <Option value="小米电视3">小米电视3</Option>
                </Select>
              </Form.Item>
              <Form.Item label="商品分类">
                <Select
                  defaultValue={params.state.editInfo.goodsType}
                  style={{
                    width: 130,
                  }}
                  onChange={(v) => {
                    handAddGoodsType(v);
                  }}
                >
                  <Option value="电视">电视</Option>
                  <Option value="空调">空调</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="数量/台"
                name="deviceCount"
                rules={[
                  {
                    required: true,
                    message: "数量不能为空!",
                  },
                ]}
              >
                <Input
                  defaultValue={params.state.editInfo.deviceNumber}
                  style={{
                    width: 130,
                  }}
                  onChange={(v) => {
                    handAdddeviceNumber(v);
                  }}
                ></Input>
              </Form.Item>
              <Form.Item
                label="订单金额"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "订单金额不能为空!",
                  },
                ]}
              >
                <Input
                  defaultValue={params.state.editInfo.price}
                  style={{
                    width: 130,
                  }}
                  onChange={(v) => {
                    handAddPrice(v);
                  }}
                ></Input>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={1}></Col>
      </Row>
      <h3>{store.info}</h3>

      <Row>
        <Col span={12}></Col>
        <Col span={8}></Col>
        <Col span={4}></Col>
      </Row>
      <div className={detailstyle.confirmBtn}>
        <Button
          type="primary"
          onClick={() => {
            confirmEdit();
          }}
        >
          确定修改
        </Button>
      </div>
    </>
  );
};

export default EditPurch;
