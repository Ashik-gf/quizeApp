export function calculateResults(submittedAnswers, correctAnswers) {
    let correctCount = 0;
    let wrongCount = 0;
    const correctAnswersArray = [];
    const wrongAnswersSet = new Set(); // Use a Set to store unique wrong answers

    submittedAnswers.forEach((submittedAnswer) => {
        const correctAnswer = correctAnswers.find(
            (correctAnswer) => correctAnswer.question_id === submittedAnswer.question_id
        );
        if (correctAnswer && correctAnswer.answer === submittedAnswer.answer) {
            correctAnswersArray.push(submittedAnswer.answer);
        } else {
            wrongAnswersSet.add(submittedAnswer.answer); // Add to the Set
        }
    });

    // Convert the Set to an array
    const wrongAnswersArray = Array.from(wrongAnswersSet);

    return {
        correctAnswersArray,
        wrongAnswersArray,
    };
}