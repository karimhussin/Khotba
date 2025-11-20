import React, { useEffect, useRef } from 'react';
import { Mic, MicOff, ChevronLeft, AlertCircle, Activity, Loader2, Users } from 'lucide-react';
import { useGeminiLive } from '../hooks/useGeminiLive';
import { SessionStatus } from '../types';

interface LiveSessionProps {
  onBack: () => void;
  sessionCode?: string; // Optional session code if joined
}

const LiveSession: React.FC<LiveSessionProps> = ({ onBack, sessionCode }) => {
  const { status, connect, disconnect, translation, error } = useGeminiLive();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current;
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [translation]);

  const isLive = status === SessionStatus.LIVE;
  const isConnecting = status === SessionStatus.CONNECTING;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 h-[calc(100vh-4rem)] flex flex-col">
      {/* Session Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <button 
          onClick={() => { disconnect(); onBack(); }}
          className="group flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors w-fit"
        >
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">Leave Session</span>
        </button>
        
        <div className="flex items-center gap-4 self-end sm:self-auto">
           {/* Session Info Badge */}
           {sessionCode && (
             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 text-sm font-medium">
                <Users className="w-4 h-4" />
                Session #{sessionCode}
             </div>
           )}
        
           {/* Live Status Indicator */}
           <div className={`flex items-center gap-3 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
            isLive 
              ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-900 dark:text-red-400' 
              : 'bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
          }`}>
            <div className="relative flex h-3 w-3">
              {isLive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? 'bg-red-500' : 'bg-gray-400'}`}></span>
            </div>
            {isLive ? 'LIVE' : status === SessionStatus.CONNECTING ? 'CONNECTING...' : 'OFFLINE'}
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl mb-6 flex items-start gap-3 text-red-700 dark:text-red-400 shadow-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm">Connection Error</h3>
            <p className="text-sm opacity-90 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 bg-white dark:bg-dark-card rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden relative">
        
        {/* Transcript Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/80 dark:bg-gray-900/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <Activity className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200 tracking-wide">LIVE TRANSCRIPT (ENGLISH)</span>
            </div>
            
            {/* Audio Visualizer (Simulated) */}
            {isLive && (
              <div className="flex items-center gap-1 h-4">
                <div className="w-1 bg-primary-500 rounded-full animate-[pulse_1s_ease-in-out_infinite] h-full"></div>
                <div className="w-1 bg-primary-500 rounded-full animate-[pulse_1.5s_ease-in-out_infinite] h-2/3"></div>
                <div className="w-1 bg-primary-500 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-full"></div>
                <div className="w-1 bg-primary-500 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-1/2"></div>
              </div>
            )}
        </div>

        {/* Transcript Area */}
        <div 
          ref={scrollRef}
          className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 scroll-smooth"
        >
           {translation ? (
             <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap font-serif text-xl sm:text-2xl leading-relaxed text-gray-800 dark:text-gray-200 tracking-wide animate-in fade-in duration-500">
                  {translation}
                </p>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
                {isConnecting ? (
                  <div className="flex flex-col items-center animate-pulse">
                    <Loader2 className="w-12 h-12 mb-4 animate-spin text-primary-500" />
                    <p className="font-medium">Connecting to SmartHelp Live...</p>
                  </div>
                ) : isLive ? (
                   <div className="text-center space-y-4">
                      <div className="w-20 h-20 mx-auto bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center animate-pulse">
                        <Mic className="w-8 h-8 text-red-500" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Listening...</p>
                        <p className="text-sm">
                          {sessionCode 
                            ? 'Translating audio for your session.' 
                            : 'Speak into the microphone to start translating.'}
                        </p>
                      </div>
                   </div>
                ) : (
                  <div className="text-center space-y-4 opacity-60">
                    <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                       <Activity className="w-8 h-8" />
                    </div>
                    <p className="text-lg font-medium">Ready to start</p>
                  </div>
                )}
             </div>
           )}
        </div>

        {/* Controls Bar */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur-lg flex justify-center relative z-20">
           {!isLive && !isConnecting ? (
              <button
                onClick={connect}
                className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white rounded-full font-bold shadow-lg shadow-primary-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute inset-0 rounded-full bg-white/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <Mic className="w-6 h-6" />
                <span className="text-lg">{sessionCode ? 'Connect Audio' : 'Start Broadcasting'}</span>
              </button>
           ) : (
              <button
                onClick={disconnect}
                disabled={isConnecting}
                className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConnecting ? <Loader2 className="w-6 h-6 animate-spin" /> : <MicOff className="w-6 h-6" />}
                <span className="text-lg">{isConnecting ? 'Connecting...' : 'Stop Session'}</span>
              </button>
           )}
        </div>
      </div>
      
      <p className="text-center text-xs font-medium text-gray-400 dark:text-gray-600 mt-6">
        Powered by <span className="text-primary-500">SmartHelp AI</span>
      </p>
    </div>
  );
};

export default LiveSession;