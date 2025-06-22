
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
  }
];
