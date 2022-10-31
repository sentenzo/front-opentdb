import { nanoid } from "nanoid";
import "./style.scss"

type QuestionProps = {
    question: string,
    options: string[],
    on_check: (answer: number) => void,
    checked?: number,
    correct_index?: number,
}


const Question = ({ question, options, on_check, checked, correct_index }: QuestionProps) => {
    const qname = nanoid();
    const opts = [];

    for (let index = 0; index < options.length; index += 1) {
        const opt_id = nanoid();
        const text: string = options[index];
        opts.push(<input
            key={`i_${opt_id}`}
            type="radio"
            name={qname}
            id={opt_id}
            onChange={(e) => { on_check(index) }}
            checked={checked === index}
            className={
                correct_index === index
                    ?
                    "correct"
                    :
                    ""
            }
            disabled={correct_index !== undefined}
        />);
        opts.push(<label
            key={`l_${opt_id}`}
            htmlFor={opt_id}
        >{text}</label >);
    }
    return (
        <div className={correct_index === undefined ? "question" : "question verification"}>
            <h3>
                {question}
            </h3>
            <div className="options">
                {opts}
            </div>
        </div >
    )

};

export default Question;