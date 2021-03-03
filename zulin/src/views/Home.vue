<style scoped src='./../assets/css/home.css'>
</style>
<template>
  <div class="home">
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
    <nav class="guild">
      <div
        class="menu"
        :class="{ on: on == 'auction' }"
        id="auction"
        @click="handleChangePath('auction')"
      >
        拍卖中心
      </div>
      <div
        class="menu"
        :class="{ on: on == 'lease' }"
        id="lease"
        @click="handleChangePath('lease')"
      >
        租凭中心
      </div>
      <div
        class="menu"
        :class="{ on: on == 'mine' }"
        id="mine"
        @click="handleChangePath('mine')"
      >
        关于我的
      </div>
      <div
        class="menu"
        :class="{ on: on == 'put' }"
        v-if="user.vendor"
        id="put"
        @click="handleChangePath('put')"
      >
        上架拍卖
      </div>
      <div
        class="menu"
        :class="{ on: on == 'putLease' }"
        v-if="user.vendor"
        id="putLease"
        @click="handleChangePath('putLease')"
      >
        上架出租
      </div>
    </nav>
    <section class="concent"><router-view></router-view></section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        nickname: "大聪明",
        headPhoto: require("./../assets/img/login_bg.jpg"),
        vendor: true,
      },
      token: "",
      on: "auction",
    };
  },
  created() {
    if (window.sessionStorage.getItem("path")) {
      this.on = window.sessionStorage.getItem("path");
    }
    //获取token 和 user
    this.token = window.sessionStorage.getItem("token");
    this.user = JSON.parse(window.sessionStorage.getItem("user"));
  },
  methods: {
    //退出登录
    outLogin(){
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    //改变路由
    handleChangePath: function (path) {
      this.$router.push("/home/" + path);
      this.on = path;
      window.sessionStorage.setItem("path", path);
    },
  },
};
</script>
