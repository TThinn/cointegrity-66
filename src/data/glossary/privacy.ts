
import { GlossaryTerm } from "./types";

export const privacyTerms: GlossaryTerm[] = [
  {
    term: "Zero-Knowledge Proof",
    definition: "A cryptographic method that allows one party to prove knowledge of information without revealing the information itself.",
    categories: ["privacy_technology"],
    related: ["zk-SNARKs", "Privacy", "Cryptography"]
  },
  {
    term: "zk-SNARKs",
    definition: "Zero-Knowledge Succinct Non-Interactive Argument of Knowledge - a form of zero-knowledge proof that is compact and quick to verify.",
    categories: ["privacy_technology"],
    related: ["Zero-Knowledge Proof", "Privacy", "Zcash"]
  },
  {
    term: "Mixing Service",
    definition: "A service that obscures the connection between cryptocurrency addresses by mixing multiple transactions together.",
    categories: ["privacy_technology"],
    related: ["Privacy", "Transaction Obfuscation", "Anonymity"]
  },
  {
    term: "Ring Signature",
    definition: "A cryptographic signature scheme that allows signing on behalf of a group without revealing which member signed.",
    categories: ["privacy_technology"],
    related: ["Privacy", "Monero", "Anonymity"]
  }
];
