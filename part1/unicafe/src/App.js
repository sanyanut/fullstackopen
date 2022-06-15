import { useState } from 'react'

import Button from './Button'
import Statistics from './Statistics';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = good * 100 / all;

  const setGoodHandler = (newValue) => () => {
    setGood(newValue)
  }

  const setNeutralHandler = (newValue) => () => {
    setNeutral(newValue)
  }

  const setBadHandler = (newValue) => () => {
    setBad(newValue)
  }

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <Button name={'good'} onClick={setGoodHandler(good + 1)}/>
        <Button name={'neutral'} onClick={setNeutralHandler(neutral + 1)}/>
        <Button name={'bad'} onClick={setBadHandler(bad + 1)}/>
      </div>
      <Statistics 
        good={good} 
        bad={bad} 
        neutral={neutral}
        positive={positive.toFixed(2)}
        average={average.toFixed(2)}
        all={all}  
      />
    </div>
  )
}

export default App
