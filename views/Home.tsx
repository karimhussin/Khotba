import React from 'react';
import { ArrowRight, Radio, Users } from 'lucide-react';

interface HomeProps {
  onStartSession: () => void;
  onJoinRoom: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartSession, onJoinRoom }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Start Session Card */}
        <div 
          onClick={onStartSession}
          className="group relative bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Radio className="w-32 h-32 text-primary-500 transform rotate-12" />
          </div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Radio className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              Start Session
            </h2>
            
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              Create a new WebRTC session and start receiving live translations powered by Gemini AI.
            </p>
            
            <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium">
              <span>Start Broadcasting</span>
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Join Room Card */}
        <div 
          onClick={onJoinRoom}
          className="group relative bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-32 h-32 text-indigo-500 transform -rotate-12" />
          </div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Join Room
            </h2>
            
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              Join an existing translation room using a session code to listen to the sermon.
            </p>
            
            <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
              <span>Enter Code</span>
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;