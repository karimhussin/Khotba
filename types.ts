export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export enum SessionStatus {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  LIVE = 'LIVE',
  ERROR = 'ERROR'
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: number;
}

export enum View {
  HOME = 'HOME',
  SESSION = 'SESSION',
  JOIN = 'JOIN'
}