
import React from "react";
import Question from "./question/Question"
import "./style.scss"
import { nanoid } from "nanoid";
import { QState } from "../state";
import { decodeHTMLEntities } from "../misc"

type QuizProps = {
    quiz_state: QState,
    launch_new_quiz: () => void,
    check_quiz: (answers: string[]) => void,
}

const Quiz = ({ quiz_state, launch_new_quiz, check_quiz }: QuizProps) => {

    // const questions = Array.apply(null, Array(5))
    //     .map(i => <Question
    //         key={nanoid()}
    //         question="Question text???"
    //         options={["option 1", "option 22", "option 3", "option 4"]}
    //         on_check={on_check}
    //     />);

    const questions_qount = quiz_state.questions.length;
    const [answers, set_answers] = React.useState(Array.apply(null, Array(questions_qount)));
    const on_check = (question_index: number) =>
        (answer: string) =>
            set_answers(anss => {
                const new_answers = [...anss];
                new_answers[question_index] = answer;
                return new_answers
            }
            );
    const questions = quiz_state.questions.map((q, q_index) => {
        const options: string[] = [];
        const correct_index = Math.floor(Math.random() * (q.incorrect_answers.length + 1));
        for (const incorrect of q.incorrect_answers) {
            if (options.length === correct_index) {
                options.push(q.correct_answer);
            }
            options.push(incorrect);
        }
        return (
            <Question
                key={nanoid()}
                question={decodeHTMLEntities(q.text)}
                options={options}
                on_check={on_check(q_index)}
            />
        );
    });

    return (
        <div className="quiz">
            {questions}
            <div className="quiz-footer">
                <p className="status-line">You scored 3/5 correct answers</p>
                <button>Check answers</button>
            </div>
        </div>
    )
}

export default Quiz;