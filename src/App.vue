<template>
  <div id="app">
    <img src="./assets/icon.png">
    <SimpleDraggable/>
  </div>
</template>

<script>
import SimpleDraggable from './components/SimpleDraggable'

export default {
  name: 'App',
  components: {
    SimpleDraggable
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html {
  min-height: 100%;
  background: url(./assets/the-fishermen-3039591_1920.jpg) no-repeat fixed left top / cover;
  overflow: hidden;
}
.bg-f {
  position: fixed;
  bottom: 10px;
  left: 10px;
  font-size: 12px;
  line-height: 14px;
  font-weight: normal;
  color: #f0f0f0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}
</style>
