import React from 'react'
import { useEffect, useState, useReducer } from 'react'
import './WcagChecklist.module.css'

const initialState = {
  loading: true,
  fetchedList: null
}

function reducer(state, action){
switch(action.type){
  case 'FETCH_SUCCESS':
  return {...state, loading: false, data: action.payload}
}

}

export default function WcagChecklist() {

  const [state, dispatch] = useReducer(reducer, initialState)

  interface listObject{
    title:string,
    allChecked: boolean
    items: checkListItems[]
  }

  interface checkListItems{
    text: string,
    checked: boolean,
    id: string
  }

  async function fetchList(){

    try{
    const promise = await fetch('/wcag_checklist.json')
    if(!promise.ok){
      throw new Error(`Failed to fetch checklist: ${promise.status}`)
    }
    const fetchedList = await promise.json()
    dispatch({type: 'FETCH_SUCCESS', payload: fetchedList})
    }
    catch (error){
      console.error(error)
    }
  }

  useEffect(() => {fetchList(),[]})




  return (
    <section>
      {state.data?.map((title:listObject) =>
        <div className='listTitle'
        key={title.title}>
          <h4>{title.title}</h4>
          <ul>
          {title.items.map((item : checkListItems) =>
          <li className='listItem'
          key={item.id}>
          <input type='checkBox' value={item.id}/>
          {item.text}
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
  found.checked = e.target.checked


            <ul>
          {state.data.items && state.data.items.map((item, section, index) =>
            <li className='listItem' key={item.id}>
              <input type='checkbox' value={item.id} onChange={(event) => handleChange(event, section, index)}/>
              <p>{item.text}</p>
            </li>)}
          </ul>
}*/}
