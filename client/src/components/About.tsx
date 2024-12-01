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
              Testnet ortamında yeni özellikleri ve güncellemeleri güvenle test edin. 
              Deneysel projeleri risk almadan geliştirebilir, node operasyonlarını 
              öğrenebilir ve blockchain ağlarını daha iyi anlayabilirsiniz.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 bg-primary rounded-full"></span>
                <span>Risk almadan node operasyonlarını öğrenin</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 bg-primary rounded-full"></span>
                <span>Test token'ları ile ücretsiz deneyim</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 bg-primary rounded-full"></span>
                <span>Teknik destek ve topluluk desteği</span>
              </li>
            </ul>
            
            <Button 
              className="bg-gradient-to-r from-primary to-primary/60 hover:from-primary/90 hover:to-primary/80 hover:scale-105 transition-all"
              onClick={() => window.location.href = "https://nodes.coinhunterstr.com/#testnet"}
            >
              Testnet Detayları
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
