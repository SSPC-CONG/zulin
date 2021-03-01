<template>
  <div>
    <div @click="becomeSeller" class="beSeller" v-if="!Global.user.vendor">
      操作:
      <el-radio v-model="radio" label="1" disabled>成为买家</el-radio>
      <el-radio v-model="radio" label="2">成为卖家</el-radio>
    </div>
    <div class="order">
      我的订单：
      <el-table
        ref="multipleTable"
        :data="order"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="createTime"
          label="开始时间"
          width="250"
        ></el-table-column>
        <el-table-column
          prop="product.productName"
          label="商品名称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="product.productDetails"
          label="商品信息"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="product.price"
          label="价格"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="180"
        ></el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button type="primary" @click="handleChangeOrderStatus()">{{
          confirmInfo
        }}</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
    <!-- 我参与的拍卖 -->
    <div class="myJoin">
      我参与的拍卖：
      <el-table :data="mineAuction" border style="width: 100%">
        <el-table-column prop="product.productName" label="商品名" width="120">
        </el-table-column>
        <el-table-column
          prop="product.productDetails"
          label="商品信息"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="price" label="我参与的竞价" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped src='./../assets/css/mine.css'>
</style>
<script>
import Global from "./../assets/js/Global";
export default {
  data() {
    return {
      radio: "1",
      order: [],
      selectId: [],
      Global: Global,
      confirmInfo: "确认收货",
      mineAuction: [
        {
          flag: false,
          price: 0,
          product: {
            productDetails: "",
            productName: "",
          },
        },
      ],
    };
  },
  created() {
    this.radio = JSON.parse(window.sessionStorage.getItem("user")).vendor
      ? "2"
      : "1";
    this.getAllOrderInfo();
    this.confirmInfo = Global.user.vendor ? "确认发货" : "确认收货";
    console.log("order:", this.order);
    if (Global.user.vendor) {
      this.handleGetMineAuction();
    }
  },
  methods: {
    //成为卖家
    becomeSeller: function () {
      console.log("成为卖家");
      this.$http({
        method: "put",
        url: "/user/turnIntoVendor",
        headers: {
          token: Global.token,
        },
      }).then((response) => {
        if (response.data.code == 200) {
          let user = JSON.parse(window.sessionStorage.getItem("user"));
          user.vendor = true;
          window.sessionStorage.setItem("user", JSON.stringify(user));
          history.go(0);
          this.radio = "2";
        }
      });
    },
    //获取所有订单信息
    getAllOrderInfo: function () {
      this.$http
        .get("/order/getOrderListByUserId", {
          headers: {
            token: Global.token,
          },
        })
        .then((res) => {
          console.log(res);
          this.order = res.data.data;
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //console.log('选中',this.multipleSelection);
      this.selectId = [];
      val.map((item) => {
        this.selectId.push(item.orderId);
      });
      //console.log(this.selectId)
    },
    //修改订单状态
    handleChangeOrderStatus() {
      let url = Global.user.vendor
        ? "/order/updateOrderStatusForSellers"
        : "/order/updateOrderStatusForBuys";
      // console.log('user',Global.user.vendor)
      // console.log('url',url)
      this.$http({
        method: "post",
        url: url,
        headers: {
          token: Global.token,
        },
        data: {
          orderIds: this.selectId,
        },
      }).then((res) => {
        console.log(res);
      });
    },
    //获取我参与的拍卖
    handleGetMineAuction() {
      this.$http({
        method: "post",
        url: "/auction/getMyAuction",
        headers: {
          token: Global.token,
        },
      }).then((res) => {
        //console.log(res);
        this.mineAuction = res.data.data
      });
    },
  },
};
</script>