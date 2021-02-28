<style scoped src='./../assets/css/put.css'>
</style>
<template>
  <div class="concent">
    <el-form label-width="80px">
      <el-form-item label="上传图片">
        <div class="up_load_img">
          <el-upload
            class="avatar-uploader"
            action="http://47.98.46.41:9696/file/uploadImg"
            :data="{ space: 'home' }"
            :headers="{token:token}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
             <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="http://47.98.46.41:9696/file/uploadImg"
            :data="{ space: 'home' }"
            :headers="{token:token}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl2" :src="imgUrl2" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="http://47.98.46.41:9696/file/uploadImg"
            :data="{ space: 'home' }"
            :show-file-list="false"
            :headers="{token:token}"
            :on-success="handleAvatarSuccess3"
            :before-upload="beforeAvatarUpload"
          >
             <img v-if="imgUrl3" :src="imgUrl3" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="http://47.98.46.41:9696/file/uploadImg"
            :data="{ space: 'home' }"
            :show-file-list="false"
            :headers="{token:token}"
            :on-success="handleAvatarSuccess4"
            :before-upload="beforeAvatarUpload"
          >
             <img v-if="imgUrl4" :src="imgUrl4" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="电话号码">
        <div class="formItemCenter">
          <el-input
            type="number"
            v-model="form.callPhone"
            autocomplete="off"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="房屋信息">
        <div class="formItemCenter">
          <el-input
            type="textarea"
            placeholder="请输入商品信息"
            v-model="form.homeDetails"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </div>
      </el-form-item>
      <el-form-item label="房屋地址">
        <div class="formItemCenter">
          <el-input
            type="textarea"
            placeholder="请输入商品信息"
            v-model="form.homeAddress"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </div>
      </el-form-item>
      <el-form-item label="房屋名字">
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="form.homeName"
          maxlength="10"
          show-word-limit
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即上架</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Global from "./../assets/js/Global";
export default {
  data() {
    return {
      form: {
        callPhone: "",
        homeAddress: "",
        homeDetails: "",
        homeImg1: "",
        homeImg2: "",
        homeImg3: "",
        homeImg4: "",
        homeName: "",
        status: "",
        userId: 0,
      },
      token:Global.token,
      imgUrl: "",
      imgUrl2: "",
      imgUrl3: "",
      imgUrl4: "",
    };
  },
  methods: {
    //提交上架表单
    onSubmit() {
      //console.log(this.form);
      this.$http({
        method: "post",
        url: "/rentOutHome/addRenOutHome",
        headers: {
          token: Global.token,
        },
        data: this.form,
      }).then((response) => {
        if (response.data.code == 200) {
          alert("上架成功");
          history.go(0);
        }
      });
    },
    //成功
    handleAvatarSuccess(res, file) {
      //console.log(res);
      this.imgUrl = URL.createObjectURL(file.raw);
      this.form.homeImg1 = URL.createObjectURL(file.raw);
      console.log(this.form.homeImg1);
    },
    handleAvatarSuccess2(res, file) {
      //console.log(res);
      this.imgUrl2 = URL.createObjectURL(file.raw);
      this.form.homeImg2 = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess3(res, file) {
      //console.log(res);
      this.imgUrl3 = URL.createObjectURL(file.raw);
      this.form.homeImg3 = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess4(res, file) {
      //console.log(res);
      this.imgUrl4 = URL.createObjectURL(file.raw);
      this.form.homeImg4 = URL.createObjectURL(file.raw);
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
  },
};
</script>