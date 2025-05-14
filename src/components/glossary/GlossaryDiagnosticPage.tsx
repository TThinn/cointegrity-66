
import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGlossaryTermsDebug } from "./useGlossaryTermsDebug";
import { glossaryTerms } from "@/data/glossaryTerms";
import { glossaryTermsNew } from "@/data/glossaryTermsNew";
import { toast } from "sonner";

export const GlossaryDiagnosticPage: React.FC = () => {
  const { 
    filteredTerms, 
    groupedTerms, 
    letters,
    totalTermsCount 
  } = useGlossaryTermsDebug("", "all");

  useEffect(() => {
    console.log("🔧 DIAGNOSTIC PAGE: Component mounted");
    console.log("🔧 DIAGNOSTIC PAGE: Direct glossaryTerms import count:", glossaryTerms.length);
    console.log("🔧 DIAGNOSTIC PAGE: Direct glossaryTermsNew import count:", glossaryTermsNew.length);
    
    // Check for module system issues
    console.log("🔧 DIAGNOSTIC PAGE: Module system check");
    try {
      const moduleInfo = Object.keys(import.meta);
      console.log("🔧 DIAGNOSTIC PAGE: Module info available:", moduleInfo);
    } catch (e) {
      console.log("🔧 DIAGNOSTIC PAGE: Module info error:", e);
    }

    // Test for circular references or other serialization issues
    try {
      const serializedTerms = JSON.stringify(glossaryTerms);
      console.log("🔧 DIAGNOSTIC PAGE: Original terms can be serialized, length:", serializedTerms.length);
    } catch (e) {
      console.error("🔧 DIAGNOSTIC PAGE: Failed to serialize original terms:", e);
    }
    
    try {
      const serializedNewTerms = JSON.stringify(glossaryTermsNew);
      console.log("🔧 DIAGNOSTIC PAGE: New terms can be serialized, length:", serializedNewTerms.length);
    } catch (e) {
      console.error("🔧 DIAGNOSTIC PAGE: Failed to serialize new terms:", e);
    }
  }, []);

  // Force a reload to clear any potential module cache
  const forceReload = () => {
    toast.info("Forcing module reload...");
    window.location.reload();
  };

  // Force a full page refresh with cache clearing
  const forceCacheClear = () => {
    toast.info("Clearing cache and reloading...");
    window.location.href = window.location.href + "?nocache=" + new Date().getTime();
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Glossary Data Diagnostic Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-blue-50">
              <h3 className="text-lg font-bold">Original Data Source</h3>
              <p className="text-2xl font-bold">{glossaryTerms.length} Terms</p>
              {glossaryTerms.length > 0 && (
                <div className="mt-2">
                  <p className="font-bold">First term: </p>
                  <p>{glossaryTerms[0].term}</p>
                </div>
              )}
            </Card>
            
            <Card className="p-4 bg-green-50">
              <h3 className="text-lg font-bold">New Test Data Source</h3>
              <p className="text-2xl font-bold">{glossaryTermsNew.length} Terms</p>
              {glossaryTermsNew.length > 0 && (
                <div className="mt-2">
                  <p className="font-bold">First term: </p>
                  <p>{glossaryTermsNew[0].term}</p>
                </div>
              )}
            </Card>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Actions</h3>
            <div className="flex gap-2">
              <Button onClick={forceReload}>Force Reload</Button>
              <Button onClick={forceCacheClear} variant="destructive">Clear Cache & Reload</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">Debug Hook Results</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Total terms count: <span className="font-bold">{totalTermsCount}</span></li>
              <li>Filtered terms count: <span className="font-bold">{filteredTerms.length}</span></li>
              <li>Letters with terms: <span className="font-bold">{letters.join(', ')}</span></li>
              <li>First letter group count: {letters[0] && groupedTerms[letters[0]] ? 
                <span className="font-bold">{groupedTerms[letters[0]].length} terms</span> : 
                'None'}
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
