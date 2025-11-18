function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
    return (
        <header className="progress">
            <progress 
            className="progress__bar"
            max={numQuestions}
            value={index + (answer !== null ? 1 : 0)}
            ></progress>
            <p><strong>Question</strong>/{index + 1} of 
            {numQuestions}
            </p>
            <p><strong>Points</strong> / {maxPossiblePoints}</p>
        </header>
    );
}

export default Progress
