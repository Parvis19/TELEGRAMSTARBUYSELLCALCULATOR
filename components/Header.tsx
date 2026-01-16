
import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <div className="text-center space-y-2">
      <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-[2.5rem] mb-4 border border-white/5 shadow-2xl backdrop-blur-sm group hover:border-blue-500/20 transition-all duration-500">
        <Logo size={100} className="group-hover:scale-110 transition-transform duration-500" />
      </div>
      
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 mb-2">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Enterprise Edition</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Star <span className="bg-gradient-to-r from-[#0088cc] to-[#00c6ff] bg-clip-text text-transparent">Calculator</span>
          <span className="ml-2 text-xs align-top bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-md border border-yellow-500/20">PRO</span>
        </h1>
      </div>
      
      <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base font-medium opacity-80">
        The ultimate Telegram Star conversion engine with pro-grade AI market insights.
      </p>
    </div>
  );
};

export default Header;
