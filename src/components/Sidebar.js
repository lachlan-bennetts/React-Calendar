import React from 'react'
import CreateEventButton from './CreateEventButton'
import MiniCalendar from './MiniCalendar'

export default function Sidebar() {
  return (
    <aside className="border p-5 w-64">
      <CreateEventButton />
      <MiniCalendar />
    </aside>
  )
}
