import { useRef, useState } from 'react';

export const useSpeechRecognizer = () => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const silenceTimerRef = useRef(null);

  const startRecognition = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition || !navigator.mediaDevices?.getUserMedia) {
          return reject(new Error('Speech recognition or microphone access not supported.'));
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioChunksRef.current = [];
        let finalTranscript = '';

        // Set up audio recorder
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => audioChunksRef.current.push(e.data);
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          resolve({ transcript: finalTranscript, audioUrl });
        };
        mediaRecorderRef.current.start();

        // Set up speech recognition
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = 'en-US';
        recognitionRef.current.interimResults = false;
        recognitionRef.current.continuous = false;

        recognitionRef.current.onresult = (event) => {
          finalTranscript = event.results[0][0].transcript;
        };

        recognitionRef.current.onspeechend = () => {
          clearTimeout(silenceTimerRef.current);
          recognitionRef.current.stop();
          mediaRecorderRef.current.stop();
          setIsListening(false);
        };

        recognitionRef.current.onerror = (err) => {
          console.error('Speech recognition error:', err);
          recognitionRef.current.stop();
          mediaRecorderRef.current.stop();
          setIsListening(false);
          reject(err);
        };

        // Fallback silence timeout
        silenceTimerRef.current = setTimeout(() => {
          recognitionRef.current.stop();
          mediaRecorderRef.current.stop();
          setIsListening(false);
        }, 5000);

        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Recognition setup error:', err);
        reject(err);
      }
    });
  };

  const stopRecognition = () => {
    recognitionRef.current?.stop();
    mediaRecorderRef.current?.stop();
    setIsListening(false);
    clearTimeout(silenceTimerRef.current);
  };

  return { isListening, startRecognition, stopRecognition };
};
/*
How to Use this:
import { useSpeechRecognizer } from './hooks/useSpeechRecognizer';

const YourComponent = () => {
  const { isListening, startRecognition, stopRecognition } = useSpeechRecognizer();

  const handleSpeechRecognitionClick = async () => {
    try {
      if (isListening) {
        stopRecognition(); // Early stop on second click
        return;
      }
      const { transcript, audioUrl } = await startRecognition();
      console.log('Voice input complete:', transcript, audioUrl);
      // Do something with the result like dispatching to Redux
    } catch (err) {
      console.error('Error during recognition:', err);
    }
  };

  return (
    <Button
      tooltipText="Recognize Speech | Interactive Voice Typing"
      onClickHandle={handleSpeechRecognitionClick}
      style={{ background: 'transparent', border: 'none' }}
    />
  );
};

*/
