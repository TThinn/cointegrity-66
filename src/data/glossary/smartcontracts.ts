
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
    term: "Gas Fee",
    definition: "The cost paid to miners or validators for processing transactions and executing smart contracts on a blockchain.",
    categories: ["smart_contracts"],
    related: ["Gas", "Transaction Fee", "Network Congestion"]
  },
  {
    term: "Oracle",
    definition: "A service that provides external data to smart contracts, bridging the gap between blockchain and real-world information.",
    categories: ["smart_contracts"],
    related: ["Chainlink", "External Data", "Smart Contract"]
  },
  {
    term: "Vyper",
    definition: "A programming language for Ethereum smart contracts designed to be more secure and auditable than Solidity.",
    categories: ["smart_contracts"],
    related: ["Smart Contract", "Ethereum", "Security"]
  },
  {
    term: "ABI",
    definition: "Application Binary Interface - defines how to interact with smart contracts, specifying function signatures and data types.",
    categories: ["smart_contracts"],
    related: ["Smart Contract", "Interface", "Function Calls"]
  },
  {
    term: "Bytecode",
    definition: "The compiled version of smart contract code that runs on the Ethereum Virtual Machine.",
    categories: ["smart_contracts"],
    related: ["EVM", "Compilation", "Smart Contract"]
  },
  {
    term: "EVM",
    definition: "Ethereum Virtual Machine - the runtime environment for smart contracts on the Ethereum blockchain.",
    categories: ["smart_contracts"],
    related: ["Ethereum", "Bytecode", "Execution Environment"]
  },
  {
    term: "Proxy Contract",
    definition: "A smart contract pattern that allows for upgradeable contract logic while maintaining the same address.",
    categories: ["smart_contracts"],
    related: ["Upgradeable", "Contract Pattern", "Proxy Pattern"]
  },
  {
    term: "Multisig",
    definition: "Multi-signature wallet that requires multiple private keys to authorize transactions, commonly used for DAO treasury management.",
    categories: ["smart_contracts", "wallets_security"],
    related: ["Treasury", "Security", "Private Key"]
  },
  {
    term: "Time Lock",
    definition: "A smart contract mechanism that delays the execution of transactions for a predetermined period.",
    categories: ["smart_contracts"],
    related: ["Security", "Governance", "Delayed Execution"]
  },
  {
    term: "Contract Verification",
    definition: "The process of publishing and verifying smart contract source code on blockchain explorers for transparency.",
    categories: ["smart_contracts"],
    related: ["Transparency", "Audit", "Source Code"]
  },
  {
    term: "Reentrancy Attack",
    definition: "A smart contract vulnerability where external calls can recursively call back into the contract before the first execution completes.",
    categories: ["smart_contracts"],
    related: ["Security Vulnerability", "Smart Contract Audit", "Attack Vector"]
  },
  {
    term: "Factory Contract",
    definition: "A smart contract that creates and deploys other smart contracts according to predefined templates.",
    categories: ["smart_contracts"],
    related: ["Contract Creation", "Template", "Deployment"]
  },
  {
    term: "Event Log",
    definition: "A way for smart contracts to emit data that can be efficiently searched and monitored by external applications.",
    categories: ["smart_contracts"],
    related: ["Logging", "Monitoring", "Indexing"]
  },
  {
    term: "Fallback Function",
    definition: "A special function in a smart contract that executes when the contract receives Ether without any data.",
    categories: ["smart_contracts"],
    related: ["Solidity", "Contract Interaction", "Default Function"]
  },
  {
    term: "Interface",
    definition: "A contract that defines function signatures without implementation, used for standardization and interoperability.",
    categories: ["smart_contracts"],
    related: ["Standard", "Interoperability", "Abstract Contract"]
  },
  {
    term: "Library",
    definition: "Reusable code that can be deployed once and used by multiple smart contracts to save gas and reduce redundancy.",
    categories: ["smart_contracts"],
    related: ["Code Reuse", "Gas Optimization", "Modular Programming"]
  },
  {
    term: "Modifier",
    definition: "Code that can be attached to functions in Solidity to change their behavior, often used for access control.",
    categories: ["smart_contracts"],
    related: ["Solidity", "Access Control", "Function Modifier"]
  }
];
