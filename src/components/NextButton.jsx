function NextButton({ dispatch, answer, index, numQst }) {
  if (answer === null) return null
  if (index < numQst - 1) return (
    <button className="btn btn-ui"
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      Next
    </button>
  )

  if (index === numQst - 1) return (
    <button className="btn btn-ui"
      onClick={() => dispatch({ type: 'finish' })}
    >
      Finish
    </button>
  )
}

export default NextButton
