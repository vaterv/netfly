<template>
    <div class="goods_box">

        <div class="goods_control">
            <el-card>
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="商品编号">
                        <el-input v-model="tableData.Gid" placeholder="商品编号"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="商品名称">
                        <el-select v-model="tableData.Gname" placeholder="商品名称">
                            <el-option label="猕猴桃" value="kiwi"></el-option>
                            <el-option label="香蕉" value="banana"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="商品产地">
                        <el-input v-model="tableData.Gcompany" placeholder="商品产地"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
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
                <el-button type="primary" @click="addGoods()">确认添加</el-button>
            </div>
        </el-dialog>



        <!-- 商品资料表格 -->
        <div class="goods_table">
            <el-card>
                <el-table ref="multipleTable" :data="goodsTableData" tooltip-effect="dark" style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="image" label="商品图片" width="200">
                        <!-- <img :src="Gpic" alt=""> -->
                    </el-table-column>
                    <el-table-column prop="goodsNumber" label="商品编号" width="180">
                    </el-table-column>
                    <el-table-column prop="goodsName" label="商品名称" width="180">
                    </el-table-column>
                    <el-table-column prop="goodsBrand" label="商品产地" width="250">
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
                        :total="pageTotal">
                    </el-pagination>
                </div>

            </el-card>


        </div>

    </div>
</template>

<script>

export default {

    data() {
        return {
            tableData: [
                {
                    Gpic: './../pic/kiwi.jpg',
                    Gid: '1031',
                    Gname: '猕猴桃',
                    Gcompany: '上海市岚天鲜果有限公司',
                    Gprice: '5元/kg',
                },
                {
                    Gpic: './../pic/kiwi.jpg',
                    Gid: '1032',
                    Gname: '猕猴桃',
                    Gcompany: '上海市岚天鲜果有限公司',
                    Gprice: '5元/kg',
                },
                {
                    Gpic: './../pic/banana.jpg',
                    Gid: '1033',
                    Gname: '香蕉',
                    Gcompany: '上海市岚天鲜果有限公司',
                    Gprice: '3元/kg',
                },
                {
                    Gpic: './../pic/banana.jpg',
                    Gid: '1034',
                    Gname: '香蕉',
                    Gcompany: '上海市岚天鲜果有限公司',
                    Gprice: '3元/kg',
                },
                {
                    Gpic: './../pic/banana.jpg',
                    Gid: '1033',
                    Gname: '香蕉',
                    Gcompany: '上海市岚天鲜果有限公司',
                    Gprice: '3元/kg',
                },
                {
                    Gpic: './../pic/banana.jpg',
                    Gid: '1034',
                    Gname: '香蕉',
                    Gcompany: '上海市岚天鲜果有限公司',
                    Gprice: '3元/kg',
                },
                {
                    Gpic: './../pic/banana.jpg',
                    Gid: '1034',
                    Gname: '香蕉',
                    Gcompany: '上海市岚天鲜果有限公司',
                    Gprice: '3元/kg',
                },
                {
                    Gpic: './../pic/banana.jpg',
                    Gid: '1034',
                    Gname: '香蕉',
                    Gcompany: '上海市岚天鲜果有限公司',
                    Gprice: '3元/kg',
                },
            ],

            currentPage: 1, // 当前页
            pageSize: 10,
            pageTotal: 0,
            goodsTableData: [],
            dialogTableVisible: false,
            dialogFormVisible: false,
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


        }
    },
    created() {
        // this.$axios({
        //     url:'/api/goodsData/list',
        //     method:'post',
        // })
        this.addSupplier()
    },
    mounted() {
        this.renderGoods()
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
                url: "/api/vendor/findAll",
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
            this.renderGoods();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.renderGoods();
        },

        // 添加商品
        addGoods() {
            this.$axios({
                url: "/api/goodsData/add",
                method: 'post',
                data: {
                    goodsNumber: this.goodsId,
                    goodsName: this.goodsName,
                    onlinePrice: this.goodsPrice,
                    costPrice: this.goodsCost,
                    weight: this.goodsWeight,
                    defaultVendorId: this.supplierId,
                    vendorName: ''
                    // image: this.file.url,
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
                    this.dialogFormVisible = false
                    let enterWeight = document.getElementById('enterWeight');
                    let enterCost = document.getElementById('enterCost');
                    let enterPrice = document.getElementById('enterPrice');
                    enterWeight.style.backgroundColor = 'white'
                    enterCost.style.backgroundColor = 'white'
                    enterPrice.style.backgroundColor = 'white'
                }
            })


        },
        // 渲染商品列表数据
        renderGoods() {
            this.$axios({
                url: "/api/goodsData/list",
                method: 'post',
                data: {

                    limit: this.pageSize,
                    page: this.currentPage,
                },
                headers: {
                    token: sessionStorage.getItem("token")
                }
            }).then((res) => {
                // console.log(res);
                this.pageTotal = Number(res.data.count);
                console.log(res.data.data);
                this.goodsTableData = res.data.data

                if (res.data.code === 0) {
                }
            })

        },


        // 删除函数
        del(id) {
            // console.log(id);
            // console.log(typeof id);
            this.$axios({
                url: "/api/goodsData/delete",
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
    height: 100%;
}

.goods_control {
    width: 90%;
    height: 15%;
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