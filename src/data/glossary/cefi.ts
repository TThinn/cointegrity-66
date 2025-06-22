
import { GlossaryTerm } from "./types";

export const cefiTerms: GlossaryTerm[] = [
  {
    term: "CeFi",
    definition: "Centralized Finance - traditional financial services that operate through centralized institutions and intermediaries.",
    categories: ["cefi"],
    related: ["DeFi", "Traditional Banking", "Centralized Exchange"]
  },
  {
    term: "Centralized Exchange",
    definition: "A cryptocurrency exchange operated by a central authority that facilitates trading between users.",
    categories: ["cefi", "exchanges_trading"],
    related: ["CEX", "Binance", "Coinbase"]
  },
  {
    term: "Custody Services",
    definition: "Professional services that hold and secure cryptocurrency assets on behalf of institutional and retail investors.",
    categories: ["cefi", "wallets_security"],
    related: ["Cold Storage", "Asset Management", "Security"]
  },
  {
    term: "Lending Platform",
    definition: "Centralized platforms that allow users to lend or borrow cryptocurrencies with predetermined interest rates.",
    categories: ["cefi"],
    related: ["Interest Rate", "Collateral", "Credit"]
  }
];
