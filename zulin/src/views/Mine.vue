<template>
  <div>
    <div @click="becomeSeller" class="beSeller" v-if="!user.vendor">
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
    <div class="myJoin" v-if="!user.vendor">
      我参与的拍卖：
      <el-table :data="mineAuction" border style="">
        <el-table-column prop="product.productName" label="商品名" >
        </el-table-column>
        <el-table-column
          prop="product.productDetails"
          label="商品信息"
        >
        </el-table-column>
        <el-table-column prop="price" label="我参与的竞价" >
        </el-table-column>
        <el-table-column  label="是否中标" >
          <template slot-scope="scope">
            {{scope.row.flag?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <el-button  @click="handlePay(scope.row)" type="text" size="small">支付</el-button>
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
      token:window.sessionStorage.getItem('token'),
      confirmInfo: "确认收货",
      user:JSON.parse(window.sessionStorage.getItem('user')),
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
    this.radio = this.user.vendor
      ? "2"
      : "1";
    this.getAllOrderInfo();
    this.confirmInfo = this.user.vendor ? "确认发货" : "确认收货";
    console.log("order:", this.order);
    if (!this.user.vendor) {
      this.handleGetMineAuction();
    }
  },
  methods: {
    //支付
    handlePay:function(row){
      if(row.flag){
        this.$http({
          method:'post',
          url:'/pay',
          headers:{
            token:this.token,
          },
          data:{
            auctionId:row.auctionId,
            orderId:1
          },
        }).then((res)=>{
          let body = document.getElementsByTagName('body')[0];
          body.innerHTML = res.data;
          let form = document.getElementsByTagName('form')[0];
          form.style.height = 100+'vh'
        })
      }else{
        this.$message({
          message:'对不起你还没中标',
          type:'error'
        })
      }
    },
    //成为卖家
    becomeSeller: function () {
      console.log("成为卖家");
      this.$http({
        method: "put",
        url: "/user/turnIntoVendor",
        headers: {
          token: this.token,
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
            token: this.token,
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
      let url = this.user.vendor
        ? "/order/updateOrderStatusForSellers"
        : "/order/updateOrderStatusForBuys";
      // console.log('url',url)
      this.$http({
        method: "post",
        url: url,
        headers: {
          token: this.token,
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
          token: this.token,
        },
      }).then((res) => {
        //console.log(res);
        this.mineAuction = res.data.data
      });
    },
  },
};
</script>