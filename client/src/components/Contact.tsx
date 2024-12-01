import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">İletişim</h2>
          <p className="text-muted-foreground">
            Bizimle iletişime geçmek için tıklayın
          </p>
        </div>
        <div className="flex justify-center">
          <Button 
            className="bg-gradient-to-r from-primary to-primary/60 hover:from-primary/90 hover:to-primary/80 hover:scale-105 transition-all"
            onClick={() => window.location.href = "https://nodes.coinhunterstr.com/#contact"}
          >
            İletişime Geç
          </Button>
        </div>
      </div>
    </section>
  );
}