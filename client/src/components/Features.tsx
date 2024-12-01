import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";

interface SnapshotData {
  project: string;
  name: string;
  height: string;
  date: string;
  size: string;
  code?: string;
  pic?: string;
}

export default function Features() {
  const { toast } = useToast();
  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});

  const mainnetUrl = import.meta.env.VITE_MAINNET_JSON_URL || "https://snapshots.coinhunterstr.com/mainnet/mainnet_snapshots_log.json";
  console.log('Using mainnet URL:', mainnetUrl);

  const { data: snapshots, isLoading, error } = useQuery({
    queryKey: ["snapshots"],
    queryFn: async () => {
      console.log('Fetching from URL:', mainnetUrl); // URL'yi logla
      
      try {
        const response = await axios.get(mainnetUrl, {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
          },
          timeout: 5000
        });
        
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
        
        return response.data;
      } catch (error) {
        console.error('Detailed fetch error:', error);
        if (axios.isAxiosError(error)) {
          console.error('Response data:', error.response?.data);
          console.error('Response status:', error.response?.status);
        }
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000
  });

  if (error) {
    console.error('Error details:', error);
    return (
      <section id="mainnet" className="py-20 bg-gradient-to-b from-background to-muted/50">
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

  const copyToClipboard = (text: string | undefined) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast({
      description: "Command copied to clipboard",
    });
  };

  if (isLoading) {
    return (
      <section id="mainnet" className="py-20 bg-gradient-to-b from-background to-muted/50">
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
    <section id="mainnet" className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Mainnet Snapshots
          </h2>
          <p className="text-lg text-muted-foreground">
            Latest snapshots for Cosmos SDK based networks
          </p>
        </div>

        <div className="grid gap-6">
          {snapshots?.map((snapshot: SnapshotData, index: number) => (
            <Card 
              key={index} 
              className="group border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                <div className="flex items-center gap-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-border bg-background/50 backdrop-blur">
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
                  <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    {snapshot.name}
                  </CardTitle>
                </div>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-2 hover:bg-primary/10"
                      onClick={() => setOpenDetails(prev => ({
                        ...prev,
                        [snapshot.project]: !prev[snapshot.project]
                      }))}
                    >
                      <span className="font-medium">Details</span>
                      {openDetails[snapshot.project] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
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
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
