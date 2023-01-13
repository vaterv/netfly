import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Card,
  Space,
  DatePicker,
  Select,
  Table,
  Tag,
  Popconfirm,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from "./PurchManage.module.css";
import { Link } from "react-router-dom";
import Store from "../../store/store";

// 引入moment
import moment from "moment";
const PurchManage = () => {
  // 将拿到的数据赋给表格
  // 定义日期函数
  const dateFormat = "YYYY-MM-DD";
  // 定义装时间的变量
  const myTime = "1999-09-02";
  const tempData = Store.getState().purchaseList;
  const [data, setData] = useState(tempData);
  const tableLength = data.length;
  const { Option } = Select;
  const handDel = (id) => {
    // 用filter方法删除,这个方法绝了，没有bug
    let res = data.filter((item) => {
      if (item.key === id) return false;
      return true;
    });
    console.log("删除后是", res);
    setData(res);
  };
  // 点击编辑跳转函数
  var splyValue = null;
  var orderStateValue = null;
  var dateValue = null;
  // 获取下拉框的值
  const getSuplyValue = (e) => {
    splyValue = e;
  };
  // 下拉框值
  const getOrderStateValue = (e) => {
    orderStateValue = e;
  };
  const getDateValue = (e, dateString) => {
    console.log("获取到的查询日期是", dateString);
    dateValue = dateString;
  };
  // 查询函数
  const handSrch = () => {
    // 先判断输入框是有一个或者两个输入
    console.log(
      "获取到输入框的值：-------",
      splyValue,
      orderStateValue,
      dateValue
    );
    if (splyValue === null && orderStateValue === null && dateValue === null) {
      // 提示
      message.info("请至少输入一个查询条件");
    } else if (
      splyValue !== null &&
      orderStateValue === null &&
      dateValue === null
    ) {
      // 查询一个条件供货商
      // 用filter方法，筛选数组
      let res = data.filter((item) => {
        return item.sply === splyValue;
      });
      setData(res);
      message.success("查询成功", 4);
    } else if (
      splyValue === null &&
      orderStateValue !== null &&
      dateValue === null
    ) {
      // 查询一个订单状态条件
      let res = data.filter((item) => {
        return item.orderState === orderStateValue;
      });
      setData(res);
      message.success("查询成功", 4);
    } else if (
      splyValue === null &&
      orderStateValue === null &&
      dateValue !== null
    ) {
      // 查询一个时间条件
      let res = data.filter((item) => {
        return item.diliverTime === dateValue;
      });
      setData(res);
      message.success("查询成功", 4);
    } else if (
      splyValue === null &&
      orderStateValue !== null &&
      dateValue !== null
    ) {
      // 查询2个条件,时间，状态
      let res = data.filter((item) => {
        return (
          item.diliverTime === dateValue && item.orderState === orderStateValue
        );
      });
      setData(res);
      message.success("查询成功", 4);
    } else if (
      splyValue !== null &&
      orderStateValue === null &&
      dateValue !== null
    ) {
      // 查询2个条件,时间，供货商
      let res = data.filter((item) => {
        return item.diliverTime === dateValue && item.sply === splyValue;
      });
      setData(res);
      message.success("查询成功", 4);
    } else if (
      splyValue !== null &&
      orderStateValue !== null &&
      dateValue === null
    ) {
      // 查询2个条件,状态，供货商
      let res = data.filter((item) => {
        return item.orderState === orderStateValue && item.sply === splyValue;
      });
      setData(res);
      message.success("查询成功", 4);
    } else {
      // 3个都查询
      let res = data.filter((item) => {
        return (
          item.orderState === orderStateValue &&
          item.sply === splyValue &&
          item.diliverTime === dateValue
        );
      });
      setData(res);
      message.success("查询成功", 4);
    }
  };

  useEffect(() => {}, [data]);
  const columns = [
    {
      title: "编号",
      dataIndex: "orderNum",
      key: "orderNum",
    },
    {
      title: "创建日期",
      dataIndex: "diliverTime",
      key: "diliverTime",
    },
    {
      title: "供货厂商",
      dataIndex: "sply",
      key: "sply",
    },
    {
      title: "商品分类",
      key: "goodsType",
      dataIndex: "goodsType",
    },
    {
      title: "订单金额",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "订单状态",
      dataIndex: "orderState",
      key: "orderState",
      render: (_, record) => (
        <>
          <Tag color={record.orderState === "1" ? "geekblue" : "green"}>
            {record.orderState === "1" ? "已申请" : "已通过"}
          </Tag>
        </>
      ),
    },

    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/home/editpurch`} state={{ editInfo: record }}>
            编辑 {record.orderNum}
          </Link>
          <Popconfirm
            title="确定要删除吗？"
            okText="是的"
            cancelText="不"
            onConfirm={() => {
              handDel(record.key);
            }}
            onCancel={() => {
              console.log("点击了取消删除");
            }}
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Row>
        <Col span={1}></Col>
        <Col span={22}>
          <div className={style.title}>
            <SearchOutlined />
            <div>筛选查询</div>
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
              <Form.Item label="创建日期:">
                <DatePicker onChange={getDateValue} />
              </Form.Item>
              <Form.Item label="供货厂商: ">
                <Select
                  defaultValue=""
                  style={{
                    width: 130,
                  }}
                  onChange={(e) => {
                    getSuplyValue(e);
                  }}
                >
                  <Option value="美的">美的</Option>
                  <Option value="格力">格力</Option>
                  <Option value="索尼">索尼</Option>
                  <Option value="小米">小米</Option>
                </Select>
              </Form.Item>
              <Form.Item label="采购状态：">
                <Select
                  defaultValue=""
                  style={{
                    width: 130,
                  }}
                  onChange={(e) => {
                    getOrderStateValue(e);
                  }}
                >
                  <Option value="1">已申请</Option>
                  <Option value="0">已通过</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    marginLeft: "30px",
                    width: 100,
                  }}
                  onClick={handSrch}
                >
                  查询结果
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={1}></Col>
      </Row>
      <Row>
        <Col span={1}></Col>
        <Col span={22}>
          <Card
            style={{
              width: "100%",
            }}
            extra={
              <>
                <Space>
                  <Link to="/home/addpurch">
                    <Button
                      type="primary"
                      style={{
                        width: "90px",
                      }}
                    >
                      添加
                    </Button>
                  </Link>

                  <Button
                    style={{
                      width: "90px",
                    }}
                  >
                    导出
                  </Button>
                </Space>
              </>
            }
          >
            <Table
              columns={columns}
              dataSource={data}
              pagination={{
                defaultCurrent: "1",
                pageSize: "5",
                total: tableLength,
              }}
            />
          </Card>
        </Col>
        <Col span={1}></Col>
      </Row>
    </>
  );
};

export default PurchManage;
