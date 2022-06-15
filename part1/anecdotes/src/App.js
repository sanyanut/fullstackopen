import { useState } from 'react'

const Button = ({name, onClick}) => {
  return (
    <button onClick={onClick}>{name}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  });
  
  const selectedVoteValue = votes[selected];

  const maxVotedAnecdot = Object.keys(votes).reduce((a,b) => votes[a] > votes[b] ? a : b);
  //Math.max(...Object.values(votes))

  const handleRandomAnecdote = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length));
  }

  const handleAddVote = (selected) => {
    const newVotes = {
        ...votes,
        [selected]: selectedVoteValue + 1
    }
    setVotes(newVotes);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      <Button name='next anecdote' onClick={handleRandomAnecdote} />
      <Button name='vote' onClick={() => handleAddVote(selected)}/>
      <p>has {votes[selected]} votes</p>
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxVotedAnecdot]}
    </div>
  )
}

export default App