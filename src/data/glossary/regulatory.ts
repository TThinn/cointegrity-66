
import { GlossaryTerm } from "./types";

export const regulatoryTerms: GlossaryTerm[] = [
  {
    term: "MiCA",
    definition: "Markets in Crypto-Assets - the European Union's comprehensive regulatory framework for cryptocurrency and digital asset markets.",
    categories: ["regulatory_frameworks"],
    related: ["CASP", "EU Regulation", "Compliance"]
  },
  {
    term: "CASP",
    definition: "Crypto-Asset Service Provider - entities that provide services related to crypto-assets under the MiCA regulation.",
    categories: ["regulatory_frameworks", "compliance"],
    related: ["MiCA", "Licensing", "Authorization"]
  },
  {
    term: "KYC",
    definition: "Know Your Customer - the process of verifying customer identity to prevent fraud, money laundering, and other illegal activities.",
    categories: ["compliance", "regulatory_frameworks"],
    related: ["AML", "Identity Verification", "Due Diligence"]
  },
  {
    term: "AML",
    definition: "Anti-Money Laundering - laws and regulations designed to prevent criminals from disguising illegally obtained funds as legitimate income.",
    categories: ["compliance", "regulatory_frameworks"],
    related: ["KYC", "FATF", "Compliance"]
  },
  {
    term: "FATF",
    definition: "Financial Action Task Force - an international organization that develops policies to combat money laundering and terrorist financing.",
    categories: ["regulatory_frameworks"],
    related: ["AML", "Travel Rule", "International Standards"]
  },
  {
    term: "SEC",
    definition: "Securities and Exchange Commission - the U.S. federal agency that enforces securities laws and regulates the securities industry.",
    categories: ["regulatory_frameworks"],
    related: ["Securities", "U.S. Regulation", "Enforcement"]
  },
  {
    term: "CFTC",
    definition: "Commodity Futures Trading Commission - the U.S. federal agency that regulates commodity futures and options markets.",
    categories: ["regulatory_frameworks"],
    related: ["Derivatives", "Futures", "U.S. Regulation"]
  },
  {
    term: "FinCEN",
    definition: "Financial Crimes Enforcement Network - the U.S. financial intelligence unit that combats domestic and international money laundering.",
    categories: ["regulatory_frameworks"],
    related: ["AML", "Financial Intelligence", "U.S. Regulation"]
  },
  {
    term: "GDPR",
    definition: "General Data Protection Regulation - EU regulation that governs data protection and privacy for individuals within the European Union.",
    categories: ["regulatory_frameworks"],
    related: ["Data Protection", "Privacy", "EU Regulation"]
  },
  {
    term: "BSA",
    definition: "Bank Secrecy Act - U.S. legislation requiring financial institutions to assist government agencies in detecting money laundering.",
    categories: ["regulatory_frameworks"],
    related: ["AML", "Financial Institutions", "Reporting Requirements"]
  },
  {
    term: "AMLD5",
    definition: "Fifth Anti-Money Laundering Directive - EU legislation extending AML requirements to cryptocurrency exchanges and wallet providers.",
    categories: ["regulatory_frameworks"],
    related: ["AML", "EU Regulation", "Crypto Regulation"]
  },
  {
    term: "ESMA",
    definition: "European Securities and Markets Authority - EU financial regulatory institution that ensures investor protection and stable markets.",
    categories: ["regulatory_frameworks"],
    related: ["EU Regulation", "Securities", "Market Supervision"]
  },
  {
    term: "FINRA",
    definition: "Financial Industry Regulatory Authority - a self-regulatory organization that regulates member brokerage firms and exchange markets.",
    categories: ["regulatory_frameworks"],
    related: ["Securities", "Brokerage", "Self-Regulation"]
  },
  {
    term: "OCC",
    definition: "Office of the Comptroller of the Currency - U.S. federal agency that regulates and supervises national banks.",
    categories: ["regulatory_frameworks"],
    related: ["Banking", "Federal Regulation", "National Banks"]
  },
  {
    term: "NYSDFS",
    definition: "New York State Department of Financial Services - state regulator that oversees financial services and products in New York.",
    categories: ["regulatory_frameworks"],
    related: ["BitLicense", "State Regulation", "New York"]
  },
  {
    term: "BitLicense",
    definition: "A business license for conducting virtual currency business activity issued by the New York State Department of Financial Services.",
    categories: ["regulatory_frameworks"],
    related: ["NYSDFS", "State License", "Virtual Currency"]
  },
  {
    term: "Howey Test",
    definition: "A test used by U.S. courts to determine whether a transaction qualifies as an investment contract and thus a security.",
    categories: ["regulatory_frameworks"],
    related: ["Securities", "Investment Contract", "Legal Test"]
  },
  {
    term: "Safe Harbor",
    definition: "Legal provisions that reduce or eliminate liability under specific circumstances if certain conditions are met.",
    categories: ["regulatory_frameworks"],
    related: ["Legal Protection", "Compliance", "Liability"]
  },
  {
    term: "Regulatory Sandbox",
    definition: "A framework that allows fintech companies to test innovative products in a controlled regulatory environment.",
    categories: ["regulatory_frameworks", "compliance"],
    related: ["Innovation", "Testing Environment", "Controlled Framework"]
  },
  {
    term: "Digital Asset",
    definition: "A broad term for digitally native assets, including cryptocurrencies, tokens, and other blockchain-based assets.",
    categories: ["regulatory_frameworks"],
    related: ["Cryptocurrency", "Token", "Blockchain Asset"]
  }
];
