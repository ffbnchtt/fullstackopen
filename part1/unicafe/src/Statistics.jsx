import StatisticLine from "./StatisticLine ";
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
export default Statistics;