import React, { useEffect } from 'react';
import Header from './Header';
import Main from './main'; // Add this import
import Loader from './Loader';
import Error from './Error';
import StartScreen from './startScreen';
import Question from './Question';
import NextButton from './nextButton';
import Progress from './Progress';
import FinishedScreen from './FinishedScreen';
import Footer from './Footer';
import Timer from './Timer';

/* Recap of Reducer Function Structure

1. Installed json-server package to create fake API
2. Created npm script in package.json to run json-server
3. Use useEffect to fetch data on initial render
4. Use useReducer hook to store data in state and manage state and dispatch actions
5. Define initial state and reducer function

*/

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

// 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  // index how we track the current question
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 10,
};

// Then test for type of action with s3witch statement
// Whenever possible, it's best to put logic regarding the calculation of state in the reducer
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      };
    
    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      };
    
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    
    case 'newAnswer':
      const question = state.questions.at(state.index);
    
      if (!question) {
        console.log('Check NewAnswer in reducer. No question found at index', state.index);
        return state;
      }
      
      console.log('Points:', state.points);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
          ? state.points + question.points
          : state.points,
      };
      
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points :
          state.highscore,  
      };

    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
        highscore: state.highscore,
      };

    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
  
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  };
}

export default function App() {

  const [{questions, status, index, answer, points, highscore, secondsRemaining}, dispatch] = React.useReducer(reducer, initialState);

  const numQuestions = questions ? questions.length : 0;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    // dispatch and action to the reducer.
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then((data) => {
        console.log('Fetched data:', data);
        console.log('data is array?', Array.isArray(data));
        dispatch({ type: 'dataReceived', payload: data });
      })
      .catch((error) => dispatch({ type: 'dataFailed', payload: error.message })); 
  }, []);

  return (
    <div className='app'>
     <Header />
    <Main>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' && <StartScreen numQuestions={numQuestions}
      dispatch={dispatch} />}
      {/* React components can only return ONE parent element. If you want to return multiple sibling elements, you need to wrap them. */}
      {status === 'active' && (
      <>
      <Progress index={index} 
      numQuestions={numQuestions} 
      points={points}
      maxPossiblePoints={maxPossiblePoints}
      answer={answer}
      />
      <Question
        question={questions[index]}
        dispatch={dispatch}
        answer={answer} 
        />
        <Footer>
          <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
        <NextButton dispatch={dispatch} 
        answer={answer} 
        numQuestions={numQuestions}
        index={index}
        />
        </Footer>
      </>
      )}
      {status === 'finished' && (
        <FinishedScreen 
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          highscore={highscore}
          dispatch={dispatch}
        />
      )}
    </Main>
    </div>
  );
}

