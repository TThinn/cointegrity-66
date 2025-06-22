
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
  }
];
