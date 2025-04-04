import React from 'react'
import {useState} from 'react'

function PxToRem() {
  const [pixels, setPixels] = useState('0')
  const [rem, setRem] = useState('0')

  const handlePixelChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const px = Number(event.target.value)
    const r = px/16
    setPixels(String(px))
    setRem(String(r))
  }

  const handleRemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const r = Number(event.target.value)
    const px = r*16
    setRem(String(r))
    setPixels(String(px))
  }

  return (
    <section>
      <label>
        <p>Pixels</p>
        <input
        id='pixels'
        type='number'
        inputMode='numeric'
        name='pixels'
        onChange={handlePixelChange}
        value={pixels}
        />
      </label>

      <label>
        <p>Rem</p>
        <input
        id='rem'
        type='number'
        inputMode='numeric'
        name='rems'
        onChange={handleRemChange}
        value={rem}
        />
      </label>
    </section>
  )
}

export default PxToRem
