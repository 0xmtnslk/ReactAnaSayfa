import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-muted/30 pointer-events-none" />
      <div className="container px-4 mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70">
              Node Snapshots
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Professional snapshot service for Cosmos SDK based blockchain networks. Synchronize your Mainnet and Testnet nodes within minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-primary/25 hover:scale-105"
                onClick={() => window.location.href = "https://nodes.coinhunterstr.com/"}
              >
                <span className="relative px-2 py-1">
                  Nodes
                  <span className="absolute bottom-0 left-0 w-full h-px bg-white/30 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
                </span>
              </Button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a"
                alt="Blockchain Node Network"
                className="rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-lg backdrop-blur-[1px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
