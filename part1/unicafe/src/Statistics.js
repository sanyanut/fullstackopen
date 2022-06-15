const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, bad, neutral, all, average, positive}) => {
    return (
        <div>
            <h1>statistics</h1>
            {
                all === 0 ? <p>No feedback given</p> : 
                <table>
                    <tbody>
                        <StatisticLine text='good' value={good}/>
                        <StatisticLine text='neutral' value={neutral}/>
                        <StatisticLine text='bad' value={bad} />
                        <StatisticLine text='all' value={all} />
                        <StatisticLine text='average' value={average} />
                        <StatisticLine text='positive' value={positive} />
                    </tbody>
                </table> 
            }
        </div>
    )
}

export default Statistics;