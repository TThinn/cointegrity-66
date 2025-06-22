
import { GlossaryTerm } from "./types";

export const daoTerms: GlossaryTerm[] = [
  {
    term: "DAO",
    definition: "Decentralized Autonomous Organization - an organization governed by smart contracts and community voting rather than traditional management structures.",
    categories: ["dao"],
    related: ["Governance Token", "Proposal", "Treasury"]
  },
  {
    term: "Governance Token",
    definition: "A cryptocurrency that gives holders voting rights in protocol decisions and proposals within a DAO or DeFi platform.",
    categories: ["dao", "tokenomics"],
    related: ["DAO", "Voting Power", "Proposal"]
  },
  {
    term: "Treasury",
    definition: "The collective funds owned and managed by a DAO, typically used for development, operations, and community initiatives.",
    categories: ["dao"],
    related: ["DAO", "Governance", "Multisig"]
  },
  {
    term: "Proposal",
    definition: "A formal suggestion for changes or actions that token holders can vote on within a DAO governance system.",
    categories: ["dao"],
    related: ["DAO", "Governance Token", "Voting"]
  },
  {
    term: "Multisig",
    definition: "Multi-signature wallet that requires multiple private keys to authorize transactions, commonly used for DAO treasury management.",
    categories: ["dao", "wallets_security"],
    related: ["Treasury", "Security", "Private Key"]
  }
];
