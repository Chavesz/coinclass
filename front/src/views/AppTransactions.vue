<template>
  <div class="transactions-container">
    <AppNavbar />

    <div class="transactions-content">
      <h1>Transações</h1>
      <p>Listagem de receitas e despesas, com filtros.</p>

      <div class="filters">
        <button @click="filterType = 'all'" :class="{ active: filterType === 'all' }">Todas</button>
        <button @click="filterType = 'income'" :class="{ active: filterType === 'income' }">Receitas</button>
        <button @click="filterType = 'expense'" :class="{ active: filterType === 'expense' }">Despesas</button>
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
                <th>Ações</th> </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in filteredTransactions" :key="transaction.id">
                <td>{{ transaction.date }}</td>
                <td>{{ transaction.description }}</td>
                <td :class="transaction.type">{{ formatCurrency(transaction.amount) }}</td>
                <td>{{ transaction.type === 'income' ? 'Receita' : 'Despesa' }}</td>
                <td>
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button class="add-transaction" @click="openAddTransactionModal">+ Adicionar Transação</button>
    </div>

    <div v-if="showAddTransactionModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Adicionar Nova Transação</h2>
        <form @submit.prevent="saveNewTransaction">
          <div class="form-group">
            <label for="new-date">Data:</label>
            <input type="date" id="new-date" v-model="newTransaction.date" required>
          </div>
          <div class="form-group">
            <label for="new-description">Descrição:</label>
            <input type="text" id="new-description" v-model="newTransaction.description" required>
          </div>
          <div class="form-group">
            <label for="new-amount">Valor:</label>
            <input type="number" id="new-amount" v-model.number="newTransaction.amount" required>
          </div>
          <div class="form-group">
            <label for="new-type">Tipo:</label>
            <select id="new-type" v-model="newTransaction.type" required>
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeAddTransactionModal" class="cancel-button">Cancelar</button>
            <button type="submit" class="save-button">Salvar Transação</button>
          </div>
        </form>
      </div>
    </div>
    </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";
// import Snackbar from "@/components/Snackbar.vue"; // Importe seu componente Snackbar se ele existir

export default {
  components: {
    AppNavbar,
    // Snackbar // Registre o Snackbar aqui se ele existir
  },
  data() {
    return {
      filterType: "all",
      transactions: [
        { id: 1, date: "2025-04-01", description: "Salário", amount: 3000, type: "income" }, // Formato YYYY-MM-DD para input date
        { id: 2, date: "2025-04-02", description: "Aluguel", amount: -1200, type: "expense" },
        { id: 3, date: "2025-04-03", description: "Supermercado", amount: -400, type: "expense" },
        { id: 4, date: "2025-04-04", description: "Venda de Produto", amount: 600, type: "income" }
      ],
      showAddTransactionModal: false, // Controla a visibilidade do modal
      newTransaction: { // Objeto para a nova transação
        id: null,
        date: '',
        description: '',
        amount: 0,
        type: 'income' // Valor padrão
      }
    };
  },
  computed: {
    filteredTransactions() {
      if (this.filterType === "all") return this.transactions;
      return this.transactions.filter(t => t.type === this.filterType);
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(value);
    },
    // Método para abrir o modal
    openAddTransactionModal() {
      this.showAddTransactionModal = true;
      // Resetar o formulário para uma nova transação
      this.newTransaction = {
        id: null, // O ID será gerado ao salvar
        date: new Date().toISOString().slice(0, 10), // Define a data atual como padrão (formato YYYY-MM-DD)
        description: '',
        amount: 0,
        type: 'income'
      };
    },
    // Método para fechar o modal
    closeAddTransactionModal() {
      this.showAddTransactionModal = false;
    },
    // Método para salvar a nova transação
    saveNewTransaction() {
      // Gerar um ID simples (em um app real, o backend faria isso ou usaria um UUID)
      const newId = Math.max(...this.transactions.map(t => t.id)) + 1;
      
      // Criar o objeto da transação
      let finalAmount = this.newTransaction.amount;
      if (this.newTransaction.type === 'expense' && finalAmount > 0) {
        finalAmount *= -1; // Garante que despesas sejam negativas
      } else if (this.newTransaction.type === 'income' && finalAmount < 0) {
          finalAmount *= -1; // Garante que receitas sejam positivas
      }

      const transactionToAdd = {
        id: newId,
        date: this.newTransaction.date,
        description: this.newTransaction.description,
        amount: finalAmount,
        type: this.newTransaction.type
      };

      // Adicionar a nova transação à lista
      this.transactions.push(transactionToAdd);

      // Fechar o modal
      this.closeAddTransactionModal();

      // Opcional: Exibir um Snackbar de sucesso
      // if (this.$refs.chamaSnackbar) {
      //   this.$refs.chamaSnackbar.snack("green", "Transação adicionada com sucesso!", "SUCESSO");
      // }
    }
  }
};
</script>

<style scoped>
/* Estilos existentes */
.transactions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.transactions-content {
  width: 100%;
  max-width: 900px;
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

h1 {
  color: #333;
  margin-bottom: 10px;
}

p {
  color: #666;
  margin-bottom: 20px;
}

.filters button {
  background-color: #e0e0e0;
  border: none;
  padding: 10px 15px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filters button.active {
  background-color: #007bff;
  color: white;
}

.transactions-table-wrapper {
  overflow-x: auto;
  margin-top: 20px;
}

.transactions-table table {
  width: 100%;
  border-collapse: collapse;
}

.transactions-table th,
.transactions-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.transactions-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #333;
}

.transactions-table tbody tr:hover {
  background-color: #f5f5f5;
}

/* Estilos para Receita e Despesa */
.income {
  color: green;
  font-weight: bold;
}

.expense {
  color: red;
  font-weight: bold;
}

.add-transaction {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.add-transaction:hover {
  background-color: #218838;
}

/* START ESTILOS DO MODAL */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Garante que o modal fique por cima de tudo */
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  position: relative; /* Para posicionar o botão de fechar, se houver */
}

.modal-content h2 {
  margin-top: 0;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="date"],
.form-group select {
  width: calc(100% - 20px); /* Ajuste para padding */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
  gap: 10px; /* Espaço entre os botões */
}

.modal-actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.cancel-button {
  background-color: #dc3545; /* Vermelho para cancelar */
  color: white;
}

.cancel-button:hover {
  background-color: #c82333;
}

.save-button {
  background-color: #007bff; /* Azul para salvar */
  color: white;
}

.save-button:hover {
  background-color: #0056b3;
}
/* END ESTILOS DO MODAL */

.transactions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f9fafb;
  min-height: 100vh;
}

.transactions-content {
  width: 100%;
  max-width: 1200px;
}

h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

p {
  color: #555;
  margin-bottom: 1.5rem;
}

/* Filtros */
.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.filters button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background-color: #ddd;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.filters .active {
  background-color: #5c6bc0;
  color: white;
}

/* Tabela com rolagem */
.transactions-table-wrapper {
  overflow-x: auto;
}

.transactions-table {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  min-width: 600px;
}

.transactions-table table {
  width: 100%;
  border-collapse: collapse;
}

.transactions-table th,
.transactions-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
  font-size: 15px;
}

.transactions-table th {
  background-color: #f0f0f0;
  font-weight: 600;
}

.transactions-table .income {
  color: green;
}

.transactions-table .expense {
  color: red;
}

/* Botão de Adicionar */
.add-transaction {
  margin-top: 1.5rem;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  background-color: #5c6bc0;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.add-transaction:hover {
  background-color: #3f4e8c;
}

/* Responsivo */
@media (max-width: 768px) {
  h1 {
    font-size: 1.6rem;
  }

  .transactions-table {
    min-width: 100%;
  }

  .filters button {
    flex: 1 1 auto;
  }
}
</style>
