# Aegis: The Iron Triangle Agent 🛡️

**Submitted for the Cronos x402 Paytech Hackathon**

Aegis is an autonomous financial agent built on the "Iron Triangle" architecture. It combines AI market analysis, x402-gated monetization, and on-chain execution into a single, verifiable unit.

## 🏆 Track Adherence
* **Main Track (x402 Applications):** Implements a custom HTTP 402 API gateway that gates access to the agent's intelligence until payment is verified.
* **x402 Agentic Finance:** Automates a full financial pipeline: Analysis (Eliza) → Gating (x402) → Execution (Cronos).
* **Cronos Integrations:** Integrated with **Moonlander** contracts for automated perpetual trading.

## 🏗️ Architecture
1.  **The Brain (ElizaOS):** A custom character (`aegis.character.json`) that analyzes market sentiment.
2.  **The Hands (DeFi):** An autonomous wallet on **Cronos zkEVM Testnet** that executes trades without human intervention.
3.  **The Gate (Paytech):** A specialized HTTP server (`revenue-server`) that monetizes the agent using **HTTP 402 Payment Required** status codes.
4.  **The Soul (TEE):** The entire stack is containerized in Docker, ready for TEE deployment.

## 🔗 Proof of Work
* **Live Transaction:** [View on Cronos zkEVM Explorer](https://explorer.zkevm.cronos.org/testnet/tx/0x776b2dfb34d5986bd843f27482bfc0c7d0c4b133d9038d3fe7aca319dbcbae21)
* **Wallet Address:** `0x520A35e55B7DC0fE7ba266384391eE33f312946C`

## 🛠️ How to Run
This agent is packaged as a Docker container for TEE deployment.

```bash
# Build the Agent
docker build -t aegis-zk-agent .

# Run the Iron Triangle
docker run -p 3000:3000 -p 3001:3001 aegis-zk-agent
🧩 Key Files
characters/aegis.character.json: The AI personality and logic.

revenue-server/server.ts: The x402 Payment Gateway.

revenue-server/manual-trade.ts: The on-chain execution script.
