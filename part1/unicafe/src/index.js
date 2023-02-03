import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Header from "./Header";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  const [statistics, setStatistics] = useState({ good: 0, neutral: 0, bad: 0 })

  const handleGood = () => setStatistics({ ...statistics, good: statistics.good + 1 })
  const handleNeutral = () => setStatistics({ ...statistics, neutral: statistics.neutral + 1 })
  const handleBad = () => setStatistics({ ...statistics, bad: statistics.bad + 1 })


  return (
    <div>
      <Header text="give feedback" />
      <Button text={"good"} handleClick={handleGood} />
      <Button text={"neutral"} handleClick={handleNeutral} />
      <Button text={"bad"} handleClick={handleBad} />
      <Header text="statistics" />
      <Statistics statistics={statistics} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)