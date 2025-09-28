// src/components/Transactions.tsx
import React, { useEffect, useState } from "react";

export default function Transactions({ account }: { account: string }) {
  const [txns, setTxns] = useState<any[]>([]);

  useEffect(() => {
    const fetchTxns = async () => {
      const res = await fetch(
        `https://testnet-idx.algonode.cloud/v2/accounts/${account}/transactions`
      );
      const data = await res.json();
      setTxns(data.transactions);
    };
    if (account) fetchTxns();
  }, [account]);

  return (
    <div>
      <h3>Transaction History</h3>
      <ul>
        {txns.map((txn) => (
          <li key={txn.id}>
            {txn.sender} → {txn["payment-transaction"]?.receiver} :{" "}
            {(txn["payment-transaction"]?.amount || 0) / 1e6} Algo
          </li>
        ))}
      </ul>
    </div>
  );
}
