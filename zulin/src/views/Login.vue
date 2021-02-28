
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
      // console.log(this.username)
      // console.log(this.password)
      if(this.username.length==0||this.password.length==0){
        alert('账号和密码不能为空');
        return;
      }
      let params = {
        username:this.username,
        password:this.password
      }
      this.$http({
        method:'post',
        url:'/user/loginUser',
        headers:{
          "Content-Type": "application/json",
          
        },
        data:params
      }).then((response)=>{
        //console.log(response)
        if(response.data.code!=200){
          alert('账号或密码错误');
        }else{
          console.log(response)
          window.sessionStorage.setItem('token',response.data.data.token)
          window.sessionStorage.setItem('user',JSON.stringify(response.data.data.user) )
          this.$router.push('/home/auction')
        }
      })
      
    },
    //跳转注册页面
    toRegiester:function(){
      this.$router.push('/register')
    }
  },
}
</script>