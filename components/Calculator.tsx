
import React, { useState, useRef, useEffect } from 'react';
import { Currency, TradeMode } from '../types';
import { RATES } from '../constants';

interface CalculatorProps {
  amount: number;
  setAmount: (val: number) => void;
  mode: TradeMode;
  setMode: (mode: TradeMode) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
}

const Calculator: React.FC<CalculatorProps> = ({
  amount,
  setAmount,
  mode,
  setMode,
  currency,
  setCurrency
}) => {
  const [isSwapped, setIsSwapped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentRate = RATES[currency][mode];
  const convertedValue = isSwapped 
    ? (amount / currentRate).toFixed(0) 
    : (amount * currentRate).toFixed(2);

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const selectCurrency = (curr: Currency) => {
    setCurrency(curr);
    setShowCurrencyDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCurrencyDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const CurrencyIcon = ({ isInteractive }: { isInteractive: boolean }) => {
    const isUSD = currency === 'USD';
    const iconClass = isUSD ? 'fa-solid fa-dollar-sign' : 'fa-solid fa-bangladeshi-taka-sign';
    const colorClass = isUSD ? 'text-green-400 bg-green-400/10' : 'text-emerald-500 bg-emerald-500/10';

    if (!isInteractive) {
      return (
        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl text-2xl transition-all duration-500 shadow-inner ${colorClass}`}>
          <i className={iconClass}></i>
        </div>
      );
    }

    return (
      <div className="relative" ref={dropdownRef}>
        <button 
          type="button"
          onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
          className={`w-14 h-14 flex flex-col items-center justify-center rounded-2xl text-2xl transition-all duration-300 hover:scale-105 active:scale-95 relative group shadow-lg touch-target ${colorClass}`}
        >
          <i className={iconClass}></i>
          <i className="fas fa-chevron-down text-[10px] absolute bottom-1.5 opacity-60 group-hover:opacity-100"></i>
        </button>

        {showCurrencyDropdown && (
          <div className="absolute top-full left-0 mt-3 w-52 glass rounded-[1.5rem] p-2 z-[100] shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/10 animate-in fade-in zoom-in duration-200">
            {/* USD Option Box */}
            <button 
              type="button"
              onClick={() => selectCurrency('USD')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all active:scale-[0.97] text-left group/item ${
                currency === 'USD' 
                  ? 'bg-blue-500/20 border border-blue-500/30' 
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-green-400/10 transition-transform group-hover/item:scale-110`}>
                <i className="fa-solid fa-dollar-sign text-green-400 text-lg"></i>
              </div>
              <div className="flex-1">
                <p className={`font-bold text-sm ${currency === 'USD' ? 'text-white' : 'text-gray-300'}`}>USD</p>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter">US Dollar</p>
              </div>
              {currency === 'USD' && (
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <i className="fas fa-check text-[10px] text-white"></i>
                </div>
              )}
            </button>

            <div className="h-px bg-white/5 my-2 mx-2"></div>

            {/* BDT Option Box */}
            <button 
              type="button"
              onClick={() => selectCurrency('BDT')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all active:scale-[0.97] text-left group/item ${
                currency === 'BDT' 
                  ? 'bg-emerald-500/20 border border-emerald-500/30' 
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500/10 transition-transform group-hover/item:scale-110`}>
                <i className="fa-solid fa-bangladeshi-taka-sign text-emerald-500 text-lg"></i>
              </div>
              <div className="flex-1">
                <p className={`font-bold text-sm ${currency === 'BDT' ? 'text-white' : 'text-gray-300'}`}>BDT</p>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter">Bangladeshi Taka</p>
              </div>
              {currency === 'BDT' && (
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <i className="fas fa-check text-[10px] text-white"></i>
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="glass p-6 md:p-8 rounded-[2.5rem] shadow-2xl border border-white/10 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 relative overflow-hidden select-none">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
      
      {/* Mode Switcher */}
      <div className="flex p-1.5 bg-white/5 rounded-2xl mb-8 relative z-10">
        {(['BUY', 'SELL'] as TradeMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 touch-target ${
              mode === m 
                ? 'bg-gradient-to-r from-[#0088cc] to-[#00c6ff] text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <i className={`fas ${m === 'BUY' ? 'fa-cart-shopping' : 'fa-hand-holding-dollar'} text-xs opacity-70`}></i>
            {m}
          </button>
        ))}
      </div>

      <div className="space-y-4 relative z-10">
        {/* Input Block */}
        <div className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Input Unit</span>
            <span className="text-[10px] text-blue-400 font-bold bg-blue-400/10 px-2.5 py-1 rounded-full border border-blue-400/20">
              1 STAR = {currency === 'USD' ? '$' : '৳'}{currentRate}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {!isSwapped ? (
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl text-2xl text-yellow-400 bg-yellow-400/10 shadow-inner">
                <i className="fas fa-star"></i>
              </div>
            ) : (
              <CurrencyIcon isInteractive={true} />
            )}
            <div className="flex-1">
              <p className="text-[11px] font-bold text-gray-400 mb-0.5">
                {!isSwapped ? 'Telegram Stars' : `${currency} Amount`}
              </p>
              <input 
                type="number"
                inputMode="numeric"
                value={amount === 0 ? '' : amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                onFocus={handleInputFocus}
                className="w-full bg-transparent text-3xl font-extrabold outline-none text-white placeholder-white/10"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-7 relative z-20">
          <button 
            onClick={handleSwap}
            className="w-14 h-14 bg-gradient-to-br from-[#FF9800] to-[#FF5722] hover:shadow-[0_0_25px_rgba(255,152,0,0.5)] rounded-full flex items-center justify-center shadow-2xl transition-all hover:rotate-180 duration-500 active:scale-90 border-4 border-[#0f172a] touch-target"
          >
            <i className="fas fa-arrows-up-down text-xl text-white"></i>
          </button>
        </div>

        {/* Output Block */}
        <div className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Output Estimate</span>
            <button 
              onClick={handleCopy}
              className={`text-[10px] font-bold transition-all px-3 py-1 rounded-full border border-transparent active:scale-95 ${copied ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10'}`}
            >
              {copied ? <><i className="fas fa-check mr-1"></i> COPIED</> : <><i className="fas fa-copy mr-1"></i> COPY</>}
            </button>
          </div>
          <div className="flex items-center gap-4">
            {isSwapped ? (
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl text-2xl text-yellow-400 bg-yellow-400/10 shadow-inner">
                <i className="fas fa-star"></i>
              </div>
            ) : (
              <CurrencyIcon isInteractive={true} />
            )}
            <div className="flex-1">
              <p className="text-[11px] font-bold text-gray-400 mb-0.5">
                {isSwapped ? 'Telegram Stars' : currency}
              </p>
              <div className="text-3xl font-extrabold text-white flex items-baseline">
                {!isSwapped && <span className="text-lg mr-1.5 opacity-40 font-medium">{currency === 'USD' ? '$' : '৳'}</span>}
                {convertedValue}
                {isSwapped && <span className="text-sm ml-2.5 text-blue-400 font-bold tracking-wider">STARS</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center relative z-10">
        <div>
          <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-1">Standard Scale</p>
          <p className="text-[12px] text-gray-400 font-semibold">1,000 Stars ≈ {currency === 'USD' ? '$' : '৳'}{(1000 * currentRate).toFixed(2)}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-1">Status</p>
          <div className="flex items-center justify-end gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></span>
            <span className="text-[10px] text-green-500 font-black uppercase">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
