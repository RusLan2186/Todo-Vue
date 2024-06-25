<template>
  <div class="header">

    <nav class="nav">
      <router-link class="link" to="/">Posts</router-link>
      <router-link class="link" to="contacts">Contacts</router-link>
    </nav>

  </div>

</template>

<script>
export default {

}
</script>

<style>
.header {
  display: flex;
  justify-content: center;
  column-gap: 15px;
  align-items: center;
  font-size: 20px;
  padding: 10px;
  background-color: #55a45e;
  width: 100vw;
  height: 60px;
}

.nav {
  display: flex;
  column-gap: 20px;
  color: #fff;
  max-width: 1000px;
  width: 100%;

}

.link {
  display: flex;
  height: 60px;
  align-items: center;
  text-replace: none;
}

.link:hover{
  color: #cbcbcb
}

.router-link-active {
  border-bottom: 4px solid #fff;
  margin-top: 2px;
}

</style>