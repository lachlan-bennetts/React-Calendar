import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  miniCalendarMonth: 0,
  setMiniCalendarMonth: (index) => {},
  dayChosen: null,
  setDayChosen: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalledEvent: () => {},
  savedEvents: []
});

export default GlobalContext
