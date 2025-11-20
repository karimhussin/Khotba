import React from 'react';
import { X, Globe, Mic, Headphones } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SOURCE_LANGUAGE: SupportedLanguage = { 
  code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' 
};

const TARGET_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
];

const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border border-gray-100 dark:border-gray-700">
        <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              Session Languages
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Supported by current speaker
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Source Language Section */}
          <div>
            <h3 className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Mic className="w-4 h-4" />
              Speaker's Audio
            </h3>
            <div className="flex items-center p-4 bg-gradient-to-r from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-800 rounded-xl border border-primary-100 dark:border-primary-900/30 shadow-sm">
              <span className="text-3xl mr-4 drop-shadow-sm">{SOURCE_LANGUAGE.flag}</span>
              <div className="flex-1">
                <div className="font-bold text-gray-900 dark:text-white text-lg">{SOURCE_LANGUAGE.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{SOURCE_LANGUAGE.nativeName}</div>
              </div>
              <div className="bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600 text-gray-900 dark:text-gray-200 text-xs px-2.5 py-1 rounded-md font-semibold">
                Original
              </div>
            </div>
          </div>

          {/* Target Languages Section */}
          <div>
            <h3 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Headphones className="w-4 h-4" />
              Available Translations
            </h3>
            <div className="grid grid-cols-1 gap-2.5 max-h-[240px] overflow-y-auto pr-1 custom-scrollbar">
              {TARGET_LANGUAGES.map((lang) => (
                <div 
                  key={lang.code}
                  className="flex items-center p-3 bg-white dark:bg-gray-700/30 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all border border-gray-200 dark:border-gray-700"
                >
                  <span className="text-2xl mr-3">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{lang.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{lang.nativeName}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-900/30 text-center border-t border-gray-100 dark:border-gray-700">
           <p className="text-xs text-gray-500 dark:text-gray-400">
             Select a channel in the session to start listening.
           </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;