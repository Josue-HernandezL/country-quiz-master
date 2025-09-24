import React from 'react';
import '../style/Loading.css';

const Loading = ({ message = "Cargando preguntas..." }) => {
    return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="loading-spinner">
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                </div>
                <h2 className="loading-title">Country Quiz</h2>
                <p className="loading-message">{message}</p>
            </div>
        </div>
    );
};

export default Loading;