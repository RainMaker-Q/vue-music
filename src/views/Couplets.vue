<template >
    <div class="main">
        
        <img class="pic" src="../assets/ddc.jpeg">

        <GenCouplets></GenCouplets>

         <div class="footer">
            面朝大海
            <a href="https://github.com/LRQLRQ/vue-music">
                <img height="30px" width="30px" src="../assets/github.jpeg">
            </a>
            春暖花开
        </div>
    </div>
</template>

<script>
import GenCouplets from '@/components/GenCouplets.vue'

export default {
    name: 'couplets',
    components: {
        GenCouplets
    }
}
</script>


<style scoped>
.main {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #eee;
    font-family: "Helvetica Neue", "PingFang SC", Helvetica, Arial, "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif; 
}

.pic {
    margin-top: 50px;
    margin-bottom: 50px; 
    width: 500px;
    height: 300px;
}

.footer {
    position: absolute;
    width: 100%;
    bottom: 10px;
    height: 34px;font-size: 18px;
    /* color: blue; */
    
}
</style>