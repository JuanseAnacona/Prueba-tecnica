'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../public/src/services/api";


interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export default function Dashboard() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get("/questions");
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error al cargar las preguntas");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (answer: string) => {

    setScore((prevScore) => {
      const newScore = answer === questions[currentQuestion].correctAnswer ? prevScore + 10 : prevScore;

      // Pasar a la siguiente pregunta o terminar el juego
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        router.push(`/ranking`);
      }

      return newScore;
    });
  };

  // Función para redirigir a la página de creación de preguntas
  const goToQuestionsPage = () => {
    router.push("/questions");
  };

  if (loading) {
    return <p className="loading">Cargando preguntas...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (questions.length === 0) {
    return <p>No se encontraron preguntas para esta categoría.</p>;
  }

  return (
    <div className="dashboard">
      <h1>Juego de Preguntas</h1>
      <div>
        <h2>{questions[currentQuestion]?.questionText}</h2>
        {questions[currentQuestion]?.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
      <p>Puntaje: {score}</p>

      {/* Botón para redirigir a la página de creación de preguntas */}
      <button onClick={goToQuestionsPage} style={styles.button}>
        Crear Nueva Pregunta
      </button>

      <style jsx>{`
        /* General Styles */
        .dashboard {
          font-family: 'Roboto', sans-serif;
          margin: 0;
          padding: 2rem;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 600px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        h1 {
          color: #333;
          font-size: 2rem;
          margin-bottom: 20px;
        }

        h2 {
          color: #2c3e50;
          font-size: 1.5rem;
          margin-bottom: 20px;
          line-height: 1.4;
        }

        button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 10px 20px;
          margin: 8px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #2980b9;
        }

        button:active {
          transform: scale(0.98);
        }

        p {
          font-size: 1.2rem;
          color: #333;
          margin-top: 20px;
          font-weight: bold;
        }

        .loading, .error {
          color: #e74c3c;
          font-size: 1.2rem;
          margin-top: 20px;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem;
          }

          h2 {
            font-size: 1.2rem;
          }

          button {
            padding: 8px 16px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}

// Estilos del botón
const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '20px',
  },
};
