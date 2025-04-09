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
  data: listObject[] | null
}

type action =
  | {type: 'FETCH_SUCCESS', payload: listObject[]}
  | { type: 'TOGGLE_BOX'; payload: { groupIndex: number; itemIndex: number; checked: boolean } };



function reducer(state:state, action:action){
  switch(action.type){
    case 'FETCH_SUCCESS':
    return {...state, loading: false, data: action.payload}

    case 'TOGGLE_BOX':{
      const {groupIndex, itemIndex, checked} = action.payload;

      if(state.data){
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
      else {
        return state
      }
    }

    default: return state
  }
}

export default function WcagChecklist() {

  const initialState = {
    loading: true,
    data: null
  }

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

  const [openGroupIndex, setOpenGroupIndex] = useState<number[]>([])

  function toggleDisplayed(index:number){
    if(openGroupIndex.some(number => number === index)){
      const newArray = openGroupIndex.filter(number => number !== index)
      setOpenGroupIndex(newArray)
    } else{
      setOpenGroupIndex([...openGroupIndex, index])
    }

  }

  return (
    <section>
      {state.data?.map((title:listObject, parentIndex : number) =>
        <div className='listTitle'
        key={title.title}>
          <h4>{title.title}</h4>
          {title.allChecked && <p className='done'>allChecked</p>}
          <button className='toggleButton' onClick={()=>toggleDisplayed(parentIndex)}>Toggle</button>
          {openGroupIndex.includes(parentIndex) && <ul>
          {title.items.map((item : checkListItems, childIndex) =>
          <li className='listItem'
          key={item.id}>
          <input type='checkbox' value={item.id} onChange={ (e) => dispatch({type:'TOGGLE_BOX', payload: {groupIndex: parentIndex, itemIndex: childIndex, checked: e.target.checked} })}/>
          {item.text}
          </li>)}
          </ul>}
        </div>)}
    </section>
  )
}
