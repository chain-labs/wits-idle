import { cn } from "@/utils";

interface GlowingH1Props {
  className?: string;
  children: React.ReactNode;
}
export default function GlowingH1({
  className,
  children,
  ...H1Props
}: GlowingH1Props & JSX.IntrinsicElements["h1"]) {
  return (
    <h1 className={cn("uppercase text-[36px] text-lightGold [text-shadow:_0_0_5px_#FFFED0] tracking-widest", className)} {...H1Props}>
      {children}
    </h1>
  );
}
