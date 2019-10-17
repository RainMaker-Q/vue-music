<template>
  <div class="music">
      <div style="position: fixed; width: 100%; height:100%;background:#394348">
        <vue-particles
            color="#dedede"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="4"
            linesColor="#dedede"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
        ></vue-particles>
      </div>
    <SongsTable style="margin-top: 10px;"></SongsTable>

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
import SongsTable from '@/components/SongsTable.vue'
import axios from 'axios'

export default {
    name: 'music',
    data() {
        return {

        }
    },
        
    methods: {

    },
    components: {
        SongsTable
    }
    
}
</script>

<style  scoped>
.footer {
    position: absolute;
    width: 100%;
    bottom: 10px;
    height: 34px;
    font-size: 18px;
    color: white;
}
</style>