import dayjs from 'dayjs'
import React, {useContext, useState, useEffect } from 'react'
import GlobalContext from '../context/GlobalContext';

export default function Day({day}) {
  const [ dayEvents, setDayEvents ] = useState([])

  const { setDayChosen, setShowEventModal, savedEvents, setSelectedEvent } = useContext(GlobalContext)

  useEffect(() => {
    const events = savedEvents.filter(
      (evt) =>
      dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
      );
      setDayEvents(events)
  }, [savedEvents, day]);


  function getCurrentDayClass() {
    if (day.format("DD-MM-YY") === dayjs().format("DD-MM-YY"))
      return 'bg-blue-600-text-white rounded-full w-7'
    else
      return '';
  };

  return (
    <div className='border border-gray-200 flex flex-col'>
      <header className='flex flex-col items-center'>
          <p className='text-sm mt-1'>
        {day.format('ddd').toUpperCase()}
        </p>
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
      <div onClick={() => {
          setDayChosen(day)
          setShowEventModal(true)
      }} className='flex-1 cursor-pointer'>
        {dayEvents.map((evt, idx) => (
          <div
          key={idx}
          onClick={() => setSelectedEvent(evt)}
          className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}>
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  )
}
