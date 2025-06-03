"use client";

import DashboardLayout from "@/components/DashboardLayout";

export default function AboutPage() {
  return (
    <DashboardLayout>
      <div style={{ padding: "2rem", maxWidth: "800px" }}>
        <h2 className="mb-4">ℹ️ Sobre o Token100 AlefDevops</h2>

        <section className="mb-4">
          <h5>🎯 Propósito do Projeto</h5>
          <p>
            O <strong>Token100 AlefDevops</strong> é um projeto experimental voltado para o aprendizado prático
            de blockchain, contratos inteligentes e integração Web3 com interfaces modernas.
          </p>
        </section>

        <section className="mb-4">
          <h5>🛠️ Tecnologias Utilizadas</h5>
          <ul>
            <li>Blockchain: BNB Smart Chain Testnet</li>
            <li>Smart Contracts com Solidity + OpenZeppelin</li>
            <li>Proxy Pattern (Contratos Upgradeables)</li>
            <li>Controle de <code>mint</code> com cooldown (1 token / 24h)</li>
            <li>Frontend em React + Next.js</li>
            <li>Integração Web3 via ethers.js + MetaMask</li>
          </ul>
        </section>

        <section className="mb-4">
          <h5>📊 Tokenomics</h5>
          <ul>
            <li>Nome: <strong>Token100 AlefDevops</strong></li>
            <li>Símbolo: <strong>TAD100</strong></li>
            <li>Supply Máximo: <strong>100 tokens</strong></li>
            <li>50 tokens doados ao Owner no deploy</li>
            <li>Usuários podem mintar 1 token a cada 24h</li>
            <li>Sem taxas de transação ou queima</li>
          </ul>
        </section>

        <section className="mb-4">
          <h5>📖 Como Funciona</h5>
          <ol>
            <li>Conecte sua carteira MetaMask</li>
            <li>Acesse a aba <strong>Mintar 1 Token</strong></li>
            <li>Mint possível a cada 24h por carteira</li>
            <li>Veja seu saldo em <strong>Token Info</strong></li>
          </ol>
        </section>

        <section className="mb-4">
          <h5>🧪 Objetivo Educacional</h5>
          <p>
            Este projeto tem fins educacionais e faz parte do portfólio Web3 de desenvolvedor.
            Ele demonstra na prática como funcionam contratos inteligentes, upgrades com proxies,
            e a interação entre front-end e blockchain.
          </p>
        </section>

        
      </div>
    </DashboardLayout>
  );
}
