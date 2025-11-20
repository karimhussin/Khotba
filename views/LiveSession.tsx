import React, { useEffect, useRef } from 'react';
import { Mic, MicOff, ChevronLeft, AlertCircle, Activity } from 'lucide-react';
import { useGeminiLive } from '../hooks/useGeminiLive';
import { SessionStatus } from '../types';

interface LiveSessionProps {
  onBack: () => void;
}

const LiveSession: React.FC<LiveSessionProps> = ({ onBack }) => {
  const { status, connect, disconnect, translation, error } = useGeminiLive();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [translation]);

  const isLive = status === SessionStatus.LIVE;
  const isConnecting = status === SessionStatus.CONNECTING;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
      {/* Session Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => { disconnect(); onBack(); }}
          className="flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Home
        </button>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
            isLive 
              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
              : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
          }`}>
            {isLive && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
            {isLive ? 'Live Broadcasting' : status === SessionStatus.CONNECTING ? 'Connecting...' : 'Offline'}
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-6 flex items-start gap-3 text-red-700 dark:text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-sm">Connection Error</h3>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden relative">
        
        {/* Header inside card */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Live Transcript (English)</span>
            </div>
        </div>

        {/* Transcript Area */}
        <div 
          ref={scrollRef}
          className="flex-1 p-6 overflow-y-auto space-y-4 font-serif text-lg leading-relaxed text-gray-800 dark:text-gray-200"
        >
           {translation ? (
             <div className="whitespace-pre-wrap animate-in fade-in">{translation}</div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                <Activity className="w-12 h-12 mb-4 opacity-20" />
                <p>
                    {isLive 
                      ? "Listening for speech..." 
                      : isConnecting 
                        ? "Establishing secure connection..." 
                        : "Ready to start session."}
                </p>
             </div>
           )}
        </div>

        {/* Controls */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-center">
           {!isLive && !isConnecting ? (
              <button
                onClick={connect}
                className="flex items-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold shadow-lg shadow-primary-500/20 transition-all hover:scale-105 active:scale-95"
              >
                <Mic className="w-5 h-5" />
                Start Broadcasting
              </button>
           ) : (
              <button
                onClick={disconnect}
                disabled={isConnecting}
                className="flex items-center gap-3 px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MicOff className="w-5 h-5" />
                {isConnecting ? 'Connecting...' : 'Stop Broadcasting'}
              </button>
           )}
        </div>
      </div>
      
      <p className="text-center text-xs text-gray-400 mt-4">
        Powered by Gemini 2.5 Flash Native Audio
      </p>
    </div>
  );
};

export default LiveSession;