<template>
  <div>
    <div class="search">
      <el-switch
        v-model="isStarting"
        active-text='已开始'
        inactive-text="未开始"
        @change="handleSwitchChange"
      >
      </el-switch>
    </div>
    <GoodsList :list="list"></GoodsList>
    <el-pagination
      layout="prev, pager, next"
      :total="auctionInfo.totalSize"
      :page-size="10"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>
<style scoped src="./../assets/css/auction.css">

</style>
<script>
import GoodsList from "../components/GoodsList";
import Global from "./../assets/js/Global";
export default {
  components: { GoodsList },

  data() {
    return {
      isStart:false,
      isNoStart: false,
      isStarting: true,
      token:window.sessionStorage.getItem('token'),
      page: 1,
      pageSize: 10,
      list: {},
      auctionInfo: {},
    };
  },
  created() {
    //获取拍卖信息
    this.handleGetAuctionInfo();
  },
  methods: {
    //页码修改
    currentChange: function (newPage) {
      console.log(newPage);

      this.page = newPage;
      this.handleGetAuctionInfo();
    },
    //switch改变
    handleSwitchChange:function(){
      this.handleGetAuctionInfo()
    },
    //获取拍卖信息方法
    handleGetAuctionInfo: function () {
      let params = {
        isStarting: this.isStarting,
        page: this.page,
        pageSize: this.pageSize,
      };
      this.$http({
        method: "post",
        url: "/auction/getAuctionListAll",
        headers: {
          token: this.token,
        },
        data: params,
      }).then((response) => {
        this.list = response.data.data;
        this.auctionInfo = response.data.data;
        if(this.auctionInfo.result.length<=0){
          this.$message({
          message: '当前没有拍卖的产品',
          type: 'warning'
        });
        }
        console.log(response);
      });
    },
  },
};
</script>