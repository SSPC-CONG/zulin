<template>
  <div>
    <el-container style="border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2', '3']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>用户管理</template
            >
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="acitveFunc(1)"
                >账号管理</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-menu"></i>订单管理</template
            >
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="acitveFunc(2)"
                >订单管理</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-setting"></i>商品管理</template
            >
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="acitveFunc(3)"
                >商品管理</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>管理员</span>
        </el-header>

        <el-main style="padding: 0" v-show="userAc">
          <el-table :data="userList">
            <el-table-column prop="nickname" label="昵称"> </el-table-column>
            <el-table-column prop="username" label="账号"> </el-table-column>
            <el-table-column prop="password" label="密码"> </el-table-column>
            <el-table-column prop="tel" label="电话"> </el-table-column>
            <el-table-column prop="sex" label="性别"> </el-table-column>
            <el-table-column
              prop="vendor"
              label="是否是卖家"
              :formatter="formatBoolean"
            >
            </el-table-column>
            <el-table-column prop="id" label="操作">
              <template slot-scope="userScope">
                <el-button @click="edit(userScope.row)" type="text" size="small"
                  >编辑</el-button
                >
                <el-button
                  @click="deleteUser(userScope.row.id)"
                  type="text"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-main style="padding: 0" v-show="orderAc">
          <el-table :data="orderList">
            <el-table-column prop="orderId" label="订单Id"> </el-table-column>
            <el-table-column prop="status" label="状态"> </el-table-column>
            <el-table-column prop="product.productName" label="产品id">
            </el-table-column>
            <el-table-column prop="receipt.address" label="地址">
            </el-table-column>
          </el-table>
        </el-main>
        <el-main style="padding: 0" v-show="proAc">
          <el-table :data="productList">
            <el-table-column prop="productName" label="产品名字">
            </el-table-column>
            <el-table-column prop="productDetails" label="产品描述">
            </el-table-column>
            <el-table-column prop="price" label="价格"> </el-table-column>
            <el-table-column prop="img1" label="展示图片1">
              <template slot-scope="Img1scope">
                <img
                  :src="Img1scope.row.img1"
                  alt=""
                  style="width: 100px; height: 100px"
                />
              </template>
            </el-table-column>
            <el-table-column prop="img2" label="展示图片4">
              <template slot-scope="Img2scope">
                <img
                  :src="Img2scope.row.img2"
                  alt=""
                  style="width: 100px; height: 100px"
                />
              </template>
            </el-table-column>
            <el-table-column prop="img3" label="展示图片2">
              <template slot-scope="Img3scope">
                <img
                  :src="Img3scope.row.img3"
                  alt=""
                  style="width: 100px; height: 100px"
                />
              </template>
            </el-table-column>
            <el-table-column prop="img4" label="展示图片3">
              <template slot-scope="Img4scope">
                <img
                  :src="Img4scope.row.img4"
                  alt=""
                  style="width: 100px; height: 100px"
                />
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
      :before-close="handleClose"
    >
      <el-form
        :inline="true"
        size="small "
        :model="editUser"
        class="demo-form-inline"
        style="padding-left: 20px"
      >
        <el-form-item label="昵称" label-width="50px">
          <el-input v-model="editUser.nickname" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="editUser.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editUser.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editUser.tel" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="editUser.sex" placeholder="性别"></el-input>
        </el-form-item>
        <el-form-item label="是否是卖家">
          <el-input
            v-model="editUser.vendor ? 1 : 0"
            placeholder="是否是卖家"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkEdit">确认编辑</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import axios from "axios";
export default {
  name: "Manager",
  data() {
    return {
      userList: null,
      orderList: null,
      productList: null,
      userDrawer: false,
      editUser: {
        id: null,
        nickname: null,
        password: null,
        sex: null,
        tel: null,
        username: null,
        vendor: null,
      },
      userAc: true,
      orderAc: false,
      proAc: false,
    };
  },
  methods: {
    acitveFunc(idx) {
      switch (idx) {
        case 1:
          this.userAc = true;
          this.orderAc = false;
          this.proAc = false;
          break;
        case 2:
          this.userAc = false;
          this.orderAc = true;
          this.proAc = false;
          break;
        case 3:
          this.userAc = false;
          this.orderAc = false;
          this.proAc = true;
          break;
      }
      if (this.userAc) {
        var that = this;
        axios({
          method: "get",
          url: "/user/getUserAll",
        })
          .then((response) => {
            if (response.data.code == 200) {
              that.userList = response.data.data;
            }
          })
          .catch((error) => {
            alert("失败");
          });
      }
      if (this.orderAc) {
        var that = this;
        axios({
          method: "get",
          url: "/order/getOrderAll",
        })
          .then((response) => {
            if (response.data.code == 200) {
              that.orderList = response.data.data;
            }
          })
          .catch((error) => {
            alert("失败");
          });
      }
      if (this.proAc) {
        var that = this;
        axios({
          method: "get",
          url: "/product/getProductAll",
        })
          .then((response) => {
            console.log(response);
            if (response.data.code == 200) {
              that.productList = response.data.data;
            }
          })
          .catch((error) => {
            alert("失败");
          });
      }
    },
    formatBoolean: function (row, column, cellValue) {
      var ret = ""; //你想在页面展示的值
      if (cellValue) {
        ret = "是"; //根据自己的需求设定
      } else {
        ret = "否";
      }
      return ret;
    },
    init() {
      var that = this;
      axios({
        method: "get",
        url: "/user/getUserAll",
      })
        .then((response) => {
          if (response.data.code == 200) {
            that.userList = response.data.data;
          }
        })
        .catch((error) => {
          alert("失败");
        });
    },
    edit(obj) {
      this.userDrawer = true;
      var objString = JSON.stringify(obj);
      this.editUser = JSON.parse(objString);
    },
    deleteUser(idx) {
      console.log(idx);
      var that = this;
      axios({
        method: "delete",
        url: "/user/deleteUserById/" + idx,
      })
        .then((response) => {
          if (response.data.data) {
            alert("删除成功");
            location.reload();
          }
        })
        .catch((error) => {
          alert("失败");
        });
    },
    handleClose(done) {
      var that = this;
      this.$confirm("确认关闭？")
        .then((_) => {
          that.editUser = {
            id: null,
            nickname: null,
            password: null,
            sex: null,
            tel: null,
            username: null,
            vendor: null,
          };
          done();
        })
        .catch((_) => {});
    },
    checkEdit() {
      var data = this.editUser;
      var that = this;

      axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        url: "user/updateUserForManager",
        data: JSON.stringify(data),
      })
        .then((response) => {
          if (response.data.code == 200) {
            alert("更新成功");
            location.reload();
          }
        })
        .catch((error) => {
          alert("失败");
        });
    },
  },
  mounted() {
    this.init();
  },
};
</script>