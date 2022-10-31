import { OpenTdbDataQuestion } from "./opentdb";

// https://stackoverflow.com/a/41548441/2493536
function enumFromStringValue<T>(enm: { [s: string]: T }, value: string): T | undefined {
    return (Object.values(enm) as unknown as string[]).includes(value)
        ? value as unknown as T
        : undefined;
}

export enum QStage {
    Intro,
    Quiz,
    Results
}

export enum QQDifficalty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard",
}
export enum QQType {
    Boolean = "boolean",
    Multiple = "multiple",
}

export type QQuestion = {
    text: string,
    options: string[],
    correct_option_index: number,
    difficulty: QQDifficalty,
    questions_type: QQType,
}
export type QState = {
    stage: QStage,
    questions: QQuestion[],
}

export const get_init_state = (): QState => ({ stage: QStage.Intro, questions: [] });


export class mutate {
    static get_opentdb_consumer(state_changer: (func: (state: QState) => QState) => void) {
        return (questions: OpenTdbDataQuestion[]) => {
            const new_questions = questions.map(question => {
                const qtype: QQType = enumFromStringValue(QQType, question.type) || QQType.Multiple;
                console.log(question.type);
                let correct_option: number = 0;
                const options: string[] = [];
                if (qtype === QQType.Boolean
                    && ["True", "False"].indexOf(question.correct_answer) >= 0) {
                    options.push("True");
                    options.push("False");
                    correct_option = options.indexOf(question.correct_answer)
                } else {
                    correct_option = Math.floor(
                        Math.random() * (question.incorrect_answers.length + 1));
                    for (const incorrect_answer of question.incorrect_answers) {
                        if (options.length === correct_option) {
                            options.push(question.correct_answer);
                        }
                        options.push(incorrect_answer);
                    }
                    if (correct_option === options.length) {
                        options.push(question.correct_answer);
                    }
                }

                const qq: QQuestion = {
                    text: question.question,
                    difficulty: enumFromStringValue(QQDifficalty, question.difficulty) || QQDifficalty.Medium,
                    options: options,
                    correct_option_index: correct_option,
                    questions_type: qtype,
                };
                return qq;
            });
            state_changer((old_state: QState) => ({
                ...old_state,
                questions: new_questions,
            }));
        };
    }
    static start_quiz(state: QState): QState {
        return {
            stage: QStage.Quiz,
            questions: []
        }
    }

    static check_quiz(state: QState): QState {
        const new_state: QState = { ...state, stage: QStage.Results };
        return new_state;
    }

}

