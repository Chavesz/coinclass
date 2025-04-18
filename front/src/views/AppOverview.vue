<template>
  <div class="p-4 sm:p-6 max-w-5xl mx-auto text-gray-800 dark:text-gray-100">
    <!-- Resumo Financeiro -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
      <div class="card border-l-4 border-green-500 hover:shadow-xl dark:bg-gray-800">
        <p class="text-sm uppercase text-gray-500 dark:text-gray-400">Receita Mensal</p>
        <h3 class="text-2xl sm:text-3xl font-extrabold text-green-500 animate-pulse">R$ {{ receitaMensal.toFixed(2) }}</h3>
      </div>
      <div class="card border-l-4 border-red-500 hover:shadow-xl dark:bg-gray-800">
        <p class="text-sm uppercase text-gray-500 dark:text-gray-400">Despesa Mensal</p>
        <h3 class="text-2xl sm:text-3xl font-extrabold text-red-500 animate-pulse">R$ {{ despesaMensal.toFixed(2) }}</h3>
      </div>
    </div>

    <!-- Acesso Rápido -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <QuickButton icon="arrow-down-circle" label="Despesa" color="red" />
      <QuickButton icon="arrow-up-circle" label="Receita" color="green" />
      <QuickButton icon="repeat" label="Transf." color="blue" />
      <QuickButton icon="file-down" label="Importar" color="purple" />
    </div>

    <!-- Gráfico -->
    <div class="card mb-8 dark:bg-gray-800 text-center">
      <h3 class="text-lg font-semibold mb-4">Resumo Gráfico</h3>
      <canvas ref="chartCanvas" class="w-60 h-60 sm:w-[180px] sm:h-[180px] mx-auto"></canvas>
    </div>

    <!-- Contas e Saldo -->
    <div class="card mb-8 dark:bg-gray-800 hover:shadow-xl">
      <h3 class="text-lg font-semibold mb-1">Saldo Geral</h3>
      <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">R$ {{ saldoGeral.toFixed(2) }}</p>

      <div class="mt-6">
        <h4 class="text-md text-gray-600 dark:text-gray-300 mb-2">Minhas Contas</h4>
        <div class="flex flex-col sm:flex-row justify-between gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-md shadow-inner">
          <span>💳 Conta Inicial</span>
          <p class="font-semibold">R$ {{ contaInicial.toFixed(2) }}</p>
        </div>
        <button class="mt-4 w-full py-2 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold shadow transition">
          Gerenciar Contas
        </button>
      </div>
    </div>

    <!-- Contas a Pagar e Receber -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      <div class="card text-center hover:shadow-xl dark:bg-gray-800">
        <h4 class="font-semibold text-lg mb-1">Contas a Pagar</h4>
        <p class="text-gray-500 dark:text-gray-400">Nenhuma conta a pagar</p>
      </div>
      <div class="card text-center hover:shadow-xl dark:bg-gray-800">
        <h4 class="font-semibold text-lg mb-1">Contas a Receber</h4>
        <p class="text-gray-500 dark:text-gray-400">Nenhuma conta pendente</p>
      </div>
    </div>
  </div>
</template>


<script>
import { ArrowDownCircle, ArrowUpCircle, Repeat, FileDown } from 'lucide-vue';
import Chart from 'chart.js/auto';

export default {
  components: {
    QuickButton: {
      props: ['icon', 'label', 'color'],
      components: { ArrowDownCircle, ArrowUpCircle, Repeat, FileDown },
      computed: {
        IconComponent() {
          return {
            'arrow-down-circle': ArrowDownCircle,
            'arrow-up-circle': ArrowUpCircle,
            repeat: Repeat,
            'file-down': FileDown
          }[this.icon];
        }
      },
      template: `
        <button :class="'flex flex-col items-center justify-center gap-2 p-4 rounded-xl text-white font-semibold bg-' + color + '-500 hover:bg-' + color + '-600 shadow-lg transition'">
          <component :is="IconComponent" class="w-6 h-6 animate-bounce" />
          {{ label }}
        </button>
      `
    }
  },
  data() {
    return {
      receitaMensal: 2500.00,
      despesaMensal: 1800.00,
      saldoGeral: 700.00,
      contaInicial: 1000.00,
    };
  },
  mounted() {
  const ctx = this.$refs.chartCanvas.getContext('2d');
  const isDark = document.documentElement.classList.contains('dark');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Receitas', 'Despesas'],
      datasets: [{
        data: [this.receitaMensal, this.despesaMensal],
        backgroundColor: ['#22c55e', '#ef4444']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: isDark ? '#fff' : '#000'
          }
        }
      }
    }
  });
}
}
</script>

<style scoped>
.card {
  @apply p-6 bg-white rounded-xl shadow-md transition;
}
</style>
