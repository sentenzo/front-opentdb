
import React from "react";
import Question from "./question/Question"
import "./style.scss"
import { nanoid } from "nanoid";
import { QState } from "../state";

type QuizProps = {
    quiz_state: QState,
    launch_new_quiz: () => void,
    check_quiz: (answers: string[]) => void,
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
            />
        );
    });

    return (
        <div className="quiz">
            {questions}
            {questions.length > 0 && <div className="quiz-footer">
                <p className="status-line">You scored 3/5 correct answers</p>
                <button>Check answers</button>
            </div>
            }
        </div>
    )
}

export default Quiz;