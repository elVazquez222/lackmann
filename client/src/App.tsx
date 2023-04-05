import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect( () => {
  }, [])

  return (
    <div className="App">
      <form>
        <label htmlFor="dies">Dies</label>
        <input id="dies" />
      </form>
    </div>
  )
}

export default App
