import React from 'react';
import QuestionNavigator from './QuestionNavigator';
import '../style/QuizCard.css';
import CheckIcon from '../assets/Check_round_fill.svg';
import CloseIcon from '../assets/Close_round_fill.svg';

const QuizCard = ({ 
    totalQuestions, 
    flagImage, 
    options, 
    selectedAnswer, 
    correctAnswer, 
    onAnswerSelect, 
    showResult,
    currentQuestionIndex,
    answeredQuestions,
    onQuestionSelect 
}) => {
    return (
        <div className="quiz-card">
            {/* Question Navigator */}
            <QuestionNavigator
                totalQuestions={totalQuestions}
                currentQuestionIndex={currentQuestionIndex}
                answeredQuestions={answeredQuestions}
                onQuestionSelect={onQuestionSelect}
            />

            {/* Question section */}
            <div className="question-section">
                <div className="question-header">
                    <span className="question-counter">
                        Pregunta {currentQuestionIndex + 1} de {totalQuestions}
                    </span>
                </div>
                <h2 className="question-title">
                    <div className="question-line-1">
                        Which country does this flag{' '}
                        {flagImage && (
                            <img 
                                src={flagImage} 
                                alt="Country flag" 
                                className="flag-inline"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        )}
                        {' '}belong
                    </div>
                    <div className="question-line-2">
                        to?
                    </div>
                </h2>
            </div>

            {/* Options section */}
            <div className="options-section">
                {options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === correctAnswer;
                    
                    let optionClass = 'option-button';
                    
                    // Siempre agregar la clase 'selected' si fue seleccionada
                    if (isSelected) {
                        optionClass += ' selected';
                    }

                    return (
                        <button
                            key={index}
                            className={optionClass}
                            onClick={() => !showResult && onAnswerSelect(option)}
                            disabled={showResult}
                        >
                            <span className="option-letter">
                                {String.fromCharCode(65 + index)}
                            </span>
                            <span className="option-text">{option}</span>
                            
                            {/* Result icons */}
                            {showResult && (isCorrect || isSelected) && (
                                <img 
                                    src={isCorrect ? CheckIcon : CloseIcon} 
                                    alt={isCorrect ? 'Correct' : 'Incorrect'}
                                    className="result-icon"
                                />
                            )}
                        </button>
                    );
                })}
            </div>


        </div>
    );
};

export default QuizCard;