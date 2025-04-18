<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

export default {
  name: "AppChart",
  props: {
    chartData: Object,
  },
  mounted() {
    Chart.register(...registerables);
    this.renderChart();
  },
  methods: {
    renderChart() {
      new Chart(this.$refs.chartCanvas, {
        type: "bar",
        data: this.chartData || {
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
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 14,
                  weight: "bold",
                },
                color: "#333",
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return `R$ ${value.toLocaleString("pt-BR")}`;
                },
                font: {
                  size: 12,
                },
                color: "#666",
              },
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
            x: {
              ticks: {
                font: {
                  size: 12,
                },
                color: "#666",
              },
              grid: {
                display: false,
              },
            },
          },
          animation: {
            duration: 1000,
            easing: "easeInOutQuad",
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 700px;
  height: 400px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
