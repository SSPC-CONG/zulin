
<template>
  <div id="concent" class="pr">
    <div class="login_form pa">
      <div class="form_title">
        账号密码登陆
      </div>
      <div class="zu_form">
        <div class="u_name">         
          <el-input v-model="username" placeholder="请输入用户名"></el-input>
        </div>
        <div class="u_name">          
          <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
        </div>
        <el-button type="success" @click="loginIn">登陆</el-button>
        <div class="register pa">
            <a class="" @click="toRegiester">账号注册</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped src="./../assets/css/Login.css">
</style>
<script>
export default {
  data(){
    return{
      username:'',
      password:'',
    }
  },
  methods:{
    //登陆
    loginIn:function(){
      console.log(this.username)
      console.log(this.password)
      this.$router.push('/home')
    },
    //跳转注册页面
    toRegiester:function(){
      this.$router.push('/register')
    }
  },
}
</script>