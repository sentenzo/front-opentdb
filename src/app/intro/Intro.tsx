// import { QuizState } from "../state";
import "./style.scss"

const Intro = () => (
    <div className="intro">
        <h1>Random quiz generator</h1>
        <div className="description">
            <p>To start a quiz of five randomly generated questions, </p>
            <p>click the button below</p>
            <p>↓</p>
        </div>
        <button>Start quiz</button>
    </div>
);

export default Intro;