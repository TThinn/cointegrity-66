
import { GlossaryTerm } from "./types";

export const blockchainTechnologyTerms: GlossaryTerm[] = [
  {
    term: "Blockchain",
    definition: "A distributed digital ledger that records transactions across multiple computers in a way that makes it nearly impossible to change, hack, or cheat the system.",
    categories: ["blockchain_technology"],
    related: ["Distributed Ledger", "Hash", "Block"]
  },
  {
    term: "Block",
    definition: "A collection of transactions that are bundled together and added to the blockchain after being validated by network participants.",
    categories: ["blockchain_technology"],
    related: ["Blockchain", "Transaction", "Mining"]
  },
  {
    term: "Hash",
    definition: "A fixed-length string of characters that serves as a unique digital fingerprint for data, ensuring integrity and enabling efficient verification.",
    categories: ["blockchain_technology"],
    related: ["Cryptographic Hash", "SHA-256", "Block"]
  },
  {
    term: "Consensus Mechanism",
    definition: "The process by which a blockchain network agrees on the validity of transactions and the state of the ledger.",
    categories: ["blockchain_technology"],
    related: ["Proof of Work", "Proof of Stake", "Mining"]
  },
  {
    term: "Node",
    definition: "A computer that participates in a blockchain network by maintaining a copy of the ledger and validating transactions.",
    categories: ["blockchain_technology"],
    related: ["Full Node", "Light Node", "Validator"]
  },
  {
    term: "Distributed Ledger",
    definition: "A database that is consensually shared and synchronized across multiple sites, institutions, or geographies.",
    categories: ["blockchain_technology"],
    related: ["Blockchain", "Decentralization", "Consensus"]
  },
  {
    term: "Merkle Tree",
    definition: "A binary tree structure used in blockchain to efficiently summarize all transactions in a block.",
    categories: ["blockchain_technology"],
    related: ["Hash", "Block", "Data Structure"]
  },
  {
    term: "Fork",
    definition: "A change to the blockchain protocol that creates a divergence from the original chain.",
    categories: ["blockchain_technology"],
    related: ["Hard Fork", "Soft Fork", "Protocol Upgrade"]
  },
  {
    term: "Immutability",
    definition: "The characteristic of blockchain that makes it extremely difficult to alter or delete recorded transactions.",
    categories: ["blockchain_technology"],
    related: ["Security", "Cryptography", "Trust"]
  },
  {
    term: "Transparency",
    definition: "The ability for all network participants to view and verify transactions on a public blockchain.",
    categories: ["blockchain_technology"],
    related: ["Public Ledger", "Verification", "Trust"]
  }
];
