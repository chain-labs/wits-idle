import { cn } from "@/utils";

export default function GradientSideBorder({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 483 627"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute", className)}
    >
      <rect
        x="30"
        y="0"
        width="482"
        height="626"
        rx="6.5"
        stroke="url(#paint0_linear_7296_1130)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7296_1130"
          x1="492.995"
          y1="950.785"
          x2="328.01"
          y2="949.918"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFFED0" />
          <stop offset="1" stop-color="#FFF7BD" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
