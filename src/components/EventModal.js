import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const labelsColours = ["purple",
"indigo",
"blue",
"red",
"green",
"gray"];

export default function EventModal() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [eventColour, setEventColour] = useState(labelsColours[0])

  const {setShowEventModal, dayChosen, dispatchCalledEvent } = useContext(GlobalContext)

  function handleSubmit(e) {
    e.preventDefault()
    const calendarEvent = {
      title,
      description,
      label: eventColour,
      day: dayChosen.valueOf(),
      id: Date.now()
    }
    dispatchCalledEvent({type: 'push', payload: calendarEvent})
    setShowEventModal(false)
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className='bg-grey-100 px-4 py-2 flex justify-between items-center'>
          <span className="material-symbols-outlined text-gray-400">
            drag_handle
          </span>
          <button onClick={() => setShowEventModal(false)}>
            <span className="material-symbols-outlined text-gray-400">
              close
            </span>
          </button>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
              <input type='text'
              name='title'
              placeholder="Add Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500">
              </input>
              <span className="material-symbols-outlined text-gray-400">
              schedule
              </span>
              <p>{dayChosen.format("dddd, MMMM, DD")}</p>
              <span className="material-symbols-outlined text-gray-400 mb-3">
                segment
              </span>
              <input type='text'
              name='description'
              placeholder="Add a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500">
              </input>
              <span className="material-symbols-outlined text-gray-400">
                bookmark_border
              </span>
              <div className="flex gap-x-2">
              {labelsColours.map((colourClass, i) => (
                <span
                  key={i}
                  onClick={() => setEventColour(colourClass)}
                  className={`bg-${colourClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {eventColour === colourClass && (  <span className="material-symbols-outlined text-white text-sm">
                      check
                    </span>
                    )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white">
                Save
          </button>
        </footer>
      </form>
    </div>
  );
}
