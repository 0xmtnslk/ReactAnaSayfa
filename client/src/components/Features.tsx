import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, Server, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Yüksek Güvenlik",
    description: "Mainnet ağında maksimum güvenlik ve stabilite",
    icon: Shield,
  },
  {
    title: "Gerçek Değer",
    description: "Gerçek kripto varlıkları ile etkileşim",
    icon: Activity,
  },
  {
    title: "Hızlı İşlem",
    description: "Hızlı ve güvenilir işlem onayları",
    icon: Zap,
  },
  {
    title: "Node Operasyonları",
    description: "Profesyonel node altyapısı ve yönetimi",
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
            Güvenli ve profesyonel mainnet node hizmetleri
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
            Mainnet Detayları
          </Button>
        </div>
      </div>
    </section>
  );
}
