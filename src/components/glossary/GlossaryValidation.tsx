
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";
import { GlossaryTerm } from "./types";

interface ValidationResult {
  totalTerms: number;
  termsWithQuestions: number;
  termsWithTransformedDefinitions: number;
  validationIssues: string[];
  sampleTransformations: Array<{
    term: string;
    originalDefinition: string;
    transformedDefinition: string;
    question: string;
  }>;
}

interface GlossaryValidationProps {
  terms: GlossaryTerm[];
  originalTermsCount: number;
}

export const GlossaryValidation: React.FC<GlossaryValidationProps> = ({
  terms,
  originalTermsCount
}) => {
  const [validation, setValidation] = useState<ValidationResult | null>(null);

  useEffect(() => {
    if (terms.length === 0) return;

    const validateTerms = () => {
      const issues: string[] = [];
      const sampleTransformations: ValidationResult['sampleTransformations'] = [];
      
      let termsWithQuestions = 0;
      let termsWithTransformedDefinitions = 0;

      // Check data integrity
      if (terms.length !== originalTermsCount) {
        issues.push(`Term count mismatch: Expected ${originalTermsCount}, got ${terms.length}`);
      }

      // Validate transformations
      terms.forEach((term, index) => {
        if (term.question) {
          termsWithQuestions++;
        }

        // Check if definition was transformed (basic heuristic)
        if (term.definition.toLowerCase().includes(term.term.toLowerCase())) {
          termsWithTransformedDefinitions++;
        }

        // Collect sample transformations (first 5)
        if (index < 5 && term.question) {
          sampleTransformations.push({
            term: term.term,
            originalDefinition: "N/A", // We don't have access to original here
            transformedDefinition: term.definition,
            question: term.question
          });
        }

        // Validate required fields
        if (!term.term || !term.definition) {
          issues.push(`Term at index ${index} missing required fields`);
        }

        if (!term.categories || term.categories.length === 0) {
          issues.push(`Term "${term.term}" has no categories`);
        }
      });

      setValidation({
        totalTerms: terms.length,
        termsWithQuestions,
        termsWithTransformedDefinitions,
        validationIssues: issues,
        sampleTransformations
      });
    };

    validateTerms();
  }, [terms, originalTermsCount]);

  if (!validation) {
    return <div className="text-white/60">Validating data...</div>;
  }

  const successRate = Math.round((validation.termsWithQuestions / validation.totalTerms) * 100);

  return (
    <Card className="mb-6 bg-white/5 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Info className="h-5 w-5" />
          Data Transformation Validation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 p-3 rounded">
            <div className="text-2xl font-bold text-white">{validation.totalTerms}</div>
            <div className="text-sm text-white/60">Total Terms</div>
          </div>
          <div className="bg-white/5 p-3 rounded">
            <div className="text-2xl font-bold text-green-400">{validation.termsWithQuestions}</div>
            <div className="text-sm text-white/60">Terms with Questions</div>
          </div>
          <div className="bg-white/5 p-3 rounded">
            <div className="text-2xl font-bold text-blue-400">{successRate}%</div>
            <div className="text-sm text-white/60">Success Rate</div>
          </div>
        </div>

        {/* Validation Status */}
        <div className="flex items-center gap-2">
          {validation.validationIssues.length === 0 ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-green-400">All validations passed</span>
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400">{validation.validationIssues.length} validation issues</span>
            </>
          )}
        </div>

        {/* Issues */}
        {validation.validationIssues.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">Issues:</h4>
            {validation.validationIssues.map((issue, index) => (
              <div key={index} className="text-sm text-red-400 bg-red-900/20 p-2 rounded">
                {issue}
              </div>
            ))}
          </div>
        )}

        {/* Sample Transformations */}
        {validation.sampleTransformations.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">Sample Transformations:</h4>
            {validation.sampleTransformations.map((sample, index) => (
              <div key={index} className="bg-white/5 p-3 rounded text-sm">
                <div className="font-semibold text-white mb-2">{sample.term}</div>
                <div className="mb-1">
                  <Badge variant="outline" className="text-xs mr-2 bg-purple-900/30 border-purple-400 text-purple-200">
                    Question
                  </Badge>
                  <span className="text-white/80">{sample.question}</span>
                </div>
                <div>
                  <Badge variant="outline" className="text-xs mr-2 bg-blue-900/30 border-blue-400 text-blue-200">
                    Definition
                  </Badge>
                  <span className="text-white/70">{sample.transformedDefinition.substring(0, 100)}...</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
