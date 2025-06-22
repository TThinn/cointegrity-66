
import { GlossaryTerm } from "./types";

export const exchangesTerms: GlossaryTerm[] = [
  {
    term: "Exchange",
    definition: "A platform where cryptocurrencies can be traded for other cryptocurrencies or traditional fiat currencies.",
    categories: ["exchanges_trading"],
    related: ["CEX", "DEX", "Trading"]
  },
  {
    term: "CEX",
    definition: "Centralized Exchange - a cryptocurrency exchange operated by a central authority that facilitates trading between users.",
    categories: ["exchanges_trading", "cefi"],
    related: ["Centralized Exchange", "Trading Platform", "KYC"]
  },
  {
    term: "Order Book",
    definition: "A list of buy and sell orders for a particular cryptocurrency, organized by price level.",
    categories: ["exchanges_trading"],
    related: ["Market Order", "Limit Order", "Trading"]
  },
  {
    term: "Spread",
    definition: "The difference between the highest bid price and the lowest ask price for a cryptocurrency.",
    categories: ["exchanges_trading"],
    related: ["Bid", "Ask", "Liquidity"]
  },
  {
    term: "Market Maker",
    definition: "A participant who provides liquidity to a market by placing both buy and sell orders.",
    categories: ["exchanges_trading"],
    related: ["Liquidity", "Order Book", "Trading"]
  },
  {
    term: "Market Taker",
    definition: "A trader who places orders that are immediately matched with existing orders on the order book.",
    categories: ["exchanges_trading"],
    related: ["Market Order", "Immediate Execution", "Liquidity Taker"]
  },
  {
    term: "Slippage",
    definition: "The difference between the expected price of a trade and the actual executed price, often occurring in volatile markets.",
    categories: ["exchanges_trading", "defi"],
    related: ["AMM", "Liquidity", "Price Impact"]
  },
  {
    term: "Limit Order",
    definition: "An order to buy or sell cryptocurrency at a specific price or better, executed only when the market reaches that price.",
    categories: ["exchanges_trading"],
    related: ["Order Book", "Price Control", "Pending Order"]
  },
  {
    term: "Market Order",
    definition: "An order to buy or sell cryptocurrency immediately at the current market price.",
    categories: ["exchanges_trading"],
    related: ["Immediate Execution", "Current Price", "Market Taker"]
  },
  {
    term: "Stop Loss",
    definition: "An order that automatically sells a position when the price falls to a predetermined level to limit losses.",
    categories: ["exchanges_trading"],
    related: ["Risk Management", "Automatic Sell", "Loss Limitation"]
  },
  {
    term: "Take Profit",
    definition: "An order that automatically sells a position when the price rises to a predetermined level to secure profits.",
    categories: ["exchanges_trading"],
    related: ["Profit Taking", "Automatic Sell", "Target Price"]
  },
  {
    term: "Margin Trading",
    definition: "Trading with borrowed funds to amplify potential returns, increasing both profit potential and risk.",
    categories: ["exchanges_trading"],
    related: ["Leverage", "Borrowed Funds", "Amplified Risk"]
  },
  {
    term: "Leverage",
    definition: "The use of borrowed capital to increase the potential return of an investment, also increasing potential losses.",
    categories: ["exchanges_trading"],
    related: ["Margin Trading", "Amplified Returns", "Risk Management"]
  },
  {
    term: "Liquidation",
    definition: "The forced closure of a leveraged position when losses exceed the available margin.",
    categories: ["exchanges_trading"],
    related: ["Margin Call", "Forced Closure", "Risk Management"]
  },
  {
    term: "Spot Trading",
    definition: "The buying and selling of cryptocurrencies for immediate delivery at current market prices.",
    categories: ["exchanges_trading"],
    related: ["Immediate Settlement", "Current Price", "Physical Trading"]
  },
  {
    term: "Futures Trading",
    definition: "Trading contracts that obligate the purchase or sale of an asset at a predetermined future date and price.",
    categories: ["exchanges_trading"],
    related: ["Derivatives", "Future Contracts", "Speculation"]
  },
  {
    term: "Arbitrage",
    definition: "The practice of buying and selling identical assets on different markets to profit from price differences.",
    categories: ["exchanges_trading"],
    related: ["Price Difference", "Risk-Free Profit", "Market Efficiency"]
  },
  {
    term: "Volume",
    definition: "The total amount of cryptocurrency traded within a specific time period.",
    categories: ["exchanges_trading"],
    related: ["Trading Activity", "Liquidity", "Market Activity"]
  },
  {
    term: "24h Volume",
    definition: "The total trading volume of a cryptocurrency or exchange over the past 24 hours.",
    categories: ["exchanges_trading"],
    related: ["Daily Volume", "Trading Metrics", "Market Activity"]
  },
  {
    term: "Trading Pair",
    definition: "Two cryptocurrencies that can be traded for one another on an exchange.",
    categories: ["exchanges_trading"],
    related: ["Base Currency", "Quote Currency", "Market Pair"]
  }
];
