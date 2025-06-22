
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
  }
];
