
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Calculator from './components/Calculator';
import MarketInsights from './components/MarketInsights';
import { TradeMode, Currency, InsightData } from './types';
import { getMarketInsights } from './services/geminiService';

const App: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [mode, setMode] = useState<TradeMode>('BUY');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [insights, setInsights] = useState<InsightData | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      if (amount <= 0) return;
      setLoadingInsights(true);
      const data = await getMarketInsights(amount, currency, mode);
      setInsights(data);
      setLoadingInsights(false);
    };

    const timer = setTimeout(fetchInsights, 1500); // Debounce to save API calls
    return () => clearTimeout(timer);
  }, [amount, mode, currency]);

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-6 md:p-12">
      <div className="fixed top-1/4 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-2xl space-y-8 relative z-10">
        <Header />
        
        <main className="space-y-6">
          <Calculator 
            amount={amount}
            setAmount={setAmount}
            mode={mode}
            setMode={setMode}
            currency={currency}
            setCurrency={setCurrency}
          />
          
          <MarketInsights insights={insights} loading={loadingInsights} />
        </main>

        <footer className="text-center pt-12 pb-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
              PRO GRADE • TELEGRAM STAR CALCULATOR
            </p>
            <div className="flex items-center gap-6 text-gray-600">
              <a href="https://t.me/yourchannel" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
                <i className="fab fa-telegram-plane text-xl"></i>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <i className="fab fa-github text-xl"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
