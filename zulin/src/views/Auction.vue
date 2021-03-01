<template>
  <div>
    <div class="search">
      <el-switch
        v-model="isStart"
        active-text='未开始'
        inactive-text="已开始"
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
      isStarting: false,
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
      if(this.isStart){
        this.isStarting = true;
        this.isNoStart = true;
      }
    },
    //获取拍卖信息方法
    handleGetAuctionInfo: function () {
      let params = {
        isNoStart: this.isNoStart,
        isStarting: this.isNoStart,
        page: this.page,
        pageSize: this.pageSize,
      };
      this.$http({
        method: "post",
        url: "/auction/getAuctionListAll",
        headers: {
          token: Global.token,
        },
        data: params,
      }).then((response) => {
        this.list = response.data.data;
        this.auctionInfo = response.data.data;
        console.log(response);
      });
    },
  },
};
</script>