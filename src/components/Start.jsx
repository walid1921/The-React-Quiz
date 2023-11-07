function Start({ numQst, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The Rect Quiz!</h2>
      <p>{numQst} question to test your React mastery</p>
      <button className="btn btn-ui mt-12" onClick={() => dispatch({ type: 'start' })}>Start</button>
    </div>
  )
}

export default Start
