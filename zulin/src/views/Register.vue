<template>
  <div id="concent" class="pr">
    <div class="reigister_form pa">
      <div class="form_title">新用户注册</div>
      <div class="zu_form">
        <div class="u_name">
          <el-input v-model="username" placeholder="请输入用户名"></el-input>
        </div>
        <div class="u_name">
          <el-input
            v-model="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </div>
        <div class="u_name">
          <el-input
            v-model="rePassword"
            placeholder="请确认密码"
            show-password
          ></el-input>
        </div>
        <div class="u_name">
          <el-input v-model="tel" placeholder="请输入电话号码"></el-input>
        </div>
        <div class="u_name">
          <el-input v-model="nickname" placeholder="请输入用户昵称"></el-input>
        </div>
        <div class="u_name">
          <el-radio v-model="sex" label="男">男</el-radio>
          <el-radio v-model="sex" label="女">女</el-radio>
        </div>
        <div class="u_name">
          <el-upload
            class="avatar-uploader"
            action="http://47.98.46.41:9696/file/uploadHeadPhoto"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div>点击上传头像</div>
        </div>
        <div class="u_name">
          <el-radio v-model="vendor" label="true">卖家</el-radio>
          <el-radio v-model="vendor" label="false">买家</el-radio>
        </div>
        <el-button type="success" @click="register">注册</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped src="./../assets/css/Login.css">
</style>
<style scoped src="./../assets/css/register.css">
</style>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      rePassword: "",
      tel: "",
      sex: "男",
      nickname: "",
      head_photo: "",
      vendor: "false",
      imageUrl: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      //console.log(URL.createObjectURL(file.raw))
      this.imageUrl = URL.createObjectURL(file.raw);
      this.head_photo = this.imageUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //注册
    register: function () {
      if (this.password != this.rePassword) {
        alert("两次密码不一致");
        return;
      }
      
      let userInfo = {
        username: this.username,
        password: this.password,
        tel: this.tel,
        sex: this.sex,
        nickname: this.nickname,
        head_photo: this.head_photo,
        vendor: this.vendor=='false'?false:true,
      };
      this.$http({
        method:'post',
        url:'/user/addUser',
        data:userInfo
      }).then((response)=>{
        if(response.data.code!=200){
          alert('服务器错误');
        }else{
          alert('注册成功')
          this.$router.push("/");
        }
      })
      
    },
  },
};
</script>
