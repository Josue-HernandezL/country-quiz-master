import axios from 'axios';

// Servicio para manejar la API de países
export const countryService = {
    // Obtener países desde la API
    async fetchCountries() {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags');
            return response.data.map(country => ({
                name: country.name.common,
                flag: country.flags.svg || country.flags.png,
                officialName: country.name.official
            }));
        } catch (error) {
            console.error('Error fetching countries:', error);
            throw new Error('No se pudieron cargar los países');
        }
    },

    // Generar opciones incorrectas aleatorias
    generateWrongOptions(countries, correctAnswer, count = 3) {
        const wrongOptions = countries
            .filter(country => country.name !== correctAnswer)
            .sort(() => Math.random() - 0.5)
            .slice(0, count)
            .map(country => country.name);
        
        return wrongOptions;
    },

    // Generar una pregunta aleatoria
    generateQuestion(countries, usedCountries = new Set()) {
        // Filtrar países no utilizados
        const availableCountries = countries.filter(
            country => !usedCountries.has(country.name)
        );
        
        if (availableCountries.length === 0) {
            throw new Error('No hay más países disponibles');
        }

        // Seleccionar país aleatorio
        const randomIndex = Math.floor(Math.random() * availableCountries.length);
        const selectedCountry = availableCountries[randomIndex];
        
        // Generar opciones incorrectas
        const wrongOptions = this.generateWrongOptions(countries, selectedCountry.name);
        
        // Combinar respuesta correcta con opciones incorrectas
        const allOptions = [selectedCountry.name, ...wrongOptions];
        
        // Mezclar opciones
        const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
        
        return {
            id: Date.now() + Math.random(),
            question: `Which country does this flag belong to?`,
            flagImage: selectedCountry.flag,
            options: shuffledOptions,
            correctAnswer: selectedCountry.name
        };
    },

    // Generar un set completo de preguntas para el quiz
    generateQuizQuestions(countries, numberOfQuestions = 10) {
        const questions = [];
        const usedCountries = new Set();

        for (let i = 0; i < numberOfQuestions; i++) {
            try {
                const question = this.generateQuestion(countries, usedCountries);
                questions.push(question);
                usedCountries.add(question.correctAnswer);
            } catch (error) {
                console.error(`Error generating question ${i + 1}:`, error);
                break;
            }
        }

        return questions;
    }
};

// Hook personalizado para manejar el estado del quiz
import { useState, useEffect } from 'react';

export const useQuiz = () => {
    const [gameState, setGameState] = useState({
        isLoading: true,
        isPlaying: false,
        isFinished: false,
        error: null
    });

    const [quizData, setQuizData] = useState({
        questions: [],
        currentQuestionIndex: 0,
        score: 0,
        answers: [],
        showResult: false
    });

    // Inicializar el juego
    const initializeGame = async () => {
        try {
            setGameState({
                isLoading: true,
                isPlaying: false,
                isFinished: false,
                error: null
            });

            const countriesData = await countryService.fetchCountries();
            
            const questions = countryService.generateQuizQuestions(countriesData, 10);
            
            setQuizData({
                questions,
                currentQuestionIndex: 0,
                score: 0,
                answers: [],
                showResult: false
            });

            setGameState({
                isLoading: false,
                isPlaying: true,
                isFinished: false,
                error: null
            });

        } catch (error) {
            setGameState({
                isLoading: false,
                isPlaying: false,
                isFinished: false,
                error: error.message
            });
        }
    };

    // Manejar respuesta del usuario
    const handleAnswer = (selectedAnswer) => {
        if (quizData.showResult) return;

        const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        
        const newAnswer = {
            questionId: currentQuestion.id,
            selectedAnswer,
            correctAnswer: currentQuestion.correctAnswer,
            isCorrect
        };

        setQuizData(prev => {
            // Crear un nuevo array de respuestas con la respuesta en la posición correcta
            const newAnswers = [...prev.answers];
            newAnswers[prev.currentQuestionIndex] = newAnswer;
            
            // Calcular la puntuación contando todas las respuestas correctas
            const newScore = newAnswers.filter(answer => answer && answer.isCorrect).length;
            
            // Verificar si todas las preguntas han sido respondidas
            const totalAnswered = newAnswers.filter(answer => answer).length;
            const allQuestionsAnswered = totalAnswered === prev.questions.length;
            
            // Si todas las preguntas fueron respondidas, terminar el quiz
            if (allQuestionsAnswered) {
                setTimeout(() => {
                    setGameState(prevState => ({
                        ...prevState,
                        isPlaying: false,
                        isFinished: true
                    }));
                }, 1500); // Esperar 1.5 segundos para mostrar el resultado antes de terminar
            }
            
            return {
                ...prev,
                answers: newAnswers,
                score: newScore,
                showResult: true
            };
        });
    };

    // Ir a la siguiente pregunta
    const nextQuestion = () => {
        const nextIndex = quizData.currentQuestionIndex + 1;
        
        if (nextIndex >= quizData.questions.length) {
            // Quiz terminado
            setGameState(prev => ({
                ...prev,
                isPlaying: false,
                isFinished: true
            }));
        } else {
            // Siguiente pregunta
            setQuizData(prev => ({
                ...prev,
                currentQuestionIndex: nextIndex,
                showResult: false
            }));
        }
    };

    // Ir a la pregunta anterior
    const previousQuestion = () => {
        const prevIndex = quizData.currentQuestionIndex - 1;
        
        if (prevIndex >= 0) {
            setQuizData(prev => ({
                ...prev,
                currentQuestionIndex: prevIndex,
                showResult: true // Mostrar resultado si ya fue respondida
            }));
        }
    };

    // Navegar directamente a una pregunta específica
    const goToQuestion = (questionIndex) => {
        if (questionIndex >= 0 && questionIndex < quizData.questions.length) {
            const wasAnswered = quizData.answers[questionIndex];
            setQuizData(prev => ({
                ...prev,
                currentQuestionIndex: questionIndex,
                showResult: !!wasAnswered // Mostrar resultado si ya fue respondida
            }));
        }
    };

    // Reiniciar el juego
    const restartGame = () => {
        initializeGame();
    };

    // Inicializar al montar el componente
    useEffect(() => {
        initializeGame();
    }, []);

    return {
        gameState,
        quizData,
        handleAnswer,
        nextQuestion,
        previousQuestion,
        goToQuestion,
        restartGame,
        currentQuestion: quizData.questions[quizData.currentQuestionIndex] || null
    };
};