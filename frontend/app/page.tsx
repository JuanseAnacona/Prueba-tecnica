"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CSSProperties } from "react";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        router.push("/dashboard");
      }
    }
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido a la Trivia Interactiva</h1>
      <p style={styles.description}>
        ¡Compite en tiempo real y demuestra tus conocimientos!
      </p>

      <div style={styles.links}>
        <Link href="/login">
          <span style={styles.link}>Iniciar Sesión</span>
        </Link>
        <Link href="/register">
          <span style={styles.link}>Registrarse</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "20px",
  },
  description: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "40px",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    padding: "10px 20px",
    backgroundColor: "#0070f3",
    color: "#fff",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
  },
};
