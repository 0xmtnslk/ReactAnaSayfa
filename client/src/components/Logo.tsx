import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src="https://coinhunterstr.com/wp-content/uploads/2022/12/CH_logo.webp"
        alt="Coin Hunters Logo"
        className="h-8 w-auto md:h-10 transition-transform hover:scale-105"
        style={{
          maxHeight: "40px",
          objectFit: "contain"
        }}
      />
      <span className="text-lg md:text-2xl font-bold text-black">
        CoinHunters
      </span>
    </div>
  );
}