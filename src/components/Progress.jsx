function Progress({ index, numQst, points, maxPoints, answer }) {
  return (
    <header className="progress">

      <progress max={numQst} value={index + Number(answer !== null)} />


      <p>Question <strong>{index + 1}</strong> / {numQst} </p>

      <p><strong>{points}</strong> / {maxPoints}</p>

    </header>
  )
}

export default Progress
