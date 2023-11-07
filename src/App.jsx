import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import Start from './components/Start'
import Question from './components/Question'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import Finished from './components/Finished'
import ResetButton from './components/ResetButton'
import Timer from './components/Timer'



const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timer: null,
}

const SECS_PER_QST = 30

function reducer(state, action) {

  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }

    case 'dataFailed':
      return { ...state, status: 'error' };

    case 'start':
      return { ...state, status: 'active', timer: state.questions.length * SECS_PER_QST };

    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points
      };

    case 'nextQuestion': return { ...state, index: state.index + 1, answer: null }

    case 'finish': return { ...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore }

    case 'reset': return {
      ...state, index: 0, answer: null, points: 0, highscore: 0, status: 'ready'
    }

    case 'timer': return { ...state, timer: state.timer - 1, status: state.timer === 0 ? 'finished' : state.status }

    default: throw new Error('Unknown action')
  }
}

export default function App() {

  const [{ questions, status, index, answer, points, highscore, timer }, dispatch] = useReducer(reducer, initialState)

  const numQst = questions.length

  const maxPoints = questions.reduce((pre, cur) => pre + cur.points, 0)


  useEffect(function () {

    fetch('http://localhost:9000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' }))
  }, [])



  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <Start numQst={numQst} dispatch={dispatch} />}
        {status === 'active' &&
          <>
            <Progress index={index} numQst={numQst} points={points} maxPoints={maxPoints} answer={answer} />
            <Question question={questions[index]}
              dispatch={dispatch} answer={answer} />
            <footer>
              <Timer timer={timer} dispatch={dispatch} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQst={numQst} />
            </footer>
          </>
        }

        {status === 'finished' &&
          <>
            <Finished points={points} maxPoints={maxPoints} highscore={highscore} />
            <ResetButton dispatch={dispatch} />
          </>
        }

      </Main>

    </div>
  )
}