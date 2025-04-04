<template>
  <div class="dashboard-container">
    <AppNavbar />

    <div class="dashboard-content">
      <h1 class="text-3xl font-bold mb-2 text-gray-800">Dashboard</h1>
      <p class="text-gray-600 mb-6">Resumo financeiro com gráficos e dados.</p>

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
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Desempenho Financeiro</h2>
        <AppChart :chartData="chartData" />
      </div>

      <!-- Últimas Transações -->
      <div class="transactions-table mt-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Últimas Transações</h2>
        <div class="overflow-x-auto">
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
  padding: 1.5rem;
  background-color: #f9fafb;
  min-height: 100vh;
}

.dashboard-content {
  width: 100%;
  max-width: 1200px;
}

/* Cards responsivos */
.summary-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
}

.card {
  flex: 1 1 250px;
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  color: white;
  font-size: 1.1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
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

/* Tabela */
.transactions-table {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  overflow-x: auto;
}

.transactions-table table {
  width: 100%;
  border-collapse: collapse;
  min-width: 500px;
}

.transactions-table th, .transactions-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.transactions-table th {
  background-color: #f1f1f1;
  color: #333;
}

.transactions-table .income {
  color: #4CAF50;
  font-weight: 600;
}

.transactions-table .expense {
  color: #E53935;
  font-weight: 600;
}

/* Mobile ajustes */
@media (max-width: 640px) {
  .card {
    font-size: 1rem;
    padding: 1.2rem;
  }

  .dashboard-content h1 {
    font-size: 1.8rem;
  }

  .transactions-table table {
    font-size: 0.9rem;
  }
}
</style>
