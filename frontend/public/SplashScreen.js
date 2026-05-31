import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);

  // 3 second splash screen
  const SPLASH_DURATION = 3000;
  const PROGRESS_INTERVAL = SPLASH_DURATION / 100;

  useEffect(() => {
    // Stage 1: Big zoom (0.5 -> 2.5)
    const stage1 = setTimeout(() => setAnimationStage(1), 100);
    
    // Stage 2: Dezoom a bit (2.5 -> 1.8)
    const stage2 = setTimeout(() => setAnimationStage(2), 600);
    
    // Stage 3: Tilt/rotate sideways
    const stage3 = setTimeout(() => setAnimationStage(3), 1000);
    
    // Stage 4: Fall back and bounce (like Pixar)
    const stage4 = setTimeout(() => setAnimationStage(4), 1400);
    
    // Stage 5: Settle
    const stage5 = setTimeout(() => setAnimationStage(5), 1800);

    // Progress bar animation (3 seconds)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, PROGRESS_INTERVAL);

    // Complete after 3 seconds
    const completeTimeout = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, SPLASH_DURATION);

    return () => {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
      clearTimeout(stage4);
      clearTimeout(stage5);
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  // Animation styles based on stage
  const getLogoContainerStyle = () => {
    const baseStyle = {
      marginBottom: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      perspective: '1000px',
    };
    return baseStyle;
  };

  const getLogoStyle = () => {
    let transform = '';
    let transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    switch(animationStage) {
      case 0:
        transform = 'scale(0.5) rotateX(0deg)';
        break;
      case 1: // Big zoom
        transform = 'scale(2.5) rotateX(0deg)';
        transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        break;
      case 2: // Dezoom a bit
        transform = 'scale(1.8) rotateX(0deg)';
        transition = 'transform 0.4s ease-out';
        break;
      case 3: // Tilt backwards (rotate on X axis)
        transform = 'scale(1.8) rotateX(-30deg) translateY(-20px)';
        transition = 'transform 0.3s ease-in';
        break;
      case 4: // Fall forward and overshoot
        transform = 'scale(2) rotateX(15deg) translateY(10px)';
        transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        break;
      case 5: // Settle back to normal
        transform = 'scale(1.5) rotateX(0deg) translateY(0px)';
        transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        break;
      default:
        transform = 'scale(1.5) rotateX(0deg)';
    }
    
    return {
      width: '150px',
      height: '150px',
      objectFit: 'contain',
      filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.5))',
      transform,
      transition,
      transformOrigin: 'center bottom',
    };
  };

  return (
    <div 
      className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'opacity 0.5s ease-out',
        opacity: fadeOut ? 0 : 1,
      }}
    >
      {/* Background glow */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(0,71,171,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'breathe 2s ease-in-out infinite',
        }}
      />

      {/* Logo with Pixar-style animation */}
      <div style={getLogoContainerStyle()}>
        <img 
          src="/logo_titelli.png" 
          alt="Titelli"
          style={getLogoStyle()}
        />
      </div>

      {/* Text above loading bar */}
      <p
        style={{
          color: 'white',
          fontSize: '16px',
          fontWeight: '500',
          marginBottom: '20px',
          textAlign: 'center',
          fontFamily: 'Playfair Display, serif',
          opacity: progress > 20 ? 1 : 0,
          transition: 'opacity 0.5s ease-in',
        }}
      >
        Tous les prestataires de votre région sont sur Titelli
      </p>

      {/* Loading bar */}
      <div 
        style={{
          width: '250px',
          maxWidth: '70%',
        }}
      >
        <div 
          style={{
            height: '3px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px',
            overflow: 'hidden',
          }}
        >
          <div 
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #0047AB 0%, #D4AF37 50%, #0047AB 100%)',
              backgroundSize: '200% 100%',
              animation: 'gradient-shift 2s linear infinite',
              borderRadius: '3px',
              transition: 'width 0.1s linear',
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
            }}
          />
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
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
