// src/components/WalletConnect.tsx
import React, { useState } from "react";
import { PeraWalletConnect } from "@perawallet/connect";

const peraWallet = new PeraWalletConnect();

export default function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const newAccounts = await peraWallet.connect();
      setAccount(newAccounts[0]); // first account
    } catch (err) {
      console.error("Failed to connect:", err);
    }
  };

  const disconnectWallet = () => {
    peraWallet.disconnect();
    setAccount(null);
  };

  return (
    <div>
      {account ? (
        <>
          <p>Connected: {account}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect Pera Wallet</button>
      )}
    </div>
  );
}
