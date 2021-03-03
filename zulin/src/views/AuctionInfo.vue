<style scoped src='./../assets/css/auctionInfo.css'>
</style>
<template>
  <div>
    <header>
      <div>
        <el-button type="text" @click="outLogin">退出登录</el-button>
      </div>
      <div class="welcome">
        <div>hi! {{ user.nickname }}</div>
      </div>
      <div class="head_photo">
        <img :src="user.headPhoto" alt="" />
      </div>
      <div class="home_logo">
        您好！欢迎来到龙虾市场 | 热线电话：17333727821
      </div>
    </header>
    <div class="concent_title">
      <div class="title_name" v-if="query.auctionInfo.product">
        {{ query.auctionInfo.product.productName }}
      </div>
      <div class="daojiTime">距离拍卖结束还有{{ time }}</div>
      <div class="title_price" v-if="query.auctionInfo.product">
        ￥{{ query.auctionInfo.product.price }}/起拍价
      </div>
    </div>
    <div class="img_arr">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(item, index) in urls" :key="item + index">
          <img :src="item" height="100%" width="100%" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 竞拍列表-->
    <div class="auctionList">
      竞拍列表
      <el-table :data="logList" border :row-class-name="tableRowClassName">
        <el-table-column prop="nickName" label="竞拍者"> </el-table-column>
        <el-table-column prop="price" label="出价"> </el-table-column>
      </el-table>
    </div>
    <!-- 参加竞拍-->
    <div class="postPrice">
      <el-button
        type="primary"
        @click="dialogFormVisible = true"
        v-if="!user.vendor"
        class="jinpai_btn"
        >参加竞拍</el-button
      >
      <el-dialog title="参加竞拍" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="竞价" :label-width="formLabelWidth">
            <el-input
              v-model="price"
              autocomplete="off"
              type="number"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="competeAuctionProduct">
            确定
          </el-button>
        </div>
      </el-dialog>
      <!-- 拍卖结束-->
      <el-dialog
        title="拍卖结束"
        :visible.sync="timeFlag"
        width="30%"
        
      >
        <span>拍卖结束是否要去个人中心查看是否中标</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="timeFlag = false">取 消</el-button>
          <el-button type="primary" @click="toMinePage"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Global from "../assets/js/Global";
export default {
  data() {
    return {
      query: this.$route.query,
      user: JSON.parse(window.sessionStorage.getItem("user")),
      urls: ["", ""],
      token: window.sessionStorage.getItem("token"),
      dialogFormVisible: false,
      time: "",
      timeFlag:false,
      price: 0,
      maxPrice: 0,
      formLabelWidth: "120px",
      logList: [
        {
          nickName: "",
          price: "",
        },
      ],
    };
  },
  created() {
    console.log(this.query);
    this.urls = this.getArrImg();
    this.price = this.query.auctionInfo.product.price;
    this.maxPrice = this.price;
    // console.log(this.urls);
    this.getAuctionLog();
  },
  mounted() {
    this.timemove();
  },
  methods: {
    //跳转到个人中心页
    toMinePage(){
      this.$router.push('/home/mine');
    },
    //倒计时
    timemove() {
      // 获取当前时间
      var d1 = new Date();
      // 定义目标时间
      var d2 = new Date(this.query.auctionInfo.endTime);
      // 定义剩余时间
      var d = d2 - d1;

      // 计算剩余天数
      var toDay = parseInt(d / 1000 / 60 / 60 / 24);
      // 计算剩余小时
      var toHours = parseInt((d / 1000 / 60 / 60) % 24);
      // 计算剩余分钟
      var toMinutes = parseInt((d / 1000 / 60) % 60);
      // 计算剩余秒
      var toSeconds = parseInt((d / 1000) % 60);

      //拼接变量
      var time =
        toDay + "天" + toHours + "小时" + toMinutes + "分钟" + toSeconds + "秒";
      this.time = time;
      // 将拼接好的变量显示在页面

      // 调用定时器,每秒刷新
      var timer = setInterval(this.timemove, 1000);
      // 当剩余时间小于等于0时,停止定时器,并输出计时结束
      if (d <= 0) {
        window.clearInterval(timer);
        this.time = "拍卖结束";
        this.timeFlag = true;
      }
    },
    //退出登录
    outLogin() {
      window.sessionStorage.clear();
      this.$router.push("/");
    },
    //参加拍卖
    competeAuctionProduct: function () {
      if (this.price > this.maxPrice) {
        this.$http({
          method: "post",
          url: "/auction/competeAuctionProduct",
          headers: {
            token: this.token,
          },
          data: {
            price: this.price,
            auctionId: this.query.id,
          },
        }).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "参与成功",
              type: "success",
            });
            this.getAuctionLog();
          }
          this.dialogFormVisible = false;
        });
      } else {
        this.$message({
          message: "参与竞拍的价格必须要比现在最贵的多",
          type: "warning",
        });
      }
    },
    //获取所有竞拍列表
    getAuctionLog: function () {
      this.$http({
        method: "post",
        url: "/auction/getAuctionLog/" + this.query.id,
        headers: {
          token: this.token,
        },
      }).then((res) => {
        this.logList = res.data.data;
        // console.log(res.data);
      });
    },
    //将img放入数组
    getArrImg: function () {
      let arr = [];
      if (this.query.auctionInfo.product.img1.length > 0) {
        arr.push(this.query.auctionInfo.product.img1);
      }
      if (this.query.auctionInfo.product.img2.length > 0) {
        arr.push(this.query.auctionInfo.product.img2);
      }
      if (this.query.auctionInfo.product.img3.length > 0) {
        arr.push(this.query.auctionInfo.product.img3);
      }
      if (this.query.auctionInfo.product.img4.length > 0) {
        arr.push(this.query.auctionInfo.product.img4);
      }
      // console.log(arr);
      return arr;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 0) {
        return "success-row";
      }
      return "";
    },
  },
};
</script>