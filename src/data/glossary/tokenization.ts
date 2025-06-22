
import { GlossaryTerm } from "./types";

export const tokenizationTerms: GlossaryTerm[] = [
  {
    term: "Tokenization",
    definition: "The process of converting physical or digital assets into blockchain-based tokens that can be owned, traded, and managed.",
    categories: ["tokenization"],
    related: ["Asset Tokenization", "Real World Assets", "Fractional Ownership"]
  },
  {
    term: "Real World Assets",
    definition: "Physical assets like real estate, commodities, or artwork that are represented as tokens on a blockchain.",
    categories: ["tokenization"],
    related: ["RWA", "Asset Tokenization", "Traditional Assets"]
  },
  {
    term: "Fractional Ownership",
    definition: "The division of ownership of an asset into smaller, tradeable tokens, allowing multiple parties to own portions.",
    categories: ["tokenization"],
    related: ["Tokenization", "Shared Ownership", "Investment"]
  },
  {
    term: "Security Token",
    definition: "A digital token that represents ownership in an external asset or company and is subject to securities regulations.",
    categories: ["tokenization", "regulatory_frameworks"],
    related: ["STO", "Securities", "Regulation"]
  }
];
