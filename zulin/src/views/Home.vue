<style scoped src='./../assets/css/home.css'>
</style>
<template>
  <div class="home">
    <header>
      <div class="welcome">hi!{{ user.nickname }}</div>
      <div class="head_photo">
        <img :src="user.head_photo" alt="" />
      </div>
      <div class="home_logo">dnf娱乐用</div>
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
        head_photo: require("./../assets/img/login_bg.jpg"),
        vendor: true,
      },
    };
  },
};
</script>
