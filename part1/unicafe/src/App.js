import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td> {value} </td></tr>

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad || 0;
    const average = (good - bad) / total || 0;
    const positive = (good / total) * 100 || 0;

    if (total === 0) {
        return <div>No feedback given</div>;
    } else {
        return (
            <table>
                <tbody>
                    <StatisticLine text={"good"} value={good} />
                    <StatisticLine text={"neutral"} value={neutral} />
                    <StatisticLine text={"bad"} value={bad} />
                    <StatisticLine text={"all"} value={total} />
                    <StatisticLine text={"average"} value={average} />
                    <StatisticLine text={"positive"} value={positive + " %"} />
                </tbody>
            </table>
        )
    }
}

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