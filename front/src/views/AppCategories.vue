<template>
  <div class="categories-container">
    <AppNavbar />

    <div class="categories-content">
      <div class="page-header">
        <div class="header-content">
          <h1>Categorias</h1>
          <p>Organize suas transações por categorias</p>
        </div>
      </div>

      <div class="categories-grid">
        <!-- Formulário para adicionar nova categoria -->
        <div class="add-category-card">
          <h2>Nova Categoria</h2>
          <form @submit.prevent="addCategory" class="add-category-form">
            <div class="form-group">
              <label for="category-name">
                <i class="fas fa-tag"></i>
                Nome da Categoria
              </label>
              <input 
                id="category-name"
                v-model="newCategory" 
                type="text" 
                placeholder="Digite o nome da categoria"
                required
              />
            </div>

            <div class="form-group">
              <label for="category-type">
                <i class="fas fa-exchange-alt"></i>
                Tipo
              </label>
              <select id="category-type" v-model="newCategoryType" required>
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
              </select>
            </div>

            <div class="form-group">
              <label for="category-color">
                <i class="fas fa-palette"></i>
                Cor
              </label>
              <input 
                id="category-color"
                type="color" 
                v-model="newCategoryColor"
                required
              />
            </div>

            <button type="submit" class="add-button">
              <i class="fas fa-plus"></i>
              Adicionar Categoria
            </button>
          </form>
        </div>

        <!-- Lista de Categorias -->
        <div class="categories-list">
          <div class="list-header">
            <h2>Suas Categorias</h2>
            <div class="list-filters">
              <button 
                @click="filterType = 'all'" 
                :class="{ active: filterType === 'all' }"
              >
                Todas
              </button>
              <button 
                @click="filterType = 'income'" 
                :class="{ active: filterType === 'income' }"
              >
                Receitas
              </button>
              <button 
                @click="filterType = 'expense'" 
                :class="{ active: filterType === 'expense' }"
              >
                Despesas
              </button>
            </div>
          </div>

          <div class="categories-grid">
            <div 
              v-for="category in filteredCategories" 
              :key="category.id"
              class="category-card"
              :style="{ borderColor: category.color }"
            >
              <div class="category-header">
                <span class="category-type" :class="category.type">
                  {{ category.type === 'income' ? 'Receita' : 'Despesa' }}
                </span>
                <div class="category-actions">
                  <button 
                    class="action-btn edit"
                    @click="editCategory(category)"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button 
                    class="action-btn delete"
                    @click="confirmDeleteCategory(category)"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <h3 class="category-name">{{ category.name }}</h3>
              <div class="category-stats">
                <span class="stat">
                  <i class="fas fa-exchange-alt"></i>
                  {{ category.transactionCount || 0 }} transações
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Edição -->
    <div v-if="showEditModal" class="modal-overlay" @click.self="closeEditModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Editar Categoria</h2>
          <button class="close-modal" @click="closeEditModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="saveCategoryEdit" class="edit-form">
          <div class="form-group">
            <label for="edit-name">
              <i class="fas fa-tag"></i>
              Nome da Categoria
            </label>
            <input 
              id="edit-name"
              v-model="editingCategory.name" 
              type="text" 
              required
            />
          </div>

          <div class="form-group">
            <label for="edit-type">
              <i class="fas fa-exchange-alt"></i>
              Tipo
            </label>
            <select id="edit-type" v-model="editingCategory.type" required>
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
          </div>

          <div class="form-group">
            <label for="edit-color">
              <i class="fas fa-palette"></i>
              Cor
            </label>
            <input 
              id="edit-color"
              type="color" 
              v-model="editingCategory.color"
              required
            />
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeEditModal" class="cancel-button">
              Cancelar
            </button>
            <button type="submit" class="save-button">
              Salvar Alterações
            </button>
          </div>
        </form>
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
      newCategoryType: "expense",
      newCategoryColor: "#4f46e5",
      filterType: "all",
      showEditModal: false,
      editingCategory: null,
      categories: [
        { 
          id: 1, 
          name: "Alimentação", 
          type: "expense", 
          color: "#ef4444",
          transactionCount: 12
        },
        { 
          id: 2, 
          name: "Transporte", 
          type: "expense", 
          color: "#f59e0b",
          transactionCount: 8
        },
        { 
          id: 3, 
          name: "Lazer", 
          type: "expense", 
          color: "#10b981",
          transactionCount: 5
        },
        { 
          id: 4, 
          name: "Saúde", 
          type: "expense", 
          color: "#6366f1",
          transactionCount: 3
        },
        { 
          id: 5, 
          name: "Salário", 
          type: "income", 
          color: "#22c55e",
          transactionCount: 1
        }
      ]
    };
  },
  computed: {
    filteredCategories() {
      if (this.filterType === "all") return this.categories;
      return this.categories.filter(c => c.type === this.filterType);
    }
  },
  methods: {
    addCategory() {
      if (this.newCategory.trim() !== "") {
        const newId = Math.max(...this.categories.map(c => c.id)) + 1;
        this.categories.push({
          id: newId,
          name: this.newCategory,
          type: this.newCategoryType,
          color: this.newCategoryColor,
          transactionCount: 0
        });
        this.newCategory = "";
        this.newCategoryType = "expense";
        this.newCategoryColor = "#4f46e5";
      }
    },
    editCategory(category) {
      this.editingCategory = { ...category };
      this.showEditModal = true;
    },
    saveCategoryEdit() {
      const index = this.categories.findIndex(c => c.id === this.editingCategory.id);
      if (index !== -1) {
        this.categories[index] = { ...this.editingCategory };
      }
      this.closeEditModal();
    },
    confirmDeleteCategory(category) {
      if (confirm(`Tem certeza que deseja excluir a categoria "${category.name}"?`)) {
        this.categories = this.categories.filter(c => c.id !== category.id);
      }
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editingCategory = null;
    }
  }
};
</script>

<style scoped>
:root {
  --primary-color: #4f46e5;
  --primary-hover: #4338ca;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --background-color: #f9fafb;
  --card-background: #ffffff;
  --border-color: #e5e7eb;
  --error-color: #ef4444;
  --success-color: #22c55e;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

.categories-container {
  min-height: 100vh;
  background-color: var(--background-color);
}

.categories-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

.header-content h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.header-content p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
}

.add-category-card {
  background-color: var(--card-background);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  height: fit-content;
}

.add-category-card h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.add-category-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
}

.form-group label i {
  color: var(--text-secondary);
}

.form-group input,
.form-group select {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.form-group input[type="color"] {
  height: 40px;
  padding: 0.25rem;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
}

.categories-list {
  background-color: var(--card-background);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.list-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.list-filters {
  display: flex;
  gap: 0.5rem;
}

.list-filters button {
  padding: 0.5rem 1rem;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.list-filters button:hover {
  background-color: var(--border-color);
}

.list-filters button.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.category-card {
  background-color: var(--card-background);
  border: 2px solid;
  border-radius: 0.75rem;
  padding: 1rem;
  transition: all 0.2s ease;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.category-type {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.category-type.income {
  background-color: rgba(34, 197, 94, 0.1);
  color: var(--success-color);
}

.category-type.expense {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--error-color);
}

.category-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.375rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.edit {
  background-color: rgba(79, 70, 229, 0.1);
  color: var(--primary-color);
}

.action-btn.delete {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--error-color);
}

.action-btn:hover {
  transform: translateY(-1px);
}

.category-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.category-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--card-background);
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
  box-shadow: var(--shadow-lg);
  animation: modalFadeIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.close-modal {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.close-modal:hover {
  background-color: var(--background-color);
  color: var(--text-primary);
}

.edit-form {
  padding: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-button,
.save-button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-button {
  background-color: var(--background-color);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.save-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.cancel-button:hover {
  background-color: var(--border-color);
}

.save-button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }

  .add-category-card {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .categories-content {
    padding: 1rem;
  }

  .list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .list-filters {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .list-filters button {
    white-space: nowrap;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 1.75rem;
  }

  .modal-content {
    margin: 1rem;
  }
}
</style>

