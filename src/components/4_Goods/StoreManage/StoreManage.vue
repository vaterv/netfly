<template>
    <div class="goods_box">

        <!-- 表格控制台 -->
        <div class="goods_control">
            <el-card>
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="店铺编号">
                        <el-input v-model="Snumber" placeholder="商品编号"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺名称">
                        <el-input v-model="Sname" placeholder="商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="供应商">
                        <el-select class="modalIpt" v-model="Vid" placeholder="请选择供应商">
                            <el-option v-for="item in supplier" :key="item.id" :label="item.vendorName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchGoods">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" class="el-icon-loading" @click="renderStore"></el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>


        <!-- 添加模态框 -->
        <el-dialog title="新增商品" :visible.sync="dialogFormVisible">
            <el-form :model="form">

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="店铺编号" :label-width="formLabelWidth">
                            <el-input class="modalIpt" v-model="storeId"
                                onKeyUp="value = value.replace(/[^a-z0-9]|^[^a-z]/ig,'')" autocomplete="off"
                                style="width:250px" placeholder="以英文字母开头，如：K1031">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="店铺名称" :label-width="formLabelWidth">
                            <el-input class="modalIpt" v-model="storeName" autocomplete="off" style="width:250px"
                                placeholder="请输入正确名称">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="平台" :label-width="formLabelWidth">
                            <el-input class="modalIpt" id="enterPrice" v-model="plat" autocomplete="off"
                                style="width:250px" placeholder="如：淘宝">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="店铺地址" :label-width="formLabelWidth">
                            <el-input class="modalIpt" id="enterCost" v-model="storeAddress" autocomplete="off"
                                style="width:250px" placeholder="如：http://xxx">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <!-- <el-col :span="11">
                        <el-form-item label="商品数量" :label-width="formLabelWidth">
                            <el-input class="modalIpt" id="enterWeight" @keyup.native="enterWeight"
                                v-model="goodsWeight" autocomplete="off" style="width:250px" placeholder="单位 kg">
                            </el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="11">
                        <el-form-item label="供应商" :label-width="formLabelWidth">
                            <el-select class="modalIpt" v-model="supplierId" placeholder="请选择供应商">
                                <!-- <el-option v-for="item in supplier" :key="item.id" :lable="item.vendorName"
                                    :value="item.id">
                                    {{item.vendorName}}
                                </el-option> -->
                                <el-option v-for="item in supplier" :key="item.id" :label="item.vendorName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>


                <!-- 上传图片 -->
                <!-- <el-form-item label="商品图片" :label-width="formLabelWidth">
                    <el-upload action="#" list-type="picture-card" ref="upload" class="add_pic"
                        :auto-upload="false">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item> -->
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="closeModal">取 消</el-button>
                <el-button type="primary" @click="addStore()">确认添加</el-button>
            </div>
        </el-dialog>



        <!-- 店铺资料表格 -->
        <div class="goods_table">
            <el-card>
                <el-table ref="multipleTable"
                    :data="storeTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                    tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column label="店铺图片" width="200">
                        <el-image src="http://49.234.21.177:81/82de34cfb81c4e69bc5a091a34e7b9d6.jpg"
                            style="height:100px" alt=""></el-image>
                    </el-table-column>
                    <el-table-column prop="username" label="店铺编号" width="180">
                    </el-table-column>
                    <el-table-column prop="storeName" label="店铺名称" width="180">
                    </el-table-column>
                    <el-table-column prop="platform" label="平台" width="250">
                    </el-table-column>
                    <el-table-column prop="address" label="店铺地址" width="180">
                    </el-table-column>
                    <el-table-column label="操作">

                        <!-- 修改，删除按钮 -->
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" style="margin-right:10px" circle size="mini"
                                @click="modify(scope.row)"></el-button>

                            <el-popconfirm @confirm="del(scope.row.id)" title="确定删除吗？">
                                <el-button type="danger" style="margin-right:10px" slot="reference" size="mini"
                                    icon="el-icon-delete" circle></el-button>
                            </el-popconfirm>
                        </template>

                    </el-table-column>
                </el-table>

                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage" :page-size="pageSize" background layout="prev, pager, next, jumper"
                        :total="storeTableData.length">
                    </el-pagination>
                </div>
            </el-card>
        </div>

        <!-- 修改模态框 -->
        <el-dialog title="提示" :visible.sync="modifyDialog">
            <el-form :model="modifyFormData" ref="ruleForm" class="demo-ruleForm">

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="店铺编号" prop="goodsNumber" :label-width="formLabelWidth">
                            <el-input class="modalIpt" v-model="modifyFormData.storeId"  autocomplete="off"
                                style="width:250px">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="店铺名称" prop="goodsName" :label-width="formLabelWidth">
                            <el-input class="modalIpt" v-model="modifyFormData.storeName" autocomplete="off" 
                                style="width:250px">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="平台" prop="onlinePrice" :label-width="formLabelWidth">
                            <el-input class="modalIpt" v-model="modifyFormData.plat" autocomplete="off"
                                style="width:250px">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="店铺地址" prop="costPrice" :label-width="formLabelWidth">
                            <el-input class="modalIpt" v-model="modifyFormData.storeAddress" autocomplete="off"
                                style="width:250px" >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <!-- <el-row>
                    <el-col :span="11">
                        <el-form-item label="商品数量" prop="weight" :label-width="formLabelWidth">
                            <el-input class="modalIpt" id="enterWeight" @keyup.native="enterWeight" readonly
                                v-model="modifyFormData.goodsWeight" autocomplete="off" style="width:250px"
                                placeholder="单位 kg">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="商品品牌" prop="goodsBrand" :label-width="formLabelWidth">
                            <el-input class="modalIpt" v-model="modifyFormData.goodsBrand" autocomplete="off"
                                style="width:250px">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->

                <el-form-item label="供应商" prop="defaultVendorId" :label-width="formLabelWidth">
                    <el-select class="modalIpt" readonly v-model="modifyFormData.supplierId" placeholder="请选择供应商">
                        <!-- <el-option v-for="item in supplier" :key="item.id" :lable="item.vendorName"
                                    :value="item.id">
                                    {{item.vendorName}}
                                </el-option> -->
                        <el-option v-for="item in supplier" :key="item.id" :label="item.vendorName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modifyDialog = false">取 消</el-button>
                <el-button type="primary" @click="sureModify()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>

export default {

    data() {
        return {
            tableData: [],

            currentPage: 1, // 当前页
            pageSize: 5,
            pageTotal: null,
            storeTableData: [],
            dialogFormVisible: false,
            modifyDialog: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px',
            file: null,
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            supplier: [],
            supplierId: null,
            storeId: null,
            storeName: '',
            plat: null,
            storeAddress: null,
            goodsWeight: null,
            logisticsId: null,
            Snumber: null,
            Sname: null,
            Vid: null,
            modifyFormData: {
                storeId: "", // 商品编号
                goodstoreNamesName: "", //商品名称
                plat: "", //商品售价
                storeAddress: "", // 商品成本
                supplierId: "", //供应商
                id: "", //供应商

            },
            tempData: [],


        }
    },
    created() {
        // this.$axios({
        //     url:'/goodsData/list',
        //     method:'post',
        // })
        this.addSupplier()
    },
    mounted() {
        this.renderStore()
        // this.getGoodsData()

    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        onSubmit() {
            console.log('submit!');
        },

        // 正则判断
        enterPrice() {
            let enterPrice = document.getElementById('enterPrice');
            let reg = /[0-9]$/;
            // console.log(this.goodsPrice);
            // console.log(reg.test(this.goodsPrice));
            if (this.goodsPrice.length != 0) {
                for (let i = 0; i < this.goodsPrice.length; i++) {
                    if (!(reg.test(this.goodsPrice))) {
                        enterPrice.style.backgroundColor = 'red'
                    } else {
                        enterPrice.style.backgroundColor = 'white'

                    }
                }

            }
            else {
                enterPrice.style.backgroundColor = 'red'
            }
            return true;
        },
        enterCost() {
            let enterCost = document.getElementById('enterCost');
            let reg = /[0-9]$/;
            // console.log(this.goodsPrice);
            // console.log(reg.test(this.goodsPrice));
            if (this.goodsCost.length != 0) {
                for (let i = 0; i < this.goodsCost.length; i++) {
                    if (!(reg.test(this.goodsCost))) {
                        enterCost.style.backgroundColor = 'red'
                    } else {
                        enterCost.style.backgroundColor = 'white'

                    }
                }

            }
            else {
                enterCost.style.backgroundColor = 'red'
            }
            return true;
        },
        enterWeight() {
            let enterWeight = document.getElementById('enterWeight');
            let reg = /[0-9]$/;
            // console.log(this.goodsPrice);
            // console.log(reg.test(this.goodsPrice));
            if (this.goodsWeight.length != 0) {
                for (let i = 0; i < this.goodsWeight.length; i++) {
                    if (!(reg.test(this.goodsWeight))) {
                        enterWeight.style.backgroundColor = 'red'
                    } else {
                        enterWeight.style.backgroundColor = 'white'

                    }
                }

            }
            else {
                enterWeight.style.backgroundColor = 'red'
            }
            return true;
        },



        //查询
        searchGoods() {
            this.$axios({
                url: "/store/findAll",
                method: 'get',
                headers: {
                    token: sessionStorage.getItem("token")
                }
            }).then((res) => {
                // console.log(res);
                this.pageTotal = Number(res.data.data.length);

                this.storeTableData = []
                if (res.data.code === 0) {
                    // console.log(res.data.data);
                    // console.log(this.supplier);
                    this.tempData = res.data.data
                    // console.log(this.tempData);

                    if (this.Vid != null) {
                        if (this.Snumber === null) {
                            if (this.Sname === null) {
                                console.log(this.Vid);
                                for (let k = 0; k < this.tempData.length; k++) {
                                    if (this.tempData[k].supplyId === this.Vid) {
                                        this.storeTableData.push(this.tempData[k])
                                    }
                                }

                            } else {
                                for (let k = 0; k < this.tempData.length; k++) {
                                    if (this.tempData[k].supplyId === this.Vid && this.tempData[k].storeName == this.Sname) {
                                        this.storeTableData.push(this.tempData[k])
                                    }
                                }

                            }
                        } else if (this.Sname === null) {
                            for (let k = 0; k < this.tempData.length; k++) {
                                if (this.tempData[k].supplyId === this.Vid && this.tempData[k].username === this.Snumber) {
                                    this.storeTableData.push(this.tempData[k])
                                }
                            }

                        } else {
                            for (let k = 0; k < this.tempData.length; k++) {
                                if (this.tempData[k].supplyId === this.Vid && this.tempData[k].username === this.Snumber && this.tempData[k].storeName === this.Sname) {
                                    this.storeTableData.push(this.tempData[k])
                                }

                            }
                        }

                    } else {
                        if (this.Sname === null) {
                            for (let k = 0; k < this.tempData.length; k++) {
                                if (this.tempData[k].username === this.Snumber) {
                                    this.storeTableData.push(this.tempData[k])
                                }

                            }

                        } else if (this.Snumber === null) {
                            for (let k = 0; k < this.tempData.length; k++) {
                                if (this.tempData[k].storeName == this.Sname) {
                                    this.storeTableData.push(this.tempData[k])
                                }

                            }
                        } else {
                            for (let k = 0; k < this.tempData.length; k++) {
                                if (this.tempData[k].username === this.Snumber && this.tempData[k].storeName == this.Sname) {
                                    this.storeTableData.push(this.tempData[k])
                                }

                            }
                        }
                    }
                }
            })
        },

        // 关闭新增模态框
        closeModal() {
            console.log(this.dialogFormVisible);
            this.storeId=''
            this.storeName=''
            this.plat=''
            this.storeAddress=''
            this.supplierId=''

            this.dialogFormVisible = false
        },

        // 上传图片
        // changePic() {
        //     // console.log(e.target.files[0]);
        //     // console.log(this.$refs.inputImg.files[0]);
        //     // this.file = e.target.files[0];
        //     // console.log(1);

        //     // let formData = new FormData()
        //     // let file = item.file
        //     // formData.append('file', file)
        //     console.log(file);

        // },
        handleRemove(file) {
            // console.log(file);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            // console.log(file);
        },


        // 选择供应商
        addSupplier() {
            this.$axios({
                url: "/vendor/findAll",
                method: 'get',
                // params:{

                // },
                // data:{

                // },
                // headers: {
                //     token: sessionStorage.getItem("token")
                // }
            }).then((res) => {
                // console.log(res);

                if (res.data.code === 0) {
                    // console.log(res.data);
                    // console.log(res.data.data);
                    this.supplier = res.data.data
                    // console.log(this.supplier);

                }
            })
        },


        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.renderStore();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.renderStore();
            this.currentPage = val
        },

        // 添加店铺
        addStore() {
            this.$axios({
                url: "/store/add",
                method: 'post',
                data: {
                    username: this.storeId,
                    storeName: this.storeName,
                    platform: this.plat,
                    address: this.storeAddress,
                    supplyId: this.supplierId,
                    logisticsId: 11,


                },
                headers: {
                    token: sessionStorage.getItem("token")
                }
            }).then((res) => {
                // console.log(res);

                if (res.data.code === 0) {
                    // console.log(res.data.data);
                    this.storeId = ''
                    this.storeName = ''
                    this.plat = ''
                    this.storeAddress = ''
                    this.supplierId = ''
                    this.dialogFormVisible = false
                    this.renderStore()
                }
            })


        },
        // 渲染店铺列表数据
        renderStore() {
            this.Sname = null
            this.Snumber = null
            this.Vid = null
            this.flag = false
            this.$axios({
                url: "/store/findAll",
                method: 'get',
                headers: {
                    token: sessionStorage.getItem("token")
                }
            }).then((res) => {
                // console.log(res);
                this.pageTotal = Number(res.data.data.length);

                if (res.data.code === 0) {
                    // console.log(res.data.data);
                    // console.log(this.supplier);

                    this.storeTableData = res.data.data
                    console.log(this.storeTableData);
                }
            })

        },

        // 修改函数
        modify(row) {
            this.modifyDialog = true;
            this.modifyFormData.storeId = row.username, // 商品编号
                this.modifyFormData.storeName = row.storeName, //商品名称
                this.modifyFormData.plat = row.platform, //商售价
                this.modifyFormData.storeAddress = row.address, // 商品成本
                this.modifyFormData.supplierId = row.supplyId //供应商
            this.modifyFormData.id = row.id //供应商

        },
        // 确认修改
        sureModify() {
            this.$axios({
                url: "/store/update",
                method: "post",
                data: {
                    username: this.modifyFormData.storeId,
                    storeName: this.modifyFormData.storeName,
                    platform: this.modifyFormData.plat,
                    address: this.modifyFormData.storeAddress,
                    supplyId: this.modifyFormData.supplierId,
                    id: this.modifyFormData.id,
                    logisticsId: 11,


                },
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.code === 0) {
                        this.renderStore()
                        this.modifyDialog = false;
                    }
                })
                .catch((err) => {
                    // console.log(err);
                });

        },

        // 删除函数
        del(id) {
            // console.log(id);
            // console.log(typeof id);
            this.$axios({
                url: "/store/delete",
                method: "get",
                params: {
                    id: id,
                },
            })
                .then((res) => {
                    if (res.data.code === 0) {
                        console.log(res);
                        this.renderStore()
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },


    }

}
</script>


<style lang="less" >
.goods_box {
    background-color: #f1f2f7;
    width: 100%;
    height: 160%;
}

.goods_control {
    width: 90%;
    height: 8%;
    margin: 0px 5%;
    border: 0px;
}

.goods_control>.el-card {
    width: 100%;
    height: 100%;
    border: 0px;
    position: relative;
    top: 20px;

}

.add_modal {
    visibility: hidden;
    position: absolute;
    top: 200px;
    left: 400px;
}

.goods_table {
    width: 90%;
    height: 60%;
    margin: 40px 5%;
    border: 0px;
}

.el-table {
    padding: 10px 30px 30px 30px;
}

.table_icon {
    width: 30px;
    height: 30px;
    text-align: center;
}

// i {
//     width: 30px;
//     height: 30px;
//     position: relative;
//     top: -4px;
//     left: -12px;

// }

.block {
    margin: 20px 0px 0px 0px;
}

.el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    cursor: pointer;
    line-height: 80px;
    text-align: center;
    vertical-align: top;
}

.el-popover {
    position: absolute;
    background: #FFF;
    min-width: 150px;
    border-radius: 4px;
    border: 1px solid #EBEEF5;
    padding: 20px;
    z-index: 2000;
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 14px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    word-break: break-all;
}
</style>