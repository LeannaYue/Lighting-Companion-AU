
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Book, 
  Calculator, 
  FileText, 
  Download as DownloadIcon, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb,
  ExternalLink,
  Info,
  Menu,
  X,
  Filter,
  Send,
  Sparkles,
  RefreshCcw,
  Zap,
  Layers,
  ShieldCheck,
  Cpu,
  Monitor,
  GraduationCap,
  Factory,
  Stethoscope,
  Sun,
  Wrench,
  ArrowRightLeft,
  BookOpen,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import katex from 'katex';
import { TabType, Term, Standard, Formula, Download } from './types';
import { TERMS, STANDARDS, DOWNLOADS } from './constants';
import FORMULAS_DATA from './formulas';

// --- Helper Components ---

const LatexRenderer: React.FC<{ formula: string; scale?: number }> = ({ formula, scale = 1.05 }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(formula, {
        throwOnError: false,
        displayMode: true
      });
    } catch (e) {
      console.error("KaTeX rendering error", e);
      return `<span class="text-red-500 text-[10px]">Parsing Error</span>`;
    }
  }, [formula]);

  return (
    <div 
      className="w-full flex justify-center py-1 overflow-x-auto select-none text-brand-orange" 
      style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};

// --- Sub-components ---

const DictionaryCard: React.FC<{ term: Term }> = ({ term }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const linkedFormula = useMemo(() => {
    if (!term.formulaId) return null;
    return FORMULAS_DATA.find(f => f.id === term.formulaId);
  }, [term.formulaId]);

  const definitionPoints = useMemo(() => {
    return term.definition
      .split('. ')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => s.endsWith('.') ? s : s + '.');
  }, [term.definition]);

  const handleAIDeepDive = (e: React.MouseEvent) => {
    e.stopPropagation();
    const event = new CustomEvent('ai-trigger', { 
      detail: { 
        prompt: `Could you provide a technical deep dive into "${term.name}"? Specifically, how is it applied in Australian lighting design projects, and what are common pitfalls engineers should avoid when dealing with it?`
      } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className={`flip-card ${isFlipped ? 'is-flipped' : ''}`}>
      <div className="flip-card-inner">
        <div 
          className={`flip-card-front bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-2xl hover:shadow-slate-200/60 transition-all group overflow-hidden shadow-sm flex flex-col ${
            isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-50 group-hover:bg-brand-orange transition-colors" />
          
          <div className="flex items-start justify-between mb-2 gap-3 shrink-0">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-orange transition-colors leading-tight">
              {term.name}
            </h3>
            <span className="whitespace-nowrap px-2 py-1 bg-slate-100 text-slate-500 rounded-md text-[9px] font-black uppercase tracking-wider shrink-0 mt-0.5 border border-slate-200/50">
              {term.category}
            </span>
          </div>

          <div className="flex-grow min-h-[8px]" />

          <div className="shrink-0">
            <ul className="space-y-2">
              {definitionPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-slate-600 text-[12px] leading-snug font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1.5 opacity-60" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-grow min-h-[8px]" />

          <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 mb-5 shrink-0 overflow-hidden relative shadow-inner">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-brand-orange/10 rounded-md">
                <Lightbulb className="w-3.5 h-3.5 text-brand-orange" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Analogy</span>
            </div>
            <p className="text-[12px] italic text-slate-600 leading-relaxed font-light line-clamp-2">
              "{term.analogy}"
            </p>
          </div>
          
          {linkedFormula ? (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
              className="w-full py-3 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-brand-orange transition-all shadow-lg active:scale-[0.98] shrink-0"
            >
              <Calculator size={14} />
              Open Calculator
              <ArrowRight size={14} />
            </button>
          ) : (
            <button 
              onClick={handleAIDeepDive}
              className="w-full py-3 bg-white text-slate-500 hover:text-brand-orange rounded-xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] border border-slate-200 hover:border-brand-orange/30 transition-all hover:bg-orange-50/50 shrink-0 group/ai shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center gap-2.5 transition-transform group-hover/ai:-translate-x-4">
                <Sparkles size={14} className="group-hover/ai:animate-pulse text-brand-orange/70" />
                <span>Explain with AI</span>
              </div>
              <div className="absolute right-4 flex items-center gap-1.5 opacity-0 group-hover/ai:opacity-100 transition-all translate-x-4 group-hover/ai:translate-x-0">
                 <span className="text-[8px] font-black text-brand-orange tracking-widest">DEEP DIVE</span>
                 <ArrowRight size={10} className="text-brand-orange" />
              </div>
            </button>
          )}
        </div>

        <div 
          className={`flip-card-back ${
            isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {linkedFormula && (
            <div className="bg-slate-900 border-2 border-brand-orange rounded-xl flex flex-col shadow-2xl relative h-full text-white overflow-hidden">
              <button 
                onClick={() => setIsFlipped(false)}
                className="absolute top-2 right-2 p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors z-20"
              >
                <X size={14} />
              </button>
              <div className="bg-black py-6 border-b border-white/5 flex items-center justify-center pt-8 shadow-inner">
                <LatexRenderer formula={linkedFormula.latex} scale={1.0} />
              </div>
              <div className="flex-1 p-4 space-y-2 custom-scrollbar overflow-y-auto">
                 <DictionaryCalculator formula={linkedFormula} onReset={() => setIsFlipped(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DictionaryCalculator: React.FC<{ formula: Formula, onReset: () => void }> = ({ formula, onReset }) => {
  const [inputs, setInputs] = useState<Record<string, number>>(() => 
    formula.variables.reduce((acc, v) => ({ ...acc, [v.symbol]: v.defaultValue || 0 }), {})
  );

  const result = useMemo(() => formula.calculate(inputs), [inputs, formula]);

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-2 gap-x-2 gap-y-3">
        {formula.variables.map((v) => (
          <div key={v.symbol} className="group flex flex-col">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 group-hover:text-brand-orange transition-colors truncate">
              {v.definition}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-2.5 mono text-brand-orange font-bold text-[10px] pointer-events-none opacity-100 z-10">
                {v.symbol}
              </span>
              <input 
                type="number"
                value={inputs[v.symbol]}
                onChange={(e) => setInputs({ ...inputs, [v.symbol]: parseFloat(e.target.value) || 0 })}
                className="w-full bg-white/5 border border-white/10 rounded-md py-2 pl-16 pr-1.5 text-[12px] font-bold text-white focus:outline-none focus:border-brand-orange/50 focus:bg-white/10 transition-all tabular-nums"
              />
              <span className="absolute right-1 text-[7px] font-bold text-slate-600 uppercase pointer-events-none">
                {v.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-3 border-t border-white/5">
        <div className="bg-gradient-to-br from-brand-orange to-orange-600 p-2.5 rounded-lg flex items-center justify-between shadow-xl shadow-brand-orange/20 relative group overflow-hidden">
          <div className="flex flex-col relative z-10">
            <span className="text-[9px] font-black text-white/90 uppercase tracking-[0.1em]">Metric Result</span>
            <span className="text-[7px] text-white/60 uppercase font-bold tracking-tighter">Maintained Value</span>
          </div>
          <div className="flex flex-col items-end relative z-10">
            <span className="mono text-xl font-black text-white tabular-nums leading-none">
              {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="w-full mt-2 py-1 text-slate-500 hover:text-slate-300 text-[8px] uppercase font-black tracking-[0.3em] flex items-center justify-center gap-1.5 transition-all"
        >
          <RefreshCcw size={10} /> Exit Analysis
        </button>
      </div>
    </div>
  );
};

const FormulaCard: React.FC<{ formula: Formula }> = ({ formula }) => {
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [inputs, setInputs] = useState<Record<string, number>>(() => 
    formula.variables.reduce((acc, v) => ({ ...acc, [v.symbol]: v.defaultValue || 0 }), {})
  );

  const result = useMemo(() => formula.calculate(inputs), [inputs, formula]);

  const descriptionPoints = useMemo(() => {
    return formula.description
      .split('. ')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => s.endsWith('.') ? s : s + '.');
  }, [formula.description]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col h-full hover:shadow-2xl hover:shadow-slate-200/50 transition-all shadow-sm group">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-orange transition-colors leading-tight">
          {formula.name}
        </h3>
        <span className="whitespace-nowrap px-2 py-1 bg-slate-100 text-slate-500 rounded-md text-[9px] font-black uppercase tracking-wider shrink-0 mt-0.5 border border-slate-200/50">
          {formula.category}
        </span>
      </div>
      <div className="bg-black p-8 rounded-2xl border border-slate-800 flex items-center justify-center mb-6 min-h-[160px] shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
        <LatexRenderer formula={formula.latex} scale={1.1} />
      </div>
      <div className="mb-8 flex-1">
        <ul className="space-y-3">
          {descriptionPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3 text-slate-600 text-[13px] leading-relaxed font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-2 opacity-60" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      {!isCalcOpen ? (
        <button 
          onClick={() => setIsCalcOpen(true)}
          className="w-full mt-auto flex items-center justify-center gap-3 py-4 bg-slate-900 hover:bg-brand-orange text-white font-black rounded-xl transition-all text-[11px] uppercase tracking-[0.2em] shadow-lg active:scale-[0.98]"
        >
          <Calculator size={14} />
          Calculator
          <ArrowRight size={14} className="ml-1 opacity-50" />
        </button>
      ) : (
        <div className="space-y-6 mt-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-1 gap-4">
            {formula.variables.map((v) => (
              <div key={v.symbol} className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="w-10 text-center">
                  <span className="mono text-brand-orange font-bold text-sm">{v.symbol}</span>
                </div>
                <div className="flex-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-tighter block mb-1">
                    {v.definition} ({v.unit})
                  </label>
                  <input 
                    type="number"
                    value={inputs[v.symbol]}
                    onChange={(e) => setInputs({ ...inputs, [v.symbol]: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-transparent text-sm text-slate-900 font-bold focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-brand-orange p-5 rounded-2xl flex items-center justify-between shadow-xl shadow-brand-orange/20">
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em]">Calculated Metric</span>
            </div>
            <span className="mono text-2xl font-black text-white tabular-nums">
              {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <button 
            onClick={() => setIsCalcOpen(false)}
            className="w-full text-center py-2 text-slate-400 hover:text-slate-600 text-[10px] uppercase font-black tracking-[0.3em] flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCcw size={10} /> Reset Module
          </button>
        </div>
      )}
    </div>
  );
};

const StandardItem: React.FC<{ standard: Standard }> = ({ standard }) => {
  const [isOpen, setIsOpen] = useState(false);
  const getStandardIcon = (code: string) => {
    if (code.includes('1680.0')) return <ShieldCheck size={20} />; 
    if (code.includes('1680.1')) return <FileText size={20} />; 
    if (code.includes('1680.2.1')) return <ArrowRightLeft size={20} />; 
    if (code.includes('1680.2.2')) return <Monitor size={20} />; 
    if (code.includes('1680.2.3')) return <GraduationCap size={20} />; 
    if (code.includes('1680.2.4')) return <Factory size={20} />; 
    if (code.includes('1680.2.5')) return <Stethoscope size={20} />; 
    if (code.includes('1680.5')) return <Sun size={20} />; 
    if (code.includes('1680.4')) return <Wrench size={20} />; 
    return <Layers size={20} />;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all mb-3 hover:border-slate-300 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left transition-colors"
      >
        <div className="flex items-center gap-5">
          <div className="bg-slate-50 w-12 h-12 flex items-center justify-center rounded-lg border border-slate-100 text-brand-orange shadow-sm">
            {getStandardIcon(standard.code)}
          </div>
          <div>
            <span className="text-brand-orange font-mono text-xs font-bold block mb-0.5 tracking-tight">{standard.code}</span>
            <h3 className="text-base font-semibold text-slate-900">{standard.title}</h3>
          </div>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="text-slate-400" size={20} />
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-2 animate-in slide-in-from-top-4 duration-500">
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2 mb-2 px-2">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Compliance Matrix</h4>
            </div>
            {standard.luxLevels.map((level, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100/50 transition-colors">
                <span className="text-sm text-slate-700 font-medium">{level.task}</span>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="mono font-bold text-brand-orange text-sm block leading-none">{level.lux} lx</span>
                    <span className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">Maintained</span>
                  </div>
                  {level.ugr && (
                    <div className="text-right border-l border-slate-200 pl-6 min-w-[60px]">
                      <span className="mono text-slate-500 text-sm font-bold block leading-none">{level.ugr}</span>
                      <span className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">Limit</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const DownloadItem: React.FC<{ download: Download }> = ({ download }) => (
  <div className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all group shadow-sm">
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-brand-orange transition-colors">
        <FileText className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 group-hover:text-slate-900 transition-colors">{download.name}</h4>
        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">
          <span className="text-brand-orange">{download.size}</span> • Standardized PDF
        </p>
      </div>
    </div>
    <button 
      className="flex items-center gap-2 bg-slate-100 hover:bg-brand-orange text-slate-600 hover:text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-all uppercase tracking-widest border border-slate-200"
      onClick={() => alert(`Simulated Download: ${download.filename}`)}
    >
      <DownloadIcon className="w-4 h-4" />
      Fetch
    </button>
  </div>
);

// --- AI Technical Assistant ---

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleExternalTrigger = (e: any) => {
      setIsOpen(true);
      if (e.detail?.prompt) {
        handleSend(e.detail.prompt);
      }
    };
    window.addEventListener('ai-trigger', handleExternalTrigger);
    return () => window.removeEventListener('ai-trigger', handleExternalTrigger);
  }, [isTyping]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (forcedPrompt?: string) => {
    const textToSubmit = forcedPrompt || inputValue;
    if (!textToSubmit.trim() || isTyping) return;

    setMessages(prev => [...prev, { role: 'user', content: textToSubmit }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: textToSubmit,
        config: {
          systemInstruction: "You are the 'Lighting Companion AI', a technical expert for Australian Lighting Designers. Provide specific, professional, and data-driven advice based on AS/NZS 1680. Use metric units. Keep responses structured and engineering-focused.",
        },
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || 'Error processing request.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection failed. Please check your API key.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-28 md:bottom-12 right-6 md:right-10 z-[60] w-14 h-14 rounded-2xl ai-core-glow flex items-center justify-center hover:scale-110 active:scale-95 transition-all group overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #FF7300, #FF1E56, #DD2476, #FF7300)',
          backgroundSize: '300% 300%',
          animation: 'gradient-slow 10s ease infinite, float 4s ease-in-out infinite'
        }}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
        {isOpen ? <X size={20} className="text-white relative z-10" /> : <Sparkles size={20} className="text-white relative z-10 drop-shadow-lg" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-48 md:bottom-32 right-4 md:right-10 z-[60] w-[calc(100vw-32px)] md:w-[420px] h-[520px] bg-white border border-slate-200 rounded-[2.5rem] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden glass-dock">
          <div className="p-6 border-b border-slate-100 bg-white/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-pink-500 flex items-center justify-center text-white shadow-lg">
                <Zap size={20} fill="currentColor" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-900 uppercase tracking-[0.2em]">Engineering AI</h3>
                <span className="text-[8px] text-emerald-600 font-black uppercase flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> Processing Live
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><X size={18} /></button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/20 custom-scrollbar">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-10">
                <div className="w-20 h-20 bg-white border border-slate-100 rounded-3xl flex items-center justify-center text-brand-orange mb-6 shadow-xl shadow-slate-200/50">
                  <Cpu size={40} className="animate-pulse-soft" />
                </div>
                <h4 className="text-sm font-black text-slate-800 mb-2 uppercase tracking-[0.2em]">Ready for Analysis</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  Query the AS/NZS 1680 database or request a photometric evaluation.
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-[1.25rem] px-5 py-3.5 text-[13px] leading-relaxed font-medium ${
                  msg.role === 'user' 
                    ? 'bg-brand-orange text-white shadow-xl shadow-brand-orange/20' 
                    : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-400 rounded-2xl px-5 py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <RefreshCcw size={12} className="animate-spin" /> Synthesizing Data...
                </div>
              </div>
            )}
          </div>
          <div className="p-6 bg-white/80 border-t border-slate-100">
            <div className="relative group">
              <input 
                type="text"
                placeholder="Ask about compliance..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-5 pr-14 text-xs font-semibold focus:outline-none focus:border-brand-orange focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isTyping}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-brand-orange text-white rounded-xl hover:bg-brand-orange/90 disabled:opacity-50 transition-all"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Dictionary');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFormulaCategory, setSelectedFormulaCategory] = useState<string>('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dictionaryCategories = ['All', 'Physics', 'Design Metrics', 'Vision', 'Narrative'];
  const formulaCategories = ['All', 'Physics', 'Design', 'Vision', 'Compliance'];

  const navigation = useMemo(() => [
    { id: 'Dictionary' as TabType, icon: Book, label: 'Dictionary' },
    { id: 'Formulas' as TabType, icon: Calculator, label: 'Formulas' },
    { id: 'Standards' as TabType, icon: Layers, label: 'Standards' },
    { id: 'Library' as TabType, icon: BookOpen, label: 'Library' },
  ], []);

  const activeIndex = navigation.findIndex(nav => nav.id === activeTab);

  const filteredAndSortedTerms = useMemo(() => {
    const q = searchQuery.toLowerCase();
    let results = selectedCategory === 'All' ? [...TERMS] : TERMS.filter(t => t.category === selectedCategory);
    if (q) {
      results = results.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.definition.toLowerCase().includes(q)
      );
    }
    return results.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, selectedCategory]);

  const filteredFormulas = useMemo(() => {
    const q = searchQuery.toLowerCase();
    let results = selectedFormulaCategory === 'All' ? [...FORMULAS_DATA] : FORMULAS_DATA.filter(f => f.category === selectedFormulaCategory);
    if (q) {
      results = results.filter(f => 
        f.name.toLowerCase().includes(q) || 
        f.description.toLowerCase().includes(q)
      );
    }
    return results;
  }, [searchQuery, selectedFormulaCategory]);

  const filteredStandards = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return STANDARDS.filter(s => 
      s.code.toLowerCase().includes(q) || 
      s.title.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Dictionary':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-wrap items-center gap-2">
              {dictionaryCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${
                    selectedCategory === cat 
                      ? 'bg-brand-orange border-brand-orange text-white shadow-xl shadow-brand-orange/20' 
                      : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {filteredAndSortedTerms.map(term => <DictionaryCard key={term.id} term={term} />)}
            </div>
          </div>
        );
      case 'Formulas':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-wrap items-center gap-2">
              {formulaCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedFormulaCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${
                    selectedFormulaCategory === cat 
                      ? 'bg-brand-orange border-brand-orange text-white shadow-xl shadow-brand-orange/20' 
                      : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {filteredFormulas.map(formula => <FormulaCard key={formula.id} formula={formula} />)}
            </div>
          </div>
        );
      case 'Standards':
        return (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredStandards.map(standard => <StandardItem key={standard.id} standard={standard} />)}
          </div>
        );
      case 'Library':
        return (
          <div className="max-w-4xl space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-10 p-8 bg-brand-orange border border-brand-orange/20 rounded-[2rem] flex gap-8 items-center shadow-2xl shadow-brand-orange/20">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0 border border-white/20 shadow-inner">
                <Info size={32} />
              </div>
              <div>
                <h4 className="font-black text-white text-sm uppercase tracking-widest mb-1">Official Reference Portal</h4>
                <p className="text-xs text-white/90 leading-relaxed max-w-2xl font-medium">
                  Reference materials are strictly synchronized with 2024 NCC updates.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DOWNLOADS.map(download => <DownloadItem key={download.id} download={download} />)}
            </div>
          </div>
        );
    }
  };

  const SidebarContent = () => (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-14 p-6 rounded-3xl bg-white border border-slate-50 shadow-sm flex items-center gap-4 group transition-all">
        <div className="w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center shadow-xl shadow-brand-orange/25 group-hover:rotate-12 transition-transform">
          <Lightbulb className="w-7 h-7 text-white fill-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-[0.4em] text-slate-300 uppercase leading-none mb-1">
            Lighting
          </span>
          <h1 className="text-sm font-black tracking-tighter text-slate-900 uppercase leading-none">
            Companion <span className="text-brand-orange font-black">AU</span>
          </h1>
        </div>
      </div>
      <nav className="space-y-2">
        {navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.25rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all group ${
              activeTab === item.id 
                ? 'bg-brand-orange text-white shadow-2xl shadow-brand-orange/30' 
                : 'text-slate-400 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'group-hover:text-brand-orange'} />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto pt-10 border-t border-slate-50">
        <a href="https://www.standards.org.au" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-brand-orange transition-colors">
          <ExternalLink size={14} /> Standards AU
        </a>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800 font-medium">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-100 shadow-xl z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 z-[100] mobile-sidebar-overlay animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div 
            className="w-72 h-full bg-white shadow-2xl animate-in slide-in-from-left duration-300"
            onClick={e => e.stopPropagation()}
          >
            <SidebarContent />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-3xl border-b border-slate-100 p-6 lg:px-12 min-h-[110px] flex items-center">
          <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-10">
            <div className="flex items-center gap-4 md:hidden">
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-brand-orange transition-all shadow-sm active:scale-95"
              >
                <Menu size={20} />
              </button>
            </div>
            
            <div className="flex flex-col flex-1 max-w-2xl">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-orange transition-colors" />
                <input 
                  type="text"
                  placeholder={`Search knowledge engine...`}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-200 rounded-[1.25rem] py-3.5 pl-14 pr-6 text-xs font-bold focus:outline-none focus:border-brand-orange focus:bg-white transition-all placeholder:text-slate-400/60 shadow-inner"
                />
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 
                <span className="text-slate-400">ENGINEERING NODE V2</span>
              </div>
              <div className="bg-white px-5 py-2.5 rounded-2xl border border-slate-100 text-brand-orange font-black shadow-sm tracking-widest">
                AU-STANDARDS
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-[#fafbfc]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                 <div className="h-[3px] w-10 bg-brand-orange rounded-full shadow-lg shadow-brand-orange/40" />
                 <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-orange/80">
                   Your Pocket Guide to AS/NZS Standards & Design.
                 </span>
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
                {activeTab}
              </h2>
              <p className="text-slate-500 text-sm max-w-2xl font-medium leading-relaxed opacity-80">
                {activeTab === 'Dictionary' && 'Core photometric terms and professional definitions for the Australian lighting industry.'}
                {activeTab === 'Formulas' && 'Fast calculation engines for illuminance, efficiency, and energy compliance.'}
                {activeTab === 'Standards' && 'Key lux levels and UGR limits extracted from the AS/NZS 1680 series.'}
                {activeTab === 'Library' && 'Official documentation, reference PDFs, and essential design checklists.'}
              </p>
            </div>
            {renderContent()}
          </div>
          <div className="h-40 md:hidden"></div>
        </div>

        {/* --- Optimized Premium Sliding Mobile Dock --- */}
        <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm z-50">
          <nav className="glass-dock rounded-[2rem] flex items-center justify-between h-[72px] px-2.5 relative overflow-hidden">
            
            {/* Sliding Pill Indicator - Cleaned up white line artifact */}
            <div 
              className="absolute h-[52px] bg-brand-orange rounded-[1.4rem] shadow-xl shadow-brand-orange/30 sliding-pill"
              style={{
                width: 'calc((100% - 20px) / 4)',
                transform: `translateX(calc(${activeIndex} * 100%))`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            </div>

            {navigation.map((item, idx) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="relative flex flex-col items-center justify-center flex-1 h-full transition-all outline-none"
                >
                  <div className={`relative transition-all duration-500 ${isActive ? 'scale-100 translate-y-0' : 'text-slate-400 translate-y-0'}`}>
                    <item.icon 
                      size={20} 
                      className={`${isActive ? 'text-white stroke-[3px] drop-shadow-md' : 'stroke-[2px]'}`} 
                    />
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
        
        <AIAssistant />
      </main>
    </div>
  );
};

export default App;
