//////////////////////
// https://stackoverflow.com/a/41791818/2493536
const entities: { [key: string]: string } = {
    'amp': '&',
    'apos': '\'',
    '#x27': '\'',
    '#x2F': '/',
    '#39': '\'',
    '#039': '\'',
    '#47': '/',
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'quot': '"'
}

export function decodeHTMLEntities(text: string) {
    return text.replace(/&([^;]+);/gm, function (match, entity) {
        return entities[entity] || match
    });
}
//////////////////////

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
                q.question = decodeHTMLEntities(q.question);
                q.correct_answer = decodeHTMLEntities(q.correct_answer);
                q.incorrect_answers = q.incorrect_answers.map(decodeHTMLEntities);
                return q;
            }))
            .then((questions: OpenTdbDataQuestion[]) => consumer(questions));
    }
}
