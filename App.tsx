import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './views/Home';
import LiveSession from './views/LiveSession';
import JoinSession from './views/JoinSession';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [sessionCode, setSessionCode] = useState<string | undefined>(undefined);

  // Theme effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleStartSession = () => {
    setSessionCode(undefined);
    setCurrentView(View.SESSION);
  };

  const handleJoinRoom = () => {
    setCurrentView(View.JOIN);
  };

  const handleJoinSubmit = (code: string) => {
    setSessionCode(code);
    setCurrentView(View.SESSION);
  };

  const handleBack = () => {
    setCurrentView(View.HOME);
    setSessionCode(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)} 
      />
      
      <main className="flex-1 flex flex-col relative">
        {currentView === View.HOME && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col justify-center">
             <Home 
                onStartSession={handleStartSession} 
                onJoinRoom={handleJoinRoom} 
             />
          </div>
        )}

        {currentView === View.JOIN && (
          <div className="animate-in zoom-in-95 duration-300 flex-1 flex flex-col justify-center">
            <JoinSession 
              onJoin={handleJoinSubmit}
              onBack={handleBack}
            />
          </div>
        )}

        {currentView === View.SESSION && (
          <div className="animate-in zoom-in-95 duration-300 flex-1">
            <LiveSession 
              onBack={handleBack} 
              sessionCode={sessionCode}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;