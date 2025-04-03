import React, { useState } from 'react'

interface rgb {R:number, G:number, B: number}

export default function ContrastChecker() {


  const [color1, setColor1] = useState('#FFFFFF')
  const [color2, setColor2] = useState('#000000')

  const hexToRgb = (hex:string) => {
    const clean = hex.replace('#', '')
    const bigint = parseInt(clean, 16)
    return{
      R:(bigint>>16) & 255,
      G: (bigint >> 8) & 255,
      B: bigint & 255
    }
  }

  const getLuminance = (color:rgb) => {
    const rNorm = color.R / 255
    const gNorm = color.G / 255
    const bNorm = color.B / 255

    const linear = (color: number) =>
      color <= 0.03928
      ? color / 12.92
      : Math.pow((color + 0.055) / 1.055, 2.4);


    const R = linear(rNorm)
    const G = linear(gNorm)
    const B = linear(bNorm)

    const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;
    return luminance
  }

  const getContrast = (lum1:number, lum2:number) => {
    const [lighter, darker] = lum1 > lum2 ? [lum1, lum2] : [lum2, lum1];
    return (lighter + 0.05) / (darker + 0.05);
  }

  const checkContrast = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    const c1 = hexToRgb(color1)
    const c2 = hexToRgb(color2)

    const c1Lum = getLuminance(c1)
    const c2Lum = getLuminance(c2)

    const contrast = getContrast(c1Lum, c2Lum)
    console.log(contrast)
  }

  return (
    <section>
    <div>ContrastChecker</div>
    <form onSubmit={checkContrast}>
      <input
      type='color'
      value={color1}
      onChange={(event)=>setColor1(event.target.value)}
      />

      <input
      type='color'
      value={color2}
      onChange={(event) => setColor2(event.target.value)}
      />

      <button type='submit'>Check contrast</button>

      <p>{color1}</p>
      <p>{color2}</p>
    </form>
    </section>
  )
}
