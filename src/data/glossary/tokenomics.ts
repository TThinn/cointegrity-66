
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
    term: "Max Supply",
    definition: "The maximum number of tokens that will ever exist for a particular cryptocurrency.",
    categories: ["tokenomics"],
    related: ["Token Supply", "Hard Cap", "Scarcity"]
  },
  {
    term: "Circulating Supply",
    definition: "The number of tokens that are currently available and circulating in the market.",
    categories: ["tokenomics"],
    related: ["Available Supply", "Market Cap", "Liquid Tokens"]
  },
  {
    term: "Total Supply",
    definition: "The total number of tokens that currently exist, including those that may be locked or reserved.",
    categories: ["tokenomics"],
    related: ["Existing Tokens", "Circulating Supply", "Token Count"]
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
  },
  {
    term: "Inflation",
    definition: "The rate at which new tokens are created and added to the total supply, potentially decreasing token value.",
    categories: ["tokenomics"],
    related: ["Token Creation", "Supply Increase", "Monetary Policy"]
  },
  {
    term: "Deflation",
    definition: "A decrease in token supply over time, often achieved through burning mechanisms, potentially increasing token value.",
    categories: ["tokenomics"],
    related: ["Token Burn", "Supply Reduction", "Scarcity"]
  },
  {
    term: "Market Capitalization",
    definition: "The total value of a cryptocurrency calculated by multiplying the current price by the circulating supply.",
    categories: ["tokenomics"],
    related: ["Market Cap", "Valuation", "Price × Supply"]
  },
  {
    term: "Fully Diluted Valuation",
    definition: "The market capitalization if all possible tokens were in circulation, calculated using the maximum token supply.",
    categories: ["tokenomics"],
    related: ["FDV", "Max Supply", "Future Valuation"]
  },
  {
    term: "Token Distribution",
    definition: "How tokens are allocated among different stakeholders such as founders, investors, community, and ecosystem development.",
    categories: ["tokenomics"],
    related: ["Allocation", "Token Sale", "Fair Launch"]
  },
  {
    term: "Lock-up Period",
    definition: "A predetermined time during which certain tokens cannot be sold or transferred.",
    categories: ["tokenomics"],
    related: ["Vesting", "Token Release", "Restriction"]
  },
  {
    term: "Cliff",
    definition: "A period during token vesting where no tokens are released, followed by a significant release.",
    categories: ["tokenomics"],
    related: ["Vesting", "Token Release", "Schedule"]
  },
  {
    term: "Fair Launch",
    definition: "A token launch method where there is no pre-mine, private sale, or developer allocation, ensuring equal opportunity for all participants.",
    categories: ["tokenomics"],
    related: ["Equal Opportunity", "No Pre-mine", "Community Launch"]
  },
  {
    term: "Pre-mine",
    definition: "The creation of tokens before the public launch, often allocated to developers, early investors, or marketing.",
    categories: ["tokenomics"],
    related: ["Early Allocation", "Developer Tokens", "Initial Distribution"]
  },
  {
    term: "Token Economics",
    definition: "The study of the economic incentives and mechanisms that govern the behavior of token holders and users.",
    categories: ["tokenomics"],
    related: ["Incentive Design", "Economic Model", "Behavior Economics"]
  },
  {
    term: "Emission Rate",
    definition: "The rate at which new tokens are created and distributed to participants in a blockchain network.",
    categories: ["tokenomics"],
    related: ["Issuance Rate", "Token Creation", "Inflation Rate"]
  },
  {
    term: "Token Velocity",
    definition: "The rate at which tokens change hands within an ecosystem, indicating usage and circulation patterns.",
    categories: ["tokenomics"],
    related: ["Circulation Speed", "Usage Metrics", "Economic Activity"]
  }
];
