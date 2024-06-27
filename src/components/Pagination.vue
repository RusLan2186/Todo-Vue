<template>
  <div class="pages">
    <div class="page" @click="$emit('changePage', page)" :class="{ current__page: page === pageNumber }"
      v-for="page in totalPages" :key="page">
      {{ page }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Array,
      requared: true
    }, 
    pageNumber: {
      type: Number,
      requared: true
    }
  }

}

</script>

<style scoped>

.pages {
  display: flex;
  column-gap: 10px;
  justify-content: flex-end;
}

.page{
  border: 2px solid #55a45e;
  padding: 5px 10px;
  cursor: pointer;
  transition:  0.3s all ease 0s;
}
.page:hover{
  background-color: #55a45e;
  color: #fff;
}

.current__page{
  background-color: #55a45e;
  color: #fff;
}

</style>