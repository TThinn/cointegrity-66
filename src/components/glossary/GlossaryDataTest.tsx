
import React, { useEffect, useState } from 'react';
import { glossaryTerms } from "@/data/glossaryTerms";

/**
 * This is a diagnostic component to verify the glossary data source.
 * It can be temporarily added to the GlossaryPage to check what data is being loaded.
 */
export const GlossaryDataTest: React.FC = () => {
  const [dataSnapshot, setDataSnapshot] = useState<{
    length: number;
    sampleTerms: string[];
    modulePath: string;
  }>({
    length: 0,
    sampleTerms: [],
    modulePath: ''
  });

  useEffect(() => {
    try {
      // Create a snapshot of the current data
      const sampleTerms = glossaryTerms.slice(0, 5).map(term => term.term);
      
      // Try to get module information
      let modulePath = "Unknown";
      try {
        // This is a hack to try to get module information
        const moduleInfo = Object.keys(import.meta);
        if (moduleInfo.length > 0) {
          modulePath = moduleInfo.join(', ');
        }
      } catch (e) {
        console.error("Error getting module info:", e);
      }
      
      setDataSnapshot({
        length: glossaryTerms.length,
        sampleTerms,
        modulePath
      });
      
      console.log("DIAGNOSTIC TEST: GlossaryTerms data details", {
        length: glossaryTerms.length,
        sampleTerms,
        firstFewItems: glossaryTerms.slice(0, 3)
      });
    } catch (error) {
      console.error("Error in GlossaryDataTest:", error);
    }
  }, []);

  return (
    <div className="bg-blue-50 p-4 rounded-md mb-6">
      <h3 className="font-bold text-blue-800">Glossary Data Diagnostic</h3>
      <div className="text-sm mt-2">
        <p>Terms count: <strong>{dataSnapshot.length}</strong></p>
        <p>Sample terms:</p>
        <ul className="list-disc pl-5 mt-1">
          {dataSnapshot.sampleTerms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-gray-500">Module path info: {dataSnapshot.modulePath}</p>
      </div>
    </div>
  );
};
