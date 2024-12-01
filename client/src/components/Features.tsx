import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, Server, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "High Security",
    description: "Maximum security and stability in mainnet network",
    icon: Shield,
  },
  {
    title: "Real Value",
    description: "Interaction with real crypto assets",
    icon: Activity,
  },
  {
    title: "Fast Processing",
    description: "Quick and reliable transaction confirmations",
    icon: Zap,
  },
  {
    title: "Node Operations",
    description: "Professional node infrastructure and management",
    icon: Server,
  },
];

export default function Features() {
  return (
    <section id="mainnet" className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Mainnet</h2>
          <p className="text-muted-foreground">
            Secure and professional mainnet node services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary" />
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button 
            className="bg-gradient-to-r from-primary to-primary/60 hover:from-primary/90 hover:to-primary/80 hover:scale-105 transition-all"
            onClick={() => window.location.href = "https://nodes.coinhunterstr.com/#mainnet"}
          >
            Mainnet Details
          </Button>
        </div>
      </div>
    </section>
  );
}
