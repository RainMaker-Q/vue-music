<template>
  <div id="app">
    <div el-container direction="vertical" class="">
      <div el-header style="background: gray">
        <div id="nav">
          <router-link to="/"><el-button type="danger">Home</el-button></router-link> 
          <router-link to="/about"><el-button type="primary">About</el-button></router-link>  
          <router-link to="/music"><el-button type="success">Music</el-button></router-link>
        </div>

      </div>
      <div el-main>
        <router-view/>
      </div>
    </div>

  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
