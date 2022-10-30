// import { QuizState } from "../state";
import "./style.scss"

type IntroProps = {
    launch_new_quiz: () => void
}

const Intro = ({ launch_new_quiz }: IntroProps) => (
    <div className="intro">
        <h1>Random quiz generator</h1>
        <div className="description">
            <p>To start a quiz of five randomly generated questions, </p>
            <p>click the button below</p>
            <p>↓</p>
        </div>
        <button
            onClick={(e) => { e.preventDefault(); launch_new_quiz(); }}
        >Start quiz</button>
    </div>
);

export default Intro;