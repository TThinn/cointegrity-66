
import { GlossaryTerm } from "./types";

export const walletsTerms: GlossaryTerm[] = [
  {
    term: "Wallet",
    definition: "A digital tool that allows users to store, send, and receive cryptocurrencies by managing private and public keys.",
    categories: ["wallets_security"],
    related: ["Private Key", "Public Key", "Address"]
  },
  {
    term: "Hot Wallet",
    definition: "A cryptocurrency wallet that is connected to the internet, making it convenient for frequent transactions but potentially less secure.",
    categories: ["wallets_security"],
    related: ["Cold Wallet", "Online Wallet", "Security"]
  },
  {
    term: "Cold Wallet",
    definition: "A cryptocurrency wallet that is kept offline, providing enhanced security for long-term storage of digital assets.",
    categories: ["wallets_security"],
    related: ["Hardware Wallet", "Paper Wallet", "Security"]
  },
  {
    term: "Hardware Wallet",
    definition: "A physical device designed to securely store cryptocurrency private keys offline.",
    categories: ["wallets_security"],
    related: ["Cold Storage", "Ledger", "Trezor"]
  },
  {
    term: "Software Wallet",
    definition: "A digital application that stores cryptocurrency private keys on a computer or mobile device.",
    categories: ["wallets_security"],
    related: ["Mobile Wallet", "Desktop Wallet", "Hot Wallet"]
  },
  {
    term: "Paper Wallet",
    definition: "A physical document containing cryptocurrency private and public keys, providing offline cold storage.",
    categories: ["wallets_security"],
    related: ["Cold Storage", "Offline Storage", "Physical Security"]
  },
  {
    term: "Seed Phrase",
    definition: "A series of words (usually 12 or 24) that can be used to recover a cryptocurrency wallet and its contents.",
    categories: ["wallets_security"],
    related: ["Recovery Phrase", "BIP39", "Wallet Recovery"]
  },
  {
    term: "Recovery Phrase",
    definition: "A sequence of words that serves as a backup to restore access to a cryptocurrency wallet.",
    categories: ["wallets_security"],
    related: ["Seed Phrase", "Mnemonic", "Wallet Backup"]
  },
  {
    term: "Private Key",
    definition: "A secret cryptographic key that proves ownership of a cryptocurrency address and allows spending of its funds.",
    categories: ["wallets_security"],
    related: ["Public Key", "Digital Signature", "Wallet"]
  },
  {
    term: "Public Key",
    definition: "A cryptographic key derived from a private key that can be shared publicly and is used to receive cryptocurrency.",
    categories: ["wallets_security"],
    related: ["Private Key", "Address", "Cryptography"]
  },
  {
    term: "Address",
    definition: "A unique identifier derived from a public key where cryptocurrency can be sent and received.",
    categories: ["wallets_security"],
    related: ["Public Key", "Wallet", "Transaction"]
  },
  {
    term: "MetaMask",
    definition: "A popular browser extension and mobile wallet that enables interaction with Ethereum-based applications.",
    categories: ["wallets_security", "web3"],
    related: ["Browser Wallet", "Web3", "Ethereum"]
  },
  {
    term: "WalletConnect",
    definition: "An open protocol that connects mobile wallets to desktop applications through QR code scanning.",
    categories: ["wallets_security", "web3"],
    related: ["Mobile Wallet", "dApp Connection", "Protocol"]
  },
  {
    term: "Custodial Wallet",
    definition: "A wallet service where a third party holds and manages the user's private keys.",
    categories: ["wallets_security"],
    related: ["Exchange Wallet", "Third Party", "Centralized"]
  },
  {
    term: "Non-Custodial Wallet",
    definition: "A wallet where users have full control and ownership of their private keys.",
    categories: ["wallets_security"],
    related: ["Self-Custody", "Private Key Control", "Decentralized"]
  },
  {
    term: "Multi-Signature Wallet",
    definition: "A wallet that requires multiple signatures from different private keys to authorize transactions.",
    categories: ["wallets_security"],
    related: ["Multisig", "Security", "Shared Control"]
  },
  {
    term: "HD Wallet",
    definition: "Hierarchical Deterministic Wallet - generates multiple addresses from a single seed phrase for improved privacy.",
    categories: ["wallets_security"],
    related: ["BIP32", "Address Generation", "Privacy"]
  },
  {
    term: "Brain Wallet",
    definition: "A wallet where the private key is generated from a memorable passphrase, storing the key in the user's memory.",
    categories: ["wallets_security"],
    related: ["Passphrase", "Memory Storage", "Mental Backup"]
  },
  {
    term: "Watch-Only Wallet",
    definition: "A wallet that can view balances and transactions but cannot spend funds as it doesn't have access to private keys.",
    categories: ["wallets_security"],
    related: ["Read-Only", "Monitoring", "No Spending"]
  },
  {
    term: "Keystore File",
    definition: "An encrypted file format that contains a private key, protected by a password.",
    categories: ["wallets_security"],
    related: ["Encryption", "Password Protection", "File Storage"]
  }
];
