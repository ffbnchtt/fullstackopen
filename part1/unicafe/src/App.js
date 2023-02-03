import { useState } from 'react'
import Header from "./Header";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
    const [good, setGoodValue] = useState(0);
    const [neutral, setNeutralValue] = useState(0);
    const [bad, setBadValue] = useState(0);

    const handleGood = (value) => setGoodValue(value)
    const handleNeutral = (value) => setNeutralValue(value)
    const handleBad = (value) => setBadValue(value)

    return (
        <div>
            <Header text="give feedback" />
            <Button text={"good"} handleClick={() => handleGood(good + 1)} />
            <Button text={"neutral"} handleClick={() => handleNeutral(neutral + 1)} />
            <Button text={"bad"} handleClick={() => handleBad(bad + 1)} />
            <Header text="statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App