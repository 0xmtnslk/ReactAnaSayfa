import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Transform Your Business with Modern Solutions
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Empower your team with cutting-edge tools and strategies designed for today's digital landscape.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/60 hover:from-primary/90 hover:to-primary/80 hover:scale-105 transition-all"
                onClick={() => window.location.href = "https://nodes.coinhunterstr.com/"}
              >
                Nodes
              </Button>
              <Button size="lg" variant="ghost" className="hover:scale-105 transition-all ml-4">Learn More</Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1495521939206-a217db9df264"
              alt="Modern office space"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-primary/10 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
