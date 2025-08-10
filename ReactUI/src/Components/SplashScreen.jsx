// SplashScreen.jsx
import React, { useEffect, useState } from "react";
import "../CSS/splash.css"; // Ensure you have the correct path to your CSScss file


export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); // 2.5 seconds splash screen duration
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={styles.container}>
      <svg
        style={styles.logo}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        aria-label="RestoConnect Logo"
      >
        {/* Insert your combined logo SVG paths here */}
        <rect width="64" height="64" fill="#FAFAFA" rx="8" />
        <path
          d="M20 26 C20 18 28 12 32 12 C36 12 44 18 44 26 C52 26 52 34 12 34 C12 28 16 26 20 26 Z"
          fill="#B22222"
          stroke="#B22222"
          strokeWidth="2"
        />
        <path
          d="M28 12 C28 8 32 6 36 8 C38 9 40 12 38 14 C36 16 30 14 28 12 Z"
          fill="#B22222"
        />
        <rect x="12" y="34" width="40" height="8" rx="3" fill="#B22222" />
        <rect x="26" y="30" width="4" height="8" fill="#FFD700" rx="1" />
        <rect x="32" y="26" width="4" height="12" fill="#FFD700" rx="1" />
        <rect x="38" y="22" width="4" height="16" fill="#FFD700" rx="1" />
      </svg>
      <h1 style={styles.title}>RestoConnect</h1>
      <p style={styles.subtitle}>Manage. Optimize. Delight.</p>
      <div style={styles.loader} />
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "#B22222",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#FAFAFA",
    zIndex: 9999,
    userSelect: "none",
    animation: "fadeIn 1s ease forwards"
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
    animation: "pulse 2.5s ease-in-out infinite"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 40,
  },
  loader: {
    width: 60,
    height: 6,
    background: "linear-gradient(90deg, #FFD700, #FAFAFA, #FFD700)",
    borderRadius: 3,
    animation: "loaderAnim 2.5s linear infinite"
  }
};


