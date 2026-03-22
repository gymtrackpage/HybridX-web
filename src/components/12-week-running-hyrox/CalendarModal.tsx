'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, X, Check, Flag } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (date: Date, isRaceDate: boolean) => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [mode, setMode] = useState<'start' | 'race'>('start');
  const [dateStr, setDateStr] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!dateStr) return;
    onConfirm(new Date(dateStr), mode === 'race');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-950 border border-slate-800 rounded-lg shadow-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-yellow-400 p-2 rounded text-slate-900">
                <CalendarIcon className="w-5 h-5" />
             </div>
             <h3 className="font-heading font-bold text-white text-xl uppercase">Export Calendar</h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <p className="text-slate-400 text-sm leading-relaxed">
            Download an <strong>.ics</strong> file to import this full 12-week plan into Google Calendar, Apple Calendar, or Outlook.
          </p>

          <div className="grid grid-cols-2 gap-4">
             <button
               onClick={() => setMode('start')}
               className={`p-4 rounded border flex flex-col items-center gap-2 transition-all ${
                 mode === 'start'
                 ? 'bg-slate-800 border-yellow-400 text-white'
                 : 'bg-transparent border-slate-700 text-slate-500 hover:bg-slate-900'
               }`}
             >
               <CalendarIcon className={`w-6 h-6 ${mode === 'start' ? 'text-yellow-400' : 'text-slate-600'}`} />
               <span className="text-xs font-bold uppercase tracking-wider">Start Today</span>
             </button>

             <button
               onClick={() => setMode('race')}
               className={`p-4 rounded border flex flex-col items-center gap-2 transition-all ${
                 mode === 'race'
                 ? 'bg-slate-800 border-yellow-400 text-white'
                 : 'bg-transparent border-slate-700 text-slate-500 hover:bg-slate-900'
               }`}
             >
               <Flag className={`w-6 h-6 ${mode === 'race' ? 'text-yellow-400' : 'text-slate-600'}`} />
               <span className="text-xs font-bold uppercase tracking-wider">Race Date</span>
             </button>
          </div>

          <div>
             <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
               {mode === 'start' ? 'Select Start Date (Monday)' : 'Select Race Date (Sunday)'}
             </label>
             <input
               type="date"
               className="w-full bg-slate-900 border border-slate-700 text-white rounded p-3 focus:border-yellow-400 focus:outline-none"
               value={dateStr}
               onChange={(e) => setDateStr(e.target.value)}
             />
             {mode === 'race' && (
               <p className="text-[10px] text-slate-500 mt-2 italic">
                 We will back-calculate the 12 weeks so you peak exactly on this day.
               </p>
             )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900 flex justify-end">
           <button
             onClick={handleSubmit}
             disabled={!dateStr}
             className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold uppercase tracking-wider px-6 py-3 rounded text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
           >
             <Check className="w-4 h-4" />
             Download File
           </button>
        </div>

      </div>
    </div>
  );
};

export default CalendarModal;
