import opentdb_data from "../data";

export enum QStage {
    Intro,
    Quiz,
    Results
}

export enum QQDifficalty {
    Easy,
    Medium,
    Hard,
}

export type QQuestion = {
    text: string,
    correct_answer: string,
    incorrect_answers: string[],
    users_answer?: string,
    difficulty: QQDifficalty,
}
export type QState = {
    stage: QStage,
    questions: QQuestion[],
}

export const get_init_state = (): QState => ({ stage: QStage.Intro, questions: [] });

const get_opentdb_data = () => {
    return opentdb_data.results;
};
export class mutate {
    static start_quiz(state: QState): QState {
        return {
            stage: QStage.Quiz,
            questions: [
                {
                    text: "In the TV show &#039;M*A*S*H&#039;, what was the nickname of Corporal Walter O&#039;Reilly?",
                    correct_answer: "Radar",
                    incorrect_answers: [
                        "Hawkeye",
                        "Hot Lips",
                        "Trapper"
                    ],
                    difficulty: QQDifficalty.Easy
                },
                {
                    text: "In the 1984 movie &quot;The Terminator&quot;, what model number is the Terminator portrayed by Arnold Schwarzenegger?",
                    correct_answer: "T-800",
                    incorrect_answers: [
                        "I-950",
                        "T-888",
                        "T-1000"
                    ],
                    difficulty: QQDifficalty.Medium
                }
            ]
        }
    }

    static check_quiz(state: QState): QState {
        const new_state: QState = { ...state, stage: QStage.Results };
        return new_state;
    }

}

