<template>
  <div class="overview-container">
    <!-- Resumo Financeiro -->
    <div class="summary-section">
      <div class="summary-card">
        <p>Receita Mensal</p>
        <h3 class="income">R$ 0,00</h3>
      </div>
      <div class="summary-card">
        <p>Despesa Mensal</p>
        <h3 class="expense">R$ 0,00</h3>
      </div>
    </div>

    <!-- Acesso Rápido -->
    <div class="quick-access">
      <button class="expense-btn">➖ Despesa</button>
      <button class="income-btn">➕ Receita</button>
      <button class="transfer-btn">🔁 Transf.</button>
      <button class="import-btn">🔗 Importar</button>
    </div>

    <!-- Saldo e Contas -->
    <div class="accounts-section">
      <div class="account-balance">
        <h3>Saldo Geral</h3>
        <p>R$ 0,00 👁</p>
      </div>
      <div class="account-list">
        <h4>Minhas Contas</h4>
        <div class="account-item">
          <span>💳 Conta Inicial</span>
          <p>R$ 0,00</p>
        </div>
        <button class="manage-btn">Gerenciar Contas</button>
      </div>
    </div>

    <!-- Contas a pagar e receber -->
    <div class="bills-section">
      <div class="bill-card">
        <h4>Contas a Pagar</h4>
        <p>No momento você não possui contas a pagar</p>
      </div>
      <div class="bill-card">
        <h4>Contas a Receber</h4>
        <p>Você não possui contas a receber pendentes</p>
      </div>
    </div>

    <!-- Blog e Notícias -->
    <div class="blog-section">
      <h3>Conteúdos do Blog</h3>
      <div class="blog-post">
        <h4>O que é open finance? Tudo o que você precisa saber!</h4>
        <p>01/04/2025</p>
      </div>
      <div class="blog-post">
        <h4>Qual o melhor banco para antecipar FGTS? Tire suas dúvidas!</h4>
        <p>28/03/2025</p>
      </div>
      <div class="blog-post">
        <h4>Como cortar gastos supérfluos sem perder qualidade de vida? Veja dicas!</h4>
        <p>26/03/2025</p>
      </div>
      <button class="blog-btn">Ir para o Blog</button>
    </div>

    <!-- Faturas e Cartões -->
    <div class="cards-section">
      <div class="invoice-card">
        <h4>Todas as Faturas</h4>
        <p>R$ 0,00 👁</p>
      </div>
      <div class="cards-list">
        <h4>Meus Cartões</h4>
        <p>Adicione seu primeiro cartão</p>
        <button class="manage-btn">Gerenciar Cartões</button>
      </div>
    </div>

    <!-- Maiores Gastos e Limite -->
    <div class="spending-section">
      <div class="spending-card">
        <h4>Maiores Gastos do Mês Atual</h4>
        <p>Sem gastos no período</p>
      </div>
      <div class="spending-card">
        <h4>Limite de Gastos de Abril</h4>
        <p>Nenhum Limite de Gasto definido para o período</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppOverview",
};
</script>

<style scoped>
/* Estilos gerais */
.overview-container {
  padding: 100px;
  max-width: 900px;
  margin: auto;
}

/* Resumo financeiro */
.summary-section {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
}

.summary-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1;
  text-align: center;
}

.income {
  color: green;
}

.expense {
  color: red;
}

/* Acesso rápido */
.quick-access {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

button {
  flex: 1;
  margin: 5px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.expense-btn {
  background: #ff4d4d;
  color: white;
}

.income-btn {
  background: #4caf50;
  color: white;
}

.transfer-btn {
  background: #2196f3;
  color: white;
}

.import-btn {
  background: #673ab7;
  color: white;
}

/* Contas */
.accounts-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.account-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 5px;
  margin-top: 10px;
}

.manage-btn {
  background: #ff9800;
  color: white;
  margin-top: 10px;
}

/* Contas a pagar e receber */
.bills-section {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.bill-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1;
  text-align: center;
}

/* Blog */
.blog-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.blog-post {
  margin-bottom: 10px;
}

.blog-btn {
  background: #008cba;
  color: white;
}

/* Cartões e Faturas */
.cards-section {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.invoice-card,
.cards-list {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1;
  text-align: center;
}

/* Maiores Gastos */
.spending-section {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.spending-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1;
  text-align: center;
}
</style>

