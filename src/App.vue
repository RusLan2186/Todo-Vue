<template>
    <Header/>
  <div class="app">
     <div class="container">
       <router-view></router-view>
    </div>
   
  </div>
</template>

<script>
import Header from '@/pages/Header.vue'
export default {
  components: {
    Header
}
}
</script>

<style>

.app {
  display: flex;
  justify-content: center;
  padding: 20px;
  font-size: 18px;
  background-color: #cbcbcb;
  min-height: 100vh;
}

.container {
  max-width: 1000px;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(244, 243, 243, 0.1);
  padding:30px;
}

</style>