import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import SendAlgo from "./components/SendAlgo";
import Transactions from "./components/Transactions";

function App() {
  const [account, setAccount] = useState<string | null>(null);

  return (
    <div>
      <h1>AlgoPay – P2P Payment App</h1>
      <WalletConnect setAccount={setAccount} />
      {account && (
        <>
          <SendAlgo account={account} />
          <Transactions account={account} />
        </>
      )}
    </div>
  );
}

export default App;
