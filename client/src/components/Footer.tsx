import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container px-4 mx-auto py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Company</h3>
            <p className="text-muted-foreground">
              <a 
                href="https://coinhunterstr.com/"
                className="hover:text-primary transition-colors"
              >
                CoinHunters
              </a>
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#mainnet" className="text-muted-foreground hover:text-primary">
                  Mainnet
                </Link>
              </li>
              <li>
                <Link href="#testnet" className="text-muted-foreground hover:text-primary">
                  Testnet
                </Link>
              </li>
              <li>
                <a 
                  href="https://nodes.coinhunterstr.com/"
                  className="text-muted-foreground hover:text-primary"
                >
                  Nodes
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://x.com/CoinHuntersTR"
                  className="text-muted-foreground hover:text-primary"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="https://t.me/CoinHuntersTR"
                  className="text-muted-foreground hover:text-primary"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/CoinHuntersTR/"
                  className="text-muted-foreground hover:text-primary"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CoinHunters. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
