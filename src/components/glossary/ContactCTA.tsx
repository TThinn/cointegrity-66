
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const ContactCTA: React.FC = () => {
  return (
    <Card className="overflow-hidden border-primary/20 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardContent className="p-6 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-2">Need expert guidance?</h3>
          <p className="mb-6 text-muted-foreground">
            Our team of Web3 and blockchain consultants can help your business navigate
            the complex technological landscape.
          </p>
          <div>
            <Button asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </CardContent>
        
        <div className="bg-blue-100 dark:bg-blue-950">
          <AspectRatio ratio={16/9}>
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="text-center">
                <p className="font-semibold">Cointegrity</p>
                <p className="text-sm">Web3 & Blockchain Consulting</p>
              </div>
            </div>
          </AspectRatio>
        </div>
      </div>
    </Card>
  );
};
