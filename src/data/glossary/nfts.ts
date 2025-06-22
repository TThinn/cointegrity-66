
import { GlossaryTerm } from "./types";

export const nftTerms: GlossaryTerm[] = [
  {
    term: "NFT",
    definition: "Non-Fungible Token - a unique digital asset that represents ownership of a specific item, artwork, or piece of content on a blockchain.",
    categories: ["nfts_collectibles"],
    related: ["ERC-721", "Metadata", "Digital Art"]
  },
  {
    term: "ERC-721",
    definition: "The Ethereum standard for creating non-fungible tokens, defining the basic functionality for NFTs.",
    categories: ["nfts_collectibles", "smart_contracts"],
    related: ["NFT", "ERC-1155", "Token Standard"]
  },
  {
    term: "ERC-1155",
    definition: "An Ethereum token standard that supports both fungible and non-fungible tokens in a single contract.",
    categories: ["nfts_collectibles", "smart_contracts"],
    related: ["NFT", "ERC-721", "Multi-Token"]
  },
  {
    term: "Metadata",
    definition: "Additional information about an NFT, including its properties, attributes, and links to associated media files.",
    categories: ["nfts_collectibles"],
    related: ["NFT", "IPFS", "JSON"]
  },
  {
    term: "Royalties",
    definition: "Ongoing payments to creators or rights holders when their NFTs are resold on secondary markets.",
    categories: ["nfts_collectibles"],
    related: ["NFT", "Creator Economy", "Secondary Market"]
  },
  {
    term: "Minting",
    definition: "The process of creating and issuing new tokens or NFTs on a blockchain network.",
    categories: ["nfts_collectibles", "tokenomics"],
    related: ["NFT", "Smart Contract", "Gas Fee"]
  },
  {
    term: "IPFS",
    definition: "InterPlanetary File System - a distributed file storage system often used to store NFT metadata and media.",
    categories: ["nfts_collectibles", "infrastructure_applications"],
    related: ["Metadata", "Decentralized Storage", "Content Addressing"]
  },
  {
    term: "OpenSea",
    definition: "One of the largest NFT marketplaces where users can buy, sell, and trade non-fungible tokens.",
    categories: ["nfts_collectibles"],
    related: ["NFT Marketplace", "Secondary Market", "Trading"]
  },
  {
    term: "Floor Price",
    definition: "The lowest price at which an NFT from a particular collection is currently listed for sale.",
    categories: ["nfts_collectibles"],
    related: ["NFT Collection", "Market Value", "Price Discovery"]
  },
  {
    term: "PFP",
    definition: "Profile Picture - a type of NFT designed to be used as a social media avatar or profile picture.",
    categories: ["nfts_collectibles"],
    related: ["Avatar", "Digital Identity", "Social Status"]
  },
  {
    term: "Generative Art",
    definition: "Art created through algorithmic processes, often used in NFT collections with programmatically generated traits.",
    categories: ["nfts_collectibles"],
    related: ["Algorithm", "Procedural Art", "Randomness"]
  },
  {
    term: "Rarity",
    definition: "The scarcity or uniqueness of particular traits or attributes within an NFT collection.",
    categories: ["nfts_collectibles"],
    related: ["Traits", "Scarcity", "Collectibility"]
  },
  {
    term: "Whitelist",
    definition: "A pre-approved list of addresses that have early or guaranteed access to mint NFTs from a collection.",
    categories: ["nfts_collectibles"],
    related: ["Allowlist", "Early Access", "Exclusive Sale"]
  },
  {
    term: "Reveal",
    definition: "The moment when the metadata and visual appearance of randomly generated NFTs are disclosed after minting.",
    categories: ["nfts_collectibles"],
    related: ["Mystery Box", "Random Generation", "Minting"]
  },
  {
    term: "Utility NFT",
    definition: "NFTs that provide additional benefits or functionality beyond just ownership, such as access to services or communities.",
    categories: ["nfts_collectibles"],
    related: ["Utility", "Access Token", "Membership"]
  },
  {
    term: "Diamond Hands",
    definition: "Holding onto NFTs or cryptocurrencies for a long period despite market volatility, showing strong conviction.",
    categories: ["nfts_collectibles"],
    related: ["HODL", "Long-term Investment", "Conviction"]
  },
  {
    term: "Paper Hands",
    definition: "Selling NFTs or cryptocurrencies quickly, often at the first sign of profit or loss.",
    categories: ["nfts_collectibles"],
    related: ["Quick Sale", "Weak Hands", "Short-term Trading"]
  },
  {
    term: "Burn",
    definition: "The permanent removal of NFTs from circulation by sending them to an unrecoverable address.",
    categories: ["nfts_collectibles"],
    related: ["Token Burn", "Supply Reduction", "Deflationary"]
  },
  {
    term: "Drop",
    definition: "The release or launch of a new NFT collection or individual NFTs for public sale.",
    categories: ["nfts_collectibles"],
    related: ["Launch", "Release", "Sale Event"]
  },
  {
    term: "Secondary Market",
    definition: "The marketplace where NFTs are traded after their initial sale, such as OpenSea or other platforms.",
    categories: ["nfts_collectibles"],
    related: ["Resale", "Trading", "Market Liquidity"]
  }
];
