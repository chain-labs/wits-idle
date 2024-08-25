import { cn } from "@/utils";

export default function GradientSideBorder({
  className,
  x,
  y,
}: {
  className?: string;
  x?: number;
  y?: number;
}) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100% 100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute", className)}
    >
      <rect
        x={x}
        y={y}
        width="100%"
        height="100%"
        rx="6.5"
        stroke="url(#paint0_linear_7296_1130)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7296_1130"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFFED0" />
          <stop offset="20%" stop-color="#FFF7BD" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
