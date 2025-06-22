
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
  },
  {
    term: "JSON-RPC",
    definition: "A remote procedure call protocol encoded in JSON, commonly used for blockchain node communication.",
    categories: ["infrastructure_applications"],
    related: ["RPC", "Blockchain Node", "Protocol"]
  },
  {
    term: "Webhook",
    definition: "A method for applications to provide real-time data to other applications when specific events occur.",
    categories: ["infrastructure_applications"],
    related: ["Real-time Data", "Event Notification", "Integration"]
  },
  {
    term: "Load Balancer",
    definition: "A device or software that distributes network traffic across multiple servers to ensure reliability and performance.",
    categories: ["infrastructure_applications"],
    related: ["Traffic Distribution", "Scalability", "High Availability"]
  },
  {
    term: "CDN",
    definition: "Content Delivery Network - a distributed network of servers that deliver web content efficiently based on geographic location.",
    categories: ["infrastructure_applications"],
    related: ["Content Distribution", "Performance", "Global Network"]
  },
  {
    term: "Database",
    definition: "Organized collections of structured information stored electronically, often used alongside blockchain for application data.",
    categories: ["infrastructure_applications"],
    related: ["Data Storage", "Information Management", "Query System"]
  },
  {
    term: "Microservices",
    definition: "An architectural approach where applications are built as a collection of small, independent services.",
    categories: ["infrastructure_applications"],
    related: ["Architecture", "Service-Oriented", "Modular Design"]
  },
  {
    term: "Container",
    definition: "Lightweight, portable packages that include everything needed to run an application, popular in blockchain development.",
    categories: ["infrastructure_applications"],
    related: ["Docker", "Deployment", "Portability"]
  },
  {
    term: "Kubernetes",
    definition: "An open-source platform for automating deployment, scaling, and management of containerized applications.",
    categories: ["infrastructure_applications"],
    related: ["Container Orchestration", "Scalability", "Automation"]
  },
  {
    term: "Cloud Computing",
    definition: "The delivery of computing services over the internet, including servers, storage, databases, and software.",
    categories: ["infrastructure_applications"],
    related: ["Remote Computing", "Scalability", "Service Delivery"]
  },
  {
    term: "Edge Computing",
    definition: "A distributed computing paradigm that brings computation and data storage closer to data sources.",
    categories: ["infrastructure_applications"],
    related: ["Distributed Computing", "Low Latency", "Local Processing"]
  },
  {
    term: "DevOps",
    definition: "A set of practices that combine software development and IT operations to shorten development cycles.",
    categories: ["infrastructure_applications"],
    related: ["Development", "Operations", "Automation"]
  }
];
