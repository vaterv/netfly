import React from "react";
import store from "../store/store";
import * as action from "../store/action";
import detailstyle from "../views/PurchDetail.module.css";
import {
  Row,
  Col,
  Tag,
  Button,
  Form,
  Card,
  Space,
  TimePicker,
  Select,
  Table,
} from "antd";
const PurchDetail = () => {
  return (
    <>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
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
                <TimePicker />
              </Form.Item>
              <Form.Item label="订单编号: ">
                <Select
                  defaultValue="bts"
                  style={{
                    width: 130,
                  }}
                >
                  <input value="bts">bts</input>
                  <input value="ass">ass</input>
                </Select>
              </Form.Item>
              <Form.Item label="供货厂商">
                <Select
                  defaultValue="lucy"
                  style={{
                    width: 130,
                  }}
                >
                  <input value="lucy">Lucy</input>
                </Select>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={2}></Col>
      </Row>

      <Row>
        <Col span={2}></Col>
        <Col span={20}>
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
                  defaultValue="bts"
                  style={{
                    width: 130,
                  }}
                >
                  <input value="bts">bts</input>
                  <input value="ass">ass</input>
                </Select>
              </Form.Item>
              <Form.Item label="商品分类">
                <Select
                  defaultValue="lucy"
                  style={{
                    width: 130,
                  }}
                >
                  <input value="lucy">Lucy</input>
                </Select>
              </Form.Item>

              <Form.Item label="采购状态：">
                <Select
                  defaultValue="lucy"
                  style={{
                    width: 130,
                  }}
                >
                  <input value="lucy">Lucy</input>
                </Select>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={2}></Col>
      </Row>
      <h3>{store.info}</h3>

      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Button
            type="primary"
            onClick={() => {
              // store.dispatch(action.addCount(100));
            }}
          >
            点击提交
          </Button>
        </Col>
        <Col span={2}></Col>
      </Row>
    </>
  );
};

export default PurchDetail;
