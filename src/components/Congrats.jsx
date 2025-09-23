import imgCongrats from "../assets/congrats.png"
import "../style/Congrats.css"

const Congrats = ({ correctAnswer, totalAnswer, onPlayAgain }) => {
    return (
        <div className="congrats-overlay">
            <div className="congrats-card">
                <div className="congrats-content">
                    <img className="congrats-image" src={imgCongrats} alt="Congratulations" />
                    
                    <h2 className="congrats-title">
                        Congrats! You completed<br />the quiz.
                    </h2>
                    
                    <p className="congrats-score">
                        You answer {correctAnswer}/{totalAnswer} correctly
                    </p>
                </div>
                
                <button 
                    className="play-again-button" 
                    onClick={onPlayAgain}
                    type="button"
                >
                    Play again
                </button>
            </div>
        </div>
    )
}

export default Congrats;