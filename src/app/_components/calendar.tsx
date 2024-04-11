"use client";
import React, { useState } from "react";
import { CalendarDay } from "./calendar-day";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export const Calendar = () => {
  // Dummy data for demonstration
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();

  const monthName = months[currentMonth];

  const goPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const goNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="rounded-lg bg-muted/50 p-8 shadow-md">
        <h1 className="mb-4 text-3xl font-semibold">
          {monthName} {currentYear}
        </h1>
        <div className="flex justify-between py-4">
          <Button variant={"secondary"} size={"icon"} onClick={goPrevMonth}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant={"secondary"} size={"icon"} onClick={goNextMonth}>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-2">
          {[...Array(startDay).keys()].map((_, index) => (
            <div key={index}></div>
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <CalendarDay key={day} day={day + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};
