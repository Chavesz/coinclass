<template>
  <div class="transactions-container">
    <AppNavbar />

    <div class="transactions-content">
      <h1>Transações</h1>
      <p>Listagem de receitas e despesas, com filtros.</p>

      <!-- Filtros -->
      <div class="filters">
        <button @click="filterType = 'all'" :class="{ active: filterType === 'all' }">Todas</button>
        <button @click="filterType = 'income'" :class="{ active: filterType === 'income' }">Receitas</button>
        <button @click="filterType = 'expense'" :class="{ active: filterType === 'expense' }">Despesas</button>
      </div>

      <!-- Tabela de Transações -->
      <div class="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in filteredTransactions" :key="transaction.id">
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.description }}</td>
              <td :class="transaction.type">{{ formatCurrency(transaction.amount) }}</td>
              <td>{{ transaction.type === 'income' ? 'Receita' : 'Despesa' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Botão de Adicionar -->
      <button class="add-transaction">+ Adicionar Transação</button>
    </div>
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  components: { AppNavbar },
  data() {
    return {
      filterType: "all",
      transactions: [
        { id: 1, date: "01/04/2025", description: "Salário", amount: 3000, type: "income" },
        { id: 2, date: "02/04/2025", description: "Aluguel", amount: -1200, type: "expense" },
        { id: 3, date: "03/04/2025", description: "Supermercado", amount: -400, type: "expense" },
        { id: 4, date: "04/04/2025", description: "Venda de Produto", amount: 600, type: "income" }
      ]
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
      return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
    }
  }
};
</script>

<style scoped>
.transactions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  background-color: #f4f4f4;
  min-height: 100vh;
}

.transactions-content {
  width: 90%;
  max-width: 1200px;
}

h1 {
  color: #333;
}

/* Estilização dos Filtros */
.filters {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.filters button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ddd;
  font-size: 16px;
  transition: 0.3s;
}

.filters .active {
  background-color: #5c6bc0;
  color: white;
}

/* Tabela de Transações */
.transactions-table {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.transactions-table table {
  width: 100%;
  border-collapse: collapse;
}

.transactions-table th, .transactions-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.transactions-table .income {
  color: green;
}

.transactions-table .expense {
  color: red;
}

.transactions-table th {
  background-color: #eee;
}

/* Botão Adicionar */
.add-transaction {
  margin-top: 20px;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  background-color: #5c6bc0;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.add-transaction:hover {
  background-color: #3f4e8c;
}
</style>
