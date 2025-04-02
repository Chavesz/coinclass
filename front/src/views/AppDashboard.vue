<template>
  <div class="dashboard-container">
    <AppNavbar />

    <div class="dashboard-content">
      <h1>Dashboard</h1>
      <p>Resumo financeiro com gráficos e dados.</p>

      <!-- Cards de Resumo -->
      <div class="summary-cards">
        <div class="card income">
          <h3>Receitas</h3>
          <p>R$ 5.000,00</p>
        </div>
        <div class="card expense">
          <h3>Despesas</h3>
          <p>R$ 3.200,00</p>
        </div>
        <div class="card balance">
          <h3>Saldo</h3>
          <p>R$ 1.800,00</p>
        </div>
      </div>

      <!-- Gráfico de Desempenho -->
      <div class="chart-section">
        <h2>Desempenho Financeiro</h2>
        <AppChart :chartData="chartData" />
      </div>

      <!-- Últimas Transações -->
      <div class="transactions-table">
        <h2>Últimas Transações</h2>
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
            <tr>
              <td>01/04/2025</td>
              <td>Salário</td>
              <td class="income">+ R$ 3.000,00</td>
              <td>Receita</td>
            </tr>
            <tr>
              <td>02/04/2025</td>
              <td>Conta de Luz</td>
              <td class="expense">- R$ 250,00</td>
              <td>Despesa</td>
            </tr>
            <tr>
              <td>03/04/2025</td>
              <td>Supermercado</td>
              <td class="expense">- R$ 400,00</td>
              <td>Despesa</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";
import AppChart from "@/components/AppChart.vue";

export default {
  components: { AppNavbar, AppChart },
  data() {
    return {
      chartData: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
        datasets: [
          {
            label: "Receitas",
            data: [5000, 7000, 6000, 8000, 7500, 8200],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
          },
          {
            label: "Despesas",
            data: [3000, 4500, 4000, 5000, 4800, 5100],
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  background-color: #f4f4f4;
  min-height: 100vh;
}

.dashboard-content {
  width: 90%;
  max-width: 1200px;
}

h1 {
  color: #333;
}

/* Estilo dos Cards */
.summary-cards {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 20px 0;
}

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

/* Tabela de Transações */
.transactions-table {
  background: white;
  padding: 20px;
  border-radius: px;
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
</style>
