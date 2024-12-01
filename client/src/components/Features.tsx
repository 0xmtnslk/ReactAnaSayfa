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
  height: string;
  date: string;
  size: string;
  project: string;
  logo: string;
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

  return (
    <section id="mainnet" className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Available Snapshots</h2>
          <p className="text-muted-foreground">
            Latest snapshots for Cosmos SDK based networks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snapshots?.map((snapshot, index) => (
            <Card key={index} className="border shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <Collapsible
                open={openDetails[snapshot.project]}
                onOpenChange={() => toggleDetails(snapshot.project)}
              >
                <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={snapshot.logo}
                      alt={`${snapshot.project} logo`}
                      className="w-8 h-8 rounded-full"
                    />
                    <CardTitle className="text-xl">{snapshot.project}</CardTitle>
                  </div>
                  <CollapsibleTrigger className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                    Snapshots
                    {openDetails[snapshot.project] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </CollapsibleTrigger>
                </CardHeader>
                <CardContent>
                  <CollapsibleContent className="space-y-2">
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Height:</span>{" "}
                        {snapshot.height}
                      </p>
                      <p>
                        <span className="font-medium">Time:</span>{" "}
                        {formatDistanceToNow(new Date(snapshot.date), {
                          addSuffix: true,
                        })}
                      </p>
                      <p>
                        <span className="font-medium">Size:</span> {snapshot.size}
                      </p>
                    </div>

                    <div className="relative mt-4 group">
                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                        {`curl https://snapshots.coinhunterstr.com/mainnet/${snapshot.project}/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf -`}
                      </pre>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() =>
                          copyToClipboard(
                            `curl https://snapshots.coinhunterstr.com/mainnet/${snapshot.project}/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf -`
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
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
