'use client';

import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { SystemProgram, Transaction, PublicKey } from '@solana/web3.js';


// Client-only (förhindrar hydration-fel)
const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((m) => m.WalletMultiButton),
  { ssr: false }
);

// (Removed duplicate top-level balance state and useEffect that referenced 'wallet')


/**
 * CreatorsHub – MVP Skeleton (Click-safe + Phantom quick connect)
 * - Overlay av under felsökning (showReveal=false)
 * - Topbar med extrem z-index + debug
 * - Connect Wallet (modal) + Quick Connect Phantom (direkt)
 */

const localKey = {
    ACCESS_TOKENS: "ch_access_tokens",
    PUBLISHED: "ch_published",
};

function loadLocalArray(key: string) {
    try {
        const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null;
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
    }

function saveLocalArray(key: string, arr: any[]) {
    if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(arr));
}

// === TYPE: published work item ===
type WorkItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // temporär URL tills vi sparar på IPFS
  createdAt: number;
};


export default function CreatorsHubMVP() {
  const wallet = useWallet();
  const { setVisible } = useWalletModal();
  const publicKeyStr = wallet.publicKey?.toBase58() ?? "";

  const worksKey = useMemo(
  () => (publicKeyStr ? `ch_works_${publicKeyStr}` : 'ch_works_anonymous'),
  [publicKeyStr]
);


  // === BALANCE STATE & FETCH ===
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!wallet.publicKey) {
        setBalance(null);
        return;
      }
      try {
        const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.devnet.solana.com';
        const conn = new Connection(endpoint, 'confirmed');
        const lamports = await conn.getBalance(wallet.publicKey);
        setBalance(lamports / LAMPORTS_PER_SOL);
      } catch (e) {
        console.error('Balance fetch failed', e);
        setBalance(null);
      }
    };

    fetchBalance();
  }, [wallet.publicKey]);

  const [purchaseStatus, setPurchaseStatus] = useState<'idle'|'pending'|'confirmed'|'error'>('idle');
const [unlocked, setUnlocked] = useState(false);

// === UPLOAD (bild) ===
const [workImageUrl, setWorkImageUrl] = useState<string | null>(null);

const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  // Skapa en temporär URL för preview (persistens tar vi senare)
  const url = URL.createObjectURL(file);
  setWorkImageUrl(url);
};

// === METADATA (titel + beskrivning) ===
const [workTitle, setWorkTitle] = useState("");
const [workDescription, setWorkDescription] = useState("");

// === PUBLISHED WORKS (lokal lista) ===
const [works, setWorks] = useState<WorkItem[]>([]);

useEffect(() => {
  if (typeof window === 'undefined') return;
  try {
    const saved = localStorage.getItem(worksKey);
    setWorks(saved ? JSON.parse(saved) : []);
  } catch {
    setWorks([]);
  }
}, [worksKey]);


const handleDeleteWork = (id: string) => {
  const next = works.filter((w) => w.id !== id);
  setWorks(next);
  localStorage.setItem(worksKey, JSON.stringify(next));
};

const handlePublish = () => {
  if (!workImageUrl) {
    alert('Välj en bild först.');
    return;
  }
  if (!workTitle.trim()) {
    alert('Skriv en titel.');
    return;
  }

    const item: WorkItem = {
      id: (globalThis.crypto ?? window.crypto).randomUUID(),
      title: workTitle.trim(),
      description: workDescription.trim(),
      imageUrl: workImageUrl,
      createdAt: Date.now(),
    };
  
    // Save to localStorage and update state
    const updated = [item, ...works];
    setWorks(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(worksKey, JSON.stringify(updated));
    }
    // Reset form
    setWorkImageUrl(null);
    setWorkTitle("");
    setWorkDescription("");
  }

  

const handleAirdrop = async () => {
  try {
    if (!wallet.publicKey) {
      alert('Connect a wallet first');
      return;
    }
    const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.devnet.solana.com';
    const conn = new Connection(endpoint, 'confirmed');
    const sig = await conn.requestAirdrop(wallet.publicKey, 0.1 * LAMPORTS_PER_SOL);
    await conn.confirmTransaction(sig, 'confirmed');
    alert('Airdrop successful!');
    // Optionally refresh balance
    const lamports = await conn.getBalance(wallet.publicKey);
    setBalance(lamports / LAMPORTS_PER_SOL);
  } catch (e) {
    console.error(e);
    alert('Airdrop failed. Check console for details.');
  }
};

const handleBuy = async () => {
  try {
    if (!wallet.publicKey) {
      alert('Connect a wallet first');
      return;
    }
    setPurchaseStatus('pending');

    const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.devnet.solana.com';
    const conn = new Connection(endpoint, 'confirmed');

    // 👇 Byt till din egen devnet-adress
    
    const recipient = wallet.publicKey!; // test: skicka till dig själv på devnet

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: recipient,
        lamports: Math.round(0.01 * LAMPORTS_PER_SOL),
      })
    );

    const signature = await wallet.sendTransaction(tx, conn);
    await conn.confirmTransaction(signature, 'confirmed');

    setPurchaseStatus('confirmed');
    setUnlocked(true);
  } catch (e) {
    console.error(e);
    setPurchaseStatus('error');
    alert('Transaction failed. Check console for details.');
  }
};



  // ⬆️ Lämna allt ovanför denna rad, och låt nästa rad vara din första "return ( ... )"



    // Overlay av vid felsökning
    const [showReveal] = useState(false);
    const [tab, setTab] = useState<"discover" | "studio">("discover");
    const [pieces, setPieces] = useState<any[]>(() => loadLocalArray(localKey.PUBLISHED));
    const [draft, setDraft] = useState({ title: "", description: "", image: "", price: 2 });
    const [activePiece, setActivePiece] = useState<any | null>(null);
    const [showUpload, setShowUpload] = useState(false);
    const [processing, setProcessing] = useState(false);

    const hasAccess = (id: string) => loadLocalArray(localKey.ACCESS_TOKENS).includes(id);
    const grantAccess = (id: string) => {
        const tokens = loadLocalArray(localKey.ACCESS_TOKENS);
        if (!tokens.includes(id)) {
            tokens.push(id);
            saveLocalArray(localKey.ACCESS_TOKENS, tokens);
        }
    };

    const publishDraft = () => {
        if (!wallet.connected) {
            alert("Connect wallet to publish.");
            return;
        }
        if (!draft.title || !draft.image) {
            alert("Please add title and image (URL).");
            return;
        }
        const piece = {
            id: crypto.randomUUID(),
            title: draft.title.trim(),
            description: draft.description.trim(),
            image: draft.image.trim(),
            price: Number(draft.price) || 0,
            creator: publicKeyStr || "unknown",
            unlockedBy: [],
        };
        const updated = [piece, ...pieces];
        setPieces(updated);
        saveLocalArray(localKey.PUBLISHED, updated);
        setDraft({ title: "", description: "", image: "", price: 2 });
        setShowUpload(false);
        setTab("studio");
    };

    const simulatePaymentAndUnlock = async (piece: any) => {
        setProcessing(true);
        await new Promise((r) => setTimeout(r, 900));
        grantAccess(piece.id);
        setProcessing(false);
        alert("Unlocked. Welcome behind the line.");
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* REVEAL avstängd under felsökning */}
            <AnimatePresence>{false && showReveal && <></>}</AnimatePresence>

            {/* TOP BAR */}
            <div className="sticky top-0 z-[99999] backdrop-blur-sm bg-black/70 border-b border-white/10">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between pointer-events-auto relative">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white" />
                        <div className="text-xl font-semibold tracking-tight">CreatorsHub</div>
                        <span className="ml-2 text-xs text-white/50">alpha</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Debug: försäkra oss om att klick går igenom */}
                        <button
                            onClick={() => alert("Topbar click OK")}
                            className="px-2 py-1 rounded border border-white/20 text-xs"
                        >
                            Debug Click
                        </button>

                        <div className="w-px h-6 bg-white/10 mx-2" />

                        {/* Connect / Disconnect */}


                        {!wallet.connected ? (
                            <div className="flex items-center gap-2">
                                
    <WalletMultiButton />
  </div>
) : (
      <div className="flex items-center gap-2">
                                <span className="text-xs text-white/60 hidden sm:inline">
                                    {publicKeyStr.slice(0, 6)}…{publicKeyStr.slice(-4)}
                                </span>
                                <span className="text-xs text-white/70 ml-2">
  {typeof balance === 'number' ? `${balance.toFixed(3)} SOL` : '—'}
</span>

<button
  onClick={handleAirdrop}
  className="px-3 py-1.5 rounded-2xl border border-white/30 text-sm hover:bg-white hover:text-black"
>
  Airdrop 0.1 SOL (devnet)
</button>


<button
  onClick={handleBuy}
  disabled={purchaseStatus === 'pending'}
  className="px-3 py-1.5 rounded-2xl border border-white/30 text-sm hover:bg-white hover:text-black disabled:opacity-50"
>
  {purchaseStatus === 'pending' ? 'Processing…' : 'Buy test unlock (0.01 SOL)'}
</button>


                                <button
                                    onClick={wallet.disconnect}
                                    className="px-3 py-1.5 rounded-2xl border border-white/30 text-sm hover:bg-white hover:text-black"
                                >
                                    Disconnect
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <main className="max-w-6xl mx-auto px-4 py-8">

{unlocked ? (
  <section className="mt-6 rounded-2xl border border-white/15 p-4">
    <h3 className="text-lg font-semibold">Unlocked work</h3>
    <p className="text-sm text-white/70 mb-3">Tack för köpet — verket är nu upplåst.</p>

    {/* Placeholder för ditt verk (byt till riktig bild/fil senare) */}
    <div className="aspect-video rounded-xl bg-gradient-to-br from-white/10 to-white/5 grid place-items-center">
      <span className="text-white/70">[ Ditt verk visas här ]</span>
    </div>

    {/* Ev. nedladdningslänk senare */}
    {/* <a href="/art/my-work.png" download className="underline text-sm mt-3 inline-block">Ladda ner filen</a> */}
  </section>
) : (
  <section className="mt-6 rounded-2xl border border-white/10 p-4">
    <h3 className="text-lg font-semibold">Locked</h3>
    <p className="text-sm text-white/70">
      Köp för att låsa upp verket. När transaktionen är bekräftad visas innehållet här.
    </p>
  </section>
)}


                <section className="mb-6">
                    <div className="flex items-center gap-2">
                        <TabButton active={tab === "discover"} onClick={() => setTab("discover")}>
                            Discover
                        </TabButton>
                        <TabButton active={tab === "studio"} onClick={() => setTab("studio")}>
                            Your Studio
                        </TabButton>
                    </div>
                </section>

{tab === "studio" ? (
  <section>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg uppercase tracking-widest">Your Studio</h2>
    </div>

    {/* Upload image section */}
    <div className="mt-4">
      <label
        htmlFor="fileUpload"
        className="cursor-pointer px-4 py-2 rounded-xl border border-white/30 text-sm hover:bg-white hover:text-black"
      >
        Upload image
      </label>
      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        onChange={handleSelectImage}
        className="hidden"
      />

      {workImageUrl && (
        <div className="mt-3 rounded-xl overflow-hidden border border-white/10">
          <img
            src={workImageUrl}
            alt="Preview"
            className="w-full h-auto object-cover"
          />
        </div>
      )}
    </div>

    {/* Metadata inputs */}
    <div className="mt-4 space-y-3">
      <input
        type="text"
        placeholder="Titel på verket"
        value={workTitle}
        onChange={(e) => setWorkTitle(e.target.value)}
        className="w-full bg-transparent border border-white/20 rounded-xl px-3 py-2 text-sm focus:border-white/40 outline-none"
      />
      <textarea
        placeholder="Kort beskrivning..."
        value={workDescription}
        onChange={(e) => setWorkDescription(e.target.value)}
        rows={3}
        className="w-full bg-transparent border border-white/20 rounded-xl px-3 py-2 text-sm focus:border-white/40 outline-none"
      />
    </div>

    {/* Publish */}
    <div className="mt-4">
      <button
        onClick={handlePublish}
        className="px-3 py-2 rounded-2xl bg-white text-black text-sm"
        disabled={!workImageUrl || !workTitle.trim()}
      >
        Publish
      </button>
    </div>

    {/* Your works (local preview) */}
{works.length > 0 && (
  <div className="mt-6">
    <h3 className="text-base font-semibold mb-3">Your works</h3>
    <Grid>
{works.map((w) => (
  <div key={w.id} className="group relative">
    <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
      <img
        src={w.imageUrl}
        alt={w.title}
        className="w-full h-full object-cover group-hover:scale-105 transition"
      />
    </div>

    {/* Titel + meta */}
    <div className="mt-2 pr-16">
      <div className="font-medium">{w.title}</div>
      {w.description && (
        <div className="text-xs text-white/60 mt-0.5 line-clamp-2">{w.description}</div>
      )}
      <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">
        {new Date(w.createdAt).toLocaleString()}
      </div>
    </div>

    {/* Delete-knapp (hörn uppe till höger) */}
    <button
      onClick={() => {
        if (confirm('Delete this work?')) handleDeleteWork(w.id);
      }}
      className="absolute top-2 right-2 px-2 py-1 text-[11px] rounded-lg border border-white/20 bg-black/40 hover:bg-white hover:text-black"
      aria-label={`Delete ${w.title}`}
    >
      Delete
    </button>
  </div>
))}

    </Grid>
  </div>
)}


    {/* Dina befintliga publicerade verk (från pieces) */}
    {(publicKeyStr ? pieces.filter((p) => p.creator === publicKeyStr) : []).length === 0 ? (
      <EmptyState onUpload={() => setShowUpload(true)} />
    ) : (
      <Grid>
        {pieces
          .filter((p) => p.creator === publicKeyStr)
          .map((p) => (
            <PieceCard key={p.id} piece={p} onOpen={() => setActivePiece(p)} />
          ))}
      </Grid>
    )}
  </section>
) : (
  <section>
    <h2 className="text-lg uppercase tracking-widest mb-6">Discover</h2>
    {pieces.length === 0 ? (
      <div className="text-white/60">No works yet. Be first to publish.</div>
    ) : (
      <Grid>
        {pieces.map((p) => (
          <PieceCard key={p.id} piece={p} onOpen={() => setActivePiece(p)} />
        ))}
      </Grid>
    )}
  </section>
)}
            </main>

            {/* UPLOAD MODAL */}
            <AnimatePresence>
                {showUpload && (
                    <Modal onClose={() => setShowUpload(false)}>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-semibold">Upload your first piece</h3>
                            {!wallet.connected && (
                                <div className="text-sm text-red-300">Connect wallet to publish.</div>
                            )}
                            <label className="text-sm text-white/70">Title</label>
                            <input
                                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2"
                                placeholder="Untitled"
                                value={draft.title}
                                onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                            />
                            <label className="text-sm text-white/70">Description</label>
                            <textarea
                                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2"
                                placeholder="A few words about this piece…"
                                rows={3}
                                value={draft.description}
                                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                            />
                            <label className="text-sm text-white/70">Image URL</label>
                            <input
                                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2"
                                placeholder="https://…"
                                value={draft.image}
                                onChange={(e) => setDraft((d) => ({ ...d, image: e.target.value }))}
                            />
                            <label className="text-sm text-white/70">Unlock price (USDC)</label>
                            <input
                                type="number"
                                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-32"
                                value={draft.price}
                                onChange={(e) => setDraft((d) => ({ ...d, price: Number(e.target.value) }))}
                            />
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    className="px-3 py-2 rounded-xl border border-white/20"
                                    onClick={() => setShowUpload(false)}
                                >
                                    Cancel
                                </button>
                                <button className="px-3 py-2 rounded-xl bg-white text-black" onClick={publishDraft}>
                                    Publish
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>

            {/* PIECE MODAL */}
            <AnimatePresence>
                {activePiece && (
                    <Modal onClose={() => setActivePiece(null)}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="aspect-square bg-white/5 rounded-2xl overflow-hidden">
                                <img src={activePiece.image} alt={activePiece.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h3 className="text-2xl font-semibold">{activePiece.title}</h3>
                                    <div className="text-xs text-white/50 mt-1">{formatAddress(activePiece.creator)}</div>
                                </div>
                                <p className="text-white/80 whitespace-pre-wrap">{activePiece.description || ""}</p>
                                <div className="mt-2 p-3 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm">
                                        Unlock to see more • <span className="font-semibold">{activePiece.price} USDC</span>
                                    </div>
                                    {!hasAccess(activePiece.id) ? (
                                        <button
                                            disabled={processing}
                                            onClick={() => simulatePaymentAndUnlock(activePiece)}
                                            className="mt-3 px-3 py-2 rounded-xl bg-white text-black text-sm disabled:opacity-50"
                                        >
                                            {processing ? "Processing…" : "Unlock"}
                                        </button>
                                    ) : (
                                        <div className="mt-3 text-green-300 text-sm">Access granted. Welcome behind the line.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>

            <footer className="border-t border-white/10 py-8 text-center text-xs text-white/50">
                Creators do not want to chase attention — they want to own their art, their audience, and their path.
            </footer>
        </div>
    );
}

/* UI bits */
function TabButton({ children, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={
                "px-3 py-1.5 rounded-2xl text-sm border " +
                (active ? "bg-white text-black border-white" : "border-white/20 hover:bg-white hover:text-black")
            }
        >
            {children}
        </button>
    );
}

function Grid({ children }: any) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">{children}</div>;
}

function PieceCard({ piece, onOpen }: any) {
    return (
        <div className="group cursor-pointer" onClick={onOpen}>
            <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <img src={piece.image} alt={piece.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
            </div>
            <div className="flex items-center justify-between mt-2">
                <div>
                    <div className="font-medium">{piece.title}</div>
                    <div className="text-xs text-white/50">{piece.price} USDC</div>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Unlock</div>
            </div>
        </div>
    );
}

function EmptyState({ onUpload }: any) {
    return (
        <div className="rounded-2xl border border-white/10 p-8 text-center">
            <div className="text-white/70 mb-3">No pieces yet.</div>
            <button onClick={onUpload} className="px-3 py-2 rounded-2xl bg-white text-black text-sm">
                Upload your first piece
            </button>
        </div>
    );
}

function Modal({ children, onClose }: any) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="relative z-10 w-[92vw] max-w-2xl bg-black border border-white/10 rounded-2xl p-6"
            >
                <button
                    className="absolute top-3 right-3 text-white/50 hover:text-white"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>
                {children}
            </motion.div>
        </motion.div>
    );
}

function formatAddress(addr: string) {
    if (!addr) return "unknown";
    return addr.length <= 10 ? addr : `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}
