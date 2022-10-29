import React from 'react';
import Intro from './intro/Intro';
import Quiz from './quiz/Quiz';
import Question from './quiz/question/Question';

import { QuizState, QuizStage } from './state';

import "./style.scss"


function App() {
  const [quiz_stage, set_quiz_stage] = React.useState(new QuizState());
  return (
    <div className="app">
      <div className='content'>
        {/* <Question /> */}
        {
          quiz_stage.stage === QuizStage.Intro
            ?
            <Intro />
            :
            <Quiz />
        }
      </div>
    </div>
  );
}

export default App;
