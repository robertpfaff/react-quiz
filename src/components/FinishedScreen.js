function FinishedScreen({ points, maxPossiblePoints, highscore, dispatch }) {
    const percentage = Math.round((points / maxPossiblePoints) * 100);  

    let emoji;
    if (percentage === 100) emoji = '🥇';
    else if (percentage >= 80) emoji = '🎉';
    else if (percentage >= 50) emoji = '😊';
    else if (percentage > 0) emoji = '🤔';
    else emoji = '🤦‍♂️';

    return (
        <>
        <div className="result">
            <h2>Quiz Finished!</h2>
            <p>
                <span>{emoji}</span> You scored <strong>{points}</strong> out of{' '}
                <strong>{maxPossiblePoints}</strong> ({percentage}%) points.
            </p>
            <p className="highscore">
                <span>🏆</span> Highscore: {highscore} points
            </p>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: 'restart' })}
            >
                Restart Quiz
            </button>
        </div>
        </>
    );
}

export default FinishedScreen;