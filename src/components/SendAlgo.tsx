// src/components/SendAlgo.tsx
import React, { useState } from "react";
import algosdk from "algosdk";
import { peraWallet } from "../utils/algorand"; // re-exported instance

export default function SendAlgo() {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const sendTransaction = async () => {
    try {
      const algodClient = new algosdk.Algodv2("", "https://testnet-api.algonode.cloud", "");
      const accounts = await peraWallet.reconnectSession();
      const sender = accounts[0];

      const params = await algodClient.getTransactionParams().do();
      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender,
        to: receiver,
        amount: Math.floor(Number(amount) * 1e6), // convert Algo to microAlgos
        suggestedParams: params,
      });

      const signedTxn = await peraWallet.signTransaction([txn]);
      const { txId } = await algodClient.sendRawTransaction(signedTxn).do();

      console.log("Transaction sent with ID:", txId);
    } catch (err) {
      console.error("Transaction failed:", err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Receiver Address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount (Algo)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendTransaction}>Send Algo</button>
    </div>
  );
}
