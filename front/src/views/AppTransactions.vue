<template>
  <div class="transactions-container">
    <AppNavbar />

    <div class="transactions-content">
      <div class="page-header">
        <div class="header-content">
          <h1>Transações</h1>
          <p>Gerencie suas receitas e despesas</p>
        </div>
        <button class="add-transaction-btn" @click="openAddTransactionModal">
          <i class="fas fa-plus"></i>
          Nova Transação
        </button>
      </div>

      <div class="filters-section">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Buscar transações..."
          />
        </div>

        <div class="filters">
          <button 
            @click="filterType = 'all'" 
            :class="{ active: filterType === 'all' }"
          >
            <i class="fas fa-list"></i>
            Todas
          </button>
          <button 
            @click="filterType = 'income'" 
            :class="{ active: filterType === 'income' }"
          >
            <i class="fas fa-arrow-up"></i>
            Receitas
          </button>
          <button 
            @click="filterType = 'expense'" 
            :class="{ active: filterType === 'expense' }"
          >
            <i class="fas fa-arrow-down"></i>
            Despesas
          </button>
        </div>
      </div>

      <div class="transactions-table-wrapper">
        <div class="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in filteredTransactions" :key="transaction.id">
                <td>{{ formatDate(transaction.date) }}</td>
                <td>{{ transaction.description }}</td>
                <td :class="transaction.type">
                  {{ formatCurrency(transaction.amount) }}
                </td>
                <td>
                  <span :class="['type-badge', transaction.type]">
                    {{ transaction.type === 'income' ? 'Receita' : 'Despesa' }}
                  </span>
                </td>
                <td>
                  <div class="actions">
                    <button class="action-btn edit" @click="editTransaction(transaction)">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" @click="deleteTransaction(transaction)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal de Adicionar/Editar Transação -->
    <div v-if="showAddTransactionModal" class="modal-overlay" @click.self="closeAddTransactionModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Editar Transação' : 'Nova Transação' }}</h2>
          <button class="close-modal" @click="closeAddTransactionModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="saveTransaction" class="transaction-form">
          <div class="form-group">
            <label for="new-date">
              <i class="fas fa-calendar"></i>
              Data
            </label>
            <input 
              type="date" 
              id="new-date" 
              v-model="newTransaction.date" 
              required
            >
          </div>

          <div class="form-group">
            <label for="new-description">
              <i class="fas fa-align-left"></i>
              Descrição
            </label>
            <input 
              type="text" 
              id="new-description" 
              v-model="newTransaction.description" 
              placeholder="Digite a descrição"
              required
            >
          </div>

          <div class="form-group">
            <label for="new-amount">
              <i class="fas fa-dollar-sign"></i>
              Valor
            </label>
            <input 
              type="number" 
              id="new-amount" 
              v-model.number="newTransaction.amount" 
              step="0.01"
              placeholder="0,00"
              required
            >
          </div>

          <div class="form-group">
            <label for="new-type">
              <i class="fas fa-tag"></i>
              Tipo
            </label>
            <select id="new-type" v-model="newTransaction.type" required>
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeAddTransactionModal" class="cancel-button">
              Cancelar
            </button>
            <button type="submit" class="save-button">
              {{ isEditing ? 'Salvar Alterações' : 'Adicionar Transação' }}
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
  components: {
    AppNavbar,
  },
  data() {
    return {
      filterType: "all",
      searchQuery: "",
      transactions: [
        { id: 1, date: "2025-04-01", description: "Salário", amount: 3000, type: "income" },
        { id: 2, date: "2025-04-02", description: "Aluguel", amount: -1200, type: "expense" },
        { id: 3, date: "2025-04-03", description: "Supermercado", amount: -400, type: "expense" },
        { id: 4, date: "2025-04-04", description: "Venda de Produto", amount: 600, type: "income" }
      ],
      showAddTransactionModal: false,
      isEditing: false,
      newTransaction: {
        id: null,
        date: '',
        description: '',
        amount: 0,
        type: 'income'
      }
    };
  },
  computed: {
    filteredTransactions() {
      let filtered = this.transactions;
      
      // Aplicar filtro de tipo
      if (this.filterType !== "all") {
        filtered = filtered.filter(t => t.type === this.filterType);
      }
      
      // Aplicar busca
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(t => 
          t.description.toLowerCase().includes(query) ||
          this.formatCurrency(t.amount).includes(query)
        );
      }
      
      return filtered;
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(value);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('pt-BR');
    },
    openAddTransactionModal() {
      this.isEditing = false;
      this.showAddTransactionModal = true;
      this.newTransaction = {
        id: null,
        date: new Date().toISOString().slice(0, 10),
        description: '',
        amount: 0,
        type: 'income'
      };
    },
    editTransaction(transaction) {
      this.isEditing = true;
      this.showAddTransactionModal = true;
      this.newTransaction = { ...transaction };
    },
    deleteTransaction(transaction) {
      if (confirm('Tem certeza que deseja excluir esta transação?')) {
        this.transactions = this.transactions.filter(t => t.id !== transaction.id);
      }
    },
    closeAddTransactionModal() {
      this.showAddTransactionModal = false;
      this.isEditing = false;
    },
    saveTransaction() {
      let finalAmount = this.newTransaction.amount;
      if (this.newTransaction.type === 'expense' && finalAmount > 0) {
        finalAmount *= -1;
      } else if (this.newTransaction.type === 'income' && finalAmount < 0) {
        finalAmount *= -1;
      }

      const transactionToSave = {
        ...this.newTransaction,
        amount: finalAmount
      };

      if (this.isEditing) {
        const index = this.transactions.findIndex(t => t.id === this.newTransaction.id);
        if (index !== -1) {
          this.transactions[index] = transactionToSave;
        }
      } else {
        const newId = Math.max(...this.transactions.map(t => t.id)) + 1;
        transactionToSave.id = newId;
        this.transactions.push(transactionToSave);
      }

      this.closeAddTransactionModal();
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

.transactions-container {
  background: #f8fafc;
  min-height: 100vh;
  padding-bottom: 2rem;
}

.transactions-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 800;
  color: #4f46e5;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #64748b;
  font-size: 1.1rem;
}

.add-transaction-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-transaction-btn:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
}

.filters-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
}

.search-box input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: #fff;
  color: #1e293b;
  transition: border 0.2s;
}

.search-box input:focus {
  border-color: #4f46e5;
  outline: none;
}

.filters {
  display: flex;
  gap: 0.5rem;
}

.filters button {
  padding: 0.5rem 1.2rem;
  border-radius: 0.5rem;
  border: none;
  background: #f3f4f6;
  color: #4f46e5;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.filters button:hover {
  background: #4f46e5;
  color: #fff;
}

.filters button.active {
  background: #4f46e5;
  color: #fff;
}

.transactions-table-wrapper {
  background-color: var(--card-background);
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.transactions-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1rem;
  background: none;
}

.transactions-table th {
  background: none;
  color: #4f46e5;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem 0.5rem 0 0;
}

.transactions-table td {
  background: #fff;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px 0 rgba(79,70,229,0.06);
  color: #1e293b;
  padding: 1.25rem 1.5rem;
  font-size: 1rem;
}

.transactions-table tr.income td {
  background: linear-gradient(90deg, #bbf7d0 0%, #f0fdf4 100%);
  color: #065f46;
}
.transactions-table tr.expense td {
  background: linear-gradient(90deg, #fecaca 0%, #fef2f2 100%);
  color: #991b1b;
}

.badge {
  display: inline-block;
  padding: 0.4em 1em;
  border-radius: 1em;
  font-size: 0.95em;
  font-weight: 600;
  background: #f3f4f6;
  color: #4f46e5;
}
.badge.income {
  background: #d1fae5;
  color: #065f46;
}
.badge.expense {
  background: #fee2e2;
  color: #991b1b;
}

.action-btn {
  background: #f3f4f6;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 0.7rem;
  margin: 0 0.1rem;
  cursor: pointer;
  transition: background 0.2s;
  color: #4f46e5;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.action-btn.edit {
  background: #e0e7ff;
  color: #4338ca;
}
.action-btn.delete {
  background: #fee2e2;
  color: #dc2626;
}
.action-btn:hover {
  background: #c7d2fe;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(30, 41, 59, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 8px 32px 0 rgba(31,41,55,0.18);
  padding: 2rem 2.5rem;
  max-width: 420px;
  width: 100%;
  animation: modalFadeIn 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h2 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #4f46e5;
}

.close-modal {
  background: none;
  border: none;
  color: #64748b;
  font-size: 1.3rem;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: background 0.2s;
  padding: 0.5rem;
}

.close-modal:hover {
  background: #f3f4f6;
  color: #1e293b;
}

.transaction-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #4f46e5;
  font-weight: 600;
}

.form-group label i {
  color: #64748b;
}

.form-group input,
.form-group select {
  padding: 0.7rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: #f9fafb;
  color: #1e293b;
  transition: border 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #4f46e5;
  outline: none;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-button,
.save-button {
  padding: 0.7rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: background 0.2s, color 0.2s;
}

.cancel-button {
  background: #f3f4f6;
  color: #4f46e5;
}

.save-button {
  background: #4f46e5;
  color: #fff;
}

.cancel-button:hover {
  background: #e0e7ff;
}

.save-button:hover {
  background: #4338ca;
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
@media (max-width: 768px) {
  .transactions-content {
    padding: 1rem;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    max-width: none;
  }

  .filters {
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .filters button {
    white-space: nowrap;
  }

  .transactions-table th,
  .transactions-table td {
    padding: 0.75rem;
  }

  .modal-content {
    margin: 1rem;
  }
}
</style>
