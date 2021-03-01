<style scoped src='./../assets/css/auctionInfo.css'>
</style>
<template>
  <div>
    <header>
      <div class="welcome">hi! {{ user.nickname }}</div>
      <div class="head_photo">
        <img :src="user.headPhoto" alt="" />
      </div>
      <div class="home_logo">
        您好！欢迎来到张小龙市场 | 热线电话：17333727821
      </div>
    </header>
    <div class="concent_title">
      <div class="title_name" v-if="query.auctionInfo.product">
        {{ query.auctionInfo.product.productName }}
      </div>
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
    <!-- 参加竞拍-->
    <el-button type="" @click="dialogFormVisible = true">参加竞拍</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form >
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
        <el-button type="primary" @click="dialogFormVisible = false">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: this.$route.query,
      user: JSON.parse(window.sessionStorage.getItem("user")),
      urls: ["", ""],
      dialogFormVisible: false,
      price:0,
      formLabelWidth: "120px",
    };
  },
  created() {
    // console.log(this.query);
    this.urls = this.getArrImg();
    this.price=this.query.auctionInfo.product.price;
    // console.log(this.urls);
    //this.getAuctionLog();
  },
  methods: {
    //参加拍卖

    //获取所有竞拍列表
    getAuctionLog: function () {
      this.$http
        .get("/auction/getAuctionLog?auctionId=" + this.query.id)
        .then((response) => {
          console.log(response);
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
  },
};
</script>