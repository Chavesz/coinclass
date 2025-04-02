<template>
  <div id="app">
    <AppSidebar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppSidebar from "@/components/AppSidebar.vue";

export default {
  components: { AppSidebar }
};
</script>

<style>
/* Ajustando layout para a sidebar */
.content {
  margin-left: 250px;
  padding: 20px;
  transition: margin-left 0.3s ease;
}

.sidebar-collapsed + .content {
  margin-left: 70px;
}
</style>
