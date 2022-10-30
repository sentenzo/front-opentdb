import React from 'react';
import Intro from './intro/Intro';
import Quiz from './quiz/Quiz';
import Question from './quiz/question/Question';

import { get_init_state, mutate, QStage } from './state';

import "./style.scss"


function App() {
  const [quiz_state, set_quiz_state] = React.useState(get_init_state());
  const launch_new_quiz = () => set_quiz_state(state => mutate.start_quiz(state));
  const check_quiz = () => set_quiz_state(state => mutate.check_quiz(state));
  return (
    <div className="app">
      <div className='content'>
        {
          quiz_state.stage === QStage.Intro
            ?
            <Intro launch_new_quiz={launch_new_quiz} />
            :
            <Quiz />
        }
      </div>
    </div>
  );
}

export default App;
