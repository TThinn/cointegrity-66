
import { GlossaryTerm } from "./types";

export const infrastructureTerms: GlossaryTerm[] = [
  {
    term: "API",
    definition: "Application Programming Interface - a set of protocols and tools for building software applications and enabling communication between different systems.",
    categories: ["infrastructure_applications"],
    related: ["Integration", "Development", "Interface"]
  },
  {
    term: "SDK",
    definition: "Software Development Kit - a collection of software development tools for creating applications for specific platforms.",
    categories: ["infrastructure_applications"],
    related: ["Development", "Tools", "Framework"]
  },
  {
    term: "RPC",
    definition: "Remote Procedure Call - a protocol that allows a program to execute procedures on a remote server.",
    categories: ["infrastructure_applications"],
    related: ["API", "Blockchain Node", "Communication"]
  },
  {
    term: "GraphQL",
    definition: "A query language and runtime for APIs that allows clients to request specific data efficiently.",
    categories: ["infrastructure_applications"],
    related: ["API", "Data Query", "Development"]
  }
];
