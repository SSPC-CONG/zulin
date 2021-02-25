<style scoped src='./../assets/css/home.css'>
</style>
<template>
  <div class="home">
    <header>
      <div class="welcome">hi!{{ user.nickname }}</div>
      <div class="head_photo">
        <img :src="user.headPhoto" alt="" />
      </div>
      <div class="home_logo">您好！欢迎来到张小龙市场    |  热线电话：17333727821</div>
    </header>
    <section>
      <ul class="layui-nav" lay-filter="">
        <li class="layui-nav-item"><a href="">拍卖区</a></li>
        <li class="layui-nav-item layui-this"><a href="">租凭区</a></li>
        <li class="layui-nav-item"><a href="">我的订单</a></li>
        <li class="layui-nav-item" v-if="user.vendor"><a href="">我要上架</a></li>
      </ul>
    </section>
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
      token:'',
    };
  },
  created(){
    //获取token 和 user
    this.token = window.sessionStorage.getItem('token');
    this.user =JSON.parse(window.sessionStorage.getItem('user'))
  }
};
</script>
