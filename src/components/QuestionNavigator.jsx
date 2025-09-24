import React from 'react';
import '../style/QuestionNavigator.css';

const QuestionNavigator = ({ 
    totalQuestions, 
    currentQuestionIndex, 
    answeredQuestions, 
    onQuestionSelect 
}) => {
    const generateQuestionNumbers = () => {
        return Array.from({ length: totalQuestions }, (_, index) => {
            const questionNumber = index + 1;
            const isActive = index === currentQuestionIndex;
            const isAnswered = answeredQuestions.includes(index);
            
            return (
                <button
                    key={index}
                    className={`question-number ${isActive ? 'active' : ''} ${isAnswered ? 'answered' : ''}`}
                    onClick={() => onQuestionSelect(index)}
                >
                    {questionNumber}
                </button>
            );
        });
    };

    return (
        <div className="question-navigator">
            {generateQuestionNumbers()}
        </div>
    );
};

export default QuestionNavigator;