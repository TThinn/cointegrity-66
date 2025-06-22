
import { GlossaryTerm } from "./types";

export const layer2Terms: GlossaryTerm[] = [
  {
    term: "Layer 2",
    definition: "Scaling solutions built on top of existing blockchains to improve transaction speed and reduce costs.",
    categories: ["layer2_solutions"],
    related: ["Scaling", "Rollups", "State Channels"]
  },
  {
    term: "Rollups",
    definition: "Layer 2 scaling solutions that execute transactions off-chain but post transaction data to the main chain.",
    categories: ["layer2_solutions"],
    related: ["Optimistic Rollups", "ZK-Rollups", "Layer 2"]
  },
  {
    term: "State Channels",
    definition: "Layer 2 solutions that allow parties to transact off-chain while maintaining security guarantees.",
    categories: ["layer2_solutions"],
    related: ["Payment Channels", "Lightning Network", "Off-Chain"]
  },
  {
    term: "Sidechain",
    definition: "An independent blockchain that runs parallel to a main blockchain and is connected via a two-way bridge.",
    categories: ["layer2_solutions"],
    related: ["Bridge", "Parallel Chain", "Interoperability"]
  }
];
