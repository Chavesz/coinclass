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
  padding: 2rem;
  background-color: #f9fafb;
  min-height: 100vh;
}

.categories-content {
  width: 100%;
  max-width: 600px;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

p {
  color: #555;
  margin-bottom: 1.5rem;
}

/* Formulário */
.add-category {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.add-category input {
  flex: 1 1 200px;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.add-category button {
  padding: 0.75rem 1.2rem;
  font-size: 1rem;
  background-color: #5c6bc0;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.add-category button:hover {
  background-color: #3f4e8c;
}

/* Lista de Categorias */
.categories-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.categories-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  font-size: 1rem;
  color: #333;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #e53935;
  transition: color 0.3s;
}

.delete-btn:hover {
  color: #b71c1c;
}

/* Responsividade */
@media (max-width: 500px) {
  h1 {
    font-size: 1.6rem;
  }

  .add-category {
    flex-direction: column;
    align-items: stretch;
  }

  .add-category input,
  .add-category button {
    width: 100%;
  }

  .categories-list li {
    font-size: 0.95rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .delete-btn {
    align-self: flex-end;
  }
}
</style>
