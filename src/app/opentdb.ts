import he from "he";

type OpenTdbData = {
    response_code: number,
    results: OpenTdbDataQuestion[]
}

export type OpenTdbDataQuestion = {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

export class OpenTdb {
    static root: string = "https://opentdb.com/api.php"
    static provide_data(consumer: (questions: OpenTdbDataQuestion[]) => void, amount: number = 5) {
        fetch(`${this.root}?amount=${amount}`)
            .then((response) => response.json())
            .then((data: OpenTdbData) => data.results)
            .then(questions => questions.map(q => {
                q.question = he.decode(q.question);
                q.correct_answer = he.decode(q.correct_answer);
                q.incorrect_answers = q.incorrect_answers.map(e => he.decode(e));
                return q;
            }))
            .then((questions: OpenTdbDataQuestion[]) => consumer(questions));
    }
}
