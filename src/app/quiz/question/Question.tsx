import { nanoid } from "nanoid";
import "./style.scss"

import { decodeHTMLEntities } from "../../misc"

type QuestionProps = {
    question: string,
    options: string[],
    on_check: (answer: string) => void,
}


const Question = ({ question, options, on_check }: QuestionProps) => {
    const qname = nanoid();
    const opts = [];

    for (const text of options) {
        const opt_id = nanoid();
        opts.push(<input
            key={`i_${opt_id}`}
            type="radio"
            name={qname}
            id={opt_id}
            onChange={(e) => { console.log(opt_id); on_check(text) }}
        />);
        opts.push(<label
            key={`l_${opt_id}`}
            htmlFor={opt_id}
        >{decodeHTMLEntities(text)}</label >);
    }
    return (
        <div className="question">
            <h3>
                {question}
            </h3>
            <div className="options">
                {opts}
            </div>
        </div>
    )

};

export default Question;