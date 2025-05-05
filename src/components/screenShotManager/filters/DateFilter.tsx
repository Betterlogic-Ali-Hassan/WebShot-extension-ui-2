import { useScreenShot } from "@/context/ScreenShotContext";
import { cn } from "@/lib/utils";

import { Calendar, ChevronDown } from "lucide-react";
import { CalendarMonth } from "./CalendarMonth";

const DateFilter = () => {
  const {
    dateDropdownRef,
    setIsDateDropdownOpen,
    isDateDropdownOpen,
    dateRange,
    setDateRange,
    calendarView,
    setCalendarView,
  } = useScreenShot();
  return (
    <div className='relative max-sm:w-full' ref={dateDropdownRef}>
      <button
        onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
        className={cn(
          "flex items-center space-x-1 px-3 py-2 rounded-full max-sm:w-full max-sm:justify-between",
          "border transition-all duration-200 bg-background border-border hover:bg-hover",
          isDateDropdownOpen && "bg-hover",
          (dateRange.start || dateRange.end) && "border-info"
        )}
      >
        <div className='flex items-center gap-2'>
          <Calendar size={16} />
          <span>
            {dateRange.start && dateRange.end
              ? `${
                  new Date(dateRange.start).toLocaleDateString().split(",")[0]
                } - ${
                  new Date(dateRange.end).toLocaleDateString().split(",")[0]
                }`
              : dateRange.start
              ? `From ${
                  new Date(dateRange.start).toLocaleDateString().split(",")[0]
                }`
              : "Date"}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform duration-200",
            isDateDropdownOpen && "transform rotate-180"
          )}
        />
      </button>
      {isDateDropdownOpen && (
        <div className='absolute right-0 mt-2 sm:w-[600px] w-[320px] rounded-xl shadow-lg z-10 border transition-all duration-200 animate-in fade-in bg-card border-border'>
          <div className='p-4 space-y-4'>
            {/* Header with clear button */}
            <div className='flex items-center justify-between'>
              <h3 className='font-medium'>Select Date Range</h3>
              <button
                onClick={() => setDateRange({ start: "", end: "" })}
                className='px-2 py-1 rounded-lg text-xs transition-all duration-200 hover:bg-hover text-text'
              >
                Clear
              </button>
            </div>

            {/* Date input fields */}
            <div className='flex justify-center gap-4 max-sm:flex-col mb-2'>
              <div className='max-sm:w-[280px] w-[200px]'>
                <label className='block text-xs mb-1 text-foreground'>
                  Start Date
                </label>
                <div className='px-3 py-2 rounded-lg border text-sm transition-all duration-200 bg-background text-text border-border'>
                  {dateRange.start
                    ? new Date(dateRange.start).toLocaleDateString()
                    : "Not set"}
                </div>
              </div>
              <div className='max-sm:w-[280px] w-[200px]'>
                <label className='block text-xs mb-1 text-foreground'>
                  End Date
                </label>
                <div className='px-3 py-2 rounded-lg border text-sm transition-all duration-200 bg-background text-text border-border'>
                  {dateRange.end
                    ? new Date(dateRange.end).toLocaleDateString()
                    : "Not set"}
                </div>
              </div>
            </div>

            {/* Calendar container */}
            <div className='flex justify-between max-sm:flex-col  gap-6 p-2'>
              <CalendarMonth
                month={calendarView.leftMonth}
                year={calendarView.leftYear}
                onNavigate={(direction) => {
                  if (direction === "prev") {
                    setCalendarView((prev) => {
                      const newLeftMonth =
                        prev.leftMonth === 0 ? 11 : prev.leftMonth - 1;
                      const newLeftYear =
                        prev.leftMonth === 0
                          ? prev.leftYear - 1
                          : prev.leftYear;
                      const newRightMonth =
                        prev.rightMonth === 0 ? 11 : prev.rightMonth - 1;
                      const newRightYear =
                        prev.rightMonth === 0
                          ? prev.rightYear - 1
                          : prev.rightYear;
                      return {
                        leftMonth: newLeftMonth,
                        leftYear: newLeftYear,
                        rightMonth: newRightMonth,
                        rightYear: newRightYear,
                      };
                    });
                  }
                }}
              />
              <CalendarMonth
                month={calendarView.rightMonth}
                year={calendarView.rightYear}
                onNavigate={(direction) => {
                  if (direction === "next") {
                    setCalendarView((prev) => {
                      const newLeftMonth = (prev.leftMonth + 1) % 12;
                      const newLeftYear =
                        prev.leftMonth === 11
                          ? prev.leftYear + 1
                          : prev.leftYear;
                      const newRightMonth = (prev.rightMonth + 1) % 12;
                      const newRightYear =
                        prev.rightMonth === 11
                          ? prev.rightYear + 1
                          : prev.rightYear;
                      return {
                        leftMonth: newLeftMonth,
                        leftYear: newLeftYear,
                        rightMonth: newRightMonth,
                        rightYear: newRightYear,
                      };
                    });
                  }
                }}
              />
            </div>

            {/* Quick selection options */}
            <div className='flex flex-wrap gap-2 pt-2 border-t border-border'>
              <button
                onClick={() => {
                  const today = new Date();
                  const formattedDate = today.toISOString().split("T")[0];
                  setDateRange({ start: formattedDate, end: formattedDate });
                }}
                className='px-3 py-1 text-xs rounded-full transition-all duration-200 bg-background border-border border'
              >
                Today
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  const yesterday = new Date(today);
                  yesterday.setDate(today.getDate() - 1);
                  const formattedDate = yesterday.toISOString().split("T")[0];
                  setDateRange({ start: formattedDate, end: formattedDate });
                }}
                className='px-3 py-1 text-xs rounded-full transition-all duration-200 bg-background border-border border'
              >
                Yesterday
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  const lastWeek = new Date(today);
                  lastWeek.setDate(today.getDate() - 7);
                  setDateRange({
                    start: lastWeek.toISOString().split("T")[0],
                    end: today.toISOString().split("T")[0],
                  });
                }}
                className='px-3 py-1 text-xs rounded-full transition-all duration-200 bg-background border-border border'
              >
                Last 7 days
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  const lastMonth = new Date(today);
                  lastMonth.setMonth(today.getMonth() - 1);
                  setDateRange({
                    start: lastMonth.toISOString().split("T")[0],
                    end: today.toISOString().split("T")[0],
                  });
                }}
                className='px-3 py-1 text-xs rounded-full transition-all duration-200 bg-background border-border border'
              >
                Last 30 days
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateFilter;
