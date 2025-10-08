"use client";

import React, { useMemo, useState } from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

const DEFAULT_RPC =
  process.env.NEXT_PUBLIC_SOLANA_RPC || "https://api.devnet.solana.com";

function Gate() {
  const { publicKey, connected, sendTransaction } = useWallet();
  const [mintAddress, setMintAddress] = useState(
    process.env.NEXT_PUBLIC_DEFAULT_MINT || ""
  );
  const [contentUrl, setContentUrl] = useState("");
  const [status, setStatus] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  const connection = useMemo(
    () => new Connection(DEFAULT_RPC, "confirmed"),
    []
  );

  // Token-gate: kolla om användaren äger ≥1 av minten
  const checkAccess = async () => {
    setStatus("");
    setHasAccess(false);
    if (!connected || !publicKey) {
      setStatus("Koppla plånboken först.");
      return;
    }
    if (!mintAddress) {
      setStatus("Ange en giltig Mint-adress (SPL/NFT).");
      return;
    }
    try {
      const mint = new PublicKey(mintAddress.trim());
      const ata = await getAssociatedTokenAddress(mint, publicKey, false);
      try {
        const acc = await getAccount(connection, ata);
        const amount = Number(acc.amount);
        if (amount > 0) {
          setHasAccess(true);
          setStatus("✅ Tillgång beviljad (äger ≥1).");
        } else {
          setStatus("Ingen token hittad på detta konto.");
        }
      } catch {
        setStatus("Inget associerat token-konto hittades (troligen 0).");
      }
    } catch (e) {
      setStatus("Fel: ogiltig Mint-adress eller nätverksproblem.");
    }
  };

  // Hjälpfunktion: Airdrop 1 SOL på devnet
  const airdropDevnet = async () => {
    try {
      if (!connected || !publicKey) {
        setStatus("Koppla plånboken först.");
        return;
      }
      setStatus("Airdroppar 1 SOL på devnet…");
      const sig = await connection.requestAirdrop(
        publicKey,
        1 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(sig, "confirmed");
      setStatus(`✅ Airdrop klar. Tx: ${sig}`);
    } catch (e: any) {
      setStatus(`Fel vid airdrop: ${e?.message || e}`);
    }
  };

  // Hjälpfunktion: skicka en liten tip till dig själv (test av signering)
  const sendTip = async () => {
    try {
      if (!connected || !publicKey) {
        setStatus("Koppla plånboken först.");
        return;
      }
      setStatus("Skickar tip 0.001 SOL…");
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey,
          lamports: Math.floor(0.001 * LAMPORTS_PER_SOL),
        })
      );
      const latest = await connection.getLatestBlockhash();
      tx.feePayer = publicKey;
      tx.recentBlockhash = latest.blockhash;

      const sig = await sendTransaction(tx, connection, {
        preflightCommitment: "confirmed",
      });
      await connection.confirmTransaction({ signature: sig, ...latest }, "confirmed");
      setStatus(`✅ Tip skickad (0.001 SOL). Tx: ${sig}`);
    } catch (e: any) {
      setStatus(`Fel vid tip: ${e?.message || e}`);
    }
  };

  <div className="mt-3 flex items-center gap-2">
  <input
    type="checkbox"
    id="demo"
    checked={demoMode}
    onChange={(e) => {
      setDemoMode(e.target.checked);
      if (e.target.checked) {
        setHasAccess(true);
        setStatus("✅ Demo-läge: access upplåst utan token.");
      } else {
        setHasAccess(false);
        setStatus("");
      }
    }}
    className="accent-white"
  />
  <label htmlFor="demo" className="text-sm text-zinc-300">
    Demo-läge (bypass)
  </label>
</div>

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">CreatorsHub — Token Gate (MVP)</h1>
          <WalletMultiButton />
        </header>

        <main className="mt-6 grid gap-4">
          <div className="bg-zinc-900 p-4 rounded-2xl">
            <label className="block text-sm">SPL/NFT Mint-adress</label>
<input
  value={mintAddress}
  onChange={(e) => setMintAddress(e.target.value)}
  placeholder="7p3…"
  className="mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm"
/>
<p className="mt-1 text-xs text-zinc-400">
  Förvalt: <span className="font-medium">CreatorPass.one</span> (devnet-demo via wSOL). Du kan byta när som helst.
</p>

<label className="block text-sm mt-4">Innehålls-URL</label>
<input
  value={contentUrl}
  onChange={(e) => setContentUrl(e.target.value)}
  placeholder="https://arweave.net/... eller IPFS-länk"
  className="mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm"
/>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={checkAccess}
                className="px-4 py-2 rounded-2xl bg-white text-black font-medium"
              >
                Kolla tillgång
              </button>
              <button
                onClick={airdropDevnet}
                className="px-3 py-2 rounded-2xl bg-zinc-700"
              >
                Airdrop 1 SOL (devnet)
              </button>
              <button
                onClick={sendTip}
                className="px-3 py-2 rounded-2xl bg-zinc-700"
              >
                Skicka tip 0.001 SOL
              </button>
            </div>
            {status && <p className="mt-3 text-sm text-zinc-300">{status}</p>}
          </div>

          <div className="mt-3 flex items-center gap-2">
  <input
    type="checkbox"
    id="demo"
    checked={demoMode}
    onChange={(e) => {
      setDemoMode(e.target.checked);
      if (e.target.checked) {
        setHasAccess(true);
        setStatus("✅ Demo-läge: access upplåst utan token.");
      } else {
        setHasAccess(false);
        setStatus("");
      }
    }}
    className="accent-white"
  />
  <label htmlFor="demo" className="text-sm text-zinc-300">
    Demo-läge (bypass)
  </label>
</div>


          {hasAccess && (
            <div className="bg-zinc-900 p-4 rounded-2xl">
              <h3 className="font-semibold mb-2">Du har access</h3>
              {contentUrl ? (
                <a
                  className="underline"
                  href={contentUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Öppna innehåll
                </a>
              ) : (
                <p className="text-sm text-zinc-400">Ingen URL angiven ännu.</p>
              )}
            </div>
          )}
        </main>

        <footer className="mt-8 text-xs text-zinc-500">
          RPC: {DEFAULT_RPC.replace("https://", "")}
        </footer>
      </div>
    </div>
  );
}

export default function GatedContent() {
  const endpoint = DEFAULT_RPC;
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Gate />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
