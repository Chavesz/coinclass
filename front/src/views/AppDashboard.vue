<template>
  <div>
    <AppNavbar />
    <h1>Dashboard</h1>
    <p>Resumo financeiro com gráficos e dados.</p>
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";
export default {
  components: { AppNavbar }
};
</script>

<style scoped>
h1 {
  color: #333;
}