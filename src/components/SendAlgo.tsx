import React, { useState } from "react";
import { sendAlgo } from "../utils/algorand";

interface SendProps {
  account: string;
}

export default function SendAlgo({ account }: SendProps) {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = async () => {
    if (!account) return alert("Connect wallet first!");
    try {
      const txId = await sendAlgo(account, receiver, Number(amount));
      alert(`Transaction successful! TXID: ${txId}`);
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
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
      <button onClick={handleSend}>Send Algo</button>
    </div>
  );
}
