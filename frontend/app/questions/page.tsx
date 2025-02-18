'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../public/src/services/api';

export default function AddQuestion() {
  const [category, setCategory] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const router = useRouter();

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !questionText || options.some(option => !option) || !correctAnswer) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      // Enviar la pregunta al backend
      await api.post('/questions', {
        category,
        questionText,
        options,
        correctAnswer,
      });
      router.push('/dashboard');
    } catch (error) {
      alert('Error al agregar la pregunta');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Agregar Nueva Pregunta</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Categoría:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Pregunta:</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            style={styles.textarea}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Opciones:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              style={styles.input}
            />
          ))}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Respuesta Correcta:</label>
          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            style={styles.select}
          >
            <option value="">Selecciona la respuesta correcta</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={styles.button}>
          Agregar Pregunta
        </button>
      </form>
    </div>
  );
}


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column' | 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column' | 'row', 
    gap: '15px',
    width: '100%',
    maxWidth: '500px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as 'column' | 'row',
    gap: '5px',
  },
  label: {
    fontSize: '1rem',
    color: '#333',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    minHeight: '100px',
  },
  select: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
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
