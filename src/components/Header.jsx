import "../style/Header.css"

const Header = ({ currentPoints, totalPoints }) => {
    return (
        <header className="quiz-header">
            <div className="header-container">
                <h1 className="quiz-title">Country Quiz</h1>
                
                <div className="points-badge">
                    <span className="points-icon">🏆</span>
                    <span className="points-text">
                        {currentPoints}/{totalPoints} Points
                    </span>
                </div>
            </div>
        </header>
    )
}

export default Header