import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <section id="testnet" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
              alt="Blockchain Network"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Testnet</h2>
            <p className="text-muted-foreground mb-6">
              Safely test new features and updates in testnet environment. 
              Develop experimental projects without risk, learn node operations, 
              and better understand blockchain networks.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 bg-primary rounded-full"></span>
                <span>Learn node operations without risk</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 bg-primary rounded-full"></span>
                <span>Free experience with test tokens</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 bg-primary rounded-full"></span>
                <span>Technical and community support</span>
              </li>
            </ul>
            
            <Button 
              className="bg-gradient-to-r from-primary to-primary/60 hover:from-primary/90 hover:to-primary/80 hover:scale-105 transition-all"
              onClick={() => window.location.href = "https://nodes.coinhunterstr.com/#testnet"}
            >
              Testnet Details
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
