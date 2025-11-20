import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, KeyRound } from 'lucide-react';

interface JoinSessionProps {
  onJoin: (code: string) => void;
  onBack: () => void;
}

const JoinSession: React.FC<JoinSessionProps> = ({ onJoin, onBack }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1); // Only allow 1 char
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isComplete = code.every(c => c !== '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) {
      onJoin(code.join(''));
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 w-full">
      <button 
        onClick={onBack}
        className="group flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
      >
        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </div>
        <span className="font-medium">Back to Home</span>
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Enter Session Code</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Enter the 6-digit code provided by the broadcaster to join the translation channel.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-8">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={el => inputRefs.current[idx] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={!isComplete}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all ${
              isComplete 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 transform hover:-translate-y-0.5' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Join Session</span>
            <ArrowRight className={`w-5 h-5 ml-2 ${isComplete ? 'animate-pulse' : ''}`} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinSession;