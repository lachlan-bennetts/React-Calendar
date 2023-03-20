import React, { useEffect, useState, useContext } from 'react';
import dayjs from 'dayjs';
import { getMonth } from '../util';
import GlobalContext from '../context/GlobalContext';


export default function MiniCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month())
  const [currentMonth, setCurrentMonth] = useState(getMonth())

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx))
  }, [currentMonthIdx])

  const  {monthIndex, setMiniCalendarMonth, setDayChosen, dayChosen}  = useContext(GlobalContext)

  useEffect(() => {setCurrentMonthIdx(monthIndex)}, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  function showDayClass(day) {
    const format = "DD-MM-YY"
    const officialDay = dayjs().format("DD-MM-YY")
    const currentDay = day.format(format)
    const chosenDay = dayChosen && dayChosen.format(format)
    if (officialDay === currentDay)
      return "bg-blue-500 rounded-full text-white";
    else if (currentDay === chosenDay)
      return "bg-blue-100 rounded-full text-blue-600 font-bold"
    else
      return "";
  }

  return (
    <div className='mt-9'>
      <header className='flex justify-between'>
        <p className='text-gray-500 font-bold'>
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span className='material-symbols-outlined cursor-pointer text-gray-600 mx-2'>chevron_left</span>
          </button>
          <button onClick={handleNextMonth}>
            <span className='material-symbols-outlined cursor-pointer text-gray-600 mx-2'>chevron_right</span>
          </button>
        </div>
      </header>
      <div className='grid grid-cols-7 grid-rows-6'>
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment>
            {row.map((day, idx) => (
              <button onClick={() => {
                setMiniCalendarMonth(currentMonthIdx);
                setDayChosen(day)
              }}
                key={idx}
                className={`py-1 w-full ${showDayClass(day)}`}>
                <span className='text-sm'>{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
