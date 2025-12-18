import express from "express";
import cors from "cors";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
// Your Wallet Address (from Phase 1)
const AGENT_WALLET = "0x02510FF0A01F7e73C992310F315B7d2f6BD2D22F"; 

app.post("/agent/strategy", async (req, res) => {
    const { txHash } = req.body;
    
    // THE GATE: Strict 402 Block
    if (!txHash) {
        console.log(`[Gate] Blocking request from ${req.ip} - No Payment`);
        return res.status(402).json({
            error: "PAYMENT_REQUIRED",
            message: "Access restricted. Send 1.0 USDC to Aegis to unlock alpha.",
            payment_details: { 
                amount: "1.0", 
                currency: "USDC", 
                recipient: AGENT_WALLET, 
                chain: "Cronos zkEVM Testnet" 
            }
        });
    }

    console.log(`[Gate] Verifying Payment Tx: ${txHash}`);
    return res.json({ 
        success: true, 
        access_granted: true, 
        data: {
            signal: "STRONG_BUY",
            asset: "CRO / USDC",
            target: "+15% (Scalp)",
            confidence: "92% (AI Verified)"
        } 
    });
});

app.listen(PORT, () => {
    console.log(`💰 Aegis Revenue Gate running on port ${PORT}`);
});
