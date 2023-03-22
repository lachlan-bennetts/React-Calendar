import React, {useState, useEffect, useReducer} from "react"
import GlobalContext from "./GlobalContext"
import dayjs from "dayjs"

function savedEventsReducer(state, {type, payload}) {
  switch (type) {
    case 'push':
      return [...state, payload];
    case "update":
      return state.map
      (evt => evt.id === payload.id ? payload : evt
      );
    case "delete":
      return state.filter((evt) => evt.id !== payload.id  )
    default:
      throw new Error()
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents")
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : []
  return parsedEvents
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [miniCalendarMonth, setMiniCalendarMonth] = useState(null);
  const [dayChosen, setDayChosen] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [savedEvents, dispatchCalledEvent] = useReducer(savedEventsReducer, [], initEvents);

  useEffect(() => {
    localStorage.setItem('savedEvents,', JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    if(miniCalendarMonth !== null) {
      setMonthIndex(miniCalendarMonth);
    }
  }, [miniCalendarMonth]);

  return (
    <GlobalContext.Provider value={{monthIndex,
    setMonthIndex,
    miniCalendarMonth,
    setMiniCalendarMonth,
    dayChosen,
    setDayChosen,
    showEventModal,
    setShowEventModal,
    savedEvents,
    dispatchCalledEvent,
    selectedEvent,
    setSelectedEvent
    }}>
      {props.children}
    </GlobalContext.Provider>
  )

}
