'use client'

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../public/src/services/api';

interface LoginResponse {
  access_token: string;
}

interface ErrorResponse {
  message?: string;
}

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await api.post<LoginResponse>('/auth/login', { email, password });
      localStorage.setItem('access_token', response.data.access_token);
      router.replace('/dashboard');
    } catch (error: any) {
      const err: ErrorResponse = error.response?.data || { message: 'Error al iniciar sesión.' };
      setErrorMessage(err.message || 'Error al iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Iniciar Sesión</h1>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>
      <p style={styles.text}>
        ¿No tienes una cuenta? <a href="/register" style={styles.link}>Regístrate</a>
      </p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '300px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '10px',
    backgroundColor: '#0070f3',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  text: {
    marginTop: '20px',
    color: '#666',
  },
  link: {
    color: '#0070f3',
    textDecoration: 'none',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
    marginTop: '-5px',
  },
};