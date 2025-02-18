'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import socket from '../../public/src/services/socket';
import { CSSProperties } from 'react';

interface UserRanking {
  userId: number;
  email: string;
  score: number;
}

export default function Ranking() {
  const [ranking, setRanking] = useState<UserRanking[]>([]);
  const router = useRouter();

  useEffect(() => {
  
    socket.on('rankingUpdated', (data: UserRanking[]) => {
      setRanking(data);
    });


    return () => {
      socket.off('rankingUpdated');
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ranking en Tiempo Real</h1>
      <ul style={styles.list}>
        {ranking.map((user, index) => (
          <li key={index} style={styles.listItem}>
            <span style={styles.userName}>{user.email}</span>
            <span style={styles.userScore}>{user.score} puntos</span>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push('/dashboard')} style={styles.button}>
        Volver al Juego
      </button>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
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
  list: {
    listStyle: 'none',
    padding: '0',
    width: '300px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  userName: {
    fontSize: '1rem',
    color: '#333',
  },
  userScore: {
    fontSize: '1rem',
    color: '#0070f3',
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