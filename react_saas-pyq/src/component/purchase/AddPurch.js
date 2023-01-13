import React from "react";
import store from "../../store/store";
import * as action from "../../store/action";
import detailstyle from "./PurchDetail.module.css";
import { Row, Col, Button, Form, Card, Select, Input, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
const PurchDetail = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const newOrder = {
    key: "7",
    orderNum: "",
    diliverTime: "",
    goods: "",
    goodsType: "",
    sply: "",
    orderState: "1",
    deviceNumber: "",
    price: "",
  };

  const confirmAdd = () => {
    store.dispatch(action.addOrder(newOrder));
    navigate(-1);
    console.log("新订单的值是", newOrder);
  };
  const handAddOrder = (e) => {
    newOrder.orderNum = e.target.value;
  };
  const handAddDate = (e, dateString) => {
    newOrder.diliverTime = dateString;
  };
  const handAddSply = (e) => {
    newOrder.sply = e;
  };
  const handAddGoods = (e) => {
    newOrder.goods = e;
  };
  const handAddGoodsType = (e) => {
    newOrder.goodsType = e;
  };

  const handAdddeviceNumber = (e) => {
    newOrder.deviceNumber = e.target.value;
  };
  const handAddPrice = (e) => {
    newOrder.price = e.target.value;
  };

  return (
    <>
      <Row>
        <Col span={1}></Col>
        <Col span={22}>
          <div className={detailstyle.title}>
            <div>添加订单</div>
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
                  defaultValue=""
                  style={{
                    width: 130,
                  }}
                  onChange={handAddDate}
                ></DatePicker>
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
                  defaultValue=""
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
                  defaultValue=" "
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
                  disabled
                  defaultValue="已申请"
                  style={{
                    width: 130,
                  }}
                >
                  <Option value="1">已申请</Option>
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
                  defaultValue=" "
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
                  defaultValue=""
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
      <div className={detailstyle.confirmBtn}>
        <Button
          type="primary"
          onClick={() => {
            confirmAdd();
          }}
        >
          点击提交
        </Button>
      </div>
    </>
  );
};

export default PurchDetail;
