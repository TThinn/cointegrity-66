
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
  },
  {
    term: "Proof of Work",
    definition: "A consensus mechanism that requires computational work to validate transactions and create new blocks.",
    categories: ["mining_staking", "blockchain_technology"],
    related: ["Mining", "Bitcoin", "Energy Consumption"]
  },
  {
    term: "Proof of Stake",
    definition: "A consensus mechanism where validators are chosen to create new blocks based on their stake in the network.",
    categories: ["mining_staking", "blockchain_technology"],
    related: ["Staking", "Validator", "Energy Efficient"]
  },
  {
    term: "ASIC",
    definition: "Application-Specific Integrated Circuit - specialized hardware designed specifically for cryptocurrency mining.",
    categories: ["mining_staking"],
    related: ["Mining Hardware", "Bitcoin Mining", "Specialized Equipment"]
  },
  {
    term: "GPU Mining",
    definition: "Using graphics processing units to mine cryptocurrencies, popular for Ethereum and other altcoins.",
    categories: ["mining_staking"],
    related: ["Graphics Card", "Ethereum Mining", "Mining Rig"]
  },
  {
    term: "Mining Difficulty",
    definition: "A measure of how difficult it is to find a new block compared to the easiest it can ever be.",
    categories: ["mining_staking"],
    related: ["Difficulty Adjustment", "Block Time", "Network Security"]
  },
  {
    term: "Block Reward",
    definition: "The amount of cryptocurrency awarded to miners or validators for successfully creating a new block.",
    categories: ["mining_staking"],
    related: ["Mining Reward", "Coinbase Transaction", "Inflation"]
  },
  {
    term: "Halving",
    definition: "An event where the block reward for mining is cut in half, occurring at predetermined intervals.",
    categories: ["mining_staking", "tokenomics"],
    related: ["Bitcoin Halving", "Supply Reduction", "Scarcity"]
  },
  {
    term: "Mining Rig",
    definition: "A computer system specifically built for mining cryptocurrencies, often containing multiple GPUs or ASICs.",
    categories: ["mining_staking"],
    related: ["Mining Hardware", "GPU", "ASIC"]
  },
  {
    term: "Pool Share",
    definition: "A unit of work contributed by a miner to a mining pool, used to calculate reward distribution.",
    categories: ["mining_staking"],
    related: ["Mining Pool", "Work Distribution", "Reward Calculation"]
  },
  {
    term: "Solo Mining",
    definition: "Mining cryptocurrency independently without joining a mining pool, keeping all rewards but with higher variance.",
    categories: ["mining_staking"],
    related: ["Independent Mining", "Full Rewards", "Higher Risk"]
  },
  {
    term: "Delegated Proof of Stake",
    definition: "A consensus mechanism where token holders vote for delegates who validate transactions on their behalf.",
    categories: ["mining_staking"],
    related: ["DPoS", "Voting", "Representative Validation"]
  },
  {
    term: "Slashing",
    definition: "A penalty mechanism in proof-of-stake networks where validators lose part of their stake for malicious behavior.",
    categories: ["mining_staking"],
    related: ["Validator Penalty", "Network Security", "Punishment"]
  },
  {
    term: "Staking Pool",
    definition: "A group of cryptocurrency holders who combine their stakes to increase their chances of being selected as validators.",
    categories: ["mining_staking"],
    related: ["Staking", "Pooled Resources", "Shared Rewards"]
  },
  {
    term: "Unstaking Period",
    definition: "The time period during which staked tokens are locked and cannot be withdrawn after initiating unstaking.",
    categories: ["mining_staking"],
    related: ["Lock-up Period", "Withdrawal Delay", "Liquidity"]
  },
  {
    term: "Mining Farm",
    definition: "A large-scale mining operation with numerous mining rigs concentrated in one location for efficiency.",
    categories: ["mining_staking"],
    related: ["Industrial Mining", "Scale Economy", "Large Operation"]
  }
];
