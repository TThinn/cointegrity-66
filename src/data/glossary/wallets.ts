
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
    term: "Seed Phrase",
    definition: "A series of words (usually 12 or 24) that can be used to recover a cryptocurrency wallet and its contents.",
    categories: ["wallets_security"],
    related: ["Recovery Phrase", "BIP39", "Wallet Recovery"]
  }
];
