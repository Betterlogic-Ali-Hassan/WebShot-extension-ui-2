import { cn } from "@/lib/utils";
interface Props {
  className?: string;
  orientation?: "horizontal" | "vertical";
}
const Separator = ({ className, orientation }: Props) => {
  return (
    <div
      className={cn(
        "shrink-0 h-10 w-px bg-border   ",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-10 w-[1px]",
        className
      )}
    />
  );
};

export default Separator;
