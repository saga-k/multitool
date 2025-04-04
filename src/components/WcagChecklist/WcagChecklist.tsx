import React from 'react'
import { useEffect, useState } from 'react'
import './WcagChecklist.module.css'

export default function WcagChecklist() {
  interface checkListItems{
    text: string,
    checked: boolean,
    id: string
  }

  interface listObject{
    section:string,
    allChecked: boolean
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
      {list && list.map(listObject =>
        <div className='listTitle'
        key={listObject.section}>
          <h4>{listObject.section}</h4>
          <ul>
          {listObject.items && listObject.items.map(item =>
            <li className='listItem' key={item.id}>
              <input type='checkbox' value={item.id} onChange={(e) => handleChange(e, listObject)}/>
              <p>{item.text}</p>
            </li>)}
          </ul>

        </div>)}
    </section>
  )
}

{/*
function handleChange(e:React.ChangeEvent<HTMLInputElement>, listObject: listObject){
  const l = [...list]
  const s = l.find((obj) => obj.section === listObject.section)
  const items = [...s.items]
  console.log(items)
  const found = items.find((item) => item.id === e.target.value)
  console.log('found',found)
  found.checked = e.target.checked;
}*/}
