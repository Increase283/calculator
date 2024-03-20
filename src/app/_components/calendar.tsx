

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
    return  <div className="min-h-screen flex justify-center items-center ">
    <div className="bg-blue-200 p-8 shadow-md rounded-lg text-black">
      <h1 className="text-3xl font-semibold mb-4">{monthName} {currentYear}</h1>
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => (
          <div key={day} className="text-center font-semibold text-gray-700">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {[...Array(startDay).keys()].map((_, index) => (
          <div key={index}></div>
        ))}
        {[...Array(daysInMonth).keys()].map((day) => (
          <div key={day + startDay} className="text-center py-2 border border-blue-900 rounded">
            {day + 1}
          </div>
        ))}
      </div>
    </div>
  </div>
}