
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGlossaryTermsDebug } from "./useGlossaryTermsDebug";
import { glossaryTerms } from "@/data/glossaryTerms";
import { glossaryTermsNew } from "@/data/glossaryTermsNew";
import { glossaryTerms as glossaryTermsTemp } from "@/data/temp";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const GlossaryDiagnosticPage: React.FC = () => {
  const { 
    filteredTerms, 
    groupedTerms, 
    letters,
    totalTermsCount 
  } = useGlossaryTermsDebug("", "all");
  
  const [activeTab, setActiveTab] = useState<string>("summary");
  const [fileContents, setFileContents] = useState<{
    original: string;
    new: string;
    temp: string;
  }>({
    original: "",
    new: "",
    temp: ""
  });
  
  // Get sample content from each file for comparison
  useEffect(() => {
    try {
      // Safe stringification helper
      const safeStringify = (obj: any, label: string) => {
        try {
          return JSON.stringify(obj.slice(0, 3), null, 2);
        } catch (e) {
          console.error(`🔧 Failed to stringify ${label}:`, e);
          return `Error stringifying ${label}`;
        }
      };
      
      setFileContents({
        original: safeStringify(glossaryTerms, "original"),
        new: safeStringify(glossaryTermsNew, "new"),
        temp: safeStringify(glossaryTermsTemp, "temp")
      });
    } catch (e) {
      console.error("🔧 Error accessing file contents:", e);
    }
  }, []);

  useEffect(() => {
    console.log("🔧 DIAGNOSTIC PAGE: Component mounted");
    console.log("🔧 DIAGNOSTIC PAGE: Direct glossaryTerms import count:", glossaryTerms.length);
    console.log("🔧 DIAGNOSTIC PAGE: Direct glossaryTermsNew import count:", glossaryTermsNew.length);
    console.log("🔧 DIAGNOSTIC PAGE: Direct glossaryTermsTemp import count:", glossaryTermsTemp.length);
    
    // Check for object reference equality
    console.log("🔧 DIAGNOSTIC PAGE: Are glossaryTerms and glossaryTermsNew the same object?", 
      glossaryTerms === glossaryTermsNew);
    console.log("🔧 DIAGNOSTIC PAGE: Are glossaryTerms and glossaryTermsTemp the same object?", 
      glossaryTerms === glossaryTermsTemp);
    
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
    
    try {
      const serializedTempTerms = JSON.stringify(glossaryTermsTemp);
      console.log("🔧 DIAGNOSTIC PAGE: Temp terms can be serialized, length:", serializedTempTerms.length);
    } catch (e) {
      console.error("🔧 DIAGNOSTIC PAGE: Failed to serialize temp terms:", e);
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
  
  // Import a different data source as the main glossary terms
  const importDataSource = (source: "new" | "temp") => {
    localStorage.setItem("glossary_data_source", source);
    toast.info(`Switching to ${source === "new" ? "new" : "temp"} data source...`);
    window.location.reload();
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Glossary Data Diagnostic Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="samples">Data Samples</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 bg-blue-50">
                  <h3 className="text-lg font-bold">Original Data Source</h3>
                  <p className="text-2xl font-bold">{glossaryTerms.length} Terms</p>
                  {glossaryTerms.length > 0 && (
                    <div className="mt-2">
                      <p className="font-bold">First term: </p>
                      <p>{glossaryTerms[0]?.term || "N/A"}</p>
                    </div>
                  )}
                  {glossaryTerms.length === 23 && (
                    <p className="text-xs text-red-600 mt-2">
                      Expected 335+ terms but found only 23. Possible data loading issue.
                    </p>
                  )}
                </Card>
                
                <Card className="p-4 bg-green-50">
                  <h3 className="text-lg font-bold">New Test Data Source</h3>
                  <p className="text-2xl font-bold">{glossaryTermsNew.length} Terms</p>
                  {glossaryTermsNew.length > 0 && (
                    <div className="mt-2">
                      <p className="font-bold">First term: </p>
                      <p>{glossaryTermsNew[0]?.term || "N/A"}</p>
                    </div>
                  )}
                </Card>
                
                <Card className="p-4 bg-amber-50">
                  <h3 className="text-lg font-bold">Temp Data Source</h3>
                  <p className="text-2xl font-bold">{glossaryTermsTemp.length} Terms</p>
                  {glossaryTermsTemp.length > 0 && (
                    <div className="mt-2">
                      <p className="font-bold">First term: </p>
                      <p>{glossaryTermsTemp[0]?.term || "N/A"}</p>
                    </div>
                  )}
                </Card>
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
          </TabsContent>
          
          <TabsContent value="samples">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Original Data Sample</h3>
                <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto max-h-40">
                  {fileContents.original}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">New Data Sample</h3>
                <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto max-h-40">
                  {fileContents.new}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Temp Data Sample</h3>
                <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto max-h-40">
                  {fileContents.temp}
                </pre>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="actions">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Cache Actions</h3>
                <div className="flex gap-2 flex-wrap">
                  <Button onClick={forceReload}>Force Reload</Button>
                  <Button onClick={forceCacheClear} variant="destructive">Clear Cache & Reload</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Data Source Actions</h3>
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    variant="outline" 
                    onClick={() => importDataSource("new")}
                  >
                    Use New Data
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => importDataSource("temp")}
                  >
                    Use Temp Data
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  This will reload the page and use the selected data source as the main glossary terms.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
