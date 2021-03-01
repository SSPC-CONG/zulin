<style scoped src='./../assets/css/GoodsList.css'>
</style>
<template>
  <div>
    <ul class="list">
      <li v-for="item in list.result" :key="item.id" class="item" @click="toAuctionInfo(item.id)">
        <img :src="item.product.img1" alt="" />
        <div class="goodsInfo" >
          {{ item.product.productDetails }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods:{
    toAuctionInfo:function (id) {
      console.log(1)
      this.$router.push({path:'/auctionInfo',query:{id:id,auctionInfo:this.list.result.filter(function(item){
        return item.id == id;
      })[0] }})
    }
  }
};
</script>