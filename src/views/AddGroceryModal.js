import { Dialog, Transition, Combobox } from '@headlessui/react'
import { useState, Fragment, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCheck, faCaretDown } from "@fortawesome/free-solid-svg-icons"
import classNames from 'classnames';

const items = [
  { id: 1, name: 'cup' },
  { id: 2, name: 'pint' },
  { id: 3, name: 'quart' },
  { id: 4, name: 'gallon' },
  { id: 5, name: 'ounce' },
  { id: 6, name: 'pound' },
  { id: 7, name: 'fluid ounce' },
  { id: 8, name: 'tablespoon' },
  { id: 9, name: 'teasponn' },
  { id: 10, name: 'milliliter' },
  { id: 11, name: 'liter' },
  { id: 12, name: 'gram' },
  { id: 13, name: 'kilogram' },
]

export default function AddGrocery(props) {
	const { setGroceryData, username } = props;
	const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [groceryName, setGroceryName] = useState("")
  const [groceryQuantity, setGroceryQuantity] = useState("")
  const [groceryUnit, setGroceryUnit] = useState(items[0])
  const [query, setQuery] = useState('')

  const filter =
    query === ''
      ? items
      : items.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  const addGrocery = async (e) => {
    setOpen(false)
    const quantity = `${groceryQuantity} ${groceryQuantity > 1 ? `${groceryUnit.name}s` : groceryUnit.name}`
    let result = await fetch(
      'http://localhost:5000/home', {
      method: "post",
      body: JSON.stringify({ username, groceryName, quantity }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
    result = await result.json()
    const data = result.results.Groceries.L
    setGroceryData(data)
  }

  useEffect(() => {
    const fetchData = async (user) => {
      let result = await fetch(
        `http://localhost:5000/home/${user}`, {
        method: "get",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      result = await result.json()
      const data = result.Response
      setGroceryData(data.Groceries)
    }
    fetchData(username)
	}, [groceryName])

	console.log("Loading Add Grocery Modal...")
	return (
		<div className='pb-3 px-3'>
			<button className='flex justify-center w-full rounded-full text-forest ring-1 ring-forest hover:ring-2 font-bold' onClick={() => setOpen(true)}>
				Add Grocery
			</button>
			<Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 text-gray-900 font-semibold"
                >
                  Add Grocery Item
                </Dialog.Title>
                <form action="" className="grid gap-5 items-center pt-2">
                  <div>
                    <div className="text-xl font-bold pb-3">
                      {error && <p className="text-sm text-red-500 font-semibold">Please enter a valid username</p>}
                    </div>
                    <div className="relative flex items-center">
                      <div className="absolute px-4 right-1">
                        {error && <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "red" }} />}
                      </div>
                      <input value={groceryName} placeholder="Name" onChange={(ev) => setGroceryName(ev.target.value)}
                        className={classNames(
                          error ? 'focus:ring-red-500 border-red-500 border-2' : 'border-black focus:ring-forest border', 'w-full text-md rounded-lg py-1 px-3 focus:outline-none focus:ring-2'
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative flex items-center flex-row">
                      <input type='number' min={0} value={groceryQuantity} placeholder="Quantity" onChange={(ev) => setGroceryQuantity(ev.target.value)}
                        className='border w-full text-md rounded-lg py-1 px-3 border-black focus:outline-none focus:ring-2 focus:ring-forest'
                      />
                      <Combobox value={groceryUnit} onChange={setGroceryUnit}>
                        <div className="relative pl-3">
                          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left 
															shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 
															focus-visible:ring-offset-teal-300">
                            <Combobox.Input
                              className="border w-full text-md rounded-lg py-1 px-3 border-black focus:outline-none focus:ring-2 focus:ring-forest"
                              displayValue={(person) => person.name}
                              onChange={(event) => setQuery(event.target.value)}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                              <FontAwesomeIcon icon={faCaretDown} style={{ color: "black" }} className='text-xl pr-2' />
                            </Combobox.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}
                          >
                            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md 
																bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                              {filter.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                  Nothing found.
                                </div>
                              ) : (
                                filter.map((person) => (
                                  <Combobox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-forest/75 text-white' : 'text-gray-900'
                                      }`
                                    }
                                    value={person}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                            }`}
                                        >
                                          {person.name}
                                        </span>
                                        {selected ? (
                                          <span
                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                              }`}
                                          >
                                            <FontAwesomeIcon icon={faCheck} style={{ color: "black" }} />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Combobox.Option>
                                ))
                              )}
                            </Combobox.Options>
                          </Transition>
                        </div>
                      </Combobox>
                    </div>
                  </div>
                </form>
                <div className="mt-4">
                  <button
                    type="button"
                    className=" w-full inline-flex justify-center rounded-md border border-transparent 
												bg-forest px-4 py-2 text-sm font-medium text-white hover:bg-forest/75 
												focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={addGrocery}
                  >
                    Add
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
		</div>
	)
}