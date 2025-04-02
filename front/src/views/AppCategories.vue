<template>
  <div class="categories-container">
    <AppNavbar />

    <div class="categories-content">
      <h1>Categorias</h1>
      <p>Organize suas transações por categorias.</p>

      <!-- Formulário para adicionar nova categoria -->
      <div class="add-category">
        <input v-model="newCategory" type="text" placeholder="Nova categoria" />
        <button @click="addCategory">Adicionar</button>
      </div>

      <!-- Lista de Categorias -->
      <div class="categories-list">
        <ul>
          <li v-for="(category, index) in categories" :key="index">
            {{ category }}
            <button class="delete-btn" @click="removeCategory(index)">🗑</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  components: { AppNavbar },
  data() {
    return {
      newCategory: "",
      categories: ["Alimentação", "Transporte", "Lazer", "Saúde", "Salário"]
    };
  },
  methods: {
    addCategory() {
      if (this.newCategory.trim() !== "" && !this.categories.includes(this.newCategory)) {
        this.categories.push(this.newCategory);
        this.newCategory = "";
      }
    },
    removeCategory(index) {
      this.categories.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.categories-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
}

.categories-content {
  width: 90%;
  max-width: 600px;
}

h1 {
  color: #333;
}

/* Formulário para adicionar categoria */
.add-category {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.add-category input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.add-category button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #5c6bc0;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.add-category button:hover {
  background-color: #3f4e8c;
}

/* Lista de Categorias */
.categories-list ul {
  list-style: none;
  padding: 0;
}

.categories-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: white;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: red;
}

.delete-btn:hover {
  color: darkred;
}
</style>
