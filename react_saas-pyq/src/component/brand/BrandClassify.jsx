import { Button, Space, Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import './BrandClassify.css';
// import { show, showReg, showLoading } from './../store/action'
import { connect } from 'react-redux'


function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        brandClass: state.brandClass,
        brandList: state.brandList,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    // console.log(dispatch);
    // console.log(ownProps);
    return {

    }
}

const BrandClassify = (props) => {
    function search() {

    }

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const { brandList, brandClass } = props;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    // const { Column, ColumnGroup } = Table;


    // 多选功能
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;


    // 搜索功能
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });



    const columns = [
        {
            title: '编号',
            dataIndex: 'brandNumber',
            // key: 'brandNumber',
            width: '30%',
            ...getColumnSearchProps('brandNumber'),
        },
        {
            title: '品牌名称',
            dataIndex: 'brandName',
            // key: 'brandName',
            width: '20%',
            ...getColumnSearchProps('brandName'),
        },
        {
            title: '相关商品',
            dataIndex: 'goodsId',
            // key: 'goodsId',
            ...getColumnSearchProps('goodsId'),
        },
        {
            title: '操作',
            dataIndex: 'action',
            // key: 'action',
        }
    ];

    return (
        <div>
            <div className='brandHead'>
                <div><h1>筛选查询</h1></div>
                <div className='brandSearch'>
                    <div>
                        <span>编号: </span>
                        <input type="text" placeholder='如: 100001' />
                    </div>
                    <div>
                        <span>品牌名称: </span>
                        <input type="text" placeholder='如: 东门子' />
                    </div>
                    <button type='button' onClick={search()}>查询</button>
                </div>
            </div>
            <div className='brandList'>
                <Table rowSelection={rowSelection} columns={columns} dataSource={brandList}>
                    {/* <Column title="编号" dataIndex="brandNumber" key="brandNumber" />
                    <Column title="品牌名称" dataIndex="brandName" key="brandName" />
                    <Column title="相关" dataIndex="goodsId" key="goodsId" />
                    <Column title="操作" dataIndex="action" key="action">

                    </Column> */}

                </Table>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandClassify);

