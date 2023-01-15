<template>
    <el-container>
        <el-header>
            <el-dropdown class="el">
                <div class="img">
                    <el-avatar
                        src="https://cdn3.axureshop.com/demo/1967831/images/%E6%BC%94%E7%A4%BA%E6%A1%86%E6%9E%B6/u273.png"
                        class="el-img"></el-avatar>
                    <span class="el-dropdown-link">
                        Kelly
                        <i class="el-icon-caret-bottom el-icon--right" style="padding-left: 5px"></i>
                    </span>
                </div>
                <el-dropdown-menu slot="dropdown" class="el-menu">
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-main>
            <!-- <div>
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark"></div
        ></el-col>
      </el-row>
      </div> -->
            <div class="color">
                <div class="wrapper">
                    <img src="https://cdn3.axureshop.com/demo/1967831/images/%E4%BF%AE%E6%94%B9%E5%AF%86%E7%A0%81/u38.png"
                        alt="" />
                    <span>借款申请</span>

                    <el-row class="button">
                        <el-button type="primary" plain>导入</el-button>
                        <el-button type="primary" plain>导出</el-button>
                        <el-button type="primary" plain @click="deleteVisible = true" class="delete">删除</el-button>

                        <!-- <el-button type="text" @click="dialogVisible = true"
              >点击打开 Dialog</el-button > -->
                        <!-- img="https://cdn3.axureshop.com/demo/1967831/images/%E6%BC%94%E7%A4%BA%E6%A1%86%E6%9E%B6/u282.svg" -->
                        <el-dialog :visible.sync="deleteVisible" width="30%" :before-close="handleClose" class="dialog">
                            <div class="love">
                                <img src="https://cdn3.axureshop.com/demo/1967831/images/%E6%BC%94%E7%A4%BA%E6%A1%86%E6%9E%B6/u282.svg"
                                    alt="" class="img" />
                            </div>

                            <p>删除确认</p>
                            <span>删除后无法恢复，确定要删除此条信息吗？</span>
                            <span slot="footer" class="delete-footer">
                                <el-button @click="deleteVisible = false">取 消</el-button>
                                <el-button type="primary" @click="deleteVisible = false">确 定</el-button>
                            </span>
                        </el-dialog>
                        <el-button type="primary" style="margin-left: 10px">申请借款</el-button>
                    </el-row>
                </div>
                <div class="input">
                    <el-input v-model="input" placeholder="搜索关键词" style="width: 200px"></el-input>
                    <!-- <el-input v-model="input" placeholder="审批状态" style="width:200px" trigger="click"> -->
                    <el-dropdown trigger="click" class="click">
                        <span class="el-dropdown-linkone">
                            审批状态 <i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" style="width: 150px">
                            <el-dropdown-item>待审批</el-dropdown-item>
                            <el-dropdown-item>已通过</el-dropdown-item>
                            <el-dropdown-item>已驳回</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div class="block">
                        <!-- <span class="demonstration">默认</span> -->
                        <el-date-picker type="date" placeholder="申请时间    ~                       申请时间" class="time"
                            style="width: 300px">
                        </el-date-picker>

                        <img src="https://cdn3.axureshop.com/demo/1967831/images/%E7%B3%BB%E7%BB%9F%E9%A6%96%E9%A1%B5/u389.svg"
                            alt="" />
                    </div>
                    <div class="search">
                        <el-row class="button">
                            <el-button type="primary" style="width: 100px">查询</el-button>
                            <el-button type="primary" plain style="width: 100px">重置</el-button>
                        </el-row>
                    </div>
                </div>
                <!-- </el-input> -->

                <!-- </div> -->

                <el-row>
                    <el-table :data="tableData" style="width: 100%" class="link">
                        <el-table-column type="selection" width="60"> </el-table-column>>
                        <el-table-column prop="link" style="color: blue" align="center" label="关联业务" width="180">
                        </el-table-column>
                        <el-table-column prop="money" align="center" label="借款金额" width="180">
                        </el-table-column>
                        <el-table-column prop="reason" align="center" label="借款原因" width="180">
                        </el-table-column>
                        <el-table-column prop="state" align="center" label="审批状态" width="180">
                        </el-table-column>
                        <el-table-column prop="time" align="center" label="申请时间" width="180">
                        </el-table-column>
                        <el-table-column prop="people" align="center" label="申请人员" width="180">
                        </el-table-column>

                        <el-table-column prop="work" align="center" label="操作" width="180" class="item">
                            <i class="el-icon-video-play"></i>
                            <button href="" style="color: blue" class="detail" @click="detailVisible = true">详情</button>
                            <i class="el-icon-delete"></i>
                            <a href="#" style="color: blue" class="delete" @click="deleteVisible1 = true">删除
                            </a>
                            
                        </el-table-column>
                    </el-table><el-dialog :visible.sync="deleteVisible1" width="30%" :before-close="handleClose1"
                                class="dialog">
                                <div class="love">
                                    <img src="https://cdn3.axureshop.com/demo/1967831/images/%E6%BC%94%E7%A4%BA%E6%A1%86%E6%9E%B6/u282.svg"
                                        alt="" class="img" />
                                </div>
                                <p>删除确认</p>
                                <span>删除后无法恢复，确定要删除此条信息吗？</span>
                                <span slot="footer" class="delete-footer">
                                    <el-button @click="deleteVisible1 = false">取 消</el-button>
                                    <el-button type="primary" @click="deleteVisible1 = false">确 定</el-button>
                                </span>
                            </el-dialog>
                            <el-dialog :visible.sync="detailVisible" width="1344px" :before-close="handleClose">
                                <div class="inner-wrapper">
                                    <div class="debt" style="float: left">
                                        <img src="https://cdn3.axureshop.com/demo/1967831/images/%E4%BF%AE%E6%94%B9%E5%AF%86%E7%A0%81/u38.png"
                                            alt="" />
                                        <span style="padding-left: 10px">借款详情</span>
                                    </div>

                                    <el-row class="button">
                                        <el-button type="primary" plain>编辑</el-button>
                                        <el-button type="primary" plain @click="deleteVisible = true">删除</el-button>
                                        <el-dialog :visible.sync="deleteVisible2" width="30%"
                                            :before-close="handleClose">
                                            <div class="love">
                                                <img src="https://cdn3.axureshop.com/demo/1967831/images/%E6%BC%94%E7%A4%BA%E6%A1%86%E6%9E%B6/u282.svg"
                                                    alt="" class="img" />
                                            </div>
                                            <div style="margin:0 auto">
                                                <span>删除确认</span>
                                                <span>删除后无法恢复，确定要删除此条信息吗？</span>
                                            </div>
                                            <span slot="footer">
                                                <el-button @click="deleteVisible = false">取 消</el-button>
                                                <el-button type="primary" @click="deleteVisible = false">确 定</el-button>
                                            </span>
                                        </el-dialog>
                                    </el-row>
                                </div>
                                <div class="amounts">
                                    <span padding-left:20px>借款金额：￥1，000.00</span>
                                    <img src="" alt="" style="height:5px,width:5px" />
                                    <span style="padding-left: 20px">待审批</span>
                                </div>
                                <el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
                                    <el-step title="提交审批"></el-step>
                                    <el-step title="上级审批"></el-step>
                                    <el-step title="财务打款"></el-step>
                                </el-steps>
                                <div class="infomation">
                                    <div class="jiben">
                                        <img src="https://cdn3.axureshop.com/demo/1967831/images/%E4%BF%AE%E6%94%B9%E5%AF%86%E7%A0%81/u38.png"
                                            alt="" />

                                        <span style="padding-left: 20px">基本信息</span>
                                    </div>
                                    <br />
                                    <div class="item">
                                        <p style="margin-left: 38px">
                                            <span style="margin-right: 290px">借款金额
                                                <span style="margin-left: 50px">￥2，000.00</span></span>
                                            <span>提交人员
                                                <span style="margin-left: 50px">张三</span></span>
                                        </p>

                                        <p style="margin-left: 38px">
                                            <span style="margin-right: 315px">借款部门
                                                <span style="margin-left: 50px">销售二部</span></span>
                                            <span>关联客户
                                                <span style="margin-left: 50px"><a href="">上海大话科技有限公司</a></span></span>
                                        </p>

                                        <p style="margin-left: 38px">
                                            <span style="margin-right: 310px">借款原因
                                                <span style="margin-left: 50px">借款原因 </span>
                                            </span>
                                            <span>相关附件
                                                <span style="margin-left: 50px"><a>附件名称.pdf</a></span></span>
                                        </p>

                                        <p style="margin-left: 38px">
                                            <span style="margin-right: 235px">提交时间
                                                <span style="margin-left: 50px">2022-05-23 11：31</span></span>
                                            <span>审批状态
                                                <span style="margin-left: 50px">待审批</span></span>
                                        </p>

                                        <p style="margin-left: 38px">
                                            <span style="margin-right: 350px">审批人员
                                                <span style="margin-left: 50px">李四</span></span>
                                            <span>审批时间 <span style="margin-left: 50px">-</span></span>
                                        </p>
                                    </div>
                                    <hr />
                                    <div>
                                        <div style="float:left">
                                            <img src="https://cdn3.axureshop.com/demo/1967831/images/%E4%BF%AE%E6%94%B9%E5%AF%86%E7%A0%81/u38.png"
                                                alt="" />
                                            <span style="font-size:20px">借款动态</span>
                                        </div>

                                        <br>
                                        <div>
                                            <p>

                                                <img src="https://cdn3.axureshop.com/demo/1967831/images/%E6%A6%82%E5%86%B5%E4%BF%A1%E6%81%AF/u1402.png"
                                                    alt="" style="float:left">
                                                <span style="float:left">05-24</span>
                                            </p>
                                        </div>
                                        <br>
                                        <el-timeline>
                                            <el-timeline-item timestamp="2019/05/24 11:31" placement="top">
                                                <el-card style="background-color: rgb(243, 248, 255)" class="card">
                                                    <h4>李洪</h4>
                                                    <h4>财务打款完成，借款流程完成</h4>
                                                    <p>借款金额： ￥1,000.00</p>
                                                </el-card>
                                            </el-timeline-item>
                                            <el-timeline-item timestamp="2019/05/24 09:31" placement="top">
                                                <el-card style="background-color: rgb(243, 248, 255)" class="card">
                                                    <h4>李四</h4>
                                                    <h4>审批通过，等待财务打款</h4>
                                                    <p>借款金额： ￥1,000.00</p>
                                                </el-card>
                                            </el-timeline-item>
                                            <el-timeline-item timestamp="2022/05/23 22：31" placement="top">
                                                <el-card style="background-color: rgb(243, 248, 255)" class="card">
                                                    <h4>张三</h4>
                                                    <h4>提交审批，等待上级审核</h4>
                                                    <p>借款金额： ￥1,000.00</p>
                                                </el-card>
                                            </el-timeline-item>
                                        </el-timeline>
                                    </div>
                                </div>
                            </el-dialog>
                    <!-- <el-pagination background layout="prev, pager, next" :total="1000" style="float:right" class="el-pagination"  >
    </el-pagination> -->
                    <!-- 分页功能的实现 -->
                    <div class="block-y">
                        <!-- <span class="demonstration">完整功能</span> -->
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="currentPage1" :page-sizes="[10, 20, 30, 40]" :page-size="10"
                            layout="  prev, pager, next, jumper,sizes" :total="1000">
                        </el-pagination>
                    </div>
                </el-row>
            </div>
        </el-main>
    </el-container>
</template>

<script>
export default {
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => { });
        },
        handleClose1(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => { });
        },
    },
    data() {
        return {
            deleteVisible: false,
            deleteVisible1: false,
            detailVisible: false,

            currentPage1: 3,

            input: "",
            tableData: [
                {
                    link: "上海大华科技有限公司",
                    money: "￥15,000.00",
                    reason: "和客户沟通合同相关费用",
                    state: "已通过",
                    time: "2022-06-12 14:15:12",
                    people: "张三",
                    work: "详情  删除",
                },
                {
                    link: "上海大华科技有限公司",
                    money: "￥15,000.00",
                    reason: "和客户沟通合同相关费用",
                    state: "已通过",
                    time: "2022-06-12 14:15:12",
                    people: "张三",
                    work: "详情  删除",
                },
                {
                    link: "上海大华科技有限公司",
                    money: "￥15,000.00",
                    reason: "和客户沟通合同相关费用",
                    state: "已驳回",
                    time: "2022-06-12 14:15:12",
                    people: "张三",
                    work: "详情  删除",
                },
                {
                    link: "上海大华科技有限公司",
                    money: "￥15,000.00",
                    reason: "和客户沟通合同相关费用",
                    state: "待审批",
                    time: "2022-06-12 14:15:12",
                    people: "张三",
                    work: "详情  删除",
                },
                {
                    link: "上海大华科技有限公司",
                    money: "￥15,000.00",
                    reason: "和客户沟通合同相关费用",
                    state: "待审批",
                    time: "2022-06-12 14:15:12",
                    people: "张三",
                    work: "详情  删除",
                },
                {
                    link: "上海大华科技有限公司",
                    money: "￥15,000.00",
                    reason: "和客户沟通合同相关费用",
                    state: "待审批",
                    time: "2022-06-12 14:15:12",
                    people: "张三",
                    work: "详情  删除",
                },
                {
                    link: "上海大华科技有限公司",
                    money: "￥15,000.00",
                    reason: "和客户沟通合同相关费用",
                    state: "待审批",
                    time: "2022-06-12 14:15:12",
                    people: "张三",
                    work: "详情  删除",
                },
                {
                    link: "上海大华科技有限公司",
                    money: "￥15,000.00",
                    reason: "和客户沟通合同相关费用",
                    state: "待审批",
                    time: "2022-06-12 14:15:12",
                    people: "张三",
                    work: "详情  删除",
                },
                {
                    link: "上海大华科技有限公司",
                    money: "￥15,000.00",
                    reason: "和客户沟通合同相关费用",
                    state: "待审批",
                    time: "2022-06-12 14:15:12",
                    people: "张三",
                    work: "详情  删除",
                },
                {
                    link: "上海大华科技有限公司",
                    money: "￥15,000.00",
                    reason: "和客户沟通合同相关费用",
                    state: "待审批",
                    time: "2022-06-12 14:15:12",
                    people: "张三",
                    work: "详情  删除",
                },
            ],

        };
    },
};
</script>

<style lang="less" scoped>
.el {
    float: right;
    cursor: pointer;
    margin-right: 300px;
    vertical-align: middle;
}

.el-dropdown-link {
    cursor: pointer;
    color: black;
}

.el-icon-arrow-down {
    font-size: 15px;
}

.el-menu {
    width: 164px;
    height: 84px;
    /* float:right; */
    margin-right: -100px;
}

.el-img {
    margin-right: 5px;
    float: left;
    margin-top: 15px;
}

.el-dropdown-link {
    display: flex;
    padding-top: 26px;

    /* float: left; */
    /* display: inline-block; */
    /* vertical-align: middle; */
}

.wrapper {
    width: 1385px;
    height: 86px;
    background-color: #f2f7fe;
    padding-left: 20px;
}

.inner-wrapper {
    width: 1144px;
    height: 86px;
    background-color: #f2f7fe;
    padding-left: 20px;
}

.debt {
    padding-top: 30px;
    font-size: 25px;
}

.wrapper>img,
.wrapper>span {
    margin-top: 40px;
    font-size: 20px;
}

.button {
    float: right;
    margin-top: 25px;
    padding-right: 15px;
}

.input {
    margin-top: 20px;
}

.click {
    box-sizing: border-box;
    padding-left: 40px;
    margin-left: 10px;
    padding-top: 8px;
    width: 150px;
    height: 40px;
    border: 1px solid rgb(232, 242, 255);
}

.el-icon-caret-bottom {
    padding-left: 25px;
}

.input {
    display: flex;
    justify-content: start;
}

.time {
    margin-left: 10px;
}

.block {
    width: 500px;
    cursor: pointer;
    /* float: left; */
    position: relative;
}

.block img {
    width: 14px;
    height: 14px;
    position: absolute;
    top: 13px;
    left: 280px;
}

.search {
    margin-top: -28px;
    margin-left: -130px;
}

/* .el-pagination {
 
} */
.block-y {
    float: right;
    margin-top: 20px;
    margin-right: 100px;
    margin-bottom: 20px;
}

.detail {
    margin-right: 20px;
}

a {
    text-decoration: none;
}

.item {
    color: blue;
}

.link {
    margin-top: 30px;
}

.color {
    border: 30px solid rgb(243, 248, 255);
    border-top: 89px;
}

/* .delete{
  position: relative;
} */
/* .button > .dialog {
  text-align: center;
  margin: 0 auto;
  vertical-align: middle;

} */
.dialog {
    text-align: center;
    margin: 0 auto;
    /* vertical-align: bottom; */
    /* background-color: #fff; */
    /* padding-top: 300px; */
    /* vertical-align: text-bottom; */
}

.img {
    height: 63px;
    width: 63px;
}

.delete-footer {
    /* margin: 0 auto;
  align-content: center; */
    margin-right: 120px;
    box-sizing: border-box;
}

.love {
    margin: 0 auto;
    text-align: center;
    vertical-align: middle;
}

.info {
    margin: 0 auto;
    text-align: center;
    vertical-align: middle;
}

/* .shanchu {
  margin: 0 auto;
  text-align: center;
  padding-left: 100px;
} */
.amounts {
    height: 69px;
    width: 1096px;
    background-color: gainsboro;
    text-align: left;
    /* vertical-align: middle; */
    line-height: 69px;
    font-size: 20px;
    padding-right: 20px;
}

.jiben {
    float: left;
    font-size: 25px;
    margin-top: 20px;
}

.item {
    margin-top: 50px;
    text-align: left;
    color: black;
}

.item>p {
    padding-bottom: 30px;
    padding-left: 20px;
}

.item>p>span {
    margin-right: 20px;
    font-size: 16px;
    text-align: left;
}

.card {
    text-align: left;
}
</style>