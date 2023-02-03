import Statistic from "./Statistic";
const Statistics = ({ statistics }) => {
    const total = statistics.good + statistics.neutral + statistics.bad;
    const average = 0 / total;
    const positive = statistics.good * 1 + statistics.bad * -1; //test
    return (
        <div>
            <Statistic text={"good"} value={statistics.good} />
            <Statistic text={"neutral"} value={statistics.neutral} />
            <Statistic text={"bad"} value={statistics.bad} />
            <Statistic text={"all"} value={total} />
            <Statistic text={"average"} value={average} />
            <Statistic text={"positive"} value={positive} />
        </div>
    )
}

export default Statistics;