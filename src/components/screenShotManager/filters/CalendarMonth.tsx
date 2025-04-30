import { useScreenShot } from "@/context/ScreenShotContext";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface Props {
  year: number;
  month: number;
  onNavigate: (direction: string) => void;
}
export const CalendarMonth = ({ month, year, onNavigate }: Props) => {
  const { dateRange, handleSelectDate: onSelectDate } = useScreenShot();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDay = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === month && today.getFullYear() === year;

  const days = [];
  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${i}`} className='p-2'></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    const formattedDate = currentDate.toISOString().split("T")[0];
    const isSelected =
      dateRange.start === formattedDate || dateRange.end === formattedDate;
    const isWithinRange =
      dateRange.start &&
      dateRange.end &&
      currentDate >= new Date(dateRange.start) &&
      currentDate <= new Date(dateRange.end);
    const isToday = isCurrentMonth && today.getDate() === day;

    days.push(
      <button
        key={day}
        onClick={() => onSelectDate(formattedDate)}
        className={cn(
          "p-2 rounded-lg transition-all duration-200 w-full hover:bg-border",
          isSelected
            ? "bg-info text-text-primary"
            : isWithinRange && "bg-hover",
          isToday && "font-semibold"
        )}
      >
        {day}
      </button>
    );
  }

  const monthName = firstDayOfMonth.toLocaleString("default", {
    month: "long",
  });

  return (
    <div className='w-64'>
      <div className='flex items-center justify-between mb-2'>
        <button
          onClick={() => onNavigate("prev")}
          className='p-1 rounded-full transition-all duration-200 hover:bg-hover'
        >
          <ChevronLeft size={16} />
        </button>
        <h3 className='font-medium'>
          {monthName} {year}
        </h3>
        <button
          onClick={() => onNavigate("next")}
          className='p-1 rounded-full transition-all duration-200 hover:bg-hover'
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className='grid grid-cols-7 gap-1'>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className='text-center text-xs text-foreground'>
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};
