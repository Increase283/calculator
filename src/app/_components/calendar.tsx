"use client"
import React from 'react';
import { CalendarDay } from './calendar-day';

export const Calendar = () => {
  // Dummy data for demonstration
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  
  const monthName = months[currentMonth];



  return (
    <div className="flex justify-center items-center flex-grow">
      <div className="bg-muted/50 p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold mb-4">{monthName} {currentYear}</h1>
        <div className="grid grid-cols-7 gap-2">
          {days.map(day => (
            <div key={day} className="text-center font-semibold text-muted-foreground">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 mt-2">
          {[...Array(startDay).keys()].map((_, index) => (
            <div key={index}></div>
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <CalendarDay key={day} day={day + 1}/>
          ))}
        </div>
      </div>
    </div>
  );
};
