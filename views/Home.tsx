import React from 'react';
import { ArrowRight, Radio, Users, Zap, Globe, MessageSquare } from 'lucide-react';

interface HomeProps {
  onStartSession: () => void;
  onJoinRoom: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartSession, onJoinRoom }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
          Real Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Translation</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
          Presented by <span className="font-bold text-primary-600 dark:text-primary-400">SmartHelp</span>
        </p>
        
        <div className="flex justify-center gap-8 mt-8 text-sm font-medium text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Low Latency</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" />
            <span>Multi-language</span>
          </div>
           <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-green-500" />
            <span>Live Transcript</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Start Session Card */}
        <div 
          onClick={onStartSession}
          className="group relative bg-white dark:bg-gray-800/50 border-2 border-primary-100 dark:border-primary-900/50 hover:border-primary-500 dark:hover:border-primary-500 rounded-3xl p-8 shadow-lg shadow-primary-900/5 hover:shadow-2xl hover:shadow-primary-900/20 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
            <Radio className="w-40 h-40 text-primary-600" />
          </div>
          
          <div className="relative z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
              Broadcaster Mode
            </span>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Start a Session
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Initialize a new translation room. Your device will act as the source for the translation.
            </p>
            
            <div className="flex items-center text-primary-600 dark:text-primary-400 font-bold text-lg">
              <span>Start Broadcasting</span>
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>

        {/* Join Room Card */}
        <div 
          onClick={onJoinRoom}
          className="group relative bg-white dark:bg-gray-800/50 border-2 border-gray-100 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-3xl p-8 shadow-lg shadow-gray-900/5 hover:shadow-2xl hover:shadow-indigo-900/20 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
            <Users className="w-40 h-40 text-indigo-600" />
          </div>
          
          <div className="relative z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 mb-6">
              Listener Mode
            </span>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Join Audience
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Enter a session code to use this device as a personal translator for the event.
            </p>
            
            <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">
              <span>Join Session</span>
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;