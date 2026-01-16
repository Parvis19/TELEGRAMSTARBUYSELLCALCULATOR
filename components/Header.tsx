
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="text-center space-y-2">
      <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-4">
        <i className="fab fa-telegram text-4xl text-[#0088cc]"></i>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        Star <span className="bg-gradient-to-r from-[#0088cc] to-[#00c6ff] bg-clip-text text-transparent">Calculator</span>
      </h1>
      <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base">
        Instantly convert Telegram Stars to global currencies with professional market analysis.
      </p>
    </div>
  );
};

export default Header;
