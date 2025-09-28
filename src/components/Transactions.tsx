import React, { useEffect, useState } from "react";
import { getTransactions } from "../utils/algorand";

interface TransactionsProps {
  account: string;
}

export default function Transactions({ account }: TransactionsProps) {
  const [txns, setTxns] = useState<any[]>([]);

  useEffect(() => {
    const fetchTxns = async () => {
      const transactions = await getTransactions(account);
      setTxns(transactions);
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
