<template>
  <div class="chart-box" :style="{ height: height + 'px' }">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import { state } from '@/store'

export default {
  name: 'AppChart',
  props: {
    type: { type: String, default: 'bar' },
    data: { type: Object, required: true },
    height: { type: Number, default: 280 },
    money: { type: Boolean, default: true }
  },
  computed: { theme: () => state.theme },
  watch: {
    data: { deep: true, handler() { this.render() } },
    theme() { this.$nextTick(this.render) }
  },
  mounted() {
    this.render()
    this.obs = new MutationObserver(() => this.render())
    this.obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  },
  beforeDestroy() {
    if (this.obs) this.obs.disconnect()
    if (this.chart) this.chart.destroy()
  },
  methods: {
    render() {
      if (this.chart) this.chart.destroy()
      const css = getComputedStyle(document.documentElement)
      const muted = css.getPropertyValue('--muted').trim()
      const border = css.getPropertyValue('--border').trim()
      const fmt = v => this.money
        ? 'R$ ' + Number(v).toLocaleString('pt-BR', { maximumFractionDigits: 0 })
        : v
      const isPie = this.type === 'doughnut'
      this.chart = new Chart(this.$refs.canvas, {
        type: this.type,
        data: this.data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 400 },
          cutout: isPie ? '68%' : undefined,
          plugins: {
            legend: {
              display: isPie ? false : this.data.datasets.length > 1,
              position: 'bottom',
              labels: { color: muted, usePointStyle: true, boxWidth: 8, font: { family: 'Plus Jakarta Sans', weight: 600 } }
            },
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.dataset.label || ctx.label}: ${fmt(isPie ? ctx.parsed : ctx.parsed.y)}`
              }
            }
          },
          scales: isPie ? {} : {
            x: { grid: { display: false }, border: { display: false }, ticks: { color: muted } },
            y: { grid: { color: border }, border: { display: false }, ticks: { color: muted, callback: fmt, maxTicksLimit: 5 } }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.chart-box { position: relative; width: 100%; }
</style>
