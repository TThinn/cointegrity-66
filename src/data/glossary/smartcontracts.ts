
import { GlossaryTerm } from "./types";

export const smartContractTerms: GlossaryTerm[] = [
  {
    term: "Smart Contract",
    definition: "Self-executing contracts with terms directly written into code, automatically enforcing agreements without intermediaries.",
    categories: ["smart_contracts"],
    related: ["Ethereum", "Solidity", "dApp"]
  },
  {
    term: "Solidity",
    definition: "A programming language designed for developing smart contracts on the Ethereum blockchain.",
    categories: ["smart_contracts"],
    related: ["Smart Contract", "Ethereum", "Programming"]
  },
  {
    term: "Gas",
    definition: "The fee required to execute transactions or run smart contracts on the Ethereum network.",
    categories: ["smart_contracts"],
    related: ["Gas Fee", "Ethereum", "Transaction Cost"]
  },
  {
    term: "Oracle",
    definition: "A service that provides external data to smart contracts, bridging the gap between blockchain and real-world information.",
    categories: ["smart_contracts"],
    related: ["Chainlink", "External Data", "Smart Contract"]
  }
];
