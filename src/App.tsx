import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Nullable } from 'primereact/ts-helpers'

function App() {
  const [count, setCount] = useState(0)
  const [date, setDate] = useState<Nullable<Date>>(null);

  return (
    <>
     
      <Button label='Prueba'></Button>
      <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
    </>
  )
}

export default App
