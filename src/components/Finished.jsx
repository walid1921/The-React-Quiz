function Finished({ points, maxPoints, highscore }) {

  const percentage = (points / maxPoints) * 100


  return (
    <div className="start">
      <h2>The Quiz is finished</h2>
      <p className="result">You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)</p>

      <p className="highscore">(Highscore: {highscore} points)</p>

    </div>
  )
}

export default Finished
