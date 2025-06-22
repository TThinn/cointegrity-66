
import { GlossaryTerm } from "./types";

export const gamingTerms: GlossaryTerm[] = [
  {
    term: "Play-to-Earn",
    definition: "A gaming model where players can earn cryptocurrency or valuable digital assets through gameplay and participation.",
    categories: ["gaming_metaverse"],
    related: ["GameFi", "NFT Gaming", "In-Game Assets"]
  },
  {
    term: "GameFi",
    definition: "The combination of gaming and decentralized finance, creating financial incentives and earning opportunities within games.",
    categories: ["gaming_metaverse", "defi"],
    related: ["Play-to-Earn", "DeFi", "Gaming"]
  },
  {
    term: "Metaverse",
    definition: "A collective virtual shared space created by the convergence of virtually enhanced physical reality and physically persistent virtual space.",
    categories: ["gaming_metaverse"],
    related: ["Virtual Reality", "Digital Assets", "Virtual World"]
  },
  {
    term: "Virtual Land",
    definition: "Digital real estate within virtual worlds or metaverse platforms that can be owned, developed, and monetized.",
    categories: ["gaming_metaverse", "nfts_collectibles"],
    related: ["Metaverse", "NFT", "Digital Real Estate"]
  },
  {
    term: "In-Game Assets",
    definition: "Digital items, characters, or resources within games that can be owned, traded, or sold as NFTs on blockchain networks.",
    categories: ["gaming_metaverse", "nfts_collectibles"],
    related: ["NFT Gaming", "Digital Ownership", "Gaming"]
  }
];
