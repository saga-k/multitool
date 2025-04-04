import React from 'react'
import { useEffect, useState } from 'react'

export default function WcagChecklist() {
  interface checkListItems{
    text: string,
    checked: boolean,
    id: string
  }

  interface listObject{
    section:string,
    items: checkListItems[]
  }

  const [list, setList] = useState<listObject[]>([])

  async function fetchList(){
    const promise = await fetch('/wcag_checklist.json')
    const fetchedList = await promise.json()
    setList(fetchedList)
  }

  useEffect(() => {fetchList(),[]})

  return (
    <section>
      {list && list.map(section =>
        <div className='listTitle'
        key={section.section}>
          <h4>{section.section}</h4>
          <ul>
          {section.items && section.items.map(item =>
            <li className='listItem' key={item.id}>
              <input type='checkbox'/>
              <p>{item.text}</p>
            </li>)}
          </ul>

        </div>)}
    </section>
  )
}
