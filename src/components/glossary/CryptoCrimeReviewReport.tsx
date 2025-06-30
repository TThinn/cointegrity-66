
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { processAllTermsForCryptoCrime, CryptoCrimeReviewResult } from './utils/batchCryptoCrimeReview';

export const CryptoCrimeReviewReport: React.FC = () => {
  const [reviewResults, setReviewResults] = useState<{
    results: CryptoCrimeReviewResult[];
    summary: any;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'updates_only' | 'high_confidence'>('updates_only');

  const runReview = () => {
    setIsProcessing(true);
    console.log('🚀 Starting comprehensive crypto crime categorization review...');
    
    setTimeout(() => {
      const results = processAllTermsForCryptoCrime();
      setReviewResults(results);
      setIsProcessing(false);
      console.log('✅ Review completed!');
    }, 100);
  };

  const getFilteredResults = (): CryptoCrimeReviewResult[] => {
    if (!reviewResults) return [];
    
    switch (filter) {
      case 'updates_only':
        return reviewResults.results.filter(r => r.shouldAddCryptoCrime);
      case 'high_confidence':
        return reviewResults.results.filter(r => r.shouldAddCryptoCrime && r.confidence === 'high');
      default:
        return reviewResults.results;
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Crypto Crime Category Review</span>
          <Button 
            onClick={runReview} 
            disabled={isProcessing}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isProcessing ? 'Processing...' : 'Run Full Review'}
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {isProcessing && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p>Processing 1439 glossary terms for crypto crime categorization...</p>
          </div>
        )}

        {reviewResults && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-purple-600">
                    {reviewResults.summary.totalTerms}
                  </div>
                  <p className="text-sm text-gray-600">Total Terms</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-orange-600">
                    {reviewResults.summary.termsToUpdate}
                  </div>
                  <p className="text-sm text-gray-600">Need Updates</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-green-600">
                    {reviewResults.summary.highConfidenceUpdates}
                  </div>
                  <p className="text-sm text-gray-600">High Confidence</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-yellow-600">
                    {reviewResults.summary.mediumConfidenceUpdates}
                  </div>
                  <p className="text-sm text-gray-600">Medium Confidence</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-red-600">
                    {reviewResults.summary.lowConfidenceUpdates}
                  </div>
                  <p className="text-sm text-gray-600">Low Confidence</p>
                </CardContent>
              </Card>
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All Terms ({reviewResults.results.length})
              </Button>
              <Button
                variant={filter === 'updates_only' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('updates_only')}
              >
                Updates Only ({reviewResults.results.filter(r => r.shouldAddCryptoCrime).length})
              </Button>
              <Button
                variant={filter === 'high_confidence' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('high_confidence')}
              >
                High Confidence ({reviewResults.results.filter(r => r.shouldAddCryptoCrime && r.confidence === 'high').length})
              </Button>
            </div>

            <Separator />

            {/* Results list */}
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {getFilteredResults().map((result, index) => (
                  <Card key={index} className={result.shouldAddCryptoCrime ? 'border-orange-200 bg-orange-50' : ''}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{result.term}</h4>
                        <div className="flex gap-2">
                          <Badge variant={
                            result.confidence === 'high' ? 'default' :
                            result.confidence === 'medium' ? 'secondary' : 'outline'
                          }>
                            {result.confidence}
                          </Badge>
                          {result.shouldAddCryptoCrime && (
                            <Badge variant="destructive">
                              Add Crypto Crime
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <div>
                          <strong>Original:</strong> {result.originalCategories.join(', ')}
                        </div>
                        {result.shouldAddCryptoCrime && (
                          <div>
                            <strong>New:</strong> {result.newCategories.join(', ')}
                          </div>
                        )}
                        <div className="text-gray-600">
                          <strong>Reason:</strong> {result.reason}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
