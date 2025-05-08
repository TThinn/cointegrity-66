
import React from "react";
import { 
  BUSINESS_STRUCTURED_DATA,
  FAQ_STRUCTURED_DATA,
  WEBSITE_STRUCTURED_DATA,
  SECTIONS_STRUCTURED_DATA
} from "./structuredData";

export const SectionStructuredData: React.FC = () => {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(BUSINESS_STRUCTURED_DATA)}</script>
      <script type="application/ld+json">{JSON.stringify(FAQ_STRUCTURED_DATA)}</script>
      <script type="application/ld+json">{JSON.stringify(WEBSITE_STRUCTURED_DATA)}</script>
      {SECTIONS_STRUCTURED_DATA.map((data, index) => (
        <script key={index} type="application/ld+json">{JSON.stringify(data)}</script>
      ))}
    </>
  );
};
