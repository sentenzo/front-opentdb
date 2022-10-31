import React from 'react';
import Intro from './intro/Intro';
import Quiz from './quiz/Quiz';
import { OpenTdb } from './opentdb';

import { get_init_state, mutate, QStage } from './state';

import "./style.scss"


function App() {
  const [quiz_state, set_quiz_state] = React.useState(get_init_state());
  const launch_new_quiz = () => {
    set_quiz_state(state => mutate.start_quiz(state));
  };
  React.useEffect(() => {
    if (quiz_state.stage === QStage.Quiz && quiz_state.questions.length === 0) {
      OpenTdb.provide_data(mutate.get_opentdb_consumer(set_quiz_state));
    }
  }, [quiz_state]);

  const check_quiz = () => set_quiz_state(state => mutate.check_quiz(state));

  return (
    <div className="app">
      <div className='content'>
        {
          quiz_state.stage === QStage.Intro
            ?
            <Intro launch_new_quiz={launch_new_quiz} />
            :
            <Quiz
              quiz_state={quiz_state}
              launch_new_quiz={launch_new_quiz}
              check_quiz={check_quiz}
            />
        }
      </div>
    </div>
  );
}

export default App;
