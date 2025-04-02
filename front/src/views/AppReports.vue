<template>
  <div class="reports-container">
    <AppNavbar />

    <div class="reports-content">
      <h1>Relatórios</h1>
      <p>Estatísticas detalhadas dos gastos e ganhos.</p>

      <!-- Resumo Financeiro -->
      <div class="summary">
        <div class="summary-item income">
          <h3>Ganhos</h3>
          <p>R$ {{ totalIncome.toFixed(2) }}</p>
        </div>
        <div class="summary-item expense">
          <h3>Despesas</h3>
          <p>R$ {{ totalExpense.toFixed(2) }}</p>
        </div>
      </div>

      <!-- Gráfico de Despesas por Categoria -->
      <div class="chart-container">
        <canvas id="expenseChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";
import Chart from "chart.js/auto";

export default {
  components: { AppNavbar },
  data() {
    return {
      transactions: [
        { category: "Alimentação", amount: 500, type: "expense" },
        { category: "Transporte", amount: 200, type: "expense" },
        { category: "Lazer", amount: 300, type: "expense" },
        { category: "Salário", amount: 5000, type: "income" },
        { category: "Freelance", amount: 1200, type: "income" },
        { category: "Saúde", amount: 150, type: "expense" }
      ]
    };
  },
  computed: {
    totalIncome() {
      return this.transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
    },
    totalExpense() {
      return this.transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
    },
    expenseData() {
      const expenses = this.transactions.filter(t => t.type === "expense");
      const categories = [...new Set(expenses.map(t => t.category))];
      const data = categories.map(category =>
        expenses
          .filter(t => t.category === category)
          .reduce((sum, t) => sum + t.amount, 0)
      );

      return { labels: categories, data };
    }
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById("expenseChart").getContext("2d");

      new Chart(ctx, {
        type: "pie",
        data: {
          labels: this.expenseData.labels,
          datasets: [
            {
              data: this.expenseData.data,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"]
            }
          ]
        },
        options: {
          responsive: true
        }
      });
    }
  }
};
</script>

<style scoped>
.reports-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
}

.reports-content {
  width: 90%;
  max-width: 600px;
}

h1 {
  color: #333;
}

/* Resumo financeiro */
.summary {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.summary-item {
  flex: 1;
  text-align: center;
  padding: 15px;
  border-radius: 8px;
  color: white;
  font-size: 18px;
}

.income {
  background-color: #4CAF50;
}

.expense {
  background-color: #FF5722;
}

/* Gráfico */
.chart-container {
  margin-top: 30px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
