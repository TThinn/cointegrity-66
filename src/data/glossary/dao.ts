
import { GlossaryTerm } from "./types";

export const daoTerms: GlossaryTerm[] = [
  {
    term: "DAO",
    definition: "Decentralized Autonomous Organization - an organization governed by smart contracts and community voting rather than traditional management structures.",
    categories: ["dao"],
    related: ["Governance Token", "Proposal", "Treasury"]
  },
  {
    term: "Governance Token",
    definition: "A cryptocurrency that gives holders voting rights in protocol decisions and proposals within a DAO or DeFi platform.",
    categories: ["dao", "tokenomics"],
    related: ["DAO", "Voting Power", "Proposal"]
  },
  {
    term: "Treasury",
    definition: "The collective funds owned and managed by a DAO, typically used for development, operations, and community initiatives.",
    categories: ["dao"],
    related: ["DAO", "Governance", "Multisig"]
  },
  {
    term: "Proposal",
    definition: "A formal suggestion for changes or actions that token holders can vote on within a DAO governance system.",
    categories: ["dao"],
    related: ["DAO", "Governance Token", "Voting"]
  },
  {
    term: "Voting Power",
    definition: "The influence a token holder has in DAO governance decisions, typically proportional to their token holdings.",
    categories: ["dao"],
    related: ["Governance Token", "Voting Weight", "Democratic Process"]
  },
  {
    term: "Quorum",
    definition: "The minimum number of votes required for a DAO proposal to be considered valid and executable.",
    categories: ["dao"],
    related: ["Minimum Threshold", "Governance", "Proposal Validity"]
  },
  {
    term: "Snapshot",
    definition: "A popular off-chain governance platform used by DAOs to conduct token-weighted voting without gas fees.",
    categories: ["dao"],
    related: ["Off-chain Voting", "Gas-free", "Governance Platform"]
  },
  {
    term: "Delegated Voting",
    definition: "A system where token holders can delegate their voting power to other community members to vote on their behalf.",
    categories: ["dao"],
    related: ["Vote Delegation", "Representative Voting", "Governance"]
  },
  {
    term: "Governance Attack",
    definition: "An attempt to manipulate DAO governance by acquiring a large number of governance tokens to control voting outcomes.",
    categories: ["dao"],
    related: ["Hostile Takeover", "Token Accumulation", "Governance Risk"]
  },
  {
    term: "Time Lock",
    definition: "A delay mechanism in DAO governance that prevents immediate execution of proposals, allowing time for community review.",
    categories: ["dao", "smart_contracts"],
    related: ["Execution Delay", "Security Measure", "Governance Safety"]
  },
  {
    term: "Multi-sig Treasury",
    definition: "A DAO treasury managed by a multi-signature wallet requiring multiple key holders to approve transactions.",
    categories: ["dao", "wallets_security"],
    related: ["Treasury", "Multi-signature", "Security"]
  },
  {
    term: "Working Group",
    definition: "A subgroup within a DAO focused on specific tasks or areas of expertise to execute DAO initiatives.",
    categories: ["dao"],
    related: ["Subcommittee", "Specialized Team", "Task Force"]
  },
  {
    term: "Governance Forum",
    definition: "An online platform where DAO members discuss proposals, share ideas, and coordinate governance activities.",
    categories: ["dao"],
    related: ["Discussion Platform", "Community Forum", "Governance Communication"]
  },
  {
    term: "Rage Quit",
    definition: "A mechanism allowing DAO members to exit the organization and retrieve their proportional share of treasury assets.",
    categories: ["dao"],
    related: ["Exit Mechanism", "Treasury Withdrawal", "Member Rights"]
  },
  {
    term: "Governance Minimization",
    definition: "The process of reducing the need for governance decisions by making protocols more autonomous and self-governing.",
    categories: ["dao"],
    related: ["Automation", "Reduced Governance", "Protocol Maturity"]
  }
];
