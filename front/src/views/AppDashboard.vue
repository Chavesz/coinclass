<template>
  <div class="dashboard-container">
    <AppNavbar />

    <div class="dashboard-content">
      <header class="dashboard-header">
        <h1 class="dashboard-title">Dashboard</h1>
        <p class="dashboard-subtitle">Resumo financeiro com gráficos e dados.</p>
      </header>

      <!-- Cards de Resumo -->
      <div class="summary-cards">
        <div class="card income">
          <div class="card-icon">
            <i class="fas fa-arrow-up"></i>
          </div>
          <div class="card-content">
            <h3>Receitas</h3>
            <p class="card-value">R$ 5.000,00</p>
          </div>
        </div>
        <div class="card expense">
          <div class="card-icon">
            <i class="fas fa-arrow-down"></i>
          </div>
          <div class="card-content">
            <h3>Despesas</h3>
            <p class="card-value">R$ 3.200,00</p>
          </div>
        </div>
        <div class="card balance">
          <div class="card-icon">
            <i class="fas fa-wallet"></i>
          </div>
          <div class="card-content">
            <h3>Saldo</h3>
            <p class="card-value">R$ 1.800,00</p>
          </div>
        </div>
      </div>

      <!-- Gráfico de Desempenho -->
      <section class="chart-section">
        <h2 class="section-title">Desempenho Financeiro</h2>
        <div class="chart-container">
          <AppChart :chartData="chartData" />
        </div>
      </section>

      <!-- Últimas Transações -->
      <section class="transactions-section">
        <h2 class="section-title">Últimas Transações</h2>
        <div class="table-container">
          <table class="transactions-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              <tr class="income">
                <td>01/04/2025</td>
                <td>Salário</td>
                <td class="income">+ R$ 3.000,00</td>
                <td>Receita</td>
              </tr>
              <tr class="expense">
                <td>02/04/2025</td>
                <td>Conta de Luz</td>
                <td class="expense">- R$ 250,00</td>
                <td>Despesa</td>
              </tr>
              <tr class="expense">
                <td>03/04/2025</td>
                <td>Supermercado</td>
                <td class="expense">- R$ 400,00</td>
                <td>Despesa</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
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
:root {
  --primary-color: #4f46e5;
  --primary-hover: #4338ca;
  --secondary-color: #818cf8;
  --success-color: #22c55e;
  --success-hover: #16a34a;
  --danger-color: #ef4444;
  --danger-hover: #dc2626;
  --warning-color: #f59e0b;
  --warning-hover: #d97706;
  --background-color: #f8fafc;
  --card-background: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --gradient-primary: linear-gradient(135deg, #4f46e5 0%, #818cf8 100%);
  --gradient-success: linear-gradient(135deg, #22c55e 0%, #34d399 100%);
  --gradient-danger: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background-color);
  background-image: 
    radial-gradient(at 0% 0%, rgba(79, 70, 229, 0.1) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(34, 197, 94, 0.1) 0px, transparent 50%);
}

.dashboard-content {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.dashboard-header {
  margin-bottom: 2.5rem;
  position: relative;
}

.dashboard-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dashboard-subtitle {
  color: var(--text-secondary);
  font-size: 1.125rem;
  max-width: 600px;
}

/* Cards */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.card {
  display: flex;
  align-items: center;
  padding: 1.75rem;
  border-radius: 1.25rem;
  background-color: var(--card-background);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.card.income {
  background: linear-gradient(135deg, #22c55e 0%, #bbf7d0 100%);
  color: #065f46;
}
.card.expense {
  background: linear-gradient(135deg, #ef4444 0%, #fecaca 100%);
  color: #991b1b;
}
.card.balance {
  background: linear-gradient(135deg, #4f46e5 0%, #818cf8 100%);
  color: #312e81;
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.25rem;
  font-size: 2rem;
  position: relative;
  z-index: 1;
  background: rgba(255,255,255,0.25);
}

.card.income .card-icon {
  color: #16a34a;
  background: rgba(34,197,94,0.15);
}
.card.expense .card-icon {
  color: #dc2626;
  background: rgba(239,68,68,0.15);
}
.card.balance .card-icon {
  color: #4f46e5;
  background: rgba(79,70,229,0.15);
}

.card-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

.card h3 {
  font-size: 1.125rem;
  color: inherit;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.card-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: inherit;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.card-value::before {
  content: 'R$';
  font-size: 1rem;
  color: inherit;
  opacity: 0.7;
}

/* Seções */
.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4f46e5;
  margin-bottom: 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-title::before {
  content: '';
  width: 4px;
  height: 24px;
  background: var(--gradient-primary);
  border-radius: 2px;
}

.chart-section,
.transactions-section {
  background-color: var(--card-background);
  border-radius: 1.25rem;
  padding: 1.75rem;
  margin-bottom: 2.5rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chart-section:hover,
.transactions-section:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.chart-container {
  height: 400px;
  position: relative;
}

/* Tabela */
.table-container {
  overflow-x: auto;
  border-radius: 0.75rem;
  background-color: transparent;
}

.transactions-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1rem;
  min-width: 600px;
}

.transactions-table th {
  background: none;
  color: var(--primary-color);
  font-weight: 700;
  font-size: 0.95rem;
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
  color: var(--text-primary);
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

.transactions-table tr:hover td {
  box-shadow: 0 4px 16px 0 rgba(79,70,229,0.10);
}

.transactions-table .income {
  color: #16a34a;
  font-weight: 700;
}
.transactions-table .expense {
  color: #dc2626;
  font-weight: 700;
}

/* Responsividade */
@media (max-width: 1024px) {
  .dashboard-content {
    padding: 1.5rem;
  }

  .summary-cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    padding: 1.25rem;
  }

  .dashboard-title {
    font-size: 2rem;
  }

  .card {
    padding: 1.5rem;
  }

  .card-value {
    font-size: 1.5rem;
  }

  .chart-container {
    height: 300px;
  }

  .section-title {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .dashboard-title {
    font-size: 1.75rem;
  }

  .card {
    padding: 1.25rem;
  }

  .card-icon {
    width: 48px;
    height: 48px;
    font-size: 1.25rem;
  }

  .transactions-table th,
  .transactions-table td {
    padding: 1rem;
    font-size: 0.875rem;
  }
}
</style>
