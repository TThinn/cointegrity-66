
import { GlossaryTerm } from "./types";

export const miningTerms: GlossaryTerm[] = [
  {
    term: "Mining",
    definition: "The process of validating transactions and adding them to a blockchain while earning rewards in cryptocurrency.",
    categories: ["mining_staking"],
    related: ["Proof of Work", "Miner", "Hash Rate"]
  },
  {
    term: "Staking",
    definition: "The process of holding and locking cryptocurrency in a wallet to support network operations and earn rewards.",
    categories: ["mining_staking"],
    related: ["Proof of Stake", "Validator", "Rewards"]
  },
  {
    term: "Hash Rate",
    definition: "The computational power being used to mine and process transactions on a blockchain network.",
    categories: ["mining_staking"],
    related: ["Mining", "Network Security", "Difficulty"]
  },
  {
    term: "Validator",
    definition: "A participant in a proof-of-stake blockchain network who validates transactions and creates new blocks.",
    categories: ["mining_staking"],
    related: ["Staking", "Proof of Stake", "Consensus"]
  },
  {
    term: "Mining Pool",
    definition: "A group of miners who combine their computational resources to increase their chances of mining a block.",
    categories: ["mining_staking"],
    related: ["Mining", "Hash Rate", "Rewards"]
  }
];
