import React, { useState } from 'react';
import { Moon, Sun, Languages } from 'lucide-react';
import LanguageModal from './LanguageModal';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-dark-bg/80 border-b border-gray-200 dark:border-gray-800 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/20">
              S
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              SmartHelp Translate
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Speaker Languages Button */}
            <button
              onClick={() => setIsLangModalOpen(true)}
              className="group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100/50 dark:bg-gray-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all border border-transparent hover:border-primary-200 dark:hover:border-primary-800"
            >
              <Languages className="w-4 h-4 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-400 transition-colors" />
              <span className="hidden sm:inline">Speaker Languages</span>
              <span className="sm:hidden">Languages</span>
            </button>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <LanguageModal 
        isOpen={isLangModalOpen} 
        onClose={() => setIsLangModalOpen(false)} 
      />
    </>
  );
};

export default Header;