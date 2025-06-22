
import { GlossaryTerm } from "./types";

export const tokenomicsTerms: GlossaryTerm[] = [
  {
    term: "Tokenomics",
    definition: "The economic model and structure of a cryptocurrency or token, including supply, distribution, and utility mechanisms.",
    categories: ["tokenomics"],
    related: ["Token Supply", "Utility Token", "Distribution"]
  },
  {
    term: "Utility Token",
    definition: "A cryptocurrency designed to provide access to a specific product or service within a blockchain ecosystem.",
    categories: ["tokenomics", "cryptocurrency_types"],
    related: ["Token Utility", "Ecosystem", "Use Case"]
  },
  {
    term: "Token Supply",
    definition: "The total number of tokens that exist or will exist for a particular cryptocurrency project.",
    categories: ["tokenomics"],
    related: ["Max Supply", "Circulating Supply", "Inflation"]
  },
  {
    term: "Vesting",
    definition: "A process that gradually releases tokens to holders over time, often used for team allocations and investor tokens.",
    categories: ["tokenomics"],
    related: ["Lock-up Period", "Token Release", "Cliff"]
  },
  {
    term: "Token Burn",
    definition: "The permanent removal of tokens from circulation, typically done to reduce supply and potentially increase value.",
    categories: ["tokenomics"],
    related: ["Deflationary", "Supply Reduction", "Burn Mechanism"]
  }
];
