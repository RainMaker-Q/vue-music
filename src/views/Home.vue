<template>
  <div class="home">
    
    <div>
      <img alt="Vue logo" src="../assets/logo.png">
      <h1><font color="red">用Vue做一些有趣的玩意~ </font></h1>
    </div>

    <!-- <div style="position: fixed; width: 100%; height:100%;background:#394348">
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
    </div> -->
      
    
  </div>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
  }
}
</script>
