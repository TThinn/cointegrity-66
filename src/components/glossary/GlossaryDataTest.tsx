
import React, { useEffect, useState } from 'react';
import { glossaryTerms } from "@/data/glossaryTerms";

/**
 * This is a diagnostic component to verify the glossary data source.
 * It can be temporarily added to the GlossaryPage to check what data is being loaded.
 */
export const GlossaryDataTest: React.FC = () => {
  const [dataSnapshot, setDataSnapshot] = useState<{
    original: { length: number; sampleTerms: string[] };
    modulePath: string;
  }>({
    original: { length: 0, sampleTerms: [] },
    modulePath: ''
  });

  useEffect(() => {
    try {
      // Create snapshots of all data sources
      const originalSampleTerms = glossaryTerms.slice(0, 5).map(term => term.term);
      
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
        original: {
          length: glossaryTerms.length,
          sampleTerms: originalSampleTerms
        },
        modulePath
      });
      
      // Run detailed comparison of data sources
      console.log("DIAGNOSTIC TEST: Data source comparison", {
        originalLength: glossaryTerms.length
      });
    } catch (error) {
      console.error("Error in GlossaryDataTest:", error);
    }
  }, []);

  return (
    <div className="bg-blue-50 p-4 rounded-md mb-6">
      <h3 className="font-bold text-blue-800">Glossary Data Diagnostic</h3>
      <div className="grid grid-cols-1 gap-4 mt-2">
        <div className="border-r pr-2">
          <h4 className="font-semibold">Original Source</h4>
          <p className="text-sm">Length: <strong>{dataSnapshot.original.length}</strong></p>
          <div className="text-xs mt-1">
            <p>Sample terms:</p>
            <ul className="list-disc pl-5">
              {dataSnapshot.original.sampleTerms.map((term, index) => (
                <li key={`original-${index}`}>{term}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <p className="mt-2 text-xs text-gray-500">Module path info: {dataSnapshot.modulePath}</p>
    </div>
  );
};
