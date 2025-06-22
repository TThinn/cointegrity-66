
import { GlossaryTerm } from "./types";

export const exchangesTerms: GlossaryTerm[] = [
  {
    term: "Exchange",
    definition: "A platform where cryptocurrencies can be traded for other cryptocurrencies or traditional fiat currencies.",
    categories: ["exchanges_trading"],
    related: ["CEX", "DEX", "Trading"]
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
    term: "Slippage",
    definition: "The difference between the expected price of a trade and the actual executed price, often occurring in volatile markets.",
    categories: ["exchanges_trading", "defi"],
    related: ["AMM", "Liquidity", "Price Impact"]
  }
];
