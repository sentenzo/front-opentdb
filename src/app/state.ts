enum QuizStage {
    Intro,
    Quiz,
    Results
}

class QuizState {
    stage: QuizStage = QuizStage.Intro;

    // constructor(message: string) {
    //     this.greeting = message;
    // }
}

// let greeter = new Greeter("world");

export { QuizState, QuizStage };