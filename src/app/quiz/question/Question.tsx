import { nanoid } from "nanoid";
import "./style.scss"

const Question = () => {
    const qname = nanoid();
    return (
        <div className="question">
            <h3>
                Question text?
            </h3>
            <div className="options">
                <input type="radio" name={qname} id={`q1_${qname}`} />
                <label htmlFor={`q1_${qname}`}>option 1</label>
                <input type="radio" name={qname} id={`q2_${qname}`} />
                <label htmlFor={`q2_${qname}`}>option 2</label>
                <input type="radio" name={qname} id={`q3_${qname}`} />
                <label htmlFor={`q3_${qname}`}>option 3</label>
                <input type="radio" name={qname} id={`q4_${qname}`} />
                <label htmlFor={`q4_${qname}`}>option 4</label>
            </div>
        </div>
    )

};

export default Question;