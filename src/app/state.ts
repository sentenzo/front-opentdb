import { OpenTdbDataQuestion } from "./opentdb";

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

export type QQuestion = {
    text: string,
    options: string[],
    correct_option_index: number,
    difficulty: QQDifficalty,
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
                const options: string[] = [];
                const correct_option: number = Math.floor(
                    Math.random() * (question.incorrect_answers.length + 1));
                for (const incorrect_answer of question.incorrect_answers) {
                    if (options.length === correct_option) {
                        options.push(question.correct_answer);
                    }
                    options.push(incorrect_answer);
                }
                const qq: QQuestion = {
                    text: question.question,
                    difficulty: (QQDifficalty as any)[question.difficulty],
                    options: options,
                    correct_option_index: correct_option,
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

