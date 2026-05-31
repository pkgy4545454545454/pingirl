import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const SPLASH_DURATION = 3000;
  const PROGRESS_INTERVAL = SPLASH_DURATION / 100;

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, PROGRESS_INTERVAL);

    const completeTimeout = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, SPLASH_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div 
      className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #FFF0F5 0%, #F0F8FF 50%, #FFF5F9 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'opacity 0.5s ease-out',
        opacity: fadeOut ? 0 : 1,
        overflow: 'hidden',
      }}
    >
      {/* Sparkle particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            background: i % 3 === 0 ? '#FF69B4' : i % 3 === 1 ? '#87CEEB' : '#FFD700',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `sparkle-twinkle ${1.5 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.6,
          }}
        />
      ))}

      {/* Logo circle */}
      <div 
        style={{
          marginBottom: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF69B4, #87CEEB)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 60px rgba(255, 105, 180, 0.3)',
        }}>
          <span style={{ fontSize: '48px', color: 'white', fontFamily: 'Dancing Script, cursive', fontWeight: '700' }}>P</span>
        </div>
      </div>

      {/* Brand name */}
      <h1 style={{
        fontSize: '36px',
        fontWeight: '700',
        fontFamily: 'Dancing Script, cursive',
        background: 'linear-gradient(135deg, #FF69B4, #87CEEB)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '12px',
      }}>
        PinkGirl
      </h1>

      {/* Tagline */}
      <p style={{
        color: '#999',
        fontSize: '14px',
        fontWeight: '400',
        marginBottom: '30px',
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
        opacity: progress > 20 ? 1 : 0,
        transition: 'opacity 0.5s ease-in',
      }}>
        Tes annonces glamour
      </p>

      {/* Loading bar */}
      <div style={{ width: '200px', maxWidth: '60%' }}>
        <div style={{
          height: '3px',
          backgroundColor: 'rgba(255, 105, 180, 0.1)',
          borderRadius: '3px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #FF69B4, #87CEEB, #FF69B4)',
            backgroundSize: '200% 100%',
            animation: 'gradient-shift 2s linear infinite',
            borderRadius: '3px',
            transition: 'width 0.1s linear',
            boxShadow: '0 0 10px rgba(255, 105, 180, 0.5)',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes sparkle-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .splash-screen.fade-out {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
