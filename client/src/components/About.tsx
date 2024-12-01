import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SnapshotData {
  name: string;
  height: string;
  date: string;
  size: string;
  project: string;
  pic: string;
  code: string;
}

export default function About() {
  const { toast } = useToast();
  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});

  const testnetUrl = import.meta.env.VITE_TESTNET_JSON_URL;
  console.log('Testnet URL:', testnetUrl);

  const { data: snapshots, isLoading, error } = useQuery({
    queryKey: ["testnet-snapshots"],
    queryFn: async () => {
      if (!testnetUrl) {
        throw new Error('Testnet URL is not configured');
      }

      try {
        const response = await axios.get<SnapshotData[]>(testnetUrl, {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.data) {
          throw new Error('No data received from API');
        }
        
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Network Error:', error.message);
          throw new Error(`Failed to fetch testnet data: ${error.message}`);
        }
        throw error;
      }
    },
    retry: false,
  });

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast({
      description: "Command copied to clipboard",
    });
  };

  const toggleDetails = (projectName: string) => {
    setOpenDetails(prev => ({
      ...prev,
      [projectName]: !prev[projectName],
    }));
  };

  if (error) {
    console.error('Error details:', error);
    return (
      <section id="testnet" className="py-20 bg-gradient-to-b from-background to-muted/50">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive text-destructive">
              <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
              <p>{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section id="testnet" className="py-20 bg-gradient-to-b from-background to-muted/50">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-48 bg-muted rounded mx-auto"></div>
              <div className="h-4 w-72 bg-muted rounded mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const fallbackLogo = "https://coinhunterstr.com/wp-content/uploads/2022/12/CH_logo.webp";

  return (
    <section id="testnet" className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Testnet Snapshots
          </h2>
          <p className="text-lg text-muted-foreground">
            Latest snapshots for Cosmos SDK based testnets
          </p>
        </div>

        <div className="grid gap-6">
          {snapshots?.map((snapshot, index) => (
            <Card 
              key={index} 
              className="group border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Collapsible
                open={openDetails[snapshot.project]}
                onOpenChange={() => toggleDetails(snapshot.project)}
              >
                <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-border">
                      <img
                        src={snapshot.pic || fallbackLogo}
                        alt={`${snapshot.project} logo`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = fallbackLogo;
                        }}
                      />
                    </div>
                    <CardTitle className="text-xl font-bold">{snapshot.name}</CardTitle>
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <span className="font-medium">Details</span>
                      {openDetails[snapshot.project] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-6">
                      <div className="space-y-1">
                        <span className="font-medium block text-muted-foreground">Height</span>
                        <span className="text-foreground">{snapshot.height}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="font-medium block text-muted-foreground">Time</span>
                        <span className="text-foreground">
                          {formatDistanceToNow(new Date(snapshot.date), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="font-medium block text-muted-foreground">Size</span>
                        <span className="text-foreground">{snapshot.size}</span>
                      </div>
                    </div>

                    <div className="relative group/code">
                      {snapshot.code ? (
                        <div className="relative">
                          <pre className="w-full bg-muted/50 p-6 rounded-lg text-sm overflow-x-auto font-mono text-[15px] leading-relaxed">
                            {snapshot.code}
                          </pre>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2 opacity-0 group-hover/code:opacity-100 transition-opacity duration-200"
                            onClick={() => copyToClipboard(snapshot.code)}
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy command</span>
                          </Button>
                        </div>
                      ) : (
                        <div className="w-full bg-muted/50 p-6 rounded-lg text-sm text-muted-foreground">
                          Command not available for this snapshot
                        </div>
                      )}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
