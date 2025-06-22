
import { GlossaryTerm } from "./types";

export const historyTerms: GlossaryTerm[] = [
  {
    term: "Satoshi Nakamoto",
    definition: "The pseudonymous creator of Bitcoin, whose true identity remains unknown.",
    categories: ["crypto_history"],
    related: ["Bitcoin", "White Paper", "Genesis Block"]
  },
  {
    term: "Genesis Block",
    definition: "The first block in a blockchain, often hard-coded into the protocol software.",
    categories: ["crypto_history", "blockchain_technology"],
    related: ["Bitcoin", "Blockchain", "First Block"]
  },
  {
    term: "Mt. Gox",
    definition: "A defunct Bitcoin exchange that was once the largest, which collapsed in 2014 after a major security breach.",
    categories: ["crypto_history"],
    related: ["Exchange Hack", "Bitcoin History", "Security"]
  },
  {
    term: "The DAO Hack",
    definition: "A 2016 exploit of The DAO smart contract that led to the Ethereum hard fork and creation of Ethereum Classic.",
    categories: ["crypto_history", "defi"],
    related: ["Ethereum", "Hard Fork", "Smart Contract"]
  }
];
