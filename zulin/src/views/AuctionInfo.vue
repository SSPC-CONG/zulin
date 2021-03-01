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
        <el-carousel-item v-for="item in urls" :key="item">
          <img :src="item"  height="100%" width="100%"/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: this.$route.query,
      user: JSON.parse(window.sessionStorage.getItem("user")),
      urls: ["", ""],
    };
  },
  created() {
    console.log(this.query);
    this.urls = this.getArrImg();
    console.log(this.urls);
    this.getAuctionLog();
  },
  methods: {
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