
import { GlossaryTerm } from "./types";

export const aiTerms: GlossaryTerm[] = [
  {
    term: "Artificial Intelligence",
    definition: "Computer systems that can perform tasks typically requiring human intelligence, such as learning, reasoning, and problem-solving.",
    categories: ["ai_data"],
    related: ["Machine Learning", "Neural Network", "Deep Learning"]
  },
  {
    term: "Machine Learning",
    definition: "A subset of AI that enables computers to learn and improve from experience without being explicitly programmed.",
    categories: ["ai_data"],
    related: ["AI", "Algorithm", "Training Data"]
  },
  {
    term: "Large Language Model",
    definition: "An AI model trained on vast amounts of text data to understand and generate human-like language.",
    categories: ["ai_data"],
    related: ["GPT", "Natural Language Processing", "AI"]
  },
  {
    term: "Neural Network",
    definition: "A computing system inspired by biological neural networks, used in machine learning and AI applications.",
    categories: ["ai_data"],
    related: ["Deep Learning", "AI", "Algorithm"]
  },
  {
    term: "Smart Oracle",
    definition: "AI-enhanced blockchain oracles that provide more intelligent and context-aware data feeds to smart contracts.",
    categories: ["ai_data", "smart_contracts"],
    related: ["Oracle", "AI", "Smart Contract"]
  }
];
