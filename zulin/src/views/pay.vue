<template>
    <div>
        <div v-html="data"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            data:this.$route.query.data
        }
    },
    created(){
        console.log(this.data)
    }

}
</script>