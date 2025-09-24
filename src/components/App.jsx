import { useEffect } from "react";
import backgroundImage from "../assets/bg.jpg";
import Congrats from "./Congrats";
import Header from "./Header";
import QuizCard from "./QuizCard";
import Button from "./Button";
import Loading from "./Loading";
import { useQuiz } from "../services/quizService";

const App = () => {
    const {
        gameState,
        quizData,
        handleAnswer,
        goToQuestion,
        restartGame,
        currentQuestion
    } = useQuiz();

    useEffect(() => {
        document.body.style.backgroundImage = `url(${backgroundImage})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundPosition = "center";
    }, []);

    // Loading state
    if (gameState.isLoading) {
        return <Loading message="Cargando preguntas del quiz..." />;
    }

    // Error state
    if (gameState.error) {
        return (
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                color: 'white',
                textAlign: 'center',
                fontFamily: '"Be Vietnam Pro", sans-serif'
            }}>
                <h2>Error loading quiz</h2>
                <p>{gameState.error}</p>
                <Button
                    onClick={restartGame}
                    variant="primary"
                    size="medium"
                    className="try-again-button"
                >
                    Try Again
                </Button>
            </div>
        );
    }

    // Quiz finished - show results
    if (gameState.isFinished) {
        return (
            <>
                <Header 
                    currentPoints={quizData.score} 
                    totalPoints={quizData.questions.length}
                />
                <Congrats 
                    correctAnswer={quizData.score}
                    totalAnswer={quizData.questions.length}
                    onPlayAgain={restartGame}
                />
            </>
        );
    }

    // Playing - show current question
    if (gameState.isPlaying && currentQuestion) {
        return (
            <>
                <Header 
                    currentPoints={quizData.score} 
                    totalPoints={quizData.questions.length}
                />
                
                <QuizCard 
                    currentQuestion={quizData.currentQuestionIndex + 1}
                    totalQuestions={quizData.questions.length}
                    flagImage={currentQuestion.flagImage}
                    options={currentQuestion.options}
                    selectedAnswer={quizData.answers[quizData.currentQuestionIndex]?.selectedAnswer}
                    correctAnswer={currentQuestion.correctAnswer}
                    onAnswerSelect={handleAnswer}
                    showResult={quizData.showResult}
                    currentQuestionIndex={quizData.currentQuestionIndex}
                    answeredQuestions={quizData.answers.reduce((acc, answer, index) => {
                        if (answer) acc.push(index);
                        return acc;
                    }, [])}
                    onQuestionSelect={goToQuestion}
                />


            </>
        );
    }

    return null;
};

export default App;