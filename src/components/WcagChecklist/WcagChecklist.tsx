import React from 'react'
import { useEffect, useState, useReducer } from 'react'
import './WcagChecklist.module.css'

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

interface state {
  loading:boolean,
  data: listObject[]
}

type action =
  | {type: 'FETCH_SUCCESS', payload: listObject[]}
  | { type: 'TOGGLE_BOX'; payload: { groupIndex: number; itemIndex: number; checked: boolean } };


const initialState = {
  loading: true,
  fetchedList: null
}

function reducer(state:state, action:action){
switch(action.type){
  case 'FETCH_SUCCESS':
  return {...state, loading: false, data: action.payload}

  case 'TOGGLE_BOX':{
    const {groupIndex, itemIndex, checked} = action.payload;
    const updatedGroups = state.data.map((group:listObject, i: number) => {
      if(i !== groupIndex) return group

      const updatedItems = group.items.map((item, j) =>
      j === itemIndex ? {...item, checked: checked} : item
      )

      const allChecked = updatedItems.every((item) => item.checked)

      return{
        ...group,
        items: updatedItems,
        allChecked: allChecked
      }
    })

    return{
      ...state,
      data: updatedGroups
    }
  }
}

}

export default function WcagChecklist() {

  const [state, dispatch] = useReducer(reducer, initialState)

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

  useEffect(() => {fetchList()}, [])


  return (
    <section>
      {state.data?.map((title:listObject, parentIndex : number) =>
        <div className='listTitle'
        key={title.title}>
          <h4>{title.title}</h4>
          {title.allChecked && <p className='done'>allChecked</p>}
          <ul>
          {title.items.map((item : checkListItems, childIndex) =>
          <li className='listItem'
          key={item.id}>
          <input type='checkbox' value={item.id} onChange={ (e) => dispatch({type:'TOGGLE_BOX', payload: {groupIndex: parentIndex, itemIndex: childIndex, checked: e.target.checked} })}/>
          {item.text}
          </li>)}
          </ul>
        </div>)}
    </section>
  )
}
