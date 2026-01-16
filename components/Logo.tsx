
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 80 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full animate-pulse-soft"></div>
      
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="logoBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0088cc" />
            <stop offset="100%" stopColor="#00c6ff" />
          </linearGradient>
          <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Main Base - iOS style rounded square */}
        <rect x="5" y="5" width="90" height="90" rx="24" fill="url(#logoBlueGrad)" />
        
        {/* Subtle Calculator Grid Background */}
        <path d="M30 35H70M30 50H70M30 65H70M40 30V75M60 30V75" stroke="white" strokeWidth="1" strokeOpacity="0.1" />

        {/* The Telegram Paper Plane Wing Tip (Hidden hint) */}
        <path d="M85 15L70 30L80 35L85 15Z" fill="white" fillOpacity="0.1" />

        {/* Main Star */}
        <path 
          d="M50 25L57.5 40.5L74.5 43L62.25 55L65.25 72L50 64L34.75 72L37.75 55L25.5 43L42.5 40.5L50 25Z" 
          fill="url(#starGrad)" 
          filter="url(#glow)"
        />

        {/* Inner Star Detail */}
        <path d="M50 32L55 43H66L57 50L60 61L50 54L40 61L43 50L34 43H45L50 32Z" fill="white" fillOpacity="0.3" />
        
        {/* Pro Accent Line */}
        <path d="M20 80C35 85 65 85 80 80" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4" />
      </svg>
    </div>
  );
};

export default Logo;
