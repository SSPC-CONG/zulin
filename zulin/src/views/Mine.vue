<template>
  <div id="concent">
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
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="pingjia(scope.row)" type="text" size="small"
              >评价</el-button
            >
          </template>
        </el-table-column>
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
        <el-table-column prop="product.productName" label="商品名">
        </el-table-column>
        <el-table-column prop="product.productDetails" label="商品信息">
        </el-table-column>
        <el-table-column prop="price" label="我参与的竞价"> </el-table-column>
        <el-table-column label="是否中标">
          <template slot-scope="scope">
            {{ scope.row.flag==1 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column label="是否支付">
          <template slot-scope="scope">
            {{ scope.row.zhifu ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="becomeOrder(scope.row)" type="text" size="small"
              >支付</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 收货信息 -->
    <div class="mygoods">
      我的收货信息
      <el-table
        ref="multipleTable"
        :data="getGoods"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange2"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="address" label="收货地址"></el-table-column>
        <el-table-column prop="receiptName" label="收货人"></el-table-column>
        <el-table-column prop="receiptTel" label="联系电话"></el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button type="primary" @click="dialogFormVisible = true">
          增加收货信息
        </el-button>
        <el-button type="primary" @click="handleDefaultInfo">
          设为默认收货地址
        </el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
    <!-- 对话框 -->
    <el-dialog title="填写信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="收货地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input v-model="form.receiptName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.receiptTel" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleNewReceipt()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="填写评论" :visible.sync="pinglun">
      <el-form :model="form">
        <el-form-item label="评价" :label-width="formLabelWidth">
          <el-input v-model="pinglunInfo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pinglun = false">谢谢，不写了</el-button>
        <el-button type="primary" @click="handlePingjia()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scoped src='./../assets/css/mine.css'>
</style>
<script>
import Global from "./../assets/js/Global";
export default {
  data() {
    return {
      row: {},
      radio: "1",
      order: [],
      selectId: [],
      defaultReceiptId: null,
      Global: Global,
      token: window.sessionStorage.getItem("token"),
      confirmInfo: "确认收货",
      user: JSON.parse(window.sessionStorage.getItem("user")),
      mineAuction: [
        {
          flag: 0,
          price: 0,
          product: {
            productDetails: "",
            productName: "",
          },
        },
      ],
      form: {
        address: "",
        receiptName: "",
        receiptTel: "",
      },
      getGoods: [],
      dialogFormVisible: false,
      pinglun: false,
      pinglunInfo: "",
      formLabelWidth: "120px",
    };
  },
  created() {
    this.radio = this.user.vendor ? "2" : "1";
    this.getAllOrderInfo();
    this.confirmInfo = this.user.vendor ? "确认发货" : "确认收货";
    console.log("order:", this.order);
    if (!this.user.vendor) {
      this.handleGetMineAuction();
    }
    this.handleSelectReceiptList();
  },
  methods: {
    pingjia(row) {
      //console.log(row)
      this.pinglun = true;
      this.row = row;
    },
    //生成评价
    handlePingjia() {
      this.$http({
        method: "post",
        url: "/estimate/addEstimate",
        headers: {
          token: this.token,
        },
        data: {
          context: this.pinglunInfo,
          orderId: this.row.orderId,
        },
      }).then((res) => {
        this.$message({
          message: "评论成功",
          type: "success",
        });
        this.pinglun = false;
      });
    },
    //生成订单
    becomeOrder: function (row) {
      console.log(row);
      if (this.defaultReceiptId && row.flag && !row.zhifu) {
        this.$http({
          method: "post",
          headers: {
            token: this.token,
          },
          url: "/auction/checkAuctionForBuy",
          data: {
            auctionId: row.auctionId,
            buyId: this.user.id,
            receiptId: this.defaultReceiptId,
          },
        }).then((res) => {
          this.handlePay(row, res.data.data);
        });
      } else {
        this.$message({
          message: "先选择一个默认的收货地址",
          type: "error",
        });
      }
    },
    //设置默认收货信息
    handleDefaultInfo: function () {
      this.$message({
        message: "设置成功",
        type: "success",
      });
    },
    //新增收货信息
    handleNewReceipt: function () {
      this.$http({
        method: "post",
        url: "/receipt/addReceipt",
        headers: {
          token: this.token,
        },
        data: this.form,
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: "增加成功",
            type: "success",
          });
          this.handleSelectReceiptList();
          this.dialogFormVisible = false;
        }
      });
    },
    //支付
    handlePay: function (row, orderId) {
      if (row.flag == 1) {
        this.$http({
          method: "post",
          url: "/pay",
          headers: {
            token: this.token,
          },
          data: {
            auctionId: row.auctionId,
            orderId: orderId,
            url:window.location.href,
          },
        }).then((res) => {
          const div = document.createElement("div"); // 创建div
          div.innerHTML = res.data; // 将返回的form 放入div
          document.body.appendChild(div);
          document.forms[0].submit();
        });
      } else {
        this.$message({
          message: "对不起你还没中标",
          type: "error",
        });
      }
    },
    //拉取收货信息列表
    handleSelectReceiptList: function () {
      this.$http({
        method: "post",
        url: "/receipt/selectReceiptList",
        headers: {
          token: this.token,
        },
      }).then((res) => {
        console.log(res);
        this.getGoods = res.data.data;
      });
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
    handleSelectionChange2(val) {
      this.defaultReceiptId = val[0].id;
      console.log(val);
      console.log(this.defaultReceiptId);
      //console.log('选中',this.multipleSelection);
      // this.selectId = [];
      // val.map((item) => {
      //   this.selectId.push(item.orderId);
      // });
      // console.log(this.selectId)
    },
    handleSelectionChange(val) {
      console.log(val);
      //console.log('选中',this.multipleSelection);
      this.selectId = [];
      val.map((item) => {
        this.selectId.push(item.orderId);
      });
      console.log(this.selectId);
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
        this.getAllOrderInfo();
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
        this.mineAuction = res.data.data;
      });
    },
  },
};
</script>