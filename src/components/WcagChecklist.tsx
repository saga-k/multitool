import React from 'react'
import { useEffect, useState } from 'react'

export default function WcagChecklist() {
  interface checkListItems{
    text: string,
    checked: boolean
  }

  interface listObject{
    section:string,
    items: checkListItems[]
  }

  const [list, setList] = useState([])

  async function fetchList(){
    const promise = await fetch('/wcag_checklist.json')
    const fetchedList = await promise.json()
    setList(fetchedList)
  }

  useEffect(() => {fetchList(),[]})

  return (
    <section>
      {list && list.map(item => <p>{item.section}</p>)}
    </section>
  )
}
