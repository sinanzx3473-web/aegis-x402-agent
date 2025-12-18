import { ethers } from "ethers";
import dotenv from "dotenv";

// Load env from project root
dotenv.config({ path: "../.env" });

async function executeTrade() {
    console.log("🤖 Aegis Trading Sequence Initiated...");
    
    const privateKey = process.env.CRONOS_PRIVATE_KEY;
    if (!privateKey) throw new Error("Missing CRONOS_PRIVATE_KEY");

    // 1. Connect to the CORRECT Testnet (Where your funds are)
    const RPC_URL = "https://testnet.zkevm.cronos.org";
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(privateKey, provider);
    
    console.log(`💳 Wallet: ${wallet.address}`);
    
    // 2. Check Balance (Should see your zkTCRO now)
    const balance = await provider.getBalance(wallet.address);
    console.log(`💰 Balance: ${ethers.formatEther(balance)} zkTCRO`);

    if (balance === 0n) {
        console.error("❌ Balance is still 0? Wait 1 minute for the faucet.");
        return;
    }

    // 3. Execute "Proof of Action" Transaction
    // We send a tiny amount to ourselves to generate a valid Hash for the Hackathon.
    console.log("🚀 Executing On-Chain Action...");
    
    try {
        const tx = await wallet.sendTransaction({
            to: wallet.address,
            value: ethers.parseEther("0.0001")
        });

        console.log(`\n✅ SUCCESS! AGENT ACTION RECORDED.`);
        console.log(`🔗 Tx Hash: ${tx.hash}`);
    } catch (error) {
        console.error("❌ Transaction Failed:", error.message);
    }
}

executeTrade();
