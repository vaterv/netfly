<template>
    <div class="goods_box">

        <!-- 表格控制台 -->
        <div class="goods_control">
            <el-card>
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="商品编号">
                        <el-input v-model="Gnumber" placeholder="商品编号"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称">
                        <el-input v-model="Gname" placeholder="商品名称"></el-input>
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
                        <el-button type="warning" class="el-icon-loading" @click="renderGoods"></el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>


        <!-- 添加模态框 -->
        <el-dialog title="新增商品" :visible.sync="dialogFormVisible">
            <el-form :model="form">

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="商品编号" :label-width="formLabelWidth">
                            <el-input class="modalIpt" v-model="goodsId"
                                onKeyUp="value = value.replace(/[^a-z0-9]|^[^a-z]/ig,'')" autocomplete="off"
                                style="width:250px" placeholder="以英文字母开头，如：K1031">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="商品名称" :label-width="formLabelWidth">
                            <el-input class="modalIpt" v-model="goodsName" autocomplete="off" style="width:250px"
                                placeholder="请输入正确名称">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="商品售价" :label-width="formLabelWidth">
                            <el-input class="modalIpt" id="enterPrice" @keyup.native="enterPrice" v-model="goodsPrice"
                                autocomplete="off" style="width:250px" placeholder="单位 元/kg">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="商品成本" :label-width="formLabelWidth">
                            <el-input class="modalIpt" id="enterCost" @keyup.native="enterCost" v-model="goodsCost"
                                autocomplete="off" style="width:250px" placeholder="单位 元/kg">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="11">
                        <el-form-item label="商品数量" :label-width="formLabelWidth">
                            <el-input class="modalIpt" id="enterWeight" @keyup.native="enterWeight"
                                v-model="goodsWeight" autocomplete="off" style="width:250px" placeholder="单位 kg">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="供应商" :label-width="formLabelWidth">
                            <el-select class="modalIpt" v-model="supplierId" placeholder="请选择供应商">
                                <el-option v-for="item in supplier" :key="item.id" :label="item.vendorName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>


                <!-- 上传图片 -->
                <el-form-item label="商品图片" :label-width="formLabelWidth">
                    <el-upload action="#" list-type="picture-card" ref="upload" class="add_pic" :on-change="imgChange">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="closeModal">取 消</el-button>
                <el-button type="primary" @click="addGoods()">确认添加</el-button>
            </div>
        </el-dialog>



        <!-- 商品资料表格 -->
        <div class="goods_table">
            <el-card>
                <el-table ref="multipleTable"
                    :data="goodsTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                    tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column label="商品图片" width="200">
                        <template slot-scope="scope">
                            <el-image :src="scope.row.image" style="height:100px" alt=""></el-image>

                        </template>
                    </el-table-column>
                    <el-table-column prop="goodsNumber" label="商品编号" width="180">
                    </el-table-column>
                    <el-table-column prop="goodsName" label="商品名称" width="180">
                    </el-table-column>
                    <el-table-column prop="vendorName" label="供应商" width="250">
                    </el-table-column>
                    <el-table-column prop="onlinePrice" label="商品售价" width="180">
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
                        :total="goodsTableData.length">
                    </el-pagination>
                </div>
            </el-card>
        </div>

        <!-- 修改模态框 -->
        <el-dialog title="提示" :visible.sync="modifyDialog">
            <el-form :model="modifyFormData" ref="ruleForm" class="demo-ruleForm">

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="商品编号" prop="goodsNumber" :label-width="formLabelWidth">
                            <el-input class="modalIpt" v-model="modifyFormData.goodsId" autocomplete="off"
                                style="width:250px">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="商品名称" prop="goodsName" :label-width="formLabelWidth">
                            <el-input class="modalIpt" v-model="modifyFormData.goodsName" autocomplete="off"
                                style="width:250px" placeholder="请输入正确名称">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="商品售价" prop="onlinePrice" :label-width="formLabelWidth">
                            <el-input class="modalIpt" v-model="modifyFormData.goodsPrice" autocomplete="off"
                                style="width:250px" placeholder="单位 元/kg">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="商品成本" prop="costPrice" :label-width="formLabelWidth">
                            <el-input class="modalIpt" v-model="modifyFormData.goodsCost" autocomplete="off"
                                style="width:250px" placeholder="单位 元/kg">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
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
                </el-row>

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

                <el-form-item label="商品图片" :label-width="formLabelWidth">
                    <el-upload action="#" list-type="picture-card" ref="upload" class="add_pic" :on-change="imgChange">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
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
            goodsTableData: [],
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
            goodsId: null,
            goodsName: '',
            goodsPrice: null,
            goodsCost: null,
            goodsWeight: null,
            supplierId: null,
            Gnumber: null,
            Gname: null,
            Vid: null,
            modifyFormData: {
                goodsId: "", // 商品编号
                goodsName: "", //商品名称
                goodsPrice: "", //商品售价
                goodsCost: "", // 商品成本
                goodsWeight: "", //商品数量
                goodsBrand: "", //商品品牌
                supplierId: "", //供应商
                goodsImage: "", //图片
                id: "", //供应商

            },
            tempData: [],
            flag: false,
            fileList: [],
            entity: {},
            // formData: []，
            imageAdd: {}

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
        this.renderGoods()
        // this.getGoodsData()

    },
    methods: {
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
            this.flag = true
            this.currentPage = 1
            // this.handleCurrentChange(1)
            this.$axios({
                url: "/goodsData/findAll",
                method: 'get',
                headers: {
                    token: sessionStorage.getItem("token")
                }
            }).then((res) => {
                // console.log(res);
                this.pageTotal = Number(res.data.data.length);

                this.goodsTableData = []
                if (res.data.code === 0) {
                    // console.log(res.data.data);
                    // console.log(this.supplier);
                    this.tempData = res.data.data
                    // console.log(this.tempData);
                    for (let i = 0; i < this.tempData.length; i++) {
                        // console.log(this.tempData[i].defaultVendorId);
                        for (let j = 0; j < this.supplier.length; j++) {
                            // console.log(this.supplier[j].id);
                            if (this.tempData[i].defaultVendorId === this.supplier[j].id) {
                                this.tempData[i]["vendorName"] = this.supplier[j].vendorName
                            }
                            // console.log(this.supplier[j].id);
                        }
                    }
                    if (this.Vid != null) {
                        if (this.Gnumber === null) {
                            if (this.Gname === null) {
                                console.log(this.Vid);
                                for (let k = 0; k < this.tempData.length; k++) {
                                    if (this.tempData[k].defaultVendorId === this.Vid) {
                                        this.goodsTableData.push(this.tempData[k])
                                    }
                                }

                            } else {
                                for (let k = 0; k < this.tempData.length; k++) {
                                    if (this.tempData[k].defaultVendorId === this.Vid && this.tempData[k].goodsName == this.Gname) {
                                        this.goodsTableData.push(this.tempData[k])
                                    }
                                }

                            }
                        } else if (this.Gname === null) {
                            for (let k = 0; k < this.tempData.length; k++) {
                                if (this.tempData[k].defaultVendorId === this.Vid && this.tempData[k].goodsNumber === this.Gnumber) {
                                    this.goodsTableData.push(this.tempData[k])
                                }
                            }

                        } else {
                            for (let k = 0; k < this.tempData.length; k++) {
                                if (this.tempData[k].defaultVendorId === this.Vid && this.tempData[k].goodsNumber === this.Gnumber && this.tempData[k].goodsName === this.Gname) {
                                    this.goodsTableData.push(this.tempData[k])
                                }

                            }
                        }

                    } else {
                        if (this.Gname === null) {
                            for (let k = 0; k < this.tempData.length; k++) {
                                if (this.tempData[k].goodsNumber === this.Gnumber) {
                                    this.goodsTableData.push(this.tempData[k])
                                }

                            }

                        } else if (this.Gnumber === null) {
                            for (let k = 0; k < this.tempData.length; k++) {
                                if (this.tempData[k].goodsName == this.Gname) {
                                    this.goodsTableData.push(this.tempData[k])
                                }

                            }
                        } else {
                            for (let k = 0; k < this.tempData.length; k++) {
                                if (this.tempData[k].goodsNumber === this.Gnumber && this.tempData[k].goodsName == this.Gname) {
                                    this.goodsTableData.push(this.tempData[k])
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
            this.goodsId = ''
            this.goodsName = ''
            this.goodsPrice = ''
            this.goodsCost = ''
            this.goodsWeight = ''
            this.supplierId = ''
            this.dialogFormVisible = false
            let enterWeight = document.getElementById('enterWeight');
            let enterCost = document.getElementById('enterCost');
            let enterPrice = document.getElementById('enterPrice');
            enterWeight.style.backgroundColor = 'white'
            enterCost.style.backgroundColor = 'white'
            enterPrice.style.backgroundColor = 'white'
        },




        // 选择供应商
        addSupplier() {
            this.$axios({
                url: "/vendor/findAll",
                method: 'get',
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
            // console.log(`每页 ${val} 条`);
            // this.currentPage = val
            if (this.flag === true) {
                this.searchGoods();
                this.currentPage = val

            } else {
                this.renderGoods()
                this.currentPage = val
            }
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            if (this.flag === true) {
                this.searchGoods();
                this.currentPage = val

            } else {
                this.renderGoods()
                this.currentPage = val
            }
        },


        // 上传图片
        imgChange(item) {
            let formData = new FormData()
            let file = item.raw
            formData.append('file', file)
            console.log(file);
            this.$axios({
                url: '/uploadImage',
                method: 'post',
                data: {
                    image: formData.get('file')
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                console.log(res);
                if (res.data.code === 0) {
                    console.log(res.data.data);
                    this.imageAdd = res.data.data
                }
            })

        },

        // 添加商品
        addGoods() {

            this.$axios({
                url: "/goodsData/add",
                method: 'post',
                data: {
                    goodsNumber: this.goodsId,
                    goodsName: this.goodsName,
                    onlinePrice: this.goodsPrice,
                    costPrice: this.goodsCost,
                    weight: this.goodsWeight,
                    defaultVendorId: this.supplierId,
                    image: this.imageAdd,


                    alertInventory: 0,
                    banGoods: 0,
                    created: "2022-07-20T10:02:17.456Z",
                    description: "string",
                    floatCost: 0,
                    gift: 0,
                    goodsArticleNumber: "string",
                    goodsBrand: "云南果时",
                    id: null,
                    lowestPrice: 0,
                    maxInventory: 0,
                    measureUnit: "string",
                    measureWay: "string",
                    minInventory: 0,
                    purchaseUsefulUnit: "string",
                    saleUsefulUnit: "string",
                    shelvesStatus: 0,
                    status: 0,
                    tagPrice: 0,
                    unitVolume: 0,
                    updated: "2022-07-20T10:02:17.456Z",
                    warehouseUsefulUnit: "string",
                },
                headers: {
                    token: sessionStorage.getItem("token")
                }
            }).then((res) => {
                console.log(res);

                if (res.data.code === 0) {
                    console.log(res.data.data);
                    this.goodsId = ''
                    this.goodsName = ''
                    this.goodsPrice = ''
                    this.goodsCost = ''
                    this.goodsWeight = ''
                    this.supplierId = ''
                    this.image = ''
                    this.dialogFormVisible = false
                    let enterWeight = document.getElementById('enterWeight');
                    let enterCost = document.getElementById('enterCost');
                    let enterPrice = document.getElementById('enterPrice');
                    enterWeight.style.backgroundColor = 'white'
                    enterCost.style.backgroundColor = 'white'
                    enterPrice.style.backgroundColor = 'white'
                    this.renderGoods()
                }
            })

        },
        // 渲染商品列表数据
        renderGoods() {
            this.Gname = null
            this.Gnumber = null
            this.Vid = null
            this.flag = false
            this.$axios({
                url: "/goodsData/findAll",
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
                    this.tempData = res.data.data
                    // console.log(this.tempData);
                    for (let i = 0; i < this.tempData.length; i++) {
                        // console.log(this.tempData[i].defaultVendorId);
                        for (let j = 0; j < this.supplier.length; j++) {
                            // console.log(this.supplier[j].id);
                            if (this.tempData[i].defaultVendorId === this.supplier[j].id) {
                                this.tempData[i]["vendorName"] = this.supplier[j].vendorName
                            }
                            // console.log(this.supplier[j].id);
                        }
                    }
                    this.goodsTableData = this.tempData
                    console.log(this.goodsTableData);
                }
            })

        },

        // 修改函数
        modify(row) {
            this.modifyDialog = true;
            this.modifyFormData.goodsId = row.goodsNumber, // 商品编号
            this.modifyFormData.goodsName = row.goodsName, //商品名称
            this.modifyFormData.goodsPrice = row.onlinePrice, //商品售价
            this.modifyFormData.goodsCost = row.costPrice, // 商品成本
            this.modifyFormData.goodsWeight = row.weight, //商品数量
            this.modifyFormData.goodsBrand = row.goodsBrand, //商品品牌
            this.modifyFormData.supplierId = row.defaultVendorId //供应商
            this.imageAdd = row.image //供应商
            this.modifyFormData.id = row.id //供应商

        },
        // 确认修改
        sureModify() {
            this.$axios({
                url: "/goodsData/update",
                method: "post",
                data: {
                    goodsNumber: this.modifyFormData.goodsId,
                    goodsName: this.modifyFormData.goodsName,
                    onlinePrice: this.modifyFormData.goodsPrice,
                    costPrice: this.modifyFormData.goodsCost,
                    weight: this.modifyFormData.goodsWeight,
                    goodsBrand: this.modifyFormData.goodsBrand,
                    defaultVendorId: this.modifyFormData.supplierId,
                    image: this.imageAdd,
                    id: this.modifyFormData.id,


                    alertInventory: 0,
                    banGoods: 0,
                    created: "2022-07-20T10:02:17.456Z",
                    description: "string",
                    floatCost: 0,
                    gift: 0,
                    goodsArticleNumber: "string",
                    lowestPrice: 0,
                    maxInventory: 0,
                    measureUnit: "string",
                    measureWay: "string",
                    minInventory: 0,
                    purchaseUsefulUnit: "string",
                    saleUsefulUnit: "string",
                    shelvesStatus: 0,
                    status: 0,
                    tagPrice: 0,
                    unitVolume: 0,
                    updated: "2022-07-20T10:02:17.456Z",
                    warehouseUsefulUnit: "string",
                },
            })
                .then((res) => {
                    console.log(res);
                    console.log(this.modifyFormData.goodsPrice);
                    if (res.data.code === 0) {
                        this.renderGoods()
                        this.modifyDialog = false;
                        this.imageAdd = ''
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        },

        // 删除函数
        del(id) {
            // console.log(id);
            // console.log(typeof id);
            this.$axios({
                url: "/goodsData/delete",
                method: "get",
                params: {
                    id: id,
                },
            })
                .then((res) => {
                    if (res.data.code === 0) {
                        console.log(res);
                        this.renderGoods()
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

