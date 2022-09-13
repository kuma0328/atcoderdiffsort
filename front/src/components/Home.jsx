import { useState } from 'react'
import ShowPloblem from './ShowPloblem'
import GetOption from './GetOption'
import ACcount from './ACcount'

const Home = () => {
  const [ploblem, setPloblem] = useState([])

  return (
    <>
      <GetOption 
      setPloblem={setPloblem}
      />
      <ACcount 
      ploblem={ploblem}
      />
      <ShowPloblem 
      ploblem={ploblem}
      />
    </>
  )
}

export default Home
