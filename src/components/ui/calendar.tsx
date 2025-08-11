"use client";

import * as React from "react";
import {
  DayPicker,
  useDayPicker,
  type MonthCaptionProps,
} from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Custom MonthCaption component to achieve the desired layout
function CustomMonthCaption(props: MonthCaptionProps) {
  const { calendarMonth } = props;
  const { goToMonth, nextMonth, previousMonth, formatters } = useDayPicker();

  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 p-0 opacity-50 hover:opacity-100"
        )}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        disabled={!previousMonth}
        aria-label="Go to previous month"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="text-sm font-medium">
        {formatters.formatCaption(calendarMonth.date)}
      </div>

      <button
        type="button"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 p-0 opacity-50 hover:opacity-100"
        )}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        disabled={!nextMonth}
        aria-label="Go to next month"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      components={{
        MonthCaption: CustomMonthCaption,
      }}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex items-center justify-between mb-4",
        nav: "sr-only", // Hide the default nav visually but keep for screen readers
        nav_button: "sr-only",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-stone-500 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-stone-100/50 [&:has([aria-selected])]:bg-stone-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "h-9 w-9 p-0 font-normal",
        day_range_end: "day-range-end",
        day_selected:
          "bg-stone-800 text-stone-50 hover:bg-stone-800 hover:text-stone-50 focus:bg-stone-800 focus:text-stone-50",
        day_today: "bg-stone-100 text-stone-800",
        day_outside:
          "day-outside text-stone-500 opacity-50 aria-selected:bg-stone-100/50 aria-selected:text-stone-500 aria-selected:opacity-30",
        day_disabled: "text-stone-500 opacity-50",
        day_range_middle:
          "aria-selected:bg-stone-100 aria-selected:text-stone-800",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";
export { Calendar };
