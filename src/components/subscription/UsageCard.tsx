import { cn } from "@/lib/utils";

interface UsageCardProps {
  title: string;
  used: number;
  total: number;
  percentage: number;
  unit: string;
  remainingText: string;
  showUsedDays?: boolean;
}
export function UsageCard({
  title,
  used,
  total,
  percentage,
  unit,
  remainingText,
}: UsageCardProps) {
  const getProgressColor = (percentage: number) => {
    if (percentage > 80) return "text-error";
    if (percentage > 60) return "text-text";
    return "text-text";
  };

  const progressColor = getProgressColor(percentage);

  return (
    <div className='rounded-xl border border-border bg-background'>
      <div className='p-6 pb-2'>
        <h3 className='text-base font-semibold text-text'>{title}</h3>
      </div>
      <div className='p-6 pt-0'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm text-foreground'>
            {used}
            {unit} / {total}
            {unit}
          </span>
          <span
            className={cn(
              "text-sm font-medium !text-success-color",
              progressColor
            )}
          >
            {percentage}%
          </span>
        </div>
        <div className='h-4 w-full bg-hover rounded-full overflow-hidden'>
          <div
            className={cn("h-full", progressColor)}
            style={{ width: `${percentage}%`, backgroundColor: "currentColor" }}
          ></div>
        </div>
        <p className='text-xs mt-2 text-foreground'>{remainingText}</p>
      </div>
    </div>
  );
}
