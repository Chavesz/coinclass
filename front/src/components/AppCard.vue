<template>
  <div :class="['card', type]">
    <h3>{{ title }}</h3>
    <p>{{ value }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: String,
    type: String
  }
};
</script>

<style scoped>
.card {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: white;
  font-size: 1.2em;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.income {
  background-color: #4CAF50;
}

.expense {
  background-color: #E53935;
}

.balance {
  background-color: #1E88E5;
}
</style>
