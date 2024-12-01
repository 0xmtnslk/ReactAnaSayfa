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

export default function Features() {
  const { toast } = useToast();
  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});

  const { data: snapshots, isLoading } = useQuery({
    queryKey: ["snapshots"],
    queryFn: async () => {
      const { data } = await axios.get<SnapshotData[]>(
        "https://snapshots.coinhunterstr.com/mainnet/mainnet_snapshots_log.json"
      );
      return data;
    },
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

  if (isLoading) {
    return (
      <section id="mainnet" className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="text-center">Loading snapshots...</div>
        </div>
      </section>
    );
  }

  const fallbackLogo = "https://coinhunterstr.com/wp-content/uploads/2022/12/CH_logo.webp";

  return (
    <section id="mainnet" className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Mainnet Snapshots</h2>
          <p className="text-muted-foreground">
            Latest snapshots for Cosmos SDK based networks
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {snapshots?.map((snapshot, index) => (
            <Card key={index} className="w-full border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Collapsible
                open={openDetails[snapshot.project]}
                onOpenChange={() => toggleDetails(snapshot.project)}
                className="w-full"
              >
                <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={snapshot.pic || fallbackLogo}
                      alt={`${snapshot.project} logo`}
                      className="w-8 h-8 rounded-full"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = fallbackLogo;
                      }}
                    />
                    <CardTitle className="text-xl">{snapshot.name}</CardTitle>
                  </div>
                  <CollapsibleTrigger className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted transition-colors duration-200">
                    <span className="text-sm font-medium text-primary">Snapshots</span>
                    <div className="transition-transform duration-200">
                      {openDetails[snapshot.project] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                </CardHeader>
                <CardContent className="p-6">
                  <CollapsibleContent className="space-y-4 transition-all duration-200 ease-in-out">
                    <div className="grid grid-cols-3 gap-6 text-sm">
                      <div>
                        <span className="font-medium block mb-1">Height</span>
                        <span className="text-muted-foreground">{snapshot.height}</span>
                      </div>
                      <div>
                        <span className="font-medium block mb-1">Time</span>
                        <span className="text-muted-foreground">
                          {formatDistanceToNow(new Date(snapshot.date), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium block mb-1">Size</span>
                        <span className="text-muted-foreground">{snapshot.size}</span>
                      </div>
                    </div>

                    <div className="relative mt-6 group">
                      {snapshot.code ? (
                        <pre className="w-full bg-muted p-6 rounded-lg text-sm overflow-x-auto font-mono text-[15px] leading-relaxed">
                          {snapshot.code}
                        </pre>
                      ) : (
                        <div className="w-full bg-muted p-6 rounded-lg text-sm text-muted-foreground">
                          Command not available for this snapshot
                        </div>
                      )}
                      {snapshot.code && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          onClick={() => copyToClipboard(snapshot.code)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CollapsibleContent>
                </CardContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
