<template>
  <div class="skeleton-post">
    <div class="skeleton__header">
      <div class="skeleton skeleton-id"></div>
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton-buttons">
        <div class="skeleton skeleton-btn"></div>
        <div class="skeleton skeleton-btn"></div>
      </div>
    </div>

    <div class="skeleton skeleton-text">

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.skeleton {
  background: linear-gradient(-90deg, #e0e0e0 0%, #f5f5f5 50%, #e0e0e0 100%);
  background-size: 400% 400%;
  animation: shimmer 1.2s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: -135% 0%;
  }
}

.skeleton__header {
  display: flex;
  justify-content: space-between;
}

.skeleton-id {
  height: 24px;
  width: 50px;
  margin-bottom: 16px;
}

.skeleton-title {
  height: 24px;
  width: 50%;
  margin-bottom: 16px;
}

.skeleton-buttons {
  display: flex;
  justify-content: space-between;
  column-gap: 15px;
  height: 24px;
  width: 20%;
}

.skeleton-btn {
  width: 40%;
}

.skeleton-text {
  height: 50px;
  width: 100%;
  margin-bottom: 8px;
}

.skeleton-post {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  border: 3px solid #e0e0e0;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
