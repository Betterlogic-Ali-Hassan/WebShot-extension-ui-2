import { cn } from "@/lib/utils";
interface Props {
  className?: string;
  orientation?: "horizontal" | "vertical";
}
const Separator = ({ className, orientation }: Props) => {
  return (
    <div
      className={cn(
        "shrink-0 max-[850px]:h-[1px] h-10 w-px bg-border max-[850px]:w-full  ",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
    />
  );
};

export default Separator;
