
import React, { useState } from 'react';
import Header from './components/Header';
import Calculator from './components/Calculator';
import { TradeMode, Currency } from './types';

const App: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [mode, setMode] = useState<TradeMode>('BUY');
  const [currency, setCurrency] = useState<Currency>('USD');

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-6 md:p-12">
      {/* Background blobs */}
      <div className="fixed top-1/4 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-2xl space-y-12 relative z-10">
        <Header />
        
        <main className="flex justify-center">
          <div className="w-full">
            <Calculator 
              amount={amount}
              setAmount={setAmount}
              mode={mode}
              setMode={setMode}
              currency={currency}
              setCurrency={setCurrency}
            />
          </div>
        </main>

        <footer className="text-center pt-12 pb-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
              PRO GRADE • TELEGRAM STAR CALCULATOR
            </p>
            <div className="flex items-center gap-6 text-gray-600">
              <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-telegram-plane text-xl"></i></a>
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-github text-xl"></i></a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
