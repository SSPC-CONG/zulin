<style scoped src='./../assets/css/put.css'>
</style>
<template>
  <div class="concent">
    <el-form label-width="80px" :model="form">
      <div class="date">
        <el-form-item label="开始时间">
          <div class="block">
            <el-date-picker
              v-model="form.startTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="结束时间">
          <div class="block">
            <el-date-picker
              v-model="form.endTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </div>
      <el-form-item label="上传图片">
        <div class="up_load_img">
          <el-upload
            class="avatar-uploader"
            action="http://47.98.46.41:9696/file/uploadImg"
            :data="{ space: 'auction' }"
            :headers="{ token: token }"
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
            :data="{ space: 'auction' }"
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
            :data="{ space: 'auction' }"
            :headers="{token:token}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess3"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl3" :src="imgUrl3" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="http://47.98.46.41:9696/file/uploadImg"
            :data="{ space: 'auction' }"
            :headers="{token:token}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess4"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl4" :src="imgUrl4" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="库存">
        <div class="formItemCenter">
          <el-input
            type="number"
            v-model="form.product.inventory"
            autocomplete="off"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="起拍价格">
        <div class="formItemCenter">
          <el-input
            type="number"
            v-model="form.product.price"
            autocomplete="off"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="商品信息">
        <div class="formItemCenter">
          <el-input
            type="textarea"
            placeholder="请输入商品信息"
            v-model="form.product.productDetails"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </div>
      </el-form-item>
      <el-form-item label="商品名字">
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="form.product.productName"
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
        endTime: new Date(),
        startTime: new Date(),
        product: {
          id: 0,
          img1: "",
          img2: "",
          img3: "",
          img4: "",
          inventory: 0,
          price: 0,
          productDetails: "",
          productName: "",
        },
      },
      token: Global.token,
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
        url: "/auction/putAwayProductToAuction",
        headers: {
          token: Global.token,
        },
        data: this.form,
      }).then((response) => {
        if (response.data.code == 200) {
          alert("上架成功");
        
          history.go(0)
        }
      });
    },
    handleSplitImgUrl(imgUrl) {
      let arr = imgUrl.split(":");
      return arr[1] + ":" + arr[2] + ":" + arr[3];
    },
    //成功
    handleAvatarSuccess(res, file) {
      //console.log(res);
      //console.log(res,file)
      this.imgUrl = URL.createObjectURL(file.raw);
      this.form.product.img1 = res.data;
      //console.log(this.form.product.img1);
    },
    handleAvatarSuccess2(res, file) {
      //console.log(res);
      this.imgUrl2 = URL.createObjectURL(file.raw);
      this.form.product.img2 = res.data;
    },
    handleAvatarSuccess3(res, file) {
      //console.log(res);
      this.imgUrl3 = URL.createObjectURL(file.raw);
      this.form.product.img3 = res.data;
    },
    handleAvatarSuccess4(res, file) {
      //console.log(res);
      this.imgUrl4 = URL.createObjectURL(file.raw);
      this.form.product.img4 = res.data;
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