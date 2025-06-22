
import { GlossaryTerm } from "./types";

export const complianceTerms: GlossaryTerm[] = [
  {
    term: "Compliance",
    definition: "Adherence to laws, regulations, and industry standards in cryptocurrency and blockchain operations.",
    categories: ["compliance"],
    related: ["Regulation", "KYC", "AML"]
  },
  {
    term: "Travel Rule",
    definition: "A regulatory requirement for financial institutions to share customer information for transactions above certain thresholds.",
    categories: ["compliance", "regulatory_frameworks"],
    related: ["FATF", "AML", "Transaction Monitoring"]
  },
  {
    term: "Sanctions Screening",
    definition: "The process of checking transactions and customers against government sanctions lists to prevent prohibited activities.",
    categories: ["compliance"],
    related: ["AML", "OFAC", "Risk Management"]
  },
  {
    term: "Regulatory Sandbox",
    definition: "A framework that allows fintech companies to test innovative products in a controlled regulatory environment.",
    categories: ["compliance", "regulatory_frameworks"],
    related: ["Innovation", "Regulation", "Testing"]
  }
];
