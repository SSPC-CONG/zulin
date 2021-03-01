<template>
    <div>
        <el-container style="border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1','2', '3']">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">账号管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>订单管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">订单管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-setting"></i>商品管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">商品管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <span>管理员</span>
                </el-header>

                <el-main style="padding:0">
                    <el-table :data="userList">
                        <el-table-column prop="nickname" label="昵称">
                        </el-table-column>
                        <el-table-column prop="username" label="账号" >
                        </el-table-column>
                        <el-table-column prop="password" label="密码" >
                        </el-table-column>
                        <el-table-column prop="tel" label="电话">
                        </el-table-column>
                        <el-table-column prop="sex" label="性别" >
                        </el-table-column>
                        <el-table-column prop="vendor" label="是否是卖家">
                        </el-table-column>
                        <el-table-column prop="id" label="操作">
                            <template slot-scope="scope">
                                <el-button @click="edit(scope.row)" type="text" size="small" >编辑</el-button>
                                <el-button @click="deleteUser(scope.row.id)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-container>
        <el-drawer
                title="修改用户信息"
                :visible.sync="userDrawer"
                direction="ttb"
                :before-close="handleClose">
            <el-form :inline="true" size="small " :model="formInline" class="demo-form-inline" style="padding-left:20px;">
                <el-form-item label="昵称" label-width="50px">
                    <el-input v-model="formInline.user" placeholder="昵称"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="formInline.user" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formInline.user" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="formInline.user" placeholder="电话"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="formInline.user" placeholder="性别"></el-input>
                </el-form-item>
                <el-form-item label="是否是卖家">
                    <el-input v-model="formInline.user" placeholder="是否是卖家"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>

<script>
    export default {
        name: "Manager",
        data() {
            const user = {
                id:1,
                username: "pc666",
                password: '123456',
                tel: '123456',
                sex: '男',
                nickname:"pc666",
                vendor: 1
            };
            return {
                userList: Array(20).fill(user),
                userDrawer:false,
                formInline: {
                    user: '',
                    region: ''
                },
            }
        },
        methods: {
            edit(obj){
                this.userDrawer = true;
            },
            deleteUser(idx){
                console.log(idx)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        }
    };
</script>