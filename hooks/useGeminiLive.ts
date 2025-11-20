import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { SessionStatus } from '../types';
import { base64ToBytes, decodeAudioData, createPcmBlob } from '../utils/audio';

// Constants
const MODEL_NAME = 'gemini-2.5-flash-native-audio-preview-09-2025';
const INPUT_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000;

export const useGeminiLive = () => {
  const [status, setStatus] = useState<SessionStatus>(SessionStatus.IDLE);
  const [transcription, setTranscription] = useState<string>('');
  const [translation, setTranslation] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Refs for audio context and state
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null); 
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const isConnectedRef = useRef<boolean>(false);

  const connect = useCallback(async () => {
    if (!process.env.API_KEY) {
      setError('API Key not found in environment variables.');
      return;
    }

    try {
      setStatus(SessionStatus.CONNECTING);
      setError(null);

      // Initialize Audio Contexts
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: INPUT_SAMPLE_RATE
      });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: OUTPUT_SAMPLE_RATE
      });

      // CRITICAL: Resume audio contexts on user gesture (connect click) to prevent browser blocking
      if (outputAudioContextRef.current.state === 'suspended') {
        await outputAudioContextRef.current.resume();
      }
      if (inputAudioContextRef.current.state === 'suspended') {
        await inputAudioContextRef.current.resume();
      }

      // Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Initialize Gemini Client
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const config = {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
        systemInstruction: `You are a professional real-time interpreter for SmartHelp. 
        The speaker is speaking in Arabic (or as detected). 
        Your task is to accurately translate the speech into English consecutively. 
        Provide a clear, natural, and respectful translation.
        Also, provide the text transcription of your translation.`,
        inputAudioTranscription: { model: 'gemini-2.5-flash-native-audio-preview-09-2025' },
        outputAudioTranscription: { model: 'gemini-2.5-flash-native-audio-preview-09-2025' },
      };

      // Connect Session
      const sessionPromise = ai.live.connect({
        model: MODEL_NAME,
        config,
        callbacks: {
          onopen: () => {
            console.log('Gemini Live Session Opened');
            isConnectedRef.current = true;
            setStatus(SessionStatus.LIVE);

            if (!inputAudioContextRef.current || !streamRef.current) return;

            // Setup Audio Input Processing
            const source = inputAudioContextRef.current.createMediaStreamSource(streamRef.current);
            const processor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            inputSourceRef.current = source;
            processorRef.current = processor;

            processor.onaudioprocess = (e) => {
               if (!isConnectedRef.current) return;
               
               const inputData = e.inputBuffer.getChannelData(0);
               const pcmBlob = createPcmBlob(inputData);
               
               sessionPromise.then(session => {
                 session.sendRealtimeInput({ media: pcmBlob });
               });
            };

            source.connect(processor);
            processor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Text Transcription
            if (message.serverContent?.outputTranscription) {
              setTranslation(prev => prev + message.serverContent?.outputTranscription?.text);
            }
            
             if (message.serverContent?.inputTranscription) {
              // Optionally show user's original text
              // setTranscription(prev => prev + message.serverContent?.inputTranscription?.text);
            }

            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              const audioBytes = base64ToBytes(base64Audio);
              const audioBuffer = await decodeAudioData(audioBytes, ctx, OUTPUT_SAMPLE_RATE);
              
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              
              // Schedule playback
              const currentTime = ctx.currentTime;
              const startTime = Math.max(currentTime, nextStartTimeRef.current);
              source.start(startTime);
              nextStartTimeRef.current = startTime + audioBuffer.duration;
            }

            if (message.serverContent?.turnComplete) {
               // Turn complete logic if needed (e.g. newline in transcripts)
               setTranslation(prev => prev + '\n');
            }
          },
          onclose: () => {
            console.log('Gemini Live Session Closed');
            setStatus(SessionStatus.IDLE);
            isConnectedRef.current = false;
          },
          onerror: (err) => {
            console.error('Gemini Live Error', err);
            setError('Connection error occurred.');
            setStatus(SessionStatus.ERROR);
            isConnectedRef.current = false;
          }
        }
      });
      
      sessionRef.current = sessionPromise;

    } catch (err: any) {
      console.error('Failed to connect:', err);
      setError(err.message || 'Failed to start session');
      setStatus(SessionStatus.ERROR);
    }
  }, []);

  const disconnect = useCallback(() => {
    isConnectedRef.current = false;
    
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (inputSourceRef.current) {
      inputSourceRef.current.disconnect();
      inputSourceRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    
    if (sessionRef.current) {
        sessionRef.current.then((session: any) => {
           // Clean up session logic
        });
    }
    
    setStatus(SessionStatus.IDLE);
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    status,
    connect,
    disconnect,
    transcription,
    translation,
    error
  };
};