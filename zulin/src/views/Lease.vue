<style scoped src='./../assets/css/GoodsList.css'>
</style>
<template>
  <div>
    <div class="search">
      <el-input placeholder="请输入地址" v-model="homeAddress"></el-input>
      <el-input placeholder="请输入房间名" v-model="homeAddress"></el-input>
      <el-switch
        v-model="owner"
        active-text="自己的房子"
        inactive-text="所有的房子"
        v-show="user.vendor"
      >
      </el-switch>
      <el-button type="primary" @click="handleGetLeaseInfo">搜索</el-button>
    </div>
    <ul class="list">
      <li v-for="item in leaseInfo.result" :key="item.id" class="item">
        <img :src="item.homeImg1" alt="" />
        <div class="goodsInfo"></div>
      </li>
    </ul>
    <el-pagination
      layout="prev, pager, next"
      :total="leaseInfo.totalSize"
      :page-size="10"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>
<style scoped src="./../assets/css/lease.css">
</style>
<script>
import Global from "./../assets/js/Global";

export default {
  data() {
    return {
      owner: false,
      pageNo: 1,
      pageSize: 10,
      homeAddress: null,
      homeName: null,
      status: null,
      leaseInfo: {},
      user:Global.user,
    };
  },
  created() {
    //获取租凭信息
    this.handleGetLeaseInfo();
  },
  methods: {
    //改变页码
    currentChange: function (newPage) {
      console.log(newPage);
      this.pageNo = newPage;
      this.handleGetLeaseInfo();
    },
    //获取租凭信息
    handleGetLeaseInfo: function () {
      let params = {
        owner: this.owner,
        page: this.pageNo,
        pageSize: this.pageSize,
        homeAddress: this.homeAddress,
        homeName: this.homeName,
        status: this.status,
      };
      this.$http({
        method: "post",
        url: "/rentOutHome/selectRentOutHomeListByFilter",
        headers: {
          token: Global.token,
        },
        data: params,
      }).then((response) => {
        //console.log(response);
        this.leaseInfo = response.data.data;
        //console.log(this.leaseInfo);
        if (this.leaseInfo.result.length <= 0) {
          this.$message({
            showClose: true,
            message: "没有数据",
            type: "error",
          });
        }
      });
    },
  },
};
</script>