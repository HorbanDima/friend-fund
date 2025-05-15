# FriendFund - Micro-Crowdfunding Among Friends on Solana

A decentralized micro-crowdfunding platform where people raise funds within trusted circles—friends, family, or DAO members. Fully integrated with Solana blockchain for transparent, fee-free transactions.

##  Key Features

### For Fundraisers
-  Create campaigns for personal goals (gifts, trips) or small projects
-  Share with specific circles - no public listings
-  Track contributions in real-time
-  Withdraw funds anytime (threshold optional)

### For Contributors
-  Contribute with USDC on Solana (fast & low-fee)
-  Receive NFT proof of support ("I Helped" collection)
-  Full transparency of fund usage
-  DAO voting for community-funded initiatives

### Tech Advantages
-  Solana blockchain for instant settlements
-  Non-custodial - funds go directly to recipient
-  Open-source & auditable smart contracts
-  Customizable campaign pages

## 🛠️ Tech Stack

| Component          | Technology               |
|--------------------|--------------------------|
| Blockchain         | Solana                   |
| Smart Contracts    | Anchor (Rust)            |
| Frontend           | Next.js + TypeScript     |
| Wallet Integration | Phantom/Solana Wallet Adapter |
| Payments           | USDC (SPL Token)         |
| NFT Standard       | Metaplex (Token Metadata)|



### Local Setup
```bash
git clone https://github.com/HorbanDima/friend-fund.git
cd friend-fund
npm install
