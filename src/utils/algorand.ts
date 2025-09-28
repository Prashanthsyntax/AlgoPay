// src/utils/algorand.ts
import algosdk, { SuggestedParams, Transaction, SignedTransaction } from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";
import { SignerTransaction } from "@perawallet/connect/dist/util/model/peraWalletModels";

// Algorand client
const ALGOD_SERVER = "https://testnet-api.algonode.cloud";
const ALGOD_PORT = "";
const ALGOD_TOKEN = "";
export const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT);

// Pera Wallet
export const peraWallet = new PeraWalletConnect();

// Connect wallet
export const connectWallet = async (): Promise<string[]> => {
  const accounts: string[] = await peraWallet.connect();
  return accounts;
};

// Disconnect wallet
export const disconnectWallet = (): Promise<void> => peraWallet.disconnect();

// Send Algo
export const sendAlgo = async (
  from: string,
  to: string,
  amount: number
): Promise<string> => {
  const suggestedParams: SuggestedParams = await algodClient.getTransactionParams().do();

  const txn: Transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from,
    to,
    amount: algosdk.algosToMicroalgos(amount),
    suggestedParams,
  } as any);

  // Sign transaction with Pera Wallet
  const signedTxnArray = await peraWallet.signTransaction([[txn] as unknown as SignerTransaction[]]);
  // Pera Wallet returns array of Uint8Array, use the first element directly
  const signedTxn = signedTxnArray[0];

  await algodClient.sendRawTransaction(signedTxn).do();
  const txId: string = txn.txID().toString();

  // Wait for confirmation
  await algosdk.waitForConfirmation(algodClient, txId, 4);

  return txId;
};

// Get last 10 transactions
export const getTransactions = async (address: string): Promise<any[]> => {
  const res = await fetch(
    `https://testnet-idx.algonode.cloud/v2/accounts/${address}/transactions?limit=10`
  );
  const data: { transactions: any[] } = await res.json();
  return data.transactions || [];
};
