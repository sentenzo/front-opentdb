import Question from "./question/Question"
import "./style.scss"

const Quiz = ({ questions_count = 5 }) => {
    const questions = Array.apply(null, Array(questions_count))
        .map(i => <Question />);

    return (
        <div className="quiz">
            {questions}
            <div>
                <p>You scored 3/5 correct answers</p>
                <button>Check answers</button>
            </div>
        </div>
    )
}

export default Quiz;