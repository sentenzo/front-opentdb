
import React from "react";
import Question from "./question/Question"
import "./style.scss"
import { nanoid } from "nanoid";
import { QState, QStage } from "../state";

type QuizProps = {
    quiz_state: QState,
    launch_new_quiz: () => void,
    check_quiz: () => void,
}

const Quiz = ({ quiz_state, launch_new_quiz, check_quiz }: QuizProps) => {

    const [answers, set_answers] = React.useState<(number | undefined)[]>(
        Array.from({ length: quiz_state.questions.length }, () => undefined)
    );

    const on_check = (question_index: number) =>
        (option_index: number) =>
            set_answers(anss => {
                const new_answers = [...anss];
                new_answers[question_index] = option_index;
                return new_answers;
            });
    const questions = quiz_state.questions.map((q, q_index) => {
        return (
            <Question
                key={nanoid()}
                question={q.text}
                options={q.options}
                on_check={on_check(q_index)}
                checked={answers[q_index]}
                correct_index={
                    quiz_state.stage === QStage.Results
                        ?
                        q.correct_option_index
                        :
                        undefined
                }
            />
        );
    });

    const get_correct_answers = () => answers
        .map((a, i) => a === quiz_state.questions[i].correct_option_index)
        .filter(x => x).length;
    return (
        <div className="quiz">
            {questions}
            {questions.length > 0 && <div className="quiz-footer">
                {
                    quiz_state.stage === QStage.Results
                        ?
                        <p className="status-line">You scored {get_correct_answers()}/{questions.length} correct answers</p>
                        :
                        null
                }

                <div>
                    <button
                        onClick={(e) => { e.preventDefault(); set_answers([]); launch_new_quiz(); }}
                    >
                        {quiz_state.stage === QStage.Results ? "Start new quiz" : "Relaunch quiz "}
                    </button>
                    {
                        quiz_state.stage === QStage.Results
                            ?
                            null :
                            <button onClick={(e) => { e.preventDefault(); check_quiz() }}>Check answers</button>
                    }
                </div>
            </div>
            }
        </div>
    )
}

export default Quiz;