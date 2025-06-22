
import { GlossaryTerm } from "./types";

export const defiTerms: GlossaryTerm[] = [
  {
    term: "DeFi",
    definition: "Decentralized Finance - a financial ecosystem built on blockchain technology that eliminates intermediaries and provides open access to financial services.",
    categories: ["defi"],
    related: ["DEX", "Yield Farming", "Liquidity Pool"]
  },
  {
    term: "DEX",
    definition: "Decentralized Exchange - a peer-to-peer marketplace where users can trade cryptocurrencies without a central authority.",
    categories: ["defi", "exchanges_trading"],
    related: ["AMM", "Liquidity Pool", "Slippage"]
  },
  {
    term: "Yield Farming",
    definition: "The practice of earning rewards by providing liquidity to DeFi protocols, often involving complex strategies across multiple platforms.",
    categories: ["defi"],
    related: ["Liquidity Mining", "LP Token", "APY"]
  },
  {
    term: "Liquidity Pool",
    definition: "A collection of funds locked in a smart contract that provides liquidity for decentralized trading and lending.",
    categories: ["defi"],
    related: ["AMM", "LP Token", "Impermanent Loss"]
  },
  {
    term: "AMM",
    definition: "Automated Market Maker - a protocol that uses mathematical formulas to price assets and enable trading without traditional order books.",
    categories: ["defi"],
    related: ["DEX", "Liquidity Pool", "Slippage"]
  },
  {
    term: "Liquidity Mining",
    definition: "The process of providing liquidity to DeFi protocols in exchange for token rewards.",
    categories: ["defi"],
    related: ["Yield Farming", "LP Token", "Rewards"]
  },
  {
    term: "LP Token",
    definition: "Liquidity Provider Token - a token received when providing liquidity to a DeFi protocol, representing your share of the pool.",
    categories: ["defi"],
    related: ["Liquidity Pool", "Yield Farming", "Staking"]
  },
  {
    term: "Impermanent Loss",
    definition: "The temporary loss of funds experienced by liquidity providers due to volatility in a trading pair.",
    categories: ["defi"],
    related: ["Liquidity Pool", "AMM", "Volatility"]
  },
  {
    term: "APY",
    definition: "Annual Percentage Yield - the real rate of return earned on an investment, taking into account the effect of compounding.",
    categories: ["defi"],
    related: ["Yield Farming", "Interest Rate", "Compound Interest"]
  },
  {
    term: "Flash Loan",
    definition: "A type of DeFi loan that must be borrowed and repaid within the same transaction block.",
    categories: ["defi"],
    related: ["Arbitrage", "Smart Contract", "Instant Loan"]
  },
  {
    term: "Compound",
    definition: "A DeFi protocol that allows users to lend and borrow cryptocurrencies while earning interest.",
    categories: ["defi"],
    related: ["Lending Protocol", "Interest Rate", "Governance Token"]
  },
  {
    term: "Aave",
    definition: "A decentralized lending protocol that allows users to lend and borrow various cryptocurrencies.",
    categories: ["defi"],
    related: ["Lending Protocol", "Flash Loan", "Variable Interest"]
  },
  {
    term: "Uniswap",
    definition: "A popular decentralized exchange protocol built on Ethereum using automated market makers.",
    categories: ["defi", "exchanges_trading"],
    related: ["DEX", "AMM", "Liquidity Pool"]
  },
  {
    term: "SushiSwap",
    definition: "A decentralized exchange and automated market maker protocol that evolved from Uniswap.",
    categories: ["defi", "exchanges_trading"],
    related: ["DEX", "AMM", "Yield Farming"]
  },
  {
    term: "PancakeSwap",
    definition: "A decentralized exchange running on Binance Smart Chain, known for lower transaction fees.",
    categories: ["defi", "exchanges_trading"],
    related: ["DEX", "BSC", "AMM"]
  },
  {
    term: "Total Value Locked",
    definition: "The total amount of cryptocurrency locked in DeFi protocols, used as a metric for protocol success.",
    categories: ["defi"],
    related: ["TVL", "DeFi Metrics", "Protocol Value"]
  },
  {
    term: "TVL",
    definition: "Total Value Locked - the total amount of assets deposited in a DeFi protocol.",
    categories: ["defi"],
    related: ["Total Value Locked", "DeFi Metrics", "Liquidity"]
  },
  {
    term: "Synthetic Asset",
    definition: "A financial instrument that derives its value from an underlying asset, created through smart contracts in DeFi.",
    categories: ["defi"],
    related: ["Derivatives", "Smart Contract", "Price Oracle"]
  },
  {
    term: "Rug Pull",
    definition: "A type of exit scam in DeFi where developers abandon a project and run away with investors' funds.",
    categories: ["defi"],
    related: ["Exit Scam", "DeFi Risks", "Due Diligence"]
  },
  {
    term: "Collateralization Ratio",
    definition: "The ratio of collateral value to loan value in DeFi lending protocols.",
    categories: ["defi"],
    related: ["Collateral", "Lending", "Risk Management"]
  }
];
