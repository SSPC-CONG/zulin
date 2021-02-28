<template>
  <div @click="becomeSeller">
    <el-radio v-model="radio" label="1" disabled>成为买家</el-radio>
    <el-radio v-model="radio" label="2" >成为卖家</el-radio>
  </div>
</template>
<script>
import Global from "./../assets/js/Global";
export default {
  data() {
    return {
      radio: "1",
    };
  },
  created(){
    this.radio =JSON.parse(window.sessionStorage.getItem('user')).vendor?'2':'1';
  },
  methods: {
    //成为卖家
    becomeSeller: function () {
      console.log("成为卖家");
      this.$http({
        method: "put",
        url: "/user/turnIntoVendor",
        headers: {
          token: Global.token,
        },
      }).then((response)=>{
        if(response.data.code ==200){
          let user =JSON.parse(window.sessionStorage.getItem('user'));
          user.vendor = true;
          window.sessionStorage.setItem('user',JSON.stringify(user))
          history.go(0);
          this.radio = '2'
        }
      });
    },
  },
};
</script>