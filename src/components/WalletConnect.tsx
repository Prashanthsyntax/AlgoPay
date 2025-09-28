import React, { useState } from "react";
import { connectWallet, disconnectWallet } from "../utils/algorand";

interface WalletProps {
  setAccount: (account: string | null) => void;
}

export default function WalletConnect({ setAccount }: WalletProps) {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      const accounts = await connectWallet();
      setCurrentAccount(accounts[0]);
      setAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setCurrentAccount(null);
    setAccount(null);
  };

  return (
    <div>
      {currentAccount ? (
        <>
          <p>Connected: {currentAccount}</p>
          <button onClick={handleDisconnect}>Disconnect</button>
        </>
      ) : (
        <button onClick={handleConnect}>Connect Pera Wallet</button>
      )}
    </div>
  );
}
