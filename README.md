# CreatorsHub MVP

En minimal **proof-of-concept** för token-gated content på **Solana**, byggd i **Next.js 15**.

## 🌍 Vision

CreatorsHub bygger på idén att kreatörer (artister, musiker, författare) ska kunna:
- Äga sin publik.
- Låsa upp innehåll på sina egna villkor.
- Slippa jaga algoritmer eller mellanhänder.

Fans får tillgång till exklusivt material genom att hålla en specifik **NFT eller SPL-token** i sin wallet.

## 🚀 Funktioner i denna MVP

- **Koppla Solana-wallet** (Phantom, Solflare, Ledger, Torus).  
- **Ange Mint-adress (SPL/NFT, devnet)** → token som ger access.  
- **Ange innehålls-URL** → Arweave/IPFS eller valfri webblänk (bild, video, ljud, PDF).  
- **Kolla tillgång** → systemet verifierar om användaren äger ≥ 1 av minten.  
- **Lås upp innehåll** → visas direkt i appen (eller öppnas i ny flik).  

## 🛠️ Tech stack

- [Next.js 15](https://nextjs.org/) (React + Turbopack)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Solana Web3.js](https://github.com/solana-labs/solana-web3.js)  
- [@solana/spl-token](https://spl.solana.com/token)  
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)  
- [Framer Motion](https://www.framer.com/motion/)  

## 📦 Installation & körning

1. Klona projektet:
   ```bash
   git clone https://github.com/<ditt-repo>/creatorshub-mvp.git
   cd creatorshub-mvp
