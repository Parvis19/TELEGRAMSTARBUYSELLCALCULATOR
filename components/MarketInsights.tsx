
import React from 'react';
import { InsightData } from '../types';

interface MarketInsightsProps {
  insights: InsightData | null;
  loading: boolean;
}

const MarketInsights: React.FC<MarketInsightsProps> = ({ insights, loading }) => {
  if (loading) {
    return (
      <div className="glass p-6 rounded-[2rem] animate-pulse space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 w-1/3 bg-white/10 rounded-lg"></div>
          <div className="h-4 w-16 bg-white/10 rounded-full"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full bg-white/5 rounded"></div>
          <div className="h-3 w-5/6 bg-white/5 rounded"></div>
        </div>
        <div className="h-20 w-full bg-white/5 rounded-2xl"></div>
      </div>
    );
  }

  if (!insights) return null;

  const statusConfig = {
    BULLISH: { color: 'text-green-400 bg-green-400/10', icon: 'fa-arrow-trend-up', label: 'Bullish' },
    BEARISH: { color: 'text-red-400 bg-red-400/10', icon: 'fa-arrow-trend-down', label: 'Bearish' },
    NEUTRAL: { color: 'text-blue-400 bg-blue-400/10', icon: 'fa-minus', label: 'Neutral' },
  }[insights.marketStatus || 'NEUTRAL'];

  return (
    <div className="glass p-6 md:p-8 rounded-[2rem] shadow-xl border border-white/10 animate-in fade-in zoom-in duration-500 relative overflow-hidden group">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-purple-500/10 transition-colors"></div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-xl font-bold flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <i className="fas fa-wand-magic-sparkles text-purple-400"></i>
          </div>
          AI Market Pulse
        </h3>
        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${statusConfig.color}`}>
          <i className={`fas ${statusConfig.icon}`}></i>
          {statusConfig.label}
        </span>
      </div>
      
      <div className="mb-6 relative z-10">
        <p className="text-sm text-gray-300 leading-relaxed font-medium">
          {insights.summary}
        </p>
      </div>
      
      <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/5 relative z-10 group-hover:bg-white/10 transition-all">
        <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.2em] flex items-center gap-2">
          <i className="fas fa-lightbulb text-yellow-500/50"></i>
          Strategy Recommendation
        </p>
        <p className="text-sm font-semibold text-blue-200/90 leading-relaxed italic">
          "{insights.recommendation}"
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          <i className="fas fa-microchip text-xs"></i>
          Gemini 3 Pro Core
        </div>
        <div className="text-[9px] text-gray-600 font-medium">
          Refreshed just now
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
