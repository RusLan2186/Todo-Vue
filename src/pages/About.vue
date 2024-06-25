<template>
  <h1>This application creared by <span class="title">Chyrkov Ruslan</span> </h1>
  <ul class="contacts__list">
      <li class="title"> Phone: <a class="item__hover" href="tel:+380680710003">+380680710003</a></li>
      <li class="title"> Email: <a class="item__hover" href="mailto:ruslan.chyrkov@gmail.com">ruslan.chyrkov@gmail.com</a></li>
      <li class="title"> Telegram: <a class="item__hover" href="https://t.me/ruslananatolich" target="_blank">@ruslananatolich</a></li>
      <li class="title"> LinkedIn: <a class="item__hover" href="https://www.linkedin.com/in/rusanatolich86/" target="_blank">https://www.linkedin.com/in/rusanatolich86/</a></li>
    </ul>

</template>

<script>
export default {

}
</script>

<style scope>

.title{
  color: #55a45e;
  font-weight: 700;
}

.title a{
  color: black;
}

.contacts__list{
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}
</style>